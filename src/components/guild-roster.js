import React, { Component } from 'react';

class GuildRoster extends Component {
// MAC: Define base state and pass through variables needed for fetch
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            character: [],
            // wowClass: [],
            dataRoute: 'https://us.api.battle.net/wow/guild/illidan/HAX?fields=members&locale=en_US&apikey=gyu8rq8enunpykunew34bmnnubbb6qah',
            // classRoute: 'https://us.api.battle.net/wow/data/character/classes?locale=en_US&apikey=gyu8rq8enunpykunew34bmnnubbb6qah'
        };
    }
// MAC: Mount the dataroute from constructor, fetch the data then populate the character array
    componentDidMount() {
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
// MAC: 2nd fetch that grabs classID and Name. Not useful right now until switches are removed.
        // .then( fetch(this.state.classRoute).then(res => res.json())
        //     .then(
        //         (result) => {
        //             this.setState({
        //                 isLoaded: true,
        //                 wowClass: result.classes
        //             });
        //         },
        //     (error) => {
        //         this.setState({
        //             isLoaded: true,
        //             error
        //         })
        //     }
        //   )
        // )
               
    }

    render() {
// MAC: Grab values of error, isLoaded and character for mapping and if statement
        const { error, isLoaded, character, /*wowClass*/} = this.state;
        
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded){
            return <div>Loading...</div>
        } else {
// MAC: Build the page
            console.log(this.state);
            return [
                <div className="row">
                    <div className="column c12"><h1>Guild Roster</h1>
                </div>
{/* MAC: Map function for showing class ID and Name from 2nd fetch.*/}
                {/* wowClass.map((c, i) => 
                    <ul key={c.id} className="column c12"><li>id: {c.id} Name: {c.name}</li></ul>
                )*/}
                {character.map((char, i) => 
                <ul key={i} className="column c2">
                        <li key={char.character.thumbnail}>
                            <img src=
                                {`http://render-us.worldofwarcraft.com/character/${char.character.thumbnail}`}
                                alt="character portrait"
                            />
                        </li>
                        <li><h3 key={char.character.name}><a href={`https://worldofwarcraft.com/en-us/character/${char.character.realm}/${char.character.name}`} title={`Armoury for ${char.character.name}`}>{char.character.name}</a></h3></li>
                        <li key={char.character.level}><b>Level:</b> {char.character.level}</li>
                        <li key={char.character.acheivementPoints}><b>Class:</b> {getClassName(char.character.class)}</li>
                        <li key={char.rank}><b>Rank:</b> {getRankName(char.rank)}</li>
                </ul>
                )}
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
            rankName = 'Recruit Officer'
            break;
        case 3:
            rankName = 'Raiders'
            break;
        case 4:
            rankName = 'Members'
            break;
        case 5: 
            rankName = 'Initiate'
            break;
        default: 
            rankName = 'Unknown'
    }

    return rankName;
}

export default GuildRoster;