export default function ActionButtons({
    handleSearch,
    clearAll
}){
    return (
        <div className="action-controls">
            <button className="primary-btn action-btn" onClick={handleSearch}>
                Generate Plan
            </button>
            <button className="secondary-btn action-btn" onClick={clearAll}>
                Reset All
            </button>

            <style jsx>{`
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap');

                .action-controls {
                    display: flex;
                    gap: 1rem;
                    justify-content: flex-start;
                    margin-top: 2.5rem;
                    padding-top: 1.5rem;
                    border-top: 1px solid #e5e5e5;
                }

                .action-btn {
                    padding: 0.75rem 1.5rem;
                    border-radius: 6px;
                    font-family: 'Inter', sans-serif;
                    font-weight: 500;
                    font-size: 0.9rem;
                    cursor: pointer;
                    transition: all 0.2s ease;
                    border: 1px solid;
                    min-width: 120px;
                    text-align: center;
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

                .primary-btn:active {
                    transform: translateY(0);
                    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
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

                .secondary-btn:active {
                    transform: translateY(0);
                    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
                }

                @media (max-width: 768px) {
                    .action-controls {
                        flex-direction: column;
                        gap: 0.75rem;
                        margin-top: 2rem;
                        padding-top: 1.25rem;
                    }
                    
                    .action-btn {
                        width: 100%;
                        min-width: auto;
                        padding: 0.875rem 1.5rem;
                    }
                }

                @media (max-width: 480px) {
                    .action-controls {
                        margin-top: 1.5rem;
                        padding-top: 1rem;
                    }

                    .action-btn {
                        padding: 0.8rem 1.25rem;
                        font-size: 0.85rem;
                    }
                }
            `}</style>
        </div>      
    )
}