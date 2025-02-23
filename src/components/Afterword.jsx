import React, { useEffect } from 'react';
import book_infos from '../control/book_infos';
import Navigation from './Navigation';
import Header from '../components/Header';

const Afterword = ({ 
  onPrev,
  onNext, 
  goToCover,
  goToSummary }) => {

    const chapterTitle = "Afterword";
  
    useEffect(() => {
      const bookTitleT = book_infos.title; 
      document.title = `${chapterTitle} of the Alice book`;
      return () => {
        document.title = book_infos.title; 
      };
    }, [chapterTitle]);
  
  return (
    <div className="page">
      Encerramento
      <Navigation 
        onPrev={onPrev} 
        onNext={onNext} 
        goToSummary={goToSummary} 
        />
      <Header />
    </div>
  );
};

export default Afterword;