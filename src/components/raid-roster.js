import React, { Component } from 'react';

class RaidRoster extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            character: [],
            charRoute: 'https://us.api.battle.net/wow/character/illidan/Fiisting?locale=en_US&apikey=gyu8rq8enunpykunew34bmnnubbb6qah',
        };
    }

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

        fetch(this.state.charRoute).then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        character: result
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
        const { error, isLoaded, character} = this.state;
        var charImg = " http://render-us.worldofwarcraft.com/character/" + character.thumbnail;
        console.log(this.state)
        
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded){
            return <div></div>
        } else {
            return [
                <div>
                    <h1>Raid Roster</h1>
                </div>,
                <ul>
                    <li><img src={charImg} alt="character portrait"/></li>
                    <li><h3 key={1}>{character.name}</h3></li>
                    <li><div key={2}>{character.realm}</div></li>
                    <li><div key={3}>{getClassName(character.class)}</div></li>
                </ul>
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

export default RaidRoster;