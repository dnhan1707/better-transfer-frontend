export default function TermSetting({
    setNumberOfTerm,
    numberOfSemester
}) {
    const handleTermChange = (e) => {
        const value = parseInt(e.target.value) || 0;
        if (value >= 1 && value <= 12) { // Reasonable limits
            setNumberOfTerm(value);
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
                        type="number"
                        value={numberOfSemester}
                        onChange={handleTermChange}
                        min="1"
                        max="12"
                        placeholder="Enter number of terms"
                        className="term-input"
                    />
                    <span className="input-hint">
                        Plan for {numberOfSemester} term{numberOfSemester !== 1 ? 's' : ''}
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
                }

                .input-hint {
                    font-size: 0.75rem;
                    color: #6b7280;
                    font-style: italic;
                }

                /* Number input styling */
                .term-input::-webkit-outer-spin-button,
                .term-input::-webkit-inner-spin-button {
                    -webkit-appearance: none;
                    margin: 0;
                }

                .term-input[type=number] {
                    -moz-appearance: textfield;
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