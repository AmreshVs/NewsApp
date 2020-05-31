import React from 'react';
import { FlatList, RefreshControl } from 'react-native';
import { useStyleSheet, Text } from '@ui-kitten/components';

import RenderItems from './renderItems';
import { useAxios } from '@hooks';
import { NEWS_BY_CATEGORY } from '@api';
import Loader from '@comp/loader';
import themedStyle from './style';
import NoData from '@comp/noData';

const LoadComponent = ({ category, brand }) => {

  const styles = useStyleSheet(themedStyle);

  const [state, setState] = React.useState({
    newsData: [],
    loading: true,
    refresh: false,
    page: 1
  });

  React.useEffect(() => {
    loadData();
  }, [category, brand]);

  const loadData = async (load = false) => {
    if (state.page > 0) {
      setState({ ...state, refresh: true });
      const response = await useAxios({ ...NEWS_BY_CATEGORY, url: `${NEWS_BY_CATEGORY.url}?category=${category}&brand=${brand}&page=${load === true ? 1 : state.page}&size=10` });
      setState({ ...state, newsData: (load === true) ? [...response.data] : [...state.newsData, ...response.data], page: load === true ? 1 : state.page + 1, refresh: false, loading: false});
      if (response.pagination.nextPageUrl === '') {
        setState({ ...state, page: -1, loading: false });
      }
    }
  }

  const pullToRefresh = () => {
    setState({ ...state, page: 1 });
    loadData(true);
  }

  return (
    <>
      {state.loading === true
        ?
        <Loader />
        :
        state.newsData.length === 0 
        ?
          <NoData />
        :
          <FlatList
            data={state.newsData}
            style={styles.container}
            onEndReachedThreshold={1}
            refreshing={state.refresh}
            onRefresh={loadData}
            onEndReached={loadData}
            renderItem={({ item, index }) => <RenderItems id={category} item={item} index={index} />}
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
    </>
  )
}

export default LoadComponent;