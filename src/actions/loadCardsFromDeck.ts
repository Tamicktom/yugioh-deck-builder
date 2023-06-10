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
      const cards = userData.cards;
      return cards;
    } else {
      console.log("Deck vazio");
      return [];
    }
  } catch (error) {
    console.error("Falha ao carregar as cartas do deck:", error);
    return [];
  }
}
