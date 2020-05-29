import React from 'react';
import { FlatList, RefreshControl } from 'react-native';
import { Text, useStyleSheet, Layout } from '@ui-kitten/components';

import themedStyle from './style';
import { useAxios } from '@hooks';
import { GET_ALL_USER_PDF } from '@api';
import RenderItems from './renderItems';
import Loader from '@comp/loader';
import TopNav from '@comp/topNav';

const AllPdfs = () => {

  const styles = useStyleSheet(themedStyle);
  const [state, setState] = React.useState({
    data: [],
    refresh: false,
    page: 1
  });

  React.useEffect(() => {
    loadMore();

    return () => {
      setState({data: [], refresh: false, page: 1});
    }
  }, []);

  const loadMore = async (load = false) => {
    const response = await useAxios({ ...GET_ALL_USER_PDF, url: `${GET_ALL_USER_PDF.url}?page=${load === true ? 1 : state.page}&size=10` })
    setState({ ...state, data: response.data });
  }

  const pullToRefresh = () => {
    setState({ ...state, page: 1 });
    loadMore(true);
  }

  return (
    <Layout style={styles.root}>
      {state.data.length <= 0 ?
        <Loader/>
      :
      <>
        {/* <TopNav/> */}
        <FlatList
          data={state.data}
          style={styles.container}
          onEndReachedThreshold={1}
          refreshing={state.refresh}
          onRefresh={loadMore}
          onEndReached={loadMore}
          renderItem={({ item, index }) => <RenderItems index={index} item={item} /> }
          keyExtractor={(item, index) => index.toString()}
          windowSize={10}
          initialNumToRender={16}
          refreshControl={
            <RefreshControl
              refreshing={state.refresh}
              onRefresh={pullToRefresh}
            />
          }
        />
      </>
    }
    </Layout>
  )
}

export default AllPdfs;