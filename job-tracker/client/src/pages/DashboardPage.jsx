import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useJobs } from '../hooks/useJobs';
import StatsCards from '../components/StatsCards';
import ChartSection from '../components/ChartSection';
import JobCard from '../components/JobCard';
import JobForm from '../components/JobForm';
import ToastContainer from '../components/Toast';
import { useToast } from '../hooks/useToast';
import { useState } from 'react';

const DashboardPage = () => {
  const { user } = useAuth();
  const { jobs, stats, loading, fetchJobs, fetchStats, createJob, updateJob, deleteJob } = useJobs();
  const { toasts, addToast, removeToast } = useToast();
  const [formOpen, setFormOpen] = useState(false);
  const [editJob, setEditJob] = useState(null);
  const [formLoading, setFormLoading] = useState(false);

  useEffect(() => {
    fetchJobs();
    fetchStats();
  }, []);

  const recentJobs = jobs.slice(0, 6);

  const handleAddSubmit = async (data) => {
    setFormLoading(true);
    try {
      await createJob(data);
      addToast('Application added!', 'success');
      setFormOpen(false);
      fetchJobs();
      fetchStats();
    } catch (err) {
      addToast(err.response?.data?.message || 'Failed to add application', 'error');
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
      fetchJobs();
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
      fetchJobs();
      fetchStats();
    } catch {
      addToast('Failed to delete', 'error');
    }
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <ToastContainer toasts={toasts} removeToast={removeToast} />

      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white">
            {getGreeting()}, {user?.name?.split(' ')[0]} 👋
          </h1>
          <p className="text-gray-500 mt-1 text-sm">
            Here's an overview of your job search progress
          </p>
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

      {/* Stats */}
      <StatsCards stats={stats} />

      {/* Charts */}
      <div>
        <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">Analytics</h2>
        <ChartSection stats={stats} />
      </div>

      {/* Recent Applications */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Recent Applications</h2>
          {jobs.length > 6 && (
            <Link to="/jobs" className="text-xs text-primary-400 hover:text-primary-300 font-medium transition-colors">
              View all →
            </Link>
          )}
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="card p-5 h-40 animate-pulse">
                <div className="h-4 bg-dark-600 rounded w-3/4 mb-3" />
                <div className="h-3 bg-dark-600 rounded w-1/2 mb-6" />
                <div className="h-3 bg-dark-600 rounded w-1/3" />
              </div>
            ))}
          </div>
        ) : recentJobs.length === 0 ? (
          <div className="card p-12 text-center">
            <div className="w-16 h-16 rounded-2xl bg-dark-700 flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <p className="text-gray-400 font-semibold mb-1">No applications yet</p>
            <p className="text-gray-600 text-sm mb-5">Start tracking your job applications to see them here</p>
            <button onClick={() => setFormOpen(true)} className="btn-primary mx-auto">
              Add Your First Application
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 stagger">
            {recentJobs.map(job => (
              <JobCard
                key={job._id}
                job={job}
                onEdit={(j) => setEditJob(j)}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </div>

      {/* Forms */}
      <JobForm
        isOpen={formOpen}
        onClose={() => setFormOpen(false)}
        onSubmit={handleAddSubmit}
        loading={formLoading}
      />
      <JobForm
        isOpen={!!editJob}
        onClose={() => setEditJob(null)}
        onSubmit={handleEditSubmit}
        editJob={editJob}
        loading={formLoading}
      />
    </div>
  );
};

export default DashboardPage;
