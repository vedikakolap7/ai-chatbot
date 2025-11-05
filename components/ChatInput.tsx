import React, { useState } from "react";
import { Send, Loader2 } from "lucide-react";

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled: boolean;
  theme?: 'light' | 'dark';
}

const ChatInput: React.FC<ChatInputProps> = ({ onSend, disabled, theme = 'light' }) => {
  const [input, setInput] = useState("");
  const maxChars = 500;

  const bgColor = theme === 'dark'
    ? 'rgba(30, 30, 30, 0.3)'
    : 'rgba(255, 255, 255, 0.3)';
  const borderColor = theme === 'dark'
    ? '1px solid rgba(255, 255, 255, 0.2)'
    : '1px solid rgba(255, 255, 255, 0.4)';
  const inputBg = theme === 'dark'
    ? 'rgba(40, 40, 40, 0.5)'
    : 'rgba(255, 255, 255, 0.5)';
  const inputBorder = theme === 'dark'
    ? '1px solid rgba(255, 255, 255, 0.2)'
    : '1px solid rgba(255, 255, 255, 0.6)';
  const textColor = theme === 'dark' ? '#e5e7eb' : '#1F1F1F';
  const placeholderColor = theme === 'dark' ? 'rgba(255, 255, 255, 0.4)' : 'rgba(0, 0, 0, 0.4)';

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
    <>
      <style dangerouslySetInnerHTML={{
        __html: `
          .chat-input-textarea::placeholder {
            color: ${placeholderColor} !important;
          }
        `
      }} />
      <div
        style={{
          background: bgColor,
          backdropFilter: "blur(25px) saturate(160%)",
          WebkitBackdropFilter: "blur(25px) saturate(160%)",
          borderRadius: 24,
          border: borderColor,
          padding: "12px 18px",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.15)",
          display: "flex",
          alignItems: "center",
          gap: 12,
        }}
      >
        <textarea
          className="chat-input-textarea"
          value={input}
          onChange={(e) => setInput(e.target.value.slice(0, maxChars))}
          onKeyDown={handleKeyDown}
          placeholder="Write a message..."
          disabled={disabled}
          rows={1}
          style={{
            flex: 1,
            background: inputBg,
            border: inputBorder,
            borderRadius: 18,
            padding: "14px 18px",
            fontSize: 15,
            color: textColor,
            resize: "none",
            outline: "none",
            height: "50px",
            boxShadow: theme === 'dark' 
              ? "inset 0 2px 8px rgba(0, 0, 0, 0.3)"
              : "inset 0 2px 8px rgba(0, 0, 0, 0.05)",
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
          //display: "flex",
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
    </>
  );
};

export default ChatInput;
