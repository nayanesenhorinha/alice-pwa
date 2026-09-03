import React, { useState, useMemo } from 'react';
import { useReader } from '../../context/ReaderContext';

export default function HeaderReader({ 
  chapters = [], 
  currentChapterIndex, 
  currentChapterTitle, 
  onSelectChapter 
}) {
  const [showSettings, setShowSettings] = useState(false);
  const [showToc, setShowToc] = useState(false);
  const [expandedSections, setExpandedSections] = useState({});

  const {
    fontSize,
    setFontSize,
    theme,
    setTheme,
    textAlign,
    setTextAlign
  } = useReader();

  // Identifica o capítulo ativo
  const currentChapter = useMemo(() => {
    if (typeof currentChapterIndex === 'number' && chapters[currentChapterIndex]) {
      return chapters[currentChapterIndex];
    }
    return chapters.find(chap => chap.title === currentChapterTitle) || {};
  }, [chapters, currentChapterIndex, currentChapterTitle]);

  // Lógica para montar o título exibido no topo da página
  const displayTitle = useMemo(() => {
    // 1. Se possuir um 'titlebook' (ex: Capa do livro)
    if (currentChapter.titlebook) return currentChapter.titlebook;

    const currentSection = currentChapter.section;

    // 2. Se for o Epílogo (Seção 7)
    if (String(currentSection) === '7') return 'Epílogo';

    // 3. Se for uma seção estruturada (Partes de 1 a 6)
    if (currentSection && currentSection !== 0 && currentSection !== 'intro') {
      return `Parte ${currentSection}`;
    }

    // 4. Fallback para páginas sem seção (Prefácio, Sumário, etc.)
    return currentChapterTitle || currentChapter.title || 'Leitor';
  }, [currentChapter, currentChapterTitle]);

  // Agrupa os capítulos por seção para o Sumário (TOC)
  const groupedChapters = useMemo(() => {
    return chapters.reduce((acc, chap, globalIndex) => {
      const secKey = chap.section ?? 0;
      if (!acc[secKey]) {
        acc[secKey] = [];
      }
      acc[secKey].push({ ...chap, globalIndex });
      return acc;
    }, {});
  }, [chapters]);

  const toggleSettings = () => {
    setShowSettings(!showSettings);
    setShowToc(false);
  };

  const toggleToc = () => {
    setShowToc(!showToc);
    setShowSettings(false);
  };

  const toggleSectionExpand = (secKey) => {
    setExpandedSections((prev) => ({
      ...prev,
      [secKey]: !prev[secKey]
    }));
  };

  return (
    <header className="header-menu">
      <div className="header-main-bar">
        <div className="header-actions-group">
          <button 
            className={`header-btn ${showToc ? 'active' : ''}`} 
            onClick={toggleToc}
            title="Sumário"
          >
            ≡
          </button>

          <h1 className="header-title">Crime e Castigo</h1>

          <div>
            <button 
              className={`header-btn ${showSettings ? 'active' : ''}`} 
              onClick={toggleSettings}
              title="Ajustes de Leitura"
            >
              Aa
            </button>
          </div>
        </div>
      </div>

      {/* Painel Expansível de Ajustes */}
      {showSettings && (
        <div className="header-panel settings-panel">
          <div className="menu-section">
            <label>Fonte:</label>
            <button onClick={() => setFontSize(Math.max(12, fontSize - 2))}>A-</button>
            <span>{fontSize}px</span>
            <button onClick={() => setFontSize(Math.min(32, fontSize + 2))}>A+</button>
          </div>

          <div className="menu-section">
            <label>Tema:</label>
            <button className={theme === 'dark' ? 'active' : ''} onClick={() => setTheme('dark')}>Escuro</button>
            <button className={theme === 'light' ? 'active' : ''} onClick={() => setTheme('light')}>Claro</button>
            <button className={theme === 'sepia' ? 'active' : ''} onClick={() => setTheme('sepia')}>Sépia</button>
          </div>

          <div className="menu-section">
            <label>Alinhamento:</label>
            <button className={textAlign === 'justify' ? 'active' : ''} onClick={() => setTextAlign('justify')}>Justificado</button>
            <button className={textAlign === 'left' ? 'active' : ''} onClick={() => setTextAlign('left')}>Esquerda</button>
          </div>

          <div className="menu-section">
            <button 
              className="reset-btn" 
              onClick={() => {
                setFontSize(14);
                setTheme('light');
                setTextAlign('justify');
              }}
              title="Restaurar padrões"
            >
              ↺ Resetar
            </button>
          </div>
        </div>
      )}

      {/* Painel Expansível do Sumário */}
      {showToc && (
        <div className="header-panel toc-panel">
          <div className="toc-accordion">
            {Object.keys(groupedChapters).map((sectionNum) => {
              const sectionChapters = groupedChapters[sectionNum];

              if (sectionNum === '0' || sectionNum === 'intro') {
                return (
                  <div key={sectionNum} className="toc-preliminary-group">
                    <ul className="toc-list">
                      {sectionChapters.map((chap) => (
                        <li key={chap.id || chap.globalIndex}>
                          <button 
                            className="toc-item-btn"
                            onClick={() => {
                              onSelectChapter(chap.globalIndex);
                              setShowToc(false);
                            }}
                          >
                            {chap.title}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              }

              const isExpanded = expandedSections[sectionNum] ?? false;

              return (
                <div key={sectionNum} className="toc-section-group">
                  <button 
                    className="toc-section-header"
                    onClick={() => toggleSectionExpand(sectionNum)}
                  >
                    <span>
                      {String(sectionNum) === '7' ? 'Epílogo' : `Parte ${sectionNum}`}
                    </span>
                    <span className="arrow">{isExpanded ? '▾' : '▸'}</span>
                  </button>

                  {isExpanded && (
                    <ul className="toc-list submenu">
                      {sectionChapters.map((chap) => (
                        <li key={chap.id || chap.globalIndex}>
                          <button 
                            className="toc-item-btn"
                            onClick={() => {
                              onSelectChapter(chap.globalIndex);
                              setShowToc(false);
                            }}
                          >
                            {chap.title}
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}