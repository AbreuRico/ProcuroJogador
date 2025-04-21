import styles from './Navbar.module.css';
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <Link href="/" className={styles.logo}>Procuro Jogador</Link>

      <div className={styles.navLinks}>
        <Link href="#principal" className={styles.navLink}>Principal</Link>
        <Link href="/jogador/listar" className={styles.navLink}>Ver atletas</Link>
        <Link href="#sobre" className={styles.navLink}>Sobre nós</Link>
        <Link href="#parceiros" className={styles.navLink}>Parceiros</Link>
      </div>
    </nav>
  );
}
