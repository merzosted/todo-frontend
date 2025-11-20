interface Props {
  todo: {
    _id: string;
    title: string;
    completed: boolean;
  };
  onToggle: (id: string, completed: boolean) => void;
  onDelete: (id: string) => void;
}

export default function TodoItem({ todo, onToggle, onDelete }: Props) {
  return (
    <div className="todo-item">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo._id, !todo.completed)}
      />

      <span className={todo.completed ? "completed" : ""}>{todo.title}</span>

      <button className="delete-btn" onClick={() => onDelete(todo._id)}>
        Delete
      </button>
    </div>
  );
}
