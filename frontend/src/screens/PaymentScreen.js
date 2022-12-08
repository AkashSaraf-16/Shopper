import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Form, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer';
import CheckoutSteps from '../components/CheckoutSteps';
import { savePaymentMethod } from '../actions/cartActions';
import Meta from '../components/Meta';
const PaymentScreen = () => {
  const dispath = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  if (!shippingAddress) {
    navigate('/shipping');
  }

  const [paymentMethod, setpaymentMethod] = useState('PayPal');

  const submitHandler = (e) => {
    e.preventDefault();
    dispath(savePaymentMethod(paymentMethod));
    navigate('/placeorder');
  };
  return (
    <>
      <Meta title={`Payment`} />

      <FormContainer>
        <CheckoutSteps step1 step2 step3 />
        <h1>Payment Method</h1>
        <Form onSubmit={submitHandler}>
          <Form.Group>
            <Form.Label as='legend'>Select Method </Form.Label>

            <Col>
              <Form.Check
                type='radio'
                label='PayPal or Credit Card'
                id='Paypal'
                value='PayPal'
                name='paymentMethod'
                checked
                onClick={(e) => setpaymentMethod(e.target.value)}
              ></Form.Check>
            </Col>
          </Form.Group>
          <Button type='submit' variant='primary'>
            Proceed
          </Button>
        </Form>
      </FormContainer>
    </>
  );
};

export default PaymentScreen;
