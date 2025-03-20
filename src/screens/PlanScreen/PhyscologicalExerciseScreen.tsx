import {RouteProp} from '@react-navigation/native';
import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import Header from '../../components/global/Header';
import TabScreenWrapper from '../../components/global/TabScreenWrapper';
import {psychological_exercise_set} from '../../constants/question';
import {fontScale, height} from '../../styles/globalStyles';

const PhyscologicalExerciseScreen = ({
  route,
}: {
  route: RouteProp<any, 'params'>;
}) => {
  const {data} = route.params;
  const exercise = psychological_exercise_set[data.code];

  return (
    <TabScreenWrapper style={styles.container}>
      <Header title={data?.title} back containerStyle={{paddingBottom: 15}} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.mainContainer}>
          <View style={styles.descrpContainer}>
            <Text style={styles.descText}>{exercise.content}</Text>
          </View>
          <Text
            style={[
              styles.label,
              {
                fontFamily: 'NeueHaasDisplay-Mediu',
                marginTop: 15,
                paddingHorizontal: 4,
                fontSize: 20 / fontScale,
                marginBottom: 14,
                lineHeight: 24.2 / fontScale,
                letterSpacing: 0.2,
              },
            ]}>
            Best practices
          </Text>
          <View style={styles.cardContainer}>
            {/* Control Score Card */}
            <View style={[styles.card, styles.controlScore]}>
              <Text
                style={[
                  styles.label,
                  {
                    fontFamily: 'NeueHaasDisplay-Roman',
                    margin: 0,
                  },
                ]}>
                {exercise.stats[0].label}
              </Text>
              <Text style={styles.score}>
                {exercise.stats[0].time}{' '}
                <Text
                  style={{
                    fontSize: 12 / fontScale,
                    fontFamily: 'Calimate-Regular',
                  }}>
                  {exercise.stats[0].small_text}
                </Text>
              </Text>
            </View>

            {/* Potential Score Card */}
            <View style={[styles.card, styles.potential]}>
              <Text
                style={[
                  styles.label,
                  {
                    fontFamily: 'NeueHaasDisplay-Light',
                    margin: 0,
                  },
                ]}>
                {exercise.stats[1]?.label}
              </Text>
              <Text style={styles.score}>
                {exercise.stats[1].time}{' '}
                <Text
                  style={{
                    fontSize: 12 / fontScale,
                    fontFamily: 'Calimate-Regular',
                  }}>
                  {exercise.stats[1].small_text}
                </Text>
              </Text>
            </View>
          </View>
          <View
            style={[
              {
                borderColor: '#2A2A2A',
                borderWidth: 1,
                backgroundColor: '#1C1C1C',
                paddingVertical: 15,
                borderRadius: 10,
                // marginBottom: 5,
                alignItems: 'center',
              },
            ]}>
            <Text
              style={[
                styles.descText,
                {
                  fontSize: 15 / fontScale,
                  letterSpacing: 0.5 / fontScale,
                  lineHeight: 25.2 / fontScale,
                },
              ]}>
              {exercise.statement1}
            </Text>
          </View>
          <View style={styles.cardContainer}>
            {/* Control Score Card */}
            <View style={[styles.card, styles.potential]}>
              <Text
                style={[
                  styles.label,
                  {
                    fontFamily: 'NeueHaasDisplay-Roman',
                    margin: 0,
                  },
                ]}>
                {exercise.stats[2].label}
              </Text>
              <Text style={styles.score}>
                {exercise.stats[2].time}{' '}
                <Text
                  style={{
                    fontSize: 12 / fontScale,
                    fontFamily: 'Calimate-Regular',
                  }}>
                  {exercise.stats[2].small_text}
                </Text>
              </Text>
            </View>

            {/* Potential Score Card */}
            <View style={[styles.card, styles.controlScore]}>
              <Text
                style={[
                  styles.label,
                  {
                    fontFamily: 'NeueHaasDisplay-Light',
                    margin: 0,
                  },
                ]}>
                {exercise.stats[3].label}
              </Text>
              <Text style={styles.score}>
                {exercise.stats[3].time}{' '}
                <Text
                  style={{
                    fontSize: 12 / fontScale,
                    fontFamily: 'Calimate-Regular',
                  }}>
                  {exercise.stats[3].small_text}
                </Text>
              </Text>
            </View>
          </View>
          <View
            style={[
              {
                borderColor: '#2A2A2A',
                borderWidth: 1,
                backgroundColor: '#1C1C1C',
                paddingVertical: 15,
                borderRadius: 10,
                // marginBottom: 10,
                alignItems: 'center',
              },
            ]}>
            <Text style={[styles.descText, {fontSize: 15 / fontScale}]}>
              {exercise.statement2}
            </Text>
          </View>
        </View>
      </ScrollView>
    </TabScreenWrapper>
  );
};

export default PhyscologicalExerciseScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0e0e0e',
  },
  mainContainer: {
    paddingHorizontal: 22,
    marginBottom: 22,
    gap: 10,
  },
  descrpContainer: {
    borderColor: '#2A2A2A',
    borderWidth: 1,
    backgroundColor: '#1C1C1C',
    paddingHorizontal: 22,
    paddingVertical: 22,
    borderRadius: 10,
  },
  descText: {
    fontFamily: 'NeueHaasDisplay-Roman',
    fontSize: 13 / fontScale,
    color: '#fff',
    lineHeight: 20 / fontScale,
    // letterSpacing: 0.3,
  },
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 7,
  },
  card: {
    width: '49%',
    // height: 105,
    paddingVertical: 25,
    paddingLeft: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'flex-start',
    // marginBottom: 5,
    borderWidth: 1,
    borderColor: '#323232',
  },
  controlScore: {
    paddingLeft: 24,
    backgroundColor: '#1E1E1E', // Dark background for Control Score
  },
  potential: {
    backgroundColor: 'rgba(102, 0, 162, 0.5)', // Purple background for Potential
    borderWidth: 1,
    // paddingLeft: 22,
    borderColor: '#AA00FF', // Purple border color
  },
  label: {
    color: '#FFFFFF',
    fontSize: 14 / fontScale,
    fontFamily: 'Fontspring-DEMO-integralcf-regular',
    marginBottom: 8,
    // height: 20,
  },
  score: {
    color: '#FFFFFF',
    fontFamily: 'NeueHaasDisplay-Black',
    fontSize: 32 / fontScale,
  },
  image: {
    height: height / 3,
    alignSelf: 'center',
    resizeMode: 'contain',
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
