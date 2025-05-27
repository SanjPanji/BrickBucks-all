import { useState } from "react";
import { registerUser } from "../services/auth";
import { useNavigate } from "react-router-dom";


export default function RegisterForm() {
    const navigate = useNavigate();
    const [firstname,setFirstname] = useState("");
    const [lastname,setLastname] = useState("");
    const [phone,setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const username = `${firstname} ${lastname}`.replace(/\s+/g, "_");
    try {
        await registerUser({email, password, phone, username});
        alert("Регистрация успешна");
    } catch (err) {
        console.log(err.response?.data);
        alert("Ошибка регистрации");
    }
    navigate(-1);
  };

  return (
    <form onSubmit={handleSubmit} className="register-form">
        <h2>create account</h2>
        <div className="personal-info">
        <h2>personal information</h2>
        <input
        id="firName"
        type="text"
        name=" fisrt name"
        placeholder="*first name"
        value={firstname}
        onChange={(e) => setFirstname(e.target.value)}
        required
        />
        <br/>
        <input
        id="lasName"
        type="text"
        name="last name"
        placeholder="*last name"
        value={lastname}
        onChange={(e) => setLastname(e.target.value)}
        required
        />
        <br/>
        <input
        type="phone"
        className="phone"
        placeholder="*phone"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        required
        />

        <h2>security</h2>
        <input
        className="email"
        type="email"
        name="email"
        placeholder="*email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        />
        <br/>
        <input
        className="password"
        type="password"
        name="password"
        placeholder="*password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        />
        <br></br>
        <button id="create" type="submit">create account</button>
        </div>
    </form>
  );
}
