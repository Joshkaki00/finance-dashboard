# Personal Finance Dashboard

**Live:** [https://joshkaki00.github.io/finance-dashboard/](https://joshkaki00.github.io/finance-dashboard/)

A new browser opens with sample finances for Alex Rivera. Anything you add, edit, or delete stays in that browser only. The site is a static GitHub Pages deploy, so there is no server and nothing sleeps on the first load.

A modern, responsive web application for managing personal finances, built with React, Redux, and Tailwind CSS. Features complete WCAG 2.2 accessibility compliance and optimized layouts for mobile, tablet, and desktop devices.

## 🌟 Features

- 📊 **Interactive Dashboard** with financial overview and charts
- 💰 **Transaction Management** (add, view, filter, and delete transactions)
- 📈 **Budget Planning** and tracking with visual progress indicators
- 🎨 **Responsive Design** with mobile/tablet/desktop optimized layouts
- ♿ **Full WCAG 2.2 Accessibility** compliance (Level AA)
- 🔄 **Real-time State Management** with Redux Toolkit
- 💡 **Financial Tips** from external API integration
- ✨ **Loading, Error, and Empty States** properly handled

## 📱 Responsive Breakpoints

- **Mobile** (< 768px): Bottom tab navigation with card-based layouts
- **Tablet** (768px - 1279px): Sidebar navigation with enhanced touch targets
- **Desktop** (≥ 1280px): Multi-column layout with comprehensive features

## 🛠 Tech Stack

- **Frontend**: React 19 with modern hooks
- **State Management**: Redux Toolkit with Redux Thunk
- **Styling**: Tailwind CSS 4.1 with custom responsive design
- **Build Tool**: Vite 6 for fast development and optimized builds
- **Charts**: Recharts for data visualization
- **Code Quality**: ESLint with React-specific rules
- **Accessibility**: WCAG 2.2 Level AA compliant
- **Deployment**: GitHub Pages with automated CI/CD

## 🚀 Live Demo

Visit the live application: **[https://joshkaki00.github.io/finance-dashboard/](https://joshkaki00.github.io/finance-dashboard/)**

## 📦 Installation & Setup

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Git

### Local Development

1. **Clone the repository:**
```bash
git clone https://github.com/Joshkaki00/finance-dashboard.git
cd finance-dashboard
```

2. **Install dependencies:**
```bash
npm install
```

3. **Set up the quotes API key (optional):**
   - Get a free API key from [API Ninjas](https://api-ninjas.com/)
   - Copy `.env.example` to `.env.local` and set `VITE_API_NINJAS_KEY`
   - Leave it unset to keep the built-in tip. The key is not stored in the repo.

4. **Start development server:**
```bash
npm run dev
```

5. **Open your browser:**
   Navigate to `http://localhost:5173/finance-dashboard/`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

## 🚀 Deployment to GitHub Pages

This project is configured for easy deployment to GitHub Pages using two methods:

### Method 1: Automated GitHub Actions (Recommended)

1. **Push to GitHub:**
```bash
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/Joshkaki00/finance-dashboard.git
git push -u origin main
```

2. **Enable GitHub Pages:**
   - Go to your repository settings
   - Navigate to "Pages" section
   - Set source to "GitHub Actions"

3. **Update configuration:**
   - `package.json` `homepage` is `https://joshkaki00.github.io/finance-dashboard/`
   - Edit `vite.config.ts` if your repository name is different

The GitHub Action will automatically build and deploy on every push to main.

### Method 2: Manual Deployment

```bash
# Build and deploy manually
npm run deploy
```

This will build the project and push to the `gh-pages` branch.

## 📱 Usage Guide

### Dashboard
- View comprehensive financial overview
- Monitor spending patterns with interactive charts
- Track budget progress with visual indicators
- See recent transaction activity

### Add Transactions
- **Mobile**: Enhanced form with quick amount buttons
- **Tablet**: Visual type selection with category icons
- **Desktop**: Traditional form layout
- Support for both income and expenses

### Transaction Management
- **Mobile**: Card-based layout with swipe-friendly design
- **Desktop**: Sortable table with filtering options
- Filter by type (All, Income, Expenses)
- Delete transactions with confirmation

### Budget Planning
- Set monthly budgets for different categories
- Visual progress tracking with color-coded indicators
- Real-time budget vs. actual spending comparison
- Responsive grid layout for easy management

### Financial Tips
- Integration with API Ninjas for financial wisdom
- Proper loading, error, and empty state handling
- Refresh functionality for new tips

## ♿ Accessibility Features

This application is **WCAG 2.2 Level AA compliant** with the following features:

- **Keyboard Navigation**: Full keyboard accessibility with skip links
- **Screen Reader Support**: Proper ARIA attributes and semantic HTML
- **High Contrast**: Support for high contrast mode
- **Reduced Motion**: Respects user's motion preferences
- **Touch Targets**: Minimum 44×44px touch targets on mobile
- **Focus Management**: Clear focus indicators and logical tab order
- **Color Contrast**: Exceeds WCAG contrast requirements
- **Responsive Text**: Scalable fonts and layouts

## 🧪 Testing

```bash
# Run linting
npm run lint

# Preview production build
npm run preview
```

### Accessibility Testing

Test with:
- Screen readers (NVDA, JAWS, VoiceOver)
- Keyboard navigation (Tab, Enter, Space, Arrow keys)
- Mobile accessibility (iOS VoiceOver, Android TalkBack)
- Color contrast tools
- Lighthouse accessibility audit

## 📁 Project Structure

```
src/
├── components/           # React components
│   ├── Dashboard.tsx    # Main dashboard with charts
│   ├── TransactionForm.tsx
│   ├── TransactionList.tsx
│   ├── BudgetForm.tsx
│   ├── FinancialTips.tsx
│   ├── MobileNavigation.tsx    # Mobile tab navigation
│   ├── TabletNavigation.tsx    # Tablet sidebar navigation
│   ├── MobileDashboard.tsx     # Mobile-optimized dashboard
│   ├── MobileTransactionForm.tsx
│   └── TabletTransactionForm.tsx
├── store/               # Redux store and slices
│   ├── index.ts
│   ├── transactionsSlice.ts
│   ├── budgetSlice.ts
│   ├── categoriesSlice.ts
│   └── financialTipsSlice.ts
├── App.tsx             # Main app with responsive layout
├── main.tsx           # React entry point
├── index.css          # Global styles with accessibility features
└── assets/            # Static assets
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Development Guidelines

- Follow existing code style and patterns
- Maintain WCAG 2.2 accessibility compliance
- Test on mobile, tablet, and desktop breakpoints
- Ensure proper ARIA attributes for new components
- Update tests and documentation as needed

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [API Ninjas](https://api-ninjas.com/) for financial quotes API
- [Recharts](https://recharts.org/) for beautiful, responsive charts
- [Tailwind CSS](https://tailwindcss.com/) for utility-first styling
- [Redux Toolkit](https://redux-toolkit.js.org/) for efficient state management
- [WCAG 2.2](https://www.w3.org/TR/WCAG22/) for accessibility guidelines

## 📊 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🔧 Configuration

### Environment Variables

For production deployment, set up environment variables:

```bash
# .env.local (not committed to git)
VITE_API_NINJAS_KEY=your_api_key_here
```

### Customization

- **Colors**: Update Tailwind config in `tailwind.config.js`
- **Categories**: Modify `src/store/categoriesSlice.ts`
- **API Integration**: Update `src/store/financialTipsSlice.ts`
- **Responsive Breakpoints**: Adjust in component CSS classes

---

**Built with ❤️ for accessible, responsive personal finance management**
- Implementing the API integration with `createAsyncThunk`
- Designing UI components for different states (loading, error, empty)
- Debugging form validation issues
- Creating responsive Tailwind CSS layouts

The AI-generated code was reviewed, understood, and modified to fit project requirements. I have a complete understanding of all the code in this project and made necessary adjustments to ensure it works as expected.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the Apache 2.0 License - see the LICENSE file for details.
