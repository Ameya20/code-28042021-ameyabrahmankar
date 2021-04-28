const express = require('express');
var app = express()
app.use(express.json());
const port = process.env.port || 3000;
const path=require('path')

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));

})

app.post('/api', (req, res) => {
    //after computations
    const array = req.body;
    var overweightcount = 0;

    array.forEach((element) => {

        var bmi = element.WeightKg / (element.HeightCm / 100);
        element.BMI = bmi.toFixed(2);
        var bmiCategory = "";
        var healthrisk = "";

        switch (true) {
            case (bmi <= 18.4):
                bmiCategory = "Underweight";
                healthrisk = "Malnutrition risk";
                    break;
            case (bmi >= 18.5 && bmi <= 24.9):
                bmiCategory = "Normal weight";
                healthrisk = "Low risk";
                    break;
            case (bmi >= 25 && bmi <= 29.9):
                bmiCategory = "Overweight";
                healthrisk = "Enhanced risk";
                overweightcount++;
                    break;
            case (bmi >= 30 && bmi <= 34.9):
                bmiCategory = "Moderately obese";
                healthrisk = "Medium risk";
                    break;
            case (bmi >= 35 && bmi <= 39.9):
                bmiCategory = "Severely obese";
                healthrisk = "High risk";
                    break;

            default:
                bmiCategory = "Very severely obese";
                healthrisk = "Very high risk";
                    break;
        }
        element.BMI_category=bmiCategory;
        element.Health_risk=healthrisk;        
    })
    
    res.json(array)
    //Display count of overwieght
    console.log(overweightcount);

})


app.listen(port, () => {
    console.log('server stared at port 3000');
})


