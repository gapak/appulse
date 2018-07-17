import React, { Component } from 'react';
import classNames from 'classnames';
import _ from 'lodash';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';

import './css/App.css';
import './css/footer.css';

import {game_name} from './game/app_config';
import {getDefaultState} from './game/default_state';
import {frame} from './game/frame';
import {tick} from './game/tick';

import {isEnough, chargeCost, drawCost} from './core/bdcgin';

import {resources} from './game/resources';
import {buildings} from './game/buildings';
import {research} from './game/research';
import {ships} from './game/ships';
import {sortFleet} from './game/fleets';
import {shipyard} from './game/shipyard';
import {data} from './game/data';


class App extends Component {
    constructor(props) {
        super(props);

        this.timerID = null;

        this.playGame = this.playGame.bind(this);
        this.pauseGame = this.pauseGame.bind(this);
        this.setGameSpeed = this.setGameSpeed.bind(this);
        this.tick = this.tick.bind(this);
        this.newGame = this.newGame.bind(this);

        this.state = getDefaultState();

    }


    componentDidMount() {
        console.log('App '+game_name+' componentDidMount');
        var app_state = JSON.parse(localStorage.getItem(game_name+"_app_state"));
        this.setState(app_state ? app_state : getDefaultState());
        this.playGame();
    }

    playGame(speed_multiplier = false) {
        clearInterval(this.timerID);
        this.timerID = setInterval(
            () => this.frame(),
            Math.floor(this.state.game_speed / this.state.frame_rate / (speed_multiplier ? speed_multiplier : this.state.game_speed_multiplier))
        );
        this.setState({game_paused: false});
    }

    pauseGame() {
        clearInterval(this.timerID);
        this.setState({game_paused: true});
    }

    setGameSpeed(speed) {
        if (!this.state.game_paused) this.playGame(speed);
        this.setState({game_speed_multiplier: speed});
    }

    newGame() {
       // if (!window.confirm('Are you ready to start a new game? Your progress will be lost.')) return false;
        localStorage.setItem(game_name+"_app_state", null);
        let new_state = getDefaultState();
        this.setState(new_state);
        this.playGame(new_state.game_speed_multiplier);
    }

    frame() {
        let state = this.state;

        if (state.frame % state.frame_rate === 0) {
            state = this.tick(state);
            state.tick++;
        }

        state = frame(this.state);
        state.frame++;

        localStorage.setItem(game_name+"_app_state", JSON.stringify(state));
        this.setState(state);
        if (state.game_end) this.pauseGame();
    }

    tick(initial_state) {
        let state = tick(initial_state);
    //    localStorage.setItem(game_name+"_app_state", JSON.stringify(state));
        return state; // this.setState(state);
    }


    onClickWrapper(item) {
        if (item.cost) {
            if (isEnough(this.state, item.cost)) {
                if (item.onClick) this.setState(item.onClick(chargeCost(this.state, item.cost)));

            }
            else { return false; }
        }
        else {
            if (item.onClick) this.setState(item.onClick(this.state));
        }
    }

    changeTab(tab_name) {
        this.setState({tab: tab_name});
    }



    render() {

        const badge = (state, item, child) => <OverlayTrigger delay={150} placement="bottom" overlay={tooltip(state, item)}>{child}</OverlayTrigger>;

        const tooltip = (state, item) =>
            <Tooltip id="tooltip">
                <div>
                    <div className="col-lg-12 infoBar">
                        <strong>{item.name}</strong>
                        <br />
                        <p>{item.text ? item.text : ''}</p>
                        <strong>{item.text2 ? item.text2 : ''}</strong>
                    </div>

                    {_.map(item.cost, (value, resource_key) => {
                        return <div className="row" key={resource_key}>
                            <div className="col-xs-6 infoBar">{resource_key}</div>
                            <div className="col-xs-6 infoBar">{value} / {state[resource_key]}</div>
                        </div>
                    })}
                </div>
            </Tooltip>;

        const resouces_subcomponent =
            <div className="col-xs-4 slim">
                <h4>Resources</h4>
                { _.map(resources, (item, key) =>
                    <div key={key}>
                        {item.name}: {this.state[key]}
                    </div>
                )}
            </div>;

        const economy_subcomponent = <div className="row slim">
            {resouces_subcomponent}
            <div className="col-xs-8 flex-container-column slim">
                {this.state.buildings.length > 0 ? <h4>Buildings:</h4> : ''}
                {_.map(this.state.buildings, (item, key) =>
                    <div key={key}>
                        <OverlayTrigger delay={150} placement="bottom" overlay={tooltip(this.state, buildings[item.name])}>
                            <div className="panel">
                                <div style={{opacity: item.deactivated ? 0.5 : 1}}>{buildings[item.name].name}</div>
                                {buildings[item.name].is_activable
                                    ? <div>
                                        <button onClick={() => {
                                            let state = this.state;
                                            state.buildings[key].deactivated = !item.deactivated;
                                            this.setState(state);
                                        }}>{item.deactivated ? "ON" : "OFF"}</button>
                                      </div>
                                    : <div>Active</div>
                                }

                                <div style={{opacity: item.deactivated ? 0.5 : 1}}>
                                    {buildings[item.name].modes ?
                                        <div className="flex-container-row slim">
                                            {_.map(buildings[item.name].modes, (mode, mode_key) =>
                                                <span key={mode_key} className="flex-element">
                                                    <button style={{fontWeight: this.state.buildings[key].mode === mode.name ? 'bold' : 'normal'}} onClick={() => {
                                                        let state = this.state;
                                                        state.buildings[key].mode = mode.name;
                                                        this.setState(state);
                                                    }}>{mode.name}</button>
                                                </span>
                                            )}
                                        </div> : ''
                                    }
                                    <div>
                                        {buildings[item.name].modes || false === true ? <div>{buildings[item.name].modes[item.mode].formula}</div> : <div>{buildings[item.name].formula}</div>}
                                    </div>
                                </div>
                            </div>
                        </OverlayTrigger>
                    </div>
                )}


                <h4>Construction:</h4>
                {_.map(buildings, (item, key) =>
                    (item.isLocked && item.isLocked(this.state))
                        ? ''
                        :
                        <div key={key}>
                            <OverlayTrigger delay={150} placement="bottom" overlay={tooltip(this.state, item)}>
                                <div className="panel">
                                    <div>{item.name}</div>
                                    <div>{<button
                                        className={(item.isDisabled && item.isDisabled(this.state)) ? 'disabled' : (item.cost ? isEnough(this.state, item.cost) ? '' : 'disabled' : '')}
                                        onClick={() => { this.onClickWrapper(item); }}>
                                        Buy
                                    </button>}</div>
                                    <div>{drawCost(item.cost)}</div>
                                </div>
                            </OverlayTrigger>
                        </div>
                )}
            </div>
        </div>;

        const research_subcomponent = <div className="row slim">
            {resouces_subcomponent}
            <div className="col-xs-8 flex-container-column slim">
                {_.map(research, (item, key) =>
                    (item.isLocked && item.isLocked(this.state))
                        ? ''
                        :
                        <div key={key}>
                            <OverlayTrigger delay={150} placement="bottom" overlay={tooltip(this.state, item)}>
                                <span>
                                    {this.state[key] ? <span>{item.name}: {this.state[key]}</span> : ''}
                                    {<button
                                        className={(item.cost ? isEnough(this.state, item.cost) ? '' : 'disabled' : '')}
                                        onClick={() => { this.onClickWrapper(item); }}>
                                        Buy {item.name}
                                    </button>}
                                </span>
                            </OverlayTrigger>
                        </div>
                )}
            </div>
        </div>;

        const shipyard_subcomponent =
            <div className="row">
                {resouces_subcomponent}
                <div className="col-xs-8 flex-container-column">
                    <div className="row">
                        {badge(this.state, data.speed, <div className="col-xs-2 slim badge">speed</div>)}
                        <div className="col-xs-2 slim badge">{badge(this.state, data.hp, <span>hp</span>)}</div>
                        <div className="col-xs-2 slim badge">{badge(this.state, data.arm, <span>arm</span>)}</div>
                        <div className="col-xs-2 slim badge">{badge(this.state, data.dmg, <span>dmg</span>)}</div>
                        <div className="col-xs-2 slim badge">{badge(this.state, data.rof, <span>rof</span>)}</div>
                        <div className="col-xs-2 slim"></div>
                    </div>
                    {_.map(shipyard, (item, key) =>
                        (item.isLocked && item.isLocked(this.state))
                            ? ''
                            :
                            <div key={key} className="panel">
                                {badge(this.state, item,
                                    <div className="slim">
                                        <div className="row slim">
                                            <span className="col-xs-6 badge">{item.name}</span>
                                            <span className="col-xs-6">
                                                <button className={(item.cost ? isEnough(this.state, item.cost) ? '' : 'disabled' : '')}
                                                        onClick={() => { this.onClickWrapper(item); }}> Buy for {item.cost.points}
                                                </button>
                                            </span>
                                        </div>
                                        <div className="row slim">
                                            <div className="col-xs-2 slim">{ships[key].speed}</div>
                                            <div className="col-xs-2 slim">{ships[key].hp}</div>
                                            <div className="col-xs-2 slim">{ships[key].armor}</div>
                                            <div className="col-xs-2 slim">{ships[key].dmg}</div>
                                            <div className="col-xs-2 slim">{ships[key].rof}</div>
                                            <div className="col-xs-2 slim"></div>
                                        </div>
                                    </div>
                                )}
                            </div>
                    )}
                </div>
            </div>;

        const fleets_generator = (fleet, player, header) => <div className="col-xs-6" key={player}>
            {header}
            <div className="flex-element flex-container-row">
                {badge(this.state, data.type, <div className="flex-element badge">type</div>)}
                {badge(this.state, data.speed, <div className="flex-element badge">speed</div>)}
                {badge(this.state, data.hp, <div className="flex-element badge">hp</div>)}
                {badge(this.state, data.arm, <div className="flex-element badge">arm</div>)}
                {badge(this.state, data.dmg, <div className="flex-element badge">dmg</div>)}
                {badge(this.state, data.rof, <div className="flex-element badge">rof</div>)}
                {badge(this.state, data.next, <div className="flex-element badge">next</div>)}
            </div>
            {_.map(fleet.ships, (ship, key) =>
                <div key={key} className="flex-element flex-container-row slim">
                    <div className="flex-element slim" style={{backgroundColor: ship.color, opacity: (ship.hp > 0 ? 1 : 0.4)}}>{ship.type}</div>
                    <div className="flex-element slim">{ship.speed}</div>
                    <div className="flex-element slim">{ship.hp}</div>
                    <div className="flex-element slim">{ship.armor}</div>
                    <div className="flex-element slim">{ship.dmg}</div>
                    <div className="flex-element slim">{ship.rof}</div>
                    <div className="flex-element slim">{ship.fireAtFrame}</div>
                </div>
            )}
        </div>;


        const player_fleet_subcomponent = <div>
            <h4>
                <span> On your base </span>
                <button className={((_.sum(_.values(this.state.player_fleet)) > 0 && this.state.points === 0) || true ? 'btn btn-danger' : 'btn btn-danger disabled')}
                        onClick={() => {
                            let battle = this.state.in_battle_fleets;
                            battle[this.state.player_name] = {player: this.state.player_name, color: this.state.player_color, ships: sortFleet(this.state.player_fleet)};
                            this.setState({
                                in_battle_fleets: battle,
                                player_fleet: [],
                            });
                        }}> Sent Ships to Battle
                </button>
            </h4>
            {fleets_generator({player: this.state.player_name, ships: this.state.player_fleet}, 'player')}
        </div>;



        const fleet_headers = {
            space:  fleet => <h5>{fleet.player} fleet arrival in {fleet.flight_timer - this.state.tick + 1} minutes</h5>,
            battle: fleet => <h5>{fleet.player} fleet</h5>,
        };
        const in_battle_fleets_subcomponent = _.map(_.values(this.state.in_battle_fleets), (fleet, player) => fleets_generator(fleet, player, fleet_headers.battle(fleet)));
        const in_space_fleets_subcomponent = _.map(_.values(this.state.in_space_fleets), (fleet, player) => fleets_generator(fleet, player, fleet_headers.space(fleet)));


        return (
            <div className="App">
                <div className="fat content_container" role="main">
                    {this.state.tab === 'start' ?
                        <div>START</div>
                        : ''}

                    {this.state.tab === 'end' ?
                        <div className="col-xs-10 col">
                            <h2>Game End! Score: {this.state.game_end_score}</h2>
                            <h3><a className="btn btn-warning" onClick={this.newGame} title='Try One More Time'> New Game </a></h3>
                        </div>
                        : ''}

                    {this.state.tab === 'economy' ?
                        <div>{economy_subcomponent}</div>
                        : ''}

                    {this.state.tab === 'research' ?
                        <div>{research_subcomponent}</div>
                        : ''}

                    {this.state.tab === 'shipyard' ?
                        <div> {shipyard_subcomponent}</div>
                        : ''}

                    {this.state.tab === 'battle' ?
                        <div className="col">
                            <h3>Fleets</h3>
                            {this.state.player_fleet.length > 0 ? player_fleet_subcomponent : ''}
                            {in_battle_fleets_subcomponent}
                            {in_space_fleets_subcomponent}
                        </div>
                        : ''}

                    {this.state.tab === 'options' ?
                        <div className="flex-container-column">
                            <a onClick={this.newGame} title='Hard Reset For Developers'>New game</a>
                            <div>
                                <div className="flex-element flex-container-column">
                                    <div className="flex-element">
                                        <h4>Round: {this.state.tick} Turn: {this.state.frame} </h4>
                                    </div>
                                    <div className="flex-element">
                                        <span onClick={() => {
                                            if (this.state.game_paused) {
                                                this.playGame();
                                            } else {
                                                this.pauseGame();
                                            }
                                        }}>
                                            <span className={classNames('glyphicon', (this.state.game_paused ? 'glyphicon-play' : 'glyphicon-pause'))} style={{width: 28, height: 28}}> </span>
                                        </span>
                                        <span>
                                            {[1, 4, 16, 64].map((speed, index) => {
                                                return <span key={index}>
                                                    {this.state.game_speed_multiplier === speed
                                                        ? <button className="" style={{width: 42, height: 28}}><u>{{0: 'x1', 1: 'x4',  2: 'x16',  3: 'x64'}[index]}</u></button>
                                                        : <button className="" style={{width: 42, height: 28}} onClick={() => {
                                                        this.setGameSpeed(speed); }}>{{0: 'x1', 1: 'x4',  2: 'x16',  3: 'x64'}[index]}
                                                    </button>}
                                                </span>
                                            })}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div>
                                { _.map(this.state.messages, (message, key) =>
                                    <div key={key} style={{background: message.background}} className="flex-element">
                                        {message.text}
                                    </div>
                                )}
                            </div>
                        </div>
                        : ''}
                </div>

                <div className="footer row">
                    <span className="col-xs filament"><a onClick={() => { this.changeTab('economy'); }} title='Economy'>Economy</a></span>
                    <span className="col-xs filament"><a onClick={() => { this.changeTab('shipyard'); }} title='Shipyard'>Shipyard</a></span>
                    <span className="col-xs filament"><a onClick={() => { this.changeTab('battle'); }} title='Battle'>Battle</a></span>
                    <span className="col-xs filament"><a onClick={() => { this.changeTab('research'); }} title='Research'>Research</a></span>
                    <span className="col-xs filament"><a onClick={() => { this.changeTab('options'); }} title='Options'>Options</a></span>
                </div>
            </div>
        );
    }
}

export default App;
