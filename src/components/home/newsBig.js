import React from 'react';
import { View, Image } from 'react-native';
import { StyleService, useStyleSheet, Text, Divider, Icon } from '@ui-kitten/components';

import PostedTime from '@common/postedTime';

const NewsBig = (props) => {

  const styles = useStyleSheet(themedStyle);
 
  return (
    <>
      <View style={styles.container}>
        <Image style={styles.image} source={{ uri: props.featured_img }} />
        <Text category='p1' style={styles.title}>{props.id + ' ' + props.title}</Text>
        <View style={styles.bottomContainer}>
          <View style={styles.iconContainer}>
            <Icon style={styles.icon} fill={styles.icon.color} name='globe-2-outline' />
            <Text style={styles.caption}>{PostedTime(props.posted_on)}</Text>
          </View>
          <View>
            <Text style={styles.caption}>12 Comments</Text>
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