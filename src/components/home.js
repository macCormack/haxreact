import React, { Component } from "react";
import axios from "axios";

import ArticlePreview from "./articlePreview";

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: []
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
        this.setState({ posts: res.data });
        console.log(res.data);
      })
      .catch(error => console.log(error));
    })
  }

  // mapFilter(filter) {
  //   const mapArray = 
  // }

  
  render() {
    // console.log();
    return (
      <div className="container">
        <div className="row">
          <h1 className="page-title"><span className="title-inner">LATEST NEWS</span></h1>
          <div className="col-12">
            <button onClick={this.filterReset.bind(this)}>All</button>
            <button onClick={this.filterWoW.bind(this)}>WoW</button>
          </div>
          {/* MAC: Map posts and return the article preview output. see articlePreview.js */}
          {this.state.posts.map(post => <ArticlePreview key={post.id} post={post} />)}
        </div>
      </div>
    );
  }
  
  // MAC: Filter out the posts array
    filterWoW(event) { 
      const filterWow = this.state.posts.filter(x => x.categories[0] === 4);
      this.setState({posts: filterWow});
      console.log(filterWow);
    
    }
  // MAC: Where i'm attempting to reset the array
    filterReset(event) { 
      const resetPosts = this.state.posts.filter(x => x.categories[0] === 1 && 4);
      this.setState({posts: resetPosts });
      console.log(resetPosts);
    }
}