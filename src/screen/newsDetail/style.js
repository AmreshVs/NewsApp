import { StyleService } from '@ui-kitten/components';

const themedStyle = StyleService.create({
  root:{
    height: '100%',
    alignItems: 'center',
  },
  featured_img:{
    width: '100%',
    height: 300,
  },
  heading:{
    marginBottom: 10,
    fontWeight: '700'
  },
  contentContainer:{
    padding: 10
  }
});

export default themedStyle;