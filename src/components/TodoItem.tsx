import {ITodo} from '../types/data';
import deleteIcon from "../images/delete.svg";

interface ITodoItem extends ITodo {
  toggleTodo: (id: number) => void;
  removeTodo: (id: number) => void;
}

const TodoItem: React.FC<ITodoItem> = (props) => {
  const {id, title, complete, toggleTodo, removeTodo} = props;

  return <div className='container__list-item'>
    <input className='container__list-item--checkbox' type='checkbox' checked={complete} onChange={() => toggleTodo(id)}/>
    <span className={`container__list-item--title ${complete ? 'active' : ''}`}>{title}</span>
    <img className='container__list-item--img' onClick={() => removeTodo(id)} src={deleteIcon} alt="DELETE"/>
  </div>
}

export {TodoItem}