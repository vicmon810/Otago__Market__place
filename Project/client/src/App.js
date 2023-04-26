import { BrowserRouter, Routes, Route } from "react-router-dom";

// We import all the components we need in our app
import Navbar from "./components/navbar/navbar";
import RecordList from "./components/itemList/itemsList";
import Edit from "./components/edit/edit";
import Create from "./components/CreateItems/createItem";
import LoginForm from "./components/login/Login";
import MessageForm from "./components/sendMessage/sendMessage";
import Register from "./components/CreateAccount/createAccount";
const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<RecordList />} />
        <Route path="/edit/:id" element={<Edit />} />
        <Route path="/create" element={<Create />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="register" element={<Register />} />
        <Route path="message" element={<MessageForm />} />
      </Routes>
    </div>
  );
};

export default App;
