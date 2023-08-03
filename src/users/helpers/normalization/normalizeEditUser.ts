import { UserMapToModelType } from "../../models/types/userTypes";

const normalizeEditUser = (user: UserMapToModelType) => {
  return {
    _id: user._id,
    name: {
      first: user.first,
      middle: user.middle,
      last: user.last,
    },
    phone: user.phone,
    email: user.email,
    password: user.password,
    image: {
      url: user.url,
      alt: user.alt,
    },
    address: {
      state: user.state,
      country: user.country,
      city: user.city,
      street: user.street,
      zip: user.zip,
      houseNumber: user.houseNumber,
    },
    isBusiness: user.isBusiness,
    isGoogleSignup: user.isGoogleSignup,
    isBlocked: user.isBlocked,
    loginFailedCounter: user.loginFailedCounter,
    blockedTime: user.blockedTime,
  };
};

export default normalizeEditUser;
