

export const createOrder = async (object) => {

    return await fetch('https://localhost:7089/api/Order', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(object) // Convert JavaScript object to JSON string
    }).then(response => {
        if (!response.ok) {
            throw new Error("Network response was not ok " + response.statusText);
            alert("An error occured while creating an order");
        }
        return response; // Parse the JSON response
    }).catch(error => {
        console.error("There was a problem with the fetch operation:", error);
        alert("An error occured while creating an order");
    })
}

export const getOrder = (order) => {

    fetch('https://localhost:7089/api/Order/' + order, {
        method: 'Get',
        headers: {
            'Content-Type': 'application/json',
        }
    }).then(response => {
        if (!response.ok) {
            throw new Error("Network response was not ok " + response.statusText);
        }
        return response.json(); // Parse the JSON response
    }).then(data => {
        console.log("Received response:", data); // Log the array of strings received back
    }).catch(error => {
        console.error("There was a problem with the fetch operation:", error);
    })
}

export const getUnpaidOrders = async () => {

    return fetch('https://localhost:7089/api/Order/Unpaid', {
        method: 'Get',
        headers: {
            'Content-Type': 'application/json',
        }
    }).then(response => {
        if (!response.ok) {
            throw new Error("Network response was not ok " + response.statusText);
            alert("Something went wrong while fetching orders");
        }
        return response.json(); // Parse the JSON response
    }).catch(error => {
        console.error("There was a problem with the fetch operation:", error);
        alert("Something went wrong while fetching orders");
    })
}

export const updateOrder = (orderId, orderUpdate) => {

    fetch('https://localhost:7089/api/Order/' + orderId, {
        method: 'Put',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderUpdate),
    }).then(response => {
        if (!response.ok) {
            throw new Error("Network response was not ok " + response.statusText);
        }
        return response; // Parse the JSON response
    }).catch(error => {
        console.error("There was a problem with the fetch operation:", error);
    })
}

export const deleteOrder = async (orderId) => {

    return await fetch('https://localhost:7089/api/Order/' + orderId, {
        method: 'Delete',
        headers: {
            'Content-Type': 'application/json',
        }
    }).then(response => {
        if (!response.ok) {
            throw new Error("Network response was not ok " + response.statusText);
            alert("An error occurred while canceling the order");
        }
        return response; // Parse the JSON response
    }).catch(error => {
        console.error("There was a problem with the fetch operation:", error);
        alert("An error occurred while canceling the order");
    })
}

export const payOrder = async (orderId, payment) => {

    let obj = {
        amount: payment,
        method: 1
    }

    return await fetch("https://localhost:7089/api/Order/" + orderId + "/Pay", {
        method: 'Post',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(obj)
    }).then(response => {
        if (!response.ok) {
            throw new Error("Network response was not ok " + response.statusText);
            alert("Something went wrong while processing payment");
        }
        return response; // Parse the JSON response
    }).catch(error => {
        console.error("There was a problem with the fetch operation:", error);
        alert("Something went wrong while processing payment");
    })
}