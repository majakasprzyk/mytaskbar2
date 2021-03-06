import './boards.css';
import {Navigation} from '../navigation/Navigation';
import {Task} from '../notes/Notes';
import {DndProvider} from 'react-dnd';
import {HTML5Backend} from 'react-dnd-html5-backend';
import {DropPlace} from '../notes/DropPlace';
import {useState, useEffect} from 'react';

export const Boards = () => {
  if (!localStorage.getItem('tasks')) {
    localStorage.setItem(
      'tasks',
      JSON.stringify({
        todo: [{id: 1, text: 'wypić kawę'}],
        inProgress: [
          {
            id: 2,
            text: 'rozważyć zaproszenie kandydatki Mai na rozmowę rektrutacyjną',
          },
        ],
        done: [{id: 3, text: 'zarejstrować się na stronie Task Bar'}],
      })
    );
  }

  const [taskTitle, setTaskTitle] = useState('');

  const [columns, setColumns] = useState({
    todo: JSON.parse(localStorage.getItem('tasks')).todo,
    inProgress: JSON.parse(localStorage.getItem('tasks')).inProgress,
    done: JSON.parse(localStorage.getItem('tasks')).done,
  });

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(columns));
  }, [columns]);

  const addTask = (toList, title) => {
    setColumns((old) => {
      return {
        ...old,
        [toList]: [{id: Date.now(), text: title}, ...old[toList]],
      };
    });
  };

  const updateTask =
    (toList) =>
    ({task, onList}) => {
      console.log(task, onList, toList);

      setColumns((old) => {
        const from = old[onList].filter((item) => item.id !== task.id);
        const to = old[toList].concat(task);

        if (onList === toList) {
          return {
            ...old,
            [toList]: old[toList]
              .filter((item) => item.id !== task.id)
              .concat(task),
          };
        }
        return {
          ...old,
          [onList]: from,
          [toList]: to,
        };
      });
    };
  return (
    <>
      <Navigation />
      <DndProvider backend={HTML5Backend}>
        <div className="workBoards">
          <div className="toDo board">
            <div>
              <h1 className="titleOfBoard">To do</h1>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  addTask('todo', taskTitle);
                  setTaskTitle('');
                }}
              >
                <input
                  type="text"
                  onChange={(e) => setTaskTitle(e.target.value)}
                  value={taskTitle}
                />
              </form>
            </div>

            <DropPlace onDrop={updateTask('todo')}>
              <div>
                {columns.todo.map((task) => (
                  <Task key={task.id} task={task} onList="todo" />
                ))}
              </div>
            </DropPlace>
          </div>
          <div className="inProgress board">
            <h1 className="titleOfBoard">In progress</h1>
            <DropPlace onDrop={updateTask('inProgress')}>
              <div>
                {columns.inProgress.map((task) => (
                  <Task key={task.id} task={task} onList="inProgress" />
                ))}
              </div>
            </DropPlace>
          </div>
          <div className="done board">
            <h1 className="titleOfBoard">Done</h1>
            <DropPlace onDrop={updateTask('done')}>
              <div>
                {columns.done.map((task) => (
                  <Task key={task.id} task={task} onList="done" />
                ))}
              </div>
            </DropPlace>
          </div>
        </div>
      </DndProvider>
    </>
  );
};

export default Boards;
