import { useEffect, useState, useCallback } from 'react';
import { useJobs } from '../hooks/useJobs';
import { useToast } from '../hooks/useToast';
import JobCard from '../components/JobCard';
import JobForm from '../components/JobForm';
import StatusBadge from '../components/StatusBadge';
import ToastContainer from '../components/Toast';

const STATUSES = ['All', 'Applied', 'Interview', 'Offer', 'Rejected'];

const JobsPage = () => {
  const { jobs, loading, fetchJobs, fetchStats, createJob, updateJob, deleteJob } = useJobs();
  const { toasts, addToast, removeToast } = useToast();
  const [formOpen, setFormOpen] = useState(false);
  const [editJob, setEditJob] = useState(null);
  const [formLoading, setFormLoading] = useState(false);
  const [filters, setFilters] = useState({ status: 'All', search: '' });
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'table'
  const [searchInput, setSearchInput] = useState('');

  useEffect(() => {
    fetchJobs(filters);
  }, [filters]);

  const handleSearch = useCallback((e) => {
    e.preventDefault();
    setFilters(prev => ({ ...prev, search: searchInput }));
  }, [searchInput]);

  const handleSearchInput = (e) => {
    setSearchInput(e.target.value);
    if (e.target.value === '') setFilters(prev => ({ ...prev, search: '' }));
  };

  const handleStatusFilter = (status) => {
    setFilters(prev => ({ ...prev, status }));
  };

  const handleAddSubmit = async (data) => {
    setFormLoading(true);
    try {
      await createJob(data);
      addToast('Application added!', 'success');
      setFormOpen(false);
      fetchJobs(filters);
      fetchStats();
    } catch (err) {
      addToast(err.response?.data?.message || 'Failed to add', 'error');
    } finally {
      setFormLoading(false);
    }
  };

  const handleEditSubmit = async (data) => {
    setFormLoading(true);
    try {
      await updateJob(editJob._id, data);
      addToast('Application updated!', 'success');
      setEditJob(null);
      fetchJobs(filters);
      fetchStats();
    } catch (err) {
      addToast(err.response?.data?.message || 'Failed to update', 'error');
    } finally {
      setFormLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this application?')) return;
    try {
      await deleteJob(id);
      addToast('Application deleted', 'info');
      fetchJobs(filters);
      fetchStats();
    } catch {
      addToast('Failed to delete', 'error');
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <ToastContainer toasts={toasts} removeToast={removeToast} />

      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white">My Applications</h1>
          <p className="text-gray-500 text-sm mt-1">{jobs.length} application{jobs.length !== 1 ? 's' : ''} found</p>
        </div>
        <button
          onClick={() => setFormOpen(true)}
          className="btn-primary flex items-center gap-2 shrink-0"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
          </svg>
          Add Job
        </button>
      </div>

      {/* Filters bar */}
      <div className="card p-4 flex flex-col sm:flex-row gap-4">
        {/* Search */}
        <form onSubmit={handleSearch} className="flex-1 flex gap-2">
          <div className="relative flex-1">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              value={searchInput}
              onChange={handleSearchInput}
              placeholder="Search by company..."
              className="input-field pl-9"
            />
          </div>
          <button type="submit" className="btn-secondary px-4">Search</button>
        </form>

        {/* View toggle */}
        <div className="flex items-center gap-1 bg-dark-700 rounded-xl p-1 border border-dark-500">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-dark-500 text-white' : 'text-gray-500 hover:text-gray-300'}`}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
          </button>
          <button
            onClick={() => setViewMode('table')}
            className={`p-2 rounded-lg transition-all ${viewMode === 'table' ? 'bg-dark-500 text-white' : 'text-gray-500 hover:text-gray-300'}`}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Status filter tabs */}
      <div className="flex gap-2 flex-wrap">
        {STATUSES.map(s => (
          <button
            key={s}
            onClick={() => handleStatusFilter(s)}
            className={`px-4 py-2 rounded-xl text-sm font-semibold border transition-all duration-200 ${
              filters.status === s
                ? 'bg-primary-600/20 text-primary-400 border-primary-500/40'
                : 'bg-dark-800 text-gray-500 border-dark-600 hover:text-gray-300 hover:border-dark-400'
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      {/* Content */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="card p-5 h-40 animate-pulse">
              <div className="h-4 bg-dark-600 rounded w-3/4 mb-3" />
              <div className="h-3 bg-dark-600 rounded w-1/2 mb-6" />
              <div className="h-3 bg-dark-600 rounded w-1/3" />
            </div>
          ))}
        </div>
      ) : jobs.length === 0 ? (
        <div className="card p-14 text-center">
          <div className="w-16 h-16 rounded-2xl bg-dark-700 flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <p className="text-gray-400 font-semibold mb-1">No applications found</p>
          <p className="text-gray-600 text-sm">Try adjusting your filters or add a new application</p>
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 stagger">
          {jobs.map(job => (
            <JobCard
              key={job._id}
              job={job}
              onEdit={setEditJob}
              onDelete={handleDelete}
            />
          ))}
        </div>
      ) : (
        /* Table view */
        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-dark-600 bg-dark-700/50">
                  <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-5 py-3">Company</th>
                  <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-5 py-3">Role</th>
                  <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-5 py-3">Status</th>
                  <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-5 py-3">Date Applied</th>
                  <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-5 py-3">Notes</th>
                  <th className="px-5 py-3" />
                </tr>
              </thead>
              <tbody className="divide-y divide-dark-600">
                {jobs.map(job => (
                  <tr key={job._id} className="hover:bg-dark-700/40 transition-colors group">
                    <td className="px-5 py-4 font-semibold text-white">{job.company}</td>
                    <td className="px-5 py-4 text-gray-400">{job.role}</td>
                    <td className="px-5 py-4"><StatusBadge status={job.status} /></td>
                    <td className="px-5 py-4 text-gray-500 font-mono text-xs">
                      {new Date(job.dateApplied).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </td>
                    <td className="px-5 py-4 text-gray-600 max-w-[200px] truncate">{job.notes || '—'}</td>
                    <td className="px-5 py-4">
                      <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onClick={() => setEditJob(job)} className="text-xs text-primary-400 hover:text-primary-300 font-medium">Edit</button>
                        <button onClick={() => handleDelete(job._id)} className="text-xs text-red-500 hover:text-red-400 font-medium">Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Forms */}
      <JobForm isOpen={formOpen} onClose={() => setFormOpen(false)} onSubmit={handleAddSubmit} loading={formLoading} />
      <JobForm isOpen={!!editJob} onClose={() => setEditJob(null)} onSubmit={handleEditSubmit} editJob={editJob} loading={formLoading} />
    </div>
  );
};

export default JobsPage;
