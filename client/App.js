import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  const fetchUser = async (username) => {
    const response = await fetch("https://api.github.com/users/" + username,{
      headers:{
        Authorization : "token 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"
      }
    });
    const data = await response.json();

    console.log(data);
  }

  fetchUser("Khalemm");

  return (
    <View style={styles.container}>
      <Text>Wesh wesh papa, ca taff dur?</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
