# E-Commerce Store

A modern, full-featured e-commerce web application built with Next.js 15, TypeScript, and Tailwind CSS. This app integrates with the DummyJSON API to provide a complete shopping experience with advanced filtering, search, and cart management.

**🌐 Live Demo**: [https://ecommerce-app-fawn-two.vercel.app](https://ecommerce-app-fawn-two.vercel.app)

## 🚀 Features

### Core Functionality
- **Product Catalog**: Browse products from DummyJSON API with images, ratings, and pricing
- **Product Details**: Detailed product pages with image galleries and descriptions
- **Shopping Cart**: Add/remove items with quantity management and persistent storage
- **Responsive Design**: Mobile-first design with Tailwind CSS

### Technical Features
- **TypeScript**: Full type safety throughout the application
- **React Query**: Efficient data fetching with caching and error handling
- **Zustand**: Lightweight state management with persistence

## 📁 Project Structure

```
ecommerce-app/
├── app/
│   ├── layout.tsx              # Root layout with providers
│   ├── page.tsx                # Home page with filters and product grid
│   ├── cart/
│   │   └── page.tsx            # Shopping cart page
│   └── products/
│       └── [id]/
│           └── page.tsx        # Product detail page
├── components/
│   ├── Header.tsx              # Navigation header with cart count
│   ├── ProductCard.tsx         # Product card component
│   ├── QueryProvider.tsx       # React Query provider
│   └── ToastProvider.tsx       # Toast notifications
├── hooks/
│   ├── useProducts.ts          # Products data fetching
│   ├── useProduct.ts           # Single product fetching
│   └── useCartMutations.ts     # Cart operations
├── store/
│   └── cartStore.ts            # Zustand store for cart management
├── utils/
│   └── cartUtils.ts            # Cart calculation utilities
└── public/                     # Static assets
```

## 🛠️ How to Run Locally

### Prerequisites
- Node.js 18+ 
- npm or yarn package manager

### Installation Steps

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd ecommerce-app
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript type checking
```

### Environment Setup
No environment variables are required as the app uses the public DummyJSON API. The application is ready to run immediately after installation.

## 🌐 Deployment

### Live Demo
**🚀 Production URL**: [https://ecommerce-app-fawn-two.vercel.app](https://ecommerce-app-fawn-two.vercel.app)

The application is deployed on Vercel and is live for testing and demonstration purposes.

### Deploy to Vercel

#### Option 1: One-Click Deploy
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/anshulkhare-iitd/assignment-ecommerce-app)

#### Option 2: Manual Deployment

1. **Install Vercel CLI:**
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel:**
   ```bash
   vercel login
   ```

3. **Deploy from your project directory:**
   ```bash
   vercel
   ```

4. **For production deployment:**
   ```bash
   vercel --prod
   ```

#### Option 3: GitHub Integration

1. **Connect your GitHub repository to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Vercel will automatically detect Next.js and configure the build settings

2. **Automatic deployments:**
   - Every push to `main` branch triggers automatic deployment
   - Pull requests get preview deployments
   - Custom domains can be configured in project settings

### Deployment Configuration

The application is configured with:
- **Build Command**: `next build --turbopack`
- **Output Directory**: Next.js default (`.next`)
- **Node Version**: 22.x
- **Framework**: Next.js (auto-detected)

### Environment Variables

No environment variables are required for basic functionality. The app uses the public DummyJSON API.

### Performance Features

- **Global CDN**: Vercel's edge network for fast loading worldwide
- **Automatic HTTPS**: SSL certificates provided automatically
- **Image Optimization**: Next.js Image component with Vercel's image optimization
- **Static Generation**: Pre-rendered pages for optimal performance

### Monitoring & Analytics

- **Vercel Analytics**: Built-in performance monitoring
- **Real-time Logs**: Available in Vercel dashboard
- **Performance Insights**: Core Web Vitals tracking

## 🏗️ Development Process & Trade-offs

### My Thought Process

#### 1. **Initial Architecture Decisions**
- **Next.js 15 with App Router**: Chose for modern React patterns, better performance, and built-in optimizations
- **TypeScript**: Essential for maintainability and developer experience in a complex e-commerce app
- **Tailwind CSS**: Rapid development with consistent design system

#### 2. **State Management Strategy**
- **Zustand over Redux**: Chosen for simplicity and minimal boilerplate
  - *Trade-off*: Less ecosystem support than Redux, but perfect for this scale
- **Persistence**: Cart state saves to localStorage automatically
  - *Trade-off*: localStorage has size limits, but sufficient for cart data

#### 3. **Data Fetching Evolution**
- **Started with**: Basic fetch calls in components
- **Evolved to**: React Query for caching, error handling, and performance
  - *Trade-off*: Added complexity but significantly improved UX
- **Custom Hooks**: Created reusable data fetching patterns
  - *Trade-off*: More abstraction but better maintainability

#### 4. **Data Fetching Strategy**
- **React Query**: Implemented for caching and error handling
  - *Trade-off*: Added complexity but significantly improved UX
- **Custom Hooks**: Created reusable data fetching patterns
  - *Trade-off*: More abstraction but better maintainability

### Key Technical Decisions

#### **React Query Integration**
- **Why**: Needed caching, background updates, and error handling
- **Trade-off**: Added bundle size but eliminated loading states and improved performance
- **Implementation**: Custom hooks for each data type with proper cache keys

#### **Component Architecture**
- **Separation of Concerns**: Product display and cart management as separate components
- **Trade-off**: More files but better maintainability and reusability
- **Props vs Context**: Used props for simplicity, avoided over-engineering

### Performance Optimizations

#### **Caching Strategy**
- **Products**: 5-minute cache with 10-minute garbage collection
- **Smart Invalidation**: Proper cache key management for data freshness

#### **Bundle Optimization**
- **Code Splitting**: Automatic with Next.js App Router
- **Tree Shaking**: Proper ES6 imports throughout
- **Image Optimization**: Next.js Image component with proper sizing

#### **User Experience**
- **Loading States**: Skeleton loaders and proper error boundaries
- **Responsive Design**: Mobile-first approach with Tailwind breakpoints
- **Accessibility**: Semantic HTML and proper ARIA labels

## 🔧 Known Limitations

### Current Limitations

1. **API Dependency**: 
   - Relies entirely on DummyJSON API availability
   - No offline functionality or fallback data
   - Rate limiting depends on external service

2. **No Authentication**: 
   - No user accounts, login, or registration
   - No order history or saved preferences
   - Cart is only stored locally (lost if localStorage is cleared)

3. **No Payment Processing**: 
   - Demo-only checkout functionality
   - No real payment integration
   - No order confirmation or tracking

4. **No Search or Filtering**:
   - No search functionality for products
   - No category-based filtering
   - No sorting options (price, rating, etc.)
   - No pagination for large product lists

5. **Performance Considerations**:
   - All data fetching happens client-side
   - No server-side rendering for product data
   - Large product catalogs could impact initial load time

6. **Mobile Experience**:
   - Touch targets could be larger for better mobile UX
   - No mobile-specific optimizations for product browsing

### Technical Debt

1. **Error Handling**: Could be more comprehensive with retry mechanisms
2. **Testing**: No unit or integration tests currently implemented
3. **Accessibility**: Could benefit from more ARIA labels and keyboard navigation
4. **SEO**: Limited meta tags and structured data for product pages

## 🚀 Future Enhancements

### High Priority
- **Search Functionality**: Real-time search with debouncing for optimal performance
- **Category Filtering**: Filter products by categories with dynamic loading
- **Advanced Sorting**: Sort by name, price, or rating in ascending/descending order
- **Pagination**: Efficient pagination for large product catalogs
- **URL State Management**: All filters and search terms persist in URL for bookmarking and sharing
- **User Authentication**: Login/registration with JWT tokens
- **Order Management**: Order history, tracking, and confirmation emails
- **Payment Integration**: Stripe/PayPal integration for real transactions

### Medium Priority
- **Product Reviews**: User reviews and ratings system
- **Wishlist**: Save products for later functionality
- **Product Recommendations**: AI-powered product suggestions
- **Inventory Management**: Real-time stock updates
- **Multi-language Support**: Internationalization
- **Progressive Web App**: Offline functionality and push notifications

### Low Priority
- **Admin Dashboard**: Inventory and order management interface
- **Analytics**: User behavior tracking and sales analytics
- **Social Features**: Share products, social login
- **Advanced Filtering**: Price ranges, brand filters, availability
- **Bulk Operations**: Bulk add to cart, compare products
- **Browser Navigation**: Full support for back/forward buttons with state restoration

## 🧪 Testing Strategy

### Recommended Testing Approach
```bash
# Unit Tests (Jest + React Testing Library)
npm run test

# E2E Tests (Playwright)
npm run test:e2e

# Type Checking
npm run type-check

# Linting
npm run lint
```

### Test Coverage Areas
- Component rendering and user interactions
- State management (Zustand store)
- API integration and error handling
- Responsive design and accessibility

## 📦 Dependencies

### Core Framework
- **Next.js 15**: React framework with App Router and built-in optimizations
- **TypeScript**: Type safety and enhanced developer experience
- **React 18**: Latest React features and concurrent rendering

### Styling & UI
- **Tailwind CSS**: Utility-first CSS framework for rapid development
- **Custom Components**: Reusable UI components with consistent design

### State Management & Data
- **Zustand**: Lightweight state management with persistence
- **React Query**: Server state management, caching, and synchronization
- **DummyJSON API**: External product data source

### Development Tools
- **ESLint**: Code linting and style enforcement
- **PostCSS**: CSS processing and optimization
- **TypeScript**: Static type checking

### Key Features Implemented
- **Responsive Design**: Mobile-first approach with Tailwind breakpoints
- **Error Handling**: Comprehensive error boundaries and fallbacks
- **State Persistence**: Cart state persists across browser sessions

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is for educational purposes. The DummyJSON API is used for demonstration only.
