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

    componentDidMount() {
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
               
    }

    render() {
        const { error, isLoaded, post} = this.state;
        
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded){
            return <div>Loading...</div>
        } else {
            console.log(this.state);
            return (
                <div className="row">
                    {this.state.post.map((char, i) => 
                    <div>{post.content.rendered}</div>
                )}

                </div>
            );
        }
    }
}
export default Home;