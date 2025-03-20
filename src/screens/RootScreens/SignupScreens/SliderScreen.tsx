/* eslint-disable no-eval */
import React, {useCallback, useRef, useState} from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
// import {slides} from '../../../constants/question';
import {
  NavigationProp,
  ParamListBase,
  useFocusEffect,
} from '@react-navigation/native';
import Lottie from 'lottie-react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {storage} from '../../../Api/Storage';
import AppButton from '../../../components/global/AppButton';
import {fontScale} from '../../../styles/globalStyles';

const {width, height} = Dimensions.get('window');

const slides = [
  {
    id: '1',
    title: 'Not only a bedroom issue',
    subtitle: (style: StyleProp<TextStyle>) => (
      <Text style={style}>
        Most men don’t realize how much{' '}
        <Text style={{fontFamily: 'Manrope-ExtraBold'}}>
          lack of control affects their lives
        </Text>
      </Text>
    ),
    background: 'red',
    image: require('../../../assets/Lottie/broken-heart.json'),
    dot: 1,
  },
  {
    id: '2',
    title: 'It shatters sex drive',
    subtitle: (style: StyleProp<TextStyle>) => (
      <Text style={style}>
        Studies show men with{' '}
        <Text style={{fontFamily: 'Manrope-ExtraBold'}}>lack of control</Text>{' '}
        are{' '}
        <Text style={{fontFamily: 'Manrope-ExtraBold'}}>3x more likely</Text> to{' '}
        <Text style={{fontFamily: 'Manrope-ExtraBold'}}>avoid intimacy</Text>{' '}
        with their partner
      </Text>
    ),
    background: 'red',
    image: require('../../../assets/Lottie/sad-man.json'),
    dot: 2,
  },
  {
    id: '3',
    title: 'It hurts relationships',
    subtitle: (style: StyleProp<TextStyle>) => (
      <Text style={style}>
        <Text style={{fontFamily: 'Manrope-ExtraBold'}}>80% of men</Text> with
        lack of control think their partner feels{' '}
        <Text style={{fontFamily: 'Manrope-ExtraBold'}}>
          unsatisfied or furstrated
        </Text>
      </Text>
    ),
    background: 'red',
    image: require('../../../assets/Lottie/couple.json'),
    dot: 3,
  },
  {
    id: '4',
    title: 'It’s a vicious circle',
    subtitle: (style: StyleProp<TextStyle>) => (
      <Text style={style}>
        <Text style={{fontFamily: 'Manrope-ExtraBold'}}>
          Performance anxiety
        </Text>{' '}
        leads to{' '}
        <Text style={{fontFamily: 'Manrope-ExtraBold'}}>overthinking</Text>{' '}
        which leads to more{' '}
        <Text style={{fontFamily: 'Manrope-ExtraBold'}}>anxiety</Text> and{' '}
        <Text style={{fontFamily: 'Manrope-ExtraBold'}}>less control</Text>
      </Text>
    ),
    background: 'red',
    image: require('../../../assets/Lottie/brain.json'),
    dot: 4,
  },
  {
    id: '5',
    title: 'But it can be fixed',
    subtitle: (style: StyleProp<TextStyle>) => (
      <Text style={[style, {paddingHorizontal: 10}]}>
        With <Text style={{fontFamily: 'Manrope-ExtraBold'}}>Lastr’s</Text>{' '}
        training, you can learn how to gain{' '}
        <Text style={{fontFamily: 'Manrope-ExtraBold'}}>
          total control over your ejaculation
        </Text>
        .
      </Text>
    ),
    background: 'blue',
    image: require('../../../assets/Lottie/plant.json'),
    dot: 5,
  },
  {
    id: '6',
    title: 'Welcome to Lastr',
    subtitle: (style: StyleProp<TextStyle>) => (
      <Text style={style}>
        <Text style={{fontFamily: 'Manrope-ExtraBold'}}>Lastr’s</Text>{' '}
        methodology is based on{' '}
        <Text style={{fontFamily: 'Manrope-ExtraBold'}}>
          years of leading research
        </Text>{' '}
        about ejaculation control
      </Text>
    ),
    background: 'purple',
    image: require('../../../assets/Lottie/hero.json'),
    dot: 1,
  },
  {
    id: '7',
    title: 'Rewire your brain',
    subtitle: (style: StyleProp<TextStyle>) => (
      <Text style={[style, {paddingHorizontal: 15}]}>
        Science-backed exercises to help you{' '}
        <Text style={{fontFamily: 'Manrope-ExtraBold'}}>rewire</Text> your brain
        and <Text style={{fontFamily: 'Manrope-ExtraBold'}}>arousal</Text>{' '}
        mechanism
      </Text>
    ),
    background: 'purple',
    image: require('../../../assets/Lottie/calm-brain.json'),
    dot: 2,
  },
  {
    id: '8',
    title: 'Stay motivated',
    subtitle: (style: StyleProp<TextStyle>) => (
      <Text style={[style, {paddingHorizontal: 25}]}>
        Improving your{' '}
        <Text style={{fontFamily: 'Manrope-ExtraBold'}}>control</Text> can be
        challenging.{' '}
        <Text style={{fontFamily: 'Manrope-ExtraBold'}}>Keeping</Text> your{' '}
        <Text style={{fontFamily: 'Manrope-ExtraBold'}}>routine</Text> is key
      </Text>
    ),
    background: 'purple',
    image: require('../../../assets/Lottie/yoga.json'),
    dot: 3,
  },
  {
    id: '9',
    title: 'Level up your life',
    subtitle: (style: StyleProp<TextStyle>) => (
      <Text style={style}>
        <Text style={{fontFamily: 'Manrope-ExtraBold'}}>Taking control</Text> of
        your performance has{' '}
        <Text style={{fontFamily: 'Manrope-ExtraBold'}}>immense</Text>
        psychological{' '}
        <Text style={{fontFamily: 'Manrope-ExtraBold'}}>benefits</Text>
      </Text>
    ),
    background: 'purple',
    image: require('../../../assets/Lottie/winner.json'),
    dot: 4,
  },
];

const SliderScreen = ({
  navigation,
}: {
  navigation: NavigationProp<ParamListBase>;
}) => {
  const flatListRef = useRef<FlatList>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const backgroundImages: {[key: string]: any} = {
    red: require('../../../assets/Images/red.png'),
    blue: require('../../../assets/Images/blue.png'),
    purple: require('../../../assets/Images/purple.png'),
  };

  const goToNextSlide = () => {
    if (currentIndex < slides.length - 1) {
      flatListRef.current?.scrollToIndex({
        index: currentIndex + 1,
        animated: true,
      });
    } else {
      navigation.navigate('RewiringScreen');
    }
  };

  useFocusEffect(
    useCallback(() => {
      storage.set('last_screen', 'SliderScreen');
    }, []),
  );

  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      {/* Constant Header Image */}
      <View style={styles.header}>
        <Image
          source={require('../../../assets/Images/logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>
      {/* Background Slider */}
      <ImageBackground
        source={backgroundImages[slides[currentIndex].background]}
        style={{...styles.backgroundImage, paddingTop: insets.top}}>
        <FlatList
          ref={flatListRef}
          data={slides}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => item.id}
          onMomentumScrollEnd={event => {
            const index = Math.round(event.nativeEvent.contentOffset.x / width);
            setCurrentIndex(index);
          }}
          renderItem={({item}) => {
            return (
              <View style={styles.backgroundImage}>
                <View style={styles.contentContainer}>
                  <Lottie
                    source={item?.image}
                    autoPlay
                    loop
                    cacheComposition
                    enableMergePathsAndroidForKitKatAndAbove
                    renderMode="AUTOMATIC"
                    style={styles.contentImage}
                  />
                  <Text style={styles.title}>{item.title}</Text>
                  {item.subtitle(styles.subtitle)}
                </View>
              </View>
            );
          }}
        />
      </ImageBackground>
      {/* Overlay for Pagination & Button */}
      <View style={styles.overlay}>
        {/* Pagination Dots */}
        <View style={styles.paginationContainer}>
          <View
            style={[
              styles.dot,
              slides[currentIndex].dot === 1 && styles.activeDot,
            ]}
          />
          <View
            style={[
              styles.dot,
              slides[currentIndex].dot === 2 && styles.activeDot,
            ]}
          />
          <View
            style={[
              styles.dot,
              slides[currentIndex].dot === 3 && styles.activeDot,
            ]}
          />
          <View
            style={[
              styles.dot,
              slides[currentIndex].dot === 4 && styles.activeDot,
            ]}
          />
          {slides[currentIndex].background !== 'purple' && (
            <View
              style={[
                styles.dot,
                slides[currentIndex].dot === 5 && styles.activeDot,
              ]}
            />
          )}
        </View>
        {/* Next Button */}
        <AppButton
          onPress={goToNextSlide}
          title="Next"
          row
          style={styles.button}
          rightIcon={
            <Icon
              name="arrowright"
              size={18}
              color="#000"
              style={{alignSelf: 'center', top: 2}}
            />
          }
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    position: 'absolute',
    top: 10, // Adjust this based on your UI
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 1, // Ensures it's above everything
  },
  logo: {
    width: 120,
    height: 120,
  },
  backgroundImage: {
    width: width + 10,
    height,
    marginLeft: -2,
    // marginTop: -2,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  contentContainerMain: {
    alignItems: 'center',
  },
  contentContainer: {
    paddingHorizontal: 15,
    alignItems: 'center',
    marginBottom: 250,
    // width,
    // height,
  },
  contentImage: {
    // height: height / 2,
    width: '75%',
    aspectRatio: 0.8,
  },
  title: {
    fontSize: 24 / fontScale,
    fontFamily: 'NeueHaasDisplay-Bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 18,
    lineHeight: 30 / fontScale,
  },
  subtitle: {
    fontSize: 16 / fontScale,
    color: '#eee',
    lineHeight: 30 / fontScale,
    fontFamily: 'Manrope-Medium',
    textAlign: 'center',
    marginBottom: 50,
  },
  overlay: {
    position: 'absolute',
    bottom: 16,
    width: '100%',
    alignItems: 'center',
  },
  paginationContainer: {
    flexDirection: 'row',
    marginBottom: 30,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#484848',
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: 'white',
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  button: {
    alignItems: 'center',
    alignSelf: 'center',
    gap: 8,
    marginBottom: 70,
    paddingHorizontal: 35,
  },
  buttonText: {
    fontSize: 16 / fontScale,
    color: 'white',
    marginRight: 8,
  },
});

export default SliderScreen;
