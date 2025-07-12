export default function InputFormError({errorMessage}){
    return (
        <div>
            {errorMessage && (
                <div className="error-message">
                    <span className="error-icon">⚠️</span>
                    {errorMessage}
                </div>
            )}

            <style jsx>{`
                .error-message {
                    background: #f8d7da;
                    color: #721c24;
                    border: 1px solid #f5c6cb;
                    border-radius: 8px;
                    padding: 12px 16px;
                    margin-bottom: 2rem;
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    font-size: 0.9rem;
                    animation: slideIn 0.3s ease-out;
                }

                .error-icon {
                    font-size: 1.1rem;
                }

                @keyframes slideIn {
                    from {
                        opacity: 0;
                        transform: translateY(-10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            `}</style>
        </div>
    )
}