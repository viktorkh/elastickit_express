



//const searchkit = new Searchkit.SearchkitManager("http://demo.searchkit.co/api/movies/");
const searchkit = new Searchkit.SearchkitManager("http://vm-amelastic.clicksoftware.com:9200/ent_index,tfs_index/");
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


              var _caseId = "https://cases.clicksoftware.com/casesview/case?id=";

              if (hit._source.caseNumber) {

                wikiNumber = hit._source.caseNumber;
                _caseId = _caseId + hit._id;

              }
              else {

                wikiNumber = hit._id;

              }

              var _desc = "";

              if (hit._source.wikiSpaceKey && (hit._source.wikiSpaceKey == 'PUBC9D' || hit._source.wikiSpaceKey == 'PUBSSUD')) {

                _desc = "(SE Documentation)";

              }
              else {
                _desc = "(" + hit._source.type + ") - " + wikiNumber

              }


              return <div key={i}>

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


                  {hit.highlight && hit.highlight['comments.body'] ? (

                    <span>
                      {hit.highlight['comments.body'].map(function (_highlight1, d) {

                        return <div key={d}><span key={d} dangerouslySetInnerHTML={{ __html: _highlight1 }} /></div>
                      })}

                    </span>)
                    : (<span>   </span>)}
                </div>
                <span>
                  {hit._source.caseNumber ? (
                    <div>
                        <span className="span_open_case"><a href={hit._source.url} target="_blank" key={i}>open case</a> </span>
                    <span className="span_open_portal"><a href={_caseId} target="_blank" >open in portal</a> </span>
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

const App = () => (

  <SearchkitProvider searchkit={searchkit}>
    <Layout>
      <TopBar>

        <SearchBox

          placeholder="Search here ..."
          autofocus={true}
          searchOnChange={true}
          prefixQueryFields={["id^1", "type^2", "body", "title^10", "comments", "wikiId", "comments.commentId^1", "casenumber^1", "comments.body^10", "wikiTags.product^10"]} />
      </TopBar>
      <LayoutBody>
        <SideBar>

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
            field="wikiTags.product"
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
            <HierarchicalMenuFilter
              fields={["product_not_an", "area_path_not_an", "state_not_an"]} title=" " id="area_Path_id"
              />
          </Panel>







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

            <Hits hitsPerPage={10} highlightFields={["title", "body", "comments.body"]}
              sourceFilter={["title", "url", "comments.body", "comments", "id", "wikiSpaceKey", "wikiSpace", "comments.commentId", "type", "casenumber", "caseNumber"]}

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
