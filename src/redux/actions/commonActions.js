import { USER_DATA, AUTO_OTP_HASH } from '@redux/actionCreators/commonAC';

export const setUserData = (payload) => {
  return {
    type: USER_DATA,
    payload
  };
};


export const setAutoOtpHash = (payload) => {
  return {
    type: AUTO_OTP_HASH,
    payload
  };
};