import React, { Component } from 'react';
import axios from 'axios';

class Media extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            images: [],
            title: 'Media',
            url: 'http://localhost/staging/wordpress/wp-json/wp/v2/media?_embed'
        };
    }

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
            axios.get(this.state.url)
                  .then(res => {
                    const images = res.data;
                    this.setState({ images });
                    // console.log(this.state)
            })
        })
    }

    render() {
        return (
            <div className="container">
                <h1>{this.state.title}</h1>
                <div className="row">
                    { this.state.images.map((img, i) =>
                        <img 
                            id={getCat(img.categories[0])}
                            className="col-12 col-md-6 col-lg-3" key={img.id} 
                            alt={img.title.rendered}
                            src={img.media_details.sizes['medium'].source_url}
                        />
                    )}
                </div>
            </div>
        );
    }
}

function getCat(catoID) {
    var catID = "";

    switch(catoID) {
        case 1:
            catID = 'Uncategorised'
            break;
        case 4:
            catID = 'WoW'
            break;
        case 6: 
            catID = 'Media'
            break;
        default: 
            catID = 'Unknown'
    }

    return catID;
}

export default Media;