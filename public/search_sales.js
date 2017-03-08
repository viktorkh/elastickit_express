



//const searchkit = new Searchkit.SearchkitManager("http://demo.searchkit.co/api/movies/");
const searchkit = new Searchkit.SearchkitManager("https://vm-amelastic.clicksoftware.com:9200/sales_portal_index,rfp_index/");


const Hits = Searchkit.Hits;
const NoHits = Searchkit.NoHits;
const Pagination = Searchkit.Pagination;
const Layout = Searchkit.Layout;
const TopBar = Searchkit.TopBar;
const SearchBox = Searchkit.SearchBox;
const LayoutBody = Searchkit.LayoutBody;
const SideBar = Searchkit.SideBar;
const HierarchicalMenuFilter = Searchkit.HierarchicalMenuFilter;
const RefinementListFilter = Searchkit.RefinementListFilter;
const LayoutResults = Searchkit.LayoutResults;
const ActionBar = Searchkit.ActionBar;
const HitsStats = Searchkit.HitsStats;
const SelectedFilters = Searchkit.SelectedFilters;
const ResetFilters = Searchkit.ResetFilters;
const SearchkitProvider = Searchkit.SearchkitProvider;
const Searchbox = Searchkit.SearchBox;
const SortingSelector = Searchkit.SortingSelector;
const ActionBarRow = Searchkit.ActionBarRow;
const InputFilter = Searchkit.InputFilter;

const MovieHitsGridItem = Searchkit.MovieHitsGridItem;
const ExampleHitsItem = Searchkit.ExampleHitsItem;

const InitialLoader = Searchkit.InitialLoader;


const PaginationSelect = Searchkit.PaginationSelect;


const CheckboxFilter = Searchkit.CheckboxFilter;
const TermQuery = Searchkit.TermQuery;

const Panel = Searchkit.Panel;
const GroupedSelectedFilters = Searchkit.GroupedSelectedFilters;

const ImmutableQuery = Searchkit.ImmutableQuery;
const QueryString = Searchkit.QueryString;

const customQueryBuilder = (query, options) => {

  return {
    "bool": {
      "should": [
        {
          "query_string": {
            "query": query,


            "fields": ["id", "type", "body",  "description__c", "title","name","question__c","answer__c","answer_Short__c"]
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


debugger

              var _isAttach = false;
              var _isCase = false;
              var _downloads=false;

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
                if ( hit._source.type == 'downloads') {

                  _downloads = true;
                  wikiNumber = "";

                }
                else {

                  wikiNumber = hit._id;

                }


              return <div key={i}>

                <span>
                

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

                 
                </span>

                <div>
                  {hit.highlight && hit.highlight.body ? (

                    <span>
                      {hit.highlight.body.map(function (_highlight, j) {

                        return <div key={j}><span key={j} dangerouslySetInnerHTML={{ __html: _highlight }} /></div>
                      })}

                    </span>)
                    : (<span> </span>)}
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

                  <div>


                  {hit.highlight  && hit.highlight['description__c'] ? (

                     <span>
                      {hit.highlight['description__c'].map(function (_highlight1, d) {

                        return <div key={d}><span key={d} dangerouslySetInnerHTML={{ __html: _highlight1 }} /></div>
                      })}

                    </span>)
                    : (<span>  
                       </span>)}
                </div>
                     <div>


                  {hit.highlight  && hit.highlight['answer_Short__c'] ? (

                     <span>
                      {hit.highlight['answer_Short__c'].map(function (_highlight1, d) {

                        return <div key={d}><span key={d} dangerouslySetInnerHTML={{ __html: _highlight1 }} /></div>
                      })}

                    </span>)
                    : (<span>  
                       </span>)}
                </div>
                     <div>


                  {hit.highlight  && hit.highlight['question__c'] ? (

                     <span>
                      {hit.highlight['question__c'].map(function (_highlight1, d) {

                        return <div key={d}><span key={d} dangerouslySetInnerHTML={{ __html: _highlight1 }} /></div>
                      })}

                    </span>)
                    : (<span>  
                       </span>)}
                </div>
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

const App = () => (

  <SearchkitProvider searchkit={searchkit}>
    <Layout>
      <TopBar>

        <SearchBox

          placeholder="Search here ..."
          autofocus={true} queryBuilder={customQueryBuilder}
          searchOnChange={true}
          prefixQueryFields={["id", "type", "body", "title", "name" ,"Name", "description__c","question__c","answer__c","answer_Short__c"]} />
      </TopBar>
      <LayoutBody>
        <SideBar>
          <a className="helpLink" target="_blank" href="https://wiki.clicksoftware.com/display/IWI/Elastic+Search+Syntax+Help">Help</a>
<br/>
 <RefinementListFilter
            id="typeId"
            title="Types"
            field="type.keyword"
            operator="OR"
            size={10} />

          <RefinementListFilter
            id="content_Position_ID"
            title="Content Position"
            field="content_Position.keyword"
            operator="OR"
            size={10} />


     
        </SideBar>
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

            <Hits hitsPerPage={10} highlightFields={["title", "body", "description__c", "name","question__c","answer_Short__c"]}
              sourceFilter={["title","name", "url", "body", "id", "type","description__c","question__c","answer__c","answer_Short__c"]}
              listComponent={MovieHitsTable}
            />

          </div>

          <NoHits />

        </LayoutResults>
      </LayoutBody>
    </Layout>
  </SearchkitProvider>
)

ReactDOM.render(<App />, document.getElementById('root'))



