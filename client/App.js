import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, Image } from 'react-native';

export default function App() {
  
  const [userInput, onChangeText] = React.useState("Rechercher un utillisateur . . .");

  const [userData, onChangeData] = React.useState({recherche:"en attente d'un utillisateur"});

  const fetchUser = async (username) => {
    const response = await fetch("http://localhost:4242/api/users/" + username,{
      method:"GET",
      headers:{
        'Content-Type':'application/json'
      }
    });
    return await (await response).json();
  }

  const fetchAction = async () => {
    if(userInput){
      onChangeData(await fetchUser(userInput))
    }
  } 

  const renderItems = (displayData) => {
    var template = []
    if(displayData.user){
      template.push(
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Image style={styles.logo} source={{ uri: displayData.user.avatar_url }} />
          </View>
      )
      for (const key in displayData.user) {
        template.push(<View key={key}>
            <Text>{key} : {displayData.user[key]}</Text>
        </View>)
      }
    }else{
      for (const key in displayData) {
        template.push(<View key={key}>
            <Text>{key} : {displayData[key]}</Text>
        </View>)
      }
    }
    return template
  }
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        value={userInput}
      />
      <Button title='Recherche'
      onPress={fetchAction}
      />
      <View>{renderItems(userData)}</View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: 50,
    height: 50
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
