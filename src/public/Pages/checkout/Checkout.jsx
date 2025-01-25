import React, { useEffect, useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Container, TextField, Button, Typography, Box, MenuItem, Grid, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Helmet } from "react-helmet";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
  },
});

// Yup validation schema
const validationSchema = Yup.object({
  email: Yup.string().email("Email invalide").required("Email requis"),
  cardNumber: Yup.string()
    .matches(/^[0-9]{16}$/, "Le numéro de carte doit avoir 16 chiffres")
    .required("Numéro de carte requis"),
  expiry: Yup.string()
    .matches(/^(0[1-9]|1[0-2])\/?([0-9]{2})$/, "MM/AA invalide")
    .required("Date d'expiration requise"),
  cvc: Yup.string()
    .matches(/^[0-9]{3,4}$/, "Le CVC doit être de 3 ou 4 chiffres")
    .required("CVC requis"),
  cardholderName: Yup.string().required("Nom du titulaire requis"),
  country: Yup.string().required("Pays ou région requis"),
  modePaiement: Yup.string().required("Mode de paiement requis"),
  modeLivraison: Yup.string().required("Mode de livraison requis"),
  delaisLivraison: Yup.string().required("Délai de livraison requis"),
});

const PaymentPage = () => {
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null);
  const [openSuccessModal, setOpenSuccessModal] = useState(false);


  const initialValues = {
    email: "",
    cardNumber: "",
    expiry: "",
    cvc: "",
    cardholderName: "",
    country: "",
    modePaiement: "", 
    modeLivraison: "",
    delaisLivraison: "",
    DateCreaction: new Date().toLocaleDateString(),
   
  };

  useEffect(() => {
  
    const token = localStorage.getItem("token");
    if (token) {
      const decodeToken = (token) => {
        try {
          const base64Payload = token.split(".")[1];
          const base64 = base64Payload.replace(/-/g, "+").replace(/_/g, "/");
          const jsonPayload = atob(base64);
          return JSON.parse(jsonPayload);
        } catch {
          return null;
        }
      }
      setUser(decodeToken);

      // Fetch cart data from localStorage or backend (in this case we assume it's stored in localStorage)
      const savedCart = JSON.parse(localStorage.getItem("cart") || "[]");
      setCart(savedCart); // Set cart data from localStorage
    }
  }, []);
  const handleSubmit = async (values) => {

    try {
      // Get the userId from localStorage
      const user = JSON.parse(localStorage.getItem("user")); // Parse the user object stored in localStorage
      const id = user ? user.userId : null; // Get userId from user object, or set it to null if user is not available
      const images = cart.map((item) => {
        if (item.img) {
          return item.img;
        }
        return "default_image_path.jpg"; // Fallback image
      });
      console.log(images)
      if (!id) {
        alert("User not found. Please log in again.");
        return; // Early return if user is not logged in
      }
  
      // Prepare the data to send to the backend
      const dataToSend = {
        DateCreaction: values.DateCreaction,
        modePaiement: values.modePaiement,
        modeLivraison: values.modeLivraison,
        delaisLivraison: values.delaisLivraison,
        idClient: id,
        img:images,
   // Using userId from the decoded token or localStorage
      };
    
     
      // Verify the card details first
      const cardVerificationResponse = await fetch("http://localhost:5000/api/verifyCard", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cardNumber: values.cardNumber,
          expiry: values.expiry,
          cvc: values.cvc,
          cardholderName: values.cardholderName,
        }),
      });
  
      const cardVerificationResult = await cardVerificationResponse.json();
  
      if (cardVerificationResult.success) {
        // If card verification is successful, send data to backend to create the order
        const orderResponse = await fetch("http://localhost:5000/api/commande", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataToSend),
        });
  
        const orderResult = await orderResponse.json();
  
        if (orderResult.success) {
          console.log("Order placed successfully:", orderResult.message);
          setOpenSuccessModal(true); // Open success modal
        } else {
          console.error("Order placement failed:", orderResult.message);
          alert(orderResult.message || "An error occurred while placing the order.");
        }
      } else {
        console.error("Card verification failed:", cardVerificationResult.message);
        alert(cardVerificationResult.message || "Card verification failed.");
      }
    } catch (error) {
      console.error("Error occurred during payment:", error);
      alert("An error occurred while processing the payment.");
    }
  };
  // Calculate the total price
  const calculateTotalPrice = () => {
    return cart.reduce((total, item) => total + item.Price * item.quantity, 0);
  };

  const handleBackToProductPage = () => {
    window.location.href = "/product"; 
  };

  const handleGoToOrderPage = () => {
    window.location.href = "/orders"; 
    localStorage.removeItem('cart')
  };

  return (
    <ThemeProvider theme={theme}>
     
        <Helmet>
        <title>Checkout</title>
        
      </Helmet>
      <Container
        style={{
          marginTop: "5rem",
          padding: "2rem",
          border: "1px solid #ccc",
          borderRadius: "8px",
          width: "100%",
        }}
      >
        <Grid container spacing={4}>
          {/* Left Section: Payment Info */}
          <Grid item xs={12} md={6}>
            <Typography variant="h5" gutterBottom>
              Payer
            </Typography>

            {/* Add 'Retour au produit' button */}
            <Button
              variant="outlined"
              color="primary"
              onClick={handleBackToProductPage}
              style={{ marginBottom: "1rem" }}
            >
              Retour au produit
            </Button>

            {/* Display cart item and total */}
            {cart.length > 0 ? (
              <>
                {cart.map((item) => (
                  <Box display="flex" alignItems="center" marginBottom={2} key={item.ProductID}>
                    <img
                      src={item.img || "https://via.placeholder.com/50"} // Default placeholder if no image
                      alt={item.ProductName}
                      style={{ marginRight: "1rem", borderRadius: "4px", width: "20%" }}
                    />
                    <Box>
                      <Typography variant="subtitle1">{item.ProductName}</Typography>
                      <Typography variant="body2" color="textSecondary">
                        {item.description}
                      </Typography>
                      <Typography variant="body2" style={{ marginTop: "0.5rem" }}>
                        Prix: {item.Price} ₹ x {item.quantity} = {item.Price * item.quantity} €
                      </Typography>
                    </Box>
                  </Box>
                ))}
                <Typography variant="h6" style={{ marginTop: "1rem" }}>
                  Montant total du : {calculateTotalPrice()} €
                </Typography>
              </>
            ) : (
              <Typography variant="subtitle1" color="textSecondary">
                Votre panier est vide
              </Typography>
            )}

            <Typography variant="h4" gutterBottom style={{ marginTop: "1rem" }}>
              {cart.length > 0 ? `Total: ${calculateTotalPrice()} € ` : "Aucun article dans le panier"}
            </Typography>
          </Grid>

          {/* Right Section: Payment Form */}
          <Grid item xs={12} md={6}>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ errors, touched }) => (
                <Form>
                  <Field
                    as={TextField}
                    fullWidth
                    name="email"
                    label="E-mail"
                    variant="outlined"
                    margin="normal"
                    error={touched.email && Boolean(errors.email)}
                    helperText={touched.email && errors.email}
                  />
                  <Field
                    as={TextField}
                    fullWidth
                    name="cardNumber"
                    label="Informations de la carte"
                    variant="outlined"
                    margin="normal"
                    placeholder="1234 1234 1234 1234"
                    error={touched.cardNumber && Boolean(errors.cardNumber)}
                    helperText={touched.cardNumber && errors.cardNumber}
                  />
                  <Box display="flex" justifyContent="space-between">
                    <Field
                      as={TextField}
                      name="expiry"
                      label="MM / AA"
                      variant="outlined"
                      margin="normal"
                      style={{ width: "48%" }}
                      error={touched.expiry && Boolean(errors.expiry)}
                      helperText={touched.expiry && errors.expiry}
                    />
                    <Field
                      as={TextField}
                      name="cvc"
                      label="CVC"
                      variant="outlined"
                      margin="normal"
                      style={{ width: "48%" }}
                      error={touched.cvc && Boolean(errors.cvc)}
                      helperText={touched.cvc && errors.cvc}
                    />
                  </Box>
                  <Field
                    as={TextField}
                    fullWidth
                    name="cardholderName"
                    label="Nom du titulaire de la carte"
                    variant="outlined"
                    margin="normal"
                    error={touched.cardholderName && Boolean(errors.cardholderName)}
                    helperText={touched.cardholderName && errors.cardholderName}
                  />
                  <Field
                    as={TextField}
                    select
                    fullWidth
                    name="country"
                    label="Pays ou région"
                    variant="outlined"
                    margin="normal"
                    error={touched.country && Boolean(errors.country)}
                    helperText={touched.country && errors.country}
                  >
                    <MenuItem value="Tunisie">Tunisie</MenuItem>
                  </Field>

                  {/* Payment Mode */}
                  <Field
                    as={TextField}
                    select
                    fullWidth
                    name="modePaiement"
                    label="Mode de paiement"
                    variant="outlined"
                    margin="normal"
                    error={touched.modePaiement && Boolean(errors.modePaiement)}
                    helperText={touched.modePaiement && errors.modePaiement}
                  >
                    <MenuItem value="CREDIT_CARD">Carte de Crédit</MenuItem>
                    <MenuItem disabled value="PAYPAL">
                      PayPal
                    </MenuItem>
                  </Field>

                  {/* Delivery Mode */}
                  <Field
                    as={TextField}
                    select
                    fullWidth
                    name="modeLivraison"
                    label="Mode de livraison"
                    variant="outlined"
                    margin="normal"
                    error={touched.modeLivraison && Boolean(errors.modeLivraison)}
                    helperText={touched.modeLivraison && errors.modeLivraison}
                  >
                    <MenuItem value="Standard">Standard</MenuItem>
                    <MenuItem value="Express">Express</MenuItem>
                  </Field>

                  {/* Delivery Time */}
                  <Field
                    as={TextField}
                    select
                    fullWidth
                    name="delaisLivraison"
                    label="Délai de livraison"
                    variant="outlined"
                    margin="normal"
                    error={touched.delaisLivraison && Boolean(errors.delaisLivraison)}
                    helperText={touched.delaisLivraison && errors.delaisLivraison}
                  >
                    <MenuItem value="1-3 jours">1-3 jours</MenuItem>
                    <MenuItem value="3-5 jours">3-5 jours</MenuItem>
                  </Field>

                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    style={{ marginTop: "1.5rem" }}
                  >
                    Payer
                  </Button>
                </Form>
              )}
            </Formik>
          </Grid>
        </Grid>

        <Typography
          variant="caption"
          display="block"
          style={{ marginTop: "2rem", textAlign: "center" }}
        >
          Propulsé par
        </Typography>

        {/* Success Modal */}
        <Dialog open={openSuccessModal} onClose={() => setOpenSuccessModal(false)}>
          <DialogTitle>Votre commande a été passée avec succès!</DialogTitle>
          <DialogContent>
            <Box display="flex" alignItems="center" justifyContent="center" flexDirection="column">
              
              <Typography variant="h6">Félicitations! Votre commande a été enregistrée.</Typography>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleGoToOrderPage} color="primary">
              Aller à ma commande
            </Button>
            <Button onClick={() => setOpenSuccessModal(false)} color="secondary">
              Fermer
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </ThemeProvider>
  );
};

export default PaymentPage;
