import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Link,
  IconButton,
  Divider,
} from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { useNavigate } from 'react-router-dom';
import { colors } from '../theme/theme';

const Footer: React.FC = () => {
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();

  return (
    <Box sx={{ backgroundColor: colors.gray50, borderTop: `1px solid ${colors.gray200}`, mt: 8 }}>
      <Container maxWidth="lg">
        {/* Top Section with Gold Accent */}
        <Box
          sx={{
            height: '3px',
            background: `linear-gradient(90deg, ${colors.primary} 0%, rgba(212, 175, 55, 0.3) 100%)`,
            mb: 4,
          }}
        />

        {/* Main Footer Content */}
        <Box sx={{ py: 6 }}>
          <Grid container spacing={4}>
            {/* Column 1: Brand */}
            <Grid item xs={12} sm={6} md={3}>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  color: colors.primary,
                  mb: 2,
                  fontSize: '1.1rem',
                }}
              >
                Jewels
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: colors.gray600,
                  mb: 2,
                  lineHeight: 1.6,
                  fontSize: '0.9rem',
                }}
              >
                Discover exquisite jewelry crafted to perfection. Timeless elegance for every occasion.
              </Typography>
              <Box sx={{ display: 'flex', gap: 0.5 }}>
                <IconButton
                  size="small"
                  sx={{
                    color: colors.primary,
                    '&:hover': { backgroundColor: `rgba(212, 175, 55, 0.1)` },
                  }}
                >
                  <FacebookIcon fontSize="small" />
                </IconButton>
                <IconButton
                  size="small"
                  sx={{
                    color: colors.primary,
                    '&:hover': { backgroundColor: `rgba(212, 175, 55, 0.1)` },
                  }}
                >
                  <InstagramIcon fontSize="small" />
                </IconButton>
                <IconButton
                  size="small"
                  sx={{
                    color: colors.primary,
                    '&:hover': { backgroundColor: `rgba(212, 175, 55, 0.1)` },
                  }}
                >
                  <TwitterIcon fontSize="small" />
                </IconButton>
                <IconButton
                  size="small"
                  sx={{
                    color: colors.primary,
                    '&:hover': { backgroundColor: `rgba(212, 175, 55, 0.1)` },
                  }}
                >
                  <LinkedInIcon fontSize="small" />
                </IconButton>
              </Box>
            </Grid>

            {/* Column 2: Navigation */}
            <Grid item xs={12} sm={6} md={2}>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  color: colors.gray900,
                  mb: 2,
                  fontSize: '0.95rem',
                }}
              >
                Navigation
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Link
                  onClick={() => navigate('/')}
                  sx={{
                    cursor: 'pointer',
                    color: colors.gray600,
                    fontSize: '0.9rem',
                    textDecoration: 'none',
                    '&:hover': { color: colors.primary },
                    transition: 'color 0.2s ease',
                  }}
                >
                  Home
                </Link>
                <Link
                  onClick={() => navigate('/products')}
                  sx={{
                    cursor: 'pointer',
                    color: colors.gray600,
                    fontSize: '0.9rem',
                    textDecoration: 'none',
                    '&:hover': { color: colors.primary },
                    transition: 'color 0.2s ease',
                  }}
                >
                  Products
                </Link>
                <Link
                  onClick={() => navigate('/cart')}
                  sx={{
                    cursor: 'pointer',
                    color: colors.gray600,
                    fontSize: '0.9rem',
                    textDecoration: 'none',
                    '&:hover': { color: colors.primary },
                    transition: 'color 0.2s ease',
                  }}
                >
                  Cart
                </Link>
                <Link
                  href="#"
                  sx={{
                    color: colors.gray600,
                    fontSize: '0.9rem',
                    textDecoration: 'none',
                    '&:hover': { color: colors.primary },
                    transition: 'color 0.2s ease',
                  }}
                >
                  About
                </Link>
              </Box>
            </Grid>

            {/* Column 3: Support */}
            <Grid item xs={12} sm={6} md={2}>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  color: colors.gray900,
                  mb: 2,
                  fontSize: '0.95rem',
                }}
              >
                Support
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Link
                  href="#"
                  sx={{
                    color: colors.gray600,
                    fontSize: '0.9rem',
                    textDecoration: 'none',
                    '&:hover': { color: colors.primary },
                    transition: 'color 0.2s ease',
                  }}
                >
                  FAQ
                </Link>
                <Link
                  href="#"
                  sx={{
                    color: colors.gray600,
                    fontSize: '0.9rem',
                    textDecoration: 'none',
                    '&:hover': { color: colors.primary },
                    transition: 'color 0.2s ease',
                  }}
                >
                  Shipping Info
                </Link>
                <Link
                  href="#"
                  sx={{
                    color: colors.gray600,
                    fontSize: '0.9rem',
                    textDecoration: 'none',
                    '&:hover': { color: colors.primary },
                    transition: 'color 0.2s ease',
                  }}
                >
                  Returns
                </Link>
                <Link
                  href="#"
                  sx={{
                    color: colors.gray600,
                    fontSize: '0.9rem',
                    textDecoration: 'none',
                    '&:hover': { color: colors.primary },
                    transition: 'color 0.2s ease',
                  }}
                >
                  Contact
                </Link>
              </Box>
            </Grid>

            {/* Column 4: Contact */}
            <Grid item xs={12} sm={6} md={3}>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  color: colors.gray900,
                  mb: 2,
                  fontSize: '0.95rem',
                }}
              >
                Contact
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
                  <PhoneIcon
                    sx={{
                      fontSize: '1rem',
                      color: colors.primary,
                      mt: 0.3,
                      flexShrink: 0,
                    }}
                  />
                  <Box>
                    <Typography variant="body2" sx={{ fontSize: '0.9rem', fontWeight: 500 }}>
                      +91 (800) 123-4567
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{ color: colors.gray600, fontSize: '0.8rem' }}
                    >
                      Mon - Fri, 9am - 6pm IST
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
                  <EmailIcon
                    sx={{
                      fontSize: '1rem',
                      color: colors.primary,
                      mt: 0.3,
                      flexShrink: 0,
                    }}
                  />
                  <Link
                    href="mailto:support@jewels.com"
                    sx={{
                      color: colors.gray600,
                      fontSize: '0.9rem',
                      textDecoration: 'none',
                      '&:hover': { color: colors.primary },
                      transition: 'color 0.2s ease',
                    }}
                  >
                    support@jewels.com
                  </Link>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
                  <LocationOnIcon
                    sx={{
                      fontSize: '1rem',
                      color: colors.primary,
                      mt: 0.3,
                      flexShrink: 0,
                    }}
                  />
                  <Typography variant="body2" sx={{ fontSize: '0.9rem', lineHeight: 1.4 }}>
                    123 Jewelry Street,<br />
                    Mumbai, India 400001
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>

        {/* Divider */}
        <Divider sx={{ borderColor: colors.gray300, my: 3 }} />

        {/* Bottom Section */}
        <Box
          sx={{
            pb: 3,
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <Typography
            variant="caption"
            sx={{
              color: colors.gray600,
              fontSize: '0.85rem',
              textAlign: { xs: 'center', sm: 'left' },
            }}
          >
            © {currentYear} Jewels. All rights reserved. | Crafted with elegance.
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link
              href="#"
              sx={{
                color: colors.gray600,
                fontSize: '0.85rem',
                textDecoration: 'none',
                '&:hover': { color: colors.primary },
                transition: 'color 0.2s ease',
              }}
            >
              Privacy Policy
            </Link>
            <Typography variant="caption" sx={{ color: colors.gray400 }}>
              •
            </Typography>
            <Link
              href="#"
              sx={{
                color: colors.gray600,
                fontSize: '0.85rem',
                textDecoration: 'none',
                '&:hover': { color: colors.primary },
                transition: 'color 0.2s ease',
              }}
            >
              Terms of Service
            </Link>
            <Typography variant="caption" sx={{ color: colors.gray400 }}>
              •
            </Typography>
            <Link
              href="#"
              sx={{
                color: colors.gray600,
                fontSize: '0.85rem',
                textDecoration: 'none',
                '&:hover': { color: colors.primary },
                transition: 'color 0.2s ease',
              }}
            >
              Sitemap
            </Link>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
