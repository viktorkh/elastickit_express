"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var searchkit = new Searchkit.SearchkitManager("http://vm-amelastic.clicksoftware.com:9200/ent_index/");

var Hits = Searchkit.Hits;
var NoHits = Searchkit.NoHits;
var Pagination = Searchkit.Pagination;
var Layout = Searchkit.Layout;
var TopBar = Searchkit.TopBar;
var SearchBox = Searchkit.SearchBox;
var LayoutBody = Searchkit.LayoutBody;
var SideBar = Searchkit.SideBar;
var HierarchicalMenuFilter = Searchkit.HierarchicalMenuFilter;
var RefinementListFilter = Searchkit.RefinementListFilter;
var LayoutResults = Searchkit.LayoutResults;
var ActionBar = Searchkit.ActionBar;
var HitsStats = Searchkit.HitsStats;
var SelectedFilters = Searchkit.SelectedFilters;
var ResetFilters = Searchkit.ResetFilters;
var SearchkitProvider = Searchkit.SearchkitProvider;
var Searchbox = Searchkit.SearchBox;
var SortingSelector = Searchkit.SortingSelector;
var ActionBarRow = Searchkit.ActionBarRow;
var InputFilter = Searchkit.InputFilter;
var MovieHitsGridItem = Searchkit.MovieHitsGridItem;
var ExampleHitsItem = Searchkit.ExampleHitsItem;
var InitialLoader = Searchkit.InitialLoader;
var PaginationSelect = Searchkit.PaginationSelect;

var MovieHitsTable = function (_React$Component) {
  _inherits(MovieHitsTable, _React$Component);

  function MovieHitsTable() {
    _classCallCheck(this, MovieHitsTable);

    return _possibleConstructorReturn(this, (MovieHitsTable.__proto__ || Object.getPrototypeOf(MovieHitsTable)).apply(this, arguments));
  }

  _createClass(MovieHitsTable, [{
    key: "render",
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

      return React.createElement(
        "div",
        { className: "divResultList" },
        isQueryEmpty ? React.createElement(
          "span",
          null,
          "  "
        ) : React.createElement(
          "span",
          null,
          this.props.hits.map(function (hit, i) {

            if (hit._source.caseNumber) {

              wikiNumber = hit._source.caseNumber;
            } else {

              wikiNumber = hit._id;
            }

            var _desc = "";

            if (hit._source.wikiSpaceKey) {

              _desc = "(SE Documentation)";
            } else {
              _desc = "(" + hit._source.type + ") - " + wikiNumber;
            }

            return React.createElement(
              "div",
              { key: i },
              React.createElement(
                "a",
                { href: hit._source.url, target: "_blank", key: i },
                React.createElement(
                  "h3",
                  { key: i },
                  hit._source.title
                ),
                React.createElement(
                  "span",
                  { className: "spanTypeResult" },
                  _desc
                )
              ),
              React.createElement(
                "div",
                null,
                hit.highlight && hit.highlight.body ? React.createElement(
                  "span",
                  null,
                  hit.highlight.body.map(function (_highlight, j) {

                    return React.createElement(
                      "div",
                      { key: j },
                      React.createElement("span", { key: j, dangerouslySetInnerHTML: { __html: _highlight } })
                    );
                  })
                ) : React.createElement(
                  "span",
                  null,
                  "   "
                )
              ),
              React.createElement(
                "div",
                null,
                hit.highlight && hit.highlight['comments.body'] ? React.createElement(
                  "span",
                  null,
                  hit.highlight['comments.body'].map(function (_highlight1, d) {

                    return React.createElement(
                      "div",
                      { key: d },
                      React.createElement("span", { key: d, dangerouslySetInnerHTML: { __html: _highlight1 } })
                    );
                  })
                ) : React.createElement(
                  "span",
                  null,
                  "   "
                )
              ),
              React.createElement("br", null)
            );
          })
        )
      );
    }
  }]);

  return MovieHitsTable;
}(React.Component);

var App = function App() {
  return React.createElement(
    SearchkitProvider,
    { searchkit: searchkit },
    React.createElement(
      Layout,
      null,
      React.createElement(
        TopBar,
        null,
        React.createElement(SearchBox, {
          autofocus: true,
          searchOnChange: true,
          prefixQueryFields: ["id^1", "type^2", "body", "title^10", "comments", "wikiId", "comments.commentId^1", "casenumber^1", "comments.body^10", "wikiTags.product^10"] })
      ),
      React.createElement(
        LayoutBody,
        null,
        React.createElement(
          SideBar,
          null,
          React.createElement(RefinementListFilter, {
            id: "typeId",
            title: "Types",
            field: "type",

            size: 10 }),
          React.createElement(RefinementListFilter, {
            field: "wikiTags.product",
            title: "Product",
            operator: "AND",
            size: 5,
            id: "productTagsId" }),
          React.createElement(RefinementListFilter, {
            field: "wikiTags.version",
            title: "Version",
            operator: "AND",
            size: 5,
            id: "versionTagsId" }),
          React.createElement(RefinementListFilter, {
            field: "wikiTags.hub",
            title: "Hub",
            operator: "AND",
            size: 5,
            id: "hubTagsId" }),
          React.createElement(InputFilter, {
            id: "Id_unique_search",
            title: "ID Search ",
            placeholder: "Search by ID",
            searchOnChange: true,
            prefixQueryFields: ["wikiId^1", "id", "caseNumber"],
            queryFields: ["wikiId", "id", "caseNumber"] })
        ),
        React.createElement(
          LayoutResults,
          null,
          React.createElement(
            "div",
            { className: "divLogoClass" },
            React.createElement("img", { id: "logo", src: "logo.png" })
          ),
          React.createElement(
            ActionBar,
            null,
            React.createElement(
              ActionBarRow,
              null,
              React.createElement(HitsStats, null)
            ),
            React.createElement(
              ActionBarRow,
              null,
              React.createElement(SelectedFilters, null),
              React.createElement(ResetFilters, null)
            )
          ),
          React.createElement(Pagination, { className: "testClass", showNumbers: true }),
          React.createElement(
            "div",
            null,
            React.createElement(Hits, { hitsPerPage: 10, highlightFields: ["title", "body", "comments.body"],
              sourceFilter: ["title", "url", "comments.body", "comments", "id", "wikiSpaceKey", "wikiSpace", "comments.commentId", "type", "casenumber", "caseNumber"],

              listComponent: MovieHitsTable
            })
          ),
          React.createElement(NoHits, null)
        )
      )
    )
  );
};

ReactDOM.render(React.createElement(App, null), document.getElementById('root'));