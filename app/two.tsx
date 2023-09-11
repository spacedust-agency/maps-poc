import { Pressable, StyleSheet } from "react-native";

import { useRouter, usePathname, Link } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import Container from "../components/Container";
import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";

export default function TabTwoScreen() {
  // const trekData = useAllTreks();
  const router = useRouter();
  const pathName = usePathname();
  return (
    <Container>
      <>
        <View style={styles.container}>
          <Text style={styles.title}>Tab Two</Text>
          <View
            style={styles.separator}
            lightColor="#eee"
            darkColor="rgba(255,255,255,0.1)"
          />
          <EditScreenInfo path="app/(tabs)/two.tsx" />
        </View>
        <Link href={`/modal?number=${10}`} asChild>
          <Pressable>
            {({ pressed }) => (
              <FontAwesome
                name="info-circle"
                size={25}
                style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
              />
            )}
          </Pressable>
        </Link>
      </>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
