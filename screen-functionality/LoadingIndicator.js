import * as React from 'react';
import { ActivityIndicator} from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
    StyleSheet,
    View,
  } from "react-native";

const LoadingIndicator = () => (
<SafeAreaView style={styles.container}>
    <View >
        <ActivityIndicator 
        animating={true} 
        color="#0000ff"
        size="large" />
    </View>
</SafeAreaView>
);

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    }
  });
export default LoadingIndicator;