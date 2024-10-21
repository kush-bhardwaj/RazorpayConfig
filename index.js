const express = require('express');
const cors = require('cors');
const PaymentRoute = require('./router/PaymentRouter');
const app = express()
const port ="5000";
app.use(express.json());
app.use(cors())
app.use('/api',PaymentRoute)
app.listen(port,()=>{
    console.log(`server start http://localhost:${port}`)
})
