const sendButton = document.getElementById('sendEmail');
const baseApi = "https://localhost:5001/api";

const SendEmailAsync = async (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const body = document.getElementById('message').value;

    const data = {
        name, phone, email, subject, body
    }

    const Send = await fetch(`${baseApi}/email`, {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify(data)
    });

    const response = await Send.json();

    console.log(response);
}


sendButton.addEventListener('click', SendEmailAsync);