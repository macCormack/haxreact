import React, {Component} from 'react';
import recruitment from '../../data/recruit';
import dpsIcon from '../../img/dps-icon.png';
import tankIcon from '../../img/tank-icon.png';
import healIcon from '../../img/heal-icon.png';
class Recruiting extends Component {
    constructor(props) {
        super(props);
        this.state = {
            recruit: recruitment.classes
        };
    }

    render() {
        const recruit = this.state.recruit.map((r, index) => {
            
            if( r.active === true ) {
                if(r.role.need.toUpperCase() === 'DPS') {
                    return <li className="" key={index}>{r.name}<span className="guild-recruit-role">
                        <img src={`${dpsIcon}`} alt="test"/>
                    </span></li>
                }else if(r.role.need.toUpperCase() === 'TANK') {
                    return <li className="" key={index}>{r.name}<span className="guild-recruit-role">
                        <img src={`${tankIcon}`} alt="test"/>
                    </span></li>
                }else if(r.role.need.toUpperCase() === 'HEALS') {
                    return <li className="" key={index}>{r.name}<span className="guild-recruit-role">
                        <img src={`${healIcon}`} alt="test"/>
                    </span></li>
                }
            }
            return null
        });

        return(
            <div className="recruitment">
                <h3 className="page-title sub-title"><span className="title-inner">Recruitment</span></h3>
                <ul>
                    {recruit}
                </ul>
            </div>
        )
    }
}

export default Recruiting;