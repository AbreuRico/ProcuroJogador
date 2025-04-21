'use client';

import { useEffect, useState } from 'react';
import { getJogadores } from '@/utils/getJogadores';

export default function ListarJogadores() {
  const [jogadores, setJogadores] = useState<any[]>([]);

  useEffect(() => {
    const fetchJogadores = async () => {
      const data = await getJogadores();
      console.log("Jogadores:", data);
      setJogadores(data);
    };

    fetchJogadores();
  }, []);

  return (
    <main className="p-6 text-white bg-black min-h-screen">
      <h1 className="text-3xl font-bold mb-8">Lista de Jogadores</h1>

      {jogadores.length === 0 ? (
        <p>Nenhum jogador encontrado.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {jogadores.map((jogador) => (
            <div
              key={jogador.id}
              className="bg-white text-black p-6 rounded-lg shadow-lg"
            >
              <h2 className="text-xl font-semibold mb-2">{jogador.nome}</h2>
              <p><strong>Idade:</strong> {jogador.idade} anos</p>
              <p><strong>Altura:</strong> {jogador.altura} m</p>
              <p><strong>Peso:</strong> {jogador.peso} kg</p>
              <p><strong>Posição:</strong> {jogador.posicao}</p>
              <p><strong>Perna dominante:</strong> {jogador.perna}</p>
              <p><strong>Localização:</strong> {jogador.localizacao}</p>

              {/* Link do vídeo */}
              {jogador.videos && jogador.videos.length > 0 && (
                <div className="mt-4">
                  <p><strong>Vídeo:</strong></p>
                  <a
                    href={jogador.videos[0]}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline"
                  >
                    Assistir no YouTube
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
