const express = require("express")
const Stripe = require("stripe")
const stripe = new Stripe("<your_secretkey_here>")

const cors = require("cors");

const app = express()

app.use(cors({ origin: "http://localhost:3000" }))
app.use(express.json());

app.post("/checkout", async, isAuthenticated, (req, res) => {

    const { _id: user_id } = req.payload
    const { game_id } = req.params

    try {
        const payment = await stripe.paymentIntents.create({
            amount,
            currency: "USD",
            description: game_id,
            payment_method: id,
            confirm: true
        })

        return res.status(200).json({ message: "Successful Payment" })
    } catch (error) {
        console.log(error);
        return res.json({ message: error.raw.message })
    }
})

module.exports = router