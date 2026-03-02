import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import Cart from '../Screen/Cart';

export default function CartModal({ show, handleClose }) {
  return (
    <Modal show={show} onHide={handleClose} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>🛒 Your Cart</Modal.Title>
      </Modal.Header>

      <Modal.Body style={{ maxHeight: "60vh", maxWidth: "100%", overflowY: "auto" }}>
        <Cart />
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Continue Shopping
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
