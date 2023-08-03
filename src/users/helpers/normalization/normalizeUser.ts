import { RegisterType } from "../../models/types/userTypes";

const normalizeUser = (user: RegisterType) => {
  return {
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

export default normalizeUser;
