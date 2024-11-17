

export const createOrder = () => {
    console.log("I work from order api");

    fetch('https://localhost:7089/api/Order', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(
            [
                "friend",
                "lump"
            ]
        ), // Convert JavaScript object to JSON string
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
//


//export const createQuiz = (quizName, quizDescription, roomId, setQuizes) => {
//    let quizId = crypto.randomUUID();

//    fetch('https://localhost:7176/api/Quiz/Add', {
//        method: 'POST',
//        headers: {
//            'Content-Type': 'application/json',
//        },
//        body: JSON.stringify({
//            id: quizId,
//            roomId: roomId,
//            name: quizName,
//            description: quizDescription,
//        }), // Convert JavaScript object to JSON string
//    })
//        .then(data => {
//            let newQuiz = {
//                id: quizId,
//                roomId: roomId,
//                name: quizName,
//                description: quizDescription,
//            }
//            console.log(data);
//            setQuizes(prevSections => [...prevSections, newQuiz]);

//        })
//        .catch(error => {
//            console.error('Error posting section:', error);
//            // Display an error message to the user interface
//        });
//}