import { useEffect } from "react";
import { useRouter } from "next/router";
import useMessages from "../hooks/useMessages";
import { FiAlertTriangle } from "react-icons/fi"; // Ícone de erro

export default function ErrorPage({ statusCode }) {
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
      <FiAlertTriangle className="text-red-500 text-6xl animate-bounce mb-4" />
      
      {/* Mensagem de erro */}
      <h1 className="text-3xl font-bold">
        {statusCode === 404
          ? messages.error?.page_not_found
          : messages.error?.server_error}
      </h1>
      <p className="text-gray-400 mt-2">{messages.error?.redirecting_auth}</p>

      {/* Barra de progresso do redirecionamento */}
      <div className="w-40 mt-4 h-1 bg-gray-700 rounded-full overflow-hidden">
        <div className="w-full h-full bg-red-500 animate-pulse"></div>
      </div>
    </div>
  );
}

ErrorPage.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};
