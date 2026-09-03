import React from 'react';
import Reader from "./components/Reader/Reader";
import { ReaderProvider } from "./context/ReaderContext";

export default function App() {
  return (
    <ReaderProvider>
      <main>
        <Reader />
      </main>
    </ReaderProvider>
  );
}