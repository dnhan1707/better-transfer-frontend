import UniMajorPair from "./UniMajorPair"

export default function PairSelection({
    addNewPair,
    uniMajorPairs,
    updatePair,
    removePair,
    universities,
    majors
}){
    return (
        <div className="pairs-section">
            <div className="section-header">
                <h3>University & Major Pairs</h3>
                <button onClick={addNewPair} className="add-pair-btn">
                    + Add Another Pair
                </button>
            </div>

            <div className="pairs-container">
                {uniMajorPairs.map((pair, index) => (
                    <UniMajorPair
                        key={index}
                        pairData={pair}
                        onPairChange={(pairData) => updatePair(index, pairData)}
                        onRemove={() => removePair(index)}
                        universities={universities}
                        majors={majors}
                        showRemoveButton={uniMajorPairs.length > 1}
                    />
                ))}
            </div>

            <style jsx>{`
                .pairs-section {
                    margin-bottom: 2.5rem;
                }

                .section-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 1.5rem;
                }

                .section-header h3 {
                    margin: 0;
                    color: #2c3e50;
                    font-size: 1.2rem;
                }

                .add-pair-btn {
                    background: #28a745;
                    color: white;
                    border: none;
                    padding: 8px 16px;
                    border-radius: 6px;
                    font-size: 0.9rem;
                    cursor: pointer;
                    transition: background 0.2s;
                }

                .add-pair-btn:hover {
                    background: #218838;
                }

                .pairs-container {
                    display: flex;
                    flex-direction: column;
                    gap: 1rem;
                }

                @media (max-width: 768px) {
                    .section-header {
                        flex-direction: column;
                        gap: 1rem;
                        align-items: stretch;
                    }
                }
            `}</style>
        </div>
    )
}