import React, { Component } from "react";
import axios from "axios";
import ArticlePreview from "./articlePreview";
import filterIcon from "../img/filter-icon.png";

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      filteredPosts: [],
      isShowing: false
    };
  }

    // MAC: Fake authentication to give a promise
    authenticate(){
        return new Promise(resolve => setTimeout(resolve, 500))
    }


  componentDidMount() {
    this.authenticate().then(() => {

        const ele = document.getElementById('page-loader')
        if(ele){
          // fade out
          ele.classList.add('hidden')
          setTimeout(() => {
            // remove from DOM
            ele.outerHTML = ''
          }, 500)
        }
    axios
    // MAC: Fetch data 
      .get(
        "http://localhost/staging/wordpress/wp-json/wp/v2/posts/?_embed"
      )
      .then(res => {
        this.setState({ posts: res.data, filteredPosts:[], isShowing: false });
        // console.log(res.data);
      })
      .catch(error => console.log(error));
    })
  }

  
  render() {
    var postsOutput;
    const wowCatMap = this.state.filteredPosts.map(post => <ArticlePreview key={post.id} post={post} />);
    const renderPosts = this.state.posts.map(post => <ArticlePreview key={post.id} post={post} />);

    if (this.state.isShowing === true) {
      postsOutput = wowCatMap
    } else {
      postsOutput = renderPosts
    }
      return ( 
        <div className="container">
          <div className="row position-relative">
            <h1 className="page-title"><span className="title-inner">LATEST NEWS</span></h1>
              <div id="filter-toggle" className="category-filter overlayCat">
                <div className="filter-container">
                  <div role="presentation" title="Categories" className="filter-icon" onClick={this.clickToggle.bind(this)}>
                  <img src={filterIcon} alt="category-filter-icon"></img>
                  </div>
                  <div className="filter-list">
                    <div className="filter-content">
                      <div className="filter-close" onClick={this.clickToggle.bind(this)}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0V0z"/><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/></svg>
                      </div>
                      <h3>Categories</h3>
                      <ul className="filter-buttons">
                        <li className="filter-button" onClick={this.filterReset.bind(this)}>All</li>
                        <li className="filter-button" onClick={this.filterWowCat.bind(this)}>WoW</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            {/* MAC: Map posts and return the article preview output. see articlePreview.js */}
            {postsOutput}
          </div>
        </div> 
        );
  }

  clickToggle() {
    const getId = document.getElementById('filter-toggle');
    getId.classList.toggle('open');
  }
  
  // MAC: Filter out the posts array
    filterWowCat(event) { 
      const filterWow = this.state.posts.filter(x => x.categories[0] === 4);
      this.setState({
        filteredPosts: filterWow,
        isShowing: true
      });
      document.getElementById('filter-toggle').classList.toggle('open');
      // console.log(filterWow);
    }
    // MAC: Resetting the filter function
    filterReset(event) { 
      const resetPosts = this.state.posts;
      this.setState({
        posts: resetPosts,
        isShowing: false
      });
      document.getElementById('filter-toggle').classList.toggle('open');
      // console.log(this.state.posts);
    }
}