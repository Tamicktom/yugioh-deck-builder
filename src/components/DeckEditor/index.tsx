"use client";

//* Libraries imports
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
import type { CardData } from "@/types/yugioh-api-response";


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
    <DndContext onDragEnd={handleDragEnd}>
      <div className="flex flex-row w-full h-full min-h-screen overflow-hidden">
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
                    width={421 / 2.75}
                    height={614 / 2.75}
                  />
                </Draggable>
              )
            })
          }
        </DroppableDeckArea>

        {/* right */}
        <div className="w-3/4 h-full min-h-screen">
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
                      width={421 / 2.75}
                      height={614 / 2.75}
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
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex flex-row flex-wrap items-start justify-start w-full min-h-screen gap-2 p-4 bg-blue-500"
    >
      {props.children}
    </div>
  )
}

function Draggable(props: any) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: props.id,
  });
  const scale = 1.25;
  const style: CSSProperties = {
    // multiply by the scale to ensure the element stays in place
    transform: transform ? `translate3d(${transform.x * (1 / scale)}px, ${transform.y * (1 / scale)}px, 0)` : undefined,
    zIndex: transform ? 9999 : undefined,
    opacity: transform ? 0.7 : 1,
    scale: transform ? scale : 1,
    transitionDuration: transform ? '.7s' : ".5s",
    transitionProperty: transform ? "scale, opacity" : "scale, opacity, transform",
  };

  return (
    <button
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className="overflow-hidden transition-opacity rounded"
    >
      {props.children}
    </button>
  );
}