const express = require('express');
const cors = require('cors');
const MyCalculator = require('./MyCalculator');

const app = express();
app.use(express.json()); // for parsing application/json
app.use(cors()); // Enable CORS for all routes

app.post('/calculate', (req, res) => {
    let data = req.body;
    let calculator = new MyCalculator(data.year, data.month, data.day, data.byear, data.bmonth, data.bday, data.jaxi, data.jahao, data.lastname, data.firstname);
    console.log("hi");

	try {
        calculator.runCalculations();
        let results = calculator.printVariables();
        res.json(results);
    } catch(err) {
        console.error(err);
        res.status(500).json({ error: 'An error occurred while performing the calculation' });
    }
});

app.listen(process.env.PORT || 3000, function () {
  console.log('App listening on port ' + (process.env.PORT || 3000));
});