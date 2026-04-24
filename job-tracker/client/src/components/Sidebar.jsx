import { NavLink } from 'react-router-dom';

const navItems = [
  {
    to: '/dashboard',
    label: 'Dashboard',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    )
  },
  {
    to: '/jobs',
    label: 'My Applications',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
      </svg>
    )
  },
];

const STATUS_INFO = [
  { label: 'Applied', color: 'bg-blue-400' },
  { label: 'Interview', color: 'bg-amber-400' },
  { label: 'Offer', color: 'bg-emerald-400' },
  { label: 'Rejected', color: 'bg-red-400' },
];

const Sidebar = ({ isOpen, onClose }) => {
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-20 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-full w-64 bg-dark-800 border-r border-dark-600 z-30
          transform transition-transform duration-300 ease-in-out
          lg:translate-x-0 lg:static lg:block
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        {/* Brand (mobile only — desktop shows in navbar) */}
        <div className="h-16 flex items-center px-6 border-b border-dark-600 lg:hidden">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-primary-600 flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <span className="text-lg font-bold text-white">JobTrackr</span>
          </div>
        </div>

        {/* Nav */}
        <nav className="p-4 space-y-1 mt-2">
          <p className="text-xs font-semibold text-gray-600 uppercase tracking-widest px-3 mb-3">Navigation</p>
          {navItems.map(item => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-primary-600/20 text-primary-400 border border-primary-500/30'
                    : 'text-gray-400 hover:text-gray-100 hover:bg-dark-700'
                }`
              }
            >
              {item.icon}
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Status legend */}
        <div className="p-4 mx-4 mt-4 rounded-xl bg-dark-700/50 border border-dark-500">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3">Status Legend</p>
          <div className="space-y-2">
            {STATUS_INFO.map(s => (
              <div key={s.label} className="flex items-center gap-2.5">
                <span className={`w-2 h-2 rounded-full ${s.color}`} />
                <span className="text-xs text-gray-400">{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="absolute bottom-4 left-4 right-4">
          <div className="text-xs text-gray-600 text-center">
            JobTrackr v1.0 · Your career command center
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
