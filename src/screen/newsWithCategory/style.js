import { StyleService } from '@ui-kitten/components';

const themedStyle = StyleService.create({
  root:{
    width: '100%',
    height: '100%'
  },
  tabView:{
    width: '100%',
    maxHeight: 45,
    height: '10%',
    padding: 5
  },
  tab:{
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 3,
    // backgroundColor: 'color-basic-100',
    borderRadius: 30,
    borderWidth: 1,
    borderColor: 'color-basic-500'
  },
  selected:{
    borderColor: 'color-primary-500',
  },
  selectedText:{
    color: 'color-primary-500',
    fontWeight: '700'
  },
  container:{
    padding: 10,
  },
  categories:{
    height: '13%',
  },
  content:{
    height: '87%'
  }
});

export default themedStyle;