import React from 'react';
import './App.css';
import { ContactList } from './contact-list/ContactList';

function App() {
  return (
    <div className="App">
      <ContactList contacts={['peter', 'frity', 'frieda']} onContactSelected={e => console.log(e)} />
    </div>
  );
}

export default App;
