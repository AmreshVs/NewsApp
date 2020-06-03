import { StyleService } from '@ui-kitten/components';

const themedStyle = StyleService.create({
  root:{
    height: '100%'
  },
  container:{
    padding: 10
  },
  heading:{
    marginBottom: 10,
    fontWeight: '700',
    color: 'color-basic-700'
  },
  spinnerContainer:{
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%'
  }
})

export default themedStyle;