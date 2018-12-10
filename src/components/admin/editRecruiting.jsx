import React, { Component } from 'react';
import axios from "axios";
import dpsIcon from '../../img/dps-icon.png';
import tankIcon from '../../img/tank-icon.png';
import healIcon from '../../img/heal-icon.png';

class EditRecruit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            errorTxt: '',
            success: '',
            isLoaded: false,
            class: '',
            recruiting: '',
            needed: [],
            id: '',
            selected: false,
            selectedId: '',
            recruitData: [],
            url: 'http://localhost:3000/api/recruitings',
            accessToken: '?access_token=' + localStorage.getItem('accessToken')
        };
    }

    formMessages() {
      if(this.state.errorTxt.length > 2 ) {
        return(
          <div className="w-100 alert alert-danger" role="alert">
            {this.state.errorTxt}
          </div>
        );
      }else if(this.state.success.length > 2) {
        return(
          <div className="w-100 alert alert-success" role="alert">
            {this.state.success}
          </div>
        );
      }
        return null;
    }

    editClass(evt, id, Class, Recruiting, role) {
      this.setState({
        selected: true,
        selectedId: id,
        class: Class,
        recruiting: Recruiting,
        needed: role
      })
      console.log(id);
    }

    handleSelectChanges(evt) {
      var select = document.getElementById('needed');
      var selectedList = [];

      for (var i = 0; i < select.options.length; i++) {
          if (select.options[i].selected) {
              selectedList.push(select.options[i].value);
          }
      }

      this.setState({
        needed: selectedList
      })
      // alert(selectedList.join(",") );
      console.log(this.state.needed);
  }

    handleChange(evt) {
      this.setState({ [evt.target.name]: evt.target.value });
      console.log(evt.target.value);
      // console.log(this.state.needDps, this.state.needHeals)
    }

    removeEditField() {
      this.setState({
        selectedBoss: false,
        selectedId: null,
        needed: ''
      })
    }

    submitEdits(evt, id) {
      // evt.preventDefault();

      if (this.state.class && this.state.recruiting && this.state.needed === '') {
        return null;
      } else {
        // evt.preventDefault();
        axios.put(this.state.url + '/' + id + this.state.accessToken, {
          class: this.state.class,
          recruiting: this.state.recruiting,
          needed: this.state.needed
        })
        .then((response) => {
          this.setState({
            success: 'Success data has been submitted'
          })
          console.log(this.state.success);
        })
        .catch((error) => {
          this.setState({
            errorTxt: 'Error we could not submit your info. Make sure you filled out every field'
          })
          console.log(this.state.errorTxt);
        });
      }
    }

    submitForm(evt) {
      // evt.preventDefault();
      axios.post(this.state.url + this.state.accessToken, {
        class: this.state.class,
        recruiting: this.state.recruiting,
        needed: this.state.needed
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
      //Delete the first entry so only one about post is made at a time.
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

    mapChoice() {
      if(this.state.needed.length >= 2) {
       return this.state.needed.map((role, i) => {
          return (
              <span key={i} className="pr-2 font-weight-bold">{role}</span>
          );
        });
      } else {
        // console.log(this.state.needed.length);
        return <span className="font-weight-bold">{this.state.needed}</span>;
      }
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
              recruitData: res.data,
              isLoaded: true
            })
            console.log(this.state.recruitData);
          })

        })

      }
      
      render() {
        const { error, isLoaded} = this.state;

        // MAC: Render current raid team for editing or deletion.
        const renderClasses =  this.state.recruitData.map((rD, i) => {
          if(this.state.selectedId === rD.id) {
            return( 
              <form key={i} className="col-2">
                <div className="input-group mb-2">
                    <input name="class" type="text" className="form-control mb-2" onChange={evt => this.handleChange(evt, rD.id)} aria-label="Raid Boss Name" value={this.state.class} placeholder={rD.class} required></input>
                    <div className="input-group mb-3">
                      <select className="form-control" name="recruiting" value={this.state.recruiting} onChange={evt => this.handleChange(evt)}>
                        <option>true</option>
                        <option>false</option>
                      </select>
                    </div>
                <div className="input-group mb-3">
                  <select multiple className="form-control" name="needed" id="needed" value={this.state.needed} onChange={evt => this.handleSelectChanges(evt)}>
                    <option>DPS</option>
                    <option>Heals</option>
                    <option>Tank</option>
                  </select>
                  <span className="w-100 pr-1">Currently Selected:</span>
                  {this.mapChoice()}
                </div>
                  <button type="submit" className="link" onClick={evt => this.submitEdits(evt, rD.id)} title="Sumbit">
                    <i className="material-icons">
                      done
                    </i>
                  </button>
                  <div className="link input-group-append" onClick={() => this.removeEditField(rD.id)} title="Cancel">
                    <span className="input-group-text">
                        <i className="material-icons">
                          close
                        </i>
                    </span>
                  </div>
                </div>
              </form>
            );
          }
          return(
              <div className="col-2 mb-3">
                <ul key={i} className="isClickable" onClick={evt => this.editClass(evt, rD.id, rD.class, rD.recruiting, rD.needed)}>
                  <li className="font-weight-bold"><span className="font-weight-normal">Class: </span>{rD.class}</li>
                  <li className="font-weight-bold"><span className="font-weight-normal">Active: </span>{rD.recruiting}</li>
                  <span className="">Role: </span>
                  {rD.needed.map((role, i) =>{
                    return <li key={i} className="d-inline pr-1">{dpsTest(role)}</li>
                  })}
                </ul>
              </div>
            );
        });       

        const editRecruits = <form className="col-12 pad-b-2">
            <div className="input-group mb-3">
              <label className="editLabel">Class
                <input name="class" type="text" className="form-control" value={this.state.title} onChange={evt => this.handleChange(evt)} aria-label="title" aria-describedby="Title for about page"></input>
              </label>
            </div>

            <div className="input-group mb-3">
              <label className="editLabel">Are we recruiting for this class?
              <select className="form-control" name="recruiting" onChange={evt => this.handleChange(evt)}>
                <option></option>
                <option>true</option>
                <option>false</option>
              </select>
              </label>
            </div>

            <div className="input-group mb-3">
              <label className="editLabel">Role needed
                <small className="d-block">CTRL + Click to select multiple options</small>
                <select multiple className="form-control" name="needed" id="needed" onChange={evt => this.handleSelectChanges(evt)}>
                  <option>DPS</option>
                  <option>Heals</option>
                  <option>Tank</option>
                </select>
              </label>
              <span className="pr-1 font-weight-bold">Currently Selected:</span>
              {this.mapChoice()}
            </div>

            <button id="submit" className="btn btn-primary" onClick={evt => this.submitForm(evt)}>Submit</button>
          </form>;
        
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded){
            return <div></div>
        } else {
            return [
              <div className="container">
                <div className="row">
                    <h1 className="page-title"><span className="title-inner">Class Recruitment</span></h1>
                    {this.formMessages()}
                    {renderClasses}
                    <h2  className="col-12 mb-3">Submit New Recruit</h2>
                    {editRecruits}
                </div>
              </div>
            ];
        }
    }
}

function dpsTest(icon) {
  var iconImg = '';

  switch(icon) {
    case "DPS": 
      iconImg = <img src={`${dpsIcon}`} alt='test'/>
      break;

    case "Heals": 
      iconImg = <img src={`${healIcon}`} alt="test"/>
      break;

    case "Tank": 
      iconImg = <img src={`${tankIcon}`} alt="test"/>
      break;

    default: 
      iconImg = null
  }
  return iconImg;
}

export default EditRecruit;