import React, { useState } from "react";
import "./style.css";
import Layout from "../../components/Layout";
import { Container, Row, Col, Table } from "react-bootstrap";
import Input from "../../components/UI/Input";
import { useSelector, useDispatch } from "react-redux";
import { addProduct, deleteProductById } from "../../actions";
import NewModal from "../../components/UI/Modal";
import { generatePublicUrl } from "../../urlConfig";

/**
 * @author
 * @function Products
 **/

export const Products = (props) => {
  const [show, setShow] = useState(false);
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [productPictures, setProductPictures] = useState([]);
  const [productDetaiModal, setProductDetailModal] = useState(false);
  const [productDetails, setProductDetails] = useState(null);

  const category = useSelector((state) => state.category);
  const product = useSelector((state) => state.product);
  const dispatch = useDispatch();

  const addProductHandle = () => {
    const form = new FormData();
    form.append("name", name);
    form.append("quantity", quantity);
    form.append("price", price);
    form.append("description", description);
    form.append("category", categoryId);
    for (let pic of productPictures) {
      form.append("productPicture", pic);
    }

    dispatch(addProduct(form));
    console.log("as");
    setShow(false);
  };
  const handleShow = () => setShow(true);

  const createCategoryList = (categories, options = []) => {
    if (!categories) {
      return null;
    }
    for (let category of categories) {
      options.push({ value: category._id, name: category.name });
      if (category.children.length > 0) {
        createCategoryList(category.children, options);
      }
    }
    return options;
  };

  const handleProductPictures = (e) => {
    setProductPictures([...productPictures, e.target.files[0]]);
  };

  const renderProducts = (
    <Table responsive='sm'>
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Price</th>
          <th>Quantity</th>

          <th>Category</th>
        </tr>
      </thead>
      <tbody>
        {product.products.length > 0
          ? product.products.map((product) => {
              return (
                <tr key={product.id}>
                  <td>2</td>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>{product.quantity}</td>

                  <td>{product.category.name}</td>
                  <td>
                    <button onClick={() => handleShowProductDetail(product)}>
                      info
                    </button>
                    <button
                      onClick={() => {
                        const payload = {
                          productId: product._id,
                        };
                        dispatch(deleteProductById(payload));
                      }}
                    >
                      del
                    </button>
                  </td>
                </tr>
              );
            })
          : null}
      </tbody>
    </Table>
  );

  const renderAddProductModal = (
    <NewModal
      show={show}
      handleClose={() => setShow(false)}
      onSubmit={addProductHandle}
      modalTitle='Add new Category'
    >
      <Input
        label='Name'
        value={name}
        placeholder={`Product name`}
        onChange={(e) => setName(e.target.value)}
      />
      <Input
        label='Quantity'
        value={quantity}
        placeholder={`Quantity`}
        onChange={(e) => setQuantity(e.target.value)}
      />
      <Input
        label='Price'
        value={price}
        placeholder={`Price`}
        onChange={(e) => setPrice(e.target.value)}
      />
      <Input
        label='Description'
        value={description}
        placeholder={`Description`}
        onChange={(e) => setDescription(e.target.value)}
      />

      <select
        className='form-control'
        value={categoryId}
        onChange={(e) => setCategoryId(e.target.value)}
      >
        <option>Select category</option>
        {createCategoryList(category.categories).map((option) => {
          return (
            <option value={option.value} key={option.value}>
              {option.name}
            </option>
          );
        })}
      </select>
      {productPictures.length > 0
        ? productPictures.map((pic, index) => <div key={index}>{pic.name}</div>)
        : null}
      <input
        type='file'
        name='productPictures'
        onChange={handleProductPictures}
      />
    </NewModal>
  );
  const handleCloseProductDetail = () => {
    setProductDetailModal(false);
  };

  const handleShowProductDetail = (product) => {
    setProductDetails(product);
    setProductDetailModal(true);
  };

  const renderShowProductDetail = () => {
    if (!productDetails) {
      return null;
    }
    return (
      <NewModal
        show={productDetaiModal}
        handleClose={handleCloseProductDetail}
        modalTitle='Product Detail'
        sz='lg'
      >
        <Row>
          <Col md='6'>
            <label className='key'>Name</label>
            <p className='value'>{productDetails.name}</p>
          </Col>
          <Col md='6'>
            <label className='key'>Price</label>
            <p className='value'>{productDetails.price}</p>
          </Col>
          <Col md='6'>
            <label className='key'>Quantity</label>
            <p className='value'>{productDetails.quantity}</p>
          </Col>
          <Col md='6'>
            <label className='key'>Category</label>
            <p className='value'>{productDetails.category.name}</p>
          </Col>
        </Row>
        <Row md='6'>
          <Col md='12'>
            <label>Description</label>
            <p>{productDetails.description}</p>
          </Col>
        </Row>
        <Row>
          <Col>
            <label className='key'>Product Pictures</label>
            <div style={{ display: "flex" }}>
              {productDetails.productPictures.map((picture) => {
                return (
                  <div className='productImgConttainer'>
                    <img src={generatePublicUrl(picture.img)} />
                  </div>
                );
              })}
            </div>
          </Col>
        </Row>
      </NewModal>
    );
  };

  return (
    <Layout sidebar>
      <Container>
        <Row>
          <Col md={12}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h3>Product</h3>
              <button onClick={handleShow}>Add</button>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>{renderProducts}</Col>
        </Row>
      </Container>
      {renderAddProductModal}
      {renderShowProductDetail()}
    </Layout>
  );
};

export default Products;
