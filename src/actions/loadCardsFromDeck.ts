"use server";
import z from "zod";

import firebase from "@/services/connectFirebase";
import type { APIResponse, CardData } from "@/types/yugioh-api-response";

export default async function loadCardsFromDeck(): Promise<CardData[]> {
  const userId = firebase.auth().currentUser?.uid;
  if (!userId) {
    console.log("User not logged in");
    return [];
  }

  try {
    const userRef = firebase.firestore().collection("users").doc(userId);

    // Obtenha o documento atual do usuário
    const userDoc = await userRef.get();
    const userData = userDoc.data();

    if (userData && userData.cards) {
      // Retorna o array de cartas do deck
      // return userData.cards;
      //for each card in userData.cards, fetch card data from api
      const cards = userData.cards;
      const cardsData = [];
      for (let i = 0; i < cards.length; i++) {
        const card = cards[i];
        const response = await fetch(
          `https://db.ygoprodeck.com/api/v7/cardinfo.php?id=${card.id}`
        );
        const data: APIResponse = await response.json();
        cardsData.push(data.data[0]);
      }
      return cardsData;
    } else {
      console.log("Deck vazio");
      return [];
    }
  } catch (error) {
    console.error("Falha ao carregar as cartas do deck:", error);
    return [];
  }
}
