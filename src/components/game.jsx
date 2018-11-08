// The source of truth for resource values and modifiers.  Also the main container for the game.

import React from 'react';
import Clickable from './clickables';
import BlueClickable from './blue_clickables';
import BlueProducer from './blue_producers';
import Producer from './producers';
import Event from './events';
import GreenClickable from './green_clickables';
import GreenProducer from './green_producers';

class Game extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      Power: 0,
      powerString: "0",
      Money: 0,
      moneyString: "0",
      Charisma: 0,
      charismaString: "0",
      activeBonus: 0,
      passivePowerBonus: 0,
      activeMoneyBonus: 0,
      passiveMoneyBonus: 1,
      activeCharismaBonus: 0,
      passiveCharismaBonus: 0,
      activeMoneyBonusCha: 0,
      eventTrigger: true,
      red: 0,
      blue: 0,
      green: 0,
      redMultiplier: 1,
      blueMultiplier: 1,
      greenMultiplier: 1,
      eventLevel: 0,
      cost1: 11,
      count1: 0,
      cost2: 280,
      count2: 0,
      cost3: 6500,
      count3: 0,
      cost4: 153000,
      count4: 0,
      cost5: 3790000,
      count5: 0,
      cost6: 100600000,
      count6: 0,
      cost7: 2872000000,
      count7: 0,
      cost8: 88150000000,
      count8: 0,
      cost9: 2904100000000,
      count9: 0,
      moneyCost1: 16,
      moneyCount1: 0,
      moneyCost2: 570,
      moneyCount2: 0,
      moneyCost3: 17400,
      moneyCount3: 0,
      moneyCost4: 521000,
      moneyCount4: 0,
      moneyCost5: 16000000,
      moneyCount5: 0,
      moneyCost6: 514500000,
      moneyCount6: 0,
      moneyCost7: 17460000000,
      moneyCount7: 0,
      moneyCost8: 626480000000,
      moneyCount8: 0,
      moneyCost9: 23776200000000,
      moneyCount9: 0,
      charismaCost1: 14,
      charismaCount1: 0,
      charismaCost2: 450,
      charismaCount2: 0,
      charismaCost3: 12200,
      charismaCount3: 0,
      charismaCost4: 334000,
      charismaCount4: 0,
      charismaCost5: 9440000,
      charismaCount5: 0,
      charismaCost6: 282200000,
      charismaCount6: 0,
      charismaCost7: 8960000000,
      charismaCount7: 0,
      charismaCost8: 302580000000,
      charismaCount8: 0,
      charismaCost9: 10865400000000,
      charismaCount9: 0,
      hoverReset: false,
      hoverPower: false,
      hoverMoney: false,
      hoverCharisma: false
    }

    this.stateGrab = this.stateGrab.bind(this);
    this.reset = this.reset.bind(this);
    this.handleHoverReset = this.handleHoverReset.bind(this);
    this.handleUnhoverReset = this.handleUnhoverReset.bind(this);
    this.handleHoverPower = this.handleHoverPower.bind(this);
    this.handleUnhoverPower = this.handleUnhoverPower.bind(this);
    this.handleHoverMoney = this.handleHoverMoney.bind(this);
    this.handleUnhoverMoney = this.handleUnhoverMoney.bind(this);
    this.handleHoverCharisma = this.handleHoverCharisma.bind(this);
    this.handleUnhoverCharisma = this.handleUnhoverCharisma.bind(this);
  }

  componentDidMount() {
    this.hydrateStateWithLocalStorage();

    window.addEventListener(
      "beforeunload",
      this.saveStateToLocalStorage.bind(this)
    );

    this.processPowerNum();
    this.processCharismaNum();
    this.processMoneyNum();
  }

  hydrateStateWithLocalStorage() {
    for (let key in this.state) {
      if (localStorage.hasOwnProperty(key)) {
        let value = localStorage.getItem(key);
        try {
          this.setState({ [key]: parseFloat(value) });
        } catch (e) {
          this.setState({ [key]: parseFloat(value) });
        }
      }
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.red !== prevState.red) {
      this.multiplier();
    } else if (this.state.blue !== prevState.blue){
      this.multiplier();
    } else if (this.state.green !== prevState.green){
      this.multiplier();
    }

    if (this.state.Power !== prevState.Power){
      this.processPowerNum();
    } else if (this.state.Money !== prevState.Money){
      this.processMoneyNum();
    } else if (this.state.Charisma !== prevState.Charisma) {
      this.processCharismaNum();
    }
  }

  componentWillUnmount() {
    window.removeEventListener(
      "beforeunload",
      this.saveStateToLocalStorage.bind(this)
    );

    this.saveStateToLocalStorage();
  }

  saveStateToLocalStorage() {
    for (let key in this.state) {
      localStorage.setItem(key, this.state[key]);
    }
  }

  handleHoverReset() {
    this.setState({ hoverReset: true });
  }

  handleUnhoverReset() {
    this.setState({ hoverReset: false });
  }

  handleHoverPower() {
    this.setState({ hoverPower: true });
  }

  handleUnhoverPower() {
    this.setState({ hoverPower: false });
  }

  handleHoverMoney() {
    this.setState({ hoverMoney: true });
  }

  handleUnhoverMoney() {
    this.setState({ hoverMoney: false });
  }

  handleHoverCharisma() {
    this.setState({ hoverCharisma: true });
  }

  handleUnhoverCharisma() {
    this.setState({ hoverCharisma: false });
  }

  reset() {
    this.setState({
      Power: 0,
      powerString: "0",
      Money: 0,
      moneyString: "0",
      Charisma: 0,
      charismaString: "0",
      activeBonus: 0,
      passivePowerBonus: 0,
      activeMoneyBonus: 0,
      passiveMoneyBonus: 1,
      passiveCharismaBonus: 0,
      activeCharismaBonus: 0,
      activeMoneyBonusCha: 0,
      red: 0,
      green: 0,
      blue: 0,
      eventTrigger: true,
      eventLevel: 0,
      cost1: 11,
      count1: 0,
      cost2: 280,
      count2: 0,
      cost3: 6500,
      count3: 0,
      cost4: 153000,
      count4: 0,
      cost5: 3790000,
      count5: 0,
      cost6: 10060000,
      count6: 0,
      cost7: 2872000000,
      count7: 0,
      cost8: 88150000000,
      count8: 0,
      cost9: 2904100000000,
      count9: 0,
      moneyCost1: 16,
      moneyCount1: 0,
      moneyCost2: 570,
      moneyCount2: 0,
      moneyCost3: 17400,
      moneyCount3: 0,
      moneyCost4: 521000,
      moneyCount4: 0,
      moneyCost5: 16000000,
      moneyCount5: 0,
      moneyCost6: 514500000,
      moneyCount6: 0,
      moneyCost7: 17460000000,
      moneyCount7: 0,
      moneyCost8: 626480000000,
      moneyCount8: 0,
      moneyCost9: 23776200000000,
      charismaCost1: 14,
      charismaCount1: 0,
      charismaCost2: 450,
      charismaCount2: 0,
      charismaCost3: 12200,
      charismaCount3: 0,
      charismaCost4: 334000,
      charismaCount4: 0,
      charismaCost5: 9440000,
      charismaCount5: 0,
      charismaCost6: 282200000,
      charismaCount6: 0,
      charismaCost7: 8960000000,
      charismaCount7: 0,
      charismaCost8: 302580000000,
      charismaCount8: 0,
      charismaCost9: 10865400000000,
      charismaCount9: 0,
      hoverReset: false,
      hoverPower: false,
      hoverMoney: false,
      hoverCharisma: false
    });
  }

  // Really probably shouldn't be using React like this - this is basically a function to grab slices of state from child components and pass them around
  stateGrab(key, value) {
    this.setState({ [key]: value });
  }

  multiplier() {
    this.setState({ redMultiplier: 1 + 0.05 * this.state.red, blueMultiplier: 1 + 0.25 * this.state.blue, greenMultiplier: 1 + 0.05 * this.state.green });
  }

  checkPower() {
    if (this.state.Power + this.state.Money + this.state.Charisma >= 100 && this.state.eventLevel < 2) {
      this.setState({ eventTrigger: true });
    } else if (this.state.Power + this.state.Money + this.state.Charisma >= 1000 && this.state.eventLevel < 3) {
      this.setState({ eventTrigger: true });
    } else if (this.state.Power + this.state.Money + this.state.Charisma >= 10000 && this.state.eventLevel < 4) {
      this.setState({ eventTrigger: true });
    } else if (this.state.Power + this.state.Money + this.state.Charisma >= 1000 * 2 ** (4 * 2.01) && this.state.eventLevel < 5) {
      this.setState({ eventTrigger: true });
    } else if (this.state.Power + this.state.Money + this.state.Charisma >= 1000 * 2 ** (5 * 2.01) && this.state.eventLevel < 6) {
      this.setState({ eventTrigger: true });
    } else if (this.state.Power + this.state.Money + this.state.Charisma >= 1000 * 2 ** (6 * 2.01) && this.state.eventLevel < 7) {
      this.setState({ eventTrigger: true });
    } else if (this.state.Power + this.state.Money + this.state.Charisma >= 1000 * 2 ** (7 * 2.01) && this.state.eventLevel < 8) {
      this.setState({ eventTrigger: true });
    } else if (this.state.Power + this.state.Money + this.state.Charisma >= 1000 * 2 ** (8 * 2.01) && this.state.eventLevel < 9) {
      this.setState({ eventTrigger: true });
    } else if (this.state.Power + this.state.Money + this.state.Charisma >= 1000 * 2 ** (9 * 2.01) && this.state.eventLevel < 10) {
      this.setState({ eventTrigger: true });
    } else if (this.state.Power + this.state.Money + this.state.Charisma >= 1000 * 2 ** (10 * 2.01) && this.state.eventLevel < 11) {
      this.setState({ eventTrigger: true });
    } else if (this.state.Power + this.state.Money + this.state.Charisma >= 1000 * 2 ** (11 * 2.01) && this.state.eventLevel < 12) {
      this.setState({ eventTrigger: true });
    } else if (this.state.Power + this.state.Money + this.state.Charisma >= 1000 * 2 ** (12 * 2.01) && this.state.eventLevel < 13) {
      this.setState({ eventTrigger: true });
    } else if (this.state.Power + this.state.Money + this.state.Charisma >= 1000 * 2 ** (13 * 2.01) && this.state.eventLevel < 14) {
      this.setState({ eventTrigger: true });
    } else if (this.state.Power + this.state.Money + this.state.Charisma >= 1000 * 2 ** (14 * 2.01) && this.state.eventLevel < 15) {
      this.setState({ eventTrigger: true });
    } else if (this.state.Power + this.state.Money + this.state.Charisma >= 1000 * 2 ** (15 * 2.01) && this.state.eventLevel < 16) {
      this.setState({ eventTrigger: true });
    } else if (this.state.Power + this.state.Money + this.state.Charisma >= 1000 * 2 ** (16 * 2.01) && this.state.eventLevel < 17) {
      this.setState({ eventTrigger: true });
    } else if (this.state.Power + this.state.Money + this.state.Charisma >= 1000 * 2 ** (17 * 2.01) && this.state.eventLevel < 18) {
      this.setState({ eventTrigger: true });
    } else if (this.state.Power + this.state.Money + this.state.Charisma >= 1000 * 2 ** (18 * 2.01) && this.state.eventLevel < 19) {
      this.setState({ eventTrigger: true });
    } else if (this.state.Power + this.state.Money + this.state.Charisma >= 1000 * 2 ** (19 * 2.01) && this.state.eventLevel < 20) {
      this.setState({ eventTrigger: true });
    }
  }

  processPowerNum() {
    this.setState({powerString: `${Math.trunc(this.state.Power)}`});
    if (this.state.Power >= 1000000000000000000000000000000000){
      this.setState({ powerString: `${Math.trunc(this.state.Power/ 10000000000000000000000000000000) / 100}D`});
    } else if (this.state.Power >= 1000000000000000000000000000000){
      this.setState({ powerString: `${Math.trunc(this.state.Power / 10000000000000000000000000000) / 100}N`});
    } else if (this.state.Power >= 1000000000000000000000000000){
      this.setState({ powerString: `${Math.trunc(this.state.Power / 10000000000000000000000000) / 100}O`});
    } else if (this.state.Power >= 100000000000000000000000){
      this.setState({ powerString: `${Math.trunc(this.state.Power / 10000000000000000000000) / 100}Sp` });
    } else if (this.state.Power >= 1000000000000000000000){
      this.setState({ powerString: `${Math.trunc(this.state.Power / 10000000000000000000) / 100}Sx` });
    } else if (this.state.Power >= 1000000000000000000){
      this.setState({ powerString: `${Math.trunc(this.state.Power / 10000000000000000) / 100}Qt` });
    } else if (this.state.Power >= 1000000000000000){
      this.setState({ powerString: `${Math.trunc(this.state.Power / 10000000000000) / 100}Qd` });
    } else if (this.state.Power >= 1000000000000){
      this.setState({ powerString: `${Math.trunc(this.state.Power / 10000000000) / 100}T` });
    } else if (this.state.Power >= 1000000000){
      this.setState({ powerString: `${Math.trunc(this.state.Power / 10000000) / 100}B` });
    } else if (this.state.Power >= 1000000){
      this.setState({ powerString: `${Math.trunc(this.state.Power / 10000) / 100}M` });
    } else if (this.state.Power >= 1000){
      this.setState({ powerString: `${Math.trunc(this.state.Power / 10) / 100}K` });
    }
  }

  processMoneyNum() {
    this.setState({ moneyString: `${Math.trunc(this.state.Money)}` });
    if (this.state.Money >= 1000000000000000000000000000000000) {
      this.setState({ moneyString: `${Math.trunc(this.state.Money / 10000000000000000000000000000000) / 100}D` });
    } else if (this.state.Money >= 1000000000000000000000000000000) {
      this.setState({ moneyString: `${Math.trunc(this.state.Money / 10000000000000000000000000000) / 100}N` });
    } else if (this.state.Money >= 1000000000000000000000000000) {
      this.setState({ moneyString: `${Math.trunc(this.state.Money / 10000000000000000000000000) / 100}O` });
    } else if (this.state.Money >= 100000000000000000000000) {
      this.setState({ moneyString: `${Math.trunc(this.state.Money / 10000000000000000000000) / 100}Sp` });
    } else if (this.state.Money >= 1000000000000000000000) {
      this.setState({ moneyString: `${Math.trunc(this.state.Money / 10000000000000000000) / 100}Sx` });
    } else if (this.state.Money >= 1000000000000000000) {
      this.setState({ moneyString: `${Math.trunc(this.state.Money / 10000000000000000) / 100}Qt` });
    } else if (this.state.Money >= 1000000000000000) {
      this.setState({ moneyString: `${Math.trunc(this.state.Money / 10000000000000) / 100}Qd` });
    } else if (this.state.Money >= 1000000000000) {
      this.setState({ moneyString: `${Math.trunc(this.state.Money / 10000000000) / 100}T` });
    } else if (this.state.Money >= 1000000000) {
      this.setState({ moneyString: `${Math.trunc(this.state.Money / 10000000) / 100}B` });
    } else if (this.state.Money >= 1000000) {
      this.setState({ moneyString: `${Math.trunc(this.state.Money / 10000) / 100}M` });
    } else if (this.state.Money >= 1000) {
      this.setState({ moneyString: `${Math.trunc(this.state.Money / 10) / 100}K` });
    }
  }

  processCharismaNum() {
    this.setState({ charismaString: `${Math.trunc(this.state.Charisma)}` });
    if (this.state.Charisma >= 1000000000000000000000000000000000) {
      this.setState({ charismaString: `${Math.trunc(this.state.Charisma / 1000000000000000000000000000000000) / 100}D` });
    } else if (this.state.Charisma >= 1000000000000000000000000000000) {
      this.setState({ charismaString: `${Math.trunc(this.state.Charisma / 1000000000000000000000000000000) / 100}N` });
    } else if (this.state.Charisma >= 1000000000000000000000000000) {
      this.setState({ charismaString: `${Math.trunc(this.state.Charisma / 1000000000000000000000000000) / 100}O` });
    } else if (this.state.Charisma >= 100000000000000000000000) {
      this.setState({ charismaString: `${Math.trunc(this.state.Charisma / 10000000000000000000000) / 100}Sp` });
    } else if (this.state.Charisma >= 1000000000000000000000) {
      this.setState({ charismaString: `${Math.trunc(this.state.Charisma / 10000000000000000000) / 100}Sx` });
    } else if (this.state.Charisma >= 1000000000000000000) {
      this.setState({ charismaString: `${Math.trunc(this.state.Charisma / 10000000000000000) / 100}Qt` });
    } else if (this.state.Charisma >= 1000000000000000) {
      this.setState({ charismaString: `${Math.trunc(this.state.Charisma / 10000000000000) / 100}Qd` });
    } else if (this.state.Charisma >= 1000000000000) {
      this.setState({ charismaString: `${Math.trunc(this.state.Charisma / 10000000000) / 100}T` });
    } else if (this.state.Charisma >= 1000000000) {
      this.setState({ charismaString: `${Math.trunc(this.state.Charisma / 10000000) / 100}B` });
    } else if (this.state.Charisma >= 1000000) {
      this.setState({ charismaString: `${Math.trunc(this.state.Charisma / 10000) / 100}M` });
    } else if (this.state.Charisma >= 1000) {
      this.setState({ charismaString: `${Math.trunc(this.state.Charisma / 10) / 100}K` });
    }
  }

  render() {
    let events = "";
    if (this.state.eventTrigger === true) {
      events = <Event
        red={this.state.red}
        blue={this.state.blue}
        green={this.state.green}
        stateGrab={this.stateGrab}
        eventLevel={this.state.eventLevel}
      />
    } else {
      this.checkPower();
    }

    let producers = [];
    for (let i = 1; i <= this.state.red; i++) {
      producers.push(<Producer
        stateGrab={this.stateGrab}
        Power={this.state.Power}
        level={i}
        activeBonus={this.state.activeBonus}
        eventLevel={this.state.eventLevel}
      />)
    }

    let blueProducers = [];
    for (let i = 1; i <= this.state.blue; i++) {
      blueProducers.push(<BlueProducer
        stateGrab={this.stateGrab}
        Money={this.state.Money}
        moneyLevel={i}
        activeMoneyBonus={this.state.activeMoneyBonus}
        passiveMoneyBonus={this.state.passiveMoneyBonus}
        eventLevel={this.state.eventLevel}
        />)
    }

    let greenProducers = [];
    for (let i = 1; i <= this.state.green; i++) {
      greenProducers.push(<GreenProducer
       stateGrab={this.stateGrab}
       Charisma={this.state.Charisma}
       charismaLevel={i}
       activeCharismaBonus={this.state.activeCharismaBonus}
       passiveCharismaBonus={this.state.passiveCharismaBonus}
       passivePowerBonus={this.state.passivePowerBonus}
       activeMoneyBonusCha={this.state.activeMoneyBonusCha}
       eventLevel={this.state.eventLevel}
       />)
    }

    let blueClick = "";
    if (this.state.blue > 0){
      blueClick = <BlueClickable
        className="clickableContainer"
        stateGrab={this.stateGrab}
        activeMoneyBonus={(1 + this.state.activeMoneyBonus) * this.state.blueMultiplier}
        passiveMoneyBonus={this.state.passiveMoneyBonus * this.state.blueMultiplier}
        activeMoneyBonusCha={this.state.activeMoneyBonusCha}
        Money={this.state.Money} />
    }

    let redClick = "";
    if (this.state.red > 0){
      redClick = <Clickable
        className="clickableContainer"
        stateGrab={this.stateGrab}
        activeBonus={(1 + this.state.activeBonus) * this.state.redMultiplier}
        passivePowerBonus={this.state.passivePowerBonus * this.state.redMultiplier}
        Power={this.state.Power}
      />
    }

    let greenClick = "";
    if (this.state.green > 0){
      greenClick = <GreenClickable
      className="greenClickable"
      stateGrab={this.stateGrab}
      activeCharismaBonus={(1 + this.state.activeCharismaBonus) * this.state.greenMultiplier}
      passiveCharismaBonus={this.state.passiveCharismaBonus * this.state.greenMultiplier}
      Charisma={this.state.Charisma} />
    }

    let display = "hidden";
    if (this.state.hoverReset) {
      display = "visibleReset";
    } else {
      display = "hidden";
    }

    let displayPower = "hidden";
    if (this.state.hoverPower) {
      displayPower = "visibleRedStat";
    } else {
      displayPower = "hidden";
    }

    let displayMoney = "hidden";
    if (this.state.hoverMoney) {
      displayMoney = "visibleBlueStat";
    } else {
      displayMoney = "hidden";
    }

    let displayCharisma = "hidden";
    if (this.state.hoverCharisma) {
      displayCharisma = "visibleGreenStat";
    } else {
      displayCharisma = "hidden";
    }

    return <div className="gameContainer">
      <div className="objectContainer">
        <div className="numberContainer">
          <h1 className="powerPlay" onMouseEnter={this.handleHoverPower} onMouseLeave={this.handleUnhoverPower}>
            Power: {this.state.powerString}
            <div className={displayPower}>
            <p className="redStatToolText">On Click: {`${Math.trunc(this.state.activeBonus * this.state.redMultiplier)}`}</p>
            <p className="redStatToolText">Idle: {`${Math.trunc(this.state.passivePowerBonus * this.state.redMultiplier)}`}</p>
            </div>
          </h1>
        <h1 className="moneyTalks" onMouseEnter={this.handleHoverMoney} onMouseLeave={this.handleUnhoverMoney}>
            Money: {this.state.moneyString}
            <div className={displayMoney}>
              <p className="blueStatToolText">On Click: {`${Math.trunc(this.state.activeMoneyBonus * this.state.blueMultiplier)}`}</p>
              <p className="blueStatToolText">Idle: {`${Math.trunc((this.state.passiveMoneyBonus + this.state.activeMoneyBonusCha) * ((1 + this.state.activeMoneyBonus) * this.state.blueMultiplier))}`}</p>
            </div>
          </h1>
        <h1 className="friendshipMagic" onMouseEnter={this.handleHoverCharisma} onMouseLeave={this.handleUnhoverCharisma}>
            Charisma: {this.state.charismaString}
          <div className={displayCharisma}>
            <p className="greenStatToolText">On Click: {`${Math.trunc(this.state.activeCharismaBonus * this.state.greenMultiplier)}`}</p>
            <p className="greenStatToolText">Idle: {`${Math.trunc(this.state.passiveCharismaBonus * this.state.greenMultiplier)}`}</p>
          </div>
          </h1>
        </div>
        
        <div className="clickerContainer">
          {redClick}
          {blueClick}
          {greenClick}
        </div>
      </div>
      <button className="reset" onClick={this.reset} onMouseEnter={this.handleHoverReset} onMouseLeave={this.handleUnhoverReset}>
        Reset Game
          <div className={display}>
          Clicking this button will reset all values and let you start a
          new game! If there are any render issues, clicking again will
          usually clear them.
          </div>
      </button>
        <div className="producerContainer">
          <div className="redProducerContainer">{producers}</div>
          <div className="blueProducerContainer">{blueProducers}</div>
          <div className="greenProducerContainer">{greenProducers}</div>
          <div className="eventContainer">{events}</div>
        </div>
      </div>;
  }
}

export default Game;