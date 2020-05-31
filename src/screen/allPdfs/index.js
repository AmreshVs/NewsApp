import React from 'react';
import { connect } from 'react-redux';
import { FlatList, RefreshControl } from 'react-native';
import { Text, useStyleSheet, Layout } from '@ui-kitten/components';

import themedStyle from './style';
import { useAxios } from '@hooks';
import { GET_ALL_USER_PDF } from '@api';
import RenderItems from './renderItems';
import Loader from '@comp/loader';
import snackBar from '@common/snackBar';

const AllPdfs = ({ pdfDate }) => {

  const styles = useStyleSheet(themedStyle);
  const [state, setState] = React.useState({
    data: [],
    refresh: false,
    page: 1,
    loading: true
  });

  React.useEffect(() => {
    loadMore();

    return () => {
      setState({data: [], refresh: false, page: 1});
    }
  }, []);

  const loadMore = async (load = false, date = false) => {

    if (state.page > 0) {
      setState({...state, refresh: true});
      let response = null;
      if(pdfDate.endDate === undefined && date === false){
        response = await useAxios({ ...GET_ALL_USER_PDF, url: `${GET_ALL_USER_PDF.url}?page=${load === true ? 1 : state.page}&size=10` })
        setState({ ...state, data: (load === true) ? response.data : [...state.data, ...response.data], page: load === true ? 1 : state.page + 1, refresh: false, loading: false });
        if (response.pagination.nextPageUrl === '') {
          setState({...state, page: -1});
        }
      }
      else{
        response = await useAxios({ ...GET_ALL_USER_PDF, url: `${GET_ALL_USER_PDF.url}?page=${load === true ? 1 : state.page + 1}&size=10&startDate=${date.startDate === undefined ? pdfDate.startDate : date.startDate}&endDate=${date.endDate === undefined ? pdfDate.endDate : date.endDate}` });
        if(response.data.length === 0){
          setState({...state, loading: false});
          if(date.endDate !== undefined){
            snackBar("No PDF's found");
          }
          return false;
        }
        setState({ ...state, data: (load === true) ? response.data : [...state.data, ...response.data], page: load === true ? 1 : response.pagination.nextPageUrl === '' ? -1 : state.page + 1, refresh: false, loading: false });
      }
    }
  }

  const pullToRefresh = () => {
    setState({ ...state, page: 1 });
    loadMore(true);
  }

  const handleFilter = (date) => {
    setState({ ...state, page: 1 });
    loadMore(true, date);
  }

  return (
    <Layout style={styles.root}>
      {state.loading === true ?
        <Loader/>
      :
      <FlatList
        data={state.data}
        style={styles.container}
        onEndReachedThreshold={1}
        refreshing={state.refresh}
        onRefresh={loadMore}
        onEndReached={loadMore}
        renderItem={({ item, index }) => <RenderItems index={index} item={item} handleFilter={index === 0 ? handleFilter : null} /> }
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
    }
    </Layout>
  )
}

const mapStateToProps = state => state.home;

export default connect(mapStateToProps)(AllPdfs);