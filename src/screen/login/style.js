import { StyleService } from '@ui-kitten/components';

const themedStyle = StyleService.create({
  root:{
    height: '100%',
    alignItems: 'center'
  },
  logo:{
    width: 70,
    height: 70,
    marginTop: 100,
    marginBottom: 10
  },
  inputContainer:{
    paddingTop: 20,
    width: '90%',
    alignItems: 'center'
  },
  button:{
    borderRadius: 30,
    width: '50%'
  },
  signupContainer:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 20
  },
  signupText:{
    fontWeight: '700'
  },
  indicator: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default themedStyle;