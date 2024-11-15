import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";

// Styled Components
const Container = styled.div`
  max-width: 800px;
  margin: 50px auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 20px;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;

  &:focus {
    border-color: #2575fc;
    outline: none;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;

  &:focus {
    border-color: #2575fc;
    outline: none;
  }
`;

const FileInput = styled.input`
  margin-top: 10px;
`;

const ImagePreview = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  margin-right: 10px;
  margin-top: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  font-size: 16px;
  font-weight: bold;
  color: #fff;
  background-color: #2575fc;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #1b5ecc;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const AddProduct = () => {
  const [product, setProduct] = useState({
    title: "",
    description: "",
    price: "",
  });
  const [uploadedImages, setUploadedImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (uploadedImages.length + files.length > 10) {
      alert("You can upload up to 10 images only.");
      return;
    }
    setUploadedImages([...uploadedImages, ...files]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append("title", product.title);
      formData.append("description", product.description);
      formData.append("price", product.price);

      uploadedImages.forEach((file) => {
        formData.append("images", file);
      });

      await axios.post("/api/products", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Product added successfully!");
      setProduct({ title: "", description: "", price: "" });
      setUploadedImages([]);
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Failed to add product.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <Title>Add New Product</Title>
      <form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            name="title"
            type="text"
            value={product.title}
            onChange={handleInputChange}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="description">Description</Label>
          <TextArea
            id="description"
            name="description"
            rows="5"
            value={product.description}
            onChange={handleInputChange}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="price">Price</Label>
          <Input
            id="price"
            name="price"
            type="number"
            value={product.price}
            onChange={handleInputChange}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label>Images (up to 10)</Label>
          <FileInput
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileChange}
          />
          <div>
            {uploadedImages.map((image, index) => (
              <ImagePreview
                key={index}
                src={URL.createObjectURL(image)}
                alt={`Uploaded Preview ${index + 1}`}
              />
            ))}
          </div>
        </FormGroup>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Adding..." : "Add Product"}
        </Button>
      </form>
    </Container>
  );
};

export default AddProduct;
