import { PersonModel } from "../models";

class PersonController {
    async fetchAll(req, res) {
        let people = await PersonModel.find();
        res.json(people).status(200);
    }
    
    async fetchOne(req, res) {
        let person = await PersonModel.findOne({ _id: req.params.id });
        res.json(person).status(200);
    }
    
    async createOne(req, res) {
        let newPerson = new PersonModel(req.body);
        await newPerson.save();
        res.json(newPerson).status(200);
    }
    
    async fetchOneAndUpdate(req, res) {
        let person = await PersonModel.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true });
        res.json(person).status(200);
    }
    
    async fetchOneAndDelete(req, res) {
        let person = await PersonModel.findOneAndDelete({ _id: req.params.id });
        res.json(person).status(200);
    }
}

export const personController = new PersonController();
