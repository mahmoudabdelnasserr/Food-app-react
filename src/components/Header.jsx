import { useContext } from 'react';
import LogoImg from '../assets/logo.jpg';
import Button from './UI/Button';
import CartContext from '../store/CartContext';
import UserProgressContext from '../store/UserProgressContext';
import { currencyFormatter } from '../util/formatting';
export default function Header(){
    const cartCtx = useContext(CartContext);
    const userProgressCtx = useContext(UserProgressContext);
    const totalCartItems = cartCtx.items.reduce((totalNumberOfItems, item) => {
        return totalNumberOfItems + item.quantity;
    }, 0);
    const cartTotal = cartCtx.items.reduce(
        (totalPrice, item) => totalPrice + item.quantity * item.price,
        0
      );

    function handleShowCart(){
        userProgressCtx.showCart();
    }

    function handleGoToCheckout(){
        userProgressCtx.ShowCheckout();
      }
    return (
        <header id="main-header">
            <div id="title">
            <img src={LogoImg} alt='A resturant'></img>
            <h2>FOODAPP</h2>      
            </div>
            <div>
                <nav>
                <Button className='ct' onClick={handleShowCart} textOnly>Cart ({totalCartItems})</Button>
                {cartCtx.items.length > 0 && <Button onClick={handleGoToCheckout}>Checkout <b className='highlighted'>({currencyFormatter.format(cartTotal)})</b></Button>}
                </nav>
            </div>
        </header>
    );
}