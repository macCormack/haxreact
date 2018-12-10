// Todo: Import guild roster component and filter out only raiders or higher

import React, { Component } from 'react';
// import raidRoster from '../data/raid-team';
import Recruiting from './helpers/recruit';
// import rProgress from '../data/raid-progress';
import Axios from 'axios';

class RaidRoster extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            roster: [],
            progress: [],
            progRaidName: '',
            progRaidNameUrl: 'http://localhost:3000/api/raid-names',
            progBossUrl: 'http://localhost:3000/api/bosses',
            // charRoute: 'https://us.api.battle.net/wow/character/illidan/Fiisting?locale=en_US&apikey=gyu8rq8enunpykunew34bmnnubbb6qah',
            url: 'http://localhost:3000/api/raiders',
            accessToken: '?access_token=1iiilpiC2lqzBSuEmW8FMNFAbUN4H9FL9gzEBsRSprh9ogQvAGLbqVVQN4SwUxTK'
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

          Axios.get(this.state.url)
          .then(res => {
            this.setState({
                roster: res.data,
                isLoaded: true
              })
              console.log(this.state.roster);
          })
          .catch(function (error) {
            console.log(error);
          });

          Axios.get(this.state.progBossUrl)
          .then(res => {
            this.setState({
                progress: res.data,
                isLoaded: true
              })
              console.log(this.state.progress);
          })
          .catch(function (error) {
            console.log(error);
          });

          Axios.get(this.state.progRaidNameUrl)
          .then(res => {
            this.setState({
                progRaidName: res.data[0],
                isLoaded: true
              })
              console.log(this.state.progRaidName);
          })
          .catch(function (error) {
            console.log(error);
          });

        })

        // console.log(rProgress);
    }  

    render() {
        const { error, isLoaded} = this.state;

//MAC: Raid team output
        const renderRaidTeam = this.state.roster.map((r, i) => {
            return (
                <ul key={i} className="col-6 col-md-3 col-lg-3 raider">
                    <li><a target="_blank" href={`https://worldofwarcraft.com/en-us/character/${r.realm}/${r.name}`}>
                        <img className="thumbnail" src={`http://render-us.worldofwarcraft.com/character/${r.thumbnail}`} alt={`${r.name}'s portrait`} />
                    </a></li>
                    <li>
                    <a target="_blank" href={`https://worldofwarcraft.com/en-us/character/${r.realm}/${r.name}`}>
                        <h5 className="raider-name">
                            {r.name}
                        </h5>
                    </a>
                    </li>
                    <li><b>Class:</b> {r.class}</li>
                    <li><b>Role:</b> {r.role}</li>
                    <li><a target="_blank" href={`https://www.warcraftlogs.com/character/us/${r.realm}/${r.name}`}>Warcraft Logs</a></li>
                </ul>
            );
        })

        const progBosses = this.state.progress.map(rPB => {
            return (
                <li>{rPB.bossName}<span className="float-right">{rPB.difficulty}</span></li>
            );
        })

        // console.log(this.state)
        
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded){
            return <div></div>
        } else {
            return [
                <div className="container">
                    <div className="row">
                        <h1 className="page-title"><span className="title-inner">Raid Roster</span></h1>
                        <div className="raiders row">
                            {renderRaidTeam}
                        </div>
                        <div  className="sidebar">
                            <Recruiting/>
                            <div className="raid-progress">
                            <h3 className="page-title sub-title"><span className="title-inner">Progress</span></h3>
                                <ul>
                                    <li><h5 className="text-uppercase">Raid:
                                        <span className="font-weight-bold"> {this.state.progRaidName.name}</span>
                                    </h5></li>
                                    {progBosses}
                                </ul>
                            </div>
                        </div>
                    </div>

                </div>
            ];
        }
    }
}

export default RaidRoster;