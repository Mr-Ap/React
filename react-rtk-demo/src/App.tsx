import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import "./App.css";
import { orderCake, reStockCake } from "./features/cake/cakeSlice";
import {
  buyIceCream,
  reStockIceCream,
} from "./features/icecream/iceCreamSlice";
import { fetchUsers } from "./features/user/userSlice";
import { cakeState, iceCreamState, userState } from "./types/types";

function App() {
  const numOfCakes: cakeState = useSelector(
    (state: any) => state.cake.numOfCakes
  );
  const numOfIcecreams: iceCreamState = useSelector(
    (state) => state.iceCream.numOfIcecream
  );
  const userData: userState = useSelector((state) => state.user);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  const restockCakes = 5;
  const restockIcecream = 5;
  return (
    <>
      <div>
        <p>Buy one Cake and get one Icecream Free</p>
        <div>Number of Cakes : {numOfCakes}</div>
        <button onClick={() => dispatch(orderCake(1))}>Order Cake</button>
        <button onClick={() => dispatch(reStockCake(restockCakes))}>
          Restock {restockCakes} Cakes
        </button>
      </div>
      <div>
        <p>Buy one Icecream and get one Cake Free</p>
        <div>Number of IceCreams : {numOfIcecreams}</div>
        <button onClick={() => dispatch(buyIceCream(1))}>
          Order Ice Cream
        </button>
        <button onClick={() => dispatch(reStockIceCream(restockIcecream))}>
          Restock {restockIcecream} IceCreams
        </button>
      </div>
      <div>
        <p>User Data</p>
        {userData.isLoading && <p>Loading.....!</p>}
        {!userData.isLoading && userData.error && <p>{userData.error}</p>}
        {!userData.isLoading &&
          userData.data &&
          (userData.data.length > 0 ? (
            <ul>
              {userData.data.map((user: any) => (
                <li key={user.id}>{user.name}</li>
              ))}
            </ul>
          ) : (
            <p>No user data</p>
          ))}
      </div>
    </>
  );
}

export default App;
