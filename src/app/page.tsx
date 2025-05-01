'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link'; // ✅ Importado aqui
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Footer from '@/components/Footer';
import PlayerCard from '@/components/PlayerCard';
import { getJogadores } from '@/utils/getJogadores';
import styles from '@/components/VerTodosButton.module.css';

export default function Home() {
  const [jogadores, setJogadores] = useState<any[]>([]);

  useEffect(() => {
    const fetchJogadores = async () => {
      const data = await getJogadores();
      const ultimos = data.slice(-3).reverse();
      setJogadores(ultimos);
    };

    fetchJogadores();
  }, []);

  return (
    <div className="relative min-h-screen text-white bg-white">
      <Navbar />
      <Hero />

      <section className="bg-white py-16 px-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-10 text-[#3a5550]">
          Jogadores em Destaque
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto mb-10">
          {jogadores.map((jogador, index) => (
            <PlayerCard
              key={index}
              nome={jogador.nome}
              idade={jogador.idade}
              altura={jogador.altura}
              peso={jogador.peso}
              posicao={jogador.posicao}
              pernaDominante={jogador.perna}
              localizacao={jogador.localizacao}
              imagemUrl={jogador.imagemUrl || '/jogador1.jpg'}
            />
          ))}
        </div>

        <div className="text-center mt-6">
          <Link href="/jogador/listar" className={styles.botao}>
            Ver todos os Jogadores
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
