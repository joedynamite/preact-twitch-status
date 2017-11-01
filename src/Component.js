import { h, Component } from "preact";

class TwitchStatus extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: []
    };

    this.checkStatus = this.checkStatus.bind(this);
  }

  checkStatus() {
    const { userLogin, clientId } = this.props;
    const url = new URL("https://api.twitch.tv/helix/streams");
    const headers = new Headers();

    url.searchParams.append("user_login", userLogin);
    headers.append("Client-ID", clientId);

    fetch(url, { headers })
      .then(res => res.json())
      .then(res => this.setState(res))
      .catch(console.error);
  }

  componentDidMount() {
    const { userLogin, clientId, poll, pollInterval } = this.props;

    if (userLogin && clientId) {
      this.checkStatus();

      if (poll) {
        this.interval = setInterval(this.checkStatus, pollInterval);
      }
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.state.data.length !== nextState.data.length;
  }

  render() {
    const {
      offlineText,
      offlineClassName,
      liveText,
      liveClassName
    } = this.props;

    const { data } = this.state;

    return data.length > 0 ? (
      <p className={liveClassName}>{liveText}</p>
    ) : (
      <p className={offlineClassName}>{offlineText}</p>
    );
  }
}

Component.defaultProps = {
  offlineText: "Offline",
  offlineClassName: "offline",
  liveText: "Live",
  liveClassName: "live",
  poll: false,
  pollInterval: 5000
};

export default TwitchStatus;
