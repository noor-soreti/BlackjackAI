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
  name,
  image,
  title,
  description,
}: {
  name: string;
  image: ImageSourcePropType;
  title: string;
  description: string;
}) => {
  return (
    <View style={styles.box}>
      <View style={styles.review_header}>
        <Image source={image} style={styles.image} />
        <View style={styles.inner_header}>
          <View style={styles.name_header}>
            <Text style={styles.name}>{name}</Text>
            <Image
              source={require('../../../assets/Images/stars-dim.png')}
              style={styles.stars}
            />
          </View>
          <Text style={styles.title}>{title}</Text>
        </View>
      </View>
      <Text style={styles.description}>{description}</Text>
    </View>
  );
};

const Rating = ({navigation}: {navigation: NavigationProp<ParamListBase>}) => {
  useFocusEffect(
    useCallback(() => {
      storage.set('last_screen', 'Rating');
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
        <Text style={styles.header}>Give us rating</Text>
      </View>
      <ScrollView
        contentContainerStyle={{alignItems: 'center'}}
        showsVerticalScrollIndicator={false}
        style={{
          flex: 1,
          // marginTop: -30,
        }}>
        <Image
          source={require('../../../assets/Images/star.png')}
          style={styles.big_star}
        />
        <Text style={styles.big_text}>
          This app was designed for people{'\n'}like you.
        </Text>
        <ReviewBox
          image={require('../../../assets/Images/gracia.png')}
          name="Mattia Garcia"
          title="“My sex life will never be the same...”"
          description="“I thought there was no hope for me, but this app proved me wrong. The Start-Stop method helped me gain control, and the mindfulness exercises calmed my anxiety. My score improved, and I feel more confident in my intimacy. Highly recommend!”"
        />
        <ReviewBox
          image={require('../../../assets/Images/miller.png')}
          name="Josh Miller"
          title="“I feel so different in less than 3 weeks!”"
          description="“I’ve struggled with performance anxiety for years, and this app has been a game changer. The training plan was easy to follow, and I saw improvements quickly. My anxiety has decreased, and I feel much more in control. This app helped me get back to being confident in myself!”"
        />
      </ScrollView>
      <AppButton
        title="Continue"
        onPress={() => {
          navigation.navigate('RewiringBenefitsTwoScreen');
        }}
        style={styles.button}
      />
    </ScreenWrapper>
  );
};

export default Rating;
const {width, height} = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0A0A',
    padding: 24,
    paddingHorizontal: 22,
  },
  headerContainer: {
    flexDirection: 'row',
    gap: 16,
    alignItems: 'center',
    paddingVertical: 22,
  },
  header: {
    fontSize: 30 / fontScale,
    fontFamily: 'Calimate-Black',
    color: '#fff',
  },
  big_star: {
    width: 142,
    height: 54,
    resizeMode: 'contain',
    // marginTop: 15,
  },
  big_text: {
    fontFamily: 'NeueHaasDisplay-Mediu',
    fontSize: 18 / fontScale,
    lineHeight: 30 / fontScale,
    textAlign: 'center',
    color: '#fff',
    marginTop: 10,
    marginVertical: 16,
  },
  box: {
    padding: 14,
    paddingTop: 19,
    backgroundColor: '#0E1229',
    borderRadius: 20 / fontScale,
    marginBottom: 22,
  },
  review_header: {
    flexDirection: 'row',
    gap: 11,
  },
  image: {
    width: 41,
    height: 41,
  },
  inner_header: {
    marginBottom: 7,
    flex: 1,
  },
  name_header: {
    flexDirection: 'row',
    gap: 20,
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  stars: {
    width: 88,
    height: 22,
  },
  name: {
    fontFamily: 'Manrope-SemiBold',
    fontSize: 13.24 / fontScale,
    lineHeight: 30 / fontScale,
    letterSpacing: -0.3,
    color: '#f4f4f4',
  },
  title: {
    color: '#fff',
    fontFamily: 'Manrope-ExtraBold',
    fontSize: 13.24 / fontScale,
    lineHeight: 30 / fontScale,
    letterSpacing: -0.3,
  },
  description: {
    color: '#fff',
    fontFamily: 'Manrope-Light',
    fontSize: 12.3 / fontScale,
    lineHeight: 19 / fontScale,
    letterSpacing: 1,
    paddingRight: 22,
  },

  button: {
    // paddingVertical: 15,
    width: '100%',
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 25,
  },
});
