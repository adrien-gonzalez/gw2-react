const initialData = {
    count: 3,
    newTask: '',
    tasks: {
     
    },
    columns: {
      "column-1": {
        id: "column-1",
        name: "todo",
        title: "À faire",
        taskIds: []
      },
      "column-2": {
        id: "column-2",
        name: "in_progress",
        title: "En cours",
        taskIds: []
      },
      "column-3": {
        id: "column-3",
        name: "done",
        title: "Terminée",
        taskIds: []
      },
      "column-4": {
        id: "column-4",
        name: "other",
        title: "Autre",
        taskIds: []
      }
    },
    // Facilitate reordering of the columns
    columnOrder: ["column-1", "column-2", "column-3", "column-4"]
  };
  
  if(!localStorage.getItem('tasks')){
    localStorage.setItem('tasks', JSON.stringify(initialData));
  }

  export default initialData;
  