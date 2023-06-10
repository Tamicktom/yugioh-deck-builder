"use client";

//* Libraries imports
import Image from "next/image";
import { useState, useEffect } from "react";
import type { CSSProperties } from "react";
import { useDroppable, useDraggable, DndContext } from "@dnd-kit/core";
import type { DragEndEvent, DragStartEvent } from "@dnd-kit/core";
import { CSS } from '@dnd-kit/utilities';

//* Components imports

//* Local imports
import addCardToDeck from "@/actions/addCardToDeck";
import removeCardFromDeck from "@/actions/removeCardFromDeck";
import loadCardsFromDeck from "@/actions/loadCardsFromDeck";
import addCardToDb from "@/actions/addCardToDb";
import getCardFromDb from "@/actions/getCardFromDb";
import type { APIResponse, CardData } from "@/types/yugioh-api-response";


export default function DeckEditor() {
  const [cardOnDeck, setCardOnDeck] = useState<CardData[]>([]);
  const [cardToAdd, setCardToAdd] = useState<CardData[]>([]);
  const [cardName, setCardName] = useState("");

  useEffect(() => {
    loadCardsFromDeck().then((cards) => {
      setCardOnDeck(cards);
    });
  }, []);

  function handleDragEnd(event: DragEndEvent) {
    console.log("drag end", event);
    let isDeck = false;
    let isAdd = false;
    let isOverDroppable = event.over?.id === "droppable";
    if (event.active) {
      isDeck = (event.active.id + "").includes("deck-");
      isAdd = (event.active.id + "").includes("add-");
    }
    if (isOverDroppable && isDeck) {
      // do nothing
      return;
    }
    if (isOverDroppable && isAdd) {
      // add card to deck
      // first, find the card in the waiting zone
      const activeId = (event.active.id + "").replace("add-", "");
      const card = cardToAdd.find((card) => {
        return (card.id + "") === activeId;
      });

      //* verify if card is already on deck
      const cardOnDeckId = cardOnDeck.find((card) => {
        return (card.id + "") === activeId;
      });

      if (cardOnDeckId) return;

      if (card) {
        // add card to deck
        setCardOnDeck([...cardOnDeck, card]);
        // remove card from waiting zone
        setCardToAdd(cardToAdd.filter((card) => {
          return (card.id + "") !== activeId;
        }));

        // add card to database
        addCardToDeck(card);
      }

      return;
    }
    if (!isOverDroppable && isDeck) {
      // remove card from deck
      const activeId = (event.active.id + "").replace("deck-", "");
      const card = cardOnDeck.find((card) => {
        return (card.id + "") === activeId;
      });
      if (card) {
        // remove card from deck
        setCardOnDeck(cardOnDeck.filter((card) => {
          return (card.id + "") !== activeId;
        }));
        // add card to waiting zone
        setCardToAdd([...cardToAdd, card]);

        // remove card from database
        removeCardFromDeck(card);
      }
      return;
    }
  }

  function handleDragStart(event: DragStartEvent) {
    console.log("drag start", event);
  }

  async function handleSearchCard() {
    if (cardName === "") return;
    //verify if card name is already on deck
    const cardOnDeckId = cardOnDeck.find((card) => {
      return card.name.toLowerCase() === cardName.toLowerCase();
    })
    if (cardOnDeckId) return;


    const card = await getCardFromDb(cardName.toLowerCase());

    if (!card) return;

    setCardToAdd([...cardToAdd, card]);
    //add card to database
    addCardToDb(card);
  }

  return (
    <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <div className="flex flex-row w-full h-full min-h-screen overflow-hidden bg-red-500">
        {/* left */}
        <DroppableDeckArea id="droppable">
          {
            cardOnDeck.map((card) => {
              let id = card.id;
              if (typeof id === "string") {
                id = id.replace("add-", "");
                id = id.replace("deck-", "");
              }
              return (
                <Draggable id={`deck-${id}`} key={card.id}>
                  <img
                    src={card.card_images[0].image_url}
                    alt="Card image"
                    width={421 / 3}
                    height={614 / 3}
                  />
                </Draggable>
              )
            })
          }
        </DroppableDeckArea>

        {/* right */}
        <div className="w-full h-full min-h-screen bg-yellow-950">
          <div>
            <p>Perquisar carta</p>
            <label htmlFor="">Digite o nome da carta</label>
            <input
              type="text"
              className="text-black"
              onChange={(e) => setCardName(e.target.value)}
            />
            <button onClick={handleSearchCard}>
              Search
            </button>
          </div>
          <div id="waiting_zone">
            {
              cardToAdd.map((card) => {
                let id = card.id;
                if (typeof id === "string") {
                  id = id.replace("add-", "");
                  id = id.replace("deck-", "");
                }
                return (
                  <Draggable id={`add-${card.id}`} key={card.id}>
                    <img
                      src={card.card_images[0].image_url}
                      alt="Card image"
                      width={421 / 3}
                      height={614 / 3}
                    />
                  </Draggable>
                )
              })
            }
          </div>
        </div>
      </div>
    </DndContext>
  );
}

function DroppableDeckArea(props: any) {
  const { isOver, setNodeRef } = useDroppable({
    id: props.id,
  });

  const style: CSSProperties = {
    backgroundColor: isOver ? 'green' : undefined,
    width: '50%',
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
    >
      {props.children}
    </div>
  )
}

function Draggable(props: any) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: props.id,
  });
  const style: CSSProperties = {
    // Outputs `translate3d(x, y, 0)`
    transform: CSS.Translate.toString(transform),
    opacity: transform ? 0.7 : undefined,
  };

  return (
    <button ref={setNodeRef} style={style} {...listeners} {...attributes}>
      {props.children}
    </button>
  );
}