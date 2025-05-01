'use client';

import { useEffect, useState } from 'react';
import { getJogadores } from '@/utils/getJogadores';
import PlayerCard from '@/components/PlayerCard';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function ListarJogadores() {
  const [jogadores, setJogadores] = useState<any[]>([]);

  useEffect(() => {
    const fetchJogadores = async () => {
      const data = await getJogadores();
      setJogadores(data);
    };

    fetchJogadores();
  }, []);

  return (
    <>
      <Navbar />
      <main className="bg-white text-gray-900 min-h-screen px-6 pt-28 pb-20">
        <h1 className="text-3xl font-bold mb-8 text-center">Lista de Jogadores</h1>

        {jogadores.length === 0 ? (
          <p className="text-center">Nenhum jogador encontrado.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8">
            {jogadores.map((jogador) => (
              <PlayerCard
                key={jogador.id}
                nome={jogador.nome}
                idade={jogador.idade}
                altura={jogador.altura}
                peso={jogador.peso}
                posicao={jogador.posicao}
                pernaDominante={jogador.perna}
                localizacao={jogador.localizacao}
                imagemUrl={jogador.imagemUrl || '/default-player.jpg'}
              />
            ))}
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
