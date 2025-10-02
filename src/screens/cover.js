const CoverComponent = ({ profile, isEditing, setIsEditing, copyToClipboard, handleInputChange, loadProfile, saveProfile }) => {
    return <div className="tab-content">
        <div className="cover-letter-section">
            <div className="cover-letter-display">
                <h3>Cover Letter</h3>
                <div className="cover-letter-text">{profile.coverLetter}</div>
                <div className="cover-letter-actions">
                    <button onClick={() => copyToClipboard(profile.coverLetter, 'Cover Letter')}>
                        Copy Cover Letter
                    </button>
                    <button
                        // className="edit-btn"
                        onClick={() => setIsEditing(true)}
                    >
                        Edit Cover Letter
                    </button>
                </div>
            </div>

            {isEditing && (
                <div className="cover-letter-edit">
                    <div className="form-group">
                        <label>Cover Letter:</label>
                        <textarea
                            value={profile.coverLetter}
                            onChange={(e) => handleInputChange('coverLetter', e.target.value)}
                            rows="10"
                            placeholder="Write your cover letter here..."
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
    </div>
}
export default CoverComponent;