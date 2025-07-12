'use client'

import { useEffect, useState } from "react"
import DropDown from "./Dropdown"

export default function UniMajorPair({
    pairData,
    onPairChange,
    onRemove,
    universities,
    majors,
    showRemoveButton = false
}) {
    const [chosenMajor, setChosenMajor] = useState(pairData?.major || "")
    const [chosenUni, setChosenUni] = useState(pairData?.university || "")

    // Only call onPairChange when both values are selected and different from current pairData
    useEffect(() => {
        if (chosenMajor && chosenUni) {
            const newPairData = {
                university: chosenUni,
                major: chosenMajor
            }
            
            // Only update if the data has actually changed
            if (pairData?.university !== chosenUni || pairData?.major !== chosenMajor) {
                onPairChange(newPairData)
            }
        }
    }, [chosenUni, chosenMajor]) 

    return (
        <div className="uni-major-pair">
            <div className="pair-dropdowns">
                <div className="dropdown-item">
                    <label>University</label>
                    <DropDown
                        options={universities}
                        value={chosenUni}
                        onChange={setChosenUni}
                        className="university"
                        placeholder="Choose university"
                        searchable={true}
                    />
                </div>

                <div className="dropdown-item">
                    <label>Major</label>
                    <DropDown
                        options={majors}
                        value={chosenMajor}
                        onChange={setChosenMajor}
                        placeholder="Choose major"
                        className="major"
                        searchable={true}
                    />
                </div>
            </div>

            {showRemoveButton && (
                <button 
                    className="remove-pair-btn"
                    onClick={onRemove}
                    title="Remove this pair"
                >
                    ✕
                </button>
            )}

            <style jsx>{`
                .uni-major-pair {
                    display: flex;
                    align-items: flex-start;
                    gap: 1rem;
                    padding: 1.5rem;
                    border: 1px solid #e9ecef;
                    border-radius: 8px;
                    background: #f8f9fa;
                }

                .pair-dropdowns {
                    display: flex;
                    gap: 1rem;
                    flex: 1;
                }

                .dropdown-item {
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                }

                .dropdown-item label {
                    font-weight: 500;
                    margin-bottom: 0.5rem;
                    color: #2c3e50;
                    font-size: 0.9rem;
                }

                .remove-pair-btn {
                    background: #dc3545;
                    color: white;
                    border: none;
                    width: 32px;
                    height: 32px;
                    border-radius: 50%;
                    cursor: pointer;
                    font-size: 14px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin-top: 1.5rem;
                    transition: background 0.2s;
                }

                .remove-pair-btn:hover {
                    background: #c82333;
                }

                @media (max-width: 768px) {
                    .uni-major-pair {
                        flex-direction: column;
                    }

                    .pair-dropdowns {
                        flex-direction: column;
                    }

                    .remove-pair-btn {
                        align-self: center;
                        margin-top: 1rem;
                    }
                }
            `}</style>
        </div>
    )
}