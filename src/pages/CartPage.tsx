import React, { useState } from 'react';
import {
  Box,
  Container,
  Card,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  TextField,
  Typography,
  Grid,
  Paper,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useCart } from '../context/CartContext';
import { useAdmin } from '../context/AdminContext';
import { colors } from '../theme/theme';
import { useNavigate } from 'react-router-dom';

const CartPage: React.FC = () => {
  const { items, totalPrice, totalItems, removeFromCart, updateQuantity } = useCart();
  const { promoCodes, validatePromoCode } = useAdmin();
  const navigate = useNavigate();

  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<any>(null);
  const [openPromo, setOpenPromo] = useState(false);
  const [error, setError] = useState('');

  const handleApplyPromo = () => {
    const valid = validatePromoCode(promoCode);
    if (valid) {
      setAppliedPromo(valid);
      setError('');
      setOpenPromo(false);
    } else {
      setError('Invalid or expired promo code');
    }
  };

  const discountAmount = appliedPromo
    ? appliedPromo.discountType === 'percentage'
      ? (totalPrice * appliedPromo.discountValue) / 100
      : appliedPromo.discountValue
    : 0;

  const finalTotal = totalPrice - discountAmount;

  if (items.length === 0) {
    return (
      <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
              Your cart is empty
            </Typography>
            <Typography variant="body1" sx={{ color: colors.gray600, mb: 4 }}>
              Start shopping to add items to your cart
            </Typography>
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate('/products')}
            >
              Continue Shopping
            </Button>
          </Box>
        </Container>
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography
        variant="h4"
        sx={{
          fontWeight: 700,
          mb: 4,
          color: colors.primary,
        }}
      >
        Shopping Cart
      </Typography>

      <Grid container spacing={3}>
        {/* Cart Items */}
        <Grid item xs={12} md={8}>
          <Card>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow sx={{ backgroundColor: colors.gray100 }}>
                    <TableCell>Product</TableCell>
                    <TableCell align="right">Price</TableCell>
                    <TableCell align="center">Quantity</TableCell>
                    <TableCell align="right">Subtotal</TableCell>
                    <TableCell align="center">Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {items.map((item) => (
                    <TableRow key={item.productId}>
                      <TableCell>
                        <Box>
                          <Typography sx={{ fontWeight: 600 }}>
                            {item.product?.name}
                          </Typography>
                          <Typography variant="caption" sx={{ color: colors.gray600 }}>
                            Gold: {item.product?.goldWeight}g
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell align="right">
                        ₹{(item.product?.currentPrice || 0).toLocaleString()}
                      </TableCell>
                      <TableCell align="center">
                        <TextField
                          type="number"
                          inputProps={{
                            min: 1,
                            max: item.product?.quantity || 1,
                          }}
                          value={item.quantity}
                          onChange={(e) =>
                            updateQuantity(
                              item.productId,
                              parseInt(e.target.value) || 1
                            )
                          }
                          size="small"
                          sx={{ width: '70px' }}
                        />
                      </TableCell>
                      <TableCell align="right">
                        ₹
                        {(
                          (item.product?.currentPrice || 0) * item.quantity
                        ).toLocaleString()}
                      </TableCell>
                      <TableCell align="center">
                        <Button
                          size="small"
                          color="error"
                          onClick={() => removeFromCart(item.productId)}
                        >
                          <DeleteIcon fontSize="small" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            <Box sx={{ p: 2, borderTop: `1px solid ${colors.gray200}` }}>
              <Button
                variant="outlined"
                onClick={() => navigate('/products')}
              >
                Continue Shopping
              </Button>
            </Box>
          </Card>
        </Grid>

        {/* Order Summary */}
        <Grid item xs={12} md={4}>
          <Card sx={{ p: 3, position: 'sticky', top: 100 }}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
              Order Summary
            </Typography>

            <Box sx={{ mb: 2, pb: 2, borderBottom: `1px solid ${colors.gray200}` }}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  mb: 1,
                }}
              >
                <Typography>Items ({totalItems})</Typography>
                <Typography>₹{totalPrice.toLocaleString()}</Typography>
              </Box>

              {appliedPromo && (
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    color: colors.success,
                  }}
                >
                  <Typography variant="body2">
                    Discount ({appliedPromo.code})
                  </Typography>
                  <Typography variant="body2">
                    -₹{discountAmount.toLocaleString()}
                  </Typography>
                </Box>
              )}
            </Box>

            <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="h6" sx={{ fontWeight: 700 }}>
                Total
              </Typography>
              <Typography
                variant="h6"
                sx={{ fontWeight: 700, color: colors.primary }}
              >
                ₹{finalTotal.toLocaleString()}
              </Typography>
            </Box>

            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

            <Box sx={{ mb: 2 }}>
              {appliedPromo ? (
                <Paper sx={{ p: 1.5, backgroundColor: colors.gray100, mb: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      ✓ {appliedPromo.code}
                    </Typography>
                    <Button
                      size="small"
                      onClick={() => setAppliedPromo(null)}
                    >
                      Remove
                    </Button>
                  </Box>
                </Paper>
              ) : (
                <Button
                  fullWidth
                  variant="outlined"
                  onClick={() => setOpenPromo(true)}
                  sx={{ mb: 2 }}
                >
                  Apply Promo Code
                </Button>
              )}
            </Box>

            <Button
              fullWidth
              variant="contained"
              size="large"
              sx={{ fontWeight: 700 }}
            >
              Proceed to Checkout
            </Button>
          </Card>
        </Grid>
      </Grid>

      {/* Promo Code Dialog */}
      <Dialog open={openPromo} onClose={() => setOpenPromo(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Apply Promo Code</DialogTitle>
        <DialogContent sx={{ pt: 2 }}>
          <TextField
            fullWidth
            label="Promo Code"
            value={promoCode}
            onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
            placeholder="Enter promo code"
          />
          <Alert severity="info" sx={{ mt: 2 }}>
            Available codes: {promoCodes.filter(p => p.isActive).map(p => p.code).join(', ')}
          </Alert>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenPromo(false)}>Cancel</Button>
          <Button onClick={handleApplyPromo} variant="contained">
            Apply
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default CartPage;
