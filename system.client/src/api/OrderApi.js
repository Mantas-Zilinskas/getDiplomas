

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

export const deleteOrder = (orderId) => {

    fetch('https://localhost:7089/api/Order/' + orderId, {
        method: 'Delete',
        headers: {
            'Content-Type': 'application/json',
        }
    }).then(response => {
        if (!response.ok) {
            throw new Error("Network response was not ok " + response.statusText);
        }
        return response; // Parse the JSON response
    }).catch(error => {
        console.error("There was a problem with the fetch operation:", error);
    })
}

export const payOrder = (orderId, payment) => {

    fetch('https://localhost:7089/api/Order/' + orderId + "/Pay", {
        method: 'Post',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payment)
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