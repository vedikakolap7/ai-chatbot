export const metadata = {
  title: "AI Chatbot",
  description: "A sleek and modern AI chat interface",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          fontFamily:
           "'Plus Jakarta Sans', 'Poppins', 'Inter'",
          background:
            "linear-gradient(135deg, #f5f5f5 0%, #e6e6e6 40%, #d4d4d4 100%)",
          color: "#111",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <style
          dangerouslySetInnerHTML={{
            __html: `
          body::before {
            content: '';
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background:
              radial-gradient(circle at 25% 30%, rgba(255, 255, 255, 0.4) 0%, transparent 60%),
              radial-gradient(circle at 75% 70%, rgba(0, 0, 0, 0.1) 0%, transparent 70%),
              radial-gradient(circle at 50% 90%, rgba(180, 180, 180, 0.2) 0%, transparent 80%);
            filter: blur(60px);
            pointer-events: none;
            z-index: 0;
          }

          body::after {
            content: '';
            position: fixed;
            inset: 0;
            background: rgba(255, 255, 255, 0.15);
            backdrop-filter: blur(40px) saturate(160%);
            Webkit-backdrop-filter: blur(40px) saturate(160%);
            pointer-events: none;
            z-index: 0;
          }
        `,
          }}
        />
        <div style={{ position: "relative", zIndex: 1, width: "100%" }}>
          {children}
        </div>
      </body>
    </html>
  );
}
