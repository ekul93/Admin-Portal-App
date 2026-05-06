import { useEffect, useState } from "react";
import {
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    View,
} from "react-native";
import {
    Button,
    HelperText,
    Modal,
    Portal,
    Text,
    TextInput,
} from "react-native-paper";
import { ListItem, useList } from "../context/ListContext";

type Props = {
  visible: boolean;
  onDismiss: () => void;
  editingItem?: ListItem | null;
};

export default function RequestModal({
  visible,
  onDismiss,
  editingItem,
}: Props) {
  const { createItem, updateItem } = useList();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isEditing = !!editingItem;

  // ── Pre-fill fields when editing ─────────────────────────────────────────
  useEffect(() => {
    if (editingItem) {
      setTitle(editingItem.title);
      setDescription(editingItem.description);
    } else {
      setTitle("");
      setDescription("");
    }
    setError(null);
  }, [editingItem, visible]);

  const handleSubmit = async () => {
    if (!title.trim()) {
      setError("Title is required");
      return;
    }

    setLoading(true);
    try {
      if (isEditing && editingItem) {
        await updateItem(editingItem.id, title, description);
      } else {
        await createItem(title, description);
      }
      handleDismiss();
    } catch (e) {
      setError("Failed to save item. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDismiss = () => {
    setTitle("");
    setDescription("");
    setError(null);
    setLoading(false);
    onDismiss();
  };

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={handleDismiss}
        dismissable={true}
        contentContainerStyle={styles.modalWrapper}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.OS === "ios" ? 40 : 0}
        >
          <ScrollView
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.modal}>
              <Text variant="titleLarge" style={styles.title}>
                {isEditing ? "Edit Request" : "New Request"}
              </Text>

              <TextInput
                label="Title"
                mode="outlined"
                value={title}
                onChangeText={(text) => {
                  setTitle(text);
                  setError(null);
                }}
                autoCapitalize="words"
                style={styles.input}
              />

              <TextInput
                label="Description"
                mode="outlined"
                value={description}
                onChangeText={setDescription}
                multiline
                numberOfLines={3}
                autoCapitalize="words"
                style={styles.input}
              />

              <HelperText type="error" visible={!!error}>
                {error}
              </HelperText>

              <View style={styles.actions}>
                <Button
                  mode="outlined"
                  onPress={handleDismiss}
                  style={styles.actionBtn}
                  disabled={loading}
                >
                  Cancel
                </Button>
                <Button
                  mode="contained"
                  onPress={handleSubmit}
                  style={styles.actionBtn}
                  loading={loading}
                  disabled={loading || !title.trim()}
                >
                  {isEditing ? "Save" : "Create"}
                </Button>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </Modal>
    </Portal>
  );
}

const styles = StyleSheet.create({
  modalWrapper: { marginHorizontal: 24 },
  modal: { backgroundColor: "#fff", borderRadius: 12, margin: 24, padding: 24 },
  title: { fontWeight: "bold", marginBottom: 16 },
  input: { marginTop: 12 },
  actions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 8,
    gap: 8,
  },
  actionBtn: { minWidth: 90 },
});
