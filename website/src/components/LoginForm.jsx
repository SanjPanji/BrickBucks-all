import { useState } from "react";
import { loginUser } from "../services/auth";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await loginUser({ email, password });
      localStorage.setItem("token", data.access);
      localStorage.setItem("refresh", data.refresh);
      alert("Вход успешен");
      navigate("/");
    } catch (error) {
      console.error("Login error:", error);
      alert("Ошибка входа");
    } finally {
      setLoading(false);
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
          disabled={loading}
        />
        <br />
        <input
          className="password"
          type="password"
          name="password"
          placeholder="*password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          disabled={loading}
        />
        <br />
        <button id="create" type="submit" disabled={loading}>
          {loading ? "Вход..." : "enter"}
        </button>
      </div>
    </form>
  );
}

