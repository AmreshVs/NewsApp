import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { View } from 'react-native';
import { useStyleSheet, RangeCalendar, Button, Input, Modal, Layout, Icon } from '@ui-kitten/components';
import Ripple from 'react-native-material-ripple';
import moment from 'moment';

import TopNav from '@comp/topNav';
import PdfSmall from '@comp/favourites/pdfSmall';
import themedStyle from './style';
import { setPdfDate } from '@redux/actions/homeActions';

var topPdf;
const RenderItems = ({ index, item, handleFilter }) => {

  const styles = useStyleSheet(themedStyle);

  const RenderTop = (props) => {
    if (index === 0) {
      let rangeValue = (props.pdfDate.endDate !== null) ? { endDate: new Date(props.pdfDate.endDate), startDate: new Date(props.pdfDate.startDate) } : new Date();
      const [range, setRange] = React.useState(rangeValue);
      let dateValue = props.pdfDate.endDate !== undefined ? `${moment(props.pdfDate.startDate).format('DD/MM/YYYY')} to ${moment(props.pdfDate.endDate).format('DD/MM/YYYY')}` : '';
      const [value, setValue] = React.useState(dateValue);
      const [visible, setVisible] = React.useState(false);

      const handleRange = (nextRange) => {
        setRange(nextRange);
        if (nextRange.endDate !== null) {
          setValue(`${moment(nextRange.startDate).format('DD/MM/YYYY')} to ${moment(nextRange.endDate).format('DD/MM/YYYY')}`);
          setVisible(!visible);
        }
      }

      const handleDateFilter = async () => {
        let dates = { startDate: moment(range.startDate).format('YYYY/MM/DD'), endDate: moment(range.endDate).format('YYYY/MM/DD') };
        await props.setPdfDate(dates);
        handleFilter(dates);
      }

      const clear = async () => {
        await props.setPdfDate({});
        handleFilter({});
      }

      return (
        <>
          <TopNav />
          <Modal
            visible={visible}
            backdropStyle={styles.backdrop}
            onBackdropPress={() => setVisible(false)}>
            <Layout>
              <RangeCalendar
                range={range}
                onSelect={handleRange}
              />
            </Layout>
          </Modal>
          <View style={styles.filterContainer}>
            <Ripple style={styles.datePicker} onPress={() => setVisible(!visible)}>
              <Input
                placeholder='Pick date'
                value={value}
                onChangeText={nextValue => setValue(nextValue)}
              />
            </Ripple>
            <Ripple style={styles.iconContainer} onPress={clear}>
              <Icon name='close-outline' fill={styles.icon.color} style={styles.icon} />
            </Ripple>
            <View style={styles.button}>
              <Button size='small' style={styles.filter} onPress={handleDateFilter} disabled={value === '' ? true : false}>Filter</Button>
            </View>
          </View>
        </>
      )
    }
    else {
      return null;
    }
  }

  const mapStateToProps = state => state.home;

  const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({setPdfDate: setPdfDate}, dispatch);
  }

  const Top = connect(mapStateToProps, mapDispatchToProps)(RenderTop);

  const GetPdf = () => {

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
    else {
      return null;
    }
  }

  return (
    <>
      <Top />
      <GetPdf />
    </>
  )
}

export default React.memo(RenderItems);