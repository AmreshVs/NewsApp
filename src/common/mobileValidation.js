import snackBar from './snackBar';
import Lang from '@lang';

const mobileValidation = (mobile) => {
  var expression = /^\+([0-9]{2})\)?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/;

  if (mobile.length <= 0) {
    snackBar(Lang('validation.enter_mobile'));
    return false;
  }
  else if(mobile.length > 0 && !mobile.match(expression)){
    snackBar(Lang('validation.enter_valid_mobile'));
    return false;
  }
  else{
    return true;
  }
}

export default mobileValidation;