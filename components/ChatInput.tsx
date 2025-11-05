import React, { useState } from "react";
import { Send, Loader2 } from "lucide-react";

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSend, disabled }) => {
  const [input, setInput] = useState("");
  const maxChars = 500;

  const handleSubmit = () => {
    if (input.trim() && !disabled) {
      onSend(input.trim());
      setInput("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div
      style={{
        background: "rgba(255, 255, 255, 0.3)",
        backdropFilter: "blur(25px) saturate(160%)",
        WebkitBackdropFilter: "blur(25px) saturate(160%)",
        borderRadius: 24,
        border: "1px solid rgba(255, 255, 255, 0.4)",
        padding: "12px 18px",
        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.15)",
        display: "flex",
        alignItems: "center",
        gap: 12,
      }}
    >
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value.slice(0, maxChars))}
        onKeyDown={handleKeyDown}
        placeholder="Write a message..."
        disabled={disabled}
        rows={1}
        style={{
          flex: 1,
          background: "rgba(255, 255, 255, 0.5)",
          border: "1px solid rgba(255, 255, 255, 0.6)",
          borderRadius: 18,
          padding: "14px 18px",
          fontSize: 15,
          color: "#1F1F1F",
          resize: "none",
          outline: "none",
          height: "50px",
          boxShadow: "inset 0 2px 8px rgba(0, 0, 0, 0.05)",
          transition: "all 0.3s ease",
        }}
      />

      <button
        onClick={handleSubmit}
        disabled={disabled || !input.trim()}
        style={{
          width: 52,
          height: 52,
          borderRadius: "50%",
          border: "1px solid rgba(255, 255, 255, 0.4)",
          background: disabled || !input.trim()
            ? "linear-gradient(145deg, rgba(180,180,180,0.3), rgba(220,220,220,0.15))"
            : "linear-gradient(145deg, #2E2E2E, #1A1A1A)",
          color: "#fff",
          cursor: disabled || !input.trim() ? "not-allowed" : "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: disabled
            ? "none"
            : "0 6px 16px rgba(0, 0, 0, 0.25)",
          transition: "all 0.3s ease",
        }}
      >
        {disabled ? (
          <Loader2 className="w-5 h-5 animate-spin" />
        ) : (
          <Send className="w-5 h-5" />
        )}
      </button>
    </div>
  );
};

export default ChatInput;
