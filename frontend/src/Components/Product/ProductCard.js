
function ProductCard(props) {
    return (
        <tr>
            <td>{props.product.name}</td>
            <td>{props.product.description}</td>
            <td>{props.product.price.toFixed(2)}</td>
            <td>{props.product.amount}</td>
            <td>{props.product.category.name}</td>
            <td>{props.product.producer.companyName}</td>
            <td>{props.product.producer.nip}</td>
            <td><button type="button" class="btn btn-outline-light">Delete</button></td>
        </tr>
  );
}

export default ProductCard;