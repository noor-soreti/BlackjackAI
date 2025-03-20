import {useFocusEffect} from '@react-navigation/native';
import moment from 'moment';
import React, {useCallback, useEffect, useMemo} from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import {LineChart} from 'react-native-gifted-charts';
import * as Progress from 'react-native-progress';
import {queryClient} from '../../../App';
import {storage} from '../../Api/Storage';
import {TickIcon} from '../../assets/Svg';
import Header from '../../components/global/Header';
import TabScreenWrapper from '../../components/global/TabScreenWrapper';
import {COLORS} from '../../styles/colors';
import {fontScale} from '../../styles/globalStyles';
import {useAuthContext} from '../Config';

const screenWidth = Dimensions.get('window').width;

const HomeScreen = () => {
  const {user} = useAuthContext();

  // const {data: _user} = useQuery({
  //   queryKey: ['user'],
  //   queryFn: getProfile,
  // });

  const invalidateQueries = async () => {
    await queryClient.invalidateQueries({
      queryKey: ['user'],
    });
    await queryClient.invalidateQueries({queryKey: ['week']});
    await queryClient.invalidateQueries({queryKey: ['daily_tasks']});
  };

  useFocusEffect(
    useCallback(() => {
      // refetch();
      storage.delete('last_screen');
    }, []),
  );

  useEffect(() => {
    // week_refetch();
    // daily_task_refetch();
    invalidateQueries();
  }, []);

  const progress_value =
    (moment().startOf('day').unix() -
      moment(user?.createdAt).startOf('day').unix()) /
    (moment(user?.createdAt).add(10, 'weeks').startOf('day').unix() -
      moment(user?.createdAt).startOf('day').unix());

  const customDataPoint = () => {
    return (
      <View
        style={{
          width: 14,
          height: 14,
          backgroundColor: '#B77DB3',
          borderWidth: 4,
          borderRadius: 10,
          borderColor: COLORS.primary,
          marginBottom: -15,
        }}
      />
    );
  };
  const data = useMemo(
    () => [
      {value: 20, label: '15'},
      {value: 100, label: '16'},
      {value: 130, label: '17'},
      {value: 150, label: '18'}, // Tooltip should appear here
      {value: 180, label: '19'},
      {value: 195, label: '20'},
    ],
    [],
  );
  return (
    <TabScreenWrapper style={styles.container}>
      <View>
        <Header title="Last Report 📊" upload setting />
        <View style={[styles.cardContainer, {marginTop: -5}]}>
          {/* Control Score Card */}
          <View style={[styles.card, styles.controlScore]}>
            <Text style={styles.label}>Control Score</Text>
            <Text style={styles.score}>
              {user?.user_analysis.pe_score || 0}
            </Text>
          </View>

          {/* Potential Score Card */}
          <View style={[styles.card, styles.potential]}>
            <Text style={styles.label}>Potential</Text>
            <Text style={styles.score}>
              {user?.user_analysis?.potential_score
                ? user?.user_analysis?.potential_score <= 89
                  ? 89
                  : user?.user_analysis.potential_score
                : '0'}
            </Text>
          </View>
        </View>
        <View
          style={[
            styles.controlScore,
            {
              // flexGrow: 0.2,
              borderRadius: 10,
              marginLeft: 25,
              marginRight: 26,
              marginBottom: 9,
              paddingVertical: 15,
              alignItems: 'center',
              justifyContent: 'center',
              borderWidth: 1,
              borderColor: '#323232',
            },
          ]}>
          <Text style={styles.latencyText}>
            Next latency time update in 6 days 🎯📈
          </Text>
        </View>
        <View style={styles.chartContainer}>
          <Text style={styles.chartTitle}>Control progression</Text>
          <LineChart
            areaChart
            data={data}
            width={screenWidth / 1.34}
            height={100}
            spacing={60}
            thickness={2.5}
            color="#6600A2"
            hideYAxisText
            backgroundColor={'transparent'}
            noOfSections={3}
            showVerticalLines={false}
            xAxisColor="transparent"
            yAxisColor="transparent"
            yAxisLabelSuffix=""
            showYAxisIndices={false}
            yAxisOffset={0}
            maxValue={200}
            curved
            initialSpacing={10}
            endSpacing={0}
            // Custom styling
            rulesType="solid"
            rulesColor="gray"
            rulesThickness={0}
            showXAxisIndices={false}
            startIndex={0}
            startFillColor="#A100FF"
            endFillColor="#3A0758"
            startOpacity={0.8}
            endOpacity={0.2}
            xAxisLabelTextStyle={{
              color: '#fff',
            }}
            customDataPoint={customDataPoint}
            // Custom Dots
            dataPointsColor="transparent"
            dataPointsRadius={4}
            dataPointsShape="circle"
            dataPointsHeight={14}
            dataPointsWidth={14}
            // Tooltip
            pointerConfig={{
              pointerStripColor: COLORS.primary,
              pointerColor: 'transparent',
              pointerStripWidth: 3,
              pointerStripUptoDataPoint: true,
              pointerLabelWidth: 50,
              activatePointersOnLongPress: true,
              autoAdjustPointerLabelPosition: false,
              strokeDashArray: [6, 6],
              pointerLabelComponent: (data: any) => {
                // return null;
                return (
                  <View
                    style={{
                      backgroundColor: COLORS.primary,
                      borderRadius: 8,
                      bottom: 20,
                      height: 30,
                      justifyContent: 'center',
                    }}>
                    <Text
                      style={{
                        color: '#fff',
                        fontFamily: 'Manrope-Bold',
                        fontSize: 14 / fontScale,
                        alignSelf: 'center',
                      }}>
                      {data.value || 80}
                    </Text>
                  </View>
                );
              },
            }}
          />
        </View>
        <View
          style={[
            styles.controlScore,
            {
              // flexGrow: 0.2,
              borderRadius: 10,
              marginLeft: 25,
              marginRight: 26,
              marginBottom: 10,
              paddingVertical: 15,
              alignItems: 'center',
              justifyContent: 'center',
              borderWidth: 1,
              borderColor: '#323232',
            },
          ]}>
          <Text style={styles.latencyText}>
            You're on track to full control ⏱️
          </Text>
        </View>
        <View style={[styles.cardContainer]}>
          {/* Control Score Card */}
          <View style={[styles.card, styles.controlScore]}>
            <Text style={[styles.label]}>Latency Time</Text>
            <Text style={[styles.score]}>
              {user?.latency_time} <Text style={{fontSize: 14}}>mins</Text>
            </Text>
            {/* <Progress.Bar
            progress={0.8}
            width={120}
            height={12}
            borderRadius={10}
            color="#6800A5"
            unfilledColor="#EAC0FF"
            borderWidth={0}
            style={{
              alignSelf: 'center',
              marginTop: 15,
            }}
          /> */}
          </View>

          {/* Potential Score Card */}
          <View
            style={[styles.card, styles.controlScore, {paddingHorizontal: 16}]}>
            <View style={{alignSelf: 'center', position: 'absolute', top: -16}}>
              <TickIcon />
            </View>
            <Text
              style={[
                styles.label,
                {fontSize: 13 / fontScale, alignSelf: 'center'},
              ]}>
              You’ll have control by
            </Text>
            <Text
              style={[
                styles.score,
                {
                  textAlign: 'center',
                  alignSelf: 'center',
                  fontSize: 18 / fontScale,
                  marginVertical: 12,
                },
              ]}>
              {moment(user?.createdAt).add(10, 'weeks').format('MMM D, YYYY')}
            </Text>
            <Progress.Bar
              progress={progress_value}
              width={120}
              height={12}
              borderRadius={10}
              color="#6800A5"
              unfilledColor="#EAC0FF"
              borderWidth={0}
              style={{
                alignSelf: 'center',
                marginTop: 15,
              }}
            />
          </View>
        </View>
      </View>
    </TabScreenWrapper>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#0e0e0e',
    gap: 6,
  },
  chartContainer: {
    alignSelf: 'flex-start',
    backgroundColor: '#1C1C1C',
    paddingHorizontal: 12,
    marginHorizontal: 25,
    paddingVertical: 22,
    paddingRight: 34,
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 9,
    height: 200,
    borderWidth: 1,
    borderColor: '#323232',
  },
  chartTitle: {
    color: 'white',
    fontSize: 13 / fontScale,
    fontFamily: 'NeueHaasDisplay-Mediu',
    letterSpacing: 0.2,
    marginBottom: '4%',
    left: '3%',
  },
  chart: {
    marginVertical: 8,
    borderRadius: 10,
    padding: 32,
  },
  tooltip: {
    position: 'absolute',
    backgroundColor: '#666',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  tooltipText: {
    color: 'white',
    fontSize: 14 / fontScale,
  },
  dataPoint: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: 'purple',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardContainer: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    // alignItems: 'center',
    marginHorizontal: 25,
    marginBottom: 9,
    marginTop: 9,
    gap: 9,
  },
  card: {
    width: '48.5%',
    // height: 100,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'flex-start',
    // marginHorizontal: 8,
    paddingVertical: 24,
    paddingBottom: 20,
    borderWidth: 1,
    borderColor: '#323232',
  },
  controlScore: {
    paddingHorizontal: 22,
    backgroundColor: '#1C1C1C', // Dark background for Control Score
  },
  potential: {
    backgroundColor: 'rgba(102, 0, 162, 0.5)', // Purple background for Potential
    borderWidth: 1,
    paddingHorizontal: 22,
    borderColor: '#AA00FF', // Purple border color
  },
  label: {
    color: '#FFFFFF',
    fontSize: 16 / fontScale,
    fontFamily: 'NeueHaasDisplay-Mediu',
    marginBottom: 5,
    letterSpacing: 0.2,
    // height: 20,
  },
  score: {
    color: '#FFFFFF',
    fontFamily: 'WorkSans-ExtraBold',
    fontSize: 36 / fontScale,
  },
  latencyText: {
    color: '#FFFFFF',
    fontFamily: 'NeueHaasDisplay-Mediu',
    fontSize: 16 / fontScale,
    lineHeight: 22 / fontScale,
    letterSpacing: 0.3,
    textAlign: 'center',
    margin: 0,
  },
});
