require.config({
  baseUrl: '/',
  paths: {
    'jquery': 'bower_components/jquery/dist/jquery.min',
    'uikit': 'bower_components/uikit/dist/js/uikit.min',
    'react': 'bower_components/react/react',
    'JSXTransformer': 'public/javascripts/vendor/JSXTransformer-0.11.1',
    'jsx': 'public/javascripts/vendor/jsx',
    'text': 'public/javascripts/vendor/text',
    'components/timer': 'public/javascripts/components/timer',
    'components/login': 'public/javascripts/components/login'
  },
  jsx: {
    fileExtension: '.jsx',
    harmony: true
  },
  shim: {
    'uikit': ['jquery']
  }
});

require(['jquery', 'uikit', 'jsx!components/timer'], function($, uikit, timer) {
  
});