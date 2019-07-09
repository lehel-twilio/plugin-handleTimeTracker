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
    flex.Actions.addListener('beforeWrapupTask', (payload) => finishTask(payload, manager.store));

    //Add custom redux store
    manager.store.addReducer('handleTimeTracker', handleTimeTrackerReducer);
  }
}
