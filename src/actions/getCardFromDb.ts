"use server";
import firebase from "@/services/connectFirebase";
import type { APIResponse, CardData } from "@/types/yugioh-api-response";

import addCardToDb from "./addCardToDb";

type getCardResponse = {
  cardData: CardData[];
  meta: {
    current_rows: number;
    total_rows: number;
    rows_remaining: number;
    total_pages: number;
    pages_remaining: number;
    next_page: string;
    next_page_offset: number;
  };
};

export default async function getCardFromDb(
  cardName: string
): Promise<getCardResponse | undefined> {
  //* Verify if user is logged in
  const userId = firebase.auth().currentUser?.uid;
  if (!userId) {
    console.log("User not logged in");
    return;
  }

  try {
    // search the "cards" collection for a document with the same name as the cardName parameter
    const cardsRef = firebase
      .firestore()
      .collection("cards")
      .doc(cardName.toLowerCase());

    // get the document
    const cardsDoc = await cardsRef.get();

    // if the document exists, return the card data
    if (cardsDoc.exists) {
      console.log("Card found in database");
      const cardData = cardsDoc.data();
      return {
        cardData: [cardData as CardData],
        meta: {
          current_rows: 1,
          total_rows: 1,
          rows_remaining: 0,
          total_pages: 1,
          pages_remaining: 0,
          next_page: "",
          next_page_offset: 0,
        },
      };
    }

    console.log("Card not found in database");

    // if the document doesn't exist, fetch the card data from the api, add it to the database and return it
    const response = await fetch(
      `https://db.ygoprodeck.com/api/v7/cardinfo.php?&num=12  &offset=0&fname=${cardName}`
    );
    const data: APIResponse = await response.json();

    if (data.data.length === 0) {
      console.log("Card not found");
      return;
    }

    // add each card to the database
    data.data.forEach(async (card) => {
      await addCardToDb(card);
    });

    return {
      cardData: data.data,
      meta: {
        current_rows: data.meta?.current_rows || 0,
        total_rows: data.meta?.total_rows || 0,
        rows_remaining: data.meta?.rows_remaining || 0,
        total_pages: data.meta?.total_pages || 0,
        pages_remaining: data.meta?.pages_remaining || 0,
        next_page: data.meta?.next_page || "",
        next_page_offset: data.meta?.next_page_offset || 0,
      }
    };
  } catch (error) {
    console.error("Falha ao carregar a carta:", error);
  }
}
