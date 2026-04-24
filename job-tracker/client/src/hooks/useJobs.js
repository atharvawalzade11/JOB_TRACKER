import { useState, useCallback } from 'react';
import api from '../utils/api';

export const useJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [stats, setStats] = useState({ total: 0, Applied: 0, Interview: 0, Offer: 0, Rejected: 0 });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchJobs = useCallback(async (filters = {}) => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      if (filters.status && filters.status !== 'All') params.append('status', filters.status);
      if (filters.search) params.append('search', filters.search);
      const res = await api.get(`/jobs?${params.toString()}`);
      setJobs(res.data.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch jobs');
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchStats = useCallback(async () => {
    try {
      const res = await api.get('/jobs/stats');
      setStats(res.data.data);
    } catch (err) {
      console.error('Failed to fetch stats:', err);
    }
  }, []);

  const createJob = useCallback(async (jobData) => {
    const res = await api.post('/jobs', jobData);
    return res.data;
  }, []);

  const updateJob = useCallback(async (id, jobData) => {
    const res = await api.put(`/jobs/${id}`, jobData);
    return res.data;
  }, []);

  const deleteJob = useCallback(async (id) => {
    const res = await api.delete(`/jobs/${id}`);
    return res.data;
  }, []);

  return {
    jobs, stats, loading, error,
    fetchJobs, fetchStats, createJob, updateJob, deleteJob
  };
};
