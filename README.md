# E-Commerce Store

A modern e-commerce web application built with Next.js 15, TypeScript, and Tailwind CSS. This app integrates with the DummyJSON API to display products and uses Zustand for state management with persistent cart functionality.

## 🚀 Features

- **Product Catalog**: Browse products from DummyJSON API with images, ratings, and pricing
- **Product Details**: Detailed product pages with image galleries and descriptions
- **Shopping Cart**: Add/remove items with quantity management
- **Persistent Cart**: Cart state persists across browser sessions using localStorage
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **TypeScript**: Full type safety throughout the application

## 📁 Project Structure

```
ecommerce-app/
├── app/
│   ├── layout.tsx              # Root layout with Header
│   ├── page.tsx                # Home page with product grid
│   ├── cart/
│   │   └── page.tsx            # Shopping cart page
│   └── products/
│       └── [id]/
│           └── page.tsx        # Product detail page
├── components/
│   ├── Header.tsx              # Navigation header with cart count
│   └── ProductCard.tsx         # Product card component
├── store/
│   └── cartStore.ts            # Zustand store for cart management
└── public/                     # Static assets
```

## 🛠️ Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run the development server:**
   ```bash
   npm run dev
   ```

3. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗️ Architecture & Trade-offs

### State Management
- **Zustand**: Chosen for its simplicity and minimal boilerplate compared to Redux
- **Persistence**: Cart state automatically saves to localStorage using Zustand's persist middleware
- **Type Safety**: Full TypeScript integration with proper interfaces

### Data Fetching
- **Server Components**: Used for initial product data fetching on the home page for better SEO
- **Client Components**: Used for interactive features like cart management and product details
- **Error Handling**: Graceful fallbacks for API failures

### UI/UX Decisions
- **Tailwind CSS**: For rapid development and consistent design system
- **Responsive Grid**: Mobile-first approach with responsive product grids
- **Loading States**: Proper loading indicators and error states
- **Accessibility**: Semantic HTML and proper ARIA labels

### Performance Optimizations
- **Image Optimization**: Next.js Image component with proper sizing
- **Code Splitting**: Automatic code splitting with Next.js App Router
- **Caching**: Strategic use of cache control for API calls

## 🔧 Known Limitations

1. **API Dependency**: Relies on DummyJSON API availability
2. **No Authentication**: No user accounts or order history
3. **No Payment Processing**: Demo-only checkout functionality
4. **Limited Search**: No search or filtering capabilities
5. **No Categories**: No category-based navigation

## 🚀 Future Enhancements

- User authentication and profiles
- Search and filtering functionality
- Category-based navigation
- Order history and tracking
- Payment integration
- Product reviews and ratings
- Wishlist functionality
- Admin dashboard for inventory management

## 📦 Dependencies

- **Next.js 15**: React framework with App Router
- **TypeScript**: Type safety and better developer experience
- **Tailwind CSS**: Utility-first CSS framework
- **Zustand**: Lightweight state management
- **DummyJSON API**: Product data source

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is for educational purposes. The DummyJSON API is used for demonstration only.
