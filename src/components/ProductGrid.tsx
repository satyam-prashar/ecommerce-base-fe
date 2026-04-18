import React, { useState } from 'react';
import {
  Grid,
  Box,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  IconButton,
  Tooltip,
  Container,
  Typography,
  Slider,
  Paper,
  Collapse,
} from '@mui/material';
import ViewComfyIcon from '@mui/icons-material/ViewComfy';
import ViewAgendaIcon from '@mui/icons-material/ViewAgenda';
import FilterListIcon from '@mui/icons-material/FilterList';
import CloseIcon from '@mui/icons-material/Close';
import { useProducts } from '../context/ProductContext';
import ProductCard from './ProductCard';
import { colors } from '../theme/theme';
import { useNavigate } from 'react-router-dom';

const ProductGrid: React.FC = () => {
  const {
    filteredProducts,
    filters,
    setFilters,
    clearFilters,
    viewMode,
    setViewMode,
    sections,
  } = useProducts();

  const navigate = useNavigate();
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 200000]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({ ...filters, searchTerm: e.target.value });
  };

  const handleSectionChange = (e: any) => {
    setFilters({ ...filters, sectionId: e.target.value || undefined });
  };

  const handleSortChange = (e: any) => {
    setFilters({ ...filters, sortBy: e.target.value });
  };

  const handlePriceChange = (_: any, newValue: number | number[]) => {
    const [min, max] = newValue as [number, number];
    setPriceRange([min, max]);
    setFilters({
      ...filters,
      minPrice: min,
      maxPrice: max,
    });
  };

  const handleClearFilters = () => {
    clearFilters();
    setPriceRange([0, 200000]);
    setShowFilters(false);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header with view toggle and filter button */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 600 }}>
          Our Collection
          {filteredProducts.length > 0 && (
            <Typography component="span" sx={{ ml: 1, color: colors.gray600, fontSize: '1rem' }}>
              ({filteredProducts.length} items)
            </Typography>
          )}
        </Typography>

        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          {/* View Toggle */}
          <Box sx={{ display: 'flex', border: `1px solid ${colors.gray300}`, borderRadius: 1 }}>
            <Tooltip title="Cards View">
              <IconButton
                size="small"
                onClick={() => setViewMode('cards')}
                sx={{
                  color: viewMode === 'cards' ? colors.primary : colors.gray600,
                  backgroundColor: viewMode === 'cards' ? colors.primaryLight : 'transparent',
                }}
              >
                <ViewComfyIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Tiles View">
              <IconButton
                size="small"
                onClick={() => setViewMode('tiles')}
                sx={{
                  color: viewMode === 'tiles' ? colors.primary : colors.gray600,
                  backgroundColor: viewMode === 'tiles' ? colors.primaryLight : 'transparent',
                }}
              >
                <ViewAgendaIcon />
              </IconButton>
            </Tooltip>
          </Box>

          {/* Filter Toggle */}
          <Tooltip title="Toggle Filters">
            <IconButton
              onClick={() => setShowFilters(!showFilters)}
              sx={{ color: colors.primary }}
            >
              <FilterListIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      {/* Search and Quick Filters */}
      <Box sx={{ mb: 3 }}>
        <TextField
          fullWidth
          placeholder="Search products..."
          value={filters.searchTerm || ''}
          onChange={handleSearchChange}
          sx={{
            mb: 2,
            '& .MuiOutlinedInput-root': {
              '&:hover fieldset': { borderColor: colors.primary },
            },
          }}
        />

        {/* Expandable Filters */}
        <Collapse in={showFilters}>
          <Paper sx={{ p: 2, mb: 2, backgroundColor: colors.gray50 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                Filters
              </Typography>
              <IconButton size="small" onClick={handleClearFilters}>
                <CloseIcon fontSize="small" />
              </IconButton>
            </Box>

            <Grid container spacing={2}>
              {/* Section Filter */}
              <Grid item xs={12} sm={6} md={3}>
                <FormControl fullWidth size="small">
                  <InputLabel>Section</InputLabel>
                  <Select
                    value={filters.sectionId || ''}
                    label="Section"
                    onChange={handleSectionChange}
                  >
                    <MenuItem value="">All Sections</MenuItem>
                    {sections.map((section) => (
                      <MenuItem key={section.id} value={section.id}>
                        {section.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              {/* Sort Filter */}
              <Grid item xs={12} sm={6} md={3}>
                <FormControl fullWidth size="small">
                  <InputLabel>Sort By</InputLabel>
                  <Select
                    value={filters.sortBy || ''}
                    label="Sort By"
                    onChange={handleSortChange}
                  >
                    <MenuItem value="">Default</MenuItem>
                    <MenuItem value="price-asc">Price: Low to High</MenuItem>
                    <MenuItem value="price-desc">Price: High to Low</MenuItem>
                    <MenuItem value="newest">Newest First</MenuItem>
                    <MenuItem value="rating">Highest Rated</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              {/* Price Range */}
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                  Price Range: ₹{priceRange[0].toLocaleString()} - ₹{priceRange[1].toLocaleString()}
                </Typography>
                <Slider
                  value={priceRange}
                  onChange={handlePriceChange}
                  valueLabelDisplay="auto"
                  min={0}
                  max={200000}
                  step={5000}
                  marks={[
                    { value: 0, label: '₹0' },
                    { value: 200000, label: '₹200K' },
                  ]}
                  sx={{
                    '& .MuiSlider-thumb': {
                      backgroundColor: colors.primary,
                    },
                    '& .MuiSlider-track': {
                      backgroundColor: colors.primary,
                    },
                  }}
                />
              </Grid>
            </Grid>

            <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
              <Button
                variant="contained"
                size="small"
                onClick={() => setShowFilters(false)}
              >
                Apply Filters
              </Button>
              <Button
                variant="outlined"
                size="small"
                onClick={handleClearFilters}
              >
                Clear All
              </Button>
            </Box>
          </Paper>
        </Collapse>
      </Box>

      {/* Products Grid */}
      {filteredProducts.length > 0 ? (
        <Grid
          container
          spacing={viewMode === 'cards' ? 3 : 2}
          sx={{
            gridTemplateColumns: {
              xs: viewMode === 'cards' ? 'repeat(1, 1fr)' : 'repeat(auto-fill, minmax(150px, 1fr))',
              sm: viewMode === 'cards' ? 'repeat(2, 1fr)' : 'repeat(2, 1fr)',
              md: viewMode === 'cards' ? 'repeat(3, 1fr)' : 'repeat(4, 1fr)',
              lg: viewMode === 'cards' ? 'repeat(4, 1fr)' : 'repeat(5, 1fr)',
            },
          }}
        >
          {filteredProducts.map((product) => (
            <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
              <ProductCard
                product={product}
                onProductClick={(prod) =>
                  navigate(`/product/${prod.id}`)
                }
                viewMode={viewMode}
              />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Box
          sx={{
            textAlign: 'center',
            py: 8,
            color: colors.gray600,
          }}
        >
          <Typography variant="h6">No products found</Typography>
          <Typography variant="body2">Try adjusting your filters</Typography>
          <Button
            variant="outlined"
            sx={{ mt: 2 }}
            onClick={handleClearFilters}
          >
            Clear Filters
          </Button>
        </Box>
      )}
    </Container>
  );
};

export default ProductGrid;
