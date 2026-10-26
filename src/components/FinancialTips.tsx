import { generatePersonalizedTips } from '../store/financialTipsSlice';
import { useAppSelector } from '../store/hooks';
import type { FinancialTipKind } from '../types';

const tipTone: Record<FinancialTipKind, string> = {
  positive: 'border-green-500 bg-green-50',
  warning: 'border-red-500 bg-red-50',
  caution: 'border-amber-500 bg-amber-50',
  info: 'border-blue-500 bg-white',
};

const FinancialTips = () => {
  const transactions = useAppSelector((state) => state.transactions.transactions);
  const budget = useAppSelector((state) => state.budget);
  const tips = generatePersonalizedTips(transactions, budget);

  return (
    <section className="bg-white p-4 sm:p-6 rounded-lg shadow-md" aria-labelledby="financial-insights-heading">
      <h2 id="financial-insights-heading" className="text-lg sm:text-xl font-semibold text-gray-800">
        Your Financial Insights
      </h2>
      <p className="text-sm text-gray-500 mt-1 mb-4">
        Based on your spending patterns and budgets
      </p>

      <ul className="space-y-3">
        {tips.map((tip) => (
          <li
            key={`${tip.title}-${tip.icon}`}
            className={`flex gap-3 rounded-lg border-l-4 p-4 ${tipTone[tip.type]}`}
          >
            <span aria-hidden="true" className="text-2xl leading-none">{tip.icon}</span>
            <div>
              <h3 className="font-semibold text-gray-900">{tip.title}</h3>
              <p className="text-sm text-gray-700 mt-1 leading-relaxed">{tip.description}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default FinancialTips;
