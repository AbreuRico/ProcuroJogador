'use client';

import { useState } from 'react';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "@/firebase";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function CadastroJogadorPage() {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    senha: '',
    whatsapp: '',
    idade: '',
    altura: '',
    peso: '',
    posicao: '',
    pernaDominante: '',
    cidade: '',
    estado: '',
    imagemUrl: ''
  });

  const [erro, setErro] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro('');

    try {
      const cred = await createUserWithEmailAndPassword(auth, formData.email, formData.senha);
      const uid = cred.user.uid;

      await setDoc(doc(db, "jogadores", uid), {
        ...formData,
        uid,
        criadoEm: serverTimestamp()
      });

      alert("Cadastro realizado com sucesso!");
    } catch (error: any) {
      if (error.code === "auth/email-already-in-use") {
        alert("Este e-mail já está em uso. Tente outro.");
      } else {
        console.error("Erro ao cadastrar:", error);
        alert("Erro ao criar conta. Verifique os dados e tente novamente.");
      }
    }
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen flex items-center justify-center bg-gray-100 px-4 pt-20">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-xl shadow-lg w-full max-w-2xl border border-gray-200"
        >
          <h1 className="text-2xl font-bold mb-6 text-center text-[#3a5550]">Cadastro de Jogador</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-[#3a5550] mb-1">Nome</label>
              <input name="nome" value={formData.nome} onChange={handleChange} required className="w-full px-4 py-2 border rounded-md text-[#3a5550]" />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#3a5550] mb-1">Idade</label>
              <input name="idade" value={formData.idade} onChange={handleChange} required className="w-full px-4 py-2 border rounded-md text-[#3a5550]" />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#3a5550] mb-1">Email</label>
              <input name="email" type="email" value={formData.email} onChange={handleChange} required className="w-full px-4 py-2 border rounded-md text-[#3a5550]" />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#3a5550] mb-1">Senha</label>
              <input name="senha" type="password" value={formData.senha} onChange={handleChange} required className="w-full px-4 py-2 border rounded-md text-[#3a5550]" />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#3a5550] mb-1">WhatsApp</label>
              <input name="whatsapp" value={formData.whatsapp} onChange={handleChange} required className="w-full px-4 py-2 border rounded-md text-[#3a5550]" />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#3a5550] mb-1">Cidade</label>
              <input name="cidade" value={formData.cidade} onChange={handleChange} required className="w-full px-4 py-2 border rounded-md text-[#3a5550]" />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#3a5550] mb-1">Estado</label>
              <input name="estado" value={formData.estado} onChange={handleChange} required className="w-full px-4 py-2 border rounded-md text-[#3a5550]" />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#3a5550] mb-1">Altura (ex: 1.80)</label>
              <input name="altura" value={formData.altura} onChange={handleChange} required className="w-full px-4 py-2 border rounded-md text-[#3a5550]" />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#3a5550] mb-1">Peso (ex: 75)</label>
              <input name="peso" value={formData.peso} onChange={handleChange} required className="w-full px-4 py-2 border rounded-md text-[#3a5550]" />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#3a5550] mb-1">Posição</label>
              <input name="posicao" value={formData.posicao} onChange={handleChange} required className="w-full px-4 py-2 border rounded-md text-[#3a5550]" />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#3a5550] mb-1">Perna dominante</label>
              <select name="pernaDominante" value={formData.pernaDominante} onChange={handleChange} required className="w-full px-4 py-2 border rounded-md text-[#3a5550]">
                <option value="">Selecione</option>
                <option value="direita">Direita</option>
                <option value="esquerda">Esquerda</option>
                <option value="ambas">Ambas</option>
              </select>
            </div>
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium text-[#3a5550] mb-1">Link da imagem</label>
            <input name="imagemUrl" value={formData.imagemUrl} onChange={handleChange} className="w-full px-4 py-2 border rounded-md text-[#3a5550]" />
          </div>

          {erro && <p className="text-red-500 text-sm mt-4 text-center">{erro}</p>}

          <button type="submit" className="w-full mt-6 bg-[#3a5550] text-white py-2 rounded-md font-semibold hover:bg-[#2e443f] transition">
            Cadastrar
          </button>
        </form>
      </main>
      <Footer />
    </>
  );}
