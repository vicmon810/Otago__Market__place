import React, { useState } from 'react';
import Modal from 'react-modal';


const RegisterModal = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(true);

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    // Make POST request to server with form data
  };

  return (

    <RegisterModal isOpen={isModalOpen} onRequestClose={onClose}>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <label>
          Email:
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <button type="submit">Register</button>
      </form>
      <button onClick={onClose}>Cancel</button>
    </RegisterModal>
  );
};

export default RegisterModal;
