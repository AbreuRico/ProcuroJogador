import Image from 'next/image';
import styles from './PlayerCard.module.css';

interface PlayerCardProps {
  nome: string;
  idade: number;
  altura: string;
  peso: string;
  posicao: string;
  pernaDominante: string;
  localizacao: string;
  imagemUrl: string;
}

export default function PlayerCard({
  nome,
  idade,
  altura,
  peso,
  posicao,
  pernaDominante,
  localizacao,
  imagemUrl
}: PlayerCardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.imagemWrapper}>
        <Image src={imagemUrl} alt={`Foto de ${nome}`} fill className={styles.imagem} />
        <span className={styles.etiqueta}>Jogador</span>
      </div>

      <div className={styles.info}>
        <strong className={styles.nome}>{nome}</strong>
        <p><i className="bx bx-calendar"></i> <strong>Idade:</strong> {idade} anos</p>
        <p><i className="bx bx-ruler"></i> <strong>Altura:</strong> {altura}</p>
        <p><i className="bx bx-dumbbell"></i> <strong>Peso:</strong> {peso}</p>
        <p><i className="bx bx-football"></i> <strong>Posição:</strong> {posicao}</p>
        <p><i className="bx bx-walk"></i> <strong>Perna dominante:</strong> {pernaDominante}</p>
        <p><i className="bx bx-map"></i> <strong>Localização:</strong> {localizacao}</p>
      </div>

      <button className={styles.botao}>Saiba Mais</button>
    </div>
  );
}
