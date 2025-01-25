import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  TextField,
  Typography,
  Breadcrumbs,
  Link,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Tab,
  Tabs,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux"; 
import { logout } from "../../../store/Slices/authSlice"; 

import EcommerceAppBar from "public/component/appbar";
import PasswordUpdate from "./EditePassword";
import { Helmet } from "react-helmet";

// Validation schema using Yup
const validationSchema = Yup.object({
  nom: Yup.string().required("Le prénom est requis"),
  prenom: Yup.string().required("Le nom de famille est requis"),
  email: Yup.string().email("Adresse email invalide").required("L'email est requis"),
  adresse: Yup.string().required("L'adresse est requise"),
  telephone: Yup.string().required("Le numéro de téléphone est requis"),
});

const ProfilePage = () => {
  const [profile, setProfile] = useState({
    nom: "",
    prenom: "",
    email: "",
    adresse: "",
    telephone: "",
    profileImage: "",
  });
  const [selectedImage, setSelectedImage] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [tabIndex, setTabIndex] = useState(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Décoder le token JWT
  const decodeToken = (token) => {
    try {
      const base64Payload = token.split(".")[1];
      const base64 = base64Payload.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = atob(base64);
      return JSON.parse(jsonPayload);
    } catch {
      return null;
    }
  };


  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = decodeToken(token);
      if (decoded) {
        const { nom, prenom, email, adresse, tel, profileImage } = decoded;
        setProfile({
          nom: nom || "",
          prenom: prenom || "",
          email: email || "",
          adresse: adresse || "",
          telephone: tel || "",
          profileImage: profileImage || "/default-avatar.png",
        });
      }
    }
  }, []);


  const formik = useFormik({
    initialValues: {
      nom: profile.nom,
      prenom: profile.prenom,
      email: profile.email,
      adresse: profile.adresse,
      telephone: profile.telephone,
    },
    validationSchema,
    onSubmit: async (values) => {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Aucun token d'authentification valide trouvé.");
        return;
      }

      const decoded = decodeToken(token);
      if (!decoded || decoded.email !== values.email) {
        alert("L'email dans le formulaire ne correspond pas à l'email du token.");
        return;
      }

      const formData = new FormData();
      formData.append("nom", values.nom);
      formData.append("prenom", values.prenom);
      formData.append("email", values.email);
      formData.append("adresse", values.adresse);
      formData.append("telephone", values.telephone);
      if (selectedImage) {
        formData.append("profileImage", selectedImage);
      }

      try {
        const response = await fetch("http://localhost:5000/api/update-profile", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        });

        if (response.ok) {
          const data = await response.json();
          if (data.token) {
            localStorage.setItem("token", data.token); 
            const decoded = decodeToken(data.token);
            if (decoded) {
              const { nom, prenom, email, adresse, telephone, profileImage } = decoded;
              setProfile({
                nom: nom || "",
                prenom: prenom || "",
                email: email || "",
                adresse: adresse || "",
                telephone: telephone || "",
                profileImage: profileImage || "/default-avatar.png",
              });
            }
          }

       
          dispatch(logout()); 
          localStorage.removeItem("token"); 
          
          setOpenDialog(true); 
          setTimeout(() => {
            navigate("/login"); 
          }, 2000);
        } else {
          alert("Échec de la mise à jour du profil.");
        }
      } catch (error) {
        console.error("Erreur lors de la mise à jour du profil:", error);
        alert("Une erreur est survenue lors de la sauvegarde du profil.");
      }
    },
  });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      formik.setFieldValue("profileImage", URL.createObjectURL(file)); 
    }
  };

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue); 
  };

  return (
    <>
     <Helmet>
        <title>Profil</title>
        
      </Helmet>
      <EcommerceAppBar />
      <Box sx={{ p: 4, marginTop: "100px" }}>
    
        <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }}>
          <Link underline="hover" color="inherit" href="/Home">
          Home
          </Link>
          <Link underline="hover" color="inherit" href="/profile">
            Mon profil
          </Link>
          <Typography color="text.primary" variant="h2">
            Modifier mon profil
          </Typography>
        </Breadcrumbs>

       

        <Tabs value={tabIndex} onChange={handleTabChange} aria-label="Profile tabs" sx={{ mb: 3 }}>
          <Tab label="Informations personnelles" />
          <Tab label="Changer de mot de passe" />
        </Tabs>

        <Grid container spacing={4}>
 
          {tabIndex === 0 && (
            <Grid item xs={12} md={12}>
              <Card>
                <Grid container spacing={4}>
                  <Grid item xs={12} md={4}>
                    <Card>
                      <img
                        height="240"
                        src={profile.profileImage || "/default-avatar.png"}
                        alt="User profile"
                        style={{
                          width: "50%",
                          objectFit: "cover",
                          borderRadius: "200px",
                          marginLeft: "100px",
                        }}
                      />
                      <CardContent>
                      
                        <Divider sx={{ my: 2 }} />
                        <Button 
  fullWidth 
  variant="contained" 
  component="label" 
  sx={{
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: 'primary.main', 
    '&:hover': {
      backgroundColor: 'primary.dark',
    },
    padding: '10px 20px',
    borderRadius: '8px',
    textTransform: 'none',
    fontWeight: 'bold',
  }}
>
  Télécharger une image

  <input 
    type="file" 
    hidden 
    onChange={handleFileChange} 
    accept="image/*"
  />
</Button>

                      </CardContent>
                    </Card>
                  </Grid>

                  <Grid item xs={12} md={8}>
                    <Card>
                      <CardContent>
                        <Typography variant="h2" gutterBottom>
                          Mettre à jour le profil
                        </Typography>
                        <form onSubmit={formik.handleSubmit}>
                          <Grid container spacing={2} sx={{ mt: 1 }}>
                            <Grid item xs={12} md={6}>
                              <TextField
                                label="Prénom"
                                fullWidth
                                required
                                name="nom"
                                value={formik.values.nom}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.nom && Boolean(formik.errors.nom)}
                                helperText={formik.touched.nom && formik.errors.nom}
                              />
                            </Grid>
                            <Grid item xs={12} md={6}>
                              <TextField
                                label="Nom de famille"
                                fullWidth
                                required
                                name="prenom"
                                value={formik.values.prenom}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.prenom && Boolean(formik.errors.prenom)}
                                helperText={formik.touched.prenom && formik.errors.prenom}
                              />
                            </Grid>
                            <Grid item xs={12} md={6}>
                              <TextField
                                label="Adresse e-mail"
                                fullWidth
                                required
                                name="email"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.email && Boolean(formik.errors.email)}
                                helperText={formik.touched.email && formik.errors.email}
                              />
                            </Grid>
                            <Grid item xs={12} md={6}>
                              <TextField
                                label="Adresse"
                                fullWidth
                                required
                                name="adresse"
                                value={formik.values.adresse}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.adresse && Boolean(formik.errors.adresse)}
                                helperText={formik.touched.adresse && formik.errors.adresse}
                              />
                            </Grid>
                            <Grid item xs={12} md={6}>
                              <TextField
                                label="Téléphone"
                                fullWidth
                                required
                                name="telephone"
                                value={formik.values.telephone}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.telephone && Boolean(formik.errors.telephone)}
                                helperText={formik.touched.telephone && formik.errors.telephone}
                              />
                            </Grid>
                          </Grid>
                          <Box sx={{ textAlign: "right", mt: 3 }}>
                            <Button type="submit" variant="contained" color="primary">
                              Sauvegarder les détails
                            </Button>
                          </Box>
                        </form>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              </Card>
            </Grid>
          )}

      
          {tabIndex === 1 && <PasswordUpdate />}
        </Grid>
      </Box>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Mise à jour réussie</DialogTitle>
        <DialogContent>
          <Typography style={{ textAlign: "center" }}>
            Votre profil a été mis à jour avec succès !
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ProfilePage;
