import React from 'react';
import { View, Image } from 'react-native';
import { StyleService, useStyleSheet, Text, Divider, Icon } from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/native';
import Ripple from 'react-native-material-ripple';


const PdfSmall = ({ data }) => {

  const navigation = useNavigation();
  const styles = useStyleSheet(themedStyle);

  const handleNavigation = () => {
    navigation.navigate('NewsDetail', { id: data.id, type: 'news' });
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
        <FavouritesIcon/>
        <Ripple onPress={handleNavigation} style={styles.imageContainer}>
          <Image style={styles.image} source={{ uri: data.featured_img }} />
        </Ripple>
      </View>
    </View>
  )
}

export default PdfSmall;

const themedStyle = StyleService.create({
  image: {
    width: '100%',
    height: 250,
    borderRadius: 10,
    resizeMode: 'contain'
  },
  imageContainer: {
    width: '100%'
  },
  container: {
    width: '40%',
    
  },
  iconContainer:{
    position: 'absolute',
    right: 10,
    top: 10,
    zIndex: 1
  },
  icon: {
    width: 30,
    height: 30,
    color: 'color-basic-100',
  },
  bottomContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    flexWrap: 'wrap'
  },
  divider: {
    marginTop: 15,
    marginBottom: 15
  }
});