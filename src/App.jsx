import { useState } from "react";
import ProductList from "./components/ProductList";
import CartView from "./components/CartView";

const initData = [
  {
    id: 1,
    name: "珍珠奶茶",
    description: "香濃奶茶搭配QQ珍珠",
    price: 50,
  },
  {
    id: 2,
    name: "冬瓜檸檬",
    description: "清新冬瓜配上新鮮檸檬",
    price: 45,
  },
  {
    id: 3,
    name: "翡翠檸檬",
    description: "綠茶與檸檬的完美結合",
    price: 55,
  },
  {
    id: 4,
    name: "四季春茶",
    description: "香醇四季春茶，回甘無比",
    price: 45,
  },
  {
    id: 5,
    name: "阿薩姆奶茶",
    description: "阿薩姆紅茶搭配香醇鮮奶",
    price: 50,
  },
  {
    id: 6,
    name: "檸檬冰茶",
    description: "檸檬與冰茶的清新組合",
    price: 45,
  },
  {
    id: 7,
    name: "芒果綠茶",
    description: "芒果與綠茶的獨特風味",
    price: 55,
  },
  {
    id: 8,
    name: "抹茶拿鐵",
    description: "抹茶與鮮奶的絕配",
    price: 60,
  },
];

function App() {
  const [product, setProduct] = useState(initData);
  const [cart, setCart] = useState([]);
  const [order, setOrder] = useState({ product: [], remark: "", price: 0 });

  // 加入購物車
  const addCart = (product) => {
    const cartIndex = cart.findIndex((cartItem) => cartItem.id === product.id);
    const tempCart = [...cart];
    // 檢查購物車是否有相同商品
    if (cartIndex !== -1) {
      // 有: 同品項數量 +1
      if (tempCart[cartIndex].qty < 10) {
        tempCart[cartIndex].qty += 1;
      }
    } else {
      // 無: 新增品項
      tempCart.push({
        ...product,
        qty: 1,
      });
    }
    setCart(tempCart);
  };

  return (
    <div id="root">
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-4">
            <ProductList product={product} addCart={addCart} />
          </div>
          <div className="col-md-8">
            <CartView cart={cart} setCart={setCart} setOrder={setOrder} />
          </div>
        </div>
        <hr />
        <div className="row justify-content-center">
          <div className="col-8">
            <div className="card">
              <div className="card-body">
                <div className="card-title">
                  <h5>訂單</h5>
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col">品項</th>
                        <th scope="col">數量</th>
                        <th scope="col">小計</th>
                      </tr>
                    </thead>
                    <tbody>
                      {order.product.map((item) => {
                        return (
                          <tr key={item.id}>
                            <td>{item.name}</td>
                            <td>{item.qty}</td>
                            <td>{item.price * item.qty}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                  <div className="text-end">
                    備註: <span>{order.remark}</span>
                  </div>
                  <div className="text-end">
                    <h5>
                      總計: <span>${order.price}</span>
                    </h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
