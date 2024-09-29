import { useContext } from "react";
import CartContext from "../store/CartContext";
import Modal from "./UI/Modal";
import { currencyFormatter } from "../util/formatting";
import Input from "./UI/Input";
import Button from "./UI/Button";
import UserProgressContext from "../store/UserProgressContext";
import useHttp from "../hooks/useHttp";
import Err from "./Err";

const requestConfig = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  }
};

export default function Checkout(){
    const userProgressCtx = useContext(UserProgressContext);
    const cartCtx = useContext(CartContext);
    const cartTotal = cartCtx.items.reduce(
        (totalPrice, item) => totalPrice + item.quantity * item.price,
        0
      );

    

      function handleCloseModal(){
        userProgressCtx.hideChaeckout();
      }
      function finishJourney(){
        userProgressCtx.hideChaeckout();
        cartCtx.clearCart();
        clearData();
      }

      function handleSubmit(event){
        event.preventDefault();
        const fd = new FormData(event.target);
        const userData = Object.fromEntries(fd.entries());

        sendRequest(JSON.stringify({
          order: {
            items: cartCtx.items,
            customer: userData

          },
        }));
      }

      const {data, isLoading: isSending, error, sendRequest, clearData} = useHttp('http://localhost:3000/orders', requestConfig); 
    if (data && !error){
      return <Modal open={userProgressCtx.progress === 'checkout'} onClose={finishJourney}>
        <h2>Success!</h2>
        <p>Your order has been submitted succesfully </p>
        <p className="modal-actions">
          <Button onClick={finishJourney}>Okay</Button>
        </p>

      </Modal>
    }

      let actions = (<>
        
                    <Button type="button" textOnly onClick={handleCloseModal}> Close</Button>
                    <Button>Submit Order</Button>
                </>);

      if (isSending){
        actions = <span>Sending order data...</span>
      }          
      return (
        <Modal open={userProgressCtx.progress === 'checkout'} 
        onClose={handleCloseModal}>
            <form onSubmit={handleSubmit}>
                <h2>Checkout</h2>
                <p>Total amount: {currencyFormatter.format(cartTotal)}</p>
                <Input label="Full name" type="text" id="name"/>
                <Input label="Email-adress" type="email" id="email"/>
                <Input label="street" type="text" id="street"/>
                <div className="control-row">
                    <Input label="Postal Code" type= "text" id="postal-code"/>
                    <Input label="City" type= "text" id="city"/>
                </div>
                {error && <Err title='Failed tos submit order' message={error} />}
               <p className="modal-actions"> {actions}</p>
            </form>
        </Modal>
      )

}