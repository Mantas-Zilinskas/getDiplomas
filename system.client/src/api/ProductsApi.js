export const getProducts = async () => {

    return fetch('https://localhost:7089/api/Products', {
        method: 'Get',
        headers: {
            'Content-Type': 'application/json',
        },
    }).then(response => {
        if (!response.ok) {
            throw new Error("Network response was not ok " + response.statusText);
        }
        return response.json();
    }).then(data => {
        console.log("Received response:", data); // Log the array of strings received back
        return data
    }).catch(error => {
        console.error("There was a problem with the fetch operation:", error);
    })
}

export const createProduct = async (name, price) => {

    let object = {
        name: name,
        price: price,
        discountId: 0
    }

    return fetch('https://localhost:7089/api/Products', {
        method: 'Post',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(object) // Convert JavaScript object to JSON string
    }).then(response => {
        if (!response.ok) {
            throw new Error("Network response was not ok " + response.statusText);
        }
        return response;
    }).catch(error => {
        console.error("There was a problem with the fetch operation:", error);
    })
}

export const getProduct = (id) => {

    fetch('https://localhost:7089/api/Products/' + id, {
        method: 'Get',
        headers: {
            'Content-Type': 'application/json',
        },
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

export const updateProduct = (id, object) => {

    fetch('https://localhost:7089/api/Products/' + id, {
        method: 'Put',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(object) // Convert JavaScript object to JSON string
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

export const deleteProduct = async (id) => {

    return fetch('https://localhost:7089/api/Products/' + id, {
        method: 'Delete',
        headers: {
            'Content-Type': 'application/json',
        },
    }).then(response => {
        if (!response.ok) {
            throw new Error("Network response was not ok " + response.statusText);
        }
        return response;
    }).catch(error => {
        console.error("There was a problem with the fetch operation:", error);
    })
}