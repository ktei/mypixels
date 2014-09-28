define(['react', 'routes'], function (React, Routes) {
  var Component = React.createClass({
    getInitialState: function() {
      return {secondsElapsed: 0};
    },
    componentDidMount: function() {
      this.refs.username.getDOMNode().focus();
    },
    componentWillUnmount: function() {
      
    },
    render: function() {
      return (
        <div className="uk-vertical-align uk-text-center uk-height-1-1">
          <div className="uk-vertical-align-middle">
            <form className="uk-panel uk-panel-box uk-form" style={{'width': '250px'}}>
              <div className="uk-form-row">
                <div className="uk-form-icon uk-width-1-1">
                  <i className="uk-icon-user"></i>
                  <input className="uk-width-1-1 uk-form-large" type="text" placeholder="Username" ref="username"/>
                </div>
              </div>
              <div className="uk-form-row">
                <div className="uk-form-icon uk-width-1-1">
                  <i className="uk-icon-key"></i>
                  <input className="uk-width-1-1 uk-form-large" type="password" placeholder="Password"/>
                </div>
              </div>
              <div className="uk-form-row">
                <a className="uk-width-1-1 uk-button uk-button-primary uk-button-large" href="#">Log In</a>
              </div>
              <div className="uk-form-row uk-text-small">
                <label className="uk-float-left">No account yet?</label>
                <a className="uk-float-right uk-link uk-link-muted" href={Routes.register}>Sign Up</a>
              </div>
            </form>
          </div>
        </div>
      );
    }
  });
  return {
    mount: function (el) {
      React.renderComponent(<Component />, el);
    },
    component: Component
  };
});