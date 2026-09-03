import React, { createContext, useContext, useState, useEffect } from 'react';

const ReaderContext = createContext();

export function ReaderProvider({ children }) {
  // Carrega configurações personalizadas ou usa os padrões
  const [fontSize, setFontSize] = useState(() => {
    const saved = localStorage.getItem('reader_font_size');
    return saved ? JSON.parse(saved) : 14;
  });

  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('reader_theme') || 'light';
  });

  const [textAlign, setTextAlign] = useState(() => {
    return localStorage.getItem('reader_text_align') || 'justify';
  });

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Salva no localStorage sempre que houver alteração
  useEffect(() => {
    localStorage.setItem('reader_font_size', JSON.stringify(fontSize));
  }, [fontSize]);

  useEffect(() => {
    localStorage.setItem('reader_theme', theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('reader_text_align', textAlign);
  }, [textAlign]);

  return (
    <ReaderContext.Provider 
      value={{
        fontSize,
        setFontSize,
        theme,
        setTheme,
        textAlign,
        setTextAlign,
        isMenuOpen,
        setIsMenuOpen
      }}
    >
      {children}
    </ReaderContext.Provider>
  );
}

export const useReader = () => useContext(ReaderContext);