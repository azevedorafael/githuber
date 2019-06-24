import React from 'react';

import { View, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
      flex: 1,
      paddingHorizontal: 20,
    },
  });

const Welcome = () => <View style={styles.container}><Text>Welcome</Text></View>;

export default Welcome;
