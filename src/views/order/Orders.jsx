import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Chip, // Import Chip component for status
} from "@mui/material";
import { Visibility, Delete, Print } from "@mui/icons-material";
import axios from "axios";
import { Helmet } from "react-helmet";

const OrderPage = () => {
  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openModal, setOpenModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [filter, setFilter] = useState("");

  // Fetch orders from the API
  const fetchOrders = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/orders");
      setOrders(response.data.orders);
    } catch (error) {
      console.error("Error fetching orders:", error.response || error.message);
      alert("Failed to fetch orders. Check the console for more details.");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Filter orders based on filter keyword for idCmd
  const filteredOrders = orders.filter((order) =>
    order.idCmd.toString().toLowerCase().includes(filter.toLowerCase())
  );

  // Handle opening the modal with the selected order's details
  const handleRowClick = (order) => {
    setSelectedOrder(order);
    setOpenModal(true);
  };

  // Handle closing the modal
  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedOrder(null);
  };

  // Handle deleting an order
  const handleDeleteOrder = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:5000/api/orders/${id}`);
      if (response.status === 200) {
        setOrders(orders.filter((order) => order.idCmd !== id));
      } else {
        console.error("Failed to delete order: ", response.data.message);
      }
    } catch (error) {
      console.error("Error deleting order:", error);
    }
  };

  // Function to render status as a chip with color
  const renderStatusChip = (status = "success") => {
    let color;
    let label;

    switch (status) {
      case "success":
        color = "success"; // green
        label = "Success";
        break;
      case "pending":
        color = "warning"; // yellow
        label = "Pending";
        break;
      case "failed":
        color = "error"; // red
        label = "Failed";
        break;
      default:
        color = "default";
        label = "Unknown";
    }

    return <Chip label={label} color={color} />;
  };

  // Print table or order details
  const handlePrint = (contentToPrint) => {
    const printWindow = window.open('', '', 'height=800,width=600');
    printWindow.document.write('<html><head><title>Print</title></head><body>');
    printWindow.document.write(contentToPrint);
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.print();
  };

  const printTable = () => {
    const tableContent = `
      <table border="1" cellpadding="5" cellspacing="0" style="width: 100%; border-collapse: collapse;">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Date Creation</th>
            <th>Mode Paiement</th>
            <th>Mode Livraison</th>
            <th>Delais Livraison</th>
            <th>idClient</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          ${filteredOrders
            .map(
              (order) => `
              <tr>
                <td>${order.idCmd}</td>
                <td>${order.DateCreation}</td>
                <td>${order.modePaiement}</td>
                <td>${order.ModeLivraison}</td>
                <td>${order.DelaisLivraison}</td>
                <td>${order.idClient}</td>
                <td>${renderStatusChip(order.status).props.label}</td>
              </tr>`
            )
            .join('')}
        </tbody>
      </table>
    `;
    handlePrint(tableContent);
  };

  return (
    <Box p={3}>
      <Helmet>
        <title>Orders</title>
        
      </Helmet>
      <Typography variant="h4" gutterBottom>
        Orders
      </Typography>

      <TextField
        label="Search by Order ID"
        variant="outlined"
        fullWidth
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        margin="normal"
      />

      <Button
        variant="contained"
        color="primary"
        startIcon={<Print />}
        onClick={printTable}
        sx={{ marginBottom: 2 }}
      >
        Print Orders
      </Button>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Order ID</TableCell>
              <TableCell>Date Creation</TableCell>
              <TableCell>Mode Paiement</TableCell>
              <TableCell>Mode Livraison</TableCell>
              <TableCell>Delais Livraison</TableCell>
              <TableCell>idClient</TableCell>
              <TableCell>Status</TableCell> {/* Add Status Column */}
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredOrders
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((order) => (
                <TableRow
                  key={order.idCmd}
                  onClick={() => handleRowClick(order)}
                  sx={{
                    cursor: "pointer",
                    "&:hover": { backgroundColor: "#f5f5f5" },
                  }}
                >
                  <TableCell>{order.idCmd}</TableCell>
                  <TableCell>{order.DateCreation}</TableCell>
                  <TableCell>{order.modePaiement}</TableCell>
                  <TableCell>{order.ModeLivraison}</TableCell>
                  <TableCell>{order.DelaisLivraison}</TableCell>
                  <TableCell>{order.idClient}</TableCell>
                  <TableCell>{renderStatusChip(order.status)}</TableCell> {/* Render Status */}
                  <TableCell
                    onClick={(e) => e.stopPropagation()}
                  >
                    <IconButton color="primary" onClick={() => handleRowClick(order)}>
                      <Visibility />
                    </IconButton>
                    <IconButton color="secondary" onClick={() => handleDeleteOrder(order.idCmd)}>
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[5, 10, 15]}
        component="div"
        count={filteredOrders.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={(event, newPage) => setPage(newPage)}
        onRowsPerPageChange={(event) => setRowsPerPage(+event.target.value)}
      />

      {/* Order Details Modal */}
      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle>Order Details</DialogTitle>
        <DialogContent>
          {selectedOrder ? (
            <Box>
              <Typography variant="subtitle1">
                <strong>Order ID: #</strong> {selectedOrder.idCmd}
              </Typography>
              <Typography variant="subtitle1">
                <strong>Date Creation:</strong> {selectedOrder.DateCreation}
              </Typography>
              <Typography variant="subtitle1">
                <strong>Mode Paiement:</strong> {selectedOrder.modePaiement}
              </Typography>
              <Typography variant="subtitle1">
                <strong>Mode Livraison:</strong> {selectedOrder.ModeLivraison}
              </Typography>
              <Typography variant="subtitle1">
                <strong>Delais Livraison:</strong> {selectedOrder.DelaisLivraison}
              </Typography>
              <Typography variant="subtitle1">
                <strong>Client ID:</strong> {selectedOrder.idClient}
              </Typography>
              <Typography variant="subtitle1">
                <strong>Status:</strong> {renderStatusChip(selectedOrder.status)}
              </Typography> {/* Display Status in Modal */}
            </Box>
          ) : (
            <Typography variant="body2">Loading order details...</Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default OrderPage;
