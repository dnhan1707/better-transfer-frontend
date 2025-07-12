export default function ActionButtons({
    handleSearch,
    clearAll,
    isCompact = false
}){
    return (
        <div className={`action-controls ${isCompact ? 'compact' : ''}`}>
            <button className="primary-btn action-btn" onClick={handleSearch}>
                Generate Plan
            </button>
            <button className="secondary-btn action-btn" onClick={clearAll}>
                Reset All
            </button>

            <style jsx>{`
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

                .action-controls {
                    display: flex;
                    gap: 0.75rem;
                    margin-top: auto;
                    padding-top: 1rem;
                    border-top: 1px solid #e5e5e5;
                    flex-shrink: 0;
                }

                .action-controls.compact {
                    flex-direction: column;
                    margin-top: 1.5rem;
                }

                .action-btn {
                    padding: 0.75rem 1rem;
                    border-radius: 5px;
                    font-family: 'Inter', sans-serif;
                    font-weight: 500;
                    font-size: 0.85rem;
                    cursor: pointer;
                    transition: all 0.2s ease;
                    border: 1px solid;
                    text-align: center;
                    flex: 1;
                }

                .primary-btn {
                    background: #1a1a1a;
                    color: #ffffff;
                    border-color: #1a1a1a;
                }

                .primary-btn:hover {
                    background: #333333;
                    border-color: #333333;
                    transform: translateY(-1px);
                    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
                }

                .secondary-btn {
                    background: #ffffff;
                    color: #666;
                    border-color: #d1d5db;
                }

                .secondary-btn:hover {
                    background: #f8f9fa;
                    border-color: #9ca3af;
                    color: #1a1a1a;
                    transform: translateY(-1px);
                    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
                }

                @media (max-width: 768px) {
                    .action-controls {
                        flex-direction: column;
                        gap: 0.5rem;
                    }
                }
            `}</style>
        </div>      
    )
}