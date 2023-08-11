import { useState } from 'react';
import { Form } from './components/Form';

function App() {
  return (
    <>
      <div id="main">
        <div className="logo-container">
          <img src="./logo.png" alt="" />
        </div>
        <h2>Formulario pedido</h2>
        <Form />
      </div>
    </>
  );
}

export default App;
