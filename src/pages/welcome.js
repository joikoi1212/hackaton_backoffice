import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// 🔹 Define a URL da API SEMPRE como a versão remota
const API_URL = process.env.NEXT_PUBLIC_APIS_URL_REMOTE;

export default function WelcomePage() {
  const [sessionData, setSessionData] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // 🔹 Estado para o loading inicial
  const router = useRouter();

  useEffect(() => {
    const checkSession = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/api/session`, {
          withCredentials: true, // Envia o JWT armazenado no cookie
        });

        if (!data.valid) {
          throw new Error("Sessão inválida");
        }

        setSessionData(data); // Guarda os dados da sessão (utilizador + token)
      } catch (error) {
        console.error("Erro ao verificar sessão:", error);
        toast.error("Erro ao verificar sessão. Redirecionando...");
        router.push("/auth");
      } finally {
        setTimeout(() => setIsLoading(false), 1000); // 🔹 Simula um tempo de carregamento
      }
    };

    checkSession();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post(`${API_URL}/api/logout`, {}, { withCredentials: true });
      toast.info("Admin Logout realizado com segurança!");
      router.push("/auth");
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
      toast.error("Erro ao tentar sair.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4 relative">

      {isLoading && (
        <div className="absolute inset-0 bg-black bg-opacity-80 flex flex-col items-center justify-center z-50">
          <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-white mb-4"></div>
          <p className="text-lg font-semibold text-white">A carregar...</p>
        </div>
      )}

      {!isLoading && (
        <>
          <h2 className="text-2xl font-bold mb-4">Bem-vindo</h2>

          {sessionData && (
            <div className="bg-gray-800 text-gray-300 p-3 rounded-md text-sm w-full max-w-md border border-gray-700 mb-4">
              <span className="font-semibold text-blue-400">Utilizador:</span>
              <pre className="mt-2 break-words whitespace-pre-wrap">
                {sessionData.user.walletAddress}
              </pre>

              {/* Exibir o Token JWT abaixo do utilizador */}
              <span className="font-semibold text-blue-400">Token JWT:</span>
              <pre className="mt-2 break-words whitespace-pre-wrap text-xs">
                {sessionData.token}
              </pre>
            </div>
          )}

          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            Logout
          </button>
        </>
      )}
    </div>
  );
}