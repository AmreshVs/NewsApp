import React from 'react';
import { View } from 'react-native';
import { useStyleSheet } from '@ui-kitten/components';

import TopNav from '@comp/topNav';
import PdfSmall from '@comp/favourites/pdfSmall';
import themedStyle from './style';

var topPdf;
const RenderItems = ({ index, item }) => {
  console.log(index, item);
  const Top = () => {
    if(index === 0){
      return <TopNav/>;
    }
    else{
      return null;
    }
  }

  const GetPdf = () => {

    const styles = useStyleSheet(themedStyle);

    if (index % 2 === 0) {
      topPdf = [];
    }
    topPdf.push(item);
    if (topPdf.length === 2) {
      return (
        <>
          <View style={styles.pdfContainer}>
            <PdfSmall key={topPdf[0].id} data={topPdf[0]} />
            <PdfSmall key={topPdf[1].id} data={topPdf[1]} />
          </View>
        </>
      )
    }
    else{
      return null;
    }
  }

  return (
    <>
      <Top />
      <GetPdf/>
    </>
  )
}

export default React.memo(RenderItems);