import React, {Component} from 'react';
// import recruitment from '../../data/recruit';
import dpsIcon from '../../img/dps-icon.png';
import tankIcon from '../../img/tank-icon.png';
import healIcon from '../../img/heal-icon.png';
import axios from 'axios';

class Recruiting extends Component {
    constructor(props) {
        super(props);
        this.state = {
            recruitment: [],
            url: 'http://localhost:3000/api/recruitings'
        };
    }

    componentDidMount() {
        axios.get(this.state.url).then(res => {
        this.setState({
            recruitment: res.data
        })
        console.log(this.state.recruitment);
        })
    }

    render() {
        const recruit = this.state.recruitment.map((r, index) => {
            
            if( r.recruiting === 'true' ) {
                return (
                    <ul key={index} className="pt-1">
                        <li className="d-inline pr-2 pt-2">{r.class}</li>
                        {r.needed.map((role, i) =>{
                            return <li key={i} className="d-inline float-right pr-1">{convertToIcon(role)}</li>
                        })}
                    </ul>
                );
            }
            return null
        });

        return(
            <div className="recruitment mb-3">
                <h3 className="page-title sub-title"><span className="title-inner">Recruitment</span></h3>
                <div>
                    {recruit}
                </div>
            </div>
        )
    }
}

function convertToIcon(icon) {
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

export default Recruiting;