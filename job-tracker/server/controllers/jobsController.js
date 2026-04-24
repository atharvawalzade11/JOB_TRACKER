const Job = require('../models/Job');

// @desc    Get all jobs for logged-in user
// @route   GET /api/jobs
// @access  Private
const getJobs = async (req, res) => {
  try {
    const { status, search } = req.query;

    // Build query
    let query = { user: req.user._id };

    if (status && status !== 'All') {
      query.status = status;
    }

    if (search) {
      query.company = { $regex: search, $options: 'i' };
    }

    const jobs = await Job.find(query).sort({ createdAt: -1 });

    res.json({
      success: true,
      count: jobs.length,
      data: jobs
    });
  } catch (err) {
    console.error('Get jobs error:', err);
    res.status(500).json({ success: false, message: 'Server error fetching jobs' });
  }
};

// @desc    Get single job
// @route   GET /api/jobs/:id
// @access  Private
const getJob = async (req, res) => {
  try {
    const job = await Job.findOne({ _id: req.params.id, user: req.user._id });

    if (!job) {
      return res.status(404).json({ success: false, message: 'Job not found' });
    }

    res.json({ success: true, data: job });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// @desc    Create job
// @route   POST /api/jobs
// @access  Private
const createJob = async (req, res) => {
  try {
    const { company, role, status, dateApplied, notes } = req.body;

    if (!company || !role) {
      return res.status(400).json({
        success: false,
        message: 'Company name and role are required'
      });
    }

    const job = await Job.create({
      user: req.user._id,
      company,
      role,
      status: status || 'Applied',
      dateApplied: dateApplied || Date.now(),
      notes: notes || ''
    });

    res.status(201).json({
      success: true,
      message: 'Job application added successfully!',
      data: job
    });
  } catch (err) {
    console.error('Create job error:', err);
    res.status(500).json({ success: false, message: 'Server error creating job' });
  }
};

// @desc    Update job
// @route   PUT /api/jobs/:id
// @access  Private
const updateJob = async (req, res) => {
  try {
    let job = await Job.findOne({ _id: req.params.id, user: req.user._id });

    if (!job) {
      return res.status(404).json({ success: false, message: 'Job not found' });
    }

    job = await Job.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.json({
      success: true,
      message: 'Job updated successfully!',
      data: job
    });
  } catch (err) {
    console.error('Update job error:', err);
    res.status(500).json({ success: false, message: 'Server error updating job' });
  }
};

// @desc    Delete job
// @route   DELETE /api/jobs/:id
// @access  Private
const deleteJob = async (req, res) => {
  try {
    const job = await Job.findOne({ _id: req.params.id, user: req.user._id });

    if (!job) {
      return res.status(404).json({ success: false, message: 'Job not found' });
    }

    await Job.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'Job deleted successfully!'
    });
  } catch (err) {
    console.error('Delete job error:', err);
    res.status(500).json({ success: false, message: 'Server error deleting job' });
  }
};

// @desc    Get job stats
// @route   GET /api/jobs/stats
// @access  Private
const getStats = async (req, res) => {
  try {
    const stats = await Job.aggregate([
      { $match: { user: req.user._id } },
      { $group: { _id: '$status', count: { $sum: 1 } } }
    ]);

    const total = await Job.countDocuments({ user: req.user._id });

    const formattedStats = {
      total,
      Applied: 0,
      Interview: 0,
      Offer: 0,
      Rejected: 0
    };

    stats.forEach(s => {
      formattedStats[s._id] = s.count;
    });

    res.json({ success: true, data: formattedStats });
  } catch (err) {
    console.error('Stats error:', err);
    res.status(500).json({ success: false, message: 'Server error fetching stats' });
  }
};

module.exports = { getJobs, getJob, createJob, updateJob, deleteJob, getStats };
