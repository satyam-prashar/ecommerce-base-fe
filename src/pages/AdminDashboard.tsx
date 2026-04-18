import React, { useState } from 'react';
import {
  Box,
  Container,
  Card,
  Tabs,
  Tab,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  Typography,
  Grid,
  Paper,
  IconButton,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { useAdmin } from '../context/AdminContext';
import { useAuth } from '../context/AuthContext';
import { colors } from '../theme/theme';
import { useNavigate } from 'react-router-dom';

const AdminDashboard: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const {
    goldPrice,
    updateGoldPrice,
    sections,
    addSection,
    updateSection,
    deleteSection,
    promoCodes,
    addPromoCode,
    deletePromoCode,
  } = useAdmin();

  // Check if user is admin
  if (user?.role !== 'admin') {
    return (
      <Box sx={{ p: 4 }}>
        <Alert severity="error">
          Unauthorized. Only admins can access the dashboard.
        </Alert>
        <Button onClick={() => navigate('/')} sx={{ mt: 2 }}>
          Go to Home
        </Button>
      </Box>
    );
  }

  const [tabValue, setTabValue] = useState(0);
  const [newGoldPrice, setNewGoldPrice] = useState(goldPrice.pricePerGram.toString());
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogType, setDialogType] = useState<'section' | 'subsection' | 'promo' | 'product' | ''>('');
  const [editingItem, setEditingItem] = useState<any>(null);
  const [formData, setFormData] = useState<any>({});

  // Handle Tab Change
  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  // Gold Price Management
  const handleUpdateGoldPrice = () => {
    const price = parseFloat(newGoldPrice);
    if (price > 0) {
      updateGoldPrice(price);
      alert('Gold price updated successfully!');
    }
  };

  // Dialog handlers
  const openAddDialog = (type: 'section' | 'subsection' | 'promo' | 'product') => {
    setDialogType(type);
    setEditingItem(null);
    setFormData({});
    setOpenDialog(true);
  };

  const openEditDialog = (type: string, item: any) => {
    setDialogType(type as any);
    setEditingItem(item);
    setFormData(item);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingItem(null);
    setFormData({});
  };

  const handleSaveItem = () => {
    if (dialogType === 'section') {
      if (editingItem) {
        updateSection(editingItem.id, formData);
      } else {
        addSection({
          ...formData,
          id: `sec-${Date.now()}`,
          subsections: [],
        });
      }
    } else if (dialogType === 'promo') {
      if (editingItem) {
        // Would need updatePromoCode
        alert('Update not implemented in this demo');
      } else {
        addPromoCode({
          ...formData,
          id: `promo-${Date.now()}`,
          usedCount: 0,
          isActive: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      }
    }
    alert(`${dialogType} saved successfully!`);
    handleCloseDialog();
  };

  // TabPanel component
  interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
  }

  const TabPanel: React.FC<TabPanelProps> = ({ children, value, index }) => (
    <Box hidden={value !== index} sx={{ py: 3 }}>
      {children}
    </Box>
  );

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
        Admin Dashboard
      </Typography>

      <Card>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          sx={{
            borderBottom: `1px solid ${colors.gray300}`,
            '& .MuiTab-root': {
              textTransform: 'none',
              fontSize: '1rem',
              fontWeight: 600,
            },
          }}
        >
          <Tab label="Gold Price" />
          <Tab label="Sections" />
          <Tab label="Promo Codes" />
          <Tab label="Products" />
          <Tab label="Settings" />
        </Tabs>

        {/* Gold Price Tab */}
        <TabPanel value={tabValue} index={0}>
          <Box sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
              Current Gold Price
            </Typography>

            <Paper sx={{ p: 3, backgroundColor: colors.gray50, mb: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" sx={{ color: colors.gray600, mb: 1 }}>
                    Price per Gram
                  </Typography>
                  <Typography variant="h4" sx={{ color: colors.primary, fontWeight: 700 }}>
                    ₹{goldPrice.pricePerGram.toLocaleString()}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" sx={{ color: colors.gray600, mb: 1 }}>
                    Last Updated
                  </Typography>
                  <Typography variant="body1">
                    {new Date(goldPrice.lastUpdated).toLocaleDateString()}
                  </Typography>
                </Grid>
              </Grid>
            </Paper>

            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField
                label="New Price (per gram)"
                type="number"
                value={newGoldPrice}
                onChange={(e) => setNewGoldPrice(e.target.value)}
                inputProps={{ step: '100' }}
              />
              <Button
                variant="contained"
                onClick={handleUpdateGoldPrice}
              >
                Update Price
              </Button>
            </Box>

            <Alert severity="info" sx={{ mt: 3 }}>
              💡 Updating the gold price will automatically recalculate all product prices based on their gold weight.
            </Alert>
          </Box>
        </TabPanel>

        {/* Sections Tab */}
        <TabPanel value={tabValue} index={1}>
          <Box sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Manage Sections
              </Typography>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={() => openAddDialog('section')}
              >
                Add Section
              </Button>
            </Box>

            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow sx={{ backgroundColor: colors.gray100 }}>
                    <TableCell>Name</TableCell>
                    <TableCell>Subsections</TableCell>
                    <TableCell align="right">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {sections.map((section) => (
                    <TableRow key={section.id}>
                      <TableCell>{section.name}</TableCell>
                      <TableCell>{section.subsections.length}</TableCell>
                      <TableCell align="right">
                        <IconButton
                          size="small"
                          onClick={() => openEditDialog('section', section)}
                        >
                          <EditIcon fontSize="small" />
                        </IconButton>
                        <IconButton
                          size="small"
                          onClick={() => {
                            if (window.confirm('Are you sure?')) {
                              deleteSection(section.id);
                            }
                          }}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </TabPanel>

        {/* Promo Codes Tab */}
        <TabPanel value={tabValue} index={2}>
          <Box sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Manage Promo Codes
              </Typography>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={() => openAddDialog('promo')}
              >
                Add Promo Code
              </Button>
            </Box>

            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow sx={{ backgroundColor: colors.gray100 }}>
                    <TableCell>Code</TableCell>
                    <TableCell>Discount</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Used</TableCell>
                    <TableCell align="right">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {promoCodes.map((code) => (
                    <TableRow key={code.id}>
                      <TableCell sx={{ fontWeight: 600 }}>{code.code}</TableCell>
                      <TableCell>
                        {code.discountType === 'percentage'
                          ? `${code.discountValue}%`
                          : `₹${code.discountValue}`}
                      </TableCell>
                      <TableCell>
                        {code.isActive ? '✅ Active' : '❌ Inactive'}
                      </TableCell>
                      <TableCell>{code.usedCount}/{code.maxUsage || '∞'}</TableCell>
                      <TableCell align="right">
                        <IconButton
                          size="small"
                          onClick={() => openEditDialog('promo', code)}
                        >
                          <EditIcon fontSize="small" />
                        </IconButton>
                        <IconButton
                          size="small"
                          onClick={() => {
                            if (window.confirm('Are you sure?')) {
                              deletePromoCode(code.id);
                            }
                          }}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </TabPanel>

        {/* Products Tab */}
        <TabPanel value={tabValue} index={3}>
          <Box sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Manage Products
              </Typography>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={() => openAddDialog('product')}
              >
                Add Product
              </Button>
            </Box>
            <Alert severity="info">
              📦 Product management interface can be extended with a detailed form for adding/editing products with gold weight, pricing model, and images.
            </Alert>
          </Box>
        </TabPanel>

        {/* Settings Tab */}
        <TabPanel value={tabValue} index={4}>
          <Box sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
              Store Settings
            </Typography>
            <Alert severity="info">
              ⚙️ Additional settings like store name, commission rates, shipping zones, and email notifications can be configured here.
            </Alert>
          </Box>
        </TabPanel>
      </Card>

      {/* Dialog for Adding/Editing Items */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          {editingItem ? `Edit ${dialogType}` : `Add New ${dialogType}`}
        </DialogTitle>
        <DialogContent sx={{ pt: 2 }}>
          {dialogType === 'section' && (
            <>
              <TextField
                fullWidth
                label="Section Name"
                value={formData.name || ''}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                margin="normal"
              />
              <TextField
                fullWidth
                label="Description"
                value={formData.description || ''}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                margin="normal"
                multiline
                rows={3}
              />
            </>
          )}
          {dialogType === 'promo' && (
            <>
              <TextField
                fullWidth
                label="Promo Code"
                value={formData.code || ''}
                onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                margin="normal"
              />
              <FormControl fullWidth margin="normal">
                <InputLabel>Discount Type</InputLabel>
                <Select
                  value={formData.discountType || 'percentage'}
                  onChange={(e) => setFormData({ ...formData, discountType: e.target.value })}
                  label="Discount Type"
                >
                  <MenuItem value="percentage">Percentage</MenuItem>
                  <MenuItem value="fixed">Fixed</MenuItem>
                </Select>
              </FormControl>
              <TextField
                fullWidth
                label="Discount Value"
                type="number"
                value={formData.discountValue || ''}
                onChange={(e) => setFormData({ ...formData, discountValue: parseFloat(e.target.value) })}
                margin="normal"
              />
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSaveItem} variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default AdminDashboard;
