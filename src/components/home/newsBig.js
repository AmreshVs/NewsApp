import React from 'react';
import { View, Image } from 'react-native';
import { StyleService, useStyleSheet, Text, Divider, Icon } from '@ui-kitten/components';

import PostedTime from '@common/postedTime';

const NewsBig = ({data}) => {

  const styles = useStyleSheet(themedStyle);
 
  return (
    <>
      <View style={styles.container}>
        <Image style={styles.image} source={{ uri: data.featured_img }} />
        <Text category='p1' style={styles.title}>{data.id + ' ' + data.title}</Text>
        <View style={styles.bottomContainer}>
          <View style={styles.iconContainer}>
            <Icon style={styles.icon} fill={styles.icon.color} name='globe-2-outline' />
            <Text style={styles.caption}>{PostedTime(data.posted_on)}</Text>
          </View>
          <View>
            <Text style={styles.caption}>{data.comments} Comments</Text>
          </View>
        </View>
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
  icon: {
    width: 17,
    height: 17,
    color: 'color-basic-600',
    marginRight: 5
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
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