import React, { useEffect, useState } from "react";
import "./style.css";
import Layout from "../../components/Layout";
import { Container, Row, Col, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  addCategory,
  getAllCategory,
  updateCategories,
  deleteCategories as deleCategoriesActions,
} from "../../actions";

import NewModal from "../../components/UI/Modal";
import CheckboxTree from "react-checkbox-tree";
import {
  IoIosCheckboxOutline,
  IoIosCheckbox,
  IoIosArrowForward,
  IoIosArrowDown,
  IoIosAdd,
  IoIosTrash,
  IoIosCloudUpload,
} from "react-icons/io";
import "react-checkbox-tree/lib/react-checkbox-tree.css";
import UpdateCategoryModal from "./components/UpdateCategoriesModal";
import AddCategoryModal from "./components/AddCategoryModal";
/**
 * @author
 * @function Category
 **/

export const Category = (props) => {
  const [show, setShow] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [parentCategoryId, setParentCategoryId] = useState("");
  const [categoryImage, setcategoryImage] = useState("");
  const [checked, setChecked] = useState([]);
  const [expanded, setExpanded] = useState([]);
  const [checkedArray, setCheckedArray] = useState([]);
  const [expandedArray, setExpandedArray] = useState([]);
  const [updateCategoryModal, setUpdateCategoryModal] = useState(false);
  const [deleteCategoryModal, setDeleteCategoryModal] = useState(false);

  const category = useSelector((state) => state.category);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!category.loading) {
      setShow(false);
    }
  }, [category.loading]);

  const addCategoryForm = () => {
    const form = new FormData();

    if (categoryName === "") {
      alert("Category name is required");
      setShow(false);
      return;
    }
    form.append("name", categoryName);
    form.append("parentId", parentCategoryId);
    form.append("categoryImage", categoryImage);
    dispatch(addCategory(form));
    setCategoryName("");
    setParentCategoryId("");
    setShow(false);
  };
  const handleShow = () => setShow(true);

  const handleCategoryImage = (e) => {
    setcategoryImage(e.target.files[0]);
  };

  const renderCategories = (categories) => {
    let myCategories = [];
    for (let category of categories) {
      myCategories.push({
        label: category.name,
        value: category._id,
        children:
          category.children.length > 0 && renderCategories(category.children),
      });
    }
    return myCategories;
  };
  const createCategoryList = (categories, options = []) => {
    for (let category of categories) {
      options.push({
        value: category._id,
        name: category.name,
        parentId: category.parentId,
        type: category.type,
      });
      if (category.children.length > 0) {
        createCategoryList(category.children, options);
      }
    }
    return options;
  };

  const updateCategory = () => {
    updateCheckandExpandedCategories();
    setUpdateCategoryModal(true);
    console.log({ checkedArray, expandedArray });
  };

  const updateCheckandExpandedCategories = () => {
    const categories = createCategoryList(category.categories);
    const checkedArray = [];
    const expandedArray = [];
    checked.length > 0 &&
      checked.forEach((categoryId, index) => {
        const category = categories.find(
          (category, _index) => categoryId == category.value
        );
        category && checkedArray.push(category);
      });
    expanded.length > 0 &&
      expanded.forEach((categoryId, index) => {
        const category = categories.find(
          (category, _index) => categoryId == category.value
        );
        category && expandedArray.push(category);
      });
    setCheckedArray(checkedArray);
    setExpandedArray(expandedArray);
  };

  const handleCategoryInput = (key, value, index, type) => {
    if (type == "checked") {
      const updateCheckedArray = checkedArray.map((item, _index) =>
        index == _index ? { ...item, [key]: value } : item
      );
      setCheckedArray(updateCheckedArray);
    } else if (type == "expanded") {
      const updateExpandedArray = expandedArray.map((item, _index) =>
        index == _index ? { ...item, [key]: value } : item
      );
      setExpandedArray(updateExpandedArray);
    }
  };

  const updateCategoriesForm = () => {
    const form = new FormData();
    expandedArray.forEach((item, index) => {
      form.append("_id", item.value);
      form.append("name", item.name);
      form.append("parentId", item.parentId ? item.parentId : "");
      form.append("type", item.type);
    });
    checkedArray.forEach((item, index) => {
      form.append("_id", item.value);
      form.append("name", item.name);
      form.append("parentId", item.parentId ? item.parentId : "");
      form.append("type", item.type);
    });
    dispatch(updateCategories(form));
    setUpdateCategoryModal(false);
  };

  const deleleCategory = () => {
    updateCheckandExpandedCategories();
    console.log({ checkedArray, expandedArray });
    setDeleteCategoryModal(true);
  };

  const deleleCategories = () => {
    const checkedIdArray = checkedArray.map((item, index) => ({
      _id: item.value,
    }));
    const expandedIdArray = expandedArray.map((item, index) => ({
      _id: item.value,
    }));
    const idsArray = expandedIdArray.concat(checkedIdArray);
    dispatch(deleCategoriesActions(checkedArray));
    setDeleteCategoryModal(false);
  };

  const renderDeleteCategoryModal = () => {
    return (
      <NewModal
        ModalTitle='Confirm'
        show={deleteCategoryModal}
        handleClose={() => setDeleteCategoryModal(false)}
        buttons={[
          {
            label: "No",
            color: "primary",
            onClick: () => {
              alert("no");
            },
          },
          {
            label: "Yes",
            color: "danger",
            onClick: deleleCategories,
          },
        ]}
      >
        <h5>Expanded</h5>
        {expandedArray.map((item, index) => (
          <span key={index}>{item.name}</span>
        ))}
        <h5>Checked</h5>
        {checkedArray.map((item, index) => (
          <span key={index}>{item.name}</span>
        ))}
      </NewModal>
    );
  };

  return (
    <Layout sidebar>
      <Container>
        <Row>
          <Col md={12}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h3>Category</h3>
              <div className='actionButtonContainer'>
                <span>Actions</span>
                <button onClick={handleShow}>
                  <IoIosAdd />
                  <span>Add</span>
                </button>
                <button onClick={deleleCategory}>
                  <IoIosTrash />
                  <span>Delete</span>
                </button>
                <button onClick={updateCategory}>
                  <IoIosCloudUpload />
                  <span></span>Edit
                </button>
              </div>
            </div>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <CheckboxTree
              nodes={renderCategories(category.categories)}
              checked={checked}
              expanded={expanded}
              onCheck={(checked) => setChecked(checked)}
              onExpand={(expanded) => setExpanded(expanded)}
              icons={{
                check: <IoIosCheckbox />,
                uncheck: <IoIosCheckboxOutline />,
                halfCheck: <IoIosCheckboxOutline />,
                expandClose: <IoIosArrowForward />,
                expandOpen: <IoIosArrowDown />,
              }}
            />
          </Col>
        </Row>
      </Container>
      <AddCategoryModal
        show={show}
        handleClose={() => {
          setShow(false);
        }}
        onSubmit={addCategoryForm}
        modalTitle='Add new Category'
        categoryName={categoryName}
        parentCategoryId={parentCategoryId}
        setCategoryName={setCategoryName}
        setParentCategoryId={setParentCategoryId}
        categoriesList={createCategoryList(category.categories)}
        handleCategoryImage={handleCategoryImage}
      />
      <UpdateCategoryModal
        show={updateCategoryModal}
        handleClose={() => setUpdateCategoryModal(false)}
        onSubmit={updateCategoriesForm}
        modalTitle='Update Categories'
        size='lg'
        expandedArray={expandedArray}
        checkedArray={checkedArray}
        handleCategoryInput={handleCategoryInput}
        categoriesList={createCategoryList(category.categories)}
      />
      {renderDeleteCategoryModal()}
    </Layout>
  );
};

export default Category;
