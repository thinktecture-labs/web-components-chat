import React from 'react';
import './App.css';
import { ContactList } from './contact-list/ContactList';

function App() {
  const sampleData = [
    { username: 'peter', isOnline: false },
    { username: 'frity', isOnline: true },
    { username: 'frieda', isOnline: false },
    { username: 'jessy', isOnline: true },
    { username: 'jenny', isOnline: true },
    { username: 'sam', isOnline: true },
  ];

  return (
    <div className="App">
      <ContactList contacts={sampleData} onContactSelected={e => console.log(e)} />
    </div>
  );
}

export default App;
