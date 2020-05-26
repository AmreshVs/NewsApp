import React from 'react';
import { Image, View, ScrollView } from 'react-native';
import { useStyleSheet, Layout, Text } from '@ui-kitten/components';
import HTMLView from 'react-native-htmlview';

import Lang from '@lang'
import themedStyle from './style';
import TopNav from '@comp/topNav';
import Comment from '@comp/comment';

const NewsDetail = (props) => {

  const styles = useStyleSheet(themedStyle);
  const htmlContent = `<p><strong>திரைத்துறை மற்றும் சின்னத்திரை தயாரிப்பாளர்களின் கோரிக்கையை ஏற்று போஸ்ட் புரடக்சன் பணிகளுக்கு தமிழக அரசு அனுமதி அளித்துள்ளது. இதற்கான அனுமதியை தமிழக முதல்வர் எடப்பாடி பழனிசாமி அளித்துள்ளார். போஸ்ட் புரடக்சன் பணிகளை மட்டும் 11.5.2020 முதல் மேற்கொள்ள அனுமதி அளிக்கப்பட்டுள்ளது.</strong></p><p><strong>படத்தொகுப்பு (அதிகபட்சம் 5 பேர்), குரல் பதிவு (அதிகபட்சம் 5 பேர்), கம்ப்யூட்டர் மற்றும் விஷுவல் கிராபிக்ஸ் (10 முதல் 15 பேர்), டி.ஐ. எனப்படும் நிற கிரேடிங் (அதிகபட்சம் 5 பேர்), பின்னணி இசை (அதிகபட்சம் 5 பேர்), ஒலிக்கலவை (அதிகபட்சம் 5 பேர்) கலந்து கொள்ள அனுமதி அளிக்கப்பட்டுள்ளது.</strong></p><p><strong>போஸ்ட் புரடக்சன் பணிகளை மேற்கொள்ளும் சம்மந்தப்பட்ட தயாரிப்பு நிறுவனங்கள், இப்பணியில் ஈடுபடுகின்ற பணியாளர்களுக்கு உரிய அனுமதி சீட்டுகளை பெற்றுத் தந்து, அவர்கள் சமூக இடைவெளியுடனும், முகக்கவசம் மற்றும் கிருமி நாசினி உபயோகித்தும், மத்திய மாநில அரசுகள் விதிக்கும் அனைத்து கட்டுப்பாடுகளை பின்பற்றியும் பணி செய்வதை உறுதி செய்யுமாறு தமிழக அரசு தெரிவித்துள்ளது.</strong></p><p><strong>தமிழ் திரைப்படத் தயாரிப்பாளர்களும், சின்னத்திரை தயாரிப்பாளர்களும், கொரோனா ஊரடங்கால் கடந்த 50 நாட்களாக எந்த பணியும் நடக்காததால் பலரின் வாழ்வாதாரம் கேள்விக்குறி ஆகி உள்ளதால், தயாரிப்புக்குப் பிந்தைய பணிகளை செய்வதற்காக மட்டும் அனுமதி அளிக்க வேண்டும் என்றும் அரசிடம் கோரிக்கை வைத்தனர். அதன் அடிப்படையில் தற்போது அனுமதி வழங்கப்பட்டுள்ளது.</strong></p>`;

  return (
    <ScrollView>
      <Layout level='1' style={styles.root}>
        <TopNav />
        <Image style={styles.featured_img} source={{ uri: 'https://kaalaimani.com/wp-content/uploads/2020/03/FB-825x510.jpg' }} />
        <View style={styles.contentContainer}>
          <Text category='h6' style={styles.heading}>திரைத்துறை போஸ்ட் புரடக்சன் பணிகளுக்கு அனுமதி</Text>
          <HTMLView value={htmlContent} stylesheet={styles} />
          <Comment/>
        </View>
      </Layout>
    </ScrollView>
  )
}

export default NewsDetail;