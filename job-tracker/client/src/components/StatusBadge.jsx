const STATUS_STYLES = {
  Applied:   'bg-blue-500/15 text-blue-400 border border-blue-500/30',
  Interview: 'bg-amber-500/15 text-amber-400 border border-amber-500/30',
  Offer:     'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30',
  Rejected:  'bg-red-500/15 text-red-400 border border-red-500/30',
};

const STATUS_DOTS = {
  Applied:   'bg-blue-400',
  Interview: 'bg-amber-400',
  Offer:     'bg-emerald-400',
  Rejected:  'bg-red-400',
};

const StatusBadge = ({ status, size = 'sm' }) => {
  return (
    <span className={`status-badge ${STATUS_STYLES[status] || ''}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${STATUS_DOTS[status] || 'bg-gray-400'}`} />
      {status}
    </span>
  );
};

export default StatusBadge;
