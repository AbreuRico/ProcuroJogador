import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

export const getJogadores = async () => {
  const ref = collection(db, "jogadores");
  const snapshot = await getDocs(ref);

  const jogadores = snapshot.docs
    .map(doc => ({
      id: doc.id,
      ...doc.data()
    }))
    .filter(jogador => jogador.nome); // só inclui quem tem nome

  console.log("🔥 Jogadores válidos:", jogadores);

  return jogadores;
};
