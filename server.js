const express = require('express')
const cors = require('cors')

const app = express();

var corOptions = {
    origin: 'https://localhost:8081'
}

//middleware
app.use(cors(corOptions))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


//routers
const product_router = require('./routes/productRouter');
app.use('/api/products', product_router);

const review_router = require('./routes/reviewRouter');
app.use('/api/reviews', review_router);



//resting api
app.get('/', (req, res) => {
    res.json({ message: 'hello from api' })
})

//port
const PORT = process.env.PORT || 8080

//server
app.listen(PORT, () => {
    console.log(`server is running on port http://localhost:${PORT}`)
})
