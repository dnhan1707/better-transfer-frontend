
async function fetchTransferPlan(transfer_request) {
    try {
        const response = await fetch("http://localhost:8000/transfer-plan/v2/rag", {
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
        const response = await fetch("http://localhost:8000/transfer-plan/v2/reorder", {
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

export { fetchTransferPlan, fetchReOrderTransferPlan }
