"use server";

export async function sendMessage(message: string) {
  console.log("sendMessage: ", message);
  return message;
}