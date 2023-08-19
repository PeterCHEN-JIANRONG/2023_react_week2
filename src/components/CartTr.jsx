// 拆分元件練習, ps: 這樣拆分元件並不好, 只是為了練習 props
import PropType from 'prop-types'

function CartTr({item, cart, setCart}) {
  return (
    <tr>
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
}

// 加入 props validation 驗證
CartTr.propTypes = {
  item: PropType.object.isRequired,
  cart: PropType.array.isRequired,
  setCart: PropType.func.isRequired,
}

export default CartTr