/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = React;

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = ReactDOM;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(1);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _searchkit = __webpack_require__(4);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

//import { extend } from 'lodash';
//import './index.css';

var host = "https://vm-amelastic.clicksoftware.com:9200/sales_portal_index,rfp_index/";

var searchkit = new _searchkit.SearchkitManager(host);

//import BurgerMenu from 'react-burger-menu';
var Menu = __webpack_require__(3).slide;
//var Menu = BurgerMenu.slide;


var customQueryBuilder = function customQueryBuilder(query, options) {

  return {
    "bool": {
      "should": [{
        "query_string": {
          "query": query,

          "fields": ["id", "type", "body", "description__c", "title", "name", "question__c", "answer__c", "answer_Short__c"]
        }
      }]
    }
  };
};

var MovieHitsTable = function (_React$Component) {
  _inherits(MovieHitsTable, _React$Component);

  function MovieHitsTable() {
    _classCallCheck(this, MovieHitsTable);

    return _possibleConstructorReturn(this, (MovieHitsTable.__proto__ || Object.getPrototypeOf(MovieHitsTable)).apply(this, arguments));
  }

  _createClass(MovieHitsTable, [{
    key: 'render',
    value: function render() {
      var hits = this.props.hits;


      var _hits = this.props.hits;

      var count = this.props.hits.filter(function (v) {
        return v._score === 1;
      });

      var isQueryEmpty = false;

      var _wikiSpaceKey = "";

      if (count.length == this.props.hits.length) {

        isQueryEmpty = true;
        document.getElementsByClassName('sk-action-bar-row')[0].style.display = "none";
        document.getElementsByClassName('sk-pagination-navigation')[0].style.display = "none";
      } else {
        document.getElementsByClassName('sk-action-bar-row')[0].style.display = "block";
        document.getElementsByClassName('sk-pagination-navigation')[0].style.display = "block";
      }
      var wikiNumber = "";

      return _react2.default.createElement(
        'div',
        { className: 'divResultList' },
        isQueryEmpty ? _react2.default.createElement(
          'span',
          null,
          '  '
        ) : _react2.default.createElement(
          'span',
          null,
          this.props.hits.map(function (hit, i) {

            var _isAttach = false;
            var _isCase = false;
            var _downloads = false;

            var _caseId = "https://cases.clicksoftware.com/casesview/case?id=";

            var _attachUrl = "https://cksw.my.salesforce.com/";
            var _desc = "";

            if (hit._source.caseNumber && hit._source.type == 'case') {

              wikiNumber = hit._source.caseNumber;
              _caseId = _caseId + hit._id;
              _isCase = true;
            } else if (hit._source.caseNumber && hit._source.type == 'case_attachments') {

              wikiNumber = hit._source.caseNumber;
              _caseId = _caseId + hit._source.parentId;
              _isAttach = true;
              _attachUrl = "https://cksw.my.salesforce.com/" + hit._id;
            } else if (hit._source.type == 'downloads') {

              _downloads = true;
              wikiNumber = "";
            } else {

              wikiNumber = hit._id;
            }

            if (hit._source.wikiSpaceKey && (hit._source.wikiSpaceKey == 'PUBC9D' || hit._source.wikiSpaceKey == 'PUBSSUD')) {

              _desc = "(SE Documentation)";
            } else if (hit._source.caseNumber && hit._source.type == 'case_attachments') {

              _desc = "";
            } else if (hit._source.type == 'downloads') {

              _desc = "(Clicksoftware " + hit._source.type + ")";
            } else if (hit._source.type == 'implementation_forum') {

              _desc = "(Implementation forum)";
            } else {
              _desc = "(" + hit._source.type + ") - " + wikiNumber;
            }

            return _react2.default.createElement(
              'div',
              { key: i },
              _react2.default.createElement(
                'span',
                null,
                hit._source.caseNumber && _isAttach ? _react2.default.createElement(
                  'a',
                  { href: hit._source.url, target: '_blank', key: i },
                  _react2.default.createElement(
                    'h3',
                    { key: i },
                    'Attachment in Case:  ',
                    hit._source.caseNumber,
                    _react2.default.createElement('br', null),
                    hit.highlight && hit.highlight.title ? _react2.default.createElement(
                      'span',
                      null,
                      hit.highlight.title.map(function (_highlight, j) {

                        return _react2.default.createElement(
                          'div',
                          { key: j },
                          _react2.default.createElement('span', { key: j, dangerouslySetInnerHTML: { __html: _highlight } })
                        );
                      })
                    ) : _react2.default.createElement(
                      'span',
                      null,
                      hit._source.title
                    )
                  ),
                  '(',
                  hit._source.name,
                  ')',
                  _react2.default.createElement(
                    'span',
                    { className: 'spanTypeResult' },
                    _desc
                  )
                ) : _react2.default.createElement(
                  'a',
                  { href: hit._source.url, target: '_blank', key: i },
                  _react2.default.createElement(
                    'h3',
                    { key: i },
                    hit.highlight && hit.highlight.title ? _react2.default.createElement(
                      'span',
                      null,
                      hit.highlight.title.map(function (_highlight, j) {

                        return _react2.default.createElement(
                          'div',
                          { key: j },
                          _react2.default.createElement('span', { key: j, dangerouslySetInnerHTML: { __html: _highlight } })
                        );
                      })
                    ) : _react2.default.createElement(
                      'span',
                      null,
                      hit._source.title
                    )
                  ),
                  _react2.default.createElement(
                    'span',
                    { className: 'spanTypeResult' },
                    _desc
                  )
                )
              ),
              _react2.default.createElement(
                'div',
                null,
                hit.highlight && hit.highlight.body ? _react2.default.createElement(
                  'span',
                  null,
                  hit.highlight.body.map(function (_highlight, j) {

                    return _react2.default.createElement(
                      'div',
                      { key: j },
                      _react2.default.createElement('span', { key: j, dangerouslySetInnerHTML: { __html: _highlight } })
                    );
                  })
                ) : _react2.default.createElement(
                  'span',
                  null,
                  '   '
                )
              ),
              _react2.default.createElement(
                'div',
                null,
                hit.highlight && hit.highlight['name'] ? _react2.default.createElement(
                  'span',
                  null,
                  hit.highlight['name'].map(function (_highlight1, d) {

                    return _react2.default.createElement(
                      'div',
                      { key: d },
                      _react2.default.createElement('span', { key: d, dangerouslySetInnerHTML: { __html: _highlight1 } })
                    );
                  })
                ) : _react2.default.createElement(
                  'span',
                  null,
                  '   '
                )
              ),
              _react2.default.createElement(
                'div',
                null,
                hit.highlight && hit.highlight['description__c'] ? _react2.default.createElement(
                  'span',
                  null,
                  hit.highlight['description__c'].map(function (_highlight1, d) {

                    return _react2.default.createElement(
                      'div',
                      { key: d },
                      _react2.default.createElement('span', { key: d, dangerouslySetInnerHTML: { __html: _highlight1 } })
                    );
                  })
                ) : _react2.default.createElement('span', null)
              ),
              _react2.default.createElement(
                'div',
                null,
                hit.highlight && hit.highlight['answer_Short__c'] ? _react2.default.createElement(
                  'span',
                  null,
                  hit.highlight['answer_Short__c'].map(function (_highlight1, d) {

                    return _react2.default.createElement(
                      'div',
                      { key: d },
                      _react2.default.createElement('span', { key: d, dangerouslySetInnerHTML: { __html: _highlight1 } })
                    );
                  })
                ) : _react2.default.createElement('span', null)
              ),
              _react2.default.createElement(
                'div',
                null,
                hit.highlight && hit.highlight['question__c'] ? _react2.default.createElement(
                  'span',
                  null,
                  hit.highlight['question__c'].map(function (_highlight1, d) {

                    return _react2.default.createElement(
                      'div',
                      { key: d },
                      _react2.default.createElement('span', { key: d, dangerouslySetInnerHTML: { __html: _highlight1 } })
                    );
                  })
                ) : _react2.default.createElement('span', null)
              ),
              _react2.default.createElement('br', null)
            );
          })
        )
      );
    }
  }]);

  return MovieHitsTable;
}(_react2.default.Component);

var ScrollButton = function (_React$Component2) {
  _inherits(ScrollButton, _React$Component2);

  function ScrollButton() {
    _classCallCheck(this, ScrollButton);

    var _this2 = _possibleConstructorReturn(this, (ScrollButton.__proto__ || Object.getPrototypeOf(ScrollButton)).call(this));

    _this2.state = {
      intervalId: 0
    };
    return _this2;
  }

  _createClass(ScrollButton, [{
    key: 'scrollStep',
    value: function scrollStep() {
      if (window.pageYOffset === 0) {
        clearInterval(this.state.intervalId);
      }
      window.scroll(0, window.pageYOffset - this.props.scrollStepInPx);
    }
  }, {
    key: 'scrollToTop',
    value: function scrollToTop() {
      var intervalId = setInterval(this.scrollStep.bind(this), this.props.delayInMs);
      this.setState({ intervalId: intervalId });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      return _react2.default.createElement('a', { title: 'Back to top', id: 'back-to-top',
        onClick: function onClick() {
          _this3.scrollToTop();
        } });
    }
  }]);

  return ScrollButton;
}(_react2.default.Component);

var ScrollApp = function (_React$Component3) {
  _inherits(ScrollApp, _React$Component3);

  function ScrollApp() {
    _classCallCheck(this, ScrollApp);

    return _possibleConstructorReturn(this, (ScrollApp.__proto__ || Object.getPrototypeOf(ScrollApp)).call(this));
  }

  _createClass(ScrollApp, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(ScrollButton, { scrollStepInPx: '50', delayInMs: '16.66' })
      );
    }
  }]);

  return ScrollApp;
}(_react2.default.Component);
/*
 * Render the ScrollApp component into the div with the id 'app'
 */


_reactDom2.default.render(_react2.default.createElement(ScrollApp, null), document.getElementById('app'));

var App = function (_Component) {
  _inherits(App, _Component);

  function App() {
    _classCallCheck(this, App);

    return _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).apply(this, arguments));
  }

  _createClass(App, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        _searchkit.SearchkitProvider,
        { searchkit: searchkit },
        _react2.default.createElement(
          _searchkit.Layout,
          null,
          _react2.default.createElement(
            _searchkit.TopBar,
            null,
            _react2.default.createElement(_searchkit.SearchBox, {

              placeholder: 'Search here ...',
              autofocus: true, queryBuilder: customQueryBuilder,
              searchOnChange: false,
              prefixQueryFields: ["id", "type", "body", "title", "name", "Name", "description__c", "question__c", "answer__c", "answer_Short__c"]
            })
          ),
          _react2.default.createElement(
            _searchkit.LayoutBody,
            null,
            _react2.default.createElement(
              Menu,
              { left: true, isOpen: false },
              _react2.default.createElement(
                'a',
                { className: 'helpLink', target: '_blank', href: 'https://wiki.clicksoftware.com/display/IWI/Elastic+Search+Syntax+Help' },
                'Help'
              ),
              _react2.default.createElement('br', null),
              _react2.default.createElement(_searchkit.RefinementListFilter, {
                id: 'typeId',
                title: 'Types',
                field: 'type.keyword',
                operator: 'OR',
                size: 10 }),
              _react2.default.createElement(_searchkit.RefinementListFilter, {
                id: 'content_Position_ID',
                title: 'Content Position',
                field: 'content_Position.keyword',
                operator: 'OR',
                size: 10 })
            ),
            _react2.default.createElement(
              _searchkit.LayoutResults,
              null,
              _react2.default.createElement(
                'div',
                { className: 'divLogoClass' },
                _react2.default.createElement('img', { id: 'logo', src: './logo.png' })
              ),
              _react2.default.createElement(
                _searchkit.ActionBar,
                null,
                _react2.default.createElement(
                  _searchkit.ActionBarRow,
                  null,
                  _react2.default.createElement(_searchkit.HitsStats, null)
                ),
                _react2.default.createElement(
                  _searchkit.ActionBarRow,
                  null,
                  _react2.default.createElement(_searchkit.GroupedSelectedFilters, null),
                  _react2.default.createElement(_searchkit.ResetFilters, null)
                )
              ),
              _react2.default.createElement(_searchkit.Pagination, { className: "testClass", showNumbers: true }),
              _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(_searchkit.Hits, { hitsPerPage: 10, highlightFields: ["title", "body", "description__c", "name", "question__c", "answer_Short__c"],
                  sourceFilter: ["title", "name", "url", "body", "id", "type", "description__c", "question__c", "answer__c", "answer_Short__c"],
                  listComponent: MovieHitsTable
                })
              ),
              _react2.default.createElement(_searchkit.Pagination, { className: "testClass", showNumbers: true }),
              _react2.default.createElement(_searchkit.NoHits, null)
            )
          )
        )
      );
    }
  }]);

  return App;
}(_react.Component);

exports.default = App;

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = BurgerMenu;

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = Searchkit;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(1);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _salesSearch = __webpack_require__(2);

var _salesSearch2 = _interopRequireDefault(_salesSearch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//import './index.css';

_reactDom2.default.render(_react2.default.createElement(_salesSearch2.default, null), document.getElementById('root'));

/***/ })
/******/ ]);