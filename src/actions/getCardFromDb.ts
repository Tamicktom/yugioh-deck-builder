"use server";
import z from "zod";

import firebase from "@/services/connectFirebase";
import type { APIResponse, CardData } from "@/types/yugioh-api-response";

import addCardToDb from "./addCardToDb";

export default async function getCardFromDb(
  cardName: string
): Promise<CardData | undefined> {
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
      return cardData as CardData;
    }

    console.log("Card not found in database");

    // if the document doesn't exist, fetch the card data from the api, add it to the database and return it
    const response = await fetch(
      `https://db.ygoprodeck.com/api/v7/cardinfo.php?name=${cardName}`
    );
    const data: APIResponse = await response.json();

    if (data.data.length === 0) {
      console.log("Card not found");
      return;
    }

    const cardData = data.data[0];
    await addCardToDb(cardData);

    return cardData;
  } catch (error) {
    console.error("Falha ao carregar a carta:", error);
  }
}
