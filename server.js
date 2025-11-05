import http from "http";
import { Server } from "socket.io";

const server = http.createServer();
const io = new Server(server, {
  cors: {
    origin: "*", // allow frontend
  },
});

io.on("connection", (socket) => {
  console.log("✅ Client connected:", socket.id);

  socket.on("user_message", async ({ id, text }) => {
    console.log("💬 Received message:", text);

    try {
      console.log("📤 Calling API route...");
      const res = await fetch("http://localhost:3000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: text }),
      }).catch((fetchError) => {
        console.error("❌ Fetch error:", fetchError);
        throw new Error(`Failed to connect to API: ${fetchError.message}`);
      });

      console.log("📡 API Response status:", res.status, res.statusText);

      if (!res.ok) {
        const errorText = await res.text().catch(() => "Unknown error");
        console.error("❌ API Error Response:", errorText);
        throw new Error(`Chat API failed: ${res.status} - ${errorText}`);
      }

      if (!res.body) {
        console.error("❌ No response body");
        throw new Error("Chat API failed: No response body");
      }

      console.log("✅ Starting to read stream...");

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });

        let newline;
        while ((newline = buffer.indexOf("\n")) >= 0) {
          const line = buffer.slice(0, newline).trim();
          buffer = buffer.slice(newline + 1);
          if (!line) continue;

          try {
            const json = JSON.parse(line);

            if (json.text) {
              socket.emit("chunk", { id, text: json.text });
            }

            if (json.done) {
              socket.emit("done", { id });
              break;
            }

            if (json.error) {
              socket.emit("error", { id, message: json.error });
              break;
            }
          } catch (e) {
            console.warn("⚠️ Bad line:", line, e);
          }
        }
      }
    } catch (err) {
      console.error("❌ Server error:", err);
      const errorMessage = err instanceof Error ? err.message : String(err);
      socket.emit("error", { id, message: errorMessage });
    }
  });

  socket.on("disconnect", () => {
    console.log("❌ Client disconnected:", socket.id);
  });
});

server.listen(3001, () => {
  console.log("🚀 Socket.IO server running on http://localhost:3001");
});
