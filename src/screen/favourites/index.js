import React from 'react';
import { Layout, useStyleSheet, Text, Icon } from '@ui-kitten/components';
import { FlatList, RefreshControl, View } from 'react-native';

import NewsItems from '@comp/favourites/newsItems';
import themedStyle from './style';
import { useAxios } from '@hooks';
import { GET_FAV_ITEMS } from '@api';
import Loader from '@comp/loader';
import DarwerNav from '@comp/drawerNav';
import Lang from '@lang';

const Favourites = ({ navigation }) => {

  const styles = useStyleSheet(themedStyle);
  const [state, setState] = React.useState({
    data: [],
    refresh: false,
    page: 1,
    loading: true,
    pdf: []
  });

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      loadMore();
    });

    return unsubscribe;
  }, [navigation]);

  const loadMore = async (load = false) => {
    if (state.page > 0 || load === true) {
      setState({ ...state, refresh: true });
      const response = await useAxios({ ...GET_FAV_ITEMS, url: `${GET_FAV_ITEMS.url}?page=${load === true ? 1 : state.page}&size=10` });
      let filterPdf = response.data.filter((item) => item.type === 'pdf');
      setState({ ...state, data: (state.page === 1 || load === true) ? response.data : [...state.data, ...response.data], page: load === true ? 1 : state.page + 1, refresh: false, loading: false, pdf: (state.page === 1 || load === true) ? filterPdf : [...state.pdf, ...filterPdf] });
      if (response.pagination.nextPageUrl === '') {
        setState({ ...state, page: -1 });
      }
    }
  }

  const pullToRefresh = async () => {
    setState({ ...state, data: [], page: 1, loading: true });
    await loadMore(true);
  }

  const handleRefresh = async () => {
    setState({ ...state, loading: true });
    const response = await useAxios({ ...GET_FAV_ITEMS, url: `${GET_FAV_ITEMS.url}?page=1&size=10` });
    let filterPdf = response.data.filter((item) => item.type === 'pdf');
    setState({ ...state, data: response.data, loading: false, pdf: filterPdf });
  }

  const RefreshIcon = (props) => {
    return <Icon {...props} style={[props.style, styles.icon]} name='sync-outline' onPress={handleRefresh} />
  }

  return (
    <Layout level='1' style={styles.root}>
      {state.loading === true ?
        <Loader />
        :
        state.data.length <= 0
          ?
          <View style={styles.container}>
            <DarwerNav rightAction={RefreshIcon} />
            <View style={styles.noData}>
              <Text>{Lang('common.no_saved')}</Text>
            </View>
          </View>
          :
          <FlatList
            data={state.data}
            style={styles.container}
            onEndReachedThreshold={1}
            refreshing={state.refresh}
            onRefresh={loadMore}
            onEndReached={loadMore}
            renderItem={({ item, index }) => <NewsItems item={item} index={index} refresh={handleRefresh} pdf={state.pdf} />}
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

export default React.memo(Favourites);