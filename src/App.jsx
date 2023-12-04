import { useEffect, useState } from "react";
import { TodoItemMemo as TodoItem } from "./components/TodoItem";
import { Form } from "./components/Form";
import { Box, Container, Divider, Heading, Text } from "@chakra-ui/react";
import { ColorModeSwitcher } from "./components/ColorModeSwitcher";

function App() {
  const [todo, setTodo] = useState([]);

  const checkedList = todo.filter((element) => element.checked);
  const uncheckedList = todo.filter((element) => !element.checked);

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem('todos'));
    if (todos) {
      setTodo(todos);
    }
  }, [])

  const changeHandler = (itemCheck, id) => {
    const updatedTodo = todo.map((element) => {
      if (element.id === id) {
        return { ...element, checked: itemCheck };
      } else {
        return element;
      }
    });

    setTodo(updatedTodo);
    localStorage.setItem('todos', JSON.stringify(updatedTodo));
  };

  const clickRemoveHandler = (id) => {
    const updatedTodo = todo.filter((element) => element.id !== id);
    setTodo(updatedTodo);
    localStorage.setItem('todos', JSON.stringify(updatedTodo));
  };

  const editInput = (id, updatedValue) => {
    const updatedTodo = todo.map((element) => {
      if (element.id === id) {
        return { ...element, value: updatedValue };
      } else {
        return element;
      }
    });

    setTodo(updatedTodo);
    localStorage.setItem('todos', JSON.stringify(updatedTodo));
  };

  return (
    <>
      <Box textAlign="right">
        <ColorModeSwitcher />
      </Box>
      <Container marginTop={["5rem", "10rem"]}>
        <Heading pb="1rem">My ToDo</Heading>
        <Form setTodo={setTodo} />
        {uncheckedList.length ? (
          <>
            {uncheckedList.map((element) => (
              <TodoItem
                key={element.id}
                element={element}
                changeHandler={changeHandler}
                clickRemoveHandler={clickRemoveHandler}
                editInput={editInput}
              />
            ))}
          </>
        ) : (
          <Text pt='1rem' align='center'>Nothing to do!</Text>
        )}
        <Box p='1rem'>
          <Divider />
        </Box>
        <Heading size='md'>{checkedList.length} completed item</Heading>
        <>
          {checkedList.map((element) => (
            <TodoItem
              key={element.id}
              element={element}
              changeHandler={changeHandler}
              clickRemoveHandler={clickRemoveHandler}
              editInput={editInput}
            />
          ))}
        </>
      </Container>
    </>
  );
}

export default App;
