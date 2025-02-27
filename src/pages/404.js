import { useEffect } from "react";
import { useRouter } from "next/router";
import useMessages from "../hooks/useMessages";
import { FiAlertTriangle } from "react-icons/fi"; // Ícone de erro

export default function Custom404() {
  const messages = useMessages();
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      router.replace("/auth");
    }, 3000);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-6">
      {/* Ícone de erro */}
      <FiAlertTriangle className="text-yellow-400 text-6xl animate-bounce mb-4" />
      
      {/* Mensagem de erro */}
      <h1 className="text-3xl font-bold">{messages.error?.page_not_found}</h1>
      <p className="text-gray-400 mt-2">{messages.error?.redirecting_auth}</p>

      {/* Barra de progresso do redirecionamento */}
      <div className="w-40 mt-4 h-1 bg-gray-700 rounded-full overflow-hidden">
        <div className="w-full h-full bg-yellow-400 animate-pulse"></div>
      </div>
    </div>
  );
}