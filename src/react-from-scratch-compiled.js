class Component {
  componentWillMount() {}
  componentDidMount() {}
  constructor(props, mountNode) {
    this.mountNode = mountNode;
    this.props = props;
    this.state = {};
    this.componentWillMount();
    this._render();
    this.componentDidMount();
  }
  setState(state) {
    if (state !== this.state) {
      Object.assign(this.state, state);
      this._render();
    }
  }
  _render() {
    let vDOM = this.render();
    if (vDOM && vDOM !== this.vDOM) {
      this.mountNode.innerHTML = vDOM;
      this.vDOM = vDOM;
    }
  }
  render() {
    return null;
  }
}

class TodoList extends Component {
  componentWillMount() {
    this.setState({ items: [0, 1, 2, 3, 4, 5], elapsedTime: 0 });
  }
  componentDidMount() {
    setInterval(() => this.setState({ elapsedTime: this.state.elapsedTime + 1 }), 1e3);
  }
  render() {
    function getListItem(item) {
      return `<li data-key="${ item }">Item n°${ item }</li>`;
    }
    return `<div>
        <h3>Todolist</h3>
        <ul>${ this.state.items.map(getListItem).join('') }</ul>
        <p>${ this.state.elapsedTime } second${ this.state.elapsedTime > 1 ? 's' : '' } elapsed</p>
      </div>`;
  }
}

var render = (compClass, mountNode) => new compClass({}, mountNode);

render(TodoList, document.querySelector('#my-app'));

//# sourceMappingURL=react-from-scratch-compiled.js.map