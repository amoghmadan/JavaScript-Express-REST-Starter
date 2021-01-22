import { model, Schema } from "mongoose";

const PersonSchema = new Schema({
    name: { type: String, required: true },
    age: { type: Number, required: true }
});

export const PersonModel = model("Person", PersonSchema);
