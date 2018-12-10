import React, { Component } from 'react';
import axios from "axios";

class EditAbout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            title: '',
            content: '',
            id: '',
            aData: [],
            url: 'http://localhost:3000/api/about-pages',
            accessToken: '?access_token=' + localStorage.getItem('accessToken')
        };
    }

    handleChange(evt) {
      this.setState({ [evt.target.name]: evt.target.value });
      console.log(evt.target.value);
    }

    handleSubmit(evt, ID) {
      // evt.preventDefault();
      axios.put(this.state.url + '/' + ID + this.state.accessToken, {
        title: this.state.title,
        content: this.state.content
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    }

    authenticate(){
        return new Promise(resolve => setTimeout(resolve, 100))
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
            }, 100)
          }

          axios.get(this.state.url).then(res => {
            this.setState({
              aData: res.data,
              isLoaded: true,
              title: res.data[0].title,
              content: res.data[0].content,
              id: res.data[0].id
            })
            console.log(this.state.aData[0]);
          })

        })

      }  
      
      render() {
        const { error, isLoaded} = this.state;


        // MAC: Render current raid team for editing or deletion.
        const editAboutForm = 
          <form className="col-12 pad-b-2">
            <div className="input-group mb-3">
              <label className="editLabel">Content
                <textarea name="content" type="text" className="form-control" value={this.state.content} onChange={evt => this.handleChange(evt)} aria-label="content" aria-describedby="content for about page" rows="5"></textarea>
              </label>
            </div>
            <button id="submit" className="btn btn-primary" onClick={evt => this.handleSubmit(evt, this.state.id)}>Submit</button>
          </form>;
        
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded){
            return <div></div>
        } else {
            return [
              <div className="container">
                <div className="row">
                    <h1 className="page-title"><span className="title-inner">Edit About</span></h1>
                      {editAboutForm}
                </div>
              </div>
            ];
        }
    }
}

export default EditAbout;