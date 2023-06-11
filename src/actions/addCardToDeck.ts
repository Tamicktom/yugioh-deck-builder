"use server";

import firebase from "@/services/connectFirebase";
import type { CardData } from "@/types/yugioh-api-response";

export default async function addCardToDeck(card: CardData) {
  const userId = firebase.auth().currentUser?.uid;
  if (!userId) {
    console.log("user not logged in");
    return {
      error: true,
      message: "User not logged in",
    };
  }

  try {
    const userRef = firebase.firestore().collection("users").doc(userId);

    // Obtenha o documento atual do usuário
    const userDoc = await userRef.get();
    const userData = userDoc.data();

    if (userData && userData.cards) {
      // Se já houver um array de cartas, adicione a nova carta a ele
      const updatedCards = [...userData.cards, card];
      await userRef.update({ cards: updatedCards });
    } else {
      // Se ainda não houver um array de cartas, crie um novo com a nova carta
      await userRef.set({ cards: [card] });
    }

    console.log("Sucesso");
  } catch (error) {
    console.error("Falha ao adicionar a carta ao deck:", error);
  }
}
