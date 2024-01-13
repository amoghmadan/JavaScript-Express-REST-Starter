import {compare, genSalt, hash} from 'bcryptjs';
import {Schema, model} from 'mongoose';

const tokenSchema = new Schema(
    {
      key: {type: String, required: true, unique: true},
    },
    {timestamps: {createdAt: 'created'}},
);

const userSchema = new Schema({
  email: {type: String, required: true, unique: true},
  firstName: {type: String, required: true},
  lastName: {type: String, required: true},
  password: {type: String, required: true},
  isAdmin: {type: Boolean, required: false, default: false},
  isActive: {type: Boolean, required: true, default: true},
  dateJoined: {type: Date, required: true, default: Date.now},
  lastLogin: {type: Date, required: false},
  token: {type: tokenSchema, required: false},
});

userSchema.pre('save', async function(next) {
  // eslint-disable-next-line no-invalid-this
  if (!this.isModified('password')) return next();
  try {
    const salt = await genSalt(12);
    // eslint-disable-next-line no-invalid-this
    const hashedPassword = await hash(this.password, salt);
    // eslint-disable-next-line no-invalid-this
    this.password = hashedPassword;
    return next();
  } catch (e) {
    return next(e);
  }
});

userSchema.methods.validatePassword = async function(candidatePassword) {
  // eslint-disable-next-line no-invalid-this
  const success = await compare(candidatePassword, this.password);
  return success;
};

const User = model('User', userSchema);

export default User;
