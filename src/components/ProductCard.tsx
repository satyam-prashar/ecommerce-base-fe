import React from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
  Box,
  Rating,
  Chip,
  TextField,
  Grid,
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import StarIcon from '@mui/icons-material/Star';
import type { Product } from '../types';
import { colors } from '../theme/theme';
import { useCart } from '../context/CartContext';
import { useState } from 'react';

interface ProductCardProps {
  product: Product;
  onProductClick?: (product: Product) => void;
  viewMode?: 'cards' | 'tiles';
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onProductClick,
  viewMode = 'cards',
}) => {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setQuantity(1);
  };

  if (viewMode === 'tiles') {
    return (
      <Card
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          borderRadius: 1,
          overflow: 'hidden',
          border: `1px solid rgba(212, 175, 55, 0.1)`,
        }}
      >
        <CardMedia
          component="img"
          height="200"
          image={product.images[0]}
          alt={product.name}
          sx={{ cursor: 'pointer', objectFit: 'cover' }}
          onClick={() => onProductClick?.(product)}
        />
        <CardContent sx={{ flexGrow: 1, p: 1.5 }}>
          <Typography
            variant="subtitle2"
            sx={{
              fontWeight: 600,
              mb: 0.75,
              cursor: 'pointer',
              fontSize: '0.9rem',
              color: colors.gray900,
              '&:hover': { color: colors.primary },
              transition: 'color 0.2s ease',
            }}
            onClick={() => onProductClick?.(product)}
          >
            {product.name}
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.75 }}>
            <Typography variant="h6" sx={{ color: colors.primary, fontWeight: 700, fontSize: '0.95rem' }}>
              ₹{product.currentPrice.toLocaleString('en-IN')}
            </Typography>
            {product.rating && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.25 }}>
                <Rating value={product.rating} readOnly size="small" />
              </Box>
            )}
          </Box>
          <Typography variant="caption" sx={{ color: colors.gray600, fontSize: '0.8rem' }}>
            {product.goldWeight}g Gold
          </Typography>
        </CardContent>
        <CardActions sx={{ pt: 0, p: 1.5, gap: 0.5 }}>
          <TextField
            type="number"
            inputProps={{ min: 1, max: product.quantity }}
            value={quantity}
            onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
            size="small"
            sx={{ width: '50px' }}
          />
          <Button
            size="small"
            variant="contained"
            sx={{ flex: 1, fontSize: '0.8rem' }}
            onClick={handleAddToCart}
            disabled={product.quantity === 0}
          >
            <ShoppingCartIcon sx={{ mr: 0.3, fontSize: '0.9rem' }} />
            Add
          </Button>
        </CardActions>
      </Card>
    );
  }

  // Cards view (default)
  return (
    <Card
      sx={{
        alignSelf: 'flex-start',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 2,
        overflow: 'hidden',
        border: `1px solid rgba(212, 175, 55, 0.16)`,
        bgcolor: '#fff',
        boxShadow: '0 16px 40px rgba(0, 0, 0, 0.08)',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease, height 0.35s ease',
        height: 360,
        '&:hover': {
          transform: 'translateY(-5px)',
          boxShadow: '0 24px 54px rgba(0, 0, 0, 0.14)',
          height: 'auto',
        },
        '&:hover .overlayInfo': {
          opacity: 0,
          transform: 'translateY(-16px)',
        },
        '&:hover .hoverDetails': {
          opacity: 1,
          maxHeight: '1000px',
          transform: 'translateY(0)',
        },
      }}
    >
      <Box sx={{ position: 'relative', width: '100%', overflow: 'hidden' }}>
        <CardMedia
          component="img"
          height="360"
          image={product.images[0]}
          alt={product.name}
          onClick={() => onProductClick?.(product)}
          sx={{
            width: '100%',
            objectFit: 'cover',
            cursor: 'pointer',
            display: 'block',
          }}
        />

        <Box
          className="overlayInfo"
          sx={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            p: 3,
            background: 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.75) 100%)',
            color: '#fff',
            opacity: 1,
            transform: 'translateY(0)',
            transition: 'opacity 0.35s ease, transform 0.35s ease',
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              mb: 0.5,
              color: '#fff',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {product.name}
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 1 }}>
            <Typography variant="h6" sx={{ fontWeight: 800, color: '#F6D46D', fontSize: '1rem' }}>
              ₹{product.currentPrice.toLocaleString('en-IN')}
            </Typography>
            {product.rating && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <StarIcon sx={{ color: '#F6D46D', fontSize: '1rem' }} />
                <Typography variant="subtitle2" sx={{ color: '#fff', fontWeight: 600 }}>
                  {product.rating.toFixed(1)}
                </Typography>
                {product.reviews && (
                  <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.8rem' }}>
                    ({product.reviews})
                  </Typography>
                )}
              </Box>
            )}
          </Box>
        </Box>
      </Box>

      <CardContent sx={{ p: 0, overflow: 'hidden' }}>
        <Box
          className="hoverDetails"
          sx={{
            opacity: 0,
            maxHeight: 0,
            overflow: 'hidden',
            transform: 'translateY(16px)',
            transition: 'opacity 0.35s ease, transform 0.35s ease, max-height 0.35s ease',
          }}
        >
          <Box sx={{ p: 3, pt: 2, bgcolor: '#fff' }}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                mb: 1,
                color: colors.gray900,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
              onClick={() => onProductClick?.(product)}
            >
              {product.name}
            </Typography>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 1, mb: 1 }}>
              <Typography variant="h6" sx={{ color: colors.primary, fontWeight: 800, fontSize: '1rem' }}>
                ₹{product.currentPrice.toLocaleString('en-IN')}
              </Typography>
              {product.rating && (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <StarIcon sx={{ color: colors.primary, fontSize: '1rem' }} />
                  <Typography variant="subtitle2" sx={{ color: colors.gray700, fontWeight: 600 }}>
                    {product.rating.toFixed(1)}
                  </Typography>
                  {product.reviews && (
                    <Typography variant="caption" sx={{ color: colors.gray600, fontSize: '0.8rem' }}>
                      ({product.reviews})
                    </Typography>
                  )}
                </Box>
              )}
            </Box>

            {product.description && (
              <Typography variant="body2" sx={{ color: colors.gray600, mb: 2, lineHeight: 1.6, fontSize: '0.9rem' }}>
                {product.description}
              </Typography>
            )}

            <Grid container spacing={1} sx={{ mb: 1.5 }}>
              <Grid item xs={6}>
                <Chip
                  label={`${product.goldWeight}g Gold`}
                  size="small"
                  variant="outlined"
                  sx={{
                    width: '100%',
                    fontSize: '0.75rem',
                    height: '32px',
                    borderColor: 'rgba(212, 175, 55, 0.3)',
                    color: colors.gray900,
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <Chip
                  label={product.quantity > 0 ? 'In Stock' : 'Sold Out'}
                  size="small"
                  sx={{
                    width: '100%',
                    fontSize: '0.75rem',
                    height: '32px',
                    bgcolor: product.quantity > 0 ? 'rgba(40, 167, 69, 0.12)' : 'rgba(220, 53, 69, 0.12)',
                    color: product.quantity > 0 ? colors.success : colors.error,
                  }}
                />
              </Grid>
            </Grid>

            {product.reviews && (
              <Typography variant="caption" sx={{ color: colors.gray600, fontSize: '0.78rem', mb: 2, display: 'block' }}>
                ★ {product.reviews} customer reviews
              </Typography>
            )}

            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', flexWrap: 'wrap' }}>
              <TextField
                type="number"
                inputProps={{ min: 1, max: product.quantity }}
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                size="small"
                sx={{ width: '70px' }}
              />
              <Button
                size="small"
                variant="contained"
                sx={{ flex: 1, minWidth: '120px', fontSize: '0.9rem' }}
                onClick={handleAddToCart}
                disabled={product.quantity === 0}
              >
                <ShoppingCartIcon sx={{ mr: 0.5, fontSize: '1rem' }} />
                Add to Cart
              </Button>
            </Box>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
