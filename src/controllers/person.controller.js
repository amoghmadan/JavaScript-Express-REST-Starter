import Person from '../models/person.model';

class PersonController {
    async fetchAll(req, res) {
        let people = await Person.find();
        res.json(people).status(200);
    }
    
    async fetchOne(req, res) {
        let person = await Person.findOne({ _id: req.params.id });
        res.json(person).status(200);
    }
    
    async createOne(req, res) {
        let newPerson = new Person(req.body);
        await newPerson.save();
        res.json(newPerson).status(200);
    }
    
    async fetchOneAndUpdate(req, res) {
        let person = await Person.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true });
        res.json(person).status(200);
    }
    
    async fetchOneAndDelete(req, res) {
        let person = await Person.findOneAndDelete({ _id: req.params.id });
        res.json(person).status(200);
    }
}

export const personController = new PersonController();
