import mongoose, { Document, Model } from 'mongoose';
import { Password } from '../services/password';

// An interface that describes the props that are required to create a new user.
interface User {
  email: string;
  password: string;
}

// An interface that describes the propeties that a User Document has.
interface UserDocument extends User, Document {}

// An interface that describes the properties that a User Model has.
interface UserModel extends Model<UserDocument> {
  build(attrs: User): UserDocument;
}

const userSchema = new mongoose.Schema<UserDocument, UserModel>(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
      },
      versionKey: false,
    },
  },
);

// Before saving user, it will call this function.
userSchema.pre('save', async function (done) {
  if (this.isModified('password')) {
    const hashed = await Password.toHash(this.get('password'));
    this.set('password', hashed);
  }
  done();
});

userSchema.statics.build = (attrs: User) => {
  return new User(attrs);
};

const User = mongoose.model<UserDocument, UserModel>('User', userSchema);

export { User };
