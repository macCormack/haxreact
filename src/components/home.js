import React, { Component } from 'react';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            post: []
        };
    }

    // fake authentication Promise
    authenticate(){
        return new Promise(resolve => setTimeout(resolve, 1000))
    }

    componentDidMount() {
// MAC: Wrap whole fetch function and page-loader hiding in a fake authentication
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
// MAC: Fetch data for output          
        fetch(
            'http://localhost/staging/wordpress/wp-json/wp/v2/posts'
            ).then(res => res.json())
            .then(
                (res) => {
                    this.setState({
                        isLoaded: true,
                        post: res
                    }); console.log(this.state);
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
        
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded){
        // MAC: Need this here or react shit's its fucking face
            return <div></div>
        } else {
            console.log(this.state);
            return (
                <div className="row">
                    {this.state.post.map((i) => 
                    <div key={post.id}>{post.content}</div>
                )}

                </div>
            );
        }
    }
}
export default Home;