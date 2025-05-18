'use client';

import styles from './Hero.module.css';
import Link from 'next/link';
import CardInfo from '@/components/CardInfo';

export default function Hero() {
  return (
    <>
      <section className={styles.hero}>
        <div className={styles.sliderWrapper}>
          <div className={styles.slide}>
            <img src="/slides/carrossel1.jpg" alt="Slide 1" />
          </div>
          <div className={styles.slide}>
            <img src="/slides/carrossel2.jpg" alt="Slide 2" />
          </div>
          <div className={styles.slide}>
            <img src="/slides/carrossel3.jpg" alt="Slide 3" />
          </div>
          <div className={styles.slide}>
            <img src="/slides/carrossel1.jpg" alt="Slide 1 (Clone)" />
          </div>
        </div>

        <div className={styles.overlay}>
          <div className={styles.content}>
            <h1 className={styles.title}>Descubra talentos. Revele seu futebol.</h1>
            <p className={styles.subtitle}>
              Nossa plataforma conecta jogadores em busca de oportunidades com olheiros, treinadores e clubes.
            </p>

            <div className={styles.buttons}>
              <Link href="/jogador/login" className={styles.jogador}>
                Entrar como Jogador
              </Link>
              <Link href="/olheiro/login" className={styles.olheiro}>
                Entrar como Olheiro
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Cards logo abaixo do carrossel */}
      <section className={styles.cardsContainer}>
        <div className={styles.cardsWrapper}>
          <CardInfo
            icon="bx bx-football"
            title="Mostre seu Talento"
            description="Cadastre seu perfil e compartilhe seu desempenho com olheiros e clubes."
            backgroundColor="#3a5550"
          />

          <CardInfo
            icon="bx bx-building"
            title="Encontre Atletas"
            description="Visualize jogadores promissores e filtre por posição, idade e região."
            backgroundColor="#f4ae31"
          />

          <CardInfo
            icon="bx bx-dollar-circle"
            title="Invista no Futuro"
            description="Conecte talentos com oportunidades reais no mundo do futebol."
            backgroundColor="#3a5550"
          />
        </div>
      </section>
    </>
  );
}
