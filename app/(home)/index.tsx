import HamburgerDrawer from "@/src/components/HamburgerDrawer";
import RequestModal from "@/src/components/RequestModel";
import { ListItem, useList } from "@/src/context/ListContext";
import { useState } from "react";
import { Alert, FlatList, StyleSheet, View } from "react-native";
import { Appbar, Card, FAB, IconButton, Text } from "react-native-paper";

export default function HomeScreen() {
  const { items, deleteItem } = useList();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingItem, setEditingItem] = useState<ListItem | null>(null);

  const handleCretae = () => {
    setEditingItem(null);
    setModalVisible(true);
  };

  const handleEdit = (item: ListItem) => {
    setEditingItem(item);
    setModalVisible(true);
  }

  const handleDelete = (item: ListItem) => {
    Alert.alert(
      "Confirm Delete",
      `Are you sure you want to delete "${item.title}"?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            deleteItem(item.id);
          }
        }
      ]
    );
  };

  const handleDismiss = () => {
    setEditingItem(null);
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.Action icon="menu" onPress={() => setDrawerOpen(true)} />
        <Appbar.Content title="Dashboard" />
      </Appbar.Header>

      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <Text variant="bodyMedium" style={styles.empty}>
            No items yet. Tap the button below to create one!
          </Text>
        }

        renderItem={({ item }) => (
          <Card style={styles.card}>
            <Card.Content>
              <Text variant="titleMedium">{item.title}</Text>
              <Text variant="bodySmall" style={styles.cardDesc}>
                {item.description}
              </Text>
            </Card.Content>
            <Card.Actions>
              <IconButton icon="pencil" size={20} onPress={() => handleEdit(item)} />
              <IconButton icon="delete" size={20} onPress={() => handleDelete(item)} />
            </Card.Actions>
          </Card>

        )}
      />
      <FAB
        icon="plus"
        label="Make Request"
        style={styles.fab}
        onPress={handleCretae}
      />

      <HamburgerDrawer
        visible={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      />

      <RequestModal
        visible={modalVisible}
        onDismiss={handleDismiss}
        editingItem={editingItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5" },
  list: { padding: 16, gap: 12 },
  card: { borderRadius: 10 },
  cardDesc: { color: "#666", marginTop: 4 },
  empty: { textAlign: "center", marginTop: 60, color: "#999" },
  fab: { position: "absolute", right: 16, bottom: 24 },
});
