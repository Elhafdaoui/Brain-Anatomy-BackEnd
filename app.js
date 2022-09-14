const express = require('express')
const cors = require('cors');

const { Cognitive_Functions, CalculateRMS } = require('./cognitive_fns')
const app = express()

const PORT = 8080

// Json middleware req.body ..
app.use(express.json())
// CORS 
app.use(cors());


app.get('/', (req, res, next) => {
    res.send("Welcome to Brain anatomy")

})
// Fetch cognitive functions
app.get('/cognitive_functions', (req, res, next) => {
    const { area } = req.query;
    const cognitive_fns = Cognitive_Functions[area].map(f => {
        return {
            id: f.id,
            function: f.function
        }
    });
    res.status(200).json({ cognitive_fns: cognitive_fns });
})
// Calculate PP indicator
app.post('/cognitive_functions', (req, res, next) => {

    const { area } = req.body;
    const { checked_fns } = req.body;

    const pp_indicator = CalculateRMS(area, checked_fns);

    res.status(200).json({ pp_indicator: pp_indicator });
})

const start = async () => {
    try {
        app.listen(PORT, () => console.log(`✅ Server running ${PORT} ...`))
    } catch (error) {
        console.log(error)
    }
}

start()