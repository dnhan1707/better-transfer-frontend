import Dropdown from "./Dropdown"

export default function CommunityCollegeSelection({
    chosenCollege,
    setChosenCollege
}){
    return (
        <div className="college-section">
            <label>Community College</label>
            <Dropdown
                options={[
                    "Pasadena City College",
                    "Santa Monica College",
                    "Los Angeles City College"
                ]}  
                value={chosenCollege}
                onChange={setChosenCollege}
                placeholder="Select community college"
                className="college-dropdown"
                searchable={true}
            />

            <style jsx>{`
                .college-section {
                    margin-bottom: 2.5rem;
                }

                .college-section label {
                    display: block;
                    font-weight: 500;
                    margin-bottom: 0.75rem;
                    color: #2c3e50;
                    font-size: 1.1rem;
                }
            `}</style>
        </div>
    )
}