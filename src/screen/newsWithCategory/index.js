import React from 'react';
import { View, ScrollView } from 'react-native';
import { Layout, Text, useStyleSheet, ViewPager } from '@ui-kitten/components';
import Ripple from 'react-native-material-ripple';
import { useRoute } from '@react-navigation/native';

import themedStyle from './style';
import { useAxios } from '@hooks';
import { GET_ALL_USER_CATEGORY } from '@api';
import Loader from '@comp/loader';
import LoadCompoment from './loadComponent';
import TopNav from '@comp/topNav';

const NewsWithCategory = () => {

  let route = useRoute();
  let brand_id = route.params.brand_id;
  const styles = useStyleSheet(themedStyle);
  let tabView = React.useRef(null);

  const [state, setState] = React.useState({
    selected: 0,
    refresh: false,
    categoryData: [],
    loading: false
  });

  const shouldLoadComponent = (index) => index === state.selected;

  React.useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setState({ ...state, loading: true });
    const categories = await useAxios(GET_ALL_USER_CATEGORY);
    setState({ ...state, categoryData: categories.data, loading: false });
  }

  const handleTabSelect = (index) => {
    setState({ ...state, selected: index });
    setTimeout(() => {
      tabView.current.scrollTo({ x: index * 80, y: 0, animated: true });
    }, 100)
  }

  const RenderItem = ({ index, item }) => {
    return (
      <Ripple style={[styles.tab, state.selected === index ? styles.selected : {}]} onPress={() => handleTabSelect(index)}>
        <Text style={state.selected === index ? styles.selectedText : {}}>{item.name}</Text>
      </Ripple>
    )
  }

  return (
    <>
      {state.loading === true
        ?
        <Loader />
        :
        <Layout>
          <View style={styles.categories}>
            <TopNav small/>
            <ScrollView horizontal={true} style={styles.tabView} ref={tabView} showsHorizontalScrollIndicator={false}>
              {state.categoryData.map((item, index) => {
                return <RenderItem index={index} item={item} />
              })}
            </ScrollView>
          </View>
          <View style={styles.content}>
            <ViewPager
              selectedIndex={state.selected}
              onSelect={(index) => handleTabSelect(index)}
              shouldLoadComponent={shouldLoadComponent}
            >
              {state.categoryData.map((item) => {
                return <LoadCompoment brand={brand_id} category={item.id} />
              })}
            </ViewPager>
          </View>
        </Layout>
      }
    </>
  );
};

export default React.memo(NewsWithCategory);