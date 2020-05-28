import React from 'react';
import { Layout, useStyleSheet, Text } from '@ui-kitten/components';
import { FlatList, RefreshControl, View } from 'react-native';

import NewsItems from '@comp/favourites/newsItems';
import themedStyle from './style';
import { useAxios } from '@hooks';
import { GET_FAV_ITEMS } from '@api';
import Loader from '@comp/loader';

const Favourites = () => {
  const styles = useStyleSheet(themedStyle);
  const [state, setState] = React.useState({
    data: [],
    refresh: false,
    page: 1,
    loading: false
  });

  React.useEffect(() => {
    loadMore();
  }, []);

  const loadMore = async (load = false) => {
    if (state.page > 0 || load === true) {
      setState({...state, refresh: true});
      const response = await useAxios({ ...GET_FAV_ITEMS, url: `${GET_FAV_ITEMS.url}?page=${load === true ? 1 : state.page}&size=10` });
      setState({...state, data: state.page === 1 ? response.data : [...state.data, ...response.data],  page: load === true ? 1 : state.page + 1, refresh: false, loading: false});
      if (response.pagination.nextPageUrl === '') {
        setState({...state, page: -1});
      }
    }
  }

  const pullToRefresh = async () => {
    setState({...state, data: [], page: 1, loading: true});
    await loadMore(true);
  }

  const handleRefresh = async () => {
    setState({...state, loading: true});
    const response = await useAxios({ ...GET_FAV_ITEMS, url: `${GET_FAV_ITEMS.url}?page=1&size=10` });
    setState({...state, data: response.data, loading: false});
  }

  return (
    <Layout level='1' style={styles.root}>
      {state.loading === true ?
        <Loader/>
      :
        state.data.length <= 0 
        ?
          <View style={styles.noData}>
            <Text>No Saved News!</Text>
          </View>
        :
          <FlatList
            data={state.data}
            style={styles.container}
            onEndReachedThreshold={0.5}
            refreshing={state.refresh}
            onRefresh={loadMore}
            onEndReached={loadMore}
            renderItem={({ item, index }) => <NewsItems item={item} index={index} refresh={handleRefresh} />}
            keyExtractor={(item, index) => index.toString()}
            windowSize={3}
            initialNumToRender={3}
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

export default React.memo(Favourites);