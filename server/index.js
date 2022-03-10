const express = require ("express")
const Stripe = require ("stripe")
const cors = require ("cors")

const app = express()

const stripe = new Stripe("sk_test_51KbE1XIZJBIlDbGXMSRJUKW79AwjrIx8pFJ7aLkalzT7yL0Lhti771uJ0PoNGegRn11DaDuusvWrLGOCjBLnrusN00jhQzfOAC")

const PORT = 3001

//MIDDLEWARES
app.use(cors({origin: "http://localhost:3000"}))
app.use(express.json())

app.post("/api/tok_us/checkout", async(req,res) =>{
    console.log(req.body)
    const {id,amount}=req.body

    try {
        const payment = await stripe.paymentIntents.create({
            amount,
            currency:"usd",
            description: "payment of products",
            payment_method: id,
            confirm:true           
        }
        )
        
        console.log(payment)
        return res.status(200).json({message:"succesfull payment"})
    } catch (error) {
    return res.json({message: error.raw.message})        
    }
})

app.listen(PORT,()=>{
    console.log(`listen on port ${PORT}`)
})