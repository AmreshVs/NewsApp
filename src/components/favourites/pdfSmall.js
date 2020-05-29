import React from 'react';
import { View, Image } from 'react-native';
import { StyleService, useStyleSheet, Icon, Text } from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/native';
import Ripple from 'react-native-material-ripple';


const PdfSmall = ({ data, handleFavourite }) => {
  
  const navigation = useNavigation();
  const styles = useStyleSheet(themedStyle);

  const handleNavigation = () => {
    navigation.navigate('PDFViewer', { url: data.url });
  }

  const FavouritesIcon = (props) => {
    return(
      <Ripple style={styles.iconContainer} onPress={() => handleFavourite({id: `${data.id}`, type: 'pdfs'})}>
        <Icon {...props} style={styles.icon} fill={styles.icon.color} name='bookmark' />
      </Ripple>
    )
  }

  return (
    <View style={styles.container}>
      <View style={styles.bottomContainer}>
        {handleFavourite !== undefined ? <FavouritesIcon/> : null}
        <Ripple onPress={handleNavigation} style={styles.imageContainer}>
          <Image style={styles.image} source={{ uri: data.featured_img }} />
          {handleFavourite === undefined ? <Text style={styles.posted_on}>{data.posted_on}</Text> : null}
        </Ripple>
      </View>
    </View>
  )
}

export default PdfSmall;

const themedStyle = StyleService.create({
  image: {
    width: '100%',
    height: 330,
    resizeMode: 'stretch'
  },
  imageContainer: {
    width: '100%',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'background-basic-color-4',
    padding: 5,
  },
  container: {
    width: '50%',
  },
  iconContainer:{
    position: 'absolute',
    right: 10,
    top: 10,
    zIndex: 1,
    backgroundColor: 'color-basic-800',
    borderRadius: 20,
    padding: 3
  },
  icon: {
    width: 25,
    height: 25,
    color: 'color-basic-100',
  },
  bottomContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: 5,
  },
  posted_on:{
    textAlign: 'center',
    paddingTop: 5
  }
});