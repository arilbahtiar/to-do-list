import React, {useEffect, useState, useCallback} from "react";
import { View, Flatlist, Button, StyleSheet, RefreshControl } from "react-native";
import {collection, getDocs, updateDocs, doc} from '@react-native-firebase/firestore';
import { db } from "../config/firebaseConfig";
import TodoItem from "../componen/TodoItem";

const ViewTodoScreen = ({ navigation }) => {
    const [todos, setTodos] = useState([]);
    const [refreshing, setRefreshing] = useState([]);

    const fetchTodo = useCallback(async() => {
        try{
            const querySnapshot = await getDocs (collection (db, 'todos'));
            const todosData = querySnapshot.docs.map(docSnap => ({
                id: docSnap.id,
                ...docSnap.data(),
            }));
            setTodos (todosData);
        } catch (error) {
            console.error("Error fetching data: ", error);
        }
    }, []);

    useEffect(() => {
        fetchTodo();
    }, [fetchTodo]);

    
    const HandleUpdateStatus = useCallback(async(id, currentStatus) => {
        const newStatus = currentStatus === 'Doing' ? 'Done' : 'Doing';
        try{
            const todoRef = doc(db, 'todos', id);
            await updateDocs (todoRef, {status:newStatus});
            setTodos (prevTodos =>
                prevTodos.map(todo =>
                    todo.id === id? {...todo, status:newStatus} : todo
                )
            );
        } catch (error) {
            console.error("Error update data: ", error);
        }
    }, []);

    
    const onRefresh = useCallback(async() => {
        setRefreshing(true);
        await fetchTodo();
        setRefreshing (false);
    }, [fetchTodo]);

    return (
        <View style={styles.container}>
            <Button
                title="Tambah To-Do Baru"
                onPress={() => navigation.navigate('AddTodo')}
            />
            <Flatlist
                data={todos}
                keyExtractor={({item}) => item.id}
                renderItem={({item}) => (
                    <TodoItem
                        todo={item}
                        onUpdateStatus={() => HandleUpdateStatus(item.id, item.status)}
                    />
                )}
                RefreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>
                }
                ListEmptyComponent={<View style={styles.empty}><Button title="Reload" onPress={fetchTodo}/></View>}
            />
        </View>
    );
};


const styles = StyleSheet.create({
    container: {flex:1, padding: 20, backgroundColor: '#fff'},
    empty: {flex:1, padding:10, justifyContent: 'center', alignItems: 'center', marginTop: 50},
})

export default ViewTodoScreen