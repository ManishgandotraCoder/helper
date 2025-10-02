import React from 'react';
import { useLocation, Link } from 'react-router-dom';

const NavigationTabs = ({ setIsEditing }) => {
    const location = useLocation();

    const tabs = [
        { path: '/', label: 'Personal Info', key: 'personal' },
        { path: '/experience', label: 'Experience', key: 'experience' },
        { path: '/cover', label: 'Cover Letter', key: 'coverletter' },
        { path: '/custom', label: 'Custom Information', key: 'custom' }
    ];

    return (
        <div className="tabs-header">
            {tabs.map(tab => (
                <Link
                    key={tab.key}
                    to={tab.path}
                    className={`tab-button ${location.pathname === tab.path ? 'active' : ''}`}
                    onClick={() => setIsEditing(false)}
                >
                    {tab.label}
                </Link>
            ))}
        </div>
    );
};

export default NavigationTabs;