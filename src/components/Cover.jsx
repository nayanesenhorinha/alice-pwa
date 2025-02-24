import React from 'react';
import book_infos from '../control/book_infos';

const Cover = ({ onNext }) => {
  const { title: titulo, publisher: editora, author: autor } = book_infos;

  return (
    <div className="cover">

        <div className="popupStyle">
          <p className='titulo'>Quer instalar nosso app?</p>
          <p className='descricao'>Instalando o app você pode fazer a leitura offline direto e facilidade de acesso ao ebook</p>
          <div className="pop-buttons">
            
          <button >Não</button>
          <button>Sim</button>
          </div>
          
        </div>

      <img 
        className="cover-image" 
        src="https://raw.githubusercontent.com/nayanepreta/alice-in-wonderland/refs/heads/main/src/assets/capa.png" 
        alt={`Capa do livro ${titulo}`} 
        loading="lazy" 
      />

      <div className="navigation">
        <button onClick={onNext} aria-label="Próxima página">
          <img
            src="https://raw.githubusercontent.com/nayanesenhorinha/abelhinha/refs/heads/main/src/assets/depois.png"
            alt="Próxima"
            className="nav-icon"
            loading="lazy"
          />
        </button>
      </div>



    </div>
  );
};

export default Cover;
