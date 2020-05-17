const english = require('./english.json');

const Lang = (props) => {
  let language = props.split('.');
  let index = language[0];
  let value = language[1];
  return english[index][value];
}

export default Lang;