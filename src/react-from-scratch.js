class Component {
  componentWillMount() {}
  componentDidMount() {}
  constructor(mountNode, props) {
    this.mountNode = mountNode;
    this.props = props;
    this.state = {};
    this.todoNest = null;
    this.componentWillMount();
    this._render();
    this.componentDidMount();
  }
  setState(state) {
    if(state !== this.state) {
      Object.assign(this.state, state);
      if(this.vDOM) this._render();
    }
  }
  _render() {
    let vDOM = this.render();
    if(vDOM && vDOM !== this.vDOM) {
      if(this.mountNode) {
        this.mountNode.innerHTML = this.mountNode.innerHTML ? this.mountNode.innerHTML.replace(this.vDOM, vDOM) : vDOM;
      }
      this.vDOM = vDOM;
    }
  }
  nest(compClass, props) {
    if(!this.todoNest) {
      this.todoNest = new compClass(null, props);
      setTimeout(() => this.todoNest.mountNode = document.querySelector('todolist'), 1);
      return `<TodoList>${this.todoNest.vDOM}</TodoList>`;
    }
  }
  render() { return null; }
}

class TodoList extends Component {
  componentWillMount() {
    this.setState({ elapsedTime: 0 });
  }
  componentDidMount() {
    setInterval(() => this.setState({ elapsedTime: this.state.elapsedTime + 1 }), 1e3);
  }
  render() {
    function getListItem(item) {
      return `<li data-key="${item}">Item n°${item}</li>`;
    }
    return (
      `<div>
        <h3>Todolist</h3>
        <ul>${this.props.items.map(getListItem).join('')}</ul>
        <p>${this.state.elapsedTime} second${this.state.elapsedTime > 1 ? 's' : ''} elapsed</p>
      </div>`
    );
  }
}

class Form extends Component {
  componentWillMount() {
    this.setState({ items: [0,1,2,3,4,5] });
  }
  render() {
    return (
      `<section>
        <h1>Main section</h1>
        ${this.nest(TodoList, { items: this.state.items })}
      </section>`
    );
  }
}

var render = (compClass, mountNode, props) => new compClass(mountNode, props);

render(Form, document.querySelector('#my-app'));