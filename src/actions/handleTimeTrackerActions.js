export const taskSelected = (taskSid, previousHandleTime, previousTaskSid, previousTaskSelectedTime) => ({
  type: 'TASK_SELECTED',
  taskSid,
  previousHandleTime,
  previousTaskSid,
  previousTaskSelectedTime
})

export const taskCompleted = (taskSid) => ({
  type: 'TASK_COMPLETED',
  taskSid
})
