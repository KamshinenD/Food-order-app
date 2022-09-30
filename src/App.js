import { useState } from 'react';
import './App.css';
import Header from './components/Layout/Header';
import Meals from './components/Meals/Meals';
import Modal from './components/UI/Modal';
import CartProvider from './store/CardProvider';

function App() {
  const [showModal, setShowModal] = useState(false);

  const handleModalClose =()=>{
    setShowModal(!showModal)
  }
  const handleModalOpen =()=>{
    setShowModal(!showModal)
  }

  return (
    <CartProvider>
      <Header onshowModal ={handleModalOpen}/>
      <main>
        <Meals /> 
      </main>
        {showModal && 
        <Modal onClick={handleModalClose}/>
        }
    </CartProvider>
  );
}

export default App;
