# Handle Time Tracker

![HandleTimeTracker](https://zaffre-cow-9057.twil.io/assets/Screen%20Shot%202019-07-08%20at%2011.10.06%20PM.png)

## Summary

This plugin will keep track of how long a task is selected for in the Agent UI. In a multi-tasking scenario where an Agent is working multiple interactions at the same time, this plugin will track the "in focus" time for each task instead of just the task duration. The logging stops as soon as the task enters the Wrapup state. The handle time value is attached to the task as an attribute named conversation_measure_1 and is also saved in Twilio WFO.

## Instructions

### Get the Source Code

- `git clone `
- `npm install`
- `make patch`

### Setup Environment Variables

- `cp public/appConfig.example.js public/appConfig.js`

Edit public/appConfig.js and add your accountSid.

### Build

- `npm run build`

### Deploy Plugin

Go to your [Twilio Assets](https://www.twilio.com/console/runtime/assets/public) and deploy the plugin-handleTimeTracker.js file from the /build directory.

### Change log

7/6/2019 - v1.0 - Initial Release
