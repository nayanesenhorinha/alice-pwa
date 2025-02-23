import React, { useEffect } from 'react';
import book_infos from '../control/book_infos';
import Navigation from './Navigation';
import Header from '../components/Header';

const Credits = ({onNext, onPrev, goToSummary}) => {

  const chapterTitle = "Credits";
  
    useEffect(() => {
      const bookTitleT = book_infos.title; 
      document.title = `${chapterTitle} of the Alice book`;
      return () => {
        document.title = book_infos.title; 
      };
    }, [chapterTitle]);

  return (
    <div className="page credits">


      
      
      <div className='credits_container'>
        <p className='thead'>Pintando as rosas de vermelho</p>

        <img 
        src="https://placehold.co/25" 
        alt="Imagem Placeholder" 
        loading="lazy" 
      />
        <div className='tr'>
          <p className='th ft'>Ilustração, capas e webdesigner</p>
          <p className='th'>Nayane de Souza</p>
        </div>
        
        <div className='tr'>
          <p className='th ft'>Texto</p>
          <p className='th'>Projeto Gutemberg</p>
        </div>

        <div className='tr'>
          <p className='th ft'>Revisão</p>
          <p className='th'>Nomes</p>
        </div>

        <div className='tr'>
          <p className='th ft'>Programação</p>
          <p className='th'>Nayane de Souza</p>
        </div>

        <div className='tr'>
          <p className='th ft'>Agradecimentos</p>
          <p className='th'>Laura<br/>João Victor<br/>Paulo César Castro</p>
        </div>

     
        <p className='tfooter'>Editora Sei lá ainda<br/>2025</p>
    </div>

      <Navigation 
        onPrev={onPrev} 
        onNext={onNext} 
        goToSummary={goToSummary} 
        />
      <Header title={"Credits"}/>
    </div>
  );
};

export default Credits;