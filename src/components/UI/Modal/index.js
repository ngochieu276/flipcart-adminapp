import React from "react";
import { Modal, Button } from "react-bootstrap";

/**
 * @author
 * @function NewModal
 **/

export const NewModal = (props) => {
  return (
    <Modal size={props.size} show={props.show} onHide={props.handleClose}>
      <Modal.Header closeButton={true}>
        <Modal.Title>{props.modalTitle}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{props.children}</Modal.Body>
      <Modal.Footer>
        {props.buttons ? (
          props.buttons.map((btn, index) => (
            <Button key={index} variant={btn.color} onClick={btn.onClick}>
              {btn.label}
            </Button>
          ))
        ) : (
          <Button
            className='btn-sm'
            {...props}
            style={{ backgroundColor: "black" }}
            onClick={props.onSubmit}
          >
            Save
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default NewModal;
