"use client";

import { useState, useRef, useEffect } from "react";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  type MessageModel,
} from "@chatscope/chat-ui-kit-react";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import "./ChatBox.css";

const CHAT_MOCK = {
  name: "Eleonor",
  img: "/assets/users/3.jpg",
  online: true,
} as const;

export default function ChatBox() {
  const [messages, setMessages] = useState<MessageModel[]>([
    {
      message: "How was your last campaign?",
      sentTime: "10:30 AM",
      sender: "DragonHeart88",
      direction: "incoming",
      position: "single",
    },
    {
      message: "It was intense! We fought a corrupted ancient dragon.",
      sentTime: "10:31 AM",
      sender: "DragonHeart88",
      direction: "incoming",
      position: "single",
    },
    {
      message: "Sounds epic! What did you loot?",
      sentTime: "10:32 AM",
      sender: "Player",
      direction: "outgoing",
      position: "single",
    },
  ]);

  const [text, setText] = useState("");

  // ✅ Ref sobre un contenedor padre
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  // 🪄 Scroll automático hasta el final
  useEffect(() => {
    const list = wrapperRef.current?.querySelector(
      ".cs-message-list__content"
    ) as HTMLDivElement | null;

    if (list) {
      list.scrollTo({
        top: list.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  const handleSend = () => {
    if (!text.trim()) return;

    const newMsg: MessageModel = {
      message: text.trim(),
      sentTime: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      sender: "Player",
      direction: "outgoing",
      position: "single",
    };

    setMessages((prev) => [...prev, newMsg]);
    setText("");
  };

  return (
    <Card
      className="chat-wrapper p-0"
      title={
        <div className="chat-header">
          <div className="chat-header-left">
            <img
              src={CHAT_MOCK.img}
              alt={CHAT_MOCK.name}
              className="chat-avatar"
            />
            <div className="chat-user-info">
              <div className="chat-user-row">
                <div className="chat-username">{CHAT_MOCK.name}</div>
                <span
                  className={`status-indicator ${
                    CHAT_MOCK.online ? "online" : "offline"
                  }`}
                  aria-hidden="true"
                  title={CHAT_MOCK.online ? "Online" : "Offline"}
                />
              </div>
            </div>
          </div>
        </div>
      }
    >
      {/* ✅ ref sobre el contenedor del chat */}
      <div ref={wrapperRef} style={{ height: "100%", display: "flex", flexDirection: "column" }}>
        <MainContainer>
          <ChatContainer>
            <MessageList style={{ flex: "1 1 auto", minHeight: 0 }}>
              {messages.map((m, i) => (
                <Message key={i} model={m} />
              ))}
            </MessageList>
          </ChatContainer>
        </MainContainer>
      </div>

      <div className="primereact-input-area compact">
        <InputText
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type your message..."
          className="chat-input-text"
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <Button
          icon="pi pi-send"
          className="chat-send-button"
          onClick={handleSend}
        />
      </div>
    </Card>
  );
}
