import ActionButtons from "./ActionButtons";
import CommunityCollegeSelection from "./CommunityCollegeSelection";
import InputFormError from "./InputFormError";
import PairSelection from "./PairSelection";

export default function InputFormContainer({
    errorMessage,
    chosenCollege,
    setChosenCollege,
    addNewPair,
    uniMajorPairs,
    updatePair,
    removePair,
    universities,
    majors,
    handleSearch,
    clearAll
}){
    return (
        <div className="planning-container">
            <div className="container-header">
                <h2 className="section-title">Configuration</h2>
                <p className="section-description">Set up your transfer preferences</p>
            </div>
            
            <div className="form-sections">
                <InputFormError errorMessage={errorMessage} />
                <CommunityCollegeSelection
                    chosenCollege={chosenCollege}
                    setChosenCollege={setChosenCollege}
                />
                <PairSelection
                    addNewPair={addNewPair}
                    uniMajorPairs={uniMajorPairs}
                    updatePair={updatePair}
                    removePair={removePair}
                    universities={universities}
                    majors={majors}
                />
                <ActionButtons
                    handleSearch={handleSearch}
                    clearAll={clearAll}
                />
            </div>

            <style jsx>{`
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap');

                .planning-container {
                    background: #ffffff;
                    border: 1px solid #e5e5e5;
                    border-radius: 8px;
                    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
                    font-family: 'Inter', sans-serif;
                    margin-bottom: 3rem;
                    overflow: hidden;
                }

                .container-header {
                    background: #f8f9fa;
                    padding: 2rem 2.5rem;
                    border-bottom: 1px solid #e5e5e5;
                }

                .section-title {
                    margin: 0 0 0.5rem 0;
                    color: #1a1a1a;
                    font-size: 1.5rem;
                    font-weight: 500;
                    letter-spacing: -0.01em;
                }

                .section-description {
                    margin: 0;
                    color: #666;
                    font-size: 0.95rem;
                    font-weight: 400;
                }

                .form-sections {
                    padding: 2.5rem;
                }

                @media (max-width: 768px) {
                    .planning-container {
                        border-radius: 6px;
                        margin-bottom: 2rem;
                    }
                    
                    .container-header {
                        padding: 1.5rem 1.5rem;
                    }

                    .section-title {
                        font-size: 1.3rem;
                    }

                    .section-description {
                        font-size: 0.9rem;
                    }

                    .form-sections {
                        padding: 1.5rem;
                    }
                }

                @media (max-width: 480px) {
                    .container-header {
                        padding: 1.25rem;
                    }

                    .form-sections {
                        padding: 1.25rem;
                    }
                }
            `}</style>
        </div>        
    )
}