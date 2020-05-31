import './Home.style.less';

import React, { Component } from 'react';

import { connect } from 'react-redux';
import spinner from "../../assets/images/spinner.svg"

const strings={
  CLEAR:"Clear",
  GO:"Go",
  ENTER_SOME:"Enter some keyword to filter eg : algo",
  NO_RESULT_FOUND: "No Result Found",
  VALID_NAME:"Please enter a valid user name"
}

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      search: "",
      filter: "",
      filterData: [],
      error: "",
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }
  componentDidUpdate(prevProps) {
    if (this.props.data !== prevProps.data) {
      this.setState({
        data: this.props.data,
        filterData: this.props.data,
        error: this.props.error,
      });
    }
  }
  setInput(event) {
    this.setState({
      search: event.target.value,
    });
  }
  clearSearch() {
    this.setState({
      search: "",
    });
    const { dispatch } = this.props;
    dispatch({
      type: "CLEAR_DATA",
    });
  }

  filterRepo(event) {
    const filteredData = this.state.filterData.filter((item) => item.name.toLowerCase().includes(event.target.value.toLowerCase()))
    this.setState({
      data: filteredData,
      filter: event.target.value,
      error: filteredData.length === 0 ? strings.NO_RESULT_FOUND : "",
    });
  }
  
  clearFilter() {
    const filter = this.state.filterData;
    this.setState({
      filter: "",
      data: filter,
    });
  }

  searchRepo() {
     const { dispatch } = this.props;
     if(this.state.search !== ""){
        dispatch({
          type: "GET_DATA",
          data: this.state.search,
        });
     }else{
       this.setState({
         error: strings.VALID_NAME
       });
     }
  }
  highlight(text) {
    const lowerText = text.toLowerCase();
    var index = lowerText.indexOf(this.state.filter.toLowerCase());
    let higlightText = text;
    if (index >= 0 && this.state.filter !== "") {
      higlightText =
        text.substring(0, index) +
        "<span class='highlight'>" +
        text.substring(index, index + text.length) +
        "</span>" +
        text.substring(index + text.length);
    }
    return <div dangerouslySetInnerHTML={{ __html: higlightText }}></div>;
  }

  render() {
    const { dispatch } = this.props;
    return (
      <div className='home_container'>
        {this.props.loading && (
          <img className='spinner' src={spinner} alt='spinner'></img>
        )}
        <div className='input_container'>
          <div className='search_container'>
            <input
              id='input'
              type='text'
              value={this.state.search}
              onChange={(event) => {
                this.setInput(event);
              }}
              placeholder='search'
              className='input_search'
            ></input>
            <button
              className='button'
              onClick={() => {
                this.searchRepo();
              }}
            >
              {strings.GO}
            </button>
            <button
              className='clear_button'
              onClick={() => {
                this.clearSearch();
              }}
            >
              {strings.CLEAR}
            </button>
          </div>
          {/* {this.state.data.length > 0 && ( */}
          <div className='search_container'>
            <input
              id='input'
              type='text'
              value={this.state.filter}
              onChange={(event) => {
                this.filterRepo(event);
              }}
              className='input_search'
              placeholder={strings.ENTER_SOME}
            ></input>
            <button
              className='clear_button'
              onClick={() => {
                this.clearFilter();
              }}
            >
              {strings.CLEAR}
            </button>
          </div>
        </div>
        {this.state.data.length > 0 && (
          <div className='result_container'>
            {this.state.data.map((item, index) => (
              <div className='row' key={index}>
                {this.highlight(item.name)}
              </div>
            ))}
          </div>
        )}
        {this.state.error !== "" && (
          <div className='result_container'>
            <div className='row error'>{this.state.error}</div>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
    return {
      data: state.home.data,
      loading: state.home.loading,
      error: state.home.error,
    };
};
export default connect(mapStateToProps)(Home);
