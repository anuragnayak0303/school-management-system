import Marqueemodel from "../models/Marquee.js"

export const marquee = async (req, res) => {
    try {
        const { text } = req.body
        const user = await Marqueemodel.findOne({ userId: req.user })
        if (!user) {
            const Text = new Marqueemodel({
                text,
                userId: req.user,
            })
            await Text.save()
            return res.send("Notice Add Successfully")
        }

        const data = await Marqueemodel.findOneAndUpdate({ userId: req.user }, {
            text
        })
        return res.send("Upadate Successfully ")
    } catch (error) {
        console.log(error)
    }
}

export const GetMarquee = async (req, res) => {
    try {
        const data = await Marqueemodel.findOne()
        return res.send(data)
    } catch (error) {
        console.log(error)
    }
}