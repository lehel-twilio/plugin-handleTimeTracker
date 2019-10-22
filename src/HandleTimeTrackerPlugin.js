import { FlexPlugin } from 'flex-plugin';

import { logHandleTime, finishTask } from './helpers/logHandleTime';

import handleTimeTrackerReducer from './reducers/handleTimeTrackerReducer';

const PLUGIN_NAME = 'HandleTimeTrackerPlugin';

export default class HandleTimeTrackerPlugin extends FlexPlugin {
  constructor() {
    super(PLUGIN_NAME);
  }

  /**
   * This code is run when your plugin is being started
   * Use this to modify any UI components or attach to the actions framework
   *
   * @param flex { typeof import('@twilio/flex-ui') }
   * @param manager { import('@twilio/flex-ui').Manager }
   */
  init(flex, manager) {

    //Add Listener for SelectTask
    flex.Actions.addListener('beforeSelectTask', (payload) => logHandleTime(payload, manager.store));

    //Add Listener for Competed Task
    flex.Actions.addListener('afterAcceptTask', (payload) => {
      payload.task._task.on('wrapup', (payload) => calculateHandlTime(payload, manager.store))
    });

    //Write the handle time to the task as an attribute
    flex.Actions.addListener('beforeCompleteTask', (payload) => writeHandleTime(payload, manager.store));

    //Add custom redux store
    manager.store.addReducer('handleTimeTracker', handleTimeTrackerReducer);
  }
}
