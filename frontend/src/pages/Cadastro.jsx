import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Cadastro() {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const userExists = users.some(
      (u) => u.email === email || u.username === username
    );

    if (userExists) {
      setMessage("⚠️ Usuário ou e-mail já cadastrado.");
      return;
    }

    const newUser = { username, email, password };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    setMessage("✅ Cadastro realizado com sucesso!");
    setTimeout(() => navigate("/login"), 1500);
  };

  return (
    <div className="min-h-screen bg-green-700 flex items-center justify-center px-6">
      <div className="bg-green-700 text-white w-full max-w-sm rounded-2xl flex flex-col items-center py-10">
        <div className="bg-white p-4 rounded-full mb-6">
          <img
            src="../../assets/Vector.svg"
            alt="Logo"
            className="w-10 h-10"
          />
        </div>

        <form className="w-full px-6 flex flex-col gap-4" onSubmit={handleRegister}>
          <div>
            <label className="text-sm">Nome de Usuário</label>
            <input
              type="text"
              placeholder="Ex: alexandre_vitor"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full mt-1 px-4 py-2 rounded-lg border border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label className="text-sm">E-mail</label>
            <input
              type="email"
              placeholder="Ex: exemplo@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mt-1 px-4 py-2 rounded-lg border border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div className="relative">
            <label className="text-sm">Senha</label>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Ex: Senhaforte123"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full mt-1 px-4 py-2 rounded-lg border border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-9 text-gray-500"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <button
            type="submit"
            className="bg-white text-green-700 font-semibold py-2 rounded-lg mt-2 hover:bg-gray-100 transition"
          >
            Cadastrar
          </button>
        </form>

        {message && <p className="mt-3 text-sm">{message}</p>}

        <p className="text-sm mt-6">
          Já tem uma conta?{" "}
          <span
            className="font-semibold underline cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Entrar
          </span>
        </p>
      </div>
    </div>
  );
}
