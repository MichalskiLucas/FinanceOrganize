import { useLoginStore } from "./LoginStore";
import logo from "../../assets/logoFO.jpg";

export default function Login() {
  const { email, password, error, setEmail, setPassword, login } = useLoginStore();

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={(e) => { e.preventDefault(); login(); }}
        className="bg-white p-8 rounded-2xl shadow-md w-80 flex flex-col items-center"
      >
        <img src={logo} alt="Logo Finance Organize" className="w-24 h-24 mb-4" />

        <h1 className="text-2xl font-bold text-center mb-6 text-gray-700">
          Finance Organize
        </h1>

        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 mb-3 border rounded-md"
        />

        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-4 border rounded-md"
        />

        {error && <p className="text-red-500 text-sm mb-3 text-center">{error}</p>}

        <button
          type="submit"
          className="w-full bg-green-300 text-white py-2 rounded-md hover:bg-green-700"
        >
          Entrar
        </button>
      </form>
    </div>
  );
}
