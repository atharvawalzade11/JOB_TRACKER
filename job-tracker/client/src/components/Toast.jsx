const ICONS = {
  success: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
  ),
  error: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  ),
  info: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
};

const STYLES = {
  success: 'bg-emerald-900/80 border-emerald-500/40 text-emerald-300',
  error: 'bg-red-900/80 border-red-500/40 text-red-300',
  info: 'bg-blue-900/80 border-blue-500/40 text-blue-300',
};

const Toast = ({ toast, onRemove }) => (
  <div
    className={`flex items-center gap-3 px-4 py-3 rounded-xl border backdrop-blur-sm shadow-xl text-sm font-medium animate-fade-in ${STYLES[toast.type] || STYLES.info}`}
    onClick={() => onRemove(toast.id)}
    style={{ cursor: 'pointer', minWidth: '280px' }}
  >
    {ICONS[toast.type]}
    <span>{toast.message}</span>
  </div>
);

const ToastContainer = ({ toasts, removeToast }) => {
  if (!toasts.length) return null;
  return (
    <div className="fixed top-5 right-5 z-50 flex flex-col gap-2">
      {toasts.map(t => (
        <Toast key={t.id} toast={t} onRemove={removeToast} />
      ))}
    </div>
  );
};

export default ToastContainer;
