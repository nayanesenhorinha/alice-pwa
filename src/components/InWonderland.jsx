import React, { useEffect } from 'react';
import book_infos from '../control/book_infos';
import Navigation from './Navigation';
import Header from '../components/Header';

const InWonderland = ({ 
  onNext, 
  onPrev,
  goToSummary }) => {

    const chapterTitle = "Alice’s Adventures in Wonderland";

    useEffect(() => {
      const bookTitleT = book_infos.title; 
      document.title = `${chapterTitle}`;
      return () => {
        document.title = book_infos.title; 
      };
    }, [chapterTitle]);

  return (
    <div className="page">
      Ilustração de prefácio
      <Navigation 
        onPrev={onPrev} 
        onNext={onNext} 
        goToSummary={goToSummary} 
       />
      <Header title={"Alice’s Adventures in Wonderland"}/>
    </div>
  );
};

export default InWonderland;