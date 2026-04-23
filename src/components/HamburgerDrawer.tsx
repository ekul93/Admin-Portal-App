import { Modal, Pressable, StyleSheet, View } from "react-native";
import { Button, Divider, Drawer, Text } from "react-native-paper";
import { useAuth } from "../context/AuthContext";

type Props = {
  visible: boolean;
  onClose: () => void;
};

export default function HamburgerDrawer({ visible, onClose }: Props) {
  const { logout, user } = useAuth();

  if (!visible) return null;

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.drawer}>
          <Text variant="titleMedium" style={styles.drawerTitle}>
            Menu
          </Text>
          <Text variant="bodySmall" style={styles.drawerUser}>
            Signed in as {user?.username}
          </Text>

          <Divider style={styles.divider} />

          <Drawer.Item label="Home" icon="home" onPress={onClose} />
          <Drawer.Item label="Profile" icon="account" onPress={onClose} />

          <Divider style={styles.divider} />

          <Button
            mode="contained-tonal"
            icon="logout"
            onPress={async () => {
              onClose();
              await logout();
            }}
            style={styles.logoutBtn}
          >
            Logout
          </Button>
        </View>
        <Pressable style={styles.backdrop} onPress={onClose} />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    flexDirection: "row",
    zIndex: 100,
  },
  drawer: {
    width: 270,
    height: '100%',
    backgroundColor: "#fff",
    paddingTop: 60,
    paddingHorizontal: 8,
    paddingBottom: 24,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 4
  },
  backdrop: { flex: 1, backgroundColor: "rgba(0,0,0,0,5)" },
  drawerTitle: { paddingHorizontal: 16, paddingBottom: 2, fontWeight: "bold" },
  drawerUser: { paddingHorizontal: 16, paddingBottom: 8, color: "#888" },
  divider: { marginVertical: 8 },
  logoutBtn: { marginTop: "auto", marginHorizontal: 8 },
});
