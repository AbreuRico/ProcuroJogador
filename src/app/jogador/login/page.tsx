import LoginForm from '@/components/LoginForm';

export default function LoginJogador() {
  return <LoginForm redirectTo="/jogador/dashboard" userType="jogador" />;
}
