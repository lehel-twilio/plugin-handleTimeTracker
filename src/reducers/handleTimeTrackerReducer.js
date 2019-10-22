import { omit } from 'lodash';

const handleTimeTrackerReducer = (state = {reservations: {}}, action) => {
  switch (action.type) {

    case 'TASK_SELECTED':
      const currentDate = new Date();

      if (action.previousTaskSid === undefined) {
        return Object.assign({}, state, {
          reservations: {
            [action.taskSid]: {
              selectedTime: currentDate,
              active: true,
              handleTime: 0
            }
          }
        });
      } else {
        const previousTaskSelectedTime = new Date(action.previousTaskSelectedTime);
        const timeDifferenceimport { omit } from 'lodash';

        const handleTimeTrackerReducer = (state = {reservations: {}}, action) => {
          switch (action.type) {

            case 'TASK_SELECTED':
              const currentDate = new Date();

              if (action.previousTaskSid === undefined) {
                return Object.assign({}, state, {
                  reservations: {
                    [action.currentTaskSid]: {
                      selectedTime: currentDate,
                      active: true,
                      handleTime: 0
                    }
                  }
                });
              } else {
                const previousTaskSelectedTime = new Date(action.previousTaskSelectedTime);
                const timeDifference = currentDate.getTime() - previousTaskSelectedTime.getTime();
                const seconds = Math.abs(timeDifference / 1000);
                const handleTime = action.previousTaskHandleTime + seconds;

                return Object.assign({}, state, {
                  reservations: {
                    [action.currentTaskSid]: {
                      selectedTime: currentDate,
                      active: true,
                      handleTime: action.currentTaskPreviousHandleTime
                    },
                    [action.previousTaskSid]: {
                      active: false,
                      handleTime: handleTime
                    }
                  }
                });
              }

            case 'TASK_WRAPPING':
              return Object.assign({}, state, {
                reservations: {
                  [action.taskSid]: {
                    active: false,
                    handleTime: action.handleTime
                  }
                }
              })

            case 'TASK_COMPLETED':

              return Object.assign({}, state, {
                reservations: omit(state.reservations, action.taskSid)
              })

            /* falls through */
            default:
              return state
          }
        }

        export default handleTimeTrackerReducer
 = currentDate.getTime() - previousTaskSelectedTime.getTime();
        const seconds = Math.abs(timeDifference / 1000);
        const handleTime = action.previousHandleTime + seconds;

        return Object.assign({}, state, {
          reservations: {
            [action.taskSid]: {
              selectedTime: currentDate,
              active: true,
              handleTime: action.previousHandleTime
            },
            [action.previousTaskSid]: {
              active: false,
              handleTime: handleTime
            }
          }
        });
      }

    case 'TASK_COMPLETED':
      //return Object.assign({}, state, omit(...state, action.taskSid));
      return Object.assign({}, state, {
        reservations: omit(state.reservations, action.taskSid)
      })

    /* falls through */
    default:
      return state
  }
}

export default handleTimeTrackerReducer
