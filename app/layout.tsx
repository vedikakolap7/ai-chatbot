import ThemeProvider from '../lib/theme';

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
          display: "inline-block",
          position: "absolute",
          left: "50%",
          transform: "translateX(-50%)",
          overflow: "hidden",
          transition: "background 0.3s ease, color 0.3s ease",
          width: "55%",
          maxWidth: "55%",
        }}
      >
        <style
          dangerouslySetInnerHTML={{
            __html: `
              [data-theme="light"] body {
                background: linear-gradient(135deg, #f5f5f5 0%, #e6e6e6 40%, #d4d4d4 100%);
                color: #111;
              }

              [data-theme="dark"] body {
                background: #000000; /* ✅ true black background */
                color: #000000;
              }

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
                transition: background 0.3s ease;
              }

              [data-theme="dark"] body::before {
                background:
                  radial-gradient(circle at 25% 30%, rgba(139, 92, 246, 0.25) 0%, transparent 60%),
                  radial-gradient(circle at 75% 70%, rgba(0, 0, 0, 0.5) 0%, transparent 70%),
                  radial-gradient(circle at 50% 90%, rgba(60, 60, 60, 0.3) 0%, transparent 80%);
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
                transition: background 0.3s ease;
              }

              [data-theme="dark"] body::after {
                background: rgba(0, 0, 0, 0.3);
              }
            `,
          }}
        />

        {/* ✅ Theme provider controls color and background */}
        <ThemeProvider>
          <div
            style={{
              position: "relative",
              zIndex: 1,
              width: "100%",
              display: "flex",
              justifyContent: "center",
            }}
          >
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
} 