import {RouteProp} from '@react-navigation/native';
import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Header from '../../components/global/Header';
import TabScreenWrapper from '../../components/global/TabScreenWrapper';
import {physical_exercise_set} from '../../constants/question';
import {fontScale, height} from '../../styles/globalStyles';

export const exerciseImages: {[key: string]: any} = {
  BA: require('../../assets/Images/exercise_bridge_abduction.png'),
  HGB: require('../../assets/Images/exercise_heel_glute_bridge.png'),
  LB: require('../../assets/Images/exercise_lying_butterfly.png'),
  LLR: require('../../assets/Images/exercise_lying_leg_raise.png'),
  PT: require('../../assets/Images/exercise_pelvic_tilt.png'),
  RDB: require('../../assets/Images/exercise_rear_decline_bridge.png'),
};

const ExerciseScreen = ({route}: {route: RouteProp<any, 'params'>}) => {
  const {data} = route.params;
  const exercise = physical_exercise_set[data.code];

  return (
    <TabScreenWrapper style={styles.container}>
      <Header title={data?.title} back />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.mainContainer}>
          <View style={styles.descrpContainer}>
            <Text style={styles.descText}>{exercise.content}</Text>
          </View>
          <View style={styles.cardContainer}>
            {/* Control Score Card */}
            <View style={[styles.card, styles.controlScore]}>
              <Text style={styles.label}>SETS</Text>
              <Text style={styles.score}>{exercise?.sets}</Text>
            </View>

            {/* Potential Score Card */}
            {exercise.type === 'reps' ? (
              <View style={[styles.card, styles.potential]}>
                <Text style={styles.label}>Reps</Text>
                <Text style={[styles.score, {fontSize: 30 / fontScale}]}>
                  {exercise.reps}
                </Text>
              </View>
            ) : (
              <View style={[styles.card, styles.potential]}>
                <Text style={styles.label}>Stops</Text>
                <View
                  style={{
                    flexDirection: 'row',
                    gap: 5,
                    alignItems: 'flex-end',
                    justifyContent: 'flex-start',
                  }}>
                  <Text style={styles.score}>{exercise.stops.time}</Text>
                  <Text
                    style={[
                      styles.score,
                      {
                        fontSize: 13 / fontScale,
                        lineHeight:
                          Platform.OS === 'ios'
                            ? 26 / fontScale
                            : 16 / fontScale,
                      },
                    ]}>
                    {exercise.stops.duration}
                  </Text>
                </View>
              </View>
            )}
          </View>
          <Image source={exerciseImages[data.code]} style={styles.image} />
          {/* <TouchableOpacity style={styles.btn}>
            <TimerIcon />
            <Text style={styles.btnText}>Launch timer</Text>
          </TouchableOpacity> */}
        </View>
      </ScrollView>
    </TabScreenWrapper>
  );
};

export default ExerciseScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0e0e0e',
  },
  mainContainer: {
    paddingHorizontal: 24,
    marginBottom: 22,
  },
  descrpContainer: {
    borderColor: '#2A2A2A',
    borderWidth: 1,
    backgroundColor: '#1C1C1C',
    paddingHorizontal: 24,
    paddingVertical: 18,
    borderRadius: 10,
    marginBottom: 20,
  },
  descText: {
    fontFamily: 'NeueHaasDisplay-Roman',
    fontSize: 13 / fontScale,
    color: '#fff',
    lineHeight: 20 / fontScale,
    letterSpacing: 0.3,
  },
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 14,
    alignItems: 'center',
    marginBottom: 20,
  },
  card: {
    flex: 1,
    height: 100,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingHorizontal: 34,
    borderColor: '#2A2A2A',
    borderWidth: 1,
  },
  controlScore: {
    // paddingHorizontal: 34,
    backgroundColor: '#1E1E1E', // Dark background for Control Score
  },
  potential: {
    backgroundColor: 'rgba(102, 0, 162, 0.5)', // Purple background for Potential
    borderWidth: 1 / fontScale,
    // paddingHorizontal: 22,
    borderColor: '#AA00FF', // Purple border color
  },
  label: {
    color: '#FFFFFF',
    fontSize: 13 / fontScale,
    fontFamily: 'Fontspring-DEMO-integralcf-regular',
    marginBottom: 12,
    // height: 20,
  },
  score: {
    color: '#FFFFFF',
    fontFamily: 'WorkSans-ExtraBold',
    fontSize: 32 / fontScale,
    lineHeight: Platform.OS === 'ios' ? 29 / fontScale : 24 / fontScale,
  },
  image: {
    width: '100%',
    height: height / 2.79,
    alignSelf: 'center',
    marginLeft: 5,
    resizeMode: 'cover',
    borderRadius: 12,
  },
  btn: {
    borderRadius: 100 / 2,
    width: '100%',
    backgroundColor: '#A81DA1',
    paddingVertical: 12,
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 22,
    gap: 12,
    marginTop: '15%',
  },
  btnText: {
    fontSize: 16 / fontScale,
    fontFamily: 'Calimate-Regular',
    color: '#fff',
  },
});
