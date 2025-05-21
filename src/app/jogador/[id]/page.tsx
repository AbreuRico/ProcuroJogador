'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/firebase';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function PerfilJogadorPage() {
  const { id } = useParams();
  const [jogador, setJogador] = useState<any>(null);

  useEffect(() => {
    const buscarJogador = async () => {
      const ref = doc(db, 'jogadores', id as string);
      const snap = await getDoc(ref);
      if (snap.exists()) {
        setJogador(snap.data());
      }
    };

    if (id) buscarJogador();
  }, [id]);

  if (!jogador) return <p className="text-center py-10">Carregando jogador...</p>;

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 pt-28 pb-16">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Foto + dados */}
          <div className="md:col-span-2">
            {jogador.imagemUrl && (
              <div className="relative w-full max-w-md h-80 mx-auto rounded-md overflow-hidden shadow-md">
                <img
                  src={jogador.imagemUrl}
                  alt={`Foto de ${jogador.nome}`}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <h2 className="text-2xl font-bold text-[#3a5550] mt-6">
              {jogador.nome}
              {jogador.planoPremium && (
                <span title="Jogador Premium" className="text-yellow-400 text-2xl ml-2 align-middle">★</span>
              )}
            </h2>

            <div className="mt-4 space-y-1 text-[#3a5550]">
              <p><i className="bx bx-calendar"></i> <strong>Idade:</strong> {jogador.idade} anos</p>
              <p><i className="bx bx-ruler"></i> <strong>Altura:</strong> {jogador.altura} m</p>
              <p><i className="bx bx-dumbbell"></i> <strong>Peso:</strong> {jogador.peso} kg</p>
              <p><i className="bx bx-football"></i> <strong>Posição:</strong> {jogador.posicao}</p>
              <p><i className="bx bx-walk"></i> <strong>Perna dominante:</strong> {jogador.perna}</p>
              <p><i className="bx bx-map"></i> <strong>Localização:</strong> {jogador.cidade} - {jogador.estado}</p>
              <p><i className="bx bxl-whatsapp"></i> <strong>WhatsApp:</strong> {jogador.whatsapp}</p>
            </div>

            {jogador.videos?.length > 0 && (
              <div className="mt-6">
                <p className="font-semibold text-[#3a5550] mb-2">Vídeo:</p>
                <iframe
                  className="w-full aspect-video rounded"
                  src={`https://www.youtube.com/embed/${jogador.videos[0].split('v=')[1]}`}
                  allowFullScreen
                />
              </div>
            )}
          </div>
          
          {/* Formulário */} 
          <div className="bg-white p-4 shadow-md rounded-lg max-w-[400px] self-start">
            <h3 className="text-lg font-bold text-[#3a5550] mb-4">Entrar em contato com o Jogador</h3>
            <form className="flex flex-col gap-3 text-[#3a5550]">
              <input
                type="text"
                placeholder="Seu nome"
                className="w-full px-4 py-2 border border-gray-300 rounded"
              />
              <input
                type="email"
                placeholder="Seu e-mail"
                className="w-full px-4 py-2 border border-gray-300 rounded"
              />
              <textarea
                placeholder="Mensagem"
                className="w-full px-4 py-2 border border-gray-300 rounded"
                rows={4}
              />
              <button
                type="submit"
                className="w-full bg-[#3a5550] hover:bg-[#2e443f] text-white font-semibold py-2 rounded"
              >
                Enviar
              </button>
              <a
                href={`https://wa.me/${jogador.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-center bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded"
              >
                Chamar no WhatsApp
              </a>
            </form>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
