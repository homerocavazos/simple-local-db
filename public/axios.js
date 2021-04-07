const form = document.getElementById('myForm')

async function getData() {
  await axios.get('/api').then(response => {
    console.log(response);
  })
};

async function sendData() {

  const first_name = document.getElementById('fname').value;
  const last_name = document.getElementById('lname').value;
  const email_address = document.getElementById('email').value;
  
  const data = {
    first_name, last_name, email_address
  }

  return axios.post('/api',data).then(response => {
    console.log(response);
  })
    .catch(err => {
    console.log(err, err.response);
  })
}



// ...and take over its submit event.
form.addEventListener( "submit", function ( event ) {
  event.preventDefault();

  sendData();
} );


