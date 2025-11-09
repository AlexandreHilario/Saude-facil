import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [emailOrUser, setEmailOrUser] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const user = users.find(
      (u) =>
        (u.email === emailOrUser || u.username === emailOrUser) &&
        u.password === password
    );

    if (!user) {
      alert("Login ou senha incorretos!");
      return;
    }

    localStorage.setItem(
      "loggedUserData",
      JSON.stringify({
        id_usuario: user.id_usuario || 1, 
        nome_usuario: user.username,
        email: user.email,
      })
    );
    
    navigate("/");
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

        <form className="w-full px-6 flex flex-col gap-4" onSubmit={handleLogin}>
          <div>
            <label className="text-sm">Login</label>
            <input
              type="text"
              placeholder="Ex: E-mail ou Nome de usuário"
              value={emailOrUser}
              onChange={(e) => setEmailOrUser(e.target.value)}
              className="w-full mt-1 px-4 py-2 rounded-lg border border-gray-300 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div className="relative">
            <label className="text-sm">Senha</label>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Ex: Senhaforte123"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full mt-1 px-4 py-2 rounded-lg border border-gray-300 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 pr-10"
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
            Entrar
          </button>
        </form>

        <p className="text-sm mt-6">
          Novo por aqui?{" "}
          <span
            className="font-semibold underline cursor-pointer"
            onClick={() => navigate("/register")}
          >
            Cadastre-se
          </span>
        </p>
      </div>
    </div>
  );
}
