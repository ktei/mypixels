define(['jquery', 'react', 'routes', 'jquery-validation'], function ($, React, Routes) {
  var Component = React.createClass({
    getInitialState: function() {
      return {};
    },
    componentDidMount: function() {
      if (this.isMounted()) {
        this.refs.username.getDOMNode().focus();
        $('.uk-alert').show();
        $(this.refs.form.getDOMNode()).validate({
          errorPlacement: function(error, element) {
            element.parent().siblings('label').remove(); // Clear the last one
            error.insertAfter(element.parent());
          }
        });
      }
    },
    componentWillUnmount: function() {

    },
    render: function() {
      return (
        <form className="uk-panel uk-panel-box uk-form" style={{'width': '250px'}} ref="form" method="POST">
          <div className="uk-form-row">
            <div className="uk-form-icon uk-width-1-1">
              <i className="uk-icon-user"></i>
              <input className="uk-width-1-1 uk-form-large" type="text" placeholder="Username" ref="username" name="username" required/>
            </div>
          </div>
          <div className="uk-form-row">
            <div className="uk-form-icon uk-width-1-1">
              <i className="uk-icon-key"></i>
              <input className="uk-width-1-1 uk-form-large" type="password" placeholder="Password" name="password" required/>
            </div>
          </div>
          <div className="uk-form-row">
            <button type="submit" className="uk-width-1-1 uk-button uk-button-primary uk-button-large" href="#">Log In</button>
          </div>
          <div className="uk-form-row uk-text-small">
            <label className="uk-float-left">No account yet?</label>
            <a className="uk-float-right uk-link uk-link-muted" href={Routes.register}>Sign Up</a>
          </div>
        </form>
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