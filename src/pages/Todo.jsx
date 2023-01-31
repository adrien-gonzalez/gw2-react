import '../App.css';
import {connect} from 'react-redux';
import React, { useCallback, useState, useEffect } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import "@atlaskit/css-reset";
import { DragDropContext } from "react-beautiful-dnd";

import initialData from "../components/dnd/initial-data";
import { Column } from "../components/dnd/column";

// import "./styles.css";

const Container = styled.div`
  display: flex;
`;
const Todo = (props) => {
  const [state, setState] = useState(JSON.parse(localStorage.getItem('tasks')));
  const [showTextarea, setShowTextarea] = useState({});
  const [taskValues, setTaskValues] = useState({});
  const [hoveredTask, setHoveredTask] = useState(null);

  // const [state, setState] = useState(initialData);


  const handleDragStart = useCallback( 
    start => {
      document.body.style.color = "orange";
      document.body.style.transition = "background-color 0.2s ease";

      setState({
        ...state,
        homeIndex: state.columnOrder.indexOf(start.source.droppableId)
      });
    },
    [state]
    
  );

  const handleDragUpdate = useCallback(
    update => {
      const opacity = update.destination
        ? update.destination.index / Object.keys(state.tasks).length
        : 0;
    },
    [state]
  );

  const handleDragEnd = useCallback(
    result => {
      document.body.style.color = "inherit";
      document.body.style.backgroundColor = "inherit";
      setState({
        ...state,
        homeIndex: null
      });

      if (!result.destination) {
        return;
      }

      if (
        result.destination.droppableId === result.source.droppableId &&
        result.destination.index === result.source.index
      ) {
        return;
      }

      const start = state.columns[result.source.droppableId];
      const finish = state.columns[result.destination.droppableId];

      if (start === finish) {
        const newTaskIds = Array.from(start.taskIds);
        newTaskIds.splice(result.source.index, 1);
        newTaskIds.splice(result.destination.index, 0, result.draggableId);

        const newColumn = {
          ...start,
          taskIds: newTaskIds
        };

        setState({
          ...state,
          columns: {
            ...state.columns,
            [newColumn.id]: newColumn
          }
        });
        return;
      }

      const startTaskIds = Array.from(start.taskIds);
      startTaskIds.splice(result.source.index, 1);
      const newStart = {
        ...start,
        taskIds: startTaskIds
      };

      const finishTaskIds = Array.from(finish.taskIds);
      finishTaskIds.splice(result.destination.index, 0, result.draggableId);
      const newFinish = {
        ...finish,
        taskIds: finishTaskIds
      };

      setState({
        ...state,
        columns: {
          ...state.columns,
          [newStart.id]: newStart,
          [newFinish.id]: newFinish
        }
      });
    },
    [state]
  );

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(state))
  },[state])

  const handleChange = (columnId) => (e) => {
    setTaskValues({ ...taskValues, [columnId]: e.target.value });
  };

  const handleClick = (columnId) => {

    if (!showTextarea[columnId]) {
      setShowTextarea({ ...showTextarea, [columnId]: true });
    } else {
      if(taskValues[columnId]){
        if(taskValues[columnId].length > 0){
          var tasks = JSON.parse(localStorage.getItem('tasks'))
          const nextTaskId = Object.keys(tasks.tasks).length + 1;
          var newtask = {id: `task-${nextTaskId}`, content: taskValues[columnId]}
          tasks['tasks'][`task-${nextTaskId}`] = newtask;
          tasks['columns'][columnId]['taskIds'].push(`task-${nextTaskId}`)
          setState(tasks)
          setShowTextarea({ ...showTextarea, [columnId]: false });
          setTaskValues({})
        }
      }
    }
   
  };

  const handleCancel = (columnId) => {
    if (showTextarea[columnId]) {
      setShowTextarea({ ...showTextarea, [columnId]: false });
    }
  }

  const handleClear = (taskId, columnId) => {
    setState(prevState => {
      const columns = prevState.columns;
      const column = columns[columnId];
      if (!column) {
        console.error(`Column with ID ${columnId} not found`);
        return prevState;
      }
      
      const tasks = prevState.tasks;
      const task = tasks[taskId];
      if (!task) {
        console.error(`Task with ID ${taskId} not found`);
        return prevState;
      }
    
      const taskIndex = column.taskIds.findIndex(id => id === taskId);
      if (taskIndex === -1) {
        console.error(`Task with ID ${taskId} not found in column with ID ${columnId}`);
        return prevState;
      }
      
      const updatedTaskIds = column.taskIds.filter((id, index) => index !== taskIndex);
      const updatedColumn = { ...column, taskIds: updatedTaskIds };
      const updatedColumns = { ...columns, [columnId]: updatedColumn };
      
      const updatedTasks = Object.keys(tasks).reduce((acc, curr) => {
        if (curr !== taskId) {
          acc[curr] = tasks[curr];
        }
        return acc;
      }, {});
      
      return { ...prevState, columns: updatedColumns, tasks: updatedTasks };
    });

  }


  return (
    <section className="wrapper boardTodo">
      <DragDropContext
            onDragStart={handleDragStart}
            onDragUpdate={handleDragUpdate}
            onDragEnd={handleDragEnd}
          >
            <Container>
              {state.columnOrder.map((columnId, index) => {
                const column = state.columns[columnId];
                const tasks = column.taskIds.map(taskId => state.tasks[taskId]);
                const isDropDisabled = index < state.homeIndex;

                return (
                  <Column
                    handleClick={() => handleClick(columnId)}
                    handleCancel={() => handleCancel(columnId)}
                    handleClear={(taskId, columnId) => handleClear(taskId, columnId)}
                    onMouseEnter={(taskId) => setHoveredTask(taskId)}
                    onMouseLeave={() => setHoveredTask(null)}
                    hoveredTask={hoveredTask}
                    taskValues={taskValues}
                    handleChange={handleChange}
                    showTextarea={showTextarea}
                    key={column.id}
                    column={column}
                    tasks={tasks}
                    isDropDisabled={isDropDisabled}
                  />
                );
                
              })}
              
            </Container>
      </DragDropContext>
    </section>
  );
}



// RECUP DU STORE REDUX
const mapStateToProps = ({ apiKey, appColor }) => ({
    apiKey,
    appColor
  });

// DISPATCH ACTIONS
const mapDispatchToProps = (dispatch) => {
    return {
      dispatch: (action) => { dispatch(action) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Todo);

