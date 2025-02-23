import React, { useEffect } from 'react';
import Navigation from './Navigation';
import Header from '../components/Header';

const Colophon = ({ 
  
  onNext, 
  onPrev,
  goToSummary,
   }) => {

  
  return (
    <div className="page">
      <div className='colophon'>
        <p className='chapter_text'>
          Este e-book foi desenvolvido como projeto de conclusão do curso de Comunicação Social com habilitação em Produção Editorial da Universidade Federal do Rio de Janeiro (UFRJ), que será defendido por Nayane de Souza em junho de 2025. O objetivo é a criação de um projeto gráfico digital de livro, experimentando um novo formato de e-book. Este e-book é um projeto acadêmico e não possui fins lucrativos.
        </p>
      </div>
      

      <Navigation 
        onPrev={onPrev} 
        onNext={onNext} 
        goToSummary={goToSummary} 
        />
      <Header />
    </div>
  );
};

export default Colophon;