'use client';

import { useState, useEffect } from 'react';
import { auth, db } from '@/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import NavBar from './Navbar';

interface Props {
  userType: 'jogador' | 'olheiro';
  redirectTo: string;
}

export default function RegisterForm({ userType, redirectTo }: Props) {
  const router = useRouter();
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  // campos para jogador
  const [idade, setIdade] = useState(0);
  const [altura, setAltura] = useState(0);
  const [peso, setPeso] = useState(0);
  const [posicao, setPosicao] = useState('');
  const [perna, setPerna] = useState('');
  const [estado, setEstado] = useState('');
  const [cidade, setCidade] = useState('');
  const [video, setVideo] = useState('');

  const [estados, setEstados] = useState<string[]>([]);
  const [cidades, setCidades] = useState<string[]>([]);

  const [erro, setErro] = useState('');

  useEffect(() => {
    const fetchEstados = async () => {
      const res = await axios.get('https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome');
      setEstados(res.data.map((uf: any) => uf.sigla));
    };
    fetchEstados();
  }, []);

  useEffect(() => {
    const fetchCidades = async () => {
      if (!estado) return;
      const res = await axios.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${estado}/municipios`);
      setCidades(res.data.map((cidade: any) => cidade.nome));
    };
    fetchCidades();
  }, [estado]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro('');

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, senha);
      const user = userCredential.user;

      if (userType === 'jogador') {
        await setDoc(doc(db, 'jogadores', user.uid), {
          nome: nome || '',
          email: email || '',
          idade: idade || 0,
          altura: altura || 0,
          peso: peso || 0,
          posicao: posicao || '',
          perna: perna || '',
          pais: 'Brasil',
          estado: estado || '',
          cidade: cidade || '',
          foto: 'nulo',
          videos: video ? [video] : [],
          planoPremium: false,
          destaque: false,
          criadoEm: new Date()
        });
      }

      router.push(redirectTo);
    } catch (error: any) {
      if (error.code === 'auth/email-already-in-use') {
        setErro('Este e-mail já está cadastrado.');
      } else {
        setErro(error.message || 'Erro ao cadastrar.');
      }
    }
  };

  return (
    <>
      <NavBar />
      <main className="flex justify-center items-center min-h-screen bg-gray-100">
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
          <h1 className="text-2xl font-bold mb-4 text-center">Cadastro de {userType}</h1>

          <label className="block text-sm font-medium">Nome completo</label>
          <input placeholder="Ex: Kauã Ferreira" value={nome} onChange={(e) => setNome(e.target.value)} className="input" required />

          <label className="block text-sm font-medium mt-3">Email</label>
          <input type="email" placeholder="seu@email.com" value={email} onChange={(e) => setEmail(e.target.value)} className="input" required />

          <label className="block text-sm font-medium mt-3">Senha</label>
          <input type="password" placeholder="Digite uma senha segura" value={senha} onChange={(e) => setSenha(e.target.value)} className="input" required />

          {userType === 'jogador' && (
            <>
              <label className="block text-sm font-medium mt-3">Idade</label>
              <input type="number" placeholder="Ex: 20" value={idade} onChange={(e) => setIdade(Number(e.target.value))} className="input" required />

              <label className="block text-sm font-medium mt-3">Altura (ex: 1.83)</label>
              <input type="text" placeholder="Altura em metros, com ponto" value={altura.toString()} onChange={(e) => setAltura(parseFloat(e.target.value))} className="input" required />

              <label className="block text-sm font-medium mt-3">Peso (em kg)</label>
              <input type="number" placeholder="Ex: 80" value={peso} onChange={(e) => setPeso(Number(e.target.value))} className="input" required />

              <label className="block text-sm font-medium mt-3">Posição</label>
              <select value={posicao} onChange={(e) => setPosicao(e.target.value)} className="input" required>
                <option value="">Selecione uma posição</option>
                <option value="goleiro">Goleiro</option>
                <option value="zagueiro">Zagueiro</option>
                <option value="lateral-direito">Lateral Direito</option>
                <option value="lateral-esquerdo">Lateral Esquerdo</option>
                <option value="volante">Volante</option>
                <option value="meia">Meia</option>
                <option value="atacante">Atacante</option>
                <option value="ponta-direita">Ponta Direita</option>
                <option value="ponta-esquerda">Ponta Esquerda</option>
              </select>

              <label className="block text-sm font-medium mt-3">Perna dominante</label>
              <select value={perna} onChange={(e) => setPerna(e.target.value)} className="input" required>
                <option value="">Selecione uma opção</option>
                <option value="direita">Direita</option>
                <option value="esquerda">Esquerda</option>
                <option value="ambas">Ambas</option>
              </select>

              <label className="block text-sm font-medium mt-3">País</label>
              <input value="Brasil" disabled className="input bg-gray-100 text-gray-600" />

              <label className="block text-sm font-medium mt-3">Estado (UF)</label>
              <select value={estado} onChange={(e) => setEstado(e.target.value)} className="input" required>
                <option value="">Selecione o estado</option>
                {estados.map((uf) => (
                  <option key={uf} value={uf}>{uf}</option>
                ))}
              </select>

              <label className="block text-sm font-medium mt-3">Cidade</label>
              <select value={cidade} onChange={(e) => setCidade(e.target.value)} className="input" required>
                <option value="">Selecione a cidade</option>
                {cidades.map((cidade) => (
                  <option key={cidade} value={cidade}>{cidade}</option>
                ))}
              </select>

              <label className="block text-sm font-medium mt-3">Link do vídeo (YouTube)</label>
              <input placeholder="Cole aqui o link do seu vídeo" value={video} onChange={(e) => setVideo(e.target.value)} className="input" required />
            </>
          )}

          {erro && <p className="text-red-500 text-sm mt-2">{erro}</p>}

          <button type="submit" className="w-full bg-blue-600 text-white py-2 mt-4 rounded hover:bg-blue-700">
            Cadastrar
          </button>
        </form>
      </main>
    </>
  );
}
