import ActionButtons from "./ActionButtons";
import CommunityCollegeSelection from "./CommunityCollegeSelection";
import InputFormError from "./InputFormError";
import PairSelection from "./PairSelection";
import TermSetting from "./TermSetting";

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
    colleges,
    handleSearch,
    clearAll,
    numberOfSemester,
    setNumberOfTerm,
    isCompact = false
}){
    return (
        <div className={`planning-container ${isCompact ? 'compact' : ''}`}>
            <div className="container-header">
                <h2 className="section-title">Configuration</h2>
                <p className="section-description">Set up your transfer preferences</p>
            </div>
            
            <div className="form-sections">
                <InputFormError errorMessage={errorMessage} />
                <CommunityCollegeSelection
                    chosenCollege={chosenCollege}
                    setChosenCollege={setChosenCollege}
                    colleges={colleges}
                    isCompact={isCompact}
                />
                <PairSelection
                    addNewPair={addNewPair}
                    uniMajorPairs={uniMajorPairs}
                    updatePair={updatePair}
                    removePair={removePair}
                    universities={universities}
                    majors={majors}
                    isCompact={isCompact}
                />
                <TermSetting
                    numberOfSemester={numberOfSemester}
                    setNumberOfTerm={setNumberOfTerm}
                ></TermSetting>
                <ActionButtons
                    handleSearch={handleSearch}
                    clearAll={clearAll}
                    isCompact={isCompact}
                />
            </div>

            <style jsx>{`
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

                .planning-container {
                    background: #ffffff;
                    font-family: 'Inter', sans-serif;
                    height: 100vh;
                    overflow: hidden;
                    display: flex;
                    flex-direction: column;
                }

                .planning-container.compact {
                    border: none;
                    border-radius: 0;
                    box-shadow: none;
                }

                .container-header {
                    background: #f8f9fa;
                    padding: 1.5rem;
                    border-bottom: 1px solid #e5e5e5;
                    flex-shrink: 0;
                }

                .section-title {
                    margin: 0 0 0.5rem 0;
                    color: #1a1a1a;
                    font-size: 1.25rem;
                    font-weight: 500;
                    letter-spacing: -0.01em;
                }

                .section-description {
                    margin: 0;
                    color: #666;
                    font-size: 0.875rem;
                    font-weight: 400;
                }

                .form-sections {
                    padding: 1.5rem;
                    overflow-y: auto;
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                }
                    

                /* Custom scrollbar */
                .form-sections::-webkit-scrollbar {
                    width: 6px;
                }

                .form-sections::-webkit-scrollbar-track {
                    background: #f1f1f1;
                    border-radius: 3px;
                }

                .form-sections::-webkit-scrollbar-thumb {
                    background: #c1c1c1;
                    border-radius: 3px;
                }

                .form-sections::-webkit-scrollbar-thumb:hover {
                    background: #a8a8a8;
                }

                @media (max-width: 768px) {
                    .container-header {
                        padding: 1.25rem;
                    }

                    .section-title {
                        font-size: 1.125rem;
                    }

                    .section-description {
                        font-size: 0.8rem;
                    }

                    .form-sections {
                        padding: 1.25rem;
                    }
                }
            `}</style>
        </div>        
    )
}