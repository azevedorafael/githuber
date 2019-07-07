import React, { Component } from 'react';

import { View, Text, TextInput, TouchableOpacity, StatusBar } from 'react-native';
import { AsyncStorage } from '@react-native-community/async-storage'

import api from '~/services/api'

import styles from './styles';

class Welcome extends Component {
  state= {
    userName: '',
  }

  checkUserExists = async (username) => {
    const user = await api.get(`/users/${username}`);
    console.tron.log(user)
    return user;
  }

  saveUser = async (username) => {
    await AsyncStorage.setItem('@Githuber:username', username);
  }

  sigIn = async () => {
    const { userName }  = this.state;
    const { navigation } = this.props

    try {
      await this.checkUserExists(userName);
      await this.saveUser(userName);

      navigation.navigate('Repositories')
    } catch (err) {
      console.tron.log('Usuário inexistente');
    }
  }

  render() {
    const { userName }  = this.state;

    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="#444A5A" />

        <Text style={styles.title}>Bem-vindo</Text>
        <Text style={styles.text}>
              Para continuar precisamos que você informe seu usuário no Github.
        </Text>

        <View style={styles.form}>
          <TextInput
            style={styles.input}
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="Digite seu usuário"
            underlineColorAndroid="transparent"
            value={userName}
            onChangeText={text => this.setState({userName: text })}
          />

          <TouchableOpacity style={styles.button} onPress={this.sigIn}>
            <Text style={styles.buttonText}>
              Prosseguir
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default Welcome;
