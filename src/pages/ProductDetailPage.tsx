import React, { useEffect, useMemo, useState } from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  Button,
  Paper,
  Rating,
  Chip,
  Stack,
  Divider,
  TextField,
} from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useNavigate, useParams } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/ProductCard';
import { colors } from '../theme/theme';

const ProductDetailPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const { products, goldPricePerGram } = useProducts();
  const { addToCart } = useCart();
  const product = products.find((item) => item.id === productId);

  const [selectedImage, setSelectedImage] = useState<string>(product?.images[0] ?? '');
  const [quantity, setQuantity] = useState<number>(1);

  useEffect(() => {
    if (product) {
      setSelectedImage(product.images[0] ?? '');
      setQuantity(1);
    }
  }, [product]);

  const handleAddToCart = () => {
    if (!product) return;
    addToCart(product, quantity);
  };

  const handleBuyNow = () => {
    if (!product) return;
    addToCart(product, quantity);
    navigate('/cart');
  };

  const similarProducts = useMemo(
    () => products.filter((item) => item.sectionId === product?.sectionId && item.id !== product?.id).slice(0, 4),
    [products, product],
  );

  if (!product) {
    return (
      <Box sx={{ minHeight: 'calc(100vh - 200px)', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: '#fbf8f3' }}>
        <Container maxWidth="sm">
          <Paper sx={{ p: 4, borderRadius: 3, textAlign: 'center', boxShadow: '0 20px 50px rgba(0,0,0,0.08)' }}>
            <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
              Product not found
            </Typography>
            <Typography variant="body1" sx={{ color: colors.gray600, mb: 3 }}>
              The product you are looking for is unavailable or may have been removed.
            </Typography>
            <Button variant="contained" onClick={() => navigate('/products')}>
              Back to Collection
            </Button>
          </Paper>
        </Container>
      </Box>
    );
  }

  const goldCost = product.goldWeight * goldPricePerGram;
  const makingChargeAmount = product.makingCharge.type === 'percentage'
    ? (goldCost * product.makingCharge.value) / 100
    : product.makingCharge.value;
  const basePriceAmount = product.basePrice || 0;
  const totalPrice = goldCost + makingChargeAmount + basePriceAmount;

  return (
    <Box sx={{ minHeight: 'calc(100vh - 220px)', py: 6, backgroundColor: '#fbf8f3' }}>
      <Container maxWidth="lg">
        <Button
          variant="text"
          startIcon={<ArrowBackIosNewIcon />}
          onClick={() => navigate(-1)}
          sx={{ mb: 4, color: colors.gray900, textTransform: 'none' }}
        >
          Back to collection
        </Button>

        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Paper sx={{ borderRadius: 4, overflow: 'hidden', boxShadow: '0 25px 60px rgba(0,0,0,0.1)' }}>
              <Box
                sx={{
                  position: 'relative',
                  overflow: 'hidden',
                  height: { xs: 420, sm: 520 },
                  '& img': {
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.35s ease',
                  },
                  '&:hover img': {
                    transform: 'scale(1.08)',
                  },
                }}
              >
                <Box component="img" src={selectedImage} alt={product.name} />
              </Box>
              <Stack direction="row" spacing={2} sx={{ p: 2, overflowX: 'auto' }}>
                {product.images.map((image) => (
                  <Box
                    key={image}
                    component="button"
                    onClick={() => setSelectedImage(image)}
                    sx={{
                      border: selectedImage === image ? `2px solid ${colors.primary}` : '1px solid rgba(0,0,0,0.12)',
                      borderRadius: 2,
                      overflow: 'hidden',
                      width: 100,
                      height: 100,
                      p: 0,
                      cursor: 'pointer',
                      background: '#fff',
                      flex: '0 0 auto',
                      transition: 'border-color 0.25s ease',
                    }}
                  >
                    <Box
                      component="img"
                      src={image}
                      alt={product.name}
                      sx={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                    />
                  </Box>
                ))}
              </Stack>
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 4, borderRadius: 4, boxShadow: '0 20px 50px rgba(0,0,0,0.06)' }}>
              <Typography variant="h4" sx={{ fontWeight: 800, mb: 2, letterSpacing: '0.02em' }}>
                {product.name}
              </Typography>

              <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 3, flexWrap: 'wrap' }}>
                <Typography variant="h4" sx={{ fontWeight: 800, color: colors.primary }}>
                  ₹{product.currentPrice.toLocaleString('en-IN')}
                </Typography>
                {product.rating && (
                  <Stack direction="row" spacing={0.5} alignItems="center">
                    <Rating value={product.rating} precision={0.1} readOnly size="small" sx={{ color: colors.primary }} />
                    <Typography variant="body2" sx={{ color: colors.gray600 }}>
                      {product.rating.toFixed(1)}
                    </Typography>
                  </Stack>
                )}
                {product.reviews && (
                  <Typography variant="body2" sx={{ color: colors.gray600 }}>
                    ({product.reviews} reviews)
                  </Typography>
                )}
              </Stack>

              <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ mb: 3 }}>
                <Chip label={`${product.goldWeight}g Gold`} size="small" sx={{ borderRadius: 2, bgcolor: '#fff9e8', color: colors.gray900, fontWeight: 700, border: `1px solid rgba(212, 175, 55, 0.25)` }} />
                {product.purity && <Chip label={product.purity} size="small" sx={{ borderRadius: 2, bgcolor: '#f5f3ee', color: colors.gray900 }} />}
                {product.material && <Chip label={product.material} size="small" sx={{ borderRadius: 2, bgcolor: '#f5f3ee', color: colors.gray900 }} />}
                <Chip label={product.quantity > 0 ? 'In Stock' : 'Sold Out'} size="small" color={product.quantity > 0 ? 'success' : 'error'} sx={{ borderRadius: 2 }} />
              </Stack>

              <Typography variant="body1" sx={{ color: colors.gray700, lineHeight: 1.8, mb: 4 }}>
                {product.description}
              </Typography>

              <Grid container spacing={3} sx={{ mb: 4 }}>
                <Grid item xs={12} sm={6}>
                  <Paper sx={{ p: 3, borderRadius: 3, bgcolor: '#fff', border: `1px solid rgba(212, 175, 55, 0.16)`, height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <Typography variant="subtitle2" sx={{ color: colors.gray600, mb: 1, fontWeight: 700 }}>
                      Price breakdown
                    </Typography>
                    <Stack spacing={1.25}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="body2" sx={{ color: colors.gray600 }}>Gold value</Typography>
                        <Typography variant="body2" sx={{ fontWeight: 700 }}>₹{goldCost.toLocaleString('en-IN')}</Typography>
                      </Box>
                      <Typography variant="caption" sx={{ color: colors.gray500 }}>
                        {product.goldWeight}g × ₹{goldPricePerGram.toLocaleString('en-IN')}
                      </Typography>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="body2" sx={{ color: colors.gray600 }}>Making charges</Typography>
                        <Typography variant="body2" sx={{ fontWeight: 700 }}>₹{makingChargeAmount.toLocaleString('en-IN')}</Typography>
                      </Box>
                      <Typography variant="caption" sx={{ color: colors.gray500 }}>
                        {product.makingCharge.type === 'percentage'
                          ? `${product.makingCharge.value}% of gold value`
                          : `Fixed charge`}
                      </Typography>
                      {basePriceAmount > 0 && (
                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                          <Typography variant="body2" sx={{ color: colors.gray600 }}>Additional base price</Typography>
                          <Typography variant="body2" sx={{ fontWeight: 700 }}>₹{basePriceAmount.toLocaleString('en-IN')}</Typography>
                        </Box>
                      )}
                      <Divider sx={{ my: 1.5 }} />
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>Total price</Typography>
                        <Typography variant="subtitle1" sx={{ fontWeight: 800, color: colors.primary }}>₹{totalPrice.toLocaleString('en-IN')}</Typography>
                      </Box>
                    </Stack>
                  </Paper>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Paper sx={{ p: 3, borderRadius: 3, bgcolor: '#fff', border: `1px solid rgba(212, 175, 55, 0.16)`, height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <Typography variant="subtitle2" sx={{ color: colors.gray600, mb: 1, fontWeight: 700 }}>
                      Purchase details
                    </Typography>
                    <Stack spacing={2} sx={{ flexGrow: 1 }}>
                      <TextField
                        label="Quantity"
                        type="number"
                        size="small"
                        value={quantity}
                        onChange={(e) => setQuantity(Math.max(1, Math.min(product.quantity, parseInt(e.target.value, 10) || 1)))}
                        inputProps={{step:1, min: 1, max: product.quantity }}
                        sx={{
                          width: '100%',
                          '& input[type=number]::-webkit-outer-spin-button': {
                            opacity: '1 !important',
                            margin: 0,
                          },
                          '& input[type=number]::-webkit-inner-spin-button': {
                            opacity: '1 !important',
                            margin: 0,
                          },
                        }}
                      />
                      <Button
                        variant="contained"
                        size="large"
                        startIcon={<ShoppingCartIcon />}
                        onClick={handleAddToCart}
                        disabled={product.quantity === 0}
                        sx={{ textTransform: 'none', borderRadius: 3, py: 1.5 }}
                      >
                        Add to Cart
                      </Button>
                      <Button
                        variant="contained"
                        size="large"
                        onClick={handleBuyNow}
                        disabled={product.quantity === 0}
                        sx={{ textTransform: 'none', borderRadius: 3, py: 1.5, bgcolor: colors.primary, '&:hover': { bgcolor: '#c99918' } }}
                      >
                        Buy Now
                      </Button>
                    </Stack>
                  </Paper>
                </Grid>
              </Grid>

              {product.highlights && product.highlights.length > 0 && (
                <Paper sx={{ p: 3, borderRadius: 3, bgcolor: '#fff', border: `1px solid rgba(212, 175, 55, 0.16)`, textAlign: 'left' }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2, textAlign: 'left' }}>
                    Why customers love this
                  </Typography>
                  <Box component="ul" sx={{ pl: 3, mb: 0, color: colors.gray700, textAlign: 'left' }}>
                    {product.highlights.map((highlight) => (
                      <Typography component="li" key={highlight} sx={{ mb: 1, fontSize: '0.95rem', textAlign: 'left' }}>
                        {highlight}
                      </Typography>
                    ))}
                  </Box>
                </Paper>
              )}

              <Box sx={{ mt: 4 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2 }}>
                  Specifications
                </Typography>
                <Grid container spacing={2}>
                  {product.specifications && Object.entries(product.specifications).map(([label, value]) => (
                    <Grid item xs={12} sm={6} key={label}>
                      <Typography variant="caption" sx={{ color: colors.gray600, fontWeight: 700 }}>
                        {label}
                      </Typography>
                      <Typography variant="body2" sx={{ color: colors.gray700, mt: 0.5 }}>
                        {value}
                      </Typography>
                    </Grid>
                  ))}
                </Grid>
              </Box>

              {product.occasion && (
                <Box sx={{ mt: 4 }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1 }}>
                    Perfect for
                  </Typography>
                  <Typography variant="body2" sx={{ color: colors.gray700 }}>
                    {product.occasion}
                  </Typography>
                </Box>
              )}
            </Paper>
          </Grid>
        </Grid>

        <Box sx={{ mt: 8 }}>
          <Typography variant="h5" sx={{ fontWeight: 700, mb: 3 }}>
            Similar items
          </Typography>
          <Grid container spacing={3}>
            {similarProducts.length > 0 ? (
              similarProducts.map((item) => (
                <Grid item xs={12} sm={6} md={3} key={item.id}>
                  <ProductCard
                    product={item}
                    onProductClick={(prod) => navigate(`/product/${prod.id}`)}
                    viewMode="tiles"
                  />
                </Grid>
              ))
            ) : (
              <Grid item xs={12}>
                <Paper sx={{ p: 4, borderRadius: 3, textAlign: 'center', bgcolor: '#fff' }}>
                  <Typography variant="body1" sx={{ color: colors.gray600 }}>
                    We do not have similar items for this product at the moment.
                  </Typography>
                </Paper>
              </Grid>
            )}
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default ProductDetailPage;
