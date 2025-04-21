import styles from './CardInfo.module.css';

interface CardInfoProps {
  icon: string;
  title: string;
  description: string;
  backgroundColor?: string; // <- aqui está o segredo
}

export default function CardInfo({ icon, title, description, backgroundColor }: CardInfoProps) {
  return (
    <div
      className={styles.card}
      style={{ backgroundColor: backgroundColor || '#3a5550' }} // fallback se não vier prop
    >
      <img src={icon} alt={title} className={styles.icon} />
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{description}</p>
    </div>
  );
}
