import HamburgerDrawer from "@/src/components/HamburgerDrawer";
import RequestModal from "@/src/components/RequestModel";
import { useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { Appbar, Card, FAB, Text } from "react-native-paper";

const MOCK_LIST = [
  { id: "1", title: "Item One", description: "Description for item one" },
  { id: "2", title: "Item Two", description: "Description for item two" },
  { id: "3", title: "Item Three", description: "Description for item three" },
  { id: "4", title: "Item Four", description: "Description for item four" },
];

export default function HomeScreen() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.Action icon="menu" onPress={() => setDrawerOpen(true)} />
        <Appbar.Content title="Dashboard" />
      </Appbar.Header>

      <FlatList
        data={MOCK_LIST}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <Card style={styles.card}>
            <Card.Content>
              <Text variant="titleMedium">{item.title}</Text>
              <Text variant="bodySmall" style={styles.cardDesc}>
                {item.description}
              </Text>
            </Card.Content>
          </Card>
        )}
      />
      <FAB
        icon="plus"
        label="Make Request"
        style={styles.fab}
        onPress={() => setModalVisible(true)}
      />

      <HamburgerDrawer visible={drawerOpen} onClose={() => setDrawerOpen} />

      <RequestModal
        visible={modalVisible}
        onDismiss={() => setModalVisible(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5" },
  list: { padding: 16, gap: 12 },
  card: { borderRadius: 10 },
  cardDesc: { color: "#666", marginTop: 4 },
  fab: { position: "absolute", right: 16, bottom: 24 },
});
