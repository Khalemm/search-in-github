import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { env } from '../client/env';

export default function App() {
  const fetchUser = async (username) => {
    const response = await fetch("https://api.github.com/users/" + username,{
      headers:{
        Authorization : "token " + env.gitToken,
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
