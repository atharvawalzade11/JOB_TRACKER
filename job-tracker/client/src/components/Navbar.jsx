import { useAuth } from '../context/AuthContext';

const Navbar = ({ onMenuToggle }) => {
  const { user, logout } = useAuth();

  return (
    <header className="h-16 border-b border-dark-600 bg-dark-800/80 backdrop-blur-md flex items-center justify-between px-6 sticky top-0 z-30">
      {/* Left: hamburger + brand */}
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuToggle}
          className="lg:hidden p-2 rounded-lg hover:bg-dark-700 text-gray-400 hover:text-gray-100 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-primary-600 flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <span className="text-lg font-bold text-white">JobTrackr</span>
        </div>
      </div>

      {/* Right: user info + logout */}
      <div className="flex items-center gap-3">
        <div className="hidden sm:flex items-center gap-2 bg-dark-700 border border-dark-500 rounded-xl px-3 py-1.5">
          <div className="w-6 h-6 rounded-full bg-primary-600/30 border border-primary-500/40 flex items-center justify-center text-xs font-bold text-primary-400">
            {user?.name?.[0]?.toUpperCase()}
          </div>
          <span className="text-sm text-gray-300 font-medium">{user?.name}</span>
        </div>
        <button
          onClick={logout}
          className="flex items-center gap-2 text-sm text-gray-400 hover:text-red-400 hover:bg-red-500/10 px-3 py-2 rounded-xl border border-transparent hover:border-red-500/20 transition-all"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          <span className="hidden sm:inline">Logout</span>
        </button>
      </div>
    </header>
  );
};

export default Navbar;
