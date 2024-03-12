import React from "react";
import styled from "styled-components";
import { Droppable } from "react-beautiful-dnd";
import { Task } from "./task";
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import { background } from "@atlaskit/theme/dist/cjs/colors";

const Container = styled.div`
  margin: 8px;
  border: 1px solid lightgrey;
  border-radius: 2px;
  width: 220px;

  display: flex;
  flex-direction: column;
`;

const Title = styled.h3`
  padding: 8px;
  background-color: white;
`;

const TaskList = styled.div`
  padding: 8px;
  transition: background-color 0.2s ease;
  background-color: ${props => (props.isDraggingOver ? "#E5E7E9" : "white")};
  flex-grow: 1;
  min-height: 100px;
`;


export const Column = ({ handleClear, onMouseLeave, onMouseEnter, hoveredTask, taskValues, handleChange, handleClick, showTextarea, handleCancel, column, isDropDisabled, tasks }) => {
  return (
    <Container className={localStorage.getItem('color') == "dark" ? 'darkColumn '+column.name+'' : 'defaultColumn '+column.name+''}>
      <Title>{column.title}</Title>
      <div className="addTaskField">
        <textarea value={taskValues[column.id] || ''} onChange={handleChange(column.id)} className={showTextarea[column.id] ? 'show' : "hide"}/>
        <CloseIcon className={showTextarea[column.id] ? 'show' : "hide"} onClick={() => handleCancel(column)}/>
        {/* <button className={showTextarea[column.id] ? 'show' : "hide"} onClick={() => handleCancel(column)}>Annuler</button> */}

      </div>
        
      <Droppable droppableId={column.id} isDropDisabled={false}>
        {(provided, snapshot) => (
          <TaskList
            ref={provided.innerRef}
            {...provided.droppableProps}
            isDraggingOver={snapshot.isDraggingOver}
          >
            {tasks && tasks.length > 0 && tasks.map((task, index) => (
              <Task  column={column.id} handleClear={handleClear} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} hoveredTask={hoveredTask} key={task.id} task={task} index={index}/>
            ))}
            {provided.placeholder}
            
          </TaskList>
        )}
      </Droppable>

      <button className={showTextarea[column.id] ? 'validTaskButton' : "addTaskButton"} onClick={() => handleClick(column)}>
      {showTextarea[column.id] ? null : <AddIcon/>}{showTextarea[column.id] ? 'Valider' : "Ajouter une tâche"}
      </button>
    </Container>
  );
};
