import React, { useEffect, useCallback, useRef } from 'react';
import DOMPurify from 'dompurify';
import book_infos from '../control/book_infos';
import chapters_in_wonderland from '../control/chapters_in_wonderland';
import chapters_looking_glass from '../control/chapters_looking_glass';
import Header from '../components/Header';
import Navigation from './Navigation';
import Footer from './Footer'; 

const Chapter = ({   bookId, chapterNumber, onNext, goToSummary, goToCover, onPrev }) => {

  // Identificar qual conjunto de capítulos usar
  const getChapters = useCallback(() => {
    return bookId === 1 ? chapters_in_wonderland : chapters_looking_glass;
  }, [bookId]);


  const chapters = getChapters();

  const { title: chapterTitle, chap: chapterRoman, img: image, texts: chapterTexts } = chapters[chapterNumber];

  
  useEffect(() => {
    const bookTitleT = book_infos.title;
    document.title = `${chapterTitle} of the Alice book`;
    window.scrollTo(0, 0);
    return () => {
      document.title = book_infos.title;
    };
  }, [chapterTitle]);

  const chapterRef = useRef(null);

  useEffect(() => {
    const handleCopy = (e) => {
      const selection = window.getSelection();
      if (!selection.rangeCount) return;

      const selectedText = selection.toString().trim();
      if (selectedText && chapterRef.current.contains(selection.anchorNode)) {
        const additionalText = "\nCARROLL, Lewis. Editora Sona";
        e.clipboardData.setData("text/plain", `"${selectedText}"${additionalText}`);
        e.preventDefault();
      }
    };

    document.addEventListener("copy", handleCopy);
    
    return () => {
      document.removeEventListener("copy", handleCopy);
    };
  }, []);

  return (
    <div className="page chapter_page">
      <Navigation 
        onPrev={onPrev} 
        onNext={onNext} 
        goToSummary={goToSummary} 
        
      />
      <Footer />
      <Header chapterIndex={chapterNumber} bookId={bookId} title={chapters[0].title}/>
      
      <div className="chapter_head">
        <span className="chapter_subtitle">Chapter {chapterRoman}</span>
        <h2 className="chapter_title">{chapterTitle}</h2>
        <img className="chapter_img_abertura" src={image} alt="" loading="lazy" />
      </div>

      <div className="chapter_content" ref={chapterRef}>
        {chapterTexts.map((paragraph, index) => (
          <p
            className={paragraph.className}
            key={index}
            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(paragraph.text) }}
          ></p>
        ))}
      </div>

      

      
    </div>
  );
};

export default Chapter;
