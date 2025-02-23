import React from 'react';
import Book from './pages/Book';
import MetaTags from "./components/MetaTags";


function App() {

  return (
    <div className="ebook">
      <MetaTags />
      <Book />
    </div>
  );
}

export default App;
