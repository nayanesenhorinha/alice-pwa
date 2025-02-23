import React, { useEffect } from 'react';
import book_infos from '../control/book_infos';
import Navigation from './Navigation';
import Header from '../components/Header';

const LookingGlass = ({ 
  onNext, 
  onPrev,
  goToSummary }) => {

    const chapterTitle = "Through the Looking-Glass";

    useEffect(() => {
      const bookTitleT = book_infos.title; 
      document.title = `${chapterTitle}`;
      return () => {
        document.title = book_infos.title; 
      };
    }, [chapterTitle]);

  return (
    <div className="page">
      Ilustração de prefácio 2
      <Navigation 
        onPrev={onPrev} 
        onNext={onNext} 
        goToSummary={goToSummary} 
       />
       <Header title={"Through the Looking-Glass"}/>
    </div>
  );
};

export default LookingGlass;