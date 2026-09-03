import React from 'react';

export default function FooterReader({
  currentChapterIndex,
  totalChapters,
  isCover,
  onPrevChapter,
  onNextChapter,
  scrollProgress
}) {
  return (
    <>
      <footer className="reader-footer-actions">
        <button 
          onClick={onPrevChapter} 
          disabled={currentChapterIndex === 0} 
          className="nav-btn"
        >
          ← Anterior
        </button>
        
        <span className="chapter-indicator">
          {isCover 
            ? 'Capa' 
            : `Página ${currentChapterIndex + 1} de ${totalChapters}`}
        </span>

        <button 
          onClick={onNextChapter} 
          disabled={currentChapterIndex === totalChapters - 1} 
          className="nav-btn"
        >
          Próximo →
        </button>
      </footer>

      <div 
        className="reading-progress-bar" 
        style={{ width: `${scrollProgress}%` }} 
      />
    </>
  );
}