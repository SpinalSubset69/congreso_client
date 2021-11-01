
const registerButton = document.getElementById("registerButton");
const baseApi = "https://uammbackend.herokuapp.com/api/putstudent";

const StudentRegister = async (e) => {
  e.preventDefault();
  //Get initial and final hour for registers
  const registerHourElement = document.getElementById("registerHour").innerHTML;
  const hour_split = registerHourElement.split("-");
  const initHourToConvert = hour_split[0];
  const endHourToConvert = hour_split[1].split(" ")[0];

  //Get local hour based on users computer
  const localHourTtConvert = GetLocalHour();

  //Convert hours to a valide date in order to compare them
  const localHour = new Date(`1/1/1990 ${localHourTtConvert}`);
  const initHour= new Date(`1/1/1990 ${initHourToConvert}`);
  const endHpur = new Date(`1/1/1990 ${endHourToConvert}`);

  //TODO: MAKE DAYS COMPARATOR
  const day = 01;
  const dateAux = new Date();
  console.log(dateAux.getDate());
  if ((day == dateAux.getDate())) {
    const response = await PostRegister();
    if(response == false){
        return;
    }
    if (response.statusCode === 200) {
      ShowAlert("success", "Registro Éxitoso!!!");
    } else if (response.statusCode === 500) {
      ShowAlert("danger", "Ocurrió un Error en la base de datos!!!");
    } else if (response.statusCode === 400) {
      ShowAlert("warning", "Ya te encuentras registrado en esta Actividad");
    }
  } else {
    ShowAlert("danger", "La hora de registro ya pasó");
  }
};

const GetLocalHour = () => {
    const date = new Date();
  return date.getHours() + ":" + date.getMinutes();
};

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

const PostRegister = async () => {
  //Properties
  const name = document.getElementById("name").value;
  const phone = document.getElementById("phone").value;
  const email = document.getElementById("email").value;
  const studentNumber = document.getElementById("studentNumber").value;
  const career = document.getElementById("career").value;
  const activity = document.getElementById("activityName").innerHTML.toString();
  const date = new Date();
  const registerAt = new Date().toLocaleDateString("en-us", {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  const hour = date.getHours() + ":" + date.getMinutes();
  const day = registerAt.split(',')[0];  
  //EndProperties
  
  if(!name || !email || !studentNumber || !career){
      ShowAlert('danger', 'Rellena los datos obligatorios(*) por favor');
      return false;
  }
  const data = {
    name,
    phone,
    email,
    studentNumber,
    career,
    activity,
    hour,
    day,
    registerAt
  };

  const post = await fetch(`${baseApi}`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return await post.json();
};

registerButton.addEventListener("click", StudentRegister);
