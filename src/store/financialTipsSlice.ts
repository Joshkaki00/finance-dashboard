import type { BudgetMap, FinancialTip, Transaction } from '../types';

function label(category: string): string {
  if (category.length === 0) return category;
  return category.charAt(0).toUpperCase() + category.slice(1);
}

function money(amount: number): string {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
}

export function generatePersonalizedTips(
  transactions: Transaction[],
  budgets: BudgetMap,
): FinancialTip[] {
  const tips: FinancialTip[] = [];
  const expensesByCategory: Record<string, number> = {};

  const incomeTotal = transactions
    .filter((transaction) => transaction.type === 'income')
    .reduce((sum, transaction) => sum + transaction.amount, 0);
  const expensesTotal = transactions
    .filter((transaction) => transaction.type === 'expense')
    .reduce((sum, transaction) => sum + transaction.amount, 0);

  transactions
    .filter((transaction) => transaction.type === 'expense')
    .forEach((transaction) => {
      expensesByCategory[transaction.category] = (expensesByCategory[transaction.category] ?? 0) + transaction.amount;
    });

  const balance = incomeTotal - expensesTotal;
  if (incomeTotal > 0 && balance > 0) {
    const savingsRate = ((balance / incomeTotal) * 100).toFixed(0);
    tips.push({
      icon: '💰',
      title: 'Great Savings Rate!',
      description: `You're saving ${savingsRate}% of your income. Keep it up! Financial experts recommend saving at least 20% of your income.`,
      type: 'positive',
    });
  } else if (balance < 0) {
    tips.push({
      icon: '⚠️',
      title: 'Spending Alert',
      description: `You're spending ${money(Math.abs(balance))} more than you earn. Try cutting back on non-essential expenses to get back on track.`,
      type: 'warning',
    });
  }

  Object.keys(budgets).forEach((category) => {
    const spent = expensesByCategory[category] ?? 0;
    const budgeted = budgets[category] ?? 0;
    if (budgeted > 0) {
      const percentage = (spent / budgeted) * 100;

      if (percentage > 100) {
        tips.push({
          icon: '🚨',
          title: `${label(category)} Over Budget`,
          description: `You've spent ${money(spent)} out of ${money(budgeted)} (${percentage.toFixed(0)}%). Consider reducing expenses in this category.`,
          type: 'warning',
        });
      } else if (percentage > 80) {
        tips.push({
          icon: '⚡',
          title: `Watch Your ${label(category)} Spending`,
          description: `You're at ${percentage.toFixed(0)}% of your budget (${money(spent)}/${money(budgeted)}). Be mindful of remaining expenses this month.`,
          type: 'caution',
        });
      }
    }
  });

  const expenseCategories = Object.entries(expensesByCategory);
  const highestCategory = expenseCategories.sort(([, left], [, right]) => right - left)[0];
  if (highestCategory && expensesTotal > 0) {
    const [category, amount] = highestCategory;
    const percentage = ((amount / expensesTotal) * 100).toFixed(0);
    tips.push({
      icon: '📊',
      title: 'Top Spending Category',
      description: `${label(category)} is your highest expense at ${money(amount)} (${percentage}% of total spending). Look for ways to optimize here for maximum impact.`,
      type: 'info',
    });
  }

  if (transactions.length === 0) {
    tips.push({
      icon: '🎯',
      title: 'Get Started!',
      description: 'Start tracking your transactions to get personalized financial insights and recommendations. Add your first transaction to begin.',
      type: 'info',
    });
  } else if (transactions.length < 5) {
    tips.push({
      icon: '📈',
      title: 'Keep Tracking',
      description: `You have ${transactions.length} transaction${transactions.length === 1 ? '' : 's'}. Add more to get better insights into your spending patterns and personalized recommendations.`,
      type: 'info',
    });
  }

  const unbudgetedCategories = Object.keys(expensesByCategory).filter(
    (category) => (budgets[category] ?? 0) === 0,
  );

  if (unbudgetedCategories.length > 0 && transactions.length > 0) {
    tips.push({
      icon: '🎯',
      title: 'Set Up Budgets',
      description: `You have spending in ${unbudgetedCategories.join(', ')} but no budget set. Set a budget for those categories so you can see when you are close to the limit.`,
      type: 'info',
    });
  }

  if (incomeTotal > 0 && expensesTotal > 0) {
    const ratio = (expensesTotal / incomeTotal * 100).toFixed(0);
    if (Number(ratio) < 50) {
      tips.push({
        icon: '🌟',
        title: 'Excellent Financial Discipline',
        description: `You're only spending ${ratio}% of your income. This leaves plenty of room for savings and investments. Consider putting extra funds into an emergency fund or retirement account.`,
        type: 'positive',
      });
    } else if (Number(ratio) > 90) {
      tips.push({
        icon: '💡',
        title: 'High Expense Ratio',
        description: `You're spending ${ratio}% of your income. Try the 50/30/20 rule: 50% for needs, 30% for wants, and 20% for savings.`,
        type: 'caution',
      });
    }
  }

  if (tips.length === 0) {
    tips.push({
      icon: '💡',
      title: 'Start Your Financial Journey',
      description: 'Begin by adding your income and expenses. The more you track, the better the advice you get.',
      type: 'info',
    });
  }

  return tips;
}
