define(['jquery', 'react', 'routes', 'jsx!components/spinner', 'utils', 'jquery-validation', 'jquery-validation-addons'], function ($, React, Routes, Spinner, Utils) {
  var Component = React.createClass({
    mixins: [React.addons.LinkedStateMixin],

    getInitialState: function() {
      return { 
        username: '', 
        email: '', 
        password: '',
        busy: false,
        error: ''
      };
    },

    componentDidMount: function() {
      if (this.isMounted()) {
        this.refs.username.getDOMNode().focus();
        $(this.refs.form.getDOMNode()).validate({
          rules: {
            username: {
              required: true,
              minlength: 4,
              alphanumeric: true,
              remote: Routes.api.check_username
            },
            email: {
              required: true,
              remote: Routes.api.check_email
            },
            password: {
              required: true,
              minlength: 4
            }
          },
          messages: {
            username:{
              remote: 'This username is already taken.'
            },
            email: {
              remote: 'This email has been registered.'
            }
          },
          errorPlacement: function(error, element) {
            element.parent().siblings('label').remove(); // Clear the last one
            error.insertAfter(element.parent());
          },
          success: function(label, what) {
            var target = label.attr('for');
            if (target == 'username') {
              label.removeClass().addClass('success').text('The username can be used.');  
            } else if (target == 'email') {
              label.removeClass().addClass('success').text('The email can be used.');
            }
          },
          error: function(label, error) {
            label.removeClass('success').addClass('error').text(error);
          }
        });
      }
    },

    disableForm: function (disabled) {
      var $form = $(this.refs.form.getDOMNode());
      var elements = $form.find('input, button');
      if (disabled) {
        elements.attr('disabled', true);  
      } else {
        elements.removeAttr('disabled');
      }
    },

    handleError: function (error) {
      var self = this;
      this.setState({error: error});
      setTimeout(function() {
        self.refs.username.getDOMNode().focus();
      }, 200);
    },

    handleSubmit: function(e) {
      e.preventDefault();
      var $form = $(this.refs.form.getDOMNode());
      if (!$form.valid()) {
        return;
      }
      var self = this;
      this.setState({busy: true});
      this.disableForm(true);
      self.setState({error: ''});
      $.post(Routes.api.register, this.state).success(function (result) {
        if (result.success === true) {
          Utils.redirect(Routes.home);
        } else {
          self.handleError(result.error.message);
        }
      }).error(function (reason) {
        self.handleError(reason);
      }).complete(function () {
        self.disableForm(false);
        self.setState({busy: false});
      });
    },

    render: function() {
      return (
        <div className="uk-vertical-align uk-text-center uk-height-1-1">
          <div className="uk-vertical-align-middle">
            {this.state.busy ? <Spinner /> : null}
            {this.state.error ? <div className="uk-alert uk-alert-danger">{this.state.error}</div> : null}
            <form className="uk-panel uk-panel-box uk-form" onSubmit={this.handleSubmit} ref="form" style={{'width': '250px'}}>
              <div className="uk-form-row">
                <div className="uk-form-icon uk-width-1-1">
                  <i className="uk-icon-user"></i>
                  <input className="uk-width-1-1 uk-form-large" type="text" placeholder="Username" ref="username" name="username" required valueLink={this.linkState('username')}/>
                </div>
              </div>
              <div className="uk-form-row">
                <div className="uk-form-icon uk-width-1-1">
                  <i className="uk-icon-envelope"></i>
                  <input className="uk-width-1-1 uk-form-large" type="email" placeholder="Email" name="email" required valueLink={this.linkState('email')} />
                </div>
              </div>
              <div className="uk-form-row">
                <div className="uk-form-icon uk-width-1-1">
                  <i className="uk-icon-key"></i>
                  <input className="uk-width-1-1 uk-form-large" type="password" placeholder="Password" name="password" required valueLink={this.linkState('password')}/>
                </div>
              </div>
              <div className="uk-form-row">
                <button type="submit" className="uk-width-1-1 uk-button uk-button-primary uk-button-large">Sign Up</button>
              </div>
              <div className="uk-form-row uk-text-small">
                <a className="uk-float-right uk-link uk-link-muted" href={Routes.login}>Log In</a>
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