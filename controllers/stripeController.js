import stripe from "stripe"


class StripeController {

    async create(req, res) {
        try {
            stripe(process.env.STRIPE_SECRET).charges.create({
                source: req.body.tokenId,
                amount: req.body.amount,
                currency: "usd"
            }, (stripeErr, stripeRes) => {
                if (stripeErr) return res.status(400).json(stripeErr)
                return res.json(stripeRes)
            })


        } catch (err) {
            return res.status(500).json({ message: "Server err0r" })
        }
    }


}
export default new StripeController();