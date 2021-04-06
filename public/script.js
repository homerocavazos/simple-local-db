async function sendData() {

  const first_name = document.getElementById('fname').value;
  const last_name = document.getElementById('lname').value;
  const email_address = document.getElementById('email').value;
  const form = document.getElementById('myForm')

  const data = {
    first_name, last_name, email_address
  }
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
  
  return fetch("/api", options).then(res => {
    form.reset();
  });
    // const db_json = await db_response.json();
    // console.log(db_json);
    
} 

// postData();


getData();
async function getData() {
  const response = await fetch("/api");
  const data = await response.json();
    
  // console.log(data);
  // for (item of data) {
    
  //   const txt = `The tempature in ${item.weather.name} is ${Math.round(
  //     item.weather.main.temp
  //   )} degrees farenheit.`;
  //     console.log(txt);
  
  // }
}


// Access the form element...
const form = document.getElementById( "myForm" );

// ...and take over its submit event.
form.addEventListener( "submit", function ( event ) {
  event.preventDefault();

  sendData();
} );