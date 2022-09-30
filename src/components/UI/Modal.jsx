import ReactDOM from 'react-dom';
import Cart from '../Cart/Cart';
import styles from './Modal.module.css';


const Modal = (props) => {
    return (
      <div className={styles.backdrop}>
          <div className={styles.modal}>
              <Cart onClick={props.onClick}/>
          </div>
      </div>
    )
// const Backdrop =(props)=>{
//     return <div className={styles.backdrop} />};
//     const ModalOverlay =(props)=>{
//         return (<div className={styles.backdrop}>
//             <div className={styles.content}> {props.children}</div>
//         </div>
//         )
//     };

// const portalElement = document.getElementById('overlays')

// const Modal = (props) => {
//   return (
//     <>
//         {ReactDOM.createPortal(<Backdrop />, portalElement)}
//         {ReactDOM.createPortal(<ModalOverlay>{props.children}</ModalOverlay>, portalElement)}
//     </>
//   )
// }

}

export default Modal