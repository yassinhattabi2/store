import React, { useEffect, useState } from "react";
import { Box, Breadcrumbs, Typography, Link, List, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText, Divider, Grid, Stack, Avatar } from "@mui/material";
import axios from "axios";
import EcommerceAppBar from "public/component/appbar";
import Chip from "ui-component/extended/Chip";
import { useTheme } from "@mui/material/styles";
import orderavatar from '../../../../public/assets/icon/order.webp'
import { Helmet } from "react-helmet";
const OrdersPage = () => {
  const theme = useTheme();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    setLoading(true); 
    const user = JSON.parse(localStorage.getItem("user")); 
    const userId = user ? user.userId : null;
  
    console.log("Fetching orders for userId:", userId); 
  
    if (!userId) {
      console.error("User ID is missing or invalid.");
      alert("User not logged in or invalid user data.");
      setLoading(false);
      return;
    }
  
    try {
      const response = await axios.get(`http://localhost:5000/api/orders/${userId}`);
      console.log("API Response:", response.data); 
      setOrders(response.data.orders ); 
    } catch (error) {
      console.error("Error fetching orders:", error);
      if (error.response) {
        console.error("API responded with:", error.response.data);
      }
      alert("Failed to fetch orders. Please try again later.");
    } finally {
      setLoading(false); 
    }
  };
  

  useEffect(() => {
    fetchOrders();
  }, []);

  useEffect(() => {
    console.log("Orders:", orders); 
  }, [orders]);

  const chipStyles = (color, backgroundColor) => ({
    height: 24,
    padding: "0 6px",
    color,
    backgroundColor,
    marginRight: "5px",
  });

  return (
    <>
     <Helmet>
        <title>Orders</title>
        
      </Helmet>
      <EcommerceAppBar />
      <Box sx={{ p: 4, marginTop: "100px" }}>
        <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }}>
          <Link underline="hover" color="inherit" href="/Home">Home</Link>
          <Typography color="text.primary" variant="h4">My Orders</Typography>
        </Breadcrumbs>

        {loading ? (
          <Typography variant="body1">Loading...</Typography>
        ) : (
          <List sx={{ maxWidth: "100%", py: 0, borderRadius: "10px" }}>
            {orders.length === 0 ? (
              <Typography variant="body1">No orders found.</Typography>
            ) : (
              orders.map((order, index) => (
                <React.Fragment key={index}>
                  <img alt="Order Item" src={order.img} width={200}  />
                  <ListItem sx={{ p: 2, borderBottom: "1px solid", borderColor: "divider" }}>
                  
                    
                   
                    <ListItemText
                      primary={<Typography variant="subtitle1">Order #{order.idCmd}</Typography>}
                      secondary={<Typography variant="body2">Order details and description</Typography>}
                    />
                    <ListItemSecondaryAction>
                      <Typography variant="caption">{order.DateCreaction}</Typography><br/>
                    </ListItemSecondaryAction>
                  </ListItem>

                  <Grid container direction="column" sx={{ pl: 7, pb: 2 }}>
                    <Grid item>
                      <Typography variant="body2">
                        Mode Paiement: {order.modePaiement}<br/>Mode Livraison: {order.ModeLivraison}
                      </Typography>
                      <Typography variant="body2">
                        Delais de Livraison: {order.DelaisLivraison}<br/>
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Stack direction="row" spacing={2} mt={1}>
                      statue :
                        <Chip
                          label={order.statue}
                          
                          sx={chipStyles(
                            
                            order.statue === "success" ? theme.palette.success : theme.palette.success,
                            order.statue === "success" ? theme.palette.success :theme.palette.success
                          )}
                        />
                        
                      </Stack>
                    </Grid>
                  </Grid>

                  {index !== orders.length - 1 && <Divider />}
                </React.Fragment>
              ))
            )}
          </List>
        )}
      </Box>
    </>
  );
};

export default OrdersPage;
