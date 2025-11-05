import type { Message } from "../lib/types";
import React from "react";

export function ChatMessage({ message }: { message: Message }) {
  const isUser = message.role === "user";

  return (
    <div
      style={{
        display: "flex",
        justifyContent: isUser ? "flex-end" : "flex-start",
        marginBottom: 20,
      }}
    >
      <div style={{ maxWidth: "75%" }}>
        <div
          style={{
            padding: "14px 18px",
            borderRadius: 20,
            background: isUser
              ? "linear-gradient(145deg, #2E2E2E, #1A1A1A)" // user (dark glossy bubble)
              : "rgba(255, 255, 255, 0.35)", // AI (light glass)
            color: isUser ? "#ffffff" : "#1f1f1f",
            backdropFilter: "blur(18px) saturate(160%)",
            WebkitBackdropFilter: "blur(18px) saturate(160%)",
            border: isUser
              ? "1px solid rgba(255, 255, 255, 0.15)"
              : "1px solid rgba(255, 255, 255, 0.45)",
            boxShadow: isUser
              ? "0 6px 16px rgba(0, 0, 0, 0.25)"
              : "0 6px 20px rgba(0, 0, 0, 0.08)",
            whiteSpace: "pre-wrap",
            lineHeight: 1.6,
            fontSize: 15,
            letterSpacing: 0.2,
            transition: "all 0.3s ease",
          }}
        >
          {message.content}
        </div>

        <div
          style={{
            fontSize: 11,
            color: "rgba(0, 0, 0, 0.5)",
            marginTop: 6,
            textAlign: isUser ? "right" : "left",
            paddingLeft: isUser ? 0 : 6,
            paddingRight: isUser ? 6 : 0,
            opacity: 0.6,
          }}
        >
          {new Date(message.timestamp).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </div>
      </div>
    </div>
  );
}
