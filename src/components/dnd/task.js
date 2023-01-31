import React from "react";
import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";
import DeleteIcon from '@mui/icons-material/Delete';

const Container = styled.div`
  border: 1px solid lightgrey;
  border-radius: 2px;
  padding: 8px;
  margin-bottom: 8px;
  background-color: ${props =>
    props.isDragDisabled
      ? "lightgrey"
      : props.isDragging
      ? "lightgreen"
      : "white"};
  display: flex;
`;

const Handle = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 4px;
  margin-right: 8px;
`;

export const Task = ({ column, handleClear, onMouseEnter, onMouseLeave, hoveredTask, index, task }) => {

  // To disabled draggable task
  // const isDragDisabled = task.id === "task-1";
  const isDragDisabled = false
  return (
    <Draggable
      draggableId={task.id}
      isDragDisabled={isDragDisabled}
      index={index}
      className="dsdsdd"
    >
      {(provided, snapshot) => (
        <Container
          ref={provided.innerRef}
          {...provided.draggableProps}
          isDragging={snapshot.isDragging}
          isDragDisabled={isDragDisabled}
          className="task"
          onMouseEnter={() => onMouseEnter(task.id)} 
          onMouseLeave={() => onMouseLeave(task.id)} 

        >
        <Handle {...provided.dragHandleProps}  />
        <span>{task.content}</span>
        {hoveredTask === task.id ? <div className="deleteTask" onClick={() => handleClear(task.id, column)}><DeleteIcon /></div> :  null}

        </Container>
      )}
    </Draggable>
  );
};
