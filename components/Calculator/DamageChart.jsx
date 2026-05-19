'use client';

import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

function getCategoryColor(category) {
  const colors = {
    'Back Pay': '#3b82f6',
    'Front Pay': '#10b981',
    'Emotional Distress': '#f59e0b',
    'Punitive Damages': '#ef4444',
    'Attorney Fees': '#8b5cf6',
  };
  return colors[category] || '#64748b';
}

export default function DamageChart({ damageCategories }) {
  if (!damageCategories?.length) return null;

  const chartData = damageCategories
    .filter(cat => cat.estimatedRange && cat.estimatedRange !== 'N/A')
    .map(cat => {
      const range = cat.estimatedRange.replace(/[$,]/g, '').split(' - ');
      const low = parseFloat(range[0]) || 0;
      const high = parseFloat(range[1]) || low;
      return { label: cat.category, value: (low + high) / 2, color: getCategoryColor(cat.category) };
    })
    .filter(item => item.value > 0);

  if (chartData.length === 0) return null;

  const data = {
    labels: chartData.map(item => item.label),
    datasets: [{
      data: chartData.map(item => item.value),
      backgroundColor: chartData.map(item => item.color),
      borderWidth: 2,
      borderColor: '#ffffff',
      hoverBorderWidth: 3,
    }],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          padding: 15,
          font: { size: 12, family: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' },
          color: '#1a2744',
        },
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            const value = context.parsed;
            const total = context.dataset.data.reduce((a, b) => a + b, 0);
            const pct = ((value / total) * 100).toFixed(1);
            return `${context.label}: $${value.toLocaleString()} (${pct}%)`;
          },
        },
      },
    },
    cutout: '60%',
  };

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-card p-6">
      <h3 className="font-serif text-navy text-lg font-bold mb-4 text-center">Damage Breakdown</h3>
      <div className="relative h-64">
        <Doughnut data={data} options={options} />
      </div>
    </div>
  );
}
