import React from 'react';
import { Layout, useStyleSheet, Text } from '@ui-kitten/components';
import { FlatList } from 'react-native';
import _ from 'lodash';

import NewsItems from '@comp/home/newsItems';
import themedStyle from './style';
import { useAxios } from '@hooks';
import { API_URL } from '@const';

const Home = () => {
  const styles = useStyleSheet(themedStyle);
  const [state, setState] = React.useState([]);
  const [refresh, setRefresh] = React.useState(true);
  const [page, setPage] = React.useState(1);

  React.useEffect(() => {
    loadMore();
  }, []);

  const loadMore = async () => {
    if (page > 0) {
      setRefresh(true);
      const response = await useAxios({ url: `${API_URL}/latest-news?page=${page}&size=10` });
      setPage(page + 1);
      setState([...state, ...response.data]);
      setRefresh(false);
      if (response.pagination.nextPageUrl === '') {
        setPage(-1);
      }
    }
  }

  return (
    <Layout level='2'>
      <FlatList
        data={state}
        style={styles.container}
        onEndReachedThreshold={1}
        refreshing={refresh}
        onRefresh={loadMore}
        onEndReached={loadMore}
        renderItem={({ item, index }) => <NewsItems item={item} index={index} />}
        keyExtractor={(item, index) => index.toString()}
        windowSize={10}
        initialNumToRender={10}
      />
    </Layout>
  )
}

export default Home;