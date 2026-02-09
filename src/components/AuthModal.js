import React, { useState } from 'react';
import Modal from './Modal';
import { useAuth } from '../context/AuthContext';

function AuthModal({ isOpen, onClose, mode }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      if (mode === 'login') {
        // Itt implementálhatjuk a valódi backend hívást
        if (email && password) {
          login({ email });
          onClose();
        }
      } else {
        // Regisztráció logika
        if (email && password) {
          login({ email });
          onClose();
        }
      }
    } catch (err) {
      setError('Hiba történt. Kérjük próbálja újra.');
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="auth-modal">
        <h2>{mode === 'login' ? 'Bejelentkezés' : 'Regisztráció'}</h2>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Jelszó:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="auth-submit">
            {mode === 'login' ? 'Bejelentkezés' : 'Regisztráció'}
          </button>
        </form>
      </div>
    </Modal>
  );
}

export default AuthModal;