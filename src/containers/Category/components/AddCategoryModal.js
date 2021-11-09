import React from "react";
import NewModal from "../../../components/UI/Modal";
import Input from "../../../components/UI/Input";
import { Row, Col } from "react-bootstrap";

const AddCategoryModal = (props) => {
  const {
    show,
    onSubmit,
    modalTitle,
    handleClose,
    categoryName,
    parentCategoryId,
    setCategoryName,
    setParentCategoryId,
    categoriesList,
    handleCategoryImage,
  } = props;
  return (
    <NewModal
      show={show}
      handleClose={handleClose}
      onSubmit={onSubmit}
      modalTitle={modalTitle}
    >
      <Row>
        <Col>
          <Input
            value={categoryName}
            placeholder={`CategoryName`}
            onChange={(e) => setCategoryName(e.target.value)}
            className='form-control-sm'
          />
        </Col>
        <Col>
          <select
            className='form-control'
            value={parentCategoryId}
            onChange={(e) => setParentCategoryId(e.target.value)}
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
      </Row>
      <Row>
        <Col>
          <input
            type='file'
            name='categoryImage'
            onChange={handleCategoryImage}
          />
        </Col>
      </Row>
    </NewModal>
  );
};

export default AddCategoryModal;
