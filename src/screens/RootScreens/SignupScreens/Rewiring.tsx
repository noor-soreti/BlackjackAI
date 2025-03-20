import {
  NavigationProp,
  ParamListBase,
  useFocusEffect,
} from '@react-navigation/native';
import React, {useCallback} from 'react';
import {
  Dimensions,
  Image,
  ImageSourcePropType,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {storage} from '../../../Api/Storage';
import AppButton from '../../../components/global/AppButton';
import ScreenWrapper from '../../../components/global/ScreenWrapper';
import {fontScale} from '../../../styles/globalStyles';

const ReviewBox = ({
  image,
  name,
  title,
  description,
}: {
  image: ImageSourcePropType;
  name: string;
  title: string;
  description: string;
}) => {
  return (
    <View style={{flexDirection: 'row', gap: 12, marginBottom: 18}}>
      <Image source={image} resizeMode="contain" style={styles.review_image} />
      <View style={styles.right_box}>
        <Text style={styles.reviewer_name}>{name}</Text>
        <View
          style={{
            paddingVertical: 10,
            paddingHorizontal: 14,
            backgroundColor: '#111739',
            borderRadius: 20 / fontScale,
            borderTopLeftRadius: 0,
          }}>
          <Text style={styles.review_title}>{title}</Text>
          <Text style={styles.review_description}>{description}</Text>
        </View>
      </View>
    </View>
  );
};

const Rewiring = ({
  navigation,
}: {
  navigation: NavigationProp<ParamListBase>;
}) => {
  useFocusEffect(
    useCallback(() => {
      storage.set('last_screen', 'RewiringScreen');
    }, []),
  );

  return (
    <ScreenWrapper
      bgImage={require('../../../assets/Images/background2.png')}
      style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={navigation.goBack}>
          <AntDesign
            name="arrowleft"
            color={'#fff'}
            size={20}
            style={{alignSelf: 'center'}}
          />
        </TouchableOpacity>
        <Text style={styles.header}>Rewiring benefits</Text>
      </View>
      <ScrollView
        contentContainerStyle={{
          alignItems: 'center',
          width: '100%',
          paddingHorizontal: 10,
        }}
        showsVerticalScrollIndicator={false}>
        <ReviewBox
          image={require('../../../assets/Images/mattia.png')}
          name="Mattia"
          title="“My sex life will never be the same...”"
          description='"I thought there was no hope for me, but this app proved me wrong. The Start-Stop method helped me gain control, and the mindfulness exercises calmed my anxiety. My score improved, and I feel more confident in my intimacy. Highly recommend!"'
        />
        <ReviewBox
          image={require('../../../assets/Images/raphael.png')}
          name="Raphaël"
          title="“I feel so different in less than 3 weeks!”"
          description="“I've struggled with performance anxiety for years, and this app has been a game changer. The training plan was easy to follow, and I saw improvements quickly. My anxiety has decreased, and I feel much more in control. This app helped me get back to being confident in myself!”"
        />
        <ReviewBox
          image={require('../../../assets/Images/louis.png')}
          name="Louis"
          title="“Finally Taking Control!”"
          description="“For years, I felt embarrassed by my PE issues. This app gave me the tools to take control. The daily tracker and exercises made a huge difference. After just a few weeks, I already feel so much more confident. My PE score is steadily improving. I’m so glad I found this app!”"
        />
      </ScrollView>
      <AppButton
        title="Continue"
        onPress={() => {
          navigation.navigate('RewiringBenefitsScreen');
        }}
        style={styles.button}
      />
    </ScreenWrapper>
  );
};

export default Rewiring;
const {width, height} = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0A0A',
    padding: 15,
  },
  headerContainer: {
    flexDirection: 'row',
    gap: 16,
    alignItems: 'center',
    paddingVertical: 22,
    paddingBottom: 15,
    paddingHorizontal: 10,
  },
  header: {
    fontSize: 30 / fontScale,
    fontFamily: 'NeueHaasDisplay-Black',
    color: '#fff',
  },
  image: {
    height: height,
    width: width / 1.1,
  },
  button: {
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 25,
    marginHorizontal: 7,
  },
  review_image: {
    width: 44,
    height: 44,
  },
  right_box: {flex: 1, paddingTop: 10},
  reviewer_name: {
    marginBottom: 9,
    fontFamily: 'Manrope-SemiBold',
    fontSize: 14 / fontScale,
    letterSpacing: -0.32,
    color: '#f4f4f4',
  },
  review_title: {
    fontFamily: 'Manrope-ExtraBold',
    fontSize: 14 / fontScale,
    letterSpacing: -0.32,
    color: '#fff',
    marginBottom: 5,
  },
  review_description: {
    fontFamily: 'Manrope-Light',
    fontSize: 13 / fontScale,
    lineHeight: 18 / fontScale,
    letterSpacing: 1,
    color: '#fff',
    marginBottom: 5,
  },
});
