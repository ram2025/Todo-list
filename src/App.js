import "./styles.css";
import { useState, useReducer } from "react";

let glCounter = -1;

function TodoReducer(currdata, actionObj) {
  const copyobj = currdata.slice();

  if (actionObj.task === "ADD") {
    // code for add element in todo
    const obj = { id: glCounter++, val: actionObj.val, completed: false };
    copyobj.push(obj);
    return copyobj;
  } else if (actionObj.task === "MARK") {
    for (const el of copyobj) {
      if (actionObj.id === el.id) {
          el.completed = actionObj.completed;
      }
    }
    return copyobj;
  } else if (actionObj.task === "DELETE") {
    const newobj = copyobj.filter((el) => el.id !== actionObj.id);
    return newobj;
  }
  else if(actionObj.task === "UNMARK"){
    for(const el of copyobj){
      if(actionObj.id === el.id){
        el.completed = false ;
      }
    }
    return copyobj ;
  }
}

function TodoInput() {
  const [data, newdata] = useState("");
  const [todo, dispatchFn] = useReducer(TodoReducer, []);
  return (
    <>
      <form
        onSubmit={function (evn) {
          evn.preventDefault();
        }}
      >
        <input
          type="text"
          onChange={function (props) {
            newdata(props.target.value);
          }}
          value={data}
        />
        <button
          type="submit"
          onClick={function () {
            if (data !== "") {
              dispatchFn({ task: "ADD", val: data });
              newdata("");
            }
          }}
        >
          Add
        </button>
      </form>
      <TodoList todo={todo} dispatchFn={dispatchFn} />
    </>
  );
}

function TODO(props) {
  let listelements = props.todo.map(function (el) {
    let txt = el.val;
    let id = el.id;
    let cmltd = el.completed;

    let xyz = "non-task";
    if (txt.startsWith("do")) {
      xyz = "task";
    }
    let task = txt;
    if (cmltd) {
      task = <del>{txt}</del>;
    }

    return (
      <>
        <li className={xyz} key={id}>
          {task}
        </li>
        <button
          onClick={function () {
            props.dispatchFn({
              task: "MARK",
              id: id,
              completed: true
            });
          }}
        >
          Mark
        </button>
        <button
          onClick={function () {
            props.dispatchFn({ task: "UNMARK", id: id });
          }}
        >
          UnMark
        </button>
        <button
          onClick={function () {
            props.dispatchFn({ task: "DELETE", id: id });
          }}
        >
          Delete
        </button>
      </>
    );
  });

  return <ol>{listelements}</ol>;
}

function TodoList(props) {
  return <TODO todo={props.todo} dispatchFn={props.dispatchFn} />;
}

export default function App() {
  return (
    <div className="App">
      <h1>TODO-LIST</h1>
      <TodoInput />
    </div>
  );
}
