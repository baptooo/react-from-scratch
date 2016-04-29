'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Component = function () {
  _createClass(Component, [{
    key: 'componentWillMount',
    value: function componentWillMount() {}
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {}
  }]);

  function Component(mountNode, props) {
    _classCallCheck(this, Component);

    this.mountNode = mountNode;
    this.props = props;
    this.state = {};
    this.todoNest = null;
    this.componentWillMount();
    this._render();
    this.componentDidMount();
  }

  _createClass(Component, [{
    key: 'setState',
    value: function setState(state) {
      if (state !== this.state) {
        Object.assign(this.state, state);
        if (this.vDOM) this._render();
      }
    }
  }, {
    key: '_render',
    value: function _render() {
      var vDOM = this.render();
      if (vDOM && vDOM !== this.vDOM) {
        if (this.mountNode) {
          this.mountNode.innerHTML = this.mountNode.innerHTML ? this.mountNode.innerHTML.replace(this.vDOM, vDOM) : vDOM;
        }
        this.vDOM = vDOM;
      }
    }
  }, {
    key: 'nest',
    value: function nest(compClass, props) {
      var _this = this;

      if (!this.todoNest) {
        this.todoNest = new compClass(null, props);
        setTimeout(function () {
          return _this.todoNest.mountNode = document.querySelector('todolist');
        }, 1);
        return '<TodoList>' + this.todoNest.vDOM + '</TodoList>';
      }
    }
  }, {
    key: 'render',
    value: function render() {
      return null;
    }
  }]);

  return Component;
}();

var TodoList = function (_Component) {
  _inherits(TodoList, _Component);

  function TodoList() {
    _classCallCheck(this, TodoList);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(TodoList).apply(this, arguments));
  }

  _createClass(TodoList, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.setState({ elapsedTime: 0 });
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this3 = this;

      setInterval(function () {
        return _this3.setState({ elapsedTime: _this3.state.elapsedTime + 1 });
      }, 1e3);
    }
  }, {
    key: 'render',
    value: function render() {
      function getListItem(item) {
        return '<li data-key="' + item + '">Item n°' + item + '</li>';
      }
      return '<div>\n        <h3>Todolist</h3>\n        <ul>' + this.props.items.map(getListItem).join('') + '</ul>\n        <p>' + this.state.elapsedTime + ' second' + (this.state.elapsedTime > 1 ? 's' : '') + ' elapsed</p>\n      </div>';
    }
  }]);

  return TodoList;
}(Component);

var Form = function (_Component2) {
  _inherits(Form, _Component2);

  function Form() {
    _classCallCheck(this, Form);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Form).apply(this, arguments));
  }

  _createClass(Form, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.setState({ items: [0, 1, 2, 3, 4, 5] });
    }
  }, {
    key: 'render',
    value: function render() {
      return '<section>\n        <h1>Main section</h1>\n        ' + this.nest(TodoList, { items: this.state.items }) + '\n      </section>';
    }
  }]);

  return Form;
}(Component);

var render = function render(compClass, mountNode, props) {
  return new compClass(mountNode, props);
};

render(Form, document.querySelector('#my-app'));

//# sourceMappingURL=react-from-scratch-compiled.js.map