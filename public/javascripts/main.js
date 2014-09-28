require.config({
  baseUrl: '/',
  paths: {
    'jquery': 'bower_components/jquery/dist/jquery.min',
    'jquery-validation': 'bower_components/jquery-validation/dist/jquery.validate.min',
    'uikit': 'bower_components/uikit/dist/js/uikit.min',
    'react': 'bower_components/react/react-with-addons',
    'JSXTransformer': 'public/javascripts/vendor/JSXTransformer-0.11.1',
    'jsx': 'public/javascripts/vendor/jsx',
    'text': 'public/javascripts/vendor/text',
    'utils': 'public/javascripts/common/utils',
    'routes': 'public/javascripts/common/routes',
    'jquery-validation-addons': 'public/javascripts/common/jquery-validation-addons',
    'components/spinner': 'public/javascripts/components/spinner',
    'components/timer': 'public/javascripts/components/timer',
    'components/login': 'public/javascripts/components/login',
    'components/register': 'public/javascripts/components/register'
  },
  jsx: {
    fileExtension: '.jsx',
    harmony: true
  },
  shim: {
    'uikit': ['jquery']
  }
});

require(['jquery', 'uikit'], function($) {
  
});