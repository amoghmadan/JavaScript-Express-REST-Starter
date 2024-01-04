import joi from 'joi';

export default {
  createSuperUser: joi.object({
    email: joi.string().email().required().label('Email'),
    firstName: joi.string().min(1).required().label('First name'),
    lastName: joi.string().min(1).required().label('Last name'),
    password: joi.string().min(8).max(15).required().label('Password'),
    passwordAgain: joi
        .any()
        .equal(joi.ref('password'))
        .required()
        .label('Password (again)')
        .messages({'any.only': 'Error: Your passwords didn\'t match.'}),
  }),
  login: joi.object({
    email: joi.string().email().required().label('Email'),
    password: joi.string().min(8).max(15).required().label('Password'),
  }),
  changePassword: joi.object({
    email: joi.string().email().required().label('Email'),
    password: joi.string().min(8).max(15).required().label('Password'),
    passwordAgain: joi
        .any()
        .equal(joi.ref('password'))
        .required()
        .label('Password (again)')
        .messages({'any.only': 'Error: Your passwords didn\'t match.'}),
  }),
};
