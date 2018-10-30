import React, { Component } from 'react';
import Recruiting from './helpers/recruit';

// MAC: Generic sorting function used for sorting roster by rank
var sortByProperty = function (property) {

    return function (x, y) {

        return ((x[property] === y[property]) ? 0 : ((x[property] > y[property]) ? 1 : -1));

    };

};

class GuildRoster extends Component {
// MAC: Define base state and pass through variables needed for fetch
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            character: [],
            currentPage: 1,
            charsPerPage: 40,
            dataRoute: 'https://us.api.battle.net/wow/guild/illidan/HAX?fields=members&locale=en_US&apikey=gyu8rq8enunpykunew34bmnnubbb6qah',        
        };
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(event) {
        this.setState({
            currentPage: Number(event.target.id)
        });
    }

// MAC: Fake authentication to give a promise
    authenticate(){
        return new Promise(resolve => setTimeout(resolve, 2000))
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
            }, 2000)
          }
// MAC: Mount the dataRoute from constructor, fetch the data then populate the character array
            fetch(this.state.dataRoute).then(res => res.json())
                .then(
                    (result) => {
                        this.setState({
                            isLoaded: true,
                            character: result.members
                        });
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
// MAC: Grab values of error, isLoaded and character for mapping and if statement
        const { error, isLoaded, character, currentPage, charsPerPage} = this.state;
//MAC: Sort guild roster by rank acesnding to descending
        character.sort(sortByProperty('rank'));

// MAC: Logic for displaying raid roster 
        const indexOfLastChar = currentPage * charsPerPage;
        const indexOfFirstChar = indexOfLastChar - charsPerPage;
        const currentChar = character.slice(indexOfFirstChar, indexOfLastChar);

// MAC: Map array of returned guild roster and output their values
        const renderChars = currentChar.map((char, i) => {
            return (
                <ul key={i} className="col-6 col-md-3 col-lg-3 guild-roster-char">
                    <li>
                        <img src=
                            {`http://render-us.worldofwarcraft.com/character/${char.character.thumbnail}`}
                            alt="character portrait"
                        />
                    </li>
                    <li><h6><a href={`https://worldofwarcraft.com/en-us/character/${char.character.realm}/${char.character.name}`} title={`Armoury for ${char.character.name}`}>{char.character.name}</a></h6></li>
                    <li><b>Level:</b> {char.character.level}</li>
                    <li><b>Class:</b> {getClassName(char.character.class)}</li>
                    <li><b>Rank:</b> {getRankName(char.rank)}</li>
                </ul>
            );
        });
//MAC: Map recruit json and output
        // const recruit = this.state.recruit.map((r, i) => {
        //     if( r.active === true )
        //         return <li className="" key={i}>{r.name}<span className="guild-recruit-role">{r.role.need}</span></li>
        //         return null
        // }); //changed

// MAC: Logic for displaying page numbers
        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(character.length / charsPerPage); i++) {
            pageNumbers.push(i);
        }

        const renderPageNumbers = pageNumbers.map(number => {
            return (
                <li
                    className={(this.state.currentPage === number ? 'active ' : '') + 'pagination-number'}
                    key={number}
                    id={number}
                    onClick={this.handleClick}
                >
                    {number}
                </li>
            );
        });
        console.log(this.state);

        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded){
            return <div></div>
        } else {
// MAC: Build the page
            return [
                <div className="container">
                    <div className="row">
                        <div className="width-100">
                            <h1 className="page-title"><span className="title-inner">Guild Roster</span></h1>
                        </div>
                        <div className="guild-roster row">
                            {renderChars}
                        <ul className="pagination">
                            {renderPageNumbers}
                        </ul>
                        </div>
                        <div className="sidebar">
                            <Recruiting/>
                        </div>
                    </div>
                </div>
            ];
        }
    }
}

// DH: Returns a class name based on the class id provided
function getClassName(classID) {
    var className = '';

    switch(classID){
        case 1:
            className = 'Warrior'
            break;
        case 2:
            className = 'Paladin'
            break;
        case 3:
            className = 'Hunter'
            break;
        case 4:
            className = 'Rogue'
            break;
        case 5:
            className = 'Priest'
            break;
        case 6:
            className = 'Death Knight'
            break;
        case 7:
            className = 'Shaman'
            break;
        case 8:
            className = 'Mage'
            break;
        case 9:
            className = 'Warlock'
            break;
        case 10:
            className = 'Monk'
            break;
        case 11:
            className = 'Druid'
            break;
        case 12:
            className = 'Demon Hunter'
            break;
        default:
            className = 'Unknown'
    }        

    return className;
}
// MAC: Returns a rank Name from the provided rankID
function getRankName(rankID) {
    var rankName = "";

    switch(rankID) {
        case 0:
            rankName = 'Guild Master'
            break;
        case 1:
            rankName = 'Officer'
            break;
        case 2:
            rankName = 'Officer ALTS'
            break;
        case 3:
            rankName = 'Recruit Officer'
            break;
        case 4:
            rankName = 'Raiders'
            break;
        case 5:
            rankName = 'ALTS'
            break;
        case 6: 
            rankName = 'Member'
            break;
        case 7: 
            rankName = 'Initiate'
            break;
        default: 
            rankName = 'Unknown'
    }

    return rankName;
}

export default GuildRoster;