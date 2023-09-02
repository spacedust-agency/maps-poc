import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as React from 'react'
import { View, StatusBar } from 'react-native';

export default function Container({ children }: { children: React.ReactElement }) {
  const insets = useSafeAreaInsets();
  return (<View style={{ paddingTop: insets.top, backgroundColor: '#FFF', flex: 1 }}>
    <StatusBar barStyle="light-content" backgroundColor="#000" />
    {children}
  </View>);
}