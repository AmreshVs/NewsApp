import React from 'react';
import { connect } from 'react-redux';
import { Layout, useStyleSheet, Text } from '@ui-kitten/components';
import { Viewport } from '@skele/components'
import { FlatList } from 'react-native';

import NewsItems from '@comp/home/newsItems';
import themedStyle from './style';
import { ScrollView } from 'react-native';
import { HOME } from '@api';
import { useAxios } from '@hooks';
import { API_URL } from '@const';

const Home = (props) => {
  const styles = useStyleSheet(themedStyle);
  const [state, setState] = React.useState([]);
  const [refresh, setRefresh] = React.useState(false);
  const [page, setPage] = React.useState(1);

  React.useEffect(() => {
    async function loadData(){
      if(page > 0){
        var AllNews = [];
        const response = await useAxios({url : `${API_URL}/home?page=${page}&size=5`});
        for(let key in response.data){
          response.data[key].forEach((item) => {
            AllNews.push(item);
          })
        }        
        setPage(page + 1);
        setState(AllNews);
      }
    }
    loadData();
  },[]);
console.log(page);
  const loadMore = async () => {
    if(page > 0){
      let AllNews = state;
      setRefresh(true);
      const response = await useAxios({url : `${API_URL}/home?page=${page}&size=10`});
      console.log('loadMore')
      for(let key in response.data){
        response.data[key].forEach((item) => {
          AllNews.push(item);
        })
      }
      setPage(page + 1);
      setState(AllNews);
      setRefresh(false);
      if(response.pagination.nextPageUrl === ''){
        setPage(-1);
      }
    }
  }

  return (
    <Viewport.Tracker>
      {/* <ScrollView> */}
        <Layout level='2' style={styles.container}>
          {/* <Statusbar />
          <TopSection /> */}
          {/* <Text category='h6' style={styles.heading}>Latest News</Text> */}
          {/* <NewsBig /> */}
          {/* <NewsSmall /> */}
          {/* <VideoBig /> */}
          {/* {state.length > 0 ?
            state.map((item) => {
              return item;
            })
            : null
          }
      </ScrollView> */}
      <FlatList
        data={state}
        onEndReachedThreshold={1}
        refreshing={refresh}
        onRefresh={loadMore}
        onEndReached={loadMore}
        renderItem={({ item, index }) => NewsItems(item, index)}
        keyExtractor={(item, index) => index.toString()}
      />
      </Layout>
    </Viewport.Tracker>
  )
}

const mapStateToProps = state => state.common;

export default connect(mapStateToProps)(Home);