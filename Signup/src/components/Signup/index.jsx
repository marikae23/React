import React, { useState } from 'react';
import './style.css'; 

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !password || !confirmPassword) {
      setError('Preencha todos os campos');
    } else if (password !== confirmPassword) {
      setError('As senhas não coincidem');
    } else {
      setError('');
      console.log('Nome:', name);
      console.log('Email:', email);
      console.log('Senha:', password);
    }
  };

  return (
    <div className="signup-container">
      <h2>Cadastrar-se</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="name">Nome:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Digite seu nome"
          />
        </div>
        <div className="input-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Digite seu email"
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">Senha:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Digite sua senha"
          />
        </div>
        <div className="input-group">
          <label htmlFor="confirmPassword">Confirme a senha:</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirme sua senha"
          />
        </div>
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
};

export default Signup;
