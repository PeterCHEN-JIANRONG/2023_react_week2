import { useEffect, useState } from "react";
import PropType from 'prop-types'

function CartView({cart, setCart, setOrder}) {
  const [total, setTotal] = useState(0);
  const [remark, setRemark] = useState("");

  // 總計
  useEffect(() => {
    const sum = cart.reduce((acc, curr) => acc + curr.price * curr.qty, 0);
    setTotal(sum);
  }, [cart]);

  return (
    <>
      <table className="table">
        <thead>
          <tr>
            <th scope="col" width="50">
              操作
            </th>
            <th scope="col">品項</th>
            <th scope="col">描述</th>
            <th scope="col" width="90">
              數量
            </th>
            <th scope="col">單價</th>
            <th scope="col">小計</th>
          </tr>
        </thead>
        <tbody>
          {cart.map((item, index) => {
            return (
              <tr key={item.id}>
                <td>
                  <button
                    onClick={() => {
                      setCart(cart.filter((newItem) => newItem.id !== item.id));
                    }}
                    type="button"
                    className="btn btn-sm"
                  >
                    x
                  </button>
                </td>
                <td>{item.name}</td>
                <td>
                  <small>{item.description}</small>
                </td>
                <td>
                  <select
                    className="form-select"
                    value={item.qty}
                    onChange={(e) => {
                      // 修改購物車數量
                      const qty = Number(e.target.value);

                      // 方法一: 利用外層 index
                      // const tempCart = [...cart]
                      // tempCart[index].qty = qty
                      // setCart(tempCart)

                      // 方法二: 利用 map, id 相同時修改數量, 不同則維持不變
                      const tempCart = cart.map((newItem) =>
                        newItem.id === item.id ? { ...item, qty } : newItem
                      );
                      setCart(tempCart);
                    }}
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => {
                      return (
                        <option key={item} value={item}>
                          {item}
                        </option>
                      );
                    })}
                  </select>
                </td>
                <td>{item.price}</td>
                <td>{item.price * item.qty}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="text-end mb-3">
        <h5>
          總計: <span>${total}</span>
        </h5>
      </div>
      <textarea
        value={remark}
        onChange={(e) => {
          setRemark(e.target.value);
        }}
        className="form-control mb-3"
        rows="3"
        placeholder="備註"
      ></textarea>
      <div className="text-end">
        <button
          onClick={() => {
            if (!cart.length) {
              return;
            }
            // 送出訂單
            setOrder({
              product: [...cart],
              remark,
              price: cart.reduce((a, b) => a + b.price * b.qty, 0),
            });
            // 清除購物車
            setCart([]);
            setRemark("");
          }}
          disabled={!cart.length}
          className="btn btn-primary"
        >
          送出
        </button>
      </div>
    </>
  );
}

// 加入 props validation 驗證
CartView.propTypes = {
  cart: PropType.array.isRequired,
  setCart: PropType.func.isRequired,
  setOrder: PropType.func.isRequired,
}

export default CartView;
