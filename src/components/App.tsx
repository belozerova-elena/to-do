import {useState, useEffect, useRef} from 'react';
import {TodoList} from './TodoList';
import {ITodo} from '../types/data';

const App: React.FC = () => {

  const [value, setValue] = useState('');
  const [todos, setTodos] = useState<ITodo[]>([]);

  const addTodo = () => {
    if (value) {
      setTodos([...todos, {
        id: Date.now(),
        title: value,
        complete: false,
      }])
      setValue('')
    }
  }

  const removeTodo = (id: number): void => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  const toggleTodo = (id: number): void => {
    setTodos(todos.map(todo => {
      if (todo.id !== id) return todo;

      return {
        ...todo,
        complete: !todo.complete
      }
    }))
  }

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setValue(e.target.value)
  }

  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === 'Enter') addTodo();
  }

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  }, []);

  return (
    <div className='container'>
      <h1 className='container__title'>To Do</h1>
      <div className='container__form'>
        <input className='container__form-input' placeholder="Write down the task" value={value} onChange={handleChange} onKeyDown={handleKeyDown} ref={inputRef}/>
        <button className='container__form-button' onClick={addTodo}>Add</button>
      </div>
      <TodoList items={todos} removeTodo={removeTodo} toggleTodo={toggleTodo}/>
    </div> 
  );
}

export default App;