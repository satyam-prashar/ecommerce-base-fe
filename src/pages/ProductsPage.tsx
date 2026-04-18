import { useEffect } from 'react';
import { Box } from '@mui/material';
import { useSearchParams } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';
import ProductGrid from '../components/ProductGrid';

const ProductsPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const { setFilters } = useProducts();

  useEffect(() => {
    // Apply filters from URL params
    const section = searchParams.get('section');
    const subsection = searchParams.get('subsection');
    const search = searchParams.get('search');

    if (section || subsection || search) {
      setFilters({
        sectionId: section || undefined,
        subsectionId: subsection || undefined,
        searchTerm: search || undefined,
      });
    }
  }, [searchParams, setFilters]);

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#fafafa' }}>
      <ProductGrid />
    </Box>
  );
};

export default ProductsPage;
