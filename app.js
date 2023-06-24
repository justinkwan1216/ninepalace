document.getElementById('calculator-form').addEventListener('submit', async function(e) {
  e.preventDefault();
  
  // Get the form inputs
  let year = document.getElementById('year').value;
  let month = document.getElementById('month').value;
  let day = document.getElementById('day').value;
  let byear = document.getElementById('byear').value;
  let bmonth = document.getElementById('bmonth').value;
  let bday = document.getElementById('bday').value;
  let firstname = document.getElementById('firstname').value;
  let lastname = document.getElementById('lastname').value;
  let jaxi = document.getElementById('jaxi').value;
  let jahao = document.getElementById('jahao').value;

  // Make a POST request to the server
  let response = await fetch('http://localhost:3000/calculate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({year, month, day, byear, bmonth, bday, jaxi, jahao, lastname, firstname})
  });
  
  // Get the result from the server
  let results = await response.json();
  
  // Display results
  document.getElementById('results').innerHTML = JSON.stringify(results, null, 2);
});