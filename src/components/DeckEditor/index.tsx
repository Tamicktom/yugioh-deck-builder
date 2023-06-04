"use client";

//* Libraries imports
import Image from "next/image";
import { useState } from "react";
import type { CSSProperties } from "react";
import { useDroppable, useDraggable, DndContext } from "@dnd-kit/core";
import type { DragOverEvent } from "@dnd-kit/core";
import { CSS } from '@dnd-kit/utilities';

//* Components imports
export default function DeckEditor() {
  const [parent, setParent] = useState(null);
  const [cardOnDeck, setCardOnDeck] = useState<string[]>([]);
  const [cardToAdd, setCardToAdd] = useState([
    "banana", "apple", "carnaza"
  ]);

  function handleDragEnd(event: DragOverEvent) {
    if (event.over?.id === "droppable") {
      setCardOnDeck([...cardOnDeck, event.active.id + ""]);
      setCardToAdd(cardToAdd.filter((card) => card !== event.active.id));
    } else {
      setCardToAdd([...cardToAdd, event.active.id + ""]);
      setCardOnDeck(cardOnDeck.filter((card) => card !== event.active.id));
    }
  }

  return (
    <DndContext onDragOver={handleDragEnd}>
      <div className="flex flex-row w-full h-full min-h-screen overflow-hidden bg-red-500">
        {/* left */}
        <DroppableDeckArea id="droppable">
          {
            cardOnDeck.map((card, index) => {
              return (
                <Draggable id={card} key={index}>
                  <Image
                    src="https://images.ygoprodeck.com/images/cards/4031928.jpg"
                    alt="Card image"
                    width={421}
                    height={614}
                    loading="lazy"
                  />
                </Draggable>
              )
            })
          }
        </DroppableDeckArea>

        {/* right */}
        <div className="w-full h-full min-h-screen bg-yellow-950">
          {
            cardToAdd.map((card, index) => {
              return (
                <Draggable id={card} key={index}>
                  {card}
                </Draggable>
              )
            })
          }
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
  };

  return (
    <button ref={setNodeRef} style={style} {...listeners} {...attributes}>
      {props.children}
    </button>
  );
}