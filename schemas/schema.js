import mongoose from "mongoose"

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
})

const Prompt = mongoose.model("Prompt", schema)

export default Prompt
