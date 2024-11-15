import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import Cookies from "universal-cookie";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

/////////////////////////////////////////////////////////// REDUX

import { useSelector, useDispatch } from "react-redux";

///////////////////////////////////////////////////////////////////////////

const Container = styled.div`
  max-width: 900px;
  margin: 50px auto;
  padding: 20px;
  font-family: Arial, sans-serif;
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 20px;
`;

const SearchBar = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;

  &:focus {
    border-color: #2575fc;
    outline: none;
  }
`;

const ProductsContainer = styled.div`
  display: grid;
  grid-template-columns: 25% 25% 25% 25%;
  gap: 5px;
`;

const ProductCard = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px;
  margin-bottom: 10px;
  border: 1px solid rgb(0 0 0 / 40%);
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  cursor: pointer;
`;

const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;

  & h4 {
    margin: 0;
    font-size: 18px;
  }

  & p {
    margin: 0;
    color: #666;
    font-size: 14px;
  }
`;
const ProductImage = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 8px;
`;

const NoResults = styled.p`
  text-align: center;
  color: #888;
`;

///////////////////////////////////////////////////////////////////////////

const ProductList = () => {
  const cookies = new Cookies();
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);

  ///////////////////////////////////////////////////////////

  const backendEndpoint = useSelector(
    (state) => state.backendEndpoint.endpoint
  );

  ///////////////////////////////////////////////////////////

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await axios({
        method: "get",
        url: `${backendEndpoint}/api/products`,
        headers: { Authorization: "JWT " + cookies.get("access_token") },
      });
      if (data.success === "true") {
        setProducts(data.data.products);
        setFilteredProducts(data.data.products);
      } else if (data.success === "false") {
      }
    };

    fetchProducts();
  }, []);

  ///////////////////////////////////////////////////////////

  useEffect(() => {
    const results = products.filter((product) =>
      product.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredProducts(results);
  }, [searchQuery, products]);

  ///////////////////////////////////////////////////////////

  return (
    <Container>
      <Title>My Products</Title>
      <SearchBar
        type="text"
        placeholder="Search for cars..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <ProductsContainer>
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <Link to="/edit-product">
              <ProductCard whileHover={{ scale: 1.02 }} key={product.id}>
                <ProductImage
                  src={`${backendEndpoint}/${product.images[0]}`}
                  alt={product.title}
                />
                <ProductInfo>
                  <h4>{product.title}</h4>
                  <p>Price: ₹{product.price}</p>
                </ProductInfo>
              </ProductCard>
            </Link>
          ))
        ) : (
          <NoResults>No cars found matching your search.</NoResults>
        )}
      </ProductsContainer>
    </Container>
  );
};

export default ProductList;
