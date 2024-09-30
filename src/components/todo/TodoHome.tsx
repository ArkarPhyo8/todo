import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  TouchableOpacity,
  Keyboard,
} from "react-native";
import React, { useReducer, useRef, useState } from "react";
import { st } from "@/src/utils/styles/TodoHomeStyle";
import CheckBox from "expo-checkbox";
import FontAwesome from "@expo/vector-icons/FontAwesome";

interface item {
  id: string;
  text: string;
  completed: boolean;
}

interface State {
  todo: item[];
}

interface AddTodoProps {
  type: "AddTodo";
  payload: { text: string; completed: boolean };
}
interface RemoveTodoProps {
  type: "RemoveTodo";
  payload: string;
}
interface EditTodoProps {
  type: "EditTodo";
  payload: { id: string; text: string };
}

interface CompleteTask {
  type: "CompletedTodo";
  payload: string;
}

type Action = AddTodoProps | RemoveTodoProps | EditTodoProps | CompleteTask;
const initialState = { todo: [] };

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case "AddTodo": {
      return {
        todo: [
          ...state.todo,
          {
            id: Date.now().toString(),
            text: action.payload.text,
            completed: action.payload.completed,
          },
        ],
      };
    }
    case "RemoveTodo": {
      return {
        todo: state.todo.filter((item) => item.id !== action.payload),
      };
    }
    case "EditTodo": {
      return {
        todo: state.todo.map((item) =>
          item.id == action.payload.id
            ? {
                ...item,
                id: action.payload.id,
                text: action.payload.text,
              }
            : item
        ),
      };
    }
    case "CompletedTodo": {
      return {
        todo: state.todo.map((item) =>
          item.id == action.payload
            ? {
                ...item,
                completed: !item.completed,
              }
            : item
        ),
      };
    }
    default: {
      return state;
    }
  }
};

const TodoHome = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [inputValue, setInputValue] = useState("");
  const [editId, setEditId] = useState<string | null>(null);
  const refInput = useRef<TextInput>(null);
  const [isCheckbox, setIsCheckbox] = useState(false);

  //add todo data process with useReducer hook
  const handleAdd = () => {
    if (inputValue) {
      Keyboard.dismiss();
      dispatch({
        type: "AddTodo",
        payload: { text: inputValue, completed: isCheckbox },
      });
      setInputValue("");
    }
  };

  //remove todo data process with useReducer hook
  const handleRemove = (id: string) => {
    dispatch({ type: "RemoveTodo", payload: id });
    Keyboard.dismiss();
    setInputValue("");
    setEditId(null);
  };

  //update todo data process with useReducer hook
  const handleUpdate = (id: string) => {
    Keyboard.dismiss();
    dispatch({
      type: "EditTodo",
      payload: { id, text: inputValue },
    });
    setInputValue("");
    setEditId(null);
  };

  //input box keyboard control process
  const handleInput = () => {
    handleAdd();
    if (editId) {
      handleUpdate(editId);
    }
  };

  //check box  on / off process
  const handleCheckBox = (id: string) => {
    dispatch({ type: "CompletedTodo", payload: id });
    handleAdd();
  };

  return (
    <View style={st.container}>
      <Text style={st.title}>Todo App</Text>
      <View>
        <Text style={st.inputLabel}>Todo</Text>
        <TextInput
          ref={refInput}
          style={st.input}
          value={inputValue}
          onChangeText={setInputValue}
          placeholder="Add todo...."
          onSubmitEditing={handleInput}
        />
        <Text style={st.todoButton}>
          {editId ? (
            <Button
              title="Update"
              color={"teal"}
              onPress={() => handleUpdate(editId)}
            />
          ) : (
            <Button title="add todo" color={"teal"} onPress={handleAdd} />
          )}
        </Text>
        {state.todo.length > 0 ? (
          <FlatList
            data={state.todo}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => {
              return (
                <View style={st.todoCard}>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: "row",
                      gap: 4,
                      alignItems: "center",
                    }}
                  >
                    <CheckBox
                      style={item.completed && { opacity: 0.5 }}
                      value={item.completed}
                      onValueChange={() => handleCheckBox(item.id)}
                    />

                    {item.completed ? (
                      <Text
                        style={{
                          fontWeight: "600",
                          textDecorationLine: "line-through",
                          color: "darkgray",
                        }}
                        onPress={() => handleCheckBox(item.id)}
                      >
                        {item.text}
                      </Text>
                    ) : (
                      <Text
                        style={{ fontWeight: "600" }}
                        onPress={() => handleCheckBox(item.id)}
                      >
                        {item.text}
                      </Text>
                    )}
                  </View>

                  <View>
                    <Text>
                      <TouchableOpacity
                        disabled={item.completed}
                        onPress={() => {
                          setInputValue(item.text);
                          setEditId(item.id);
                          if (refInput.current) {
                            refInput.current.focus();
                          }
                        }}
                      >
                        <Text style={st.todoEditText}>
                          <FontAwesome style={item.completed && {color:"#b4e6e7"}} name="edit" size={20} />
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => handleRemove(item.id)}>
                        <Text style={st.todoRemoveText}>
                          <FontAwesome name="trash" size={20} />
                        </Text>
                      </TouchableOpacity>
                    </Text>
                  </View>
                </View>
              );
            }}
          />
        ) : (
          <Text
            style={{
              opacity: 0.5,
              fontSize: 18,
              fontWeight: "600",
              textAlign: "center",
              marginVertical: 20,
            }}
          >
            No Data!
          </Text>
        )}
      </View>
    </View>
  );
};

export default TodoHome;
