import Snackbar from 'react-native-snackbar';

const snackBar = (text) => {
  Snackbar.show({
    text: text,
    duration: Snackbar.LENGTH_SHORT,
  });
}

export default snackBar;