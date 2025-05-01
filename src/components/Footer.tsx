import styles from './Footer.module.css';
import Image from 'next/image';
import Link from 'next/link'; // ⬅️ Import necessário

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.column}>
          <h2 className={styles.logo}>Procuro Jogador</h2>
          <p className={styles.description}>
            Encontre o talento certo para o seu time!
          </p>
        </div>

        <div className={styles.separator}></div>

        <div className={styles.column}>
          <h4 className={styles.sectionTitle}>Navegação</h4>
          <ul className={styles.navList}>
            <li><Link href="/" className={styles.navItem}>Principal</Link></li>
            <li><Link href="/jogador/listar" className={styles.navItem}>Ver Atletas</Link></li>
            <li><Link href="/sobre" className={styles.navItem}>Sobre Nós</Link></li>
            <li><Link href="#contato" className={styles.navItem}>Contato</Link></li>
            <li><Link href="/planos" className={styles.navItem}>Planos</Link></li> {/* <-- novo item */}
          </ul>
        </div>

        <div className={styles.separator}></div>

        <div className={styles.column}>
          <h4 className={styles.sectionTitle}>Serviços</h4>
          <ul className={styles.navList}>
            <li className={styles.navItem}>Agenciar</li>
            <li className={styles.navItem}>Contratar</li>
            <li className={styles.navItem}>Parcerias</li>
          </ul>
        </div>

        <div className={styles.separator}></div>

        <div className={styles.column}>
          <h4 className={styles.sectionTitle}>Contato</h4>
          <p>Email: contato@procurojogador.com</p>
          <p>Tel: (11) 90000-0000</p>
          <div className={styles.social}>
            <Image src="/icons/instagram.svg" width={24} height={24} alt="Instagram" />
            <Image src="/icons/tiktok.svg" width={24} height={24} alt="TikTok" />
          </div>
        </div>
      </div>

      <div className={styles.bottomBar}>
        <p>© 2025 Procuro Jogador – Todos os direitos reservados</p>
      </div>
    </footer>
  );
}
