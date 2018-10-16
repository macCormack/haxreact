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

        fetch(
            'http://localhost/staging/wordpress/wp-json/wp/v2/pages/9'
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
        })
 
    }

    render() {
        const { error, isLoaded, page} = this.state;
        console.log(this.state)
        
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded){
            return <div></div>
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