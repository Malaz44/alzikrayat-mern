import { useState } from 'react';
import LoginForm from '../components/LoginForm.jsx';
import RegisterForm from '../components/RegisterForm.jsx';

// one page that switches between the login and register forms
export default function LoginRegister() {
  const [mode, setMode] = useState('login');

  return mode === 'login' ? (
    <LoginForm onSwitch={() => setMode('register')} />
  ) : (
    <RegisterForm onSwitch={() => setMode('login')} onRegistered={() => setMode('login')} />
  );
}