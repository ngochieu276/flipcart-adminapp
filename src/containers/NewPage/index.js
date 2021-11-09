import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout";
import { Row, Col, Container } from "react-bootstrap";
import Input from "../../components/UI/Input";
import NewModal from "../../components/UI/Modal";
import linearCategories from "../../helper/linearCategories";
import { useSelector, useDispatch } from "react-redux";
import { createPage } from "../../actions";

/**
 * @author
 * @function NewPage
 **/

export const NewPage = (props) => {
  const [createModal, setCreateModal] = useState(false);
  const [title, setTitle] = useState();
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState();
  const [type, setType] = useState("");
  const [desc, setDesc] = useState("");
  const [banners, setBanners] = useState([]);
  const [products, setProducts] = useState([]);

  const dispatch = useDispatch();

  const category = useSelector((state) => state.category);
  const page = useSelector((state) => state.page);

  useEffect(() => {
    setCategories(linearCategories(category.categories));
  }, [category]);

  useEffect(() => {
    if (!page.loading) {
      setCreateModal(false);
      setTitle("");
      setDesc("");
      setCategoryId("");
      setBanners("");
      setProducts("");
    }
  }, [page]);

  const handleBannerImages = (e) => {
    setBanners([...banners, e.target.files[0]]);
  };
  const handleProductsImages = (e) => {
    setProducts([...products, e.target.files[0]]);
  };

  const onCategoryChange = (e) => {
    const category = categories.find((cat) => cat.value == e.target.value);
    setCategoryId(e.target.value);
    setType(category.type);
  };

  const submitPageform = (e) => {
    if (title == "") {
      alert("Title is required");
      setCreateModal(false);
      return;
    }
    const form = new FormData();
    form.append("title", title);
    form.append("description", desc);
    form.append("category", categoryId);
    form.append("type", type);
    banners.forEach((banner, index) => form.append("banners", banner));
    products.forEach((product, index) => form.append("products", product));

    dispatch(createPage(form));
  };

  const renderCreatePageModal = () => {
    return (
      <NewModal
        show={createModal}
        modalTitle={"createNewPage"}
        handleClose={() => setCreateModal(false)}
        onSubmit={submitPageform}
      >
        <Container>
          <Row>
            <Col>
              <Input
                className='form-control-sm'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder={"Page Title"}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <Input
                className='form-control-sm'
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                placeholder={"Description"}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <Input
                type='select'
                value={categoryId}
                onChange={onCategoryChange}
                options={categories}
                placeholder='Select Category'
              />
            </Col>
          </Row>
          <h5>Banner</h5>
          {banners.length > 0
            ? banners.map((banner, index) => (
                <Row key={index}>
                  <Col>{banner.name}</Col>
                </Row>
              ))
            : null}
          <Row>
            <Col>
              <Input
                className='form-control'
                type='file'
                name='banner'
                onChange={handleBannerImages}
              />
            </Col>
          </Row>
          <h5>Products</h5>
          {products.length > 0
            ? products.map((product, index) => (
                <Row key={index}>
                  <Col>{product.name}</Col>
                </Row>
              ))
            : null}
          <Row>
            <Col>
              <Input
                className='form-control'
                type='file'
                name='products'
                onChange={handleProductsImages}
              />
            </Col>
          </Row>
        </Container>
      </NewModal>
    );
  };
  return (
    <Layout sidebar>
      {page.loading ? (
        <p>Creating page .. please wait</p>
      ) : (
        <>
          {renderCreatePageModal()}
          <button onClick={() => setCreateModal(true)}>Create page</button>
        </>
      )}
    </Layout>
  );
};
