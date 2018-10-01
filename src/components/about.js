import React, { Component } from 'react';

class About extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            page: []
        };
    }

    componentDidMount() {
        fetch(
            'http://localhost/wordpress/wp-json/wp/v2/pages/48'
            ).then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        page: result
                    });
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
        const { error, isLoaded, page} = this.state;
        console.log(this.state)
        
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded){
            return <div>Loading...</div>
        } else {
            return (
                <div className="row">
                    <div>
                        <h1 key={1}>
                            {page.title.rendered}
                        </h1>
                        <div key={2} dangerouslySetInnerHTML={{__html: page.content.rendered}}></div>
                    </div>
                </div>
            );
        }
    }
}
export default About;