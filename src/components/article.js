import React, { Component } from 'react';

class Article extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            post: [],
            fetchPost: 'http://localhost/staging/wordpress/wp-json/wp/v2/posts/' + this.props.match.params.id + '?_embed'
        };
    }

    authenticate(){
        return new Promise(resolve => setTimeout(resolve, 1000))
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
            }, 1000)
          }

        fetch(this.state.fetchPost).then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        post: result
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
        })
 
    }

    render() {
        const { error, isLoaded, post} = this.state;
        // console.log(this.state)

        
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded){
            return <div></div>
        } else {
            const featImg = post._embedded['wp:featuredmedia'][0].source_url;
            
            return (
                <div>
                    <div className="hero">
                        <div className="hero-height">
                            <img className="hero-img" src={featImg} alt={post._embedded['wp:featuredmedia'][0].slug}></img>
                        </div>
                    </div>
                    <div key={post.id} className="container">
                        <h1
                            dangerouslySetInnerHTML={{__html: post.title.rendered}}>
                        </h1>
                        <div dangerouslySetInnerHTML={{__html: post.content.rendered}}></div>
                    </div>
                </div>
            );
        }
    }
}
export default Article;