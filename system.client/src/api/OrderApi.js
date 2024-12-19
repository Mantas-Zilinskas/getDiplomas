

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

export const getOrder = async (order) => {

    return fetch('https://localhost:7089/api/Order/' + order, {
        method: 'Get',
        headers: {
            'Content-Type': 'application/json',
        }
    }).then(response => {
        if (!response.ok) {
            throw new Error("Network response was not ok " + response.statusText);
            alert("Something went wrong while trying to get order information");
        }
        return response.json();
    }).catch(error => {
        console.error("There was a problem with the fetch operation:", error);
        alert("Something went wrong while trying to get order information");
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

export const updateOrder = async (orderId, orderUpdate) => {

    return await fetch('https://localhost:7089/api/Order/' + orderId, {
        method: 'Put',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderUpdate),
    }).then(response => {
        if (!response.ok) {
            throw new Error("Network response was not ok " + response.statusText);
            alert("Something went wrong while updating the order");
        }
        return response; 
    }).catch(error => {
        console.error("There was a problem with the fetch operation:", error);
        alert("Something went wrong while updating the order");
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