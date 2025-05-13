# Personal Finance Dashboard

A modern, responsive web application for managing personal finances, built with React, Redux, and Tailwind CSS.

## Features

- 📊 Interactive dashboard with financial overview
- 💰 Transaction management (add, view, and track expenses)
- 📈 Budget planning and tracking
- 🎨 Modern, responsive UI with Tailwind CSS
- 🔄 Real-time state management with Redux
- 💡 Financial tips from external API
- ✨ Proper handling of loading, empty, and error states

## Tech Stack

- React
- Redux Toolkit for state management
- Redux Thunk for asynchronous operations
- Tailwind CSS for styling
- Vite for build tooling
- ESLint for code quality
- API Ninjas for financial quotes

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- API Ninjas API key (for financial tips)

### Installation

1. Clone the repository:
```bash
git clone [repository-url]
cd finance-dashboard
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Set up your API key:
   - Get a free API key from [API Ninjas](https://api-ninjas.com/)
   - In `src/store/financialTipsSlice.js`, replace 'YOUR_API_NINJAS_KEY' with your actual API key
   - For production, set up proper environment variables

4. Start the development server:
```bash
npm run dev
# or
yarn dev
```

5. Open your browser and navigate to `http://localhost:5173`

## Usage

### Dashboard
- View your financial overview
- Track spending patterns
- Monitor budget progress

### Transactions
- Add new transactions with details
- View transaction history
- Filter transactions by type (income/expense)

### Budget Management
- Set monthly budgets
- Track spending against budgets
- Adjust budget allocations

### Financial Tips
- View financial wisdom and quotes
- Refresh for new tips
- See loading and error states

## Responsible AI Usage

In the development of this project, AI was used responsibly in the following ways:

- Generating the initial structure of Redux slices and components
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

This project is licensed under the MIT License - see the LICENSE file for details.
