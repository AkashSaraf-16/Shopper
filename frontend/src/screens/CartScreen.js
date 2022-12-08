import { useEffect } from 'react';
import { Link, useParams, useLocation } from 'react-router-dom';
import {
  Row,
  Col,
  ListGroup,
  Image,
  Button,
  Card,
  FormControl,
} from 'react-bootstrap';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '../actions/cartActions';
import Message from '../components/Message';
import Meta from '../components/Meta';

const CartScreen = () => {
  let { id } = useParams();
  const location = useLocation();
  const qty = new URLSearchParams(location.search).get('qty');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  useEffect(() => {
    if (id) {
      dispatch(addToCart(id, qty));
    }
  }, [dispatch, id, qty]);

  const removeCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };
  const checkoutHandler = () => {
    navigate('/login?redirect=/shipping');
  };
  return (
    <>
      <Meta title={`Your Cart`} />
      <Row>
        <Col md={8}>
          <h1>Your Items</h1>
          {cartItems.length === 0 ? (
            <Message>
              Your Cart is empty <Link to='/'>Go Back</Link>
            </Message>
          ) : (
            <ListGroup variant='flush'>
              {cartItems.map((item) => (
                <ListGroup.Item key={item.id}>
                  <Row>
                    <Col md={2}>
                      <Image src={item.image} alt={item.name} fluid rounded />
                    </Col>
                    <Col md={3}>
                      <Link to={`/product/${item.id}`}>{item.name}</Link>
                    </Col>
                    <Col md={2}>${item.price}</Col>
                    <Col className='product-page-section' md={2}>
                      <FormControl
                        className='form-control-select'
                        as='select'
                        value={item.qty}
                        onChange={(e) => {
                          dispatch(addToCart(item.id, Number(e.target.value)));
                          navigate('/cart');
                        }}
                      >
                        {[...Array(item.countInStock).keys()].map((x) => (
                          <option value={x + 1} key={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </FormControl>
                    </Col>
                    <Col md={2}>
                      <Button
                        type='button'
                        variant='light'
                        onClick={() => removeCartHandler(item.id)}
                      >
                        <i className='fas fa-trash'></i>
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2>
                  Subtotal (
                  {cartItems.reduce((acc, item) => acc + +item.qty, 0)}) items
                </h2>
                $
                {cartItems
                  .reduce((acc, item) => acc + item.qty * +item.price, 0)
                  .toFixed(2)}
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  type='button'
                  className='btn-vlock'
                  disabled={cartItems.length === 0}
                  onClick={checkoutHandler}
                >
                  Proceed to checkout
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default CartScreen;
