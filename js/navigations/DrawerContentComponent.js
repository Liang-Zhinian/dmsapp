import React from 'react'
import { ScrollView, StyleSheet } from 'react-native';
import { DrawerItems } from 'react-navigation';

export default (props) => (
  <ScrollView style={styles.container}>
    <DrawerItems {...props} />
  </ScrollView>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
