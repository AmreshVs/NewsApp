import React from 'react';
import { View, Image } from 'react-native';
import { StyleService, useStyleSheet, Text, Divider, Icon } from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/native';
import Ripple from 'react-native-material-ripple';

const NewsBig = ({handleFavourite, data}) => {
  
  const navigation = useNavigation();
  const styles = useStyleSheet(themedStyle);

  const handleNavigation = () => {
    navigation.navigate('NewsDetail', { id: data.id, type: 'news' });
  }

  const FavouritesIcon = (props) => {
    return(
      <Ripple style={styles.iconContainer} onPress={() => handleFavourite({id: `${data.id}`, type: 'news'})}>
        <Icon {...props} style={styles.icon} fill={styles.icon.color} name='bookmark' />
      </Ripple>
    )
  }
 
  return (
    <>
      <View style={styles.container}>
        <FavouritesIcon/>
        <Ripple onPress={handleNavigation}>
          <Image style={styles.image} source={{ uri: data.featured_img }} />
        </Ripple>
        <Ripple onPress={handleNavigation}>
          <Text category='p1' style={styles.title}>{data.title}</Text>
        </Ripple>
        <Divider style={styles.divider} />
      </View>
    </>
  )
}

export default NewsBig;

const themedStyle = StyleService.create({
  image: {
    width: '100%',
    height: 220,
    borderRadius: 10,
  },
  title: {
    paddingTop: 5,
    marginBottom: 10
  },
  container: {
  },
  caption: {
    color: 'color-basic-600'
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
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  divider:{
    marginTop: 15,
    marginBottom: 15
  }
});