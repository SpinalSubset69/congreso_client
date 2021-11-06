const sendButton = document.getElementById('sendEmail');
const baseApi = "https://uammbackend.herokuapp.com/api";

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

    if(!name || !phone || !email || !subject || !body){
        ShowAlert('danger', 'Rellena los campos obligatorios(*) por favor');
        return;
    }
    
    const spinner = document.getElementById('emailIcon');    
    /* spinner.classList.toggle('fa-arrow-right');
    spinner.classList.toggle('fa-spinner') */    
    spinner.classList.toggle('fa-spinner')    
    spinner.classList.toggle('rotate')  
    sendButton.innerText = 'Enviando Mensaje....'

    const Send = await fetch(`${baseApi}/sendemail`, {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify(data)
    });

    const response = await Send.json();

    if(response.statusCode === 200){
        spinner.classList.toggle('rotate');          
        spinner.classList.replace('fa-spinner','fa-check-circle-o')
        sendButton.innerText = 'Mensaje enviado!!'
        sendButton.removeEventListener('click', SendEmailAsync);
    }

    if(response.statusCode === 500 || response.statusCode === 400){
        spinner.classList.toggle('rotate');          
        spinner.classList.replace('fa-spinner','fa-times');
        sendButton.innerText = 'Hubo un Error intenta de nuevo!!';
        ShowAlert('warning', response.errorMessage);
        setTimeout(() => {
            sendButton.innerText = 'Enviar Mensaje';
            spinner.classList.remove('fa-times');
        }, 2000)
    }

    console.log(response);
}

const ShowAlert = (type, message) => {
    const alertPromptArea = document.getElementById("alertPrompt");
    alertPromptArea.classList.toggle("mt-5");
    alertPromptArea.classList.toggle("alert");
    alertPromptArea.classList.toggle(`alert-${type}`);
    alertPromptArea.innerHTML = message;
  
    setTimeout(() => {
      alertPromptArea.classList.toggle("mt-5");
      alertPromptArea.classList.toggle("alert");
      alertPromptArea.classList.toggle(`alert-${type}`);
      alertPromptArea.innerHTML = "";
    }, 2000);
  };


sendButton.addEventListener('click', SendEmailAsync);