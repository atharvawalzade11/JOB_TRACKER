import { useState, useEffect } from 'react';

const STATUS_OPTIONS = ['Applied', 'Interview', 'Offer', 'Rejected'];

const defaultForm = {
  company: '',
  role: '',
  status: 'Applied',
  dateApplied: new Date().toISOString().split('T')[0],
  notes: ''
};

const JobForm = ({ isOpen, onClose, onSubmit, editJob, loading }) => {
  const [form, setForm] = useState(defaultForm);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editJob) {
      setForm({
        company: editJob.company || '',
        role: editJob.role || '',
        status: editJob.status || 'Applied',
        dateApplied: editJob.dateApplied
          ? new Date(editJob.dateApplied).toISOString().split('T')[0]
          : new Date().toISOString().split('T')[0],
        notes: editJob.notes || ''
      });
    } else {
      setForm(defaultForm);
    }
    setErrors({});
  }, [editJob, isOpen]);

  const validate = () => {
    const errs = {};
    if (!form.company.trim()) errs.company = 'Company name is required';
    if (!form.role.trim()) errs.role = 'Role is required';
    if (!form.dateApplied) errs.dateApplied = 'Date is required';
    return errs;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    await onSubmit(form);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-lg bg-dark-800 border border-dark-500 rounded-2xl shadow-2xl animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-dark-600">
          <div>
            <h2 className="text-lg font-bold text-white">
              {editJob ? 'Edit Application' : 'Add Application'}
            </h2>
            <p className="text-sm text-gray-500 mt-0.5">
              {editJob ? 'Update your job application details' : 'Track a new job application'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-500 hover:text-gray-200 hover:bg-dark-700 rounded-xl transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Company */}
          <div>
            <label className="label">Company Name *</label>
            <input
              name="company"
              value={form.company}
              onChange={handleChange}
              placeholder="e.g. Google, Amazon, Stripe..."
              className={`input-field ${errors.company ? 'border-red-500 focus:border-red-500' : ''}`}
            />
            {errors.company && <p className="text-xs text-red-400 mt-1">{errors.company}</p>}
          </div>

          {/* Role */}
          <div>
            <label className="label">Role / Position *</label>
            <input
              name="role"
              value={form.role}
              onChange={handleChange}
              placeholder="e.g. Senior Frontend Engineer..."
              className={`input-field ${errors.role ? 'border-red-500 focus:border-red-500' : ''}`}
            />
            {errors.role && <p className="text-xs text-red-400 mt-1">{errors.role}</p>}
          </div>

          {/* Status + Date in a row */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label">Status</label>
              <select
                name="status"
                value={form.status}
                onChange={handleChange}
                className="input-field"
              >
                {STATUS_OPTIONS.map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="label">Date Applied *</label>
              <input
                type="date"
                name="dateApplied"
                value={form.dateApplied}
                onChange={handleChange}
                className={`input-field ${errors.dateApplied ? 'border-red-500' : ''}`}
              />
              {errors.dateApplied && <p className="text-xs text-red-400 mt-1">{errors.dateApplied}</p>}
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="label">Notes <span className="text-gray-600 normal-case">(optional)</span></label>
            <textarea
              name="notes"
              value={form.notes}
              onChange={handleChange}
              rows={3}
              placeholder="Add any notes, contacts, links, salary info..."
              className="input-field resize-none"
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="btn-secondary flex-1">
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="btn-primary flex-1 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Saving...
                </>
              ) : editJob ? 'Save Changes' : 'Add Application'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default JobForm;
