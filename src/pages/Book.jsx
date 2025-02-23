import React, { useState,  useEffect } from 'react';
import { useSwipeable } from 'react-swipeable'; 

import '../styles/ebook.css';

// Componentes de cada parte do livro (capa, sumário, capítulos, etc.)
import Cover from '../components/Cover';
import Infos from '../components/Infos';
import Intro from '../components/Intro';
import Summary from '../components/Summary';
import InWonderland from '../components/InWonderland';
import Chapter1 from '../chapters/Chapter1';
import Chapter2 from '../chapters/Chapter2';
import Chapter3 from '../chapters/Chapter3';
import Chapter4 from '../chapters/Chapter4';
import Chapter5 from '../chapters/Chapter5';
import Chapter6 from '../chapters/Chapter6';
import Chapter7 from '../chapters/Chapter7';
import Chapter8 from '../chapters/Chapter8';
import Chapter9 from '../chapters/Chapter9';
import Chapter10 from '../chapters/Chapter10';
import Chapter11 from '../chapters/Chapter11';
import Chapter12 from '../chapters/Chapter12';
import LookingGlass from '../components/LookingGlass';
import Chapter13 from '../chapters/Chapter13';
import Chapter14 from '../chapters/Chapter14';
import Chapter15 from '../chapters/Chapter15';
import Chapter16 from '../chapters/Chapter16';
import Chapter17 from '../chapters/Chapter17';
import Chapter18 from '../chapters/Chapter18';
import Chapter19 from '../chapters/Chapter19';
import Chapter20 from '../chapters/Chapter20';
import Chapter21 from '../chapters/Chapter21';
import Chapter22 from '../chapters/Chapter22';
import Chapter23 from '../chapters/Chapter23';
import Chapter24 from '../chapters/Chapter24';
import Afterword from '../components/Afterword';
import Credits from '../components/Credits';
import Colophon from '../components/Colophon';

// Componente principal do livro
const Book = () => {

  // Estado que controla a página atual
  const [currentPage, setCurrentPage] = useState(0);

  // Função para atualizar a página atual e salvar no localStorage
  const setCurrentPageAndSave = (page) => {
    if (page !== currentPage) {
      setCurrentPage(page);
      localStorage.setItem('currentPage', page); 
    }
  };

  // Definição de todas as páginas do livro, cada uma representada por um componente
  const pages = [
    <Cover 
      onNext={() => setCurrentPageAndSave(1)} 
      goToSummary={() => setCurrentPageAndSave(3)} />,

    <Infos 
      onNext={() => setCurrentPageAndSave(2)} 
      onPrev={() => setCurrentPageAndSave(0)} 
      goToSummary={() => setCurrentPageAndSave(3)} />,

    <Intro 
      onNext={() => setCurrentPageAndSave(3)} 
      onPrev={() => setCurrentPageAndSave(1)} 
      goToSummary={() => setCurrentPageAndSave(3)}/>,

    <Summary 
      onNext={() => setCurrentPageAndSave(4)} 
      onPrev={() => setCurrentPageAndSave(2)} 
      goToChapter={(pageIndex) => setCurrentPageAndSave(pageIndex)}/>,

    <InWonderland
      onNext={() => setCurrentPageAndSave(5)} 
      onPrev={() => setCurrentPageAndSave(3)} 
      goToSummary={() => setCurrentPageAndSave(3)}/>,

    <Chapter1 
      onNext={() => setCurrentPageAndSave(6)} 
      onPrev={() => setCurrentPageAndSave(4)} 
      goToSummary={() => setCurrentPageAndSave(3)}/>,

    <Chapter2 
      onNext={() => setCurrentPageAndSave(7)} 
      onPrev={() => setCurrentPageAndSave(5)} 
      goToSummary={() => setCurrentPageAndSave(3)}/>,

    <Chapter3 
      onNext={() => setCurrentPageAndSave(8)} 
      onPrev={() => setCurrentPageAndSave(6)} 
      goToSummary={() => setCurrentPageAndSave(3)}/>,

    <Chapter4 
      onNext={() => setCurrentPageAndSave(9)} 
      onPrev={() => setCurrentPageAndSave(7)} 
      goToSummary={() => setCurrentPageAndSave(3)}/>,

    <Chapter5 
      onNext={() => setCurrentPageAndSave(10)} 
      onPrev={() => setCurrentPageAndSave(8)} 
      goToSummary={() => setCurrentPageAndSave(3)}/>,

    <Chapter6 
      onNext={() => setCurrentPageAndSave(11)}  
      onPrev={() => setCurrentPageAndSave(9)} 
      goToSummary={() => setCurrentPageAndSave(3)}/>,

    <Chapter7 
      onNext={() => setCurrentPageAndSave(12)} 
      onPrev={() => setCurrentPageAndSave(10)} 
      goToSummary={() => setCurrentPageAndSave(3)}/>, 

    <Chapter8 
      onNext={() => setCurrentPageAndSave(13)}  
      onPrev={() => setCurrentPageAndSave(11)} 
      goToSummary={() => setCurrentPageAndSave(3)}/>,
    <Chapter9 
      onNext={() => setCurrentPageAndSave(14)} 
      onPrev={() => setCurrentPageAndSave(12)} 
      goToSummary={() => setCurrentPageAndSave(3)}/>, 
    <Chapter10 
      onNext={() => setCurrentPageAndSave(15)} 
      onPrev={() => setCurrentPageAndSave(13)} 
      goToSummary={() => setCurrentPageAndSave(3)}/>,
    <Chapter11 
      onNext={() => setCurrentPageAndSave(16)} 
      onPrev={() => setCurrentPageAndSave(14)} 
      goToSummary={() => setCurrentPageAndSave(3)}/>,
    
    <Chapter12 
      onNext={() => setCurrentPageAndSave(17)} 
      onPrev={() => setCurrentPageAndSave(15)} 
      goToSummary={() => setCurrentPageAndSave(3)}/>, 
    
    <LookingGlass 
      onNext={() => setCurrentPageAndSave(18)} 
      onPrev={() => setCurrentPageAndSave(16)} 
      goToSummary={() => setCurrentPageAndSave(3)}/>,

    <Chapter13 
      onNext={() => setCurrentPageAndSave(19)} 
      onPrev={() => setCurrentPageAndSave(17)} 
      goToSummary={() => setCurrentPageAndSave(3)}/>,

    <Chapter14
      onNext={() => setCurrentPageAndSave(20)} 
      onPrev={() => setCurrentPageAndSave(18)} 
      goToSummary={() => setCurrentPageAndSave(3)}/>,
      
      <Chapter15
      onNext={() => setCurrentPageAndSave(21)} 
      onPrev={() => setCurrentPageAndSave(19)} 
      goToSummary={() => setCurrentPageAndSave(3)}/>,

      <Chapter16
      onNext={() => setCurrentPageAndSave(22)} 
      onPrev={() => setCurrentPageAndSave(20)} 
      goToSummary={() => setCurrentPageAndSave(3)}/>,

      <Chapter17
      onNext={() => setCurrentPageAndSave(23)} 
      onPrev={() => setCurrentPageAndSave(21)} 
      goToSummary={() => setCurrentPageAndSave(3)}/>,

      <Chapter18
      onNext={() => setCurrentPageAndSave(24)} 
      onPrev={() => setCurrentPageAndSave(22)} 
      goToSummary={() => setCurrentPageAndSave(3)}/>,

      <Chapter19
      onNext={() => setCurrentPageAndSave(25)} 
      onPrev={() => setCurrentPageAndSave(23)} 
      goToSummary={() => setCurrentPageAndSave(3)}/>,

      <Chapter20
      onNext={() => setCurrentPageAndSave(26)} 
      onPrev={() => setCurrentPageAndSave(24)} 
      goToSummary={() => setCurrentPageAndSave(3)}/>,

      <Chapter21
      onNext={() => setCurrentPageAndSave(27)} 
      onPrev={() => setCurrentPageAndSave(25)} 
      goToSummary={() => setCurrentPageAndSave(3)}/>,

      <Chapter22
      onNext={() => setCurrentPageAndSave(28)} 
      onPrev={() => setCurrentPageAndSave(26)} 
      goToSummary={() => setCurrentPageAndSave(3)}/>,

      <Chapter23
      onNext={() => setCurrentPageAndSave(29)} 
      onPrev={() => setCurrentPageAndSave(27)} 
      goToSummary={() => setCurrentPageAndSave(3)}/>,

      <Chapter24
      onNext={() => setCurrentPageAndSave(30)} 
      onPrev={() => setCurrentPageAndSave(28)} 
      goToSummary={() => setCurrentPageAndSave(3)}/>,

    <Afterword 
      onNext={() => setCurrentPageAndSave(31)} 
      onPrev={() => setCurrentPageAndSave(29)} 
      goToSummary={() => setCurrentPageAndSave(3)}/>, 
    
    <Credits 
      onNext={() => setCurrentPageAndSave(32)} 
      onPrev={() => setCurrentPageAndSave(30)} 
      goToSummary={() => setCurrentPageAndSave(3)}/>,
      
    <Colophon 
      onPrev={() => setCurrentPageAndSave(31)} 
      goToSummary={() => setCurrentPageAndSave(3)}/>
  ];

  // Recupera a página salva no localStorage quando o componente é montado
  useEffect(() => {
    const savedPage = localStorage.getItem('currentPage');
    if (savedPage) {
      setCurrentPage(parseInt(savedPage, 10));
    }
  }, []);

  // Função para lidar com o deslizar para a esquerda (avançar)
  const handleSwipeLeft = () => {
    if (currentPage < pages.length - 1) {
      setCurrentPageAndSave(currentPage + 1);
    }
  };

  // Função para lidar com o deslizar para a direita (voltar)
  const handleSwipeRight = () => {
    if (currentPage > 0) { 
      setCurrentPageAndSave(currentPage - 1); 
    }
  };

   // Configura o hook de gestos de deslizar
  const swipeHandlers = useSwipeable({
    onSwipedLeft: handleSwipeLeft,
    onSwipedRight: handleSwipeRight,
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  // Renderiza a página atual, aplicando os gestos de deslizar
  return (
    <div {...swipeHandlers}>
      {pages[currentPage]}
    </div>
  );
};

export default Book;