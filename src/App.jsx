import React, { useEffect, useState } from "react";
import Book from "./pages/Book";
import MetaTags from "./components/MetaTags";
import './styles/ebook.css';

function App() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowPopup(true); 
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
        <div className="popupStyle">
          <p className='titulo'>Quer instalar nosso app?</p>
          <p className='descricao'>Instalando o app você pode fazer a leitura offline direto e facilidade de acesso ao ebook</p>

        <div className="pop-buttons">
          <button onClick={installPWA}>Instalar</button>
          <button onClick={() => setShowPopup(false)}>Fechar</button>
        </div>
        </div>
      )}


    </div>
  );
}


export default App;
