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

const Button = styled.button`
  font-size: 16px;
  font-weight: bold;
  color: #fff;
  background: linear-gradient(135deg, #6a11cb, #2575fc);
  border: none;
  border-radius: 4px;
  cursor: pointer;
  height: 40px;
  width: 200px;
  transition: all 0.3s ease;
  margin: 0 0 0 20px;

  &:hover {
    background: linear-gradient(135deg, #2575fc, #6a11cb);
  }

  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
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
const ProductImage = styled(motion.img)`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;

  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4), 0 6px 20px 0 rgba(0, 0, 0, 0.5);
  border-radius: 20px;
  width: 98%;
  height: 150px;
`;

const NoResults = styled.p`
  text-align: center;
  color: #888;
`;

const StyledProductCard = styled(motion.div)`
  background: transparent;
  border: 0px solid;
  border-radius: 0px;
  overflow: visible;
  margin: 0 0 5px 0;
  padding: 10px 10px 0 0;
  border-radius: 12px;
  position: relative;
`;

const ProductTitle = styled(motion.h5)`
  font-family: Calibre;
  color: black;
  position: absolute;
  font-size: 35px;
  margin: 10px;
  top: 25%;
  font-weight: 800;
  left: 13%;
  right: 10%;
`;
///////////////////////////////////////////////////////////////////////////

function ProductCard({ data, index }) {
  const [isHovered, setIsHovered] = useState(false);

  ///////////////////////////////////////////////////////////

  const backendEndpoint = useSelector(
    (state) => state.backendEndpoint.endpoint
  );

  //////////////////////////////////////////////////////////
  return (
    <StyledProductCard
      onHoverStart={() => {
        setIsHovered(true);
      }}
      onHoverEnd={() => {
        setIsHovered(false);
      }}
      whileTap={{ scale: 0.98 }}
      variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
      initial="hidden"
      animate="visible"
      whileHover={{
        scale: 1.03,
        filter: "grayscale(100%)",
      }}
      transition={{ opacity: { duration: 0.3, delay: index * 0.1 } }}
    >
      <Link to={"/edit-product/"} style={{ textDecoration: "none" }}>
        <ProductImage
          animate={{ opacity: isHovered ? 0.6 : 1 }}
          src={`${backendEndpoint}/${data.images[0]}`}
        />
        <ProductTitle animate={{ opacity: !isHovered ? 0 : 1 }}>
          {data.title}
        </ProductTitle>
      </Link>
    </StyledProductCard>
  );
}

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
      <div style={{ display: "flex", flexDirection: "row" }}>
        <SearchBar
          type="text"
          placeholder="Search for cars..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Button>+ Add product</Button>
      </div>
      <ProductsContainer>
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product, index) => (
            <ProductCard key={product.id} data={product} index={index} />
          ))
        ) : (
          <NoResults>No cars found matching your search.</NoResults>
        )}
      </ProductsContainer>
    </Container>
  );
};

export default ProductList;
