import { StyleService } from '@ui-kitten/components';

const themedStyle = StyleService.create({
  root:{
    height: '100%',
    padding: 5
  },
  contentContainer:{
    flexDirection: 'row',
    marginBottom: 20
  },
  leftContainer:{
    width: '15%',
    alignItems: 'center',
    paddingRight: 5,
    justifyContent: 'center'
  },
  rightContainer:{
    width: '90%',
  },
  profileContainer:{
    height: '40%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'background-basic-color-2',
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'background-basic-color-4'
  },
  iconContainer:{
    backgroundColor: 'color-primary-500',
    padding: 20,
    borderRadius: 40
  },
  icon:{
    width: 35,
    height: 35,
    color: 'color-basic-100'
  },
  caption:{
    color: 'color-basic-600'
  },
  userIcon:{
    width: 25,
    height: 25,
    color: 'color-primary-500'
  },
  content:{
    fontSize: 17
  },
  cityState:{
    width: '93%'
  },
  btnContainer:{
    position: 'absolute',
    bottom: 0,
    width: '98%',
    justifyContent: 'center',
    margin: 10
  }
});

export default themedStyle;