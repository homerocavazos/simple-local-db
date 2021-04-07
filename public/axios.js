const form = document.getElementById('myForm')
const users = document.getElementById('users')

async function getData() {
  await axios.get('/api').then(response => {
    const data = response.data;
    let html = data.map(li => {
      return '<li>' + li.email_address + '</li>'
    });


    users.innerHTML = html.join("")
  })
};

getData()


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
    console.log(err);
  })
}



// ...and take over its submit event.
form.addEventListener( "submit", function ( event ) {
  event.preventDefault();

  sendData();
} );


