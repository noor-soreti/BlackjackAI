import {createStackNavigator} from '@react-navigation/stack';
import PlanScreen from '../../../screens/PlanScreen';
import DayListScreen from '../../../screens/PlanScreen/DayListScreen';
import ExerciseListScreen from '../../../screens/PlanScreen/ExerciseListScreen';
import ExerciseScreen from '../../../screens/PlanScreen/ExerciseScreen';
import PhyscologicalExerciseScreen from '../../../screens/PlanScreen/PhyscologicalExerciseScreen';
import LifeStyleScreen from '../../../screens/PlanScreen/LifeStyleScreen';

const Stack = createStackNavigator();

const routes = [
  {name: 'PlanScreen', component: PlanScreen},
  {name: 'DayListScreen', component: DayListScreen},
  {name: 'ExerciseListScreen', component: ExerciseListScreen},
  {name: 'ExerciseScreen', component: ExerciseScreen},
  {name: 'PhyscologicalExerciseScreen', component: PhyscologicalExerciseScreen},
  {name: 'LifeStyleScreen', component: LifeStyleScreen},
];

function PlanStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      {routes.map((route, index) => (
        <Stack.Screen
          key={index}
          name={route.name}
          component={route.component}
        />
      ))}
    </Stack.Navigator>
  );
}

export default PlanStack;
