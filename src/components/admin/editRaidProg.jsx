import React, { Component } from 'react';
import axios from "axios";
import $ from 'jquery';

class EditRaidProgress extends Component {
    constructor(props) {
        super(props);
        this.state = {
          error: null,
          isLoaded: false,
          name: '',
          selectedRaidName: '',
          bossName: '',
          difficulty:'',
          id: '',
          currentId: '',
          currentBoss: '',
          progress: [],
          rName: '',
          selectedBoss: false,
          url: 'http://localhost:3000/api/raid-names',
          bossUrl: 'http://localhost:3000/api/bosses',
          accessToken: '?access_token=' + localStorage.getItem('accessToken')
        };
      }
    
    editRaidName(evt, id) {
      this.setState({
        selectedRaidName: true,
        selectedId: id
      })
      console.log(id);
    }

    editField(clickedId) {
      this.setState({
        selectedBoss: true,
        selectedId: clickedId
      })
      console.log(clickedId);
    }

    removeEditField(clickedId) {
      this.setState({
        selectedBoss: false,
        selectedId: null
      })
    }

    deleteWarning(evt, currentId, bossName) {
      this.setState({
        currentId: currentId,
        currentBoss: bossName
      })
      $('#exampleModal').modal('show');
    }

    deleteField(evt, currentId) {
      // evt.preventDefault();
      axios.delete(this.state.bossUrl + '/' + currentId + this.state.accessToken, {
        id: currentId,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    }

    handleChange(evt) {
      this.setState({ [evt.target.name]: evt.target.value });
      console.log(evt.target.value);
    }

    submitRaidName(evt, id) {
      evt.preventDefault();
      axios.put(this.state.url + '/' + id + this.state.accessToken, {
        name: this.state.name
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    }

    submitBossName(evt, id) {
      if (this.state.difficulty === '') {
        return null;
      } else {
        // evt.preventDefault();
        axios.put(this.state.bossUrl + '/' + id + this.state.accessToken, {
          bossName: this.state.bossName,
          difficulty: this.state.difficulty
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
      // evt.preventDefault();
      axios.post(this.state.bossUrl + this.state.accessToken, {
        bossName: this.state.bossName,
        difficulty: this.state.difficulty
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
          //MAC: Fetch raid name
          axios.get(this.state.url).then(res => {
            this.setState({
              isLoaded: true,
              rName: res.data[0].name,
              id: res.data[0].id
            })
            console.log(this.state.rName);
          })
          // MAC: Fetch bosses
          axios.get(this.state.bossUrl).then(res => {
            this.setState({
                progress: res.data,
                isLoaded: true,
                bossId: res.data.id,
            })
            console.log(this.state.progress);
          });

        })

    }

    renderRaidName() {
      if(this.state.selectedId === this.state.id) {
        return (
        <form className="col-4">
          <div className="input-group mb-3">
            <input name="name" type="text" className="form-control" onChange={evt => this.handleChange(evt, this.state.id)} aria-label="Raid Name" placeholder={this.state.rName} required></input>

            <button type="submit" className="link input-group-append" onClick={evt => this.submitRaidName(evt, this.state.id)} title="Sumbit">
              <i className="material-icons">
                done
              </i>
            </button>

            <button type="text" className="link input-group-append" onClick={() => this.removeEditField(this.state.id)} title="Cancel">
              <i className="material-icons">
                close
              </i>
            </button>

          </div>
        </form>
        );
      }
        return <div className="w-100"><h3 className="w-25 pl-2 isClickable" onClick={evt => this.editRaidName(evt, this.state.id)}>{this.state.rName}</h3></div>;
    }
    
    render() {
      const { error, isLoaded} = this.state;

      const renderRaidName = this.renderRaidName();
      
      // MAC: Structure for delete Modal
      const deleteWarning = 
      <div>
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
                Are you really sure you want to delete {this.state.currentBoss}
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal">Nope soz</button>
                <button type="submit" className="btn btn-danger" onClick={evt => this.deleteField(evt, this.state.currentId)}>Yes I do</button>
              </div>
            </div>
          </div>
        </div>
        </div>;

    // MAC: Raid progression structure for output
      const raidProg = this.state.progress.map((p, i ) =>{
        if (this.state.selectedId === p.id ) {
          return( 
            <form key={i} className="col-4">
              <div className="input-group mb-2">
                  <input name="bossName" type="text" className="form-control mb-2" onChange={evt => this.handleChange(evt, p.id)} aria-label="Raid Boss Name" placeholder={p.bossName} required></input>
              <div className="input-group mb-3">
                  <input name="difficulty" type="text" className="form-control" onChange={evt => this.handleChange(evt, p.id)} aria-label="Raid Boss Difficulty" placeholder={p.difficulty} required></input>

              </div>
                <button type="submit" className="link" onClick={evt => this.submitBossName(evt, p.id)} title="Sumbit">
                  <i className="material-icons">
                    done
                  </i>
                </button>
                <div className="link input-group-append" onClick={() => this.removeEditField(p.id)} title="Cancel">
                  <span className="input-group-text">
                      <i className="material-icons">
                        close
                      </i>
                  </span>
                </div>
                <div className="link input-group-append" onClick={evt => this.deleteWarning(evt, p.id, p.bossName)} title="Delete">
                  <span className="input-group-text">
                      <i className="material-icons">
                        delete
                      </i>
                  </span>
                </div>
              </div>
            </form>
          );
        } else {
          // console.log(p.id);
          return (
            <dl className="mb-3 col-12">
              <dt key={i} id="boss" className="isClickable d-inline pr-2" onClick={() => this.editField(p.id)}>{p.bossName} -</dt>
              <dd id="boss-difficulty" className="d-inline">{p.difficulty}</dd>
            </dl>
          );
        }
      })

      // MAC: Form structure for adding new boss to raid progression.
      const addNewBoss = 
        <form className="col-12 pad-b-2">
          <div className="input-group mb-3">
            <label className="editLabel">Boss Name
              <input name="bossName" type="text" className="form-control" onChange={evt => this.handleChange(evt)} aria-label="Boss Name" aria-describedby="Boss name for raid prog"></input>
            </label>
          </div>
          <div className="input-group mb-3">
            <label className="editLabel">Boss Difficulty
              <input name="difficulty" type="text" className="form-control" onChange={evt => this.handleChange(evt)} aria-label="Boss difficulty" aria-describedby="boss difficulty for raid prog"></input>
            </label>
          </div>
          <button id="submit" className="btn btn-primary" onClick={evt => this.handleSubmit(evt)}>Submit</button>
        </form>;
      
      //MAC: render all the content
      if (error) {
          return <div>Error: {error.message}</div>;
      } else if (!isLoaded){
          return <div></div>
      } else {
          return [
            <div className="container">
              {deleteWarning}
              <div className="row">
                  <h1 className="page-title"><span className="title-inner">Edit Raid Progress</span></h1>
                  <ul className="col-12 mb-3">
                    <li>To edit a boss simply click the name, fill out the field, and click the check mark.</li>
                    <li>To delete a boss click on the name, then click on the trashcan</li>
                    <li>To add a boss fill out the add boss form below.</li>
                  </ul>
                  {renderRaidName}
                  {raidProg}
                  <h3 className="col-12">Add New Boss</h3>
                  {addNewBoss}
              </div>
            </div>
          ];
      }
  }
}

export default EditRaidProgress;