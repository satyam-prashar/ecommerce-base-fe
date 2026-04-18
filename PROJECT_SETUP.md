# Jewellery Store Frontend

A beautiful, modern jewelry e-commerce website built with React, TypeScript, Material-UI, and Vite.

## Features

### 🛍️ Customer Features

- **Product Browsing**: Browse jewelry organized by sections (Rings, Necklaces, Earrings, Bracelets, Sets)
- **Advanced Search & Filtering**: Search products, filter by section, price range, and gold weight
- **Flexible Display**: Switch between cards and tiles view
- **Shopping Cart**: Add/remove products, update quantities, manage cart
- **Promo Codes**: Apply discount codes for special offers
- **Responsive Design**: Works seamlessly on mobile, tablet, and desktop

### 👨‍💼 Admin Features

- **Gold Price Management**: Set real-time gold prices that automatically update product prices
- **Section Management**: Add, edit, and delete product sections
- **Promo Code Management**: Create and manage discount/promo codes
- **Product Management**: Add products with gold weight and flexible pricing models
  - Fixed making charges
  - Percentage-based making charges
- **Dashboard**: Comprehensive admin dashboard with tabs for different management areas

### 🎨 Design

- **Warm Rose Gold Theme**: Beautiful, luxurious color palette designed for jewelry
- **Centralized Styling**: Single theme configuration for easy color palette changes
- **Material-UI Components**: Professional, polished UI components
- **Smooth Animations**: Elegant transitions and hover effects

### 🏗️ Architecture

- **Mock Data**: Pre-populated with sample data, ready for API integration
- **Context API**: State management for authentication, products, admin, and cart
- **API Service Layer**: Structured for easy migration to real APIs
- **TypeScript**: Full type safety across the application

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Header.tsx      # Navigation header
│   ├── ProductCard.tsx # Product display card
│   └── ProductGrid.tsx # Product grid with filters
├── context/            # React Context providers
│   ├── AuthContext.tsx        # Authentication state
│   ├── ProductContext.tsx     # Product and filtering state
│   ├── AdminContext.tsx       # Admin settings and management
│   └── CartContext.tsx        # Shopping cart state
├── pages/              # Page components
│   ├── HomePage.tsx           # Landing page
│   ├── ProductsPage.tsx       # Products listing
│   ├── LoginPage.tsx          # Login
│   ├── SignupPage.tsx         # Signup
│   ├── CartPage.tsx           # Shopping cart
│   └── AdminDashboard.tsx     # Admin dashboard
├── mock-data/          # Mock data for development
│   └── index.ts        # Sample products, sections, prices
├── theme/              # Theme configuration
│   └── theme.ts        # Material-UI theme with rose gold colors
├── types/              # TypeScript types
│   └── index.ts        # All interfaces and types
├── services/           # API services
│   └── api.ts          # API calls (mock, ready for real APIs)
├── utils/              # Utility functions
├── App.tsx             # Main app component
└── main.tsx            # Entry point
```

## Installation & Setup

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Steps

1. **Install Dependencies**

```bash
npm install
```

2. **Development Server**

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

3. **Build for Production**

```bash
npm run build
```

4. **Preview Production Build**

```bash
npm run preview
```

## Demo Credentials

**User Account:**

- Email: `user@example.com`
- Password: `password`

**Admin Account:**

- Email: `admin@example.com`
- Password: `password`

## Current Mock Features

### Implemented

- ✅ Product listing with mock data
- ✅ Advanced filtering and search
- ✅ Shopping cart with local storage
- ✅ User authentication (mock)
- ✅ Admin dashboard with gold price management
- ✅ Promo code validation
- ✅ Section and subsection management
- ✅ Responsive design

### Ready for API Integration

- 🔌 `src/services/api.ts` - All API functions structured for real endpoints
- 🔌 Mock data functions designed to mimic API responses
- 🔌 Error handling ready for API errors

## Theme Customization

The entire color palette can be changed from one central location:

**File:** `src/theme/theme.ts`

```typescript
const roseGoldPalette = {
  primary: "#C8956D", // Change this for primary color
  primaryLight: "#E8C4A8",
  primaryDark: "#A67C52",
  // ... other colors
};
```

## API Integration Guide

When ready to connect to your backend:

1. **Update API Base URL** in `src/services/api.ts`:

```typescript
const API_BASE_URL =
  process.env.REACT_APP_API_URL || "https://your-api.com/api";
```

2. **Replace mock API calls** with actual fetch/axios:

```typescript
// Replace this:
await simulateDelay();
return { success: true, data: mockProducts };

// With this:
return await fetch(`${API_BASE_URL}/products`).then((r) => r.json());
```

3. **Update context hooks** to fetch from APIs instead of mock data

## Key Technologies

- **React 19** - UI library
- **TypeScript** - Type safety
- **Material-UI (MUI)** - Component library
- **React Router** - Client-side routing
- **Vite** - Build tool
- **Context API** - State management

## Color Palette

### Rose Gold Theme

- **Primary**: #C8956D (Warm Rose Gold)
- **Primary Light**: #E8C4A8
- **Primary Dark**: #A67C52
- **Secondary**: #8B6F47 (Bronze)
- **Accent**: #D4A574

## Future Enhancements

- [ ] Product detail page with additional images
- [ ] Customer reviews and ratings
- [ ] Wishlist functionality
- [ ] Order history and tracking
- [ ] Payment integration
- [ ] Email notifications
- [ ] Inventory management
- [ ] Order management system
- [ ] Customer support chat
- [ ] Analytics dashboard

## License

This project is open source and available under the MIT License.

## Support

For issues or questions, please contact support or check the documentation.

---

**Built with ❤️ for jewelry lovers**
