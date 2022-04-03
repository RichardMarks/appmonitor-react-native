# App Monitor React Native

React Native Companion for AppMonitor.

AppMonitor is a development tool for recording logs from React Native apps without all the noise.

To use, add the `appmonitor-react-native` package to your React Native project as a dependency,
import the `AppMonitor` module, call the `config` function to setup the AppMonitor configuration, and then call the `sendEvent` function to send your event data to the AppMonitor.

Launch the App Monitor tool, enter the port you configured for your project, and press the Start Server button.

Any events captured from the app will be displayed in the App Monitor tool window. From here you can export the events as JSON, CSV, and Plain Text.

### Example

```typescript
AppMonitor.config({ port: 7000, host: "http://localhost", debug: true });

AppMonitor.sendEvent({
  name: "A name to filter events in the UI",
  message: "A message to display in the UI",
  anythingElseYouWantAsLongAsItIsJSON: {
    nestedValuesAreOK: true,
  },
});
```
