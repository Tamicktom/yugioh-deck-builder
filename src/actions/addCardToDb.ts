"use server";
import z from "zod";

import firebase from "@/services/connectFirebase";
import type { APIResponse, CardData } from "@/types/yugioh-api-response";

export default async function addCardToDb(card: CardData) {
  const userId = firebase.auth().currentUser?.uid;
  if (!userId) {
    console.log("user not logged in");
    return {
      error: true,
      message: "User not logged in",
    };
  }

  try {
    const cardsRef = firebase
      .firestore()
      .collection("cards")
      .doc(card.name.toLowerCase());

    const cardsDoc = await cardsRef.get();

    if (cardsDoc.exists) return;

    await cardsRef.set(card);
  } catch (error) {
    console.error("Falha ao adicionar a carta ao deck:", error);
  }
}
