const base_url = "https://better-transfer.onrender.com/transfer-plan"

async function fetchTransferPlan(transfer_request) {
    try {
        const response = await fetch(`${base_url}/v2/rag`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(transfer_request)
        })
        if (!response.ok){
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json()
        return result
    } catch (error) {
        console.error("Error fetching data from fetchTransferPlan:", error);
        throw error;
    }
}

async function fetchReOrderTransferPlan(transfer_request) {
    try {
        const response = await fetch(`${base_url}/v2/reorder`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(transfer_request)
        })
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`)
        }
        const result = await response.json()
        return result

    } catch (error) {
        console.error("Error fetching data from fetchReOrderTransferPlan:", error);
        throw error;
    }
}

async function fetchingMajorList(university_id, college_id) {
    try {
        const response = await fetch(`${base_url}/v1/majorlist/${university_id}/${college_id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`)
        }
        const result = await response.json()
        return result

    } catch (error) {
        console.error("Error fetching data from fetchingUniversities:", error);
        throw error;
    }
}


async function fetchingUniversities() {
    try {
        const response = await fetch(`${base_url}/v1/universities`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`)
        }
        const result = await response.json()
        return result

    } catch (error) {
        console.error("Error fetching data from fetchingUniversities:", error);
        throw error;
    }
}

async function fetchingColleges() {
    try {
        const response = await fetch(`${base_url}/v1/colleges`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`)
        }
        const result = await response.json()
        return result

    } catch (error) {
        console.error("Error fetching data from fetchingColleges:", error);
        throw error;
    }
}



export { fetchTransferPlan, fetchReOrderTransferPlan, fetchingMajorList, fetchingUniversities, fetchingColleges }
