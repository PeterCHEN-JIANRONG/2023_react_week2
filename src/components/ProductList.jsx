import PropType from 'prop-types'

function ProductList({ product, addCart }) {
  return (
    <div className="list-group">
      {product.map((item) => {
        return (
          <a
            key={item.id}
            onClick={(e) => {
              e.preventDefault();
              addCart(item);
            }}
            href="#"
            className="list-group-item list-group-item-action"
          >
            <div className="d-flex w-100 justify-content-between">
              <h5 className="mb-1">{item.name}</h5>
              <small>${item.price}</small>
            </div>
            <p className="mb-1">{item.description}</p>
          </a>
        );
      })}
    </div>
  );
}

// 加入 props validation 驗證
ProductList.propTypes = {
  product: PropType.array.isRequired,
  addCart: PropType.func.isRequired,
}

export default ProductList;
