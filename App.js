import { Button, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native';
import { addDoc, collection, firestore, query, deleteDoc, doc, ITEMS } from './firebase/Config';
import { useState, useEffect } from 'react';
import { onSnapshot } from 'firebase/firestore';
import { MaterialIcons } from '@expo/vector-icons';

export default function App() {
  const [items, setItems] = useState([])
  const [newItem, setNewItem] = useState('')

  useEffect(() => {
    const q = query(collection(firestore,ITEMS))
    const unsubscribe = onSnapshot(q,(querySnapshot) => {
      const tempItems = []
      querySnapshot.forEach((doc) => {
        console.log(doc.id)
        tempItems.push({...doc.data(),id: doc.id})
      })
      setItems(tempItems)
    })
    return () => {
      unsubscribe()
    }
  }, [])
  

  const save = async () => {
    const docRef = await addDoc(collection(firestore, ITEMS), {
      text: newItem,
    }).catch (error => console.log(error))
    setNewItem('')
  }

  const deleteItem = async (id) => {
    const docRef = doc(firestore, ITEMS, id);
    await deleteDoc(docRef).catch((error) => console.log(error));
  };


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.form}>
        <TextInput
          placeholder="Add item..."
          value={newItem}
          onChangeText={(text) => setNewItem(text)}
        />
        <Button title="Save" onPress={save} />
      </View>
      <ScrollView>
        {items.map((item) => (
          <View key={item.id} style={styles.item}>
            <Text>{item.text}</Text>
            <TouchableOpacity onPress={() => deleteItem(item.id)}>
              <MaterialIcons name="delete" size={24} color="red" />
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    margin: 8,
  },
  form: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 64,
    marginBottom: 16,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 10,
    padding: 10,
    backgroundColor: '#f5f5f5',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
  },
});
