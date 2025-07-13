import Dropdown from "./Dropdown"

export default function CommunityCollegeSelection({
    chosenCollege,
    setChosenCollege,
    colleges,
    isCompact = false
}){
    const handleCollegeChange = (collegeName) => {
        const college = colleges.find(col => col.college_name === collegeName);
        setChosenCollege({
            name: collegeName,
            id: college ? college.id : null
        });
    };

    return (
        <div className="college-section">
            <label>Community College</label>
            <Dropdown
                options={colleges}  
                value={chosenCollege?.name || ""}
                onChange={handleCollegeChange}
                placeholder="Select community college"
                className="college-dropdown"
                searchable={true}
                optionKey="college_name"
                optionLabel="college_name"
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
                    font-size: ${isCompact ? '0.9rem' : '1.1rem'};
                }
            `}</style>
        </div>
    )
}