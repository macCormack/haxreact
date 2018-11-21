import React, { Component } from "react";
import "../styles/blog.css";

export default class ArticlePreview extends Component {

  render() {

    // MAC: if props are found render view
    if (this.props.post) {
    const featIMG  = this.props.post._embedded['wp:featuredmedia'][0].source_url;
    const heroStyle = {
        backgroundImage: 'url('+ (featIMG) + ')'
    };
      return (
            <div id={getCat(this.props.post.categories[0])} className="col-12 col-md-6 pad-b-2">
                <div className="article">
                    <a href={"/post/" + this.props.post.id} >
                    <figure className="article-img"  style={heroStyle}>
                        {/* <span className="float-right">{getCat(this.props.post.categories[0])}</span> */}
                    </figure>
                    <div className="article-info">
                        <small className="article-date">{new Date(this.props.post.date_gmt).toDateString().split(' ').slice(1).join(' ')}</small>
                        <h2 className="" dangerouslySetInnerHTML={{__html: this.props.post.title.rendered}}></h2>
                    </div>
                    </a>
                    {/* <p key={this.props.post.id} dangerouslySetInnerHTML={{__html: this.props.post.excerpt.rendered}}></p> */}
                </div>
            </div>
            
      );
    } else {
      return null;
    }
  }
}

// MAC: Put names to a categories
function getCat(catoID) {
    var catID = "";

    switch(catoID) {
        case 0:
            catID = ''
            break;
        case 1:
            catID = 'Uncategorised'
            break;
        case 2:
            catID = ''
            break;
        case 3:
            catID = ''
            break;
        case 4:
            catID = 'WoW'
            break;
        case 5:
            catID = ''
            break;
        case 6: 
            catID = 'Media'
            break;
        default: 
            catID = null
    }

    return catID;
}