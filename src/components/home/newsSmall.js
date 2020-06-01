import React from 'react';
import { View, Image } from 'react-native';
import { StyleService, useStyleSheet, Text, Divider, Icon } from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/native';
import Ripple from 'react-native-material-ripple';

import PostedTime from '@common/postedTime';
import Lang from '@lang';

const NewsSmall = ({ data }) => {

  const navigation = useNavigation();
  const styles = useStyleSheet(themedStyle);

  const handleNavigation = () => {
    navigation.navigate('NewsDetail', { id: data.id, type: 'news' });
  }

  return (
    <>
      <View style={styles.container}>
        <View style={styles.bottomContainer}>
          <Ripple onPress={handleNavigation} style={styles.imageContainer}>
            <Image style={styles.image} source={{ uri: data.featured_img }} />
          </Ripple>
          <View style={styles.contentContainer}>
            <Ripple onPress={handleNavigation}>
              <Text category='p1' style={styles.title}>{data.id + ' ' + data.title}</Text>
            </Ripple>
            <View style={styles.bottomContainer}>
              <View style={styles.iconContainer}>
                <Icon style={styles.icon} fill={styles.icon.color} name='globe-2-outline' />
                <Text style={styles.caption}>{PostedTime(data.posted_on)}</Text>
              </View>
              {data.comments > 0 &&
                <View>
                  <Text style={styles.caption}>{data.comments} {Lang('comment.comments')}</Text>
                </View>
              }
            </View>
          </View>
        </View>
      </View>
      <Divider style={styles.divider} />
    </>
  )
}

export default NewsSmall;

const themedStyle = StyleService.create({
  image: {
    width: '100%',
    height: 100,
    borderRadius: 10,
  },
  imageContainer: {
    width: '30%'
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
  contentContainer: {
    width: '70%',
    paddingLeft: 5,
    justifyContent: 'space-between'
  },
  divider: {
    marginTop: 15,
    marginBottom: 15
  }
});