export const taskSelected = (currentTaskSid, currentTaskPreviousHandleTime, previousTaskSid, previousTaskSelectedTime, previousTaskHandleTime) => ({
  type: 'TASK_SELECTED',
  currentTaskSid,
  currentTaskPreviousHandleTime,
  previousTaskSid,
  previousTaskSelectedTime,
  previousTaskHandleTime
})

export const taskWrapping = (taskSid, handleTime) => ({
  type: 'TASK_WRAPPING',
  taskSid,
  handleTime
})

export const taskCompleted = (taskSid) => ({
  type: 'TASK_COMPLETED',
  taskSid
})
