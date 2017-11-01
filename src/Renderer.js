import { h, render } from "preact";
import Component from "./Component";

class Renderer {
  constructor(...props) {
    render(<Component {...props[1]} />, document.getElementById(props[0]));
  }
}

export default Renderer;
