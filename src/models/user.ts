import { Schema, model, Types } from 'mongoose';
import bcrypt from 'bcryptjs';

const MODELNAME = 'user';

interface IUser {
  _id: Types.ObjectId;
  email: string;
  password: string;
  userResponseModel: () => { _id: Schema.Types.ObjectId; email: string };
}

const UserSchema = new Schema<IUser>(
  {
    _id: Schema.Types.ObjectId,
    email: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
      required: [true, 'Email address is required'],
      match: [/^.+@(?:[\w-]+\.)+\w+$/, 'Please fill a valid email address']
    },
    password: { type: String }
  },
  { timestamps: true }
);

UserSchema.methods.userResponseModel = function () {
  return {
    _id: this._id,
    email: this.email
  };
};

UserSchema.pre('save', function (next) {
  if (!this.isModified('password') && !this.isNew) return next();
  bcrypt.hash(this.password, 10, (_e, hash) => {
    this.password = hash;
    return next();
  });
});

const UserModel = model(MODELNAME, UserSchema);

export default UserModel;
