import React from 'react';

// Simulated product data
const products = [
  { id: 1, name: "Modern Chair", price: "$120", image: "https://via.placeholder.com/150" },
  { id: 2, name: "Stylish Lamp", price: "$80", image: "https://via.placeholder.com/150" },
  { id: 3, name: "Luxury Sofa", price: "$450", image: "https://via.placeholder.com/150" },
  { id: 4, name: "Elegant Table", price: "$300", image: "https://via.placeholder.com/150" },
  { id: 5, name: "Bed Frame", price: "$250", image: "https://via.placeholder.com/150" },
  { id: 6, name: "Cozy Rug", price: "$90", image: "https://via.placeholder.com/150" },
  { id: 7, name: "Dining Chair", price: "$150", image: "https://via.placeholder.com/150" },
  { id: 8, name: "Office Desk", price: "$220", image: "https://via.placeholder.com/150" },
  { id: 9, name: "Bookshelf", price: "$200", image: "https://via.placeholder.com/150" },
];

const ProductsGrid = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Our Products</h1>
<br/><br/>
      {/* Product Grid */}
      <div style={styles.productGrid}>
        {products.map((product) => (
          <div key={product.id} style={styles.productCard} className="product-card">
            <img src={product.image} alt={product.name} style={styles.productImage} />
            <h2 style={styles.productName}>{product.name}</h2>
            <p style={styles.productPrice}>{product.price}</p>
          </div>
        ))}
      </div>

      {/* See All Button */}
      <div style={styles.buttonContainer}>
        <button style={styles.seeAllButton}>See All</button>
      </div>
    </div>
  );
};

// Inline styles
const styles = {
  container: {
    fontFamily: "'Arial', sans-serif",
    
    minHeight: "60vh",
    padding: "100px",
   
  },
  header: {
    textAlign: "center",
    fontSize: "2rem",
    marginBottom: "20px",
  },
  productGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 400px)",
    gap: "40px",
     marginLeft:"100px"
  },
  productCard: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "10px",
    textAlign: "center",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    transition: "transform 0.3s, box-shadow 0.3s",
 
  },
  productImage: {
    width: "100%",
    height: "auto",
    borderRadius: "8px",
    marginBottom: "10px",
  },
  productName: {
    fontSize: "1.2rem",
    margin: "10px 0",
  },
  productPrice: {
    fontSize: "1rem",
    color: "#666",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "center",
    marginTop: "20px",
  },
  seeAllButton: {
    padding: "10px 20px",
    border: "none",
    borderRadius: "5px",
    backgroundColor: "black",
    color: "#fff",
    cursor: "pointer",
    fontSize: "1rem",
    transition: "background-color 0.3s ease",
  },
};

// Add CSS for animations
const css = `
  .product-card:hover {
    transform: scale(1.05);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }

  .seeAllButton:hover {
    background-color: white;
  }
`;
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = css;
document.head.appendChild(styleSheet);

export default ProductsGrid;
