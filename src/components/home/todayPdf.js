import React from 'react';
import { View, Image, ScrollView } from 'react-native';
import { StyleService, useStyleSheet, Text, Divider, Spinner } from '@ui-kitten/components';
import Ripple from 'react-native-material-ripple';
import { useNavigation } from '@react-navigation/native';

import { useAxios } from '@hooks';
import { TOP_SECTION } from '@api';
import Lang from '@lang';

const TodayPdf = () => {

  const navigation = useNavigation();
  const styles = useStyleSheet(themedStyle);
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const response = await useAxios(TOP_SECTION);
    setData(response.todayPdf);
  }

  const handleNavigate = (url) => {
    navigation.navigate('PDFViewer', { url: url });
  }

  return (
    <>
      <View style={styles.headingContainer}>
        <Text category='h6' style={styles.heading}>{Lang('home.latest_pdf')}</Text>
        <Ripple onPress={() => navigation.navigate('AllPdfs')}>
          <Text category='h6' style={styles.more}>{Lang('home.more')}</Text>
        </Ripple>
      </View>
      {data.length <= 0 ?
        <View style={styles.spinnerContainer}>
          <Spinner />
        </View>
        :
        <ScrollView horizontal={true}>
          {Object.keys(data).length > 0 && data.map((item) => {
            return (
              <Ripple style={styles.container} onPress={() => handleNavigate(item.url)}>
                <Image style={styles.image} source={{ uri: item.featured_img }} />
              </Ripple>
            )
          })}
        </ScrollView>
      }
      <Divider style={styles.divider} />
    </>
  )
}

export default TodayPdf;

const themedStyle = StyleService.create({
  heading: {
    marginBottom: 5
  },
  container: {
    padding: 5,
    borderWidth: 1,
    borderColor: 'background-basic-color-2',
    marginHorizontal: 3,
    borderRadius: 10,
    backgroundColor: 'background-basic-color-1'
  },
  image: {
    width: 120,
    height: 200,
  },
  caption: {
    color: 'color-basic-600'
  },
  divider: {
    marginTop: 5,
    marginBottom: 5
  },
  spinnerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 200
  },
  headingContainer:{
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  more:{
    marginBottom: 5,
    color: 'color-basic-600',
  }
});