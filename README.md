# Personal Finance Dashboard

**Live:** [https://joshkaki00.github.io/finance-dashboard/](https://joshkaki00.github.io/finance-dashboard/)

A new browser opens with sample finances for Alex Rivera. Anything you add, edit, or delete stays in that browser only. The site is a static GitHub Pages deploy, so there is no server and nothing sleeps on the first load.

A responsive web application for managing personal finances, built with React, TypeScript, Redux, and Tailwind CSS. It includes WCAG 2.2 accessibility support and layouts for mobile, tablet, and desktop.

## Features

- Interactive dashboard with a financial overview and charts
- Transaction management: add, view, filter, and delete
- Budget planning and tracking with progress indicators
- Responsive layouts for mobile, tablet, and desktop
- WCAG 2.2 Level AA accessibility
- Redux Toolkit for state, with SQLite saved in this browser
- Financial tips calculated from your income, spending, and budgets
- Loading, error, and empty states

## Responsive Breakpoints

- **Mobile** (< 768px): bottom tab navigation with card layouts
- **Tablet** (768px - 1279px): sidebar navigation with larger touch targets
- **Desktop** (>= 1280px): multi-column layout

## Tech Stack

- **Frontend**: React 19 with TypeScript
- **State**: Redux Toolkit
- **Persistence**: SQLite WASM in this browser
- **Styling**: Tailwind CSS 4.1
- **Build**: Vite 6
- **Charts**: Recharts
- **Lint**: ESLint with TypeScript type-checking
- **Accessibility**: WCAG 2.2 Level AA
- **Deploy**: GitHub Pages with GitHub Actions

## Live Demo

[https://joshkaki00.github.io/finance-dashboard/](https://joshkaki00.github.io/finance-dashboard/)

## Installation and Setup

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

3. **Start the development server:**
```bash
npm run dev
```

4. **Open your browser:**
   Navigate to `http://localhost:5173/finance-dashboard/`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

## Deployment to GitHub Pages

### Method 1: GitHub Actions

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
   - Navigate to "Pages"
   - Set the source to "GitHub Actions"

3. **Update configuration:**
   - `package.json` `homepage` is `https://joshkaki00.github.io/finance-dashboard/`
   - Edit `vite.config.ts` if your repository name is different

The GitHub Action builds and deploys on every push to main.

### Method 2: Manual Deployment

```bash
npm run deploy
```

This builds the project and pushes to the `gh-pages` branch.

## Usage Guide

### Dashboard

- View the financial overview
- Monitor spending with charts
- Track budget progress
- See recent transactions

### Add Transactions

- **Mobile**: form with quick amount buttons
- **Tablet**: type selection with category icons
- **Desktop**: standard form
- Income and expenses

### Transaction Management

- **Mobile**: card layout
- **Desktop**: filterable list
- Filter by All, Income, or Expenses
- Delete with confirmation

### Budget Planning

- Set a monthly budget for each category
- Color-coded progress
- Budget compared with actual spending

### Financial Tips

- Advice from your income, spending, and budgets
- Savings rate, over-budget warnings, and your highest expense category
- Updates when you add a transaction or change a budget

## Accessibility

WCAG 2.2 Level AA:

- **Keyboard navigation**: skip link and full keyboard access
- **Screen readers**: ARIA attributes and semantic HTML
- **High contrast**: high contrast mode
- **Reduced motion**: follows the user's motion preference
- **Touch targets**: at least 44x44px on mobile
- **Focus**: visible focus and a logical tab order
- **Contrast**: meets WCAG contrast requirements
- **Text**: scalable type and layout

## Testing

```bash
npm run lint
npm run typecheck
npm run preview
```

### Accessibility Testing

- Screen readers (NVDA, JAWS, VoiceOver)
- Keyboard navigation (Tab, Enter, Space, Arrow keys)
- Mobile accessibility (iOS VoiceOver, Android TalkBack)
- Color contrast tools
- Lighthouse accessibility audit

## Project Structure

```
src/
|-- components/
|   |-- Dashboard.tsx
|   |-- TransactionForm.tsx
|   |-- TransactionList.tsx
|   |-- BudgetForm.tsx
|   |-- FinancialTips.tsx
|   |-- MobileNavigation.tsx
|   |-- TabletNavigation.tsx
|   |-- MobileDashboard.tsx
|   |-- MobileTransactionForm.tsx
|   |-- TabletTransactionForm.tsx
|-- store/
|   |-- index.ts
|   |-- transactionsSlice.ts
|   |-- budgetSlice.ts
|   |-- categoriesSlice.ts
|   |-- financialTipsSlice.ts
|-- db/
|   |-- client.ts
|   |-- worker.ts
|-- App.tsx
|-- main.tsx
|-- index.css
|-- assets/
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push the branch (`git push origin feature/AmazingFeature`)
5. Open a pull request

### Development Guidelines

- Follow the existing code style
- Keep WCAG 2.2 accessibility
- Test mobile, tablet, and desktop
- Add ARIA attributes for new components
- Update documentation when behavior changes

## License

Apache License 2.0. See [LICENSE](LICENSE).

## Acknowledgments

- [Recharts](https://recharts.org/) for charts
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Redux Toolkit](https://redux-toolkit.js.org/) for state management
- [WCAG 2.2](https://www.w3.org/TR/WCAG22/) for accessibility guidelines

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Configuration

Financial tips are calculated in the browser from your transactions and budgets. No API key is required.

### Customization

- **Colors**: Tailwind classes in the components
- **Categories**: `src/store/categoriesSlice.ts`
- **Tips**: `src/store/financialTipsSlice.ts`
- **Breakpoints**: component layout classes
