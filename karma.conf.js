const path = require('path');
const join = path.join;
const babelConfig = {
    plugins: ['transform-react-es6-displayname', 'transform-decorators-legacy', 
    'add-module-exports', 'transform-object-assign', 
    'transform-es3-member-expression-literals', 'transform-es3-property-literals', 'istanbul'].map(p => {
      return require.resolve('babel-plugin-' + p);
    }),
    presets: ['es2015-ie', 'react', 'stage-0'].map(p => {
      return require.resolve('babel-preset-' + p);
    }),
};
function resolveCwd() {
  let args = [].slice.apply(arguments, []);
  args.unshift(process.cwd());
  return join.apply(path, args);
}

const indexSpec = resolveCwd('test/**/*-spec.js');
const files = [
  indexSpec
];
const preprocessors = {};
preprocessors[resolveCwd('test/**/*.js')] = ['webpack', 'sourcemap'];
module.exports = function(config) {
  config.set({
    client: {
      mocha: {
        reporter: 'html',
        ui: 'bdd',
      },
    },
    hostname: 'localhost',
    browserNoActivityTimeout: 300000,
    browsers: ['Chrome'],
    frameworks: ['mocha', 'sinon'],
    reporters: ['progress', 'coverage'],
    coverageReporter: {
      dir: resolveCwd('test/coverage'),
      reporters: [
        { type: 'html' }
      ]
    },
    files,
    preprocessors,
    plugins: [
      'karma-chrome-launcher',
      'karma-webdriver-launcher',
      'karma-mocha',
      'karma-sourcemap-loader',
      'karma-webpack',
      'karma-coverage',
      'karma-sinon'
    ],
    webpack: {
      resolveLoader: {
        root: path.join(__dirname, 'node_modules'),
      },
      devtool: 'inline-source-map',
      resolve: {
        extensions: ['', '.js', '.jsx'],
        modulesDirectories: [join(__dirname, 'node_modules')],
        unsafeCache: true,
        alias: {
          'react-dom/server': 'preact-render-to-string',
          'react-addons-test-utils': 'preact-test-utils',
          'react-addons-transition-group': 'preact-transition-group',
          'react': 'preact-compat-enzyme',
          'react-dom': 'preact-compat-enzyme'
        }
      },
      externals: {
        'react/lib/ExecutionEnvironment': true,
        'react/lib/ReactContext': true,
        'react/addons': true
      },
      module: {
        loaders: [
          {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            loader: 'babel',
            query: babelConfig,
          },{
            test: /\.json$/,
            loader: 'json-loader',
          }
        ]
      }
    },
    webpackServer: {
      noInfo: true
    }
  });
}