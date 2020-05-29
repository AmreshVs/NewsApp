import { StyleService } from '@ui-kitten/components';

const themedStyle = StyleService.create({
  root:{
    height: '100%',
  },
  container:{
    padding: 10,
  },
  heading:{
    marginBottom: 10,
    fontWeight: '700',
    color: 'color-basic-700'
  },
  noData:{
    justifyContent: 'center',
    alignItems: 'center',
    height: '97%'
  },
  icon:{
    width: 25,
    height: 25
  }
})

export default themedStyle;