import { useState } from "react";
import { loginUser } from "../services/auth";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
    const { data } = await loginUser({email, password});
    localStorage.setItem("token", data.access);
    localStorage.setItem("refresh", data.refresh);
    alert("Вход успешен");
    } catch {
    alert("Ошибка входа");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="login-form">
        <div className="login-info">
        <h2>sign in</h2>
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
        onChange={(e) =>setPassword(e.target.value)}
        required
        />
        <br></br>
        <button id="create" type="submit">enter</button>
        </div>
    </form>
  );
}
