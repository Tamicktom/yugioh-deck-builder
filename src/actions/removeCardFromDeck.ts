"use server";

import firebase from "@/services/connectFirebase";
import type { CardData } from "@/types/yugioh-api-response";

export default async function removeCardFromDeck(card: CardData) {
  const userId = firebase.auth().currentUser?.uid;
  if (!userId) {
    console.log("User not logged in");
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
      // Verifique se a carta está presente no array de cartas
      const cardIndex = userData.cards.findIndex(
        (c: CardData) => c.id === card.id && c.name === card.name
      );

      if (cardIndex !== -1) {
        // Se a carta estiver presente, remova-a do array
        const updatedCards = [...userData.cards];
        updatedCards.splice(cardIndex, 1);
        await userRef.update({ cards: updatedCards });
        console.log("Carta removida com sucesso");
      } else {
        console.log("A carta não está presente no deck");
      }
    } else {
      console.log("O deck está vazio");
    }
  } catch (error) {
    console.error("Falha ao remover a carta do deck:", error);
  }
}
