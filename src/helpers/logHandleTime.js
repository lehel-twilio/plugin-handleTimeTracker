import { taskSelected, taskCompleted } from '../actions/handleTimeTrackerActions';

export const logHandleTime = (payload, store) => {
  const taskSid = payload.sid;
  const state = store.getState();
  const previousTaskSid = state.flex.view.selectedTaskSid;

  //Only execute if a new task is selected, do nothing if the same task is selected again
  if (previousTaskSid !== taskSid) {
    let previousTaskSelectedTime = '';
    if (Object.keys(state.handleTimeTracker.reservations).length > 0) {
      previousTaskSelectedTime = previousTaskSid in state.handleTimeTracker.reservations ? state.handleTimeTracker.reservations[previousTaskSid].selectedTime : 0;
    }

    const previousHandleTime = taskSid in state.handleTimeTracker.reservations ? state.handleTimeTracker.reservations[taskSid].handleTime : 0;

    store.dispatch(taskSelected(taskSid, previousHandleTime, previousTaskSid, previousTaskSelectedTime));
  }
}

export const finishTask = (payload, store) => {
  const taskSid = payload.sid;
  const state = store.getState();

  const currentDate = new Date();
  const previousTaskSelectedTime = new Date(state.handleTimeTracker.reservations[taskSid].selectedTime);
  const timeDifference = currentDate.getTime() - previousTaskSelectedTime.getTime();
  const seconds = Math.abs(timeDifference / 1000);
  const handleTime = state.handleTimeTracker.reservations[taskSid].handleTime + seconds;

  let attributes = payload.task.attributes;
  //add existing handle time in case of a transfer
  if (typeof(attributes.conversations) !== 'undefined') {
    if (typeof(attributes.conversations.conversation_measure_1) !== 'undefined') {
      attributes.conversations.conversation_measure_1 = attributes.conversations.conversation_measure_1 + handleTime;
    }
  } else {
    attributes.conversations = {
      conversation_measure_1: handleTime
    }
  }

  payload.task.setAttributes(attributes);
  store.dispatch(taskCompleted(taskSid));
}
