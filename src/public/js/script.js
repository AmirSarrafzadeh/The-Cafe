document.getElementById('reservation-form').addEventListener('submit', async function(event) {
    console.log("Form submission intercepted"); // Check if this logs when you submit the form
    event.preventDefault(); // Prevent default form submission behavior

    // Collect form data
    const name = document.querySelector('input[name="name"]').value;
    const email = document.querySelector('input[name="email"]').value;
    const phone = document.querySelector('input[name="phone"]').value;
    const date = document.querySelector('input[name="date"]').value;
    const time = document.querySelector('input[name="time"]').value;
    const people = document.querySelector('input[name="people"]').value;
    const message = document.querySelector('textarea[name="message"]').value; 

    // Prepare data for POST request
    const data = {
        name: name,
        email: email,   
        phone: phone,
        date: date,
        time: time,
        people: parseInt(people),
        message: message
    };

    // Send POST request
    try {
        const response = await fetch('/api/v1/reservation/save', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        const rData= await response.json()
        if (response.status !== 201) {
            alert(
                rData.message
            )
        }
        alert('Reservation successfully created');
    }
    catch{(error => {
            console.error('Error:', error);
            alert('There was an error submitting the reservation.');
        })
    }
});
