import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Register from './src/screens/Register/Register';

export default function App() {
  return (
    <>
      <Register />
    </>
  );
}

/*const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#deb887',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

<View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>*/
