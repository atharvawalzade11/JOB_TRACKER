import StatusBadge from './StatusBadge';

const JobCard = ({ job, onEdit, onDelete }) => {
  const dateStr = new Date(job.dateApplied).toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric'
  });

  return (
    <div className="card p-5 hover:border-primary-500/30 transition-all duration-200 group animate-fade-in">
      <div className="flex items-start justify-between gap-3 mb-3">
        {/* Company + Role */}
        <div className="min-w-0">
          <h3 className="font-bold text-white text-base truncate group-hover:text-primary-300 transition-colors">
            {job.company}
          </h3>
          <p className="text-sm text-gray-400 truncate mt-0.5">{job.role}</p>
        </div>
        <StatusBadge status={job.status} />
      </div>

      {/* Date */}
      <div className="flex items-center gap-1.5 text-xs text-gray-600 mb-3">
        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        {dateStr}
      </div>

      {/* Notes */}
      {job.notes && (
        <p className="text-xs text-gray-500 bg-dark-700 rounded-lg px-3 py-2 mb-4 line-clamp-2">
          {job.notes}
        </p>
      )}

      {/* Actions */}
      <div className="flex gap-2 pt-2 border-t border-dark-600">
        <button
          onClick={() => onEdit(job)}
          className="flex-1 flex items-center justify-center gap-1.5 text-xs font-medium text-gray-400 hover:text-primary-400 hover:bg-primary-500/10 py-1.5 rounded-lg transition-all"
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
          Edit
        </button>
        <button
          onClick={() => onDelete(job._id)}
          className="flex-1 flex items-center justify-center gap-1.5 text-xs font-medium text-gray-500 hover:text-red-400 hover:bg-red-500/10 py-1.5 rounded-lg transition-all"
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
          Delete
        </button>
      </div>
    </div>
  );
};

export default JobCard;
