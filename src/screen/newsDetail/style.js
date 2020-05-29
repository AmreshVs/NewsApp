import { StyleService } from '@ui-kitten/components';

const themedStyle = StyleService.create({
  root:{
    height: '100%',
  },
  featured_img:{
    height: 300,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'background-basic-color-4'
  },
  heading:{
    marginBottom: 10,
    fontWeight: '700'
  },
  contentContainer:{
    paddingTop: 0,
    padding: 10,
  },
  html:{
    p:{
      color: '#FFF'
    }
  },
  spinnerContainer:{
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%'
  },
  video: {
    width: '100%',
    height: 220,
    borderRadius: 10,
    marginBottom: 10,
    overflow: 'hidden',
  },
  icon:{
    width: 25,
    height: 25
  }
});

export default themedStyle;