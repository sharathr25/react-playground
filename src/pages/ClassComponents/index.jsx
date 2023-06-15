import { Component } from "react";
import ShouldComponentUpdate from "./ShouldComponentUpdate";

class ClassComponents extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <ShouldComponentUpdate />
      </div>
    );
  }
}

export default ClassComponents;
