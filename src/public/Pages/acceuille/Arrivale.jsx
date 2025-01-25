import React from 'react';

const Arrivale = () => {
  const sections = [
    {
      title: "NEW COLLECTION",
      subtitle: "We open 24 hours",
      image: "https://fr.mycs.com/blog/wp-content/uploads/2023/11/FR_Inspiration_Salon_Moderne_Chic_Featured_Image-scaled.jpg",
    },
    {
      title: "LIVING ROOM",
      subtitle: "Limited time sale",
      image: "https://fr.mycs.com/blog/wp-content/uploads/2023/11/FR_Inspiration_Salon_Moderne_Chic_Featured_Image-scaled.jpg",
    },
    {
      title: "DINING ROOM",
      subtitle: "Limited time sale",
      image: "https://fr.mycs.com/blog/wp-content/uploads/2023/11/FR_Inspiration_Salon_Moderne_Chic_Featured_Image-scaled.jpg",
    },
    {
      title: "WELCOME TO OUR STORE",
      subtitle: "Sale 50% off all products",
      image: "https://fr.mycs.com/blog/wp-content/uploads/2023/11/FR_Inspiration_Salon_Moderne_Chic_Featured_Image-scaled.jpg",
    },
  ];

  return (
    <div style={styles.container}>
      <br/><br/>
      <h1 style={styles.header}>Furniture Store</h1>
      <br/><br/>
      
      <div style={styles.grid}>
        {sections.map((section, index) => (
          <div key={index} style={styles.card} className="card">
            <img src={section.image} alt={section.title} style={styles.image} />
            <h2 style={styles.title}>{section.title}</h2>
            <p style={styles.subtitle}>{section.subtitle}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

// Styles CSS en ligne
const styles = {
  container: {
    fontFamily: "'Arial', sans-serif",
    padding: '50px',
    backgroundColor: '#f7f7f7',
  },
  header: {
    textAlign: 'center',
    fontSize: '2rem',
    marginBottom: '20px',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '20px',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
    padding: '20px',
    transition: 'transform 0.3s, box-shadow 0.3s',
    cursor: 'pointer',
  },
  image: {
    width: '100%',
    height: 'auto',
    borderRadius: '8px',
  },
  title: {
    fontSize: '1.5rem',
    margin: '10px 0',
  },
  subtitle: {
    fontSize: '1rem',
    color: '#666',
  },
};

// Ajouter animations via CSS pur dans index.css
const css = `
  .card:hover {
    transform: translateY(-10px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }

  .card {
    animation: fadeIn 0.8s ease-out;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: scale(0.95);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }
`;

// Ajouter CSS au document
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = css;
document.head.appendChild(styleSheet);

export default Arrivale;
