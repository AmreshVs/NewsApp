import React from 'react';
import { Layout, useStyleSheet, Text, Spinner } from '@ui-kitten/components';
import { View, FlatList, RefreshControl } from 'react-native';
import _ from 'lodash';

import NewsItems from '@comp/home/newsItems';
import themedStyle from './style';
import { useAxios } from '@hooks';
import { API_URL } from '@const';

const Home = () => {
  const styles = useStyleSheet(themedStyle);
  const [state, setState] = React.useState({
    data: [],
    refresh: false,
    page: 1
  });

  React.useEffect(() => {
    loadMore();
  }, []);

  const loadMore = async (load = false) => {
    if (state.page > 0) {
      setState({...state, refresh: true});
      const response = await useAxios({ url: `${API_URL}/latest-news?page=${load === true ? 1 : state.page}&size=10` });
      setState({...state, data: (load === true) ? [...response.data] : [...state.data, ...response.data],  page: load === true ? 1 : state.page + 1, refresh: false});
      if (response.pagination.nextPageUrl === '') {
        setState({...state, page: -1});
      }
    }
  }

  const pullToRefresh = () => {
    setState({...state, page: 1});
    loadMore(true);
  }

  return (
    <Layout level='1'>
      {state.data.length <= 0 ?
        <View style={styles.spinnerContainer}>
          <Spinner/>
        </View>
      :
        <FlatList
          data={state.data}
          style={styles.container}
          onEndReachedThreshold={1}
          refreshing={state.refresh}
          onRefresh={() => loadMore()}
          onEndReached={loadMore}
          renderItem={({ item, index }) => <NewsItems item={item} index={index} />}
          keyExtractor={(item, index) => index.toString()}
          windowSize={10}
          initialNumToRender={10}
          refreshControl={
            <RefreshControl
              refreshing={state.refresh}
              onRefresh={pullToRefresh}
            />
          }
        />
      }
    </Layout>
  )
}

export default Home;