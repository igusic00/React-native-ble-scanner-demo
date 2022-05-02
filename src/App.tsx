import React, {FC, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Button,
  ScrollView,
} from 'react-native';
import {Provider, useDispatch, useSelector} from 'react-redux';
import {BluetoothPeripheral} from './models/BluetoothPeripheral';
import {RootState, store} from './store/store';
import {
  bluetoothPeripheralsFound,
  scanForPeripherals,
  stopScanningForPeripherals,
} from './modules/bluetooth.reducer';

const App = () => {
  return (
    <Provider store={store}>
      <Home />
    </Provider>
  );
};
const Home: FC = () => {
  const dispatch = useDispatch();
  const devices = useSelector(
    (state: RootState) => state.bluetooth.availableDevices,
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {devices.map((device) => (
          <>
            <Text>{JSON.stringify(device)}</Text>
            <View height={20} />
          </>
        ))}
        <View style={styles.twobutton}>
          <Button
            title="Start"
            onPress={() => {
              dispatch(scanForPeripherals());
            }}
          />
          <Button
            title="Stop"
            onPress={() => {
              /* dispatch(stopScanningForPeripherals()); */
            }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
  twobutton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default App;
