import React from 'react';

class Event extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      red: this.props.red,
      blue: this.props.blue,
      green: this.props.green,
      eventLevel: this.props.eventLevel
    }
    this.handleClick = this.handleClick.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.red !== nextProps.red) {
      this.setState({ red: nextProps.red });
    } else if (this.state.blue !== nextProps.blue) {
      this.setState({ blue: nextProps.blue });
    } else if (this.state.green !== nextProps.green) {
      this.setState({ green: nextProps.green });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state !== prevState) {
      this.giveState();
    }
  }


  handleClick(e) {
    this.setState({ eventTrigger: false });
    this.setState({ [e.target.value]: this.state[e.target.value] + 1 });
    this.setState({ eventLevel: this.state.eventLevel + 1})
    console.log(this.state);
    console.log(e.target.value)
  }

  giveState() {
    this.props.stateGrab("red", this.state.red);
    this.props.stateGrab("blue", this.state.blue);
    this.props.stateGrab("green", this.state.green);
    this.props.stateGrab("eventTrigger", false);
    this.props.stateGrab("eventLevel", this.state.eventLevel)
  }

  render() {
    let eventText = [
    "Choose Your Class",
    "Monster Attack!",
    "A large troll attacks the walls",
    "Tavern Drink",
    "Handle Conflict",
    "Spend Windfall",
    "Drink Mysterious Potion",
    "Faerie Boon",
    "Magic School",
    "What's best in life?",
    "Join Faction?",
    "Before Adventuring Job",
    "What do you do in town?",
    "Evil Lich Attack",
    "Rumors of Monster Army",
    "False Accusation, Handle Accuser",
    "Evil Wizard Offers Help For Monster Horde",
    "Handle Monster Horde",
    "Favorite Weapon"
  ];

    let redText = [
      "Fighter",
      "Stab it",
      "Rush in",
      "Dragon Brew",
      "Challenge to Duel",
      "Getting Stronger",
      "Strength Potion",
      "Bigger Muscles",
      "Evocation",
      "Fighting",
      "Fighter Guild",
      "Butcher",
      "Weapons Shop",
      "Fight Him Until He Gives Up",
      "Train Harder",
      "Challenge to Duel",
      "Attack Her",
      "Fight Them All Myself",
      "Sword"];

    if (this.state.red >= 9) {
      redText = "";
    } else if (this.state.red >= 8 && ((this.state.blue === 9) || (this.state.green === 9))) {
      redText = ""
    }

    let blueText = [
      "Noble",
      "Call the guard",
      "Offer bounty",
      "Finest Wine",
      "Buy Them Off",
      "Investment",
      "Wealth Potion",
      "Business Acumen",
      "Illusion",
      "Comfort",
      "Aristocracy",
      "Baker",
      "Bank",
      "Church Donations",
      "Start Reinforcing The Walls",
      "Exile Accuser",
      "Be Suspicious, Consider Offer",
      "Equip the Guard Well",
      "Money"];

    if (this.state.blue >= 9){
      blueText = ""
    } else if (this.state.blue >= 8 && ((this.state.red === 9) || (this.state.green === 9))){
      blueText = ""
    }

    let greenText = [
      "Bard",
      "Persuade it to join you",
      "Lead townspeople to fight it",
      "House Ale",
      "Make Friends",
      "Drinks All Around",
      "Charisma Potion",
      "Good Friends",
      "Enchantment",
      "Friendship",
      "Friends of The Town",
      "Candlestick Maker",
      "Tavern",
      "Trick Him Out of His Phylactery",
      "Spread Word to Other Towns",
      "Figure Out Motives",
      "Accept Offer",
      "Rally the Town",
      "Leadership"];

    if (this.state.green >= 9){
      greenText = ""
    } else if (this.state.green >= 8 && ((this.state.red === 9) || (this.state.blue === 9))) {
      greenText = ""
    }

    if (this.state.eventLevel < 3) {
      let redStart = "";
      if (this.state.red == 0) {
        redStart = <button className="redText" onClick={this.handleClick} value="red">
            {redText[this.state.eventLevel]}
          </button>;
      } else {
        redStart = "";
      }

      let blueStart = "";
      if (this.state.blue == 0) {
        blueStart = <button className="blueText" onClick={this.handleClick} value="blue">
          {blueText[this.state.eventLevel]}
        </button>
      } else {
        blueStart = "";
      }

      let greenStart = "";
      if (this.state.green == 0){
        greenStart = <button className="greenText" onClick={this.handleClick} value="green">
            {greenText[this.state.eventLevel]}
          </button>
      } else {
        greenStart = "";
      }


      return (
        <div className="eventBox">
          <div className="eventText">{eventText[this.state.eventLevel]}</div>
          {redStart}
          {blueStart}
          {greenStart}
        </div>
      );
      } else
      return (
        <div className="eventBox">
          <div className="eventText">{eventText[this.state.eventLevel]}</div>
          <button className="redText" onClick={this.handleClick} value="red">{redText[this.state.eventLevel]}</button>
          <button className="blueText" onClick={this.handleClick} value="blue">{blueText[this.state.eventLevel]}</button>
          <button  className="greenText" onClick={this.handleClick} value="green">{greenText[this.state.eventLevel]}</button>
        </div>
      );
  }
}

export default Event;