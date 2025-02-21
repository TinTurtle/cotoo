import { StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';
import TaskPanel from '../../components/TaskPanel'; // Correct import path
import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';

export default function TabOneScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab One</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <TaskPanel style={styles.taskPanel} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.skyBlue,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  taskPanel: {
    position: 'absolute',
    bottom: 0,
    width: '90%',
  },
});
