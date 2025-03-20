import {View, Text, Image, StyleSheet, TouchableOpacity, Dimensions} from 'react-native';
import ScreenWrapper from '../../../components/global/ScreenWrapper';
import { fontScale } from '../../../styles/globalStyles';
import AppButton from '../../../components/global/AppButton';
import { ParamListBase } from '@react-navigation/native';
import { NavigationProp } from '@react-navigation/native';
import { useState, useCallback } from 'react';

const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');

const OnboardingScreen = ({
    navigation,
  }: {
    navigation: NavigationProp<ParamListBase>;
  }) => {
    const [currentScreen, setCurrentScreen] = useState(0);
    const styles = makeStyles(fontScale);

    const onboardingDisplay = [
        {
            title: (
                <Text>Snap your hands and let AI find the best play.</Text>
            ),
            image: require('../../../assets/Images/iphone_rotated_3x.png'),
            subText: (
                <Text>Upload a screenshot and get instant strategies casinos don't want you to know.</Text>
            )
        },
        {
            title: (
                <Text>AI-Powered strategy for smarter blackjack.</Text>
            ),
            image: require('../../../assets/Images/strategy_group_3x.png'),
            subText: (
                <Text>Instant insights to maximize your winnings and avoid costly mistakes.</Text>
            )
        },
        {
            title: (
                <Text>Every move matters, see what others overlook.</Text>
            ),
            image: require('../../../assets/Images/overlook_group_3x.png'),
            subText: (
                <Text>AI detects hidden trends—so you always play one step ahead.</Text>
            )
        }
    ];

    const handleNextScreen = useCallback(() => {
        if (currentScreen < onboardingDisplay.length - 1) {
            setCurrentScreen(prev => prev + 1);
        } else {
            navigation.navigate('IntroScreen');
        }
    }, [currentScreen, navigation]);

    const renderPaginationDots = () => {
        return (
            <View style={styles.paginationContainer}>
                {onboardingDisplay.map((_, index) => (
                    <View
                        key={index}
                        style={[
                            styles.paginationDot,
                            currentScreen === index && styles.paginationDotActive,
                        ]}
                    />
                ))}
            </View>
        );
    };

    return (
        <ScreenWrapper bgImage={require('../../../assets/Images/background.png')}>
            <Image
                source={require('../../../assets/Images/logo.png')}
                style={styles.logo}
                resizeMode="contain"
            />
            <View style={styles.container}>
                <Text style={styles.title}>{onboardingDisplay[currentScreen].title}</Text>
                <View style={styles.imageContainer}>
                    <Image
                        source={onboardingDisplay[currentScreen].image}
                        style={styles.image}
                        resizeMode="contain"
                    />
                </View>
                <Text style={styles.subText}>{onboardingDisplay[currentScreen].subText}</Text>
                {renderPaginationDots()}
            </View>
            <View style={styles.btnContainer}>
                <AppButton
                    title="Next"
                    onPress={handleNextScreen}
                    style={styles.button}
                />
            </View>
        </ScreenWrapper>
    );
}

const makeStyles = (fontScale: number) => 
    StyleSheet.create({
        logo: {
            width: 120,
            height: 120,
            alignSelf: 'center',
        },
        container: {
            flex: 1,
            // justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: 32,
        },
        imageContainer: {
            height: SCREEN_HEIGHT * 0.4,
            width: SCREEN_WIDTH * 0.8,
            justifyContent: 'center',
            alignItems: 'center',
            marginVertical: SCREEN_HEIGHT * 0.02,
        },
        title: {
            fontFamily: 'AeonikTRIAL-Light',
            fontSize: 30 / fontScale,
            lineHeight: 38,
            color: '#fff',
            textAlign: 'center',
            // marginBottom: SCREEN_HEIGHT * 0.02,
            width: '100%',
        },
        subText: {
            fontFamily: 'AeonikTRIAL-Light',
            fontSize: 17 / fontScale,
            lineHeight: 24,
            color: '#fff',
            textAlign: 'center',
            // marginTop: SCREEN_HEIGHT * 0.02,
            // paddingHorizontal: 20,
            // width: '100%',
        },
        image: {
            width: '100%',
            height: '100%',
            alignSelf: 'center',
        },
        btnContainer: {
            width: '100%',
            alignItems: 'center',
            // marginBottom: SCREEN_HEIGHT * 0.08,
        },
        button: {
            width: SCREEN_WIDTH * 0.9,
        },
        paginationContainer: {
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: SCREEN_HEIGHT * 0.04,
        },
        paginationDot: {
            width: 8,
            height: 8,
            borderRadius: 4,
            backgroundColor: 'rgba(255, 255, 255, 0.3)',
            marginHorizontal: 4,
        },
        paginationDotActive: {
            backgroundColor: '#fff',
        },
    });

export default OnboardingScreen;
