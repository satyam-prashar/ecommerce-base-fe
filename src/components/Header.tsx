import React, { useEffect, useMemo, useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Menu,
  MenuItem,
  Box,
  Container,
  Badge,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  InputBase,
  Paper,
  Divider,
  ClickAwayListener,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PersonIcon from '@mui/icons-material/Person';
import DiamondIcon from '@mui/icons-material/Diamond';
import SearchIcon from '@mui/icons-material/Search';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ClearIcon from '@mui/icons-material/Clear';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useProducts } from '../context/ProductContext';
import { useNavigate } from 'react-router-dom';
import { colors } from '../theme/theme';

const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const { totalItems } = useCart();
  const { sections } = useProducts();
  const navigate = useNavigate();

  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const [anchorElCategories, setAnchorElCategories] = useState<null | HTMLElement>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchFocused, setSearchFocused] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem('jewels_recent_searches');
    if (saved) {
      try {
        setRecentSearches(JSON.parse(saved));
      } catch {
        setRecentSearches([]);
      }
    }
  }, []);

  const saveRecentSearches = (searches: string[]) => {
    setRecentSearches(searches);
    localStorage.setItem('jewels_recent_searches', JSON.stringify(searches));
  };

  const addRecentSearch = (term: string) => {
    const normalized = term.trim();
    if (!normalized) return;
    const next = [normalized, ...recentSearches.filter((item) => item.toLowerCase() !== normalized.toLowerCase())].slice(0, 5);
    saveRecentSearches(next);
  };

  const handleSearchSubmit = (term: string) => {
    const normalized = term.trim();
    if (!normalized) return;
    addRecentSearch(normalized);
    navigate(`/products?search=${encodeURIComponent(normalized)}`);
    setSearchQuery('');
    setSearchFocused(false);
    setSearchOpen(false);
  };

  const toggleSearch = () => {
    const newState = !searchOpen;
    console.log('Toggling search from', searchOpen, 'to', newState);
    setSearchOpen(newState);
    if (newState) {
      // Focus the search input when opening
      setTimeout(() => {
        const searchInput = document.querySelector('input[placeholder="Search jewellery..."]') as HTMLInputElement;
        if (searchInput) {
          searchInput.focus();
        }
      }, 100);
    } else {
      // Clear search when closing
      setSearchQuery('');
      setSearchFocused(false);
    }
  };

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      handleSearchSubmit(searchQuery);
    }
  };

  const handleSuggestionClick = (value: string) => {
    handleSearchSubmit(value);
  };

  const handleRemoveRecentSearch = (value: string) => {
    const next = recentSearches.filter((item) => item.toLowerCase() !== value.toLowerCase());
    saveRecentSearches(next);
  };

  const searchOptions = useMemo(
    () => [
      ...new Set([
        ...sections.map((section) => section.name),
        'Solitaire ring',
        'Gold necklace',
        'Diamond earrings',
        'Mangalsutra',
        'Wedding band',
        'Stud earrings',
        'Daily wear pendant',
      ]),
    ],
    [sections],
  );

  const getSimilarity = (a: string, b: string): number => {
    const aLower = a.toLowerCase();
    const bLower = b.toLowerCase();

    // Exact match
    if (aLower === bLower) return 1;

    // Simple substring match
    if (aLower.includes(bLower) || bLower.includes(aLower)) return 0.9;

    // Character-level similarity for short strings
    if (Math.max(a.length, b.length) <= 6) {
      const setA = new Set(aLower.split(''));
      const setB = new Set(bLower.split(''));
      const intersection = new Set([...setA].filter(x => setB.has(x)));
      const union = new Set([...setA, ...setB]);
      return intersection.size / union.size;
    }

    // N-gram similarity for longer strings
    const n = 2; // bigrams
    const getNgrams = (str: string) => {
      const ngrams = [];
      for (let i = 0; i <= str.length - n; i++) {
        ngrams.push(str.slice(i, i + n));
      }
      return ngrams;
    };

    const ngramsA = getNgrams(aLower);
    const ngramsB = getNgrams(bLower);

    const setA = new Set(ngramsA);
    const setB = new Set(ngramsB);
    const intersection = new Set([...setA].filter(x => setB.has(x)));

    return (2 * intersection.size) / (ngramsA.length + ngramsB.length);
  };

  const filteredRecommendations = searchQuery.trim()
    ? searchOptions
        .filter((option) => {
          const similarity = getSimilarity(searchQuery.trim(), option);
          return similarity > 0.3 && option.toLowerCase() !== searchQuery.trim().toLowerCase();
        })
        .sort((a, b) => {
          const simA = getSimilarity(searchQuery.trim(), a);
          const simB = getSimilarity(searchQuery.trim(), b);
          return simB - simA; // Sort by similarity descending
        })
        .slice(0, 5)
    : searchOptions.slice(0, 5);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleOpenCategories = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElCategories(event.currentTarget);
  };

  const handleCloseCategories = () => {
    setAnchorElCategories(null);
  };

  const handleLogout = () => {
    logout();
    handleCloseUserMenu();
    navigate('/');
  };

  const handleNavigateToSection = (sectionId: string) => {
    navigate(`/products?section=${sectionId}`);
    setMobileOpen(false);
    handleCloseCategories();
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // Category menu items
  const categoryGroups = {
    'Jewelry Type': [
      { label: 'Rings', section: sections.find(s => s.name.toLowerCase().includes('ring'))?.id || 'rings' },
      { label: 'Earrings', section: sections.find(s => s.name.toLowerCase().includes('earring'))?.id || 'earrings' },
      { label: 'Necklaces', section: sections.find(s => s.name.toLowerCase().includes('necklace'))?.id || 'necklaces' },
      { label: 'Bangles', section: sections.find(s => s.name.toLowerCase().includes('bangle'))?.id || 'bangles' },
      { label: 'Bracelets', section: sections.find(s => s.name.toLowerCase().includes('bracelet'))?.id || 'bracelets' },
      { label: 'Pendants', section: sections.find(s => s.name.toLowerCase().includes('pendant'))?.id || 'pendants' },
    ],
    'Special Collections': [
      { label: 'Engagement Rings', section: sections.find(s => s.name.toLowerCase().includes('engagement'))?.id || 'engagement' },
      { label: 'Mangalsutras', section: sections.find(s => s.name.toLowerCase().includes('mangalsutra'))?.id || 'mangalsutra' },
      { label: 'Men\'s Jewellery', section: sections.find(s => s.name.toLowerCase().includes('men'))?.id || 'mens' },
      { label: 'Kids Jewellery', section: sections.find(s => s.name.toLowerCase().includes('kids'))?.id || 'kids' },
    ],
  };

  const navigationMenu = (
    <Box sx={{ display: 'flex', gap: 0.5, alignItems: 'center' }}>
      <Button
        onClick={handleOpenCategories}
        endIcon={<ExpandMoreIcon sx={{ fontSize: '1rem', color: colors.white }} />}
        sx={{
          color: colors.white,
          textTransform: 'none',
          fontSize: '0.95rem',
          fontWeight: 500,
          '&:hover': {
            color: colors.gray900,
            backgroundColor: 'rgba(255,255,255,0.85)',
          },
        }}
      >
        Categories
      </Button>
      {sections.slice(0, 3).map((section) => (
        <Button
          key={section.id}
          sx={{
            color: colors.white,
            textTransform: 'none',
            fontSize: '0.9rem',
            '&:hover': {
              color: colors.gray900,
              backgroundColor: 'rgba(255,255,255,0.15)',
            },
          }}
          onClick={() => handleNavigateToSection(section.id)}
        >
          {section.name}
        </Button>
      ))}
    </Box>
  );

  const drawerContent = (
    <List sx={{ width: 280 }}>
      <ListItem disablePadding>
        <ListItemButton onClick={() => {
          setSearchOpen(true);
          setTimeout(() => {
            const searchInput = document.querySelector('input[placeholder="Search jewellery..."]') as HTMLInputElement;
            if (searchInput) searchInput.focus();
          }, 100);
        }}>
          <ListItemText primary="Search" sx={{ pl: 1 }} />
        </ListItemButton>
      </ListItem>
      <Divider sx={{ my: 1 }} />
      <ListItem disablePadding>
        <ListItemButton onClick={() => navigate('/')}>
          <ListItemText primary="Home" />
        </ListItemButton>
      </ListItem>
      <Divider sx={{ my: 1 }} />
      <ListItem disablePadding>
        <ListItemButton onClick={() => navigate('/products')}>
          <ListItemText primary="All Products" />
        </ListItemButton>
      </ListItem>
      {sections.map((section) => (
        <ListItem key={section.id} disablePadding sx={{ pl: 2 }}>
          <ListItemButton onClick={() => handleNavigateToSection(section.id)}>
            <ListItemText primary={section.name} sx={{ fontSize: '0.9rem' }} />
          </ListItemButton>
        </ListItem>
      ))}
      <Divider sx={{ my: 1 }} />
      <ListItem disablePadding>
        <ListItemButton onClick={() => navigate('/cart')}>
          <ListItemText primary="Cart" />
        </ListItemButton>
      </ListItem>
    </List>
  );

  return (
    <AppBar
      position="sticky"
      sx={{
        background: `linear-gradient(135deg, ${colors.primaryLight} 0%, ${colors.primary} 100%)`,
        color: colors.white,
        transition: 'all 0.3s ease',
        boxShadow: isScrolled ? '0 12px 28px rgba(0,0,0,0.12)' : 'none',
      }}
    >
      <Container maxWidth="lg">
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', gap: 2, px: { xs: 1, sm: 2 }, py: isScrolled ? 1 : 1.75, transition: 'all 0.3s ease' }}>
          {/* Logo */}
          <Box 
            sx={{ display: 'flex', alignItems: 'center', gap: 1, cursor: 'pointer', flexShrink: 0 }} 
            onClick={() => navigate('/')}
          >
            <DiamondIcon sx={{ color: colors.primary, fontSize: isScrolled ? '1.4rem' : { xs: '1.4rem', sm: '1.8rem' } }} />
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                color: colors.primary,
                fontSize: isScrolled ? '0.95rem' : { xs: '0.9rem', sm: '1.2rem' },
                display: { xs: 'none', sm: 'block' },
              }}
            >
              Jewels
            </Typography>
          </Box>

          {isScrolled && (
            <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 1, flex: 1, justifyContent: 'center' }}>
              {navigationMenu}
            </Box>
          )}

          {/* Right Side Icons and Links */}
          <Box sx={{ display: 'flex', gap: { xs: 0.5, sm: 2 }, alignItems: 'center', flexShrink: 0 }}>
            {/* Search - Desktop */}
            {searchOpen ? (
              <ClickAwayListener onClickAway={() => {
                setSearchFocused(false);
                setSearchOpen(false);
              }}>
                <Box sx={{ position: 'relative' }}>
                  <Paper
                    component="form"
                    sx={{
                      display: { xs: 'none', md: 'flex' },
                      alignItems: 'center',
                      width: isScrolled ? '280px' : '320px',
                      px: 1.5,
                      py: 0.5,
                      backgroundColor: colors.white,
                      border: `1px solid rgba(255,255,255,0.55)`,
                      borderRadius: '8px',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        borderColor: colors.primary,
                      },
                      '&:focus-within': {
                        borderColor: colors.primary,
                        boxShadow: `0 0 0 3px rgba(212, 175, 55, 0.12)`,
                      },
                    }}
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleSearchSubmit(searchQuery);
                    }}
                  >
                    <SearchIcon sx={{ color: colors.gray600, mr: 1, fontSize: '1.2rem' }} />
                    <InputBase
                      sx={{ ml: 0.5, flex: 1, color: colors.gray900, '& ::placeholder': { color: colors.gray500 } }}
                      placeholder="Search jewellery..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyPress={handleSearch}
                      onFocus={() => setSearchFocused(true)}
                      autoFocus
                    />
                    <IconButton
                      size="small"
                      onClick={() => {
                        setSearchOpen(false);
                        setSearchQuery('');
                        setSearchFocused(false);
                      }}
                      sx={{ color: colors.gray600, ml: 1 }}
                    >
                      <ClearIcon sx={{ fontSize: '1.2rem' }} />
                    </IconButton>
                  </Paper>

                  {/* Search Dropdown */}
                  {(searchFocused || searchQuery) && (
                    <Box
                      sx={{
                        position: 'absolute',
                        left: 0,
                        right: 0,
                        top: '100%',
                        mt: 1,
                        zIndex: 1200,
                        bgcolor: colors.white,
                        border: `1px solid ${colors.gray200}`,
                        borderRadius: 2,
                        boxShadow: '0 16px 40px rgba(0,0,0,0.08)',
                        overflow: 'hidden',
                        maxWidth: isScrolled ? '280px' : '320px',
                      }}
                    >
                      {searchQuery.trim() ? (
                        <Box sx={{ p: 2 }}>
                          <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1 }}>
                            Suggested for "{searchQuery.trim()}"
                          </Typography>
                          {filteredRecommendations.length > 0 ? (
                            filteredRecommendations.map((option) => (
                              <Box
                                key={option}
                                sx={{
                                  px: 2,
                                  py: 1.25,
                                  cursor: 'pointer',
                                  '&:hover': { backgroundColor: colors.gray100 },
                                }}
                                onClick={() => handleSuggestionClick(option)}
                              >
                                <Typography sx={{ color: colors.gray900 }}>{option}</Typography>
                              </Box>
                            ))
                          ) : (
                            <Typography sx={{ px: 2, py: 1.5, color: colors.gray600 }}>
                              No recommendations found.
                            </Typography>
                          )}
                        </Box>
                      ) : null}

                      {recentSearches.length > 0 && (
                        <Box sx={{ borderTop: `1px solid ${colors.gray200}` }}>
                          <Box sx={{ px: 2, py: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                              Recent searches
                            </Typography>
                            <Typography variant="caption" sx={{ color: colors.gray500 }}>
                              {recentSearches.length} saved
                            </Typography>
                          </Box>
                          {recentSearches.map((term) => (
                            <Box
                              key={term}
                              sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                px: 2,
                                py: 1.25,
                                cursor: 'pointer',
                                '&:hover': { backgroundColor: colors.gray100 },
                              }}
                            >
                              <Box onClick={() => handleSuggestionClick(term)} sx={{ flex: 1 }}>
                                <Typography sx={{ color: colors.gray900 }}>{term}</Typography>
                              </Box>
                              <IconButton
                                size="small"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleRemoveRecentSearch(term);
                                }}
                                sx={{ color: colors.gray600 }}
                              >
                                <ClearIcon sx={{ fontSize: '1rem' }} />
                              </IconButton>
                            </Box>
                          ))}
                        </Box>
                      )}
                    </Box>
                  )}
                </Box>
              </ClickAwayListener>
            ) : (
              <IconButton
                onClick={toggleSearch}
                sx={{
                  display: { xs: 'none', md: 'flex' },
                  color: colors.white,
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  borderRadius: '8px',
                  px: 2,
                  py: 0.75,
                  '&:hover': {
                    backgroundColor: 'rgba(255,255,255,0.2)',
                    color: colors.gray900,
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                <SearchIcon sx={{ fontSize: '1.2rem' }} />
              </IconButton>
            )}

            {/* Store Locator - Desktop */}
            <Button
              onClick={() => navigate('/store')}
              startIcon={<LocationOnIcon sx={{ fontSize: '1.2rem', color: colors.white }} />}
              sx={{
                display: { xs: 'none', lg: 'flex' },
                color: colors.white,
                textTransform: 'none',
                fontSize: '0.9rem',
                '&:hover': {
                  color: colors.gray900,
                  backgroundColor: 'rgba(255,255,255,0.15)',
                },
              }}
            >
              Stores
            </Button>

            {/* Cart */}
            <IconButton
              onClick={() => navigate('/cart')}
              sx={{
                color: colors.white,
                '&:hover': { backgroundColor: 'rgba(255,255,255,0.15)' },
              }}
            >
              <Badge badgeContent={totalItems} color="error">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>

            {/* Search Icon - Mobile */}
            <IconButton
              onClick={toggleSearch}
              sx={{
                display: { xs: 'flex', md: 'none' },
                color: colors.white,
                '&:hover': { backgroundColor: 'rgba(255,255,255,0.15)' },
              }}
            >
              <SearchIcon />
            </IconButton>

            {/* User Menu */}
            <IconButton
              onClick={handleOpenUserMenu}
              sx={{
                color: colors.white,
                '&:hover': { backgroundColor: 'rgba(255,255,255,0.15)' },
              }}
            >
              <PersonIcon />
            </IconButton>

            {/* Mobile Menu */}
            <IconButton
              sx={{ display: { xs: 'flex', md: 'none' }, color: colors.white }}
              onClick={handleDrawerToggle}
            >
              <MenuIcon />
            </IconButton>

            <Menu
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {user ? (
                [
                  <MenuItem key="profile" disabled>
                    <Typography sx={{ fontSize: '0.9rem' }}>
                      {user.name} ({user.role})
                    </Typography>
                  </MenuItem>,
                  user.role === 'admin' && (
                    <MenuItem
                      key="admin"
                      onClick={() => {
                        navigate('/admin');
                        handleCloseUserMenu();
                      }}
                    >
                      Admin Dashboard
                    </MenuItem>
                  ),
                  <MenuItem key="logout" onClick={handleLogout}>
                    Logout
                  </MenuItem>,
                ]
              ) : (
                [
                  <MenuItem
                    key="login"
                    onClick={() => {
                      navigate('/login');
                      handleCloseUserMenu();
                    }}
                  >
                    Login
                  </MenuItem>,
                  <MenuItem
                    key="signup"
                    onClick={() => {
                      navigate('/signup');
                      handleCloseUserMenu();
                    }}
                  >
                    Sign Up
                  </MenuItem>,
                ]
              )}
            </Menu>
          </Box>
        </Toolbar>

        {/* Categories Dropdown - Desktop Only */}
        <Box sx={{ display: { xs: 'none', md: isScrolled ? 'none' : 'block' }, borderTop: `1px solid ${colors.gray200}`, transition: 'all 0.3s ease' }}>
          <Toolbar sx={{ display: 'flex', gap: 3, py: 1 }}>
            {navigationMenu}
          </Toolbar>
        </Box>

        {/* Categories Menu */}
        <Menu
          anchorEl={anchorElCategories}
          open={Boolean(anchorElCategories)}
          onClose={handleCloseCategories}
          PaperProps={{
            sx: {
              mt: 1,
              backgroundColor: colors.white,
              boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)',
            },
          }}
        >
          {Object.entries(categoryGroups).map(([groupName, items]) => [
            <Typography
              key={`header-${groupName}`}
              sx={{
                px: 2,
                py: 1,
                fontSize: '0.8rem',
                fontWeight: 700,
                color: colors.gray600,
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
              }}
            >
              {groupName}
            </Typography>,
            ...items.map((item: any) => (
              <MenuItem
                key={item.label}
                onClick={() => item.section && handleNavigateToSection(item.section)}
                sx={{
                  fontSize: '0.9rem',
                  py: 1,
                  px: 2,
                  '&:hover': {
                    backgroundColor: `rgba(212, 175, 55, 0.1)`,
                  },
                }}
              >
                {item.label}
              </MenuItem>
            )),
            <Divider key={`divider-${groupName}`} sx={{ my: 0.5 }} />,
          ])}
        </Menu>
      </Container>

      {/* Mobile Drawer */}
      <Drawer anchor="right" open={mobileOpen} onClose={handleDrawerToggle}>
        {drawerContent}
      </Drawer>

      {/* Mobile Search Bar Modal */}
      {searchOpen && (
        <Box
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            zIndex: 1300,
            display: { xs: 'flex', md: 'none' },
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'flex-start',
            pt: 4,
          }}
          onClick={() => setSearchOpen(false)}
        >
          <Paper
            onClick={(e) => e.stopPropagation()}
            sx={{
              width: '90%',
              maxWidth: '500px',
              display: 'flex',
              alignItems: 'center',
              px: 2,
              py: 1.5,
              backgroundColor: colors.white,
              borderRadius: '12px',
              boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
            }}
            component="form"
            onSubmit={(e) => {
              e.preventDefault();
              handleSearchSubmit(searchQuery);
            }}
          >
            <SearchIcon sx={{ color: colors.gray600, mr: 1, fontSize: '1.2rem' }} />
            <InputBase
              sx={{ ml: 0.5, flex: 1, color: colors.gray900, '& ::placeholder': { color: colors.gray500 } }}
              placeholder="Search jewellery..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={handleSearch}
              onFocus={() => setSearchFocused(true)}
              autoFocus
            />
            <IconButton
              size="small"
              onClick={() => {
                setSearchOpen(false);
                setSearchQuery('');
                setSearchFocused(false);
              }}
              sx={{ color: colors.gray600, ml: 1 }}
            >
              <ClearIcon sx={{ fontSize: '1.2rem' }} />
            </IconButton>
          </Paper>

          {/* Mobile Search Suggestions */}
          {(searchFocused || searchQuery) && (
            <Box
              onClick={(e) => e.stopPropagation()}
              sx={{
                width: '90%',
                maxWidth: '500px',
                mt: 2,
                bgcolor: colors.white,
                borderRadius: 2,
                boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
                overflow: 'auto',
                maxHeight: '50vh',
              }}
            >
              {searchQuery.trim() ? (
                <Box sx={{ p: 2 }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1 }}>
                    Suggested for "{searchQuery.trim()}"
                  </Typography>
                  {filteredRecommendations.length > 0 ? (
                    filteredRecommendations.map((option) => (
                      <Box
                        key={option}
                        sx={{
                          px: 2,
                          py: 1.5,
                          cursor: 'pointer',
                          '&:hover': { backgroundColor: colors.gray100 },
                          borderRadius: 1,
                        }}
                        onClick={() => handleSuggestionClick(option)}
                      >
                        <Typography sx={{ color: colors.gray900 }}>{option}</Typography>
                      </Box>
                    ))
                  ) : (
                    <Typography sx={{ px: 2, py: 1.5, color: colors.gray600 }}>
                      No recommendations found.
                    </Typography>
                  )}
                </Box>
              ) : null}

              {recentSearches.length > 0 && (
                <Box sx={{ borderTop: `1px solid ${colors.gray200}` }}>
                  <Box sx={{ px: 2, py: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                      Recent searches
                    </Typography>
                    <Typography variant="caption" sx={{ color: colors.gray500 }}>
                      {recentSearches.length} saved
                    </Typography>
                  </Box>
                  {recentSearches.map((term) => (
                    <Box
                      key={term}
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        px: 2,
                        py: 1.5,
                        cursor: 'pointer',
                        '&:hover': { backgroundColor: colors.gray100 },
                        borderRadius: 1,
                      }}
                    >
                      <Box onClick={() => handleSuggestionClick(term)} sx={{ flex: 1 }}>
                        <Typography sx={{ color: colors.gray900 }}>{term}</Typography>
                      </Box>
                      <IconButton
                        size="small"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemoveRecentSearch(term);
                        }}
                        sx={{ color: colors.gray600 }}
                      >
                        <ClearIcon sx={{ fontSize: '1rem' }} />
                      </IconButton>
                    </Box>
                  ))}
                </Box>
              )}
            </Box>
          )}
        </Box>
      )}
    </AppBar>
  );
};

export default Header;
