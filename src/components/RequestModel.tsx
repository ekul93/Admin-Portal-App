import { useState } from "react";
import { View, StyleSheet } from 'react-native';
import { Modal, Portal, Text, Button, Card, ActivityIndicator } from 'react-native-paper';

type Props = {
    visible: boolean;
    onDismiss: () => void;
};

export default function RequestModal({ visible, onDismiss }: Props) {
    const [loading, setLoading ] = useState(false);
    const [result, setResult ] = useState<string | null>(null);

    const handleRequest = async () => {
        setLoading(true);
        setResult(null);

        try{
            await new Promise(res => setTimeout(res, 1000));
            setResult('Request successful! Replace this with real API call.');
        } catch (e) {
            setResult('Request failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleDismiss = () => {
        setResult(null);
        setLoading(false);
        onDismiss();
    };

    return(
        <Portal>
            <Modal 
                visible={visible}
                onDismiss={handleDismiss}
                dismissable={true}
                contentContainerStyle={styles.modal}
                >
                    <Text variant="titleLarge" style={styles.title}>Make a Request</Text>

                    {loading && <ActivityIndicator animating style={styles.loader} />}

                    {result && (
                        <Card style={styles.resultCard}>
                            <Card.Content>
                                <Text variant="bodySmall">{result}</Text>
                            </Card.Content>
                        </Card>
                    )}

                    <View style={styles.actions}>
                        <Button mode="outlined" onPress={handleDismiss} style={styles.actionBtn}>Cancel</Button>
                        <Button mode="contained" onPress={handleRequest} style={styles.actionBtn} disabled={loading}>Send</Button>
                    </View>
                </Modal>
        </Portal>
    );
}

const styles = StyleSheet.create({
    modal: { backgroundColor: '#fff', borderRadius: 12, margin: 24, padding: 24},
    title: { fontWeight: 'bold', marginBottom: 16},
    loader: { marginVertical: 16 },
    resultCard: { marginTop: 12, backgroundColor: '#f5f5f5'},
    actions: { flexDirection: 'row', justifyContent: 'flex-end', marginTop: 20, gap: 8 },
    actionBtn: {minWidth: 90}
});