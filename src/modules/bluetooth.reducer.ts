import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {BluetoothPeripheral} from '../../models/BluetoothPeripheral';

type BluetoothState = {
  availableDevices: Array<BluetoothPeripheral>;
  isScanning: boolean;
};

const initialState: BluetoothState = {
  availableDevices: [],
  isScanning: false,
};

const bluetoothReducer = createSlice({
  name: 'bluetooth',
  initialState: initialState,
  reducers: {
    scanForPeripherals: (state) => {
      state.isScanning = true;
    },
    /*     stopScanningForPeripherals: (state) => {
      state.isScanning = false;
    }, */
    bluetoothPeripheralsFound: (
      state: BluetoothState,
      action: PayloadAction<BluetoothPeripheral>,
    ) => {
      // Ensure no duplicate devices are added
      const isDuplicate = state.availableDevices.some(
        (device) => device.id === action.payload.id,
      );
      if (!isDuplicate) {
        state.availableDevices = state.availableDevices.concat(action.payload);
      }
    },
  },
});

export const {
  bluetoothPeripheralsFound,
  scanForPeripherals,
  /* stopScanningForPeripherals, */
} = bluetoothReducer.actions;

export const sagaActionConstants = {
  SCAN_FOR_PERIPHERALS: bluetoothReducer.actions.scanForPeripherals.type,
  /* STOP_SCANNING_FOR_PERIPHERALS:
    bluetoothReducer.actions.stopScanningForPeripherals.type, */
  ON_DEVICE_DISCOVERED: bluetoothReducer.actions.bluetoothPeripheralsFound.type,
};

export default bluetoothReducer;
