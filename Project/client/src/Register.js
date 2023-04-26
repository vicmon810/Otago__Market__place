import React, { useState } from "react";
import Modal from "react-modal";

<<<<<<< HEAD

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
=======
export default function Create() {
  const [form, setForm] = useState({
    name: "",
    position: "",
    level: "",
  });
  const navigate = useNavigate();

  // These methods will update the state properties.
  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  // This function will handle the submission.
  async function onSubmit(e) {
    e.preventDefault();

    // When a post request is sent to the create url, we'll add a new record to the database.
    const newPerson = { ...form };

    await fetch("http://localhost:8000/api/account_routes/account", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPerson),
    })
    .catch(error => {
      window.alert(error);
      return;
    });

    setForm({ name: "", position: "", level: "" });
    navigate("/");
  }
>>>>>>> e68a7692b194e147567c2073be7adaf183fa935b

  return (

    <RegisterModal isOpen={isModalOpen} onRequestClose={onClose}>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button type="submit">Register</button>
      </form>
      <button onClick={onClose}>Cancel</button>
    </RegisterModal>
  );
};

export default RegisterModal;
