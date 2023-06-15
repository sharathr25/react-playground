import { Component } from "react";

class ShouldComponentUpdate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: 0,
    };
  }

  shouldComponentUpdate(props, state) {
    if (state.counter === 2) return false; // this will skip render when the counter is 2.
    // We can do something like this for props as well

    return true;
  }

  increment() {
    this.setState({ counter: this.state.counter + 1 });
  }

  render() {
    return (
      <div>
        shouldComponentUpdate
        <button onClick={this.increment.bind(this)}>
          {this.state.counter}
        </button>
      </div>
    );
  }
}

export default ShouldComponentUpdate;
