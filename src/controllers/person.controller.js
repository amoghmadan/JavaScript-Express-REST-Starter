import Person from '../models/person.model';

const fetchAll = async (req, res) => {
    let people = await Person.find();
    res.json(people).status(200);
};

const fetchOne = async (req, res) => {
    let person = await Person.findOne({ _id: req.params.id });
    res.json(person).status(200);
};

const createOne = async (req, res) => {
    let newPerson = new Person(req.body);
    await newPerson.save();
    res.json(newPerson).status(200);
};

const fetchOneAndUpdate = async (req, res) => {
    let person = await Person.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true });
    res.json(person).status(200);
};

const fetchOneAndDelete = async (req, res) => {
    let person = await Person.findOneAndDelete({ _id: req.params.id });
    res.json(person).status(200);
};

export { fetchAll, fetchOne, createOne, fetchOneAndUpdate, fetchOneAndDelete };
