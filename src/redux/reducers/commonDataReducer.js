import { USER_DATA, AUTO_OTP_HASH } from '@redux/actionCreators/commonAC';

const initialState = {
  userData: {},
  theme: 'light',
  autoOtpHash: ''
};

const CommonDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_DATA:
      return { ...state, userData: action.payload };
    case AUTO_OTP_HASH:
      return { ...state, autoOtpHash: action.payload };
    default:
      return state;
  }
};

export default CommonDataReducer;