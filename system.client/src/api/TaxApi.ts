export const createTax = () => {
    const tax =
    {
        "id": 1,
        "productID": 1,
        "name": "real tax",
        "value": 10
    }

    fetch('https://localhost:7089/api/Tax', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(tax),
    }).then(response => response.json())
    .then(data => console.log(data))
}