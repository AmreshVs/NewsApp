import { StyleService } from '@ui-kitten/components';

const themedStyle = StyleService.create({
  layout:{
    height: '100%',
  },
  root:{
    height: '90%',
    alignItems: 'center',
    // justifyContent: 'center',
    // backgroundColor: 'red'
  },
  logo:{
    width: 70,
    height: 70,
    marginTop: 10,
    marginBottom: 10
  },
  inputContainer:{
    paddingTop: 20,
    width: '90%',
    alignItems: 'center'
  },
  button:{
    borderRadius: 30,
    width: '50%',
    marginTop: 20
  },
  signinContainer:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 20
  },
  signinText:{
    fontWeight: '700'
  },
  indicator: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  cityState:{
    width: '100%',
    borderRadius: 30,
    marginVertical: 20,
  }
});

export default themedStyle;