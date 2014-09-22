define(['react'], function (React) {
  var Login = React.createClass({
    getInitialState: function() {
      return {secondsElapsed: 0};
    },
    tick: function() {
      this.setState({secondsElapsed: this.state.secondsElapsed + 1});
    },
    componentDidMount: function() {
      this.refs.username.getDOMNode().focus();
    },
    componentWillUnmount: function() {
      
    },
    render: function() {
      var divStyle = {
        width: '250px;'
      };
      return (
        <div className="uk-vertical-align uk-text-center uk-height-1-1">
          <div className="uk-vertical-align-middle" style={divStyle}>
            <form className="uk-panel uk-panel-box uk-form">
              <div className="uk-form-row">
                  <input className="uk-width-1-1 uk-form-large" type="text" placeholder="Username" ref="username"/>
              </div>
              <div className="uk-form-row">
                  <input className="uk-width-1-1 uk-form-large" type="text" placeholder="Password"/>
              </div>
              <div className="uk-form-row">
                  <a className="uk-width-1-1 uk-button uk-button-primary uk-button-large" href="#">Login</a>
              </div>
              <div className="uk-form-row uk-text-small">
                  <label className="uk-float-left">No account yet?</label>
                  <a className="uk-float-right uk-link uk-link-muted" href="#">Sign Up</a>
              </div>
            </form>
          </div>
        </div>
      );
    }
  });
  return function (el) {
    React.renderComponent(<Login />, el);
    return Login;
  };
});