import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer';
import CheckoutSteps from '../components/CheckoutSteps';
import { saveShippingAddress } from '../actions/cartActions';
import Meta from '../components/Meta';
const ShippingScreen = () => {
  const dispath = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [postal, setPostal] = useState(shippingAddress.postal);
  const [country, setCountry] = useState(shippingAddress.country);

  const submitHandler = (e) => {
    e.preventDefault();
    dispath(saveShippingAddress({ address, city, postal, country }));
    navigate('/payment');
  };
  return (
    <>
      <Meta title={`Shipping Address`} />

      <FormContainer>
        <CheckoutSteps step1 step2 />
        <h1>Shipping</h1>
        <Form onSubmit={submitHandler}>
          <Form.Group controlId='address'>
            <Form.Label>Address</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter the address'
              value={address}
              required
              onChange={(e) => setAddress(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId='city'>
            <Form.Label>City</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter the City'
              value={city}
              required
              onChange={(e) => setCity(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId='postal'>
            <Form.Label>Postal</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter the postal code'
              value={postal}
              required
              onChange={(e) => setPostal(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId='country'>
            <Form.Label>Country</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter the Country'
              value={country}
              required
              onChange={(e) => setCountry(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Button type='submit' variant='primary'>
            Proceed
          </Button>
        </Form>
      </FormContainer>
    </>
  );
};

export default ShippingScreen;
