const CustomComponent = ({ customInfo, newCustomInfo, setNewCustomInfo, addCustomInfo, copyToClipboard, deleteCustomInfo }) => {
    return (
        <div className="tab-content">
            <div className="custom-info-section">
                <h3>Custom Information</h3>

                <div className="add-custom-info">
                    <input
                        type="text"
                        placeholder="Key (e.g., 'Phone')"
                        value={newCustomInfo.key}
                        onChange={(e) => setNewCustomInfo({ ...newCustomInfo, key: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="Value (e.g., '+1-234-567-8900')"
                        value={newCustomInfo.value}
                        onChange={(e) => setNewCustomInfo({ ...newCustomInfo, value: e.target.value })}
                    />
                    <button onClick={addCustomInfo}>Add</button>
                </div>

                <div className="custom-info-list">
                    {customInfo.length === 0 ? (
                        <p className="no-data">No custom information added yet. Add some above!</p>
                    ) : (
                        customInfo.map((item) => (
                            <div key={item.id} className="custom-info-item">
                                <label>{item.key}:</label>
                                <span>{item.value}</span>
                                <button onClick={() => copyToClipboard(item.value, item.key)}>Copy</button>
                                <button className="delete-btn" onClick={() => deleteCustomInfo(item.id)}>Delete</button>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default CustomComponent;
