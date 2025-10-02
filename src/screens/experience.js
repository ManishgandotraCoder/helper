import { useState, useEffect } from 'react';
import { useSnackbar } from 'notistack';

const Experience = () => {
    const { enqueueSnackbar } = useSnackbar();
    const [experiences, setExperiences] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isAdding, setIsAdding] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [newExperience, setNewExperience] = useState({
        title: '',
        company: '',
        location: '',
        from: '',
        to: '',
        description: ''
    });
    const [editExperience, setEditExperience] = useState({
        title: '',
        company: '',
        location: '',
        from: '',
        to: '',
        description: ''
    });

    useEffect(() => {
        loadExperiences();
    }, []);

    const loadExperiences = async () => {
        try {
            // First check localStorage for any saved experiences
            const savedExperiences = localStorage.getItem('experiences');
            if (savedExperiences) {
                setExperiences(JSON.parse(savedExperiences));
                setLoading(false);
                return;
            }

            // If no saved experiences, load from db.json
            const response = await fetch('/db.json');
            const data = await response.json();
            const experiencesData = data.experiences || [];
            setExperiences(experiencesData);

            // Save to localStorage for future persistence
            localStorage.setItem('experiences', JSON.stringify(experiencesData));
        } catch (error) {
            console.error('Error loading experiences:', error);
        } finally {
            setLoading(false);
        }
    };

    const saveToLocalStorage = (experiencesData) => {
        localStorage.setItem('experiences', JSON.stringify(experiencesData));
    };

    const formatDate = (dateString) => {
        if (dateString === 'Present') return 'Present';
        const [year, month] = dateString.split('-');
        const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
            'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        return `${monthNames[parseInt(month) - 1]} ${year}`;
    };

    const copyToClipboard = (text, type) => {
        navigator.clipboard.writeText(text).then(() => {
            enqueueSnackbar(`${type} copied to clipboard!`, { variant: 'success' });
        });
    };

    const handleInputChange = (field, value) => {
        console.log(`Updating ${field} to:`, value);
        setNewExperience(prev => {
            const updated = {
                ...prev,
                [field]: value
            };
            console.log('New experience state:', updated);
            return updated;
        });
    };

    const addExperience = () => {
        // Validation
        if (!newExperience.title.trim()) {
            enqueueSnackbar('Please enter a job title.', { variant: 'error' });
            return;
        }
        if (!newExperience.company.trim()) {
            enqueueSnackbar('Please enter a company name.', { variant: 'error' });
            return;
        }
        if (!newExperience.from) {
            enqueueSnackbar('Please select a start date.', { variant: 'error' });
            return;
        }

        try {
            // Generate new ID based on existing experiences
            const existingIds = experiences.map(exp => exp.id);
            const newId = existingIds.length > 0 ? Math.max(...existingIds) + 1 : 1;

            const experienceToAdd = {
                id: newId,
                title: newExperience.title.trim(),
                company: newExperience.company.trim(),
                location: newExperience.location.trim() || 'Not specified',
                from: newExperience.from,
                to: newExperience.to || 'Present',
                description: newExperience.description.trim() || 'No description provided.'
            };

            console.log('Adding experience:', experienceToAdd);

            // Update local state directly
            const updatedExperiences = [...experiences, experienceToAdd];
            setExperiences(updatedExperiences);

            // Save to localStorage for persistence
            saveToLocalStorage(updatedExperiences);

            // Reset form
            setNewExperience({
                title: '',
                company: '',
                location: '',
                from: '',
                to: '',
                description: ''
            });
            setIsAdding(false);

            enqueueSnackbar('Experience added and saved successfully!', { variant: 'success' });
        } catch (error) {
            console.error('Error adding experience:', error);
            enqueueSnackbar('Error adding experience. Please try again.', { variant: 'error' });
        }
    };

    const cancelAdd = () => {
        setNewExperience({
            title: '',
            company: '',
            location: '',
            from: '',
            to: '',
            description: ''
        });
        setIsAdding(false);
    };

    const startEdit = (experience) => {
        setEditingId(experience.id);
        setEditExperience({
            title: experience.title,
            company: experience.company,
            location: experience.location,
            from: experience.from,
            to: experience.to === 'Present' ? '' : experience.to,
            description: experience.description
        });
        setIsAdding(false); // Close add form if open
    };

    const handleEditInputChange = (field, value) => {
        setEditExperience(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const saveEdit = () => {
        // Validation
        if (!editExperience.title.trim()) {
            enqueueSnackbar('Please enter a job title.', { variant: 'error' });
            return;
        }
        if (!editExperience.company.trim()) {
            enqueueSnackbar('Please enter a company name.', { variant: 'error' });
            return;
        }
        if (!editExperience.from) {
            enqueueSnackbar('Please select a start date.', { variant: 'error' });
            return;
        }

        try {
            const updatedExperience = {
                id: editingId,
                title: editExperience.title.trim(),
                company: editExperience.company.trim(),
                location: editExperience.location.trim() || 'Not specified',
                from: editExperience.from,
                to: editExperience.to || 'Present',
                description: editExperience.description.trim() || 'No description provided.'
            };

            const updatedExperiences = experiences.map(exp =>
                exp.id === editingId ? updatedExperience : exp
            );

            setExperiences(updatedExperiences);

            // Save to localStorage for persistence
            saveToLocalStorage(updatedExperiences);

            setEditingId(null);
            setEditExperience({
                title: '',
                company: '',
                location: '',
                from: '',
                to: '',
                description: ''
            });

            enqueueSnackbar('Experience updated and saved successfully!', { variant: 'success' });
        } catch (error) {
            console.error('Error updating experience:', error);
            enqueueSnackbar('Error updating experience. Please try again.', { variant: 'error' });
        }
    };

    const cancelEdit = () => {
        setEditingId(null);
        setEditExperience({
            title: '',
            company: '',
            location: '',
            from: '',
            to: '',
            description: ''
        });
    };

    const deleteExperience = (id, title) => {
        if (window.confirm(`Are you sure you want to delete the experience "${title}"?`)) {
            const updatedExperiences = experiences.filter(exp => exp.id !== id);
            setExperiences(updatedExperiences);

            // Save to localStorage for persistence
            saveToLocalStorage(updatedExperiences);

            enqueueSnackbar('Experience deleted and saved successfully!', { variant: 'success' });
        }
    };

    const resetToOriginal = async () => {
        if (window.confirm('Are you sure you want to reset all experiences to the original data? This will remove all your changes.')) {
            try {
                const response = await fetch('/db.json');
                const data = await response.json();
                const originalExperiences = data.experiences || [];

                setExperiences(originalExperiences);
                saveToLocalStorage(originalExperiences);

                enqueueSnackbar('Experiences reset to original data successfully!', { variant: 'success' });
            } catch (error) {
                console.error('Error resetting experiences:', error);
                enqueueSnackbar('Error resetting experiences. Please try again.', { variant: 'error' });
            }
        }
    };

    const exportExperiences = () => {
        const dataStr = JSON.stringify({ experiences }, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'experiences.json';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        enqueueSnackbar('Experiences exported successfully!', { variant: 'success' });
    };

    if (loading) {
        return <div className="tab-content">
            <div className="experience-section">
                <div className="experience-display">
                    <h2>Experience</h2>
                    <p>Loading experiences...</p>
                </div>
            </div>
        </div>
    }

    return <div className="tab-content">
        <div className="experience-section">
            <div className="experience-display">
                <div className="experience-header-with-actions">
                    <h2>Experience</h2>
                    <div className="header-buttons">
                        <button
                            onClick={() => setIsAdding(!isAdding)}
                            className="add-experience-btn"
                        >
                            {isAdding ? 'Cancel' : 'Add Experience'}
                        </button>
                        <button
                            onClick={exportExperiences}
                            className="export-btn"
                            title="Export experiences as JSON file"
                        >
                            Export
                        </button>
                        <button
                            onClick={resetToOriginal}
                            className="reset-btn"
                            title="Reset to original experiences from db.json"
                        >
                            Reset
                        </button>
                    </div>
                </div>

                {isAdding && (
                    <div className="add-experience-form">
                        <h3>Add New Experience</h3>
                        <div className="form-row">
                            <div className="form-group">
                                <label>Job Title *</label>
                                <input
                                    type="text"
                                    value={newExperience.title}
                                    onChange={(e) => handleInputChange('title', e.target.value)}
                                    placeholder="e.g., Senior Software Engineer"
                                />
                            </div>
                            <div className="form-group">
                                <label>Company *</label>
                                <input
                                    type="text"
                                    value={newExperience.company}
                                    onChange={(e) => handleInputChange('company', e.target.value)}
                                    placeholder="e.g., Google Inc."
                                />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group">
                                <label>Location</label>
                                <input
                                    type="text"
                                    value={newExperience.location}
                                    onChange={(e) => handleInputChange('location', e.target.value)}
                                    placeholder="e.g., San Francisco, CA or Remote"
                                />
                            </div>
                            <div className="form-group">
                                <label>Start Date *</label>
                                <input
                                    type="month"
                                    value={newExperience.from}
                                    onChange={(e) => handleInputChange('from', e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label>End Date</label>
                                <input
                                    type="month"
                                    value={newExperience.to}
                                    onChange={(e) => handleInputChange('to', e.target.value)}
                                    placeholder="Leave empty if current"
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <label>Description</label>
                            <textarea
                                value={newExperience.description}
                                onChange={(e) => handleInputChange('description', e.target.value)}
                                placeholder="• Describe your key responsibilities and achievements&#10;• Use bullet points for better readability&#10;• Include metrics and results where possible"
                                rows="6"
                            />
                        </div>
                        <div className="form-actions">
                            <button onClick={addExperience} className="save-btn">
                                Add Experience
                            </button>
                            <button onClick={cancelAdd} className="cancel-btn">
                                Cancel
                            </button>
                        </div>
                    </div>
                )}

                {experiences.length === 0 ? (
                    <p>No experiences found. Click "Add Experience" to get started.</p>
                ) : (
                    <div className="experiences-list">
                        {experiences.map((experience) => (
                            <div key={experience.id} className="experience-item">
                                {editingId === experience.id ? (
                                    // Edit Mode
                                    <div className="edit-experience-form">
                                        <h3>Edit Experience</h3>
                                        <div className="form-row">
                                            <div className="form-group">
                                                <label>Job Title *</label>
                                                <input
                                                    type="text"
                                                    value={editExperience.title}
                                                    onChange={(e) => handleEditInputChange('title', e.target.value)}
                                                    placeholder="e.g., Senior Software Engineer"
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label>Company *</label>
                                                <input
                                                    type="text"
                                                    value={editExperience.company}
                                                    onChange={(e) => handleEditInputChange('company', e.target.value)}
                                                    placeholder="e.g., Google Inc."
                                                />
                                            </div>
                                        </div>
                                        <div className="form-row">
                                            <div className="form-group">
                                                <label>Location</label>
                                                <input
                                                    type="text"
                                                    value={editExperience.location}
                                                    onChange={(e) => handleEditInputChange('location', e.target.value)}
                                                    placeholder="e.g., San Francisco, CA or Remote"
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label>Start Date *</label>
                                                <input
                                                    type="month"
                                                    value={editExperience.from}
                                                    onChange={(e) => handleEditInputChange('from', e.target.value)}
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label>End Date</label>
                                                <input
                                                    type="month"
                                                    value={editExperience.to}
                                                    onChange={(e) => handleEditInputChange('to', e.target.value)}
                                                    placeholder="Leave empty if current"
                                                />
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label>Description</label>
                                            <textarea
                                                value={editExperience.description}
                                                onChange={(e) => handleEditInputChange('description', e.target.value)}
                                                placeholder="• Describe your key responsibilities and achievements&#10;• Use bullet points for better readability&#10;• Include metrics and results where possible"
                                                rows="6"
                                            />
                                        </div>
                                        <div className="form-actions">
                                            <button onClick={saveEdit} className="save-btn">
                                                Save Changes
                                            </button>
                                            <button onClick={cancelEdit} className="cancel-btn">
                                                Cancel
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    // Display Mode
                                    <>
                                        <div className="experience-header">
                                            <div className="experience-title-section">
                                                <h3 className="experience-title">{experience.title}</h3>
                                                <p className="experience-company">{experience.company}</p>
                                            </div>
                                            <div className="experience-meta">
                                                <span className="experience-duration">
                                                    {formatDate(experience.from)} - {formatDate(experience.to)}
                                                </span>
                                                <span className="experience-location">{experience.location}</span>
                                            </div>
                                        </div>
                                        <div className="experience-description">
                                            {experience.description.split('\n').map((line, index) => (
                                                <p key={index}>{line}</p>
                                            ))}
                                        </div>
                                        <div className="experience-actions">
                                            <button onClick={() => copyToClipboard(experience.title, 'Job Title')}>
                                                Copy Title
                                            </button>
                                            <button onClick={() => copyToClipboard(`${experience.company} - ${experience.location}`, 'Company & Location')}>
                                                Copy Company
                                            </button>
                                            <button onClick={() => copyToClipboard(`${formatDate(experience.from)} - ${formatDate(experience.to)}`, 'Duration')}>
                                                Copy Duration
                                            </button>
                                            <button onClick={() => copyToClipboard(experience.description, 'Description')}>
                                                Copy Description
                                            </button>
                                            <button
                                                onClick={() => startEdit(experience)}
                                                // className="edit-btn"
                                                style={{ background: '#ffc107', color: '#000' }}
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => deleteExperience(experience.id, experience.title)}
                                                className="delete-btn"
                                                style={{ background: '#dc3545', color: 'white' }}
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    </div>
}

export default Experience;