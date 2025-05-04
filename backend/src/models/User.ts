import { Schema, model } from "mongoose";

interface Authentification {
  password: string;
  salt?: string;
  sessionToken?: string;
}

export interface IUser {
  username: string;
  email: string;
  authentification: Authentification;
}

const AuthentificationSchema = new Schema<Authentification>({
    password: { type: String, required: true, select: false },
    salt: { type: String, select: false },
    sessionToken: { type: String, select: false },
  },
  { _id: false },
);

const UserSchema = new Schema<IUser>({
  username: { type: String, required: true },
  email: { type: String, required: true },
  authentification: { type: AuthentificationSchema, required: true },
});

const UserModel = model<IUser>("User", UserSchema);

export default UserModel;

export const getUsers = () => UserModel.find();
export const getUserByEmail = (email: string) => UserModel.findOne({ email });
export const getUserBySessionToken = (sessionToken: string) =>
  UserModel.findOne({ "authentification.sessionToken": sessionToken });
export const getUserById = (id: string) => UserModel.findOne({ _id: id });
export const createUser = (values: Partial<IUser>) =>
  new UserModel(values).save();
export const deleteUserById = (id: string) =>
  UserModel.findOneAndDelete({ _id: id });
export const updateUserById = (id: string, values: Partial<IUser>) =>
  UserModel.findOneAndUpdate({ _id: id }, values, { new: true });
