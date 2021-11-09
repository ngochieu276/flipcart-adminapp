import React from "react";
import NewModal from "../../../components/UI/Modal";
import Input from "../../../components/UI/Input";
import { Row, Col, ModalTitle } from "react-bootstrap";

const UpdateCategoryModal = (props) => {
  const {
    show,
    onSubmit,
    handleClose,
    modalTitle,
    size,
    expandedArray,
    checkedArray,
    handleCategoryInput,
    categoriesList,
  } = props;
  console.log({ checkedArray, expandedArray });
  return (
    <NewModal
      show={show}
      onSubmit={onSubmit}
      handleClose={handleClose}
      modalTitle={modalTitle}
      size={size}
    >
      <Row>
        <Col>
          <h6>Expanded</h6>
        </Col>
      </Row>
      {expandedArray.length > 0 &&
        expandedArray.map((item, index) => {
          return (
            <Row key={index}>
              <Col>
                <Input
                  value={item.name}
                  placeholder={`CategoryName`}
                  onChange={(e) =>
                    handleCategoryInput(
                      "name",
                      e.target.value,
                      index,
                      "expanded"
                    )
                  }
                />
              </Col>
              <Col>
                <select
                  className='form-control'
                  value={item.parentId}
                  onChange={(e) =>
                    handleCategoryInput(
                      "parentId",
                      e.target.value,
                      index,
                      "expanded"
                    )
                  }
                >
                  <option>Select category</option>
                  {categoriesList.map((option) => {
                    return (
                      <option value={option.value} key={option.value}>
                        {option.name}
                      </option>
                    );
                  })}
                </select>
              </Col>
              <Col>
                <select
                  className='form-control'
                  value={item.type}
                  onChange={(e) =>
                    handleCategoryInput(
                      "type",
                      e.target.value,
                      index,
                      "expanded"
                    )
                  }
                >
                  <option value=''>Select Type</option>
                  <option value='store'>Store</option>
                  <option value='product'>Product </option>
                  <option value='page'>Page</option>
                </select>
              </Col>
            </Row>
          );
        })}
      <h6>Checked Array</h6>
      {checkedArray.length > 0 &&
        checkedArray.map((item, index) => {
          return (
            <Row key={index}>
              <Col>
                <Input
                  value={item.name}
                  placeholder={`CategoryName`}
                  onChange={(e) =>
                    handleCategoryInput(
                      "name",
                      e.target.value,
                      index,
                      "checked"
                    )
                  }
                />
              </Col>
              <Col>
                <select
                  className='form-control'
                  value={item.parentId}
                  onChange={(e) =>
                    handleCategoryInput(
                      "parentId",
                      e.target.value,
                      index,
                      "checked"
                    )
                  }
                >
                  <option>Select category</option>
                  {categoriesList.map((option) => {
                    return (
                      <option value={option.value} key={option.value}>
                        {option.name}
                      </option>
                    );
                  })}
                </select>
              </Col>
              <Col>
                <select
                  className='form-control'
                  value={item.type}
                  onChange={(e) =>
                    handleCategoryInput(
                      "type",
                      e.target.value,
                      index,
                      "checked"
                    )
                  }
                >
                  <option value=''>Select Type</option>
                  <option value='store'>Store</option>
                  <option value='product'>Product </option>
                  <option value='page'>Page</option>
                </select>
              </Col>
            </Row>
          );
        })}
    </NewModal>
  );
};
export default UpdateCategoryModal;
