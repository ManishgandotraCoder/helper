const BasicComponent = ({ profile, isEditing, setIsEditing, copyToClipboard, handleInputChange, loadProfile, saveProfile }) => {
    return <div className="tab-content">
        {!isEditing ? (
            <div className="profile-display">
                <div className="profile-item">
                    <label>Full Name:</label>
                    <span>{profile.fullName}</span>
                    <button onClick={() => copyToClipboard(profile.fullName, 'Name')}>Copy</button>
                </div>

                <div className="profile-item">
                    <label>Email:</label>
                    <span>{profile.email}</span>
                    <button onClick={() => copyToClipboard(profile.email, 'Email')}>Copy</button>
                </div>

                <div className="profile-item">
                    <label>Phone no:</label>
                    <a href={`tel:${profile.phone}`} target="_blank" rel="noopener noreferrer">
                        {profile.phone}
                    </a>
                    <button onClick={() => copyToClipboard(profile.phone, 'Phone No')}>Copy</button>
                </div>

                <div className="profile-item">
                    <label>LinkedIn:</label>
                    <a href={profile.linkedinUrl} target="_blank" rel="noopener noreferrer">
                        {profile.linkedinUrl}
                    </a>
                    <button onClick={() => copyToClipboard(profile.linkedinUrl, 'LinkedIn URL')}>Copy</button>
                </div>

                <div className="profile-item">
                    <label>GitHub:</label>
                    <a href={profile.githubUrl} target="_blank" rel="noopener noreferrer">
                        {profile.githubUrl}
                    </a>
                    <button onClick={() => copyToClipboard(profile.githubUrl, 'GitHub URL')}>Copy</button>
                </div>

                <div className="profile-item">
                    <label>Portfolio:</label>
                    <a href={profile.portfolioUrl} target="_blank" rel="noopener noreferrer">
                        {profile.portfolioUrl}
                    </a>
                    <button onClick={() => copyToClipboard(profile.portfolioUrl, 'Portfolio URL')}>Copy</button>
                </div>

                <button className="edit-btn" onClick={() => setIsEditing(true)}>Edit Information</button>
            </div>
        ) : (
            <div className="profile-edit">
                <div className="form-group">
                    <label>Full Name:</label>
                    <input
                        type="text"
                        value={profile.fullName}
                        onChange={(e) => handleInputChange('fullName', e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label>Email:</label>
                    <input
                        type="email"
                        value={profile.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Phone No:</label>
                    <input
                        type="url"
                        value={profile.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>LinkedIn URL:</label>
                    <input
                        type="url"
                        value={profile.linkedinUrl}
                        onChange={(e) => handleInputChange('linkedinUrl', e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label>GitHub URL:</label>
                    <input
                        type="url"
                        value={profile.githubUrl}
                        onChange={(e) => handleInputChange('githubUrl', e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label>Portfolio URL:</label>
                    <input
                        type="url"
                        value={profile.portfolioUrl}
                        onChange={(e) => handleInputChange('portfolioUrl', e.target.value)}
                    />
                </div>

                <div className="edit-buttons">
                    <button className="save-btn" onClick={saveProfile}>Save</button>
                    <button className="cancel-btn" onClick={() => {
                        setIsEditing(false);
                        loadProfile();
                    }}>Cancel</button>
                </div>
            </div>
        )}
    </div>
}
export default BasicComponent;