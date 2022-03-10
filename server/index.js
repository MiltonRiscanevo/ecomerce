const express = require ("express")
const Stripe = require ("stripe")
const cors = require ("cors")

const app = express()

const stripe = new Stripe("sk_test_51KbE1XIZJBIlDbGXMSRJUKW79AwjrIx8pFJ7aLkalzT7yL0Lhti771uJ0PoNGegRn11DaDuusvWrLGOCjBLnrusN00jhQzfOAC")

const PORT = 3001

//MIDDLEWARES
app.use(cors({origin: "http://localhost:3000"}))
app.use(express.json())

app.post("/api/checkout", async(req,res) =>{
    console.log(req.body)
    res.send("Ok quedo pagado")

    const {id,amount}=req.body

    try {
        const payment = await stripe.paymentIntents.create({
            amount,
            currency:"usd",
            description: "payment of products",
            payment_method_types: [
                "card"
                ],

        })
        console.log(payment)
        res.status(200).json({message:"succesfull payment"})
    } catch (error) {
        console.log(error)
    }
})

app.listen(PORT,()=>{
    console.log(`listen on port ${PORT}`)
})