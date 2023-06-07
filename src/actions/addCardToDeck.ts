"use server";
import z from "zod";

import firebase from "@/services/connectFirebase";
import type { APIResponse, CardData } from "@/types/yugioh-api-response";

export default async function addCardToDeck(card: CardData) {
  const userId = firebase.auth().currentUser?.uid;
  if (!userId)
    return {
      error: true,
      message: "User not logged in",
    };

  
}
