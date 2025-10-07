"use client";

import React, { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import styles from "./ChatMessage.module.css";

type Direction = "incoming" | "outgoing";

interface ChatMsg {
  id: string;
  message: string;
  sentTime: string;
  sender: string;
  direction: Direction;
}

export default function UserChatPage() {
  const params = useParams();
  const userId = (params?.userId as string) ?? "desconocido";

  const [messages, setMessages] = useState<ChatMsg[]>([
    {
      id: "welcome",
      message: `Estás chateando con el usuario ${userId}`,
      sentTime: new Date().toLocaleTimeString(),
      sender: "system",
      direction: "incoming",
    },
  ]);

  const [draft, setDraft] = useState("");
  const endRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length]);

  const handleSend = () => {
    const trimmed = draft.trim();
    if (!trimmed) return;

    setMessages(prev => [
      ...prev,
      {
        id: crypto.randomUUID(),
        message: trimmed,
        sentTime: new Date().toLocaleTimeString(),
        sender: "me",
        direction: "outgoing",
      },
    ]);
    setDraft("");
  };

  const handleKeyDown: React.KeyboardEventHandler<HTMLTextAreaElement> = e => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <img
            src="/assets/users/userPhoto.png"
            alt={`Usuario ${userId}`}
            className={styles.headerAvatar}
          />
          <div className={styles.headerText}>
            <div className={styles.headerTitle}>Chat con usuario {userId}</div>
            <div className={styles.headerInfo}>En línea</div>
          </div>
        </div>
      </header>

      <main className={styles.content}>
        {messages.map(m => (
          <div
            key={m.id}
            className={`${styles.messageRow} ${
              m.direction === "outgoing" ? styles.rowRight : styles.rowLeft
            }`}
          >
            <div
              className={
                m.direction === "outgoing"
                  ? `${styles.bubble} ${styles.bubbleUser}`
                  : styles.bubble
              }
            >
              {m.message}
            </div>
            <div className={styles.meta}>
              <span className={styles.time}>{m.sentTime}</span>
            </div>
          </div>
        ))}
        <div ref={endRef} />
      </main>

      <footer className={styles.footer}>
        <textarea
          className={styles.input}
          placeholder="Escribe un mensaje…"
          value={draft}
          onChange={e => setDraft(e.target.value)}
          onKeyDown={handleKeyDown}
          rows={1}
        />
        <button type="button" className={styles.sendBtn} onClick={handleSend}>
          Enviar
        </button>
      </footer>
    </div>
  );
}
