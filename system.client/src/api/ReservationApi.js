export const getReservations = async () => {
    return fetch('https://localhost:7089/api/Reservation', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    })
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok " + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            console.log("Received reservations:", data);
            return data;
        })
        .catch(error => {
            console.error("There was a problem with the fetch operation:", error);
        });
};

export const getReservationById = async (reservationId) => {
    return fetch(`https://localhost:7089/api/Reservation/${reservationId}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    })
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok " + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            console.log("Received reservation by ID:", data);
            return data;
        })
        .catch(error => {
            console.error("There was a problem with the fetch operation:", error);
        });
};

export const createReservation = async (object) => {
    return fetch('https://localhost:7089/api/Reservation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(object),
    })
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok " + response.statusText);
            }
            return response;
        })
        .catch(error => {
            console.error("There was a problem with the fetch operation:", error);
            alert("An error occured while creating an order");
        });
};

export const updateReservation = async (reservationId, reservation) => {
    return await fetch(`https://localhost:7089/api/Reservation/${reservationId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reservation),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Network response was not ok " + response.statusText);
        }
        return response;
    })
    .catch(error => {
        console.error("There was a problem with the fetch operation:", error);
    });
};

export const deleteReservation = async (reservationId) => {
    return fetch(`https://localhost:7089/api/Reservation/${reservationId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
    })
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok " + response.statusText);
            }
            return response;
        })
        .catch(error => {
            console.error("There was a problem with the fetch operation:", error);
        });
};

// Integrating with Order API
export const createOrderForReservation = async (reservationId, orderDetails) => {
    const order = { ...orderDetails, reservationId };
    return fetch('https://localhost:7089/api/Order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(order),
    })
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok " + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            console.log("Created order for reservation:", data);
            return data;
        })
        .catch(error => {
            console.error("There was a problem with the fetch operation:", error);
        });
};