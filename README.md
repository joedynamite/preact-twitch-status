# TwitchStatus

TwitchStatus is a small [Preact](https://preactjs.com) component I built to show my live/offline status on my website using the [Twitch Helix API](https://dev.twitch.tv/docs/api/reference).

I know this implementation is less than ideal and will probably hit rate limits pretty quickly, especially with polling on, but it was for fun. If Twitch releases an officially documented webhook or WebSocket event for this I will probably update the component.

I chose Preact because of its small size so that I could include it in a distributable as a self-contained “Renderer” that could be used on static HTML sites. When minified and gzipped the distributable is less than 5kB.

This component includes no styles, it is a very basic HTML component that you should be able to style in your application to fit your visual language.

## Usage

### Using the `Renderer`

If you’re using a static site like I am, you could download the latest release. Then include the minified JavaScript file, and instantiate a `Renderer` on your page.

```html
<!doctype html>
<html>
  <head>
    <title>TwitchStatus Example</title>
  </head>

  <body>
    <div id="twitch-status"></div>

    <script src="/javascripts/twitch-status.min.js"></script>
    <script>
      new TwitchStatus.Renderer('twitch-status', {
        userLogin: 'joedynamitetv',
        clientId: 'my-secret-client-id'
      });
    </script>
  </body>
</html>
```

The `constructor` accepts two arguments, the first is an HTML `id` for the element to render the component inside of. The second is a set of props that get passed to the component, valid props are listed below.

### Using the `Component`

You should be able to import the component directly into another Preact project and use it like you would expect. Valid props are listed below.

```javascript
import { h, Component } from 'preact';
import { Component as TwitchStatus } from 'preact-twitch-status';

class App extends Component {
  render() {
    return (
      <div>
        <TwitchStatus userLogin="joedynamitetv" clientId="my-secret-client-id" />
      </div>
    );
  }
}

export default App;
```

## Prop Types and Default Values

| Name               | Optionality | Type    | Default     |
|--------------------|-------------|---------|-------------|
| `userLogin`        | Required    | String  | None        |
| `clientId`         | Required    | String  | None        |
| `offlineText`      | Optional    | String  | `"Offline"` |
| `offlineClassName` | Optional    | String  | `"offline"` |
| `liveText`         | Optional    | String  | `"Live"`    |
| `liveClassName`    | Optional    | String  | `"live"`    |
| `poll`             | Optional    | Boolean | `false`     |
| `pollInterval`     | Optional    | Number  | `5000`      |
