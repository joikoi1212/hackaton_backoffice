import { useState, useEffect } from "react";

export default function useMessages() {
  const [messages, setMessages] = useState({});

  useEffect(() => {
    fetch("/locales/pt/messages.json")
      .then((res) => res.json())
      .then((data) => setMessages(data))
      .catch(() => console.error("Erro ao carregar mensagens."));
  }, []);

  return messages;
}