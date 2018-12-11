import React, { Component } from 'react';

class About extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            page: [],
            fetchPage: 'http://localhost:3000/api/about-pages'
        };
    }

    authenticate(){
        return new Promise(resolve => setTimeout(resolve, 0))
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
            }, 0)
          }

        fetch(this.state.fetchPage).then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        page: result[0]
                    });
                    // console.log(this.state.page)
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
        // console.log(this.state)

        
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded){
            return <div></div>
        } else {
            // const featImg = page._embedded['wp:featuredmedia'][0].source_url;

            // const heroStyle = {
            //     backgroundImage: 'url('+ featImg +')'
            // };
            return (
                <div>
                    {/* <div className="hero">
                        <div className="bg-img" style={heroStyle}>
                        </div>
                    </div> */}
                    <div className="container">
                        <h1 className="page-title">
                            <span className="title-inner text-uppercase">{page.title}</span>
                        </h1>
                        <div>{page.content}</div>
                    </div>
                </div>
            );
        }
    }
}
export default About;