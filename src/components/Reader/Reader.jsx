import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useReader } from '../../context/ReaderContext';
import HeaderReader from './HeaderReader';
import FooterReader from './FooterReader';
import '../../styles/reader.css';
import { fullBook as chapters } from '../../data';

export default function Reader() {
  // 1. Lê a posição salva no localStorage (Capítulo + Parágrafo)
  const savedState = useMemo(() => {
    try {
      const raw = localStorage.getItem('reader_position');
      if (raw) return JSON.parse(raw);

      // Fallback para chave antiga, caso exista
      const legacyChapter = localStorage.getItem('reader_last_chapter');
      const parsedChapter = legacyChapter ? parseInt(legacyChapter, 10) : 0;
      return { 
        chapterIndex: parsedChapter < chapters.length ? parsedChapter : 0, 
        paragraphIndex: 0 
      };
    } catch {
      return { chapterIndex: 0, paragraphIndex: 0 };
    }
  }, []);

  const [currentChapterIndex, setCurrentChapterIndex] = useState(savedState.chapterIndex);
  const [currentParagraphIndex, setCurrentParagraphIndex] = useState(savedState.paragraphIndex);

  const { fontSize, theme, textAlign, isMenuOpen, setIsMenuOpen } = useReader();
  const currentChapter = chapters ? chapters[currentChapterIndex] : null;

  // Ref para diferenciar restauração inicial de navegação entre capítulos
  const isInitialRender = useRef(true);

  // Refs para gestos de Touch Swipe
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [scrollProgress, setScrollProgress] = useState(0);

  // 2. Monitora o parágrafo visível no topo da tela com IntersectionObserver
  useEffect(() => {
    const paragraphs = document.querySelectorAll('.vertical-article p');
    if (!paragraphs.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute('data-p-index'));
            if (!isNaN(index)) {
              setCurrentParagraphIndex(index);
              localStorage.setItem(
                'reader_position',
                JSON.stringify({
                  chapterIndex: currentChapterIndex,
                  paragraphIndex: index
                })
              );
            }
          }
        });
      },
      {
        root: null,
        rootMargin: '-10% 0px -70% 0px', // Considera o parágrafo no topo/centro da tela
        threshold: 0
      }
    );

    paragraphs.forEach((p) => observer.observe(p));

    return () => observer.disconnect();
  }, [currentChapterIndex]);

  // 3. Restaura o scroll para o parágrafo correto ao abrir ou mudar de capítulo
  useEffect(() => {
    const pToScroll = isInitialRender.current ? savedState.paragraphIndex : currentParagraphIndex;
    isInitialRender.current = false;

    const timer = setTimeout(() => {
      if (pToScroll > 0) {
        const targetP = document.querySelector(`[data-p-index="${pToScroll}"]`);
        if (targetP) {
          targetP.scrollIntoView({ behavior: 'smooth', block: 'start' });
          return;
        }
      }
      window.scrollTo({ top: 0, behavior: 'instant' });
    }, 120);

    return () => clearTimeout(timer);
  }, [currentChapterIndex]);

  // Monitora a rolagem vertical e calcula a porcentagem (0% a 100%)
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      
      if (scrollHeight > 0) {
        const progress = (scrollTop / scrollHeight) * 100;
        setScrollProgress(Math.min(100, Math.max(0, progress)));
      } else {
        setScrollProgress(100);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentChapterIndex]);

  // Calcula total de páginas fictícias/visuais
  useEffect(() => {
    const calculatePages = () => {
      const pageHeight = window.innerHeight;
      const fullHeight = document.documentElement.scrollHeight;
      
      const total = Math.max(1, Math.ceil(fullHeight / pageHeight));
      setTotalPages(total);

      const currentScroll = window.scrollY;
      const current = Math.min(
        total,
        Math.max(1, Math.floor((currentScroll + pageHeight / 2) / pageHeight) + 1)
      );
      setCurrentPage(current);
    };

    calculatePages();
    window.addEventListener('scroll', calculatePages);
    window.addEventListener('resize', calculatePages);

    return () => {
      window.removeEventListener('scroll', calculatePages);
      window.removeEventListener('resize', calculatePages);
    };
  }, [currentChapterIndex, fontSize]);

  // Atualiza a tag <title> do documento
  useEffect(() => {
    const baseTitle = 'Crime e Castigo';
    const fullBookTitle = `${baseTitle} (Fiódor Dostoiévski)`;

    if (!currentChapter) {
      document.title = fullBookTitle;
      return;
    }

    const { section, title, type } = currentChapter;
    if (type === 'cover') {
      document.title = fullBookTitle;
      return;
    }

    if (!section || section === 0 || section === 'intro') {
      document.title = title ? `${title} — ${baseTitle}` : fullBookTitle;
      return;
    }

    document.title = `Parte ${section} — ${baseTitle}`;
  }, [currentChapterIndex, currentChapter]);

  // Navegação manual de capítulos (reseta parágrafo para 0)
  const navigateToChapter = (newIndex) => {
    setCurrentChapterIndex(newIndex);
    setCurrentParagraphIndex(0);
    localStorage.setItem(
      'reader_position',
      JSON.stringify({ chapterIndex: newIndex, paragraphIndex: 0 })
    );
  };

  const handleNextChapter = () => {
    if (currentChapterIndex < chapters.length - 1) {
      navigateToChapter(currentChapterIndex + 1);
    }
  };

  const handlePrevChapter = () => {
    if (currentChapterIndex > 0) {
      navigateToChapter(currentChapterIndex - 1);
    }
  };

  const handleSelectChapter = (index) => {
    navigateToChapter(index);
    setIsMenuOpen(false);
  };

  // Gestos Touch Swipe
  const handleTouchStart = (e) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    touchEndX.current = e.changedTouches[0].clientX;
    const distance = touchStartX.current - touchEndX.current;

    if (distance > 50) handleNextChapter();
    else if (distance < -50) handlePrevChapter();
  };

  // Clique por Zonas
  const handleContainerClick = (e) => {
    if (e.target.closest('.header-menu') || e.target.closest('.reader-footer-actions')) return;

    const screenWidth = window.innerWidth;
    const clickX = e.clientX;

    if (clickX <= screenWidth * 0.05) {
      handlePrevChapter();
    } else if (clickX > screenWidth * 0.05 && clickX < screenWidth * 0.90) {
      setIsMenuOpen(!isMenuOpen);
    } else if (clickX >= screenWidth * 0.05) {
      handleNextChapter();
    }
  };

  if (!currentChapter) {
    return <div className="reader-loading">Carregando livro...</div>;
  }

  return (
    <div 
      className="reader-container" 
      data-theme={theme}
      onClick={handleContainerClick}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      style={{ '--text-align': textAlign }}
    >
      {isMenuOpen && (
        <HeaderReader 
          chapters={chapters || []} 
          currentChapterIndex={currentChapterIndex}
          currentChapterTitle={currentChapter?.title}
          onSelectChapter={handleSelectChapter} 
        />
      )}

      <div className="reader-content" style={{ fontSize: `${fontSize}px` }}>
        {currentChapter.type === 'cover' ? (
          <div className="book-cover-view">
            <img 
              src={currentChapter.coverImage} 
              alt={currentChapter.titlebook || "Capa do livro"} 
              className="cover-image-full"
            />
          </div>
        ) : (
          <main className="vertical-wrapper">
            <article className="vertical-article">
              <div className="chapter-section-header">
                
  {(() => {
    // 1. Se for a Introdução (por ID ou Section)
    if (currentChapter.id === 'intro' || currentChapter.section === 'intro') {
      return (
        <h3 
          className="chapter-section-label"
          style={{ fontSize: `${Math.round(fontSize * 0.8)}px` }}
        >
          Introdução
        </h3>
      );
    }

    // 2. Se for a Apresentação de Personagens
    if (currentChapter.id === 'presen' || currentChapter.section === 'presen') {
      return (
        <h3 
          className="chapter-section-label"
          style={{ fontSize: `${Math.round(fontSize * 0.8)}px` }}
        >
          Apresentação
        </h3>
      );
    }

    if (currentChapter.id === 'about' || currentChapter.section === 'about') {
      return (
        <h3 
          className="chapter-section-label"
          style={{ fontSize: `${Math.round(fontSize * 0.8)}px` }}
        >
          Sobre o autor
        </h3>
      );
    }

    // 3. Se for o Epílogo (Seção 7)
    if (String(currentChapter.section) === '7') {
      return (
        <h3 
          className="chapter-section-label"
          style={{ fontSize: `${Math.round(fontSize * 0.8)}px` }}
        >
          Epílogo
        </h3>
      );
    }

    // 4. Se for uma das Partes numéricas do livro (1 a 6)
    if (Number(currentChapter.section) > 0 && Number(currentChapter.section) <= 6) {
      const romanNumeral = ['I', 'II', 'III', 'IV', 'V', 'VI'][currentChapter.section - 1];
      return (
        <h3 
          className="chapter-section-label"
          style={{ fontSize: `${Math.round(fontSize * 0.8)}px` }}
        >
          {romanNumeral}
        </h3>
      );
    }

    // Retorna null caso a página pré-textual não deva exibir rótulo superior
    return null;
  })()}


                <h2 style={{ fontSize: `${fontSize}px` }}>
                  {currentChapter.title}
                </h2>
              </div>

              {currentChapter.content ? (
                currentChapter.content.map((block, idx) => {
                  if (block.type === 'paragraph') {
                    return (
                      <p key={idx} data-p-index={idx}>
                        {block.text}
                      </p>
                    );
                  }
                  if (block.type === 'image') {
                    return (
                      <figure key={idx} className="inline-image-item">
                        <img src={block.url} alt={block.caption || `Ilustração ${idx + 1}`} />
                        {block.caption && <figcaption>{block.caption}</figcaption>}
                      </figure>
                    );
                  }
                  return null;
                })
              ) : (
                currentChapter.paragraphs?.map((p, idx) => (
                  <p key={idx} data-p-index={idx}>
                    {p}
                  </p>
                ))
              )}

            </article>

            <FooterReader 
              currentChapterIndex={currentChapterIndex}
              totalChapters={chapters.length}
              isCover={currentChapter.type === 'cover'}
              onPrevChapter={handlePrevChapter}
              onNextChapter={handleNextChapter}
              scrollProgress={scrollProgress}
            />
          </main>
        )}
      </div>
    </div>
  );
}