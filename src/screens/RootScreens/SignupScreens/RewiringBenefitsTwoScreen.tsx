import {
  NavigationProp,
  ParamListBase,
  useFocusEffect,
} from '@react-navigation/native';
import Lottie from 'lottie-react-native';
import moment from 'moment';
import {usePostHog} from 'posthog-react-native';
import React, {useCallback, useEffect} from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {storage} from '../../../Api/Storage';
import AppButton from '../../../components/global/AppButton';
import ScreenWrapper from '../../../components/global/ScreenWrapper';
import {fontScale} from '../../../styles/globalStyles';
import {useAuthContext} from '../../Config';

const RewiringBenefitsTwoScreen = ({
  navigation,
}: {
  navigation: NavigationProp<ParamListBase>;
}) => {
  const {user} = useAuthContext();

  const postHog = usePostHog();

  useFocusEffect(
    useCallback(() => {
      storage.set('last_screen', 'RewiringBenefitsTwoScreen');
    }, []),
  );

  useEffect(() => {
    postHog.capture('onboarding_last_screen');
  }, [postHog]);

  return (
    <ScreenWrapper
      style={styles.container}
      bgImage={require('../../../assets/Images/background2.png')}>
      {/* Back Button & Title */}
      <ScrollView
        contentContainerStyle={{
          alignItems: 'center',
          // width: '100%',
          // marginTop: -30,
        }}
        showsVerticalScrollIndicator={false}>
        <View style={styles.headerContainer}>
          <Image
            source={require('../../../assets/Images/white-check.png')}
            style={{width: 30, height: 30, marginBottom: 5}}
          />
          <Text style={styles.header}>
            {user?.full_name}, we've built you a custom plan.
          </Text>
          <Text style={styles.subText}>You will gain total control by:</Text>
          <Text style={styles.date}>
            {moment(user?.createdAt).add(10, 'weeks').format('MMM D, YYYY')}
          </Text>
        </View>
        <Image
          source={require('../../../assets/Images/star-border.png')}
          style={{
            width: 240,
            height: 75,
            resizeMode: 'contain',
            alignSelf: 'center',
            marginTop: 10,
            marginBottom: 30,
          }}
        />

        <View style={{alignSelf: 'center'}}>
          <Text
            style={{
              fontFamily: 'NeueHaasDisplay-Bold',
              lineHeight: 30 / fontScale,
              fontSize: 23 / fontScale,
              letterSpacing: 0.4,
              color: '#fff',
              textAlign: 'center',
            }}>
            Become the best version{'\n'}of yourself with Lastr'
          </Text>
          <Text
            style={{
              fontFamily: 'NeueHaasDisplay-Roman',
              lineHeight: 20 / fontScale,
              fontSize: 16 / fontScale,
              letterSpacing: 0.4,
              color: '#fff',
              textAlign: 'center',
              marginTop: 20,
              marginBottom: -15,
            }}>
            Stronger. More confident. In control.
          </Text>
        </View>
        <Image
          source={require('../../../assets/Images/tags.png')}
          style={{width: '100%', paddingHorizontal: 20}}
          resizeMode="contain"
        />

        <View>
          <Lottie
            source={require('../../../assets/Lottie/achievement.json')}
            autoPlay
            loop
            style={{
              paddingHorizontal: 48,
              width: '100%',
              aspectRatio: 1,
              marginTop: -70,
            }}
          />
          <Text
            style={{
              fontFamily: 'NeueHaasDisplay-Black',
              lineHeight: 28 / fontScale,
              letterSpacing: 0.4,
              fontSize: 22 / fontScale,
              color: '#fff',
              textAlign: 'center',
              marginTop: -35,
              marginBottom: 28,
            }}>
            Conquer yourself
          </Text>
          <View style={{alignSelf: 'center', marginBottom: 40}}>
            <View
              style={{
                flexDirection: 'row',
                gap: 10,
                alignItems: 'center',
                marginBottom: 8,
              }}>
              <Image
                source={require('../../../assets/Images/clock.png')}
                style={{width: 22, height: 22}}
              />
              <Text
                style={{
                  fontSize: 16 / fontScale,
                  color: '#fff',
                  fontFamily: 'NeueHaasDisplay-Roman',
                  lineHeight: 25 / fontScale,
                  letterSpacing: 0.5,
                }}>
                Increased sexual{' '}
                <Text style={{fontFamily: 'NeueHaasDisplay-Bold'}}>
                  stamina & endurance
                </Text>
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                gap: 10,
                alignItems: 'center',
                marginBottom: 8,
              }}>
              <Image
                source={require('../../../assets/Images/shield.png')}
                style={{width: 22, height: 22}}
              />
              <Text
                style={{
                  fontSize: 16 / fontScale,
                  color: '#fff',
                  fontFamily: 'NeueHaasDisplay-Roman',
                  lineHeight: 25 / fontScale,
                  letterSpacing: 0.5,
                }}>
                <Text style={{fontFamily: 'NeueHaasDisplay-Bold'}}>
                  Increase confidence
                </Text>{' '}
                in intimate moment
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                gap: 10,
                alignItems: 'center',
                marginBottom: 8,
              }}>
              <Image
                source={require('../../../assets/Images/brain.png')}
                style={{width: 22, height: 22}}
              />
              <Text
                style={{
                  fontSize: 16 / fontScale,
                  color: '#fff',
                  fontFamily: 'NeueHaasDisplay-Roman',
                  lineHeight: 25 / fontScale,
                  letterSpacing: 0.5,
                }}>
                Get rid of{' '}
                <Text style={{fontFamily: 'NeueHaasDisplay-Bold'}}>
                  performance anxiety
                </Text>
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                gap: 10,
                alignItems: 'center',
                marginBottom: 8,
              }}>
              <Image
                source={require('../../../assets/Images/heart.png')}
                style={{width: 22, height: 22}}
              />
              <Text
                style={{
                  fontSize: 16 / fontScale,
                  color: '#fff',
                  fontFamily: 'NeueHaasDisplay-Roman',
                  lineHeight: 25 / fontScale,
                  letterSpacing: 0.5,
                }}>
                <Text style={{fontFamily: 'NeueHaasDisplay-Bold'}}>Better</Text>
                , more satisfying{' '}
                <Text style={{fontFamily: 'NeueHaasDisplay-Bold'}}>
                  intimacy
                </Text>
              </Text>
            </View>
          </View>
          <View
            style={{
              marginHorizontal: 50,
            }}>
            <Image
              source={require('../../../assets/Images/star-cover.png')}
              style={{width: 130, height: 38, alignSelf: 'center'}}
            />
            <Text
              style={{
                marginTop: 16,
                textAlign: 'center',
                fontFamily: 'NeueHaasDisplay-LightItalic',
                fontSize: 16 / fontScale,
                letterSpacing: 0.4,
                lineHeight: 28 / fontScale,
                fontStyle: 'italic',
                color: '#fff',
              }}>
              “I used to struggle with control, but this app completely changed
              my confidence in bed.”{'\n'}
              <Text
                style={{
                  fontFamily: 'NeueHaasDisplay-Roman',
                  fontSize: 9 / fontScale,
                  lineHeight: 22 / fontScale,
                  fontStyle: 'normal',
                }}>
                Anonymous
              </Text>
            </Text>
            <View
              style={{
                marginTop: 29,
                marginHorizontal: 25,
                borderBottomWidth: 1.5 / fontScale,
                borderBottomColor: '#150F8E',
              }}
            />
          </View>
        </View>

        <View>
          <Lottie
            source={require('../../../assets/Lottie/work-yoga.json')}
            autoPlay
            loop
            style={{
              paddingHorizontal: 48,
              width: '90%',
              aspectRatio: 1,
              marginTop: -10,
              alignSelf: 'center',
            }}
          />
          <Text
            style={{
              fontFamily: 'NeueHaasDisplay-Black',
              lineHeight: 28 / fontScale,
              letterSpacing: 0.4,
              fontSize: 22 / fontScale,
              color: '#fff',
              textAlign: 'center',
              marginTop: -25,
              marginBottom: 28,
            }}>
            Master self-control
          </Text>
          <View style={{paddingHorizontal: 30, marginBottom: 40}}>
            <View
              style={{
                flexDirection: 'row',
                gap: 10,
                alignItems: 'center',
                marginBottom: 8,
              }}>
              <Image
                source={require('../../../assets/Images/lock.png')}
                style={{width: 22, height: 22}}
              />
              <Text
                style={{
                  fontSize: 16 / fontScale,
                  color: '#fff',
                  fontFamily: 'NeueHaasDisplay-Roman',
                  lineHeight: 25 / fontScale,
                  letterSpacing: 0.5,
                }}>
                Unbreakable{' '}
                <Text style={{fontFamily: 'NeueHaasDisplay-Bold'}}>
                  control{' '}
                </Text>
                over{' '}
                <Text style={{fontFamily: 'NeueHaasDisplay-Bold'}}>
                  ejaculation
                </Text>
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                gap: 10,
                alignItems: 'center',
                marginBottom: 8,
              }}>
              <Image
                source={require('../../../assets/Images/battery.png')}
                style={{width: 22, height: 22}}
              />
              <Text
                style={{
                  fontSize: 16 / fontScale,
                  color: '#fff',
                  fontFamily: 'NeueHaasDisplay-Roman',
                  lineHeight: 25 / fontScale,
                  letterSpacing: 0.5,
                }}>
                <Text style={{fontFamily: 'NeueHaasDisplay-Bold'}}>Train</Text>{' '}
                your{' '}
                <Text style={{fontFamily: 'NeueHaasDisplay-Bold'}}>brain</Text>{' '}
                to delay{' '}
                <Text style={{fontFamily: 'NeueHaasDisplay-Bold'}}>climax</Text>
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                gap: 10,
                alignItems: 'center',
                marginBottom: 8,
              }}>
              <Image
                source={require('../../../assets/Images/tree.png')}
                style={{width: 22, height: 22}}
              />
              <Text
                style={{
                  fontSize: 16 / fontScale,
                  color: '#fff',
                  fontFamily: 'NeueHaasDisplay-Roman',
                  lineHeight: 25 / fontScale,
                  letterSpacing: 0.5,
                }}>
                Fix the{' '}
                <Text style={{fontFamily: 'NeueHaasDisplay-Bold'}}>
                  root cause,
                </Text>{' '}
                not just{' '}
                <Text style={{fontFamily: 'NeueHaasDisplay-Bold'}}>
                  symptoms
                </Text>
              </Text>
            </View>
          </View>
          <View
            style={{
              marginHorizontal: 50,
            }}>
            <Image
              source={require('../../../assets/Images/star-cover.png')}
              style={{width: 130, height: 38, alignSelf: 'center'}}
            />
            <Text
              style={{
                marginTop: 16,
                textAlign: 'center',
                fontFamily: 'NeueHaasDisplay-LightItalic',
                fontSize: 16 / fontScale,
                letterSpacing: 0.4,
                lineHeight: 28 / fontScale,
                fontStyle: 'italic',
                color: '#fff',
              }}>
              “I used to feel completely powerless, but{'\n'}now I decide when
              to finish.”{'\n'}
              <Text
                style={{
                  fontFamily: 'NeueHaasDisplay-Roman',
                  fontSize: 9 / fontScale,
                  lineHeight: 22 / fontScale,
                  fontStyle: 'normal',
                }}>
                Anonymous
              </Text>
            </Text>
          </View>
        </View>

        <View style={styles.box}>
          <Image
            source={require('../../../assets/Images/white-check.png')}
            style={{
              width: 30,
              height: 30,
              marginBottom: 20,
              alignSelf: 'center',
            }}
          />
          <Text style={styles.box_head}>Simple, daily habits</Text>
          <Text style={styles.box_sub}>
            Every day, we&apos;ll guide you through{' '}
            <Text style={{fontFamily: 'NeueHaasDisplay-Black'}}>LASTR'</Text>s
            program. Your custom plan is 100% based on scientific methods and
            exercises, to ensure life-long control over your ejaculation.
          </Text>
          <Text style={styles.muted}>You will gain full control by:</Text>
          <Text
            style={[
              styles.date,
              {
                alignSelf: 'center',
                backgroundColor: '#232323',
                color: '#Dadada',
                marginTop: 7,
                marginBottom: 3,
              },
            ]}>
            {moment(user?.createdAt).add(10, 'weeks').format('MMM D, YYYY')}
          </Text>
          <Text
            style={[
              styles.similar_text,
              {marginTop: 20, fontFamily: 'Manrope-Bold'},
            ]}>
            How to reach your goal:
          </Text>
          <Text style={styles.similar_text}>
            🛠 Practice{' '}
            <Text style={{fontFamily: 'Manrope-Bold'}}>daily control</Text>{' '}
            exercises to train your{' '}
            <Text style={{fontFamily: 'Manrope-Bold'}}>stamina</Text>
          </Text>
          <Text style={styles.similar_text}>
            📊 Track your{' '}
            <Text style={{fontFamily: 'Manrope-Bold'}}>progress</Text> towards{' '}
            <Text style={{fontFamily: 'Manrope-Bold'}}>improvement</Text>
          </Text>
          <Text style={styles.similar_text}>
            🔄 Develop lasting{' '}
            <Text style={{fontFamily: 'Manrope-Bold'}}>habits</Text> for
            <Text style={{fontFamily: 'Manrope-Bold'}}>
              {' '}
              lifelong confidence
            </Text>
          </Text>
          <Text style={styles.similar_text}>
            ❤️ <Text style={{fontFamily: 'Manrope-Bold'}}>Better</Text>, more
            satisfying{' '}
            <Text style={{fontFamily: 'Manrope-Bold'}}>intimacy</Text>
          </Text>
        </View>

        <View>
          <View
            style={{
              marginTop: 30,
              marginHorizontal: 70,
              borderBottomWidth: 1.5 / fontScale,
              borderBottomColor: '#150F8E',
            }}
          />
          <Lottie
            source={require('../../../assets/Lottie/work-success.json')}
            autoPlay
            loop
            style={{
              paddingHorizontal: 48,
              width: '100%',
              aspectRatio: 1,
              marginTop: -10,
              marginLeft: -40,
            }}
          />
          <Text
            style={{
              fontFamily: 'NeueHaasDisplay-Black',
              lineHeight: 28 / fontScale,
              letterSpacing: 0.4,
              fontSize: 22 / fontScale,
              color: '#fff',
              textAlign: 'center',
              marginTop: -25,
              marginBottom: 28,
            }}>
            Achieve Permanent Results
          </Text>
          <View style={{paddingHorizontal: 30, marginBottom: 25}}>
            <View
              style={{
                flexDirection: 'row',
                gap: 10,
                alignItems: 'center',
                marginBottom: 8,
              }}>
              <Image
                source={require('../../../assets/Images/reload.png')}
                style={{width: 22, height: 22}}
              />
              <Text
                style={{
                  fontSize: 14 / fontScale,
                  color: '#fff',
                  fontFamily: 'NeueHaasDisplay-Roman',
                  lineHeight: 25 / fontScale,
                  letterSpacing: 0.5,
                }}>
                <Text style={{fontFamily: 'NeueHaasDisplay-Bold'}}>
                  Retrain{' '}
                </Text>
                your body for{' '}
                <Text style={{fontFamily: 'NeueHaasDisplay-Bold'}}>
                  effortless control
                </Text>
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                gap: 10,
                alignItems: 'center',
                marginBottom: 8,
              }}>
              <Image
                source={require('../../../assets/Images/build.png')}
                style={{width: 22, height: 22}}
              />
              <Text
                style={{
                  fontSize: 14 / fontScale,
                  color: '#fff',
                  fontFamily: 'NeueHaasDisplay-Roman',
                  lineHeight: 25 / fontScale,
                  letterSpacing: 0.5,
                }}>
                <Text style={{fontFamily: 'NeueHaasDisplay-Bold'}}>
                  Build habits
                </Text>{' '}
                that stick for{' '}
                <Text style={{fontFamily: 'NeueHaasDisplay-Bold'}}>good</Text>
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                gap: 10,
                alignItems: 'center',
                marginBottom: 8,
              }}>
              <Image
                source={require('../../../assets/Images/growth.png')}
                style={{width: 22, height: 22}}
              />
              <Text
                style={{
                  fontSize: 14 / fontScale,
                  color: '#fff',
                  fontFamily: 'NeueHaasDisplay-Roman',
                  lineHeight: 25 / fontScale,
                  letterSpacing: 0.5,
                }}>
                Step-by-step{' '}
                <Text style={{fontFamily: 'NeueHaasDisplay-Bold'}}>
                  improvements
                </Text>{' '}
                every{' '}
                <Text style={{fontFamily: 'NeueHaasDisplay-Bold'}}>week</Text>
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                gap: 10,
                alignItems: 'center',
                marginBottom: 8,
              }}>
              <Image
                source={require('../../../assets/Images/infinite.png')}
                style={{width: 22, height: 22}}
              />
              <Text
                style={{
                  fontSize: 14 / fontScale,
                  color: '#fff',
                  fontFamily: 'NeueHaasDisplay-Roman',
                  lineHeight: 25 / fontScale,
                  letterSpacing: 0.5,
                }}>
                This isn't just a quick fix, it's a{' '}
                <Text style={{fontFamily: 'NeueHaasDisplay-Bold'}}>
                  lifelong upgrade
                </Text>
              </Text>
            </View>
          </View>
          <View
            style={{
              marginHorizontal: 50,
            }}>
            <Image
              source={require('../../../assets/Images/star-cover.png')}
              style={{width: 130, height: 38, alignSelf: 'center'}}
            />
            <Text
              style={{
                marginTop: 16,
                textAlign: 'center',
                fontFamily: 'NeueHaasDisplay-LightItalic',
                fontSize: 16 / fontScale,
                letterSpacing: 0.4,
                lineHeight: 28 / fontScale,
                fontStyle: 'italic',
                color: '#fff',
                paddingBottom: 20,
              }}>
              “I used to feel completely powerless, but{'\n'}now I decide when
              to finish.”{'\n'}
              <Text
                style={{
                  fontFamily: 'NeueHaasDisplay-Roman',
                  fontSize: 9 / fontScale,
                  lineHeight: 22 / fontScale,
                  fontStyle: 'normal',
                }}>
                Anonymous
              </Text>
            </Text>
          </View>
        </View>
      </ScrollView>

      <AppButton
        title="Let’s get started!"
        style={{
          paddingVertical: 15,
          marginHorizontal: 25,
          borderRadius: 25,
          alignItems: 'center',
          marginTop: 20,
          marginBottom: 25,
        }}
        btnStyle={{textAlign: 'center'}}
        onPress={() => navigation.navigate('SubscriptionScreen')}
      />
    </ScreenWrapper>
  );
};

const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    gap: 22,
    alignItems: 'center',
    paddingTop: 28,
    paddingBottom: 20,
    paddingHorizontal: 22,
  },
  header: {
    fontSize: 24 / fontScale,
    lineHeight: 35,
    letterSpacing: 0.4,
    fontFamily: 'Calimate-Black',
    color: '#fff',
    paddingHorizontal: 20,
    textAlign: 'center',
    // marginBottom: 5,
  },
  subText: {
    color: '#DADADA',
    fontSize: 16 / fontScale,
    fontFamily: 'Calimate-Medium',
    letterSpacing: 0.4,
    marginTop: -5,
  },
  date: {
    paddingHorizontal: 21,
    paddingVertical: 12,
    paddingTop: 16,
    backgroundColor: '#fff',
    borderRadius: 100,
    fontFamily: 'Manrope-ExtraBold',
    fontSize: 14 / fontScale,
    lineHeight: 17.8,
  },
  image: {
    width: width / 1.08,
    height: height * 0.5,
  },
  box: {
    paddingHorizontal: 32,
    paddingVertical: 30,
    borderWidth: 1,
    borderRadius: 30 / fontScale,
    borderColor: '#7C7C7C',
    marginTop: 60,
    marginHorizontal: 30,
    marginBottom: 48,
    backgroundColor: 'rgba(56, 56, 56, 0.22)',
  },
  box_head: {
    fontFamily: 'Manrope-Bold',
    fontSize: 15 / fontScale,
    letterSpacing: 0.4,
    lineHeight: 20.8,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 10,
  },
  box_sub: {
    textAlign: 'center',
    fontFamily: 'NeueHaasDisplay-Roman',
    fontSize: 12 / fontScale,
    color: '#fff',
    letterSpacing: 0.4 / fontScale,
    lineHeight: 20 / fontScale,
    marginBottom: 10,
  },
  muted: {
    marginBottom: 10,
    fontFamily: 'NeueHaasDisplay-Light',
    lineHeight: 16.8 / fontScale,
    letterSpacing: 0.4,
    fontSize: 10 / fontScale,
    textAlign: 'center',
    color: '#DADADA',
  },
  similar_text: {
    fontFamily: 'Manrope-Regular',
    fontSize: 12 / fontScale,
    lineHeight: 16 / fontScale,
    letterSpacing: 0.3,
    color: '#fff',
    marginTop: 14,
  },
});

export default RewiringBenefitsTwoScreen;
