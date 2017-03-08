import React, { Component } from 'react';
import ReactDOM from 'react-dom';


import { extend } from 'lodash';
import './index.css';

import {
  SearchkitManager, SearchkitProvider, Searchkit,
  SearchBox, RefinementListFilter, Pagination, Hits,
  HierarchicalMenuFilter, HitsStats, SortingSelector, NoHits,
  ResetFilters, RangeFilter, NumericRefinementListFilter,
  ViewSwitcherHits, ViewSwitcherToggle, DynamicRangeFilter,
  InputFilter, GroupedSelectedFilters, SelectedFilters,
  InitialLoader, PaginationSelect, CheckboxFilter, TermQuery,
  Panel, ImmutableQuery, QueryString, Layout, TopBar, LayoutBody, LayoutResults,
  ActionBar, ActionBarRow, SideBar
} from 'searchkit';



const host = "https://vm-amelastic.clicksoftware.com:9200/ent_index,tfs_index,documentation_v8_3_patch010_index,attach_index,domino_index/";

const searchkit = new SearchkitManager(host);


//import BurgerMenu from 'react-burger-menu';
var Menu = require('react-burger-menu').slide;
//var Menu = BurgerMenu.slide;



const customQueryBuilder = (query, options) => {

  return {
    "bool": {
      "should": [
        {
          "query_string": {
            "query": query,


            "fields": ["id", "body", "replies.records.body", "repro_Steps", "description", "title^2", "wikiId", "casenumber", "comments.body", "wikiTags.product"]
          }
        }

      ]
    }
  }
}
class MovieHitsTable extends React.Component {




  render() {



    const { hits } = this.props;

    const _hits = this.props.hits;

    var count = this.props.hits.filter(function (v) { return v._score === 1 });

    var isQueryEmpty = false;

    var _wikiSpaceKey = "";

    if (count.length == this.props.hits.length) {

      isQueryEmpty = true;
      document.getElementsByClassName('sk-action-bar-row')[0].style.display = "none";
      document.getElementsByClassName('sk-pagination-navigation')[0].style.display = "none";

    }
    else {
      document.getElementsByClassName('sk-action-bar-row')[0].style.display = "block";
      document.getElementsByClassName('sk-pagination-navigation')[0].style.display = "block";

    }
    var wikiNumber = "";



    return (
      <div className="divResultList">


        {isQueryEmpty ? <span>  </span> : (

          <span>

            {this.props.hits.map(function (hit, i) {


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

              } else
                if (hit._source.caseNumber && hit._source.type == 'case_attachments') {

                  wikiNumber = hit._source.caseNumber;
                  _caseId = _caseId + hit._source.parentId;
                  _isAttach = true;
                  _attachUrl = "https://cksw.my.salesforce.com/" + hit._id;

                }
                else
                  if (hit._source.type == 'downloads') {

                    _downloads = true;
                    wikiNumber = "";

                  }
                  else {

                    wikiNumber = hit._id;

                  }




              if (hit._source.wikiSpaceKey && (hit._source.wikiSpaceKey == 'PUBC9D' || hit._source.wikiSpaceKey == 'PUBSSUD')) {

                _desc = "(SE Documentation)";

              } else if (hit._source.caseNumber && hit._source.type == 'case_attachments') {

                _desc = "";
              }
              else if (hit._source.type == 'downloads') {

                _desc = "(Clicksoftware " + hit._source.type + ")";
              }

              else if (hit._source.type == 'implementation_forum') {

                _desc = "(Implementation forum)";
              }

              else {
                _desc = "(" + hit._source.type + ") - " + wikiNumber

              }


              return <div key={i}>

                <span>
                  {hit._source.caseNumber && _isAttach ? (
                    <a href={hit._source.url} target="_blank" key={i}>
                      <h3 key={i}>Attachment in Case:  {hit._source.caseNumber}
                        <br />
                        {hit.highlight && hit.highlight.title ? (

                          <span>
                            {hit.highlight.title.map(function (_highlight, j) {

                              return <div key={j}><span key={j} dangerouslySetInnerHTML={{ __html: _highlight }} /></div>
                            })}

                          </span>)
                          : <span>{hit._source.title}</span>}
                      </h3>
                      ({hit._source.name})
                      <span className="spanTypeResult">{_desc}</span>
                    </a>
                  ) : (

                      <a href={hit._source.url} target="_blank" key={i}>
                        <h3 key={i}>
                          {hit.highlight && hit.highlight.title ? (

                            <span>
                              {hit.highlight.title.map(function (_highlight, j) {

                                return <div key={j}><span key={j} dangerouslySetInnerHTML={{ __html: _highlight }} /></div>
                              })}

                            </span>)
                            : <span>{hit._source.title}</span>}
                        </h3>
                        <span className="spanTypeResult">{_desc}</span>
                      </a>

                    )}
                </span>

                <div>
                  {hit.highlight && hit.highlight.body ? (

                    <span>
                      {hit.highlight.body.map(function (_highlight, j) {

                        return <div key={j}><span key={j} dangerouslySetInnerHTML={{ __html: _highlight }} /></div>
                      })}

                    </span>)
                    : (<span>   </span>)}
                </div>
                <div>
                  {hit.highlight && hit.highlight.repro_Steps ? (

                    <span>
                      {hit.highlight.repro_Steps.map(function (_highlight, j) {

                        return <div key={j}><span key={j} dangerouslySetInnerHTML={{ __html: _highlight }} /></div>
                      })}

                    </span>)
                    : (<span>   </span>)}
                </div>

                <div>


                  {hit.highlight && hit.highlight['comments.body'] ? (

                    <span>
                      {hit.highlight['comments.body'].map(function (_highlight1, d) {

                        return <div key={d}><span key={d} dangerouslySetInnerHTML={{ __html: _highlight1 }} /></div>
                      })}

                    </span>)
                    : (<span>   </span>)}
                </div>
                <div>


                  {hit.highlight && hit.highlight['replies.records.body'] ? (

                    <span>
                      {hit.highlight['replies.records.body'].map(function (_highlight1, d) {

                        return <div key={d}><span key={d} dangerouslySetInnerHTML={{ __html: _highlight1 }} /></div>
                      })}

                    </span>)
                    : (<span>   </span>)}
                </div>
                <div>


                  {hit.highlight && hit.highlight['name'] ? (

                    <span>
                      {hit.highlight['name'].map(function (_highlight1, d) {

                        return <div key={d}><span key={d} dangerouslySetInnerHTML={{ __html: _highlight1 }} /></div>
                      })}

                    </span>)
                    : (<span>   </span>)}
                </div>
                <span>
                  {hit._source.caseNumber && _isCase ? (
                    <div>
                      <span className="span_open_case"><a href={hit._source.url} target="_blank" key={i}>open case</a> </span>
                      <span className="span_open_portal"><a href={_caseId} target="_blank" >open in portal</a> </span>
                    </div>)
                    : (<span>   </span>)}
                </span>
                <span>
                  {hit._source.caseNumber && _isAttach ? (
                    <div>
                      <span className="span_open_case"><a href={hit._source.url} target="_blank" key={i}>open case in sfdc</a> </span>
                      <span className="span_open_portal"><a href={_attachUrl} target="_blank" >open attachment in sfdc</a> </span>
                      <span className="span_open_portal"><a href={_caseId} target="_blank" >open case in portal</a> </span>
                    </div>)
                    : (<span>   </span>)}
                </span>

                <br />
              </div>

                ;
            })}

          </span>
        )}
      </div>
    );
  }
}


class App extends Component {
  render() {
    return (

      <SearchkitProvider searchkit={searchkit}>
        <Layout>
          <TopBar>

            <SearchBox

              placeholder="Search here ..."
              autofocus={true} queryBuilder={customQueryBuilder}
              searchOnChange={false}
              prefixQueryFields={["id^1", "body", "title^2", "repro_Steps", "name", "replies.records.body",
                "repro_steps", "description", "comments", "wikiId", "comments.commentId^1",
                "caseNumber^1", "comments.body"]} />
          </TopBar>

          <LayoutBody>


            <Menu left isOpen={false}  >


              <a className="helpLink" target="_blank" href="https://wiki.clicksoftware.com/display/IWI/Elastic+Search+Syntax+Help">Help</a>
              <br />
              <RefinementListFilter
                id="typeId"
                title="Types"
                field="type"
                operator="OR"
                size={10} />


              <InputFilter
                id="Id_unique_search"
                title="ID Search "
                placeholder="Search by ID"
                searchOnChange={true}
                prefixQueryFields={["wikiId^1", "id", "caseNumber"]}
                queryFields={["wikiId", "id", "caseNumber"]} />





              <RefinementListFilter
                field="tag_product_not_an"
                title="Product"
                operator="OR"
                size={5}
                id="productTagsId" />


              <RefinementListFilter
                field="tag_hub_not_an"
                title="Hub"
                operator="OR"
                size={5}
                id="hubTagsId" />


              <RefinementListFilter
                field="tag_version_not_an"
                title="Version"
                operator="OR"
                size={5}
                id="versionTagsId" />



              <Panel title="TFS refinement" collapsable={true} defaultCollapsed={true}>
                <HierarchicalMenuFilter size={999}
                  fields={["product_not_an", "area_path_not_an", "state_not_an"]} title=" " id="area_Path_id"
                />
              </Panel>
            </Menu>
            <LayoutResults>

              <div className="divLogoClass"><img id="logo" src="logo.png" /></div>
              <ActionBar>

                <ActionBarRow>

                  <HitsStats />
                </ActionBarRow>

                <ActionBarRow>
                  <GroupedSelectedFilters />
                  <ResetFilters />
                </ActionBarRow>

              </ActionBar>

              <Pagination className={"testClass"} showNumbers={true} />

              <div>

                <Hits hitsPerPage={10} highlightFields={["title", "body", "repro_Steps", "repro_steps", "description", "comments.body", "name", "replies.records.body"]}
                  sourceFilter={["title", "application_name", "name", "extension_type", "url", "comments.body",
                    "comments", "id", "repro_Steps", "repro_steps", "wikiSpaceKey", "parentId", "replies.records.body",
                    "wikiSpace", "comments.commentId", "type", "casenumber", "caseNumber"]}
                  listComponent={MovieHitsTable}
                />

              </div>

              <NoHits />

            </LayoutResults>
          </LayoutBody>
        </Layout>
      </SearchkitProvider>


    );
  }
}

export default App;
