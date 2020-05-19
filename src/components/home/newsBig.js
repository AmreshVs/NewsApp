import React from 'react';
import { View, Image } from 'react-native';
import { StyleService, useStyleSheet, Text, Divider } from '@ui-kitten/components';

const NewsBig = (props) => {

  const styles = useStyleSheet(themedStyle);

  return (
    <>
    <View style={styles.container}>
      <Image style={styles.image} source={{uri: 'https://kaalaimani.com/wp-content/uploads/2020/01/sensex-up.jpg'}} />
      <Text category='p1' style={styles.title}>தமிழகத்தில் மேலும் 536 பேருக்கு கொரோனா தமிழகத்தில் தொற்று எண்ணிக்கை 11,760 ஆக உயர்வு</Text>
      <Divider/>
    </View>
    <View style={styles.container}>
      <Image style={styles.image} source={{uri: 'https://kaalaimani.com/wp-content/uploads/2020/01/sensex-up.jpg'}} />
      <Text category='p1' style={styles.title}>தமிழகத்தில் மேலும் 536 பேருக்கு கொரோனா தமிழகத்தில் தொற்று எண்ணிக்கை 11,760 ஆக உயர்வு</Text>
      <Divider/>
    </View>
    </>
  )
}

export default NewsBig;

const themedStyle = StyleService.create({
  image:{
    width: '100%',
    height: 220,
    borderRadius: 10,
  },
  title:{
    paddingTop: 5,
    marginBottom: 10
  },
  container: {
    marginBottom: 15
  }
});