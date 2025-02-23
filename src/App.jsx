import React, { useEffect, useState } from "react";
import Book from "./pages/Book";
import MetaTags from "./components/MetaTags";

function App() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowPopup(true); // Mostra o pop-up quando o prompt estiver disponível
    };

    window.addEventListener("beforeinstallprompt", handler);

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
    };
  }, []);

  const installPWA = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === "accepted") {
          console.log("Usuário instalou o PWA");
        } else {
          console.log("Usuário cancelou a instalação");
        }
        setDeferredPrompt(null);
        setShowPopup(false);
      });
    }
  };

  return (
    <div className="ebook">
      <MetaTags />
      <Book />

      {showPopup && (
        <div style={popupStyle}>
          <p>Quer instalar nosso app?</p>
          <button onClick={installPWA}>Instalar</button>
          <button onClick={() => setShowPopup(false)}>Fechar</button>
        </div>
      )}
    </div>
  );
}

const popupStyle = {
  position: "fixed",
  bottom: "20px",
  left: "50%",
  transform: "translateX(-50%)",
  backgroundColor: "#fff",
  padding: "15px",
  borderRadius: "8px",
  boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
  display: "flex",
  gap: "10px",
};

export default App;
