import type { Message } from "../lib/types";
import React, { useState } from "react";
import { Copy, Check } from "lucide-react";

interface ChatMessageProps {
  message: Message;
  theme?: "light" | "dark";
}

export function ChatMessage({ message, theme = "light" }: ChatMessageProps) {
  const isUser = message.role === "user";
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(message.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const textColor =
    theme === "dark"
      ? isUser
        ? "#ffffff"
        : "#e5e7eb"
      : isUser
      ? "#ffffff"
      : "#1f1f1f";

  const bgColor =
    theme === "dark"
      ? isUser
        ? "linear-gradient(145deg, #2E2E2E, #1A1A1A)"
        : "rgba(30, 30, 30, 0.6)"
      : isUser
      ? "linear-gradient(145deg, #2E2E2E, #1A1A1A)"
      : "rgba(255, 255, 255, 0.35)";

  const borderColor =
    theme === "dark"
      ? isUser
        ? "1px solid rgba(255, 255, 255, 0.15)"
        : "1px solid rgba(255, 255, 255, 0.2)"
      : isUser
      ? "1px solid rgba(255, 255, 255, 0.15)"
      : "1px solid rgba(255, 255, 255, 0.45)";

  const timestampColor =
    theme === "dark"
      ? "rgba(255, 255, 255, 0.5)"
      : "rgba(0, 0, 0, 0.5)";

  return (
    <div
      style={{
        display: "flex",
        justifyContent: isUser ? "flex-end" : "flex-start",
        marginBottom: 20,
        width: "100%", // ✅ keep message within container width
      }}
    >
      <div
        style={{
          maxWidth: "75%",
    width: "fit-content",
    minWidth: "200px",
    position: "relative",
        }}
      >
        <div
          style={{
            padding: "14px 18px",
            borderRadius: 20,
            background: bgColor,
            color: textColor,
            backdropFilter: "blur(18px) saturate(160%)",
            WebkitBackdropFilter: "blur(18px) saturate(160%)",
            border: borderColor,
            boxShadow: isUser
              ? "0 6px 16px rgba(0, 0, 0, 0.25)"
              : "0 6px 20px rgba(0, 0, 0, 0.08)",
            whiteSpace: "pre-wrap",
            wordBreak: "break-word", // ✅ prevent overflow from long words/markdown
            overflowWrap: "break-word",
            lineHeight: 1.6,
            fontSize: 15,
            letterSpacing: 0.2,
            transition: "all 0.3s ease",
            position: "relative",
            boxSizing: "border-box",
            maxWidth: "100%", // ✅ ensures inner text never expands box
          }}
          onMouseEnter={(e) => {
            const copyBtn = e.currentTarget.querySelector(
              "[data-copy-button]"
            ) as HTMLElement;
            if (copyBtn) copyBtn.style.opacity = "1";
          }}
          onMouseLeave={(e) => {
            const copyBtn = e.currentTarget.querySelector(
              "[data-copy-button]"
            ) as HTMLElement;
            if (copyBtn && !copied) copyBtn.style.opacity = "0";
          }}
        >
          {message.content}
          <button
            data-copy-button
            onClick={handleCopy}
            style={{
              position: "absolute",
              top: 8,
              right: 8,
              width: 28,
              height: 28,
              borderRadius: "50%",
              border: "none",
              background:
                theme === "dark"
                  ? "rgba(255, 255, 255, 0.15)"
                  : "rgba(0, 0, 0, 0.05)",
              color: textColor,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              opacity: copied ? 1 : 0,
              transition: "all 0.2s ease",
              backdropFilter: "blur(10px)",
            }}
            title="Copy message"
          >
            {copied ? <Check size={14} /> : <Copy size={14} />}
          </button>
        </div>

        <div
          style={{
            fontSize: 11,
            color: timestampColor,
            marginTop: 6,
            textAlign: isUser ? "right" : "left",
            paddingLeft: isUser ? 0 : 6,
            paddingRight: isUser ? 6 : 0,
            opacity: 0.6,
            wordWrap: "break-word",
            overflowWrap: "break-word",
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
