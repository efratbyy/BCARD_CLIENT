import ImageInterface from "./ImageInterface";
import AddressInterface from "./AddressInterface";
import NameInterface from "./NameInterface";

interface UserInterface {
  _id: string;
  name: NameInterface;
  phone: string;
  email: string;
  password: string;
  image: ImageInterface;
  address: AddressInterface;
  web?: string;
  isBusiness: boolean;
  isAdmin: boolean;
  isGoogleSignup: boolean;
  isBlocked: boolean;
  loginFailedCounter: number;
  blockedTime: Date;
}

export default UserInterface;
