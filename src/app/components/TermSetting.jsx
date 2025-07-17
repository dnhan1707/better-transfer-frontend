export default function TermSetting({
    setNumberOfTerm,
    numberOfSemester
}) {
    const handleTermChange = (e) => {
        const inputValue = e.target.value;
        
        // Allow empty input
        if (inputValue === '') {
            setNumberOfTerm('');
            return;
        }
        
        // Only allow digits
        if (!/^\d+$/.test(inputValue)) {
            return; // Don't update if non-numeric
        }
        
        const value = parseInt(inputValue);
        
        // Validate range
        if (value >= 1 && value <= 12) {
            setNumberOfTerm(value);
        } else if (value > 12) {
            setNumberOfTerm(12); // Auto-correct to max
        }
    };

    // Handle key press to prevent non-numeric input
    const handleKeyPress = (e) => {
        // Allow backspace, delete, tab, escape, enter
        if ([8, 9, 27, 13, 46].indexOf(e.keyCode) !== -1 ||
            // Allow Ctrl+A, Ctrl+C, Ctrl+V, Ctrl+X
            (e.keyCode === 65 && e.ctrlKey === true) ||
            (e.keyCode === 67 && e.ctrlKey === true) ||
            (e.keyCode === 86 && e.ctrlKey === true) ||
            (e.keyCode === 88 && e.ctrlKey === true)) {
            return;
        }
        
        // Ensure that it is a number and stop the keypress
        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
            e.preventDefault();
        }
    };

    return (
        <div className="term-setting-container">
            <div className="input-group">
                <label htmlFor="term-input" className="input-label">
                    Number of Terms
                </label>
                <div className="input-wrapper">
                    <input
                        id="term-input"
                        type="text" // Changed from number to text
                        value={numberOfSemester}
                        onChange={handleTermChange}
                        onKeyDown={handleKeyPress}
                        placeholder="Enter number of terms (1-12)"
                        className="term-input"
                        maxLength="2" // Limit to 2 characters
                    />
                    <span className="input-hint">
                        Plan for {numberOfSemester || 0} term{numberOfSemester !== 1 ? 's' : ''} (1-12 terms allowed)
                    </span>
                </div>
            </div>

            <style jsx>{`
                .term-setting-container {
                    margin-bottom: 1.5rem;
                }

                .input-group {
                    display: flex;
                    flex-direction: column;
                    gap: 0.5rem;
                }

                .input-label {
                    font-size: 0.875rem;
                    font-weight: 500;
                    color: #374151;
                    margin: 0;
                }

                .input-wrapper {
                    display: flex;
                    flex-direction: column;
                    gap: 0.25rem;
                }

                .term-input {
                    width: 100%;
                    padding: 0.75rem;
                    border: 1px solid #d1d5db;
                    border-radius: 6px;
                    font-size: 0.875rem;
                    background: #ffffff;
                    transition: all 0.2s ease;
                    font-family: inherit;
                    text-align: center; /* Center the number */
                    font-weight: 500;
                }

                .term-input:focus {
                    outline: none;
                    border-color: #3b82f6;
                    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
                }

                .term-input:hover {
                    border-color: #9ca3af;
                }

                .term-input::placeholder {
                    color: #9ca3af;
                    text-align: center;
                }

                .input-hint {
                    font-size: 0.75rem;
                    color: #6b7280;
                    font-style: italic;
                    text-align: center;
                }

                @media (max-width: 768px) {
                    .term-setting-container {
                        margin-bottom: 1.25rem;
                    }

                    .term-input {
                        padding: 0.625rem;
                        font-size: 0.8rem;
                    }

                    .input-label {
                        font-size: 0.8rem;
                    }

                    .input-hint {
                        font-size: 0.7rem;
                    }
                }
            `}</style>
        </div>
    );
}