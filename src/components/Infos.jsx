import React from 'react';
import Navigation from './Navigation';
import book_infos from '../control/book_infos';
import chapters_in_wonderland from '../control/chapters_in_wonderland';
import chapters_looking_glass from '../control/chapters_looking_glass';
import Header from '../components/Header';

const { title: titulo, publisher: editora, author: autor } = book_infos;

const titulo_in_wonderland = chapters_in_wonderland[0].title;
const titulo_looking_glass = chapters_looking_glass[0].title; 

const Infos = ({ 
  onNext,  
  onPrev,
  goToSummary}) => {

return (
  <div className="page info">
    <Navigation 
      onNext={onNext} 
      onPrev={onPrev} 
      goToSummary={goToSummary} />

    <Header title={"Alice"}/>

    <div className='info_head'>
      <img 
          src="https://placehold.co/25" 
          alt="Imagem Placeholder" 
          loading="lazy" 
        />
      <p>{autor}</p>
    </div>

    <div className='info_titulo'>
      <img 
        src="https://placehold.co/300x200" 
        alt={editora} loading="lazy"/>
      <p>{titulo_in_wonderland}<br/>{titulo_looking_glass}</p>
    </div>

    <img 
      className="info_logo" 
      src="https://placehold.co/50" 
      alt={editora} loading="lazy"/>
    
    
  </div>
); };

export default Infos;