import RegisterForm from '@/components/RegisterForm';

export default function CadastroJogador() {
  return <RegisterForm userType="jogador" redirectTo="/jogador/login" />;
}
