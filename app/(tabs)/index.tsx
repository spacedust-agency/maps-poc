import { Pressable, StyleSheet } from 'react-native';

import EditScreenInfo from '../../components/EditScreenInfo';
import { Text, View } from '../../components/Themed';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Container from '../../components/Container';
import { Link } from 'expo-router';
import { requestOtp, verifyOtp } from '../../hooks/auth';
import AnimatedStyleUpdateExample from '../../components/Animated';

export default function TabOneScreen() {

  const requestOtpMutation = useMutation({
    mutationFn: () => requestOtp("9252335083"),
    onSuccess: () => {
      console.log("data")
    },
    onError: () => {
      console.log("error")
    }
  });

  function handleVerify(): void {
    requestOtpMutation.mutateAsync()
  }

  return (
    <Container>
      <View style={styles.container}>
        <Text style={styles.title}>Tab One</Text>
        <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
        <EditScreenInfo path="app/(tabs)/index.tsx" />
        <Pressable onPress={handleVerify}>
          <Text>Home</Text>
        </Pressable>
        <AnimatedStyleUpdateExample></AnimatedStyleUpdateExample>
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
