import React from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardMedia,
} from '@mui/material';
import DiamondIcon from '@mui/icons-material/Diamond';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import StarIcon from '@mui/icons-material/Star';
import { useNavigate } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';
import { colors } from '../theme/theme';
import ProductCard from '../components/ProductCard';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { sections, products } = useProducts();

  // Get featured products (first 8)
  const featuredProducts = products.slice(0, 8);

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          background: `linear-gradient(135deg, ${colors.primaryLight} 0%, ${colors.primary} 100%)`,
          color: colors.white,
          py: { xs: 8, md: 12 },
          textAlign: 'center',
        }}
      >
        <Container maxWidth="lg">
          <Typography
            variant="h2"
            sx={{
              fontWeight: 700,
              mb: 2,
              fontSize: { xs: '2rem', md: '3.5rem' },
            }}
          >
            Timeless Elegance
          </Typography>
          <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>
            Discover exquisite jewelry crafted to perfection
          </Typography>
          <Button
            variant="contained"
            size="large"
            sx={{
              backgroundColor: colors.white,
              color: colors.primary,
              fontWeight: 700,
              px: 4,
              py: 1.5,
              '&:hover': {
                backgroundColor: colors.gray100,
              },
            }}
            onClick={() => navigate('/products')}
          >
            Shop Now
          </Button>
        </Container>
      </Box>

      {/* Categories Section */}
      <Box sx={{ py: 8, backgroundColor: colors.gray50 }}>
        <Container maxWidth="lg">
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              mb: 4,
              textAlign: 'center',
            }}
          >
            Our Collections
          </Typography>

          <Grid container spacing={3}>
            {sections.slice(0, 4).map((section) => (
              <Grid item xs={12} sm={6} md={3} key={section.id}>
                <Card
                  sx={{
                    height: '100%',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: `0 16px 32px rgba(${parseInt(colors.primary.slice(1, 3), 16)}, ${parseInt(colors.primary.slice(3, 5), 16)}, ${parseInt(colors.primary.slice(5, 7), 16)}, 0.2)`,
                    },
                  }}
                  onClick={() =>
                    navigate(`/products?section=${section.id}`)
                  }
                >
                  {section.image && (
                    <CardMedia
                      component="img"
                      height="250"
                      image={section.image}
                      alt={section.name}
                      sx={{ objectFit: 'cover' }}
                    />
                  )}
                  <CardContent sx={{ textAlign: 'center' }}>
                    <Typography variant="h6" sx={{ fontWeight: 700 }}>
                      {section.name}
                    </Typography>
                    {section.description && (
                      <Typography
                        variant="body2"
                        sx={{ color: colors.gray600, mt: 1 }}
                      >
                        {section.description}
                      </Typography>
                    )}
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Featured Products */}
      <Box sx={{ py: 8 }}>
        <Container maxWidth="lg">
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              mb: 4,
              textAlign: 'center',
            }}
          >
            Featured Products
          </Typography>

          <Grid container spacing={3} sx={{ mb: 4 }}>
            {featuredProducts.map((product) => (
              <Grid item xs={12} sm={6} md={3} key={product.id}>
                <ProductCard
                  product={product}
                  onProductClick={(prod) =>
                    navigate(`/product/${prod.id}`)
                  }
                />
              </Grid>
            ))}
          </Grid>

          <Box sx={{ textAlign: 'center' }}>
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate('/products')}
            >
              View All Products
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Features Section */}
      <Box sx={{ py: 8, backgroundColor: colors.gray50 }}>
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            <Grid item xs={12} sm={6} md={3} sx={{ textAlign: 'center' }}>
              <DiamondIcon sx={{ fontSize: '2.5rem', color: colors.primary, mb: 1 }} />
              <Typography variant="h5" sx={{ fontWeight: 600, mb: 1, fontSize: '1.1rem' }}>
                Premium Quality
              </Typography>
              <Typography variant="body2" sx={{ color: colors.gray600, fontSize: '0.9rem' }}>
                Certified authentic gold jewelry
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={3} sx={{ textAlign: 'center' }}>
              <CardGiftcardIcon sx={{ fontSize: '2.5rem', color: colors.primary, mb: 1 }} />
              <Typography variant="h5" sx={{ fontWeight: 600, mb: 1, fontSize: '1.1rem' }}>
                Best Prices
              </Typography>
              <Typography variant="body2" sx={{ color: colors.gray600, fontSize: '0.9rem' }}>
                Real-time gold price updates
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={3} sx={{ textAlign: 'center' }}>
              <LocalShippingIcon sx={{ fontSize: '2.5rem', color: colors.primary, mb: 1 }} />
              <Typography variant="h5" sx={{ fontWeight: 600, mb: 1, fontSize: '1.1rem' }}>
                Fast Delivery
              </Typography>
              <Typography variant="body2" sx={{ color: colors.gray600, fontSize: '0.9rem' }}>
                Quick and secure shipping
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={3} sx={{ textAlign: 'center' }}>
              <StarIcon sx={{ fontSize: '2.5rem', color: colors.primary, mb: 1 }} />
              <Typography variant="h5" sx={{ fontWeight: 600, mb: 1, fontSize: '1.1rem' }}>
                Unique Designs
              </Typography>
              <Typography variant="body2" sx={{ color: colors.gray600, fontSize: '0.9rem' }}>
                Exclusive collection for you
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default HomePage;
