import React, { useState } from 'react';

const Preferences = () => {
    const [theme, setTheme] = useState('light');
    const [language, setLanguage] = useState('en');

    const handleThemeChange = (event) => {
        setTheme(event.target.value);
    };

    const handleLanguageChange = (event) => {
        setLanguage(event.target.value);
    };

    return (
        <div style={{ padding: '20px' }}>
            <h1>Preferences</h1>
            <div style={{ marginBottom: '20px' }}>
                <label>
                    Theme:
                    <select value={theme} onChange={handleThemeChange} style={{ marginLeft: '10px' }}>
                        <option value="light">Light</option>
                        <option value="dark">Dark</option>
                    </select>
                </label>
            </div>
            <div>
                <label>
                    Language:
                    <select value={language} onChange={handleLanguageChange} style={{ marginLeft: '10px' }}>
                        <option value="en">English</option>
                        <option value="th">Thai</option>
                    </select>
                </label>
            </div>
        </div>
    );
};

export default Preferences;