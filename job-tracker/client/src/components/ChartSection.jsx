import {
  Chart as ChartJS,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js';
import { Doughnut, Bar } from 'react-chartjs-2';

ChartJS.register(ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const COLORS = {
  Applied:   { bg: 'rgba(59,130,246,0.7)',   border: 'rgba(59,130,246,1)' },
  Interview: { bg: 'rgba(245,158,11,0.7)',   border: 'rgba(245,158,11,1)' },
  Offer:     { bg: 'rgba(16,185,129,0.7)',   border: 'rgba(16,185,129,1)' },
  Rejected:  { bg: 'rgba(239,68,68,0.7)',    border: 'rgba(239,68,68,1)' },
};

const STATUSES = ['Applied', 'Interview', 'Offer', 'Rejected'];

const ChartSection = ({ stats }) => {
  const counts = STATUSES.map(s => stats[s] || 0);
  const hasData = counts.some(c => c > 0);

  const doughnutData = {
    labels: STATUSES,
    datasets: [{
      data: counts,
      backgroundColor: STATUSES.map(s => COLORS[s].bg),
      borderColor: STATUSES.map(s => COLORS[s].border),
      borderWidth: 1.5,
      hoverOffset: 6,
    }]
  };

  const barData = {
    labels: STATUSES,
    datasets: [{
      label: 'Applications',
      data: counts,
      backgroundColor: STATUSES.map(s => COLORS[s].bg),
      borderColor: STATUSES.map(s => COLORS[s].border),
      borderWidth: 1.5,
      borderRadius: 8,
      borderSkipped: false,
    }]
  };

  const commonOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: '#9ca3af',
          font: { family: 'Plus Jakarta Sans', size: 12 },
          padding: 16,
          usePointStyle: true,
          pointStyleWidth: 8,
        }
      },
      tooltip: {
        backgroundColor: '#1a1a27',
        borderColor: '#2e2e4a',
        borderWidth: 1,
        titleColor: '#e5e7eb',
        bodyColor: '#9ca3af',
        padding: 12,
        cornerRadius: 8,
      }
    }
  };

  const barOptions = {
    ...commonOptions,
    scales: {
      y: {
        beginAtZero: true,
        ticks: { color: '#6b7280', stepSize: 1, font: { family: 'JetBrains Mono', size: 11 } },
        grid: { color: 'rgba(255,255,255,0.05)' },
        border: { color: 'transparent' }
      },
      x: {
        ticks: { color: '#9ca3af', font: { family: 'Plus Jakarta Sans', size: 12 } },
        grid: { display: false },
        border: { color: 'transparent' }
      }
    }
  };

  if (!hasData) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {[1, 2].map(i => (
          <div key={i} className="card p-6 flex flex-col items-center justify-center h-64 text-gray-600">
            <svg className="w-12 h-12 mb-3 opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            <p className="text-sm">Add applications to see charts</p>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="card p-6">
        <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-5">Status Distribution</h3>
        <div style={{ height: '220px' }}>
          <Doughnut data={doughnutData} options={commonOptions} />
        </div>
      </div>
      <div className="card p-6">
        <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-5">Applications by Status</h3>
        <div style={{ height: '220px' }}>
          <Bar data={barData} options={barOptions} />
        </div>
      </div>
    </div>
  );
};

export default ChartSection;
