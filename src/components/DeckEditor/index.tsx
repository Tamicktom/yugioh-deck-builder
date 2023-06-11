"use client";

//* Libraries imports
import { useState, useEffect, type ReactNode } from "react";
import type { CSSProperties } from "react";
import { useDroppable, useDraggable, DndContext } from "@dnd-kit/core";
import type { DragEndEvent, DragStartEvent } from "@dnd-kit/core";
import { CSS } from '@dnd-kit/utilities';

import colors from "tailwindcss/colors";

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
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    loadCardsFromDeck().then((cards) => {
      setCardOnDeck(cards);
    });
  }, []);

  function handleDragEnd(event: DragEndEvent) {
    setIsDragging(false);
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

      //* if deck is full, return
      if (cardOnDeck.length >= 60) return;

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


    const cards = await getCardFromDb(cardName.toLowerCase());

    if (!cards) return;

    setCardToAdd([...cards.cardData]);
  }

  return (
    <DndContext
      onDragStart={() => {
        setIsDragging(true);
      }}
      onDragEnd={handleDragEnd}
    >
      <div
        className="flex flex-row w-full h-screen min-h-screen overflow-hidden"
      >
        {/* left */}
        <DroppableDeckArea
          id="droppable"
          isDragging={isDragging}
        >
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
        <div className="w-[480px] h-screen min-h-screen p-4 pl-0 flex flex-col justify-start items-start gap-4">
          <div className="flex flex-col items-center justify-center w-full gap-2 p-4 rounded-lg bg-neutral-900 h-fit">
            <div className="flex flex-col items-center justify-center">
              <label htmlFor="card_name_input">Digite o nome da carta</label>
            </div>
            <input
              id="card_name_input"
              type="text"
              autoComplete="off"
              className="p-2 rounded-lg outline-none text-neutral-100 bg-neutral-700"
              onChange={(e) => setCardName(e.target.value)}
            />
            <button
              onClick={handleSearchCard}
              className="flex items-center justify-center p-2 font-bold uppercase rounded-lg bg-neutral-600 text-neutral-100"
            >
              Search
            </button>
          </div>
          <div id="waiting_zone" className="flex flex-row flex-wrap items-start justify-center w-full h-full gap-4 p-4 rounded-lg bg-neutral-900"
          >
            {
              cardToAdd.map((card) => {
                let id = card.id;
                if (typeof id === "string") {
                  id = id.replace("add-", "");
                  id = id.replace("deck-", "");
                }
                return (
                  <Draggable
                    id={`add-${card.id}`}
                    key={card.id}
                  >
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

type DroppableDeckAreaProps = {
  id: string;
  children: ReactNode;
  isDragging: boolean;
}

function DroppableDeckArea(props: DroppableDeckAreaProps) {
  const { isOver, setNodeRef } = useDroppable({
    id: props.id,
  });

  const style: CSSProperties = {
    backgroundColor: isOver ? colors.neutral[800] : colors.neutral[900],
  }

  return (
    <div className="flex items-center justify-center w-full h-screen min-h-screen p-4 hide-scrollbar"
      style={{
        overflowY: props.isDragging ? "visible" : "scroll",
        overflowX: props.isDragging ? "visible" : "hidden",
      }}
    >
      <div
        ref={setNodeRef}
        style={style}
        className="flex flex-row flex-wrap w-full min-h-full h-fit gap-4 p-4 rounded-lg justify-start items-start"
      >
        {props.children}
      </div>
    </div>
  )
}

function Draggable(props: any) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: props.id,
  });
  const [zIndex, setZIndex] = useState<number | undefined>(undefined);
  const scale = 1.25;
  const style: CSSProperties = {
    // multiply by the scale to ensure the element stays in place
    transform: transform ? `translate3d(${transform.x * (1 / scale)}px, ${transform.y * (1 / scale)}px, 0)` : undefined,
    zIndex: zIndex,
    opacity: transform ? 0.7 : 1,
    scale: transform ? scale : 1,
    transitionDuration: transform ? '.7s' : ".5s",
    transitionProperty: transform ? "scale, opacity" : "scale, opacity, transform",
  };

  useEffect(() => {
    if (transform) {
      setZIndex(9999);
    } else {
      setTimeout(() => {
        setZIndex(undefined);
      }, 500);
    }
  }, [transform]);

  return (
    <button
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className="overflow-hidden transition-opacity rounded w-fit h-fit"
    >
      {props.children}
    </button>
  );
}