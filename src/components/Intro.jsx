import React, { useEffect } from 'react';
import book_infos from '../control/book_infos';
import Navigation from './Navigation';
import Header from '../components/Header';

const Intro = ({ 
  onNext, 
  onPrev,
  goToSummary
  }) => {

    const chapterTitle = "Introducion";

    useEffect(() => {
      const bookTitleT = book_infos.title; 
      document.title = `${chapterTitle} of the Alice book`;
      return () => {
        document.title = book_infos.title; 
      };
    }, [chapterTitle]);
      

  return (
    <div className="page">
      Ilustração de introdução
      <Navigation 
        onPrev={onPrev} 
        onNext={onNext} 
        goToSummary={goToSummary} 
        />
      <Header title={"Alice"}/>
    </div>
  );
};

export default Intro;