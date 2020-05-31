import { StyleService } from '@ui-kitten/components';

const themedStyle = StyleService.create({
  root:{
    height: '100%'
  },
  pdfContainer:{
    flexDirection: 'row'
  },
  filterContainer:{
    flexDirection: 'row',
    padding: 5,
    justifyContent: 'space-between',
  },
  datePicker:{
    width: '70%',
    paddingRight: 5
  },
  button:{
    width: '20%',
    paddingLeft: 5
  },
  iconContainer:{
    width: '10%',
    backgroundColor: 'background-basic-color-2',
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    borderRadius: 5,
    borderColor: 'border-basic-color-4',
    borderWidth: 1
  },
  filter:{
    height: 40
  },
  icon:{
    width: 25,
    height: 25,
    color: 'color-basic-600',
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});

export default themedStyle;