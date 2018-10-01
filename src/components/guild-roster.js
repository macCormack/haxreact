import React, { Component } from 'react';

class GuildRoster extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            character: [],
            wowClass: [],
            dataRoute: 'https://us.api.battle.net/wow/guild/illidan/HAX?fields=members&locale=en_US&apikey=gyu8rq8enunpykunew34bmnnubbb6qah',
            classRoute: 'https://us.api.battle.net/wow/data/character/classes?locale=en_US&apikey=gyu8rq8enunpykunew34bmnnubbb6qah'
        };
    }

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
        .then( fetch(this.state.classRoute).then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        wowClass: result.classes
                    });
                },
            (error) => {
                this.setState({
                    isLoaded: true,
                    error
                })
            }
          )
        )
               
    }

    render() {
        const { error, isLoaded, character, wowClass} = this.state;
        
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded){
            return <div>Loading...</div>
        } else {
            console.log(this.state);
            return [
                <div className="row">
                    <div className="column c12"><h1>Guild Roster</h1>
                </div>
                {wowClass.map((c, i) => 
                    <ul key={c.id} className="column c12"><li>id: {c.id} Name: {c.name}</li></ul>
                )}
                {character.map((char, i) => 
                <ul key={i} className="column c2">
                        <li key={char.character.thumbnail}>
                            <img src=
                                {`http://render-us.worldofwarcraft.com/character/${char.character.thumbnail}`}
                                alt="character portrait"
                            />
                        </li>
                        <li><h3 key={char.character.name}><a href={`https://worldofwarcraft.com/en-us/character/${char.character.realm}/${char.character.name}`} title={`WoW armoury${char.character.name}`}>{char.character.name}</a></h3></li>
                        <li key={char.character.level}>Level: {char.character.level}</li>
                        <li key={char.character.acheivementPoints}>Class: {char.character.class}</li>
                        <li key={char.rank}>Rank: {char.rank}</li>
                </ul>
                )}
                </div>
            ];
        }
    }
}
export default GuildRoster;