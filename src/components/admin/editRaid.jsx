import React, { Component } from 'react';
import axios from "axios";
import $ from 'jquery';

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
            warningName: '',
            selected: false,
            selectedId: '',
            roster: [],
            url: 'http://localhost:3000/api/raiders',
            accessToken: '?access_token=' + localStorage.getItem('accessToken')
        };
    }

    editField(clickedId, Thumbnail, Name, Class, Role, Realm) {
      this.setState({
        selected: true,
        selectedId: clickedId,
        thumbnail:   Thumbnail,
        name:   Name,
        class:  Class,
        role:   Role,
        realm:  Realm
      })
      console.log(clickedId);
    }

    handleChange(evt) {
      this.setState({ [evt.target.name]: evt.target.value });
      console.log(evt.target.value);
    }

    submitEdit(evt, id) {
      // evt.preventDefault();
      if (this.state.thumbnail === '') {
        return null;
      } else {
        axios.put(this.state.url + '/' + id + this.state.accessToken, {
          thumbnail: this.state.thumbnail,
          name: this.state.name,
          class: this.state.class,
          role: this.state.role,
          realm: this.state.realm

        })
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
      }
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

    removeEditField() {
      this.setState({
        selected: false,
        selectedId: null
      })
    }

    deleteWarning(evt, currentId, name) {
      this.setState({
        currentId: currentId,
        warningName: name
      })
      $('#exampleModal').modal('show');
    }

    deleteField(evt, currentId) {
      // evt.preventDefault();
      axios.delete(this.state.url + '/' + currentId + this.state.accessToken, {
        id: currentId,
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

      const deleteWarning = 
        <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                Are you really sure you want to delete <span className="font-weight-bold">{this.state.warningName}</span>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal">Nope soz</button>
                <button type="submit" className="btn btn-danger" onClick={evt => this.deleteField(evt, this.state.currentId)}>Yes I do</button>
              </div>
            </div>
          </div>
        </div>;

        // MAC: Render current raid team for editing or deletion.
        const raidTeam = this.state.roster.map((r, i) => {
          if (this.state.selectedId === r.id) {
            return( 
              <form key={i} className="col-4">
                <div className="input-group mb-2">
                    <input name="thumbnail" type="text" className="form-control mb-2" onChange={evt => this.handleChange(evt, r.id)} aria-label="Raiders Name" value={this.state.thumbnail} required></input>
                <div className="input-group mb-3">
                    <input name="name" type="text" className="form-control" onChange={evt => this.handleChange(evt, r.id)} aria-label="Raiders class" value={this.state.name} required></input>
                </div>
                <div className="input-group mb-3">
                    <input name="class" type="text" className="form-control" onChange={evt => this.handleChange(evt, r.id)} aria-label="Raiders class" value={this.state.class} required></input>
                </div>
                <div className="input-group mb-3">
                    <input name="role" type="text" className="form-control" onChange={evt => this.handleChange(evt, r.id)} aria-label="Raiders class" value={this.state.role} required></input>
                </div>
                <div className="input-group mb-3">
                    <input name="realm" type="text" className="form-control" onChange={evt => this.handleChange(evt, r.id)} aria-label="Raiders class" value={this.state.realm} required></input>
                </div>
                  <button type="submit" className="link" onClick={evt => this.submitEdit(evt, r.id)} title="Sumbit">
                    <i className="material-icons">
                      done
                    </i>
                  </button>
                  <div className="link input-group-append" onClick={() => this.removeEditField(r.id)} title="Cancel">
                    <span className="input-group-text">
                        <i className="material-icons">
                          close
                        </i>
                    </span>
                  </div>
                  <div className="link input-group-append" onClick={evt => this.deleteWarning(evt, r.id, r.name)} title="Delete">
                    <span className="input-group-text">
                        <i className="material-icons">
                          delete
                        </i>
                    </span>
                  </div>
                </div>
              </form>
            );
          }
          return (
          <ul key={r.id} className="col-4 pad-b-2 isClickable" onClick={() => this.editField(r.id, r.thumbnail, r.name, r.class, r.role, r.realm)}>
            <li>
              <img src={`http://render-us.worldofwarcraft.com/character/${r.thumbnail}`} alt={`thumbnail for ${r.name}`}/>
            </li>
            <li>{r.name}</li>
            <li>{r.class}</li>
            <li>{r.role}</li>
            <li>{r.realm}</li>
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
        
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded){
            return <div></div>
        } else {
            return [
              <div className="container">
                <div className="row">
                    {deleteWarning}
                    <h1 className="page-title"><span className="title-inner">Edit Raid Roster</span></h1>
                    <p>Here we will be able to edit the raid team. You can view each characters values displayed on the raid roster page, the only exception is the realm field. We need the realm field to be able to construct our warcraft logs link when the page is rendered. <b>Please be advised that everything entered is case sensitive</b></p>
                    <div className="row edit-container">
                      <h3 className="col-12">Current Raiders</h3>
                      {raidTeam}
                      <h3 className="col-12">Add New Raider</h3>
                        {createNewRaider}
                    </div>
                </div>
              </div>
            ];
        }
    }
}

export default Editraid;