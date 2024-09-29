import { createContext, useState } from "react"

const UserProgressContext = createContext({
    progress: '',
    showCart: () => {},
    hideCart: () => {},
    ShowCheckout: () => {},
    hideChaeckout: () => {},
});

export function UserProgressContextProvider({children}){
    const [userProgress, setUserProgress] = useState('');

    function showCart(){
        setUserProgress('cart');
    }

    function hideCart(){
        setUserProgress('');
    }

    function ShowCheckout(){
        setUserProgress('checkout');
    }
    function hideChaeckout(){
        setUserProgress('');
    }
    
    const userProgressCtx = {
        progress: userProgress,
        showCart,
        hideCart,
        ShowCheckout,
        hideChaeckout
    };

    return (
        <UserProgressContext.Provider value={userProgressCtx}>{children}</UserProgressContext.Provider>
    )

}
export default UserProgressContext;