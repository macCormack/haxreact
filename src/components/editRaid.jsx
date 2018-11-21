import React, { Component } from 'react';
import axios from "axios";

class Editraid extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            thumbnail: '',
            name:   '',
            class:  '',
            role:   '',
            realm:  '',
            id:     '',
            roster: [],
            url: 'http://localhost:3000/api/raiders',
            accessToken: '?access_token=' + localStorage.getItem('accessToken')
        };
    }

    handleChange(evt) {
      this.setState({ [evt.target.name]: evt.target.value });
      console.log(evt.target.value);
    }

    handleSubmit(evt) {
      axios.post(this.state.url + this.state.accessToken, {
        thumbnail: this.state.thumbnail,
        name: this.state.name,
        class: this.state.class,
        role: this.state.role,
        realm: this.state.realm,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    }

    handleDelete(evt) {
      evt.preventDefault();
      axios.delete(this.state.url + '/' + this.state.id + this.state.accessToken, {
        id: this.state.id
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error){
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

          axios.get(this.state.url + this.state.accessToken).then(res => {
            this.setState({
              roster: res.data,
              isLoaded: true
            })
            console.log(this.state.roster);
          })

        })

      }  
      
      render() {
        const { error, isLoaded} = this.state;


        // MAC: Render current raid team for editing or deletion.
        const raidTeam = this.state.roster.map((r, i) => {
          return (
          <ul key={r.id} className="col-3 pad-b-2">
            <li>
              <img src={`http://render-us.worldofwarcraft.com/character/${r.thumbnail}`} alt={`thumbnail for ${r.name}`}/>
            </li>
            <li>{r.name}</li>
            <li>ID: {r.id}</li>
          </ul>
          );
        })

      //MAC: Create a new raiders form layout
        const createNewRaider =
                <form className="col-12 pad-b-2">
                   <div className="input-group mb-3">
                    <label className="editLabel">Thumbnail
                      <input name="thumbnail" type="text" className="form-control" onChange={evt => this.handleChange(evt)} placeholder='illidan/15/176262927-avatar.jpg' aria-label="Thumbnail" aria-describedby="Thumbnail for raider"></input>
                    </label>
                  </div>
                  <div className="input-group mb-3">
                    <label className="editLabel">Name
                      <input name="name" type="text" className="form-control" onChange={evt => this.handleChange(evt)} placeholder='Arkturo' aria-label="Name" aria-describedby="Name for raider"></input>
                    </label>
                  </div>
                  <div className="input-group mb-3">
                    <label className="editLabel">Class
                      <input name="class" type="text" className="form-control" onChange={evt => this.handleChange(evt)} placeholder='Paladin' aria-label="Class" aria-describedby="Raiders class"></input>
                    </label>
                  </div>
                  <div className="input-group mb-3">
                    <label className="editLabel">Role
                      <input name="role" type="text" className="form-control" onChange={evt => this.handleChange(evt)} placeholder='Tank/Raid Leader' aria-label="Role" aria-describedby="Role in raid "></input>
                    </label>
                  </div>
                  <div className="input-group mb-3">
                    <label className="editLabel">Realm
                      <input name="realm" type="text" className="form-control" onChange={evt => this.handleChange(evt)} placeholder='illidan' aria-label="Realm" aria-describedby="realm the character is on"></input>
                    </label>
                  </div>
                  <button id="submit" className="btn btn-primary" onClick={evt => this.handleSubmit(evt)}>Submit</button>
                </form>;

// MAC: Render form for deletion of raider.
        const deleteRaider = 
          <form className="col-12">
            <label className="editLabel">ID
              <input name="id" type="text" className="form-control" onChange={evt => this.handleChange(evt)} placeholder='5bf345fa365c2260dc8931a0' aria-label="delete raider" aria-describedby="ID for character"></input>
            </label>
            <button id="deleteRaider" className="btn btn-primary" onClick={evt => this.handleDelete(evt)}>Submit</button>
          </form>
        ;
        
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded){
            return <div></div>
        } else {
            return [
              <div className="container">
                <div className="row">
                    <h1 className="page-title"><span className="title-inner">Edit Raid Roster</span></h1>
                    <p>Here we will be able to edit the raid team. You can view each characters values displayed on the raid roster page, the only exception is the realm field. We need the realm field to be able to construct our warcraft logs link when the page is rendered. <b>Please be advised that everything entered is case sensitive</b></p>
                    <div className="row edit-container">
                      <h3 className="col-12">Current Raiders</h3>
                      {raidTeam}
                      <h3 className="col-12">Add New Raider</h3>
                        {createNewRaider}
                      <h3 className="col-12">Delete Raider</h3>
                        {deleteRaider}
                    </div>
                </div>
              </div>
            ];
        }
    }
}

export default Editraid;