import React from 'react';

class Producer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      baseBonus: 0,
      bonusString: "0",
      activeBonus: this.props.activeBonus,
      passiveBonus: 0,
      baseCost: 10,
      cost: 10,
      costString: "10",
      count: 0,
      Power: this.props.Power,
      errors: "",
      level: this.props.level,
      hover: false,
      advanced: false,
      capstone: false
    }
    this.purchase = this.purchase.bind(this);
    this.giveState = this.giveState.bind(this);
    this.handleHover = this.handleHover.bind(this);
    this.handleUnhover = this.handleUnhover.bind(this);
  }

  componentDidMount() {
    this.calculateBase();
    this.isAdvanced();
    this.setState({ cost: parseInt(localStorage.getItem(`cost${this.state.level}`)), count: parseInt(localStorage.getItem(`count${this.state.level}`))});
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.activeBonus !== prevState.activeBonus) {
      this.giveState();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.Power !== this.state.Power) {
      this.setState({Power: nextProps.Power, errors: ""});
    }

    if (this.state.count !== nextProps.count) {
      this.processCostNum();
      this.processBonusNum();
    }

    if (nextProps.eventLevel !== this.props.eventLevel) {
      this.isAdvanced();
    }
  }

  curve() {
    this.setState({cost: Math.trunc(this.state.baseCost * (1.12 ** (this.state.count + 1)))});
  }

  calculateBase() {
    let level = this.state.level;
    let rawCost = (level * (10 + level) ** level);
    let cost = rawCost - (rawCost % (10 ** (level - 1)));
    let bonus = ((level - 1) * (10 + level - 1) ** (level - 1));
    if (bonus === 0) {
      bonus = 1
    }
    this.setState({baseBonus: bonus, baseCost: cost, level: level});
  }

  deductResource() {
    if (this.state.Power < this.state.cost) {
      this.setState({errors: "Not enough power!!!"})
      return false
    } else {
      this.setState({Power: (this.state.Power - this.state.cost)});
      return true
    }
  }

  purchase() {
    if (this.deductResource()) {
      this.curve();
      this.setState({activeBonus: (this.state.baseBonus + this.props.activeBonus), count: this.state.count + 1});
      this.setState({errors: ""});
    }
  }

  giveState() {
    this.props.stateGrab("activeBonus", this.state.activeBonus);
    this.props.stateGrab("Power", this.state.Power);
    this.props.stateGrab(`cost${this.state.level}`, this.state.cost);
    this.props.stateGrab(`count${this.state.level}`, this.state.count);
  }

  processCostNum() {
    this.setState({ costString: `${Math.trunc(this.state.cost)}` });
    if (this.state.cost >= 1000000000000000000000000000000000) {
      this.setState({ costString: `${Math.trunc(this.state.cost / 10000000000000000000000000000000) / 100}D` });
    } else if (this.state.cost >= 1000000000000000000000000000000) {
      this.setState({ costString: `${Math.trunc(this.state.cost / 10000000000000000000000000000) / 100}N` });
    } else if (this.state.cost >= 1000000000000000000000000000) {
      this.setState({ costString: `${Math.trunc(this.state.cost / 10000000000000000000000000) / 100}O` });
    } else if (this.state.cost >= 100000000000000000000000) {
      this.setState({ costString: `${Math.trunc(this.state.cost / 10000000000000000000000) / 100}Sp` });
    } else if (this.state.cost >= 1000000000000000000000) {
      this.setState({ costString: `${Math.trunc(this.state.cost / 10000000000000000000) / 100}Sx` });
    } else if (this.state.cost >= 1000000000000000000) {
      this.setState({ costString: `${Math.trunc(this.state.cost / 10000000000000000) / 100}Qt` });
    } else if (this.state.cost >= 1000000000000000) {
      this.setState({ costString: `${Math.trunc(this.state.cost / 10000000000000) / 100}Qd` });
    } else if (this.state.cost >= 1000000000000) {
      this.setState({ costString: `${Math.trunc(this.state.cost / 10000000000) / 100}T` });
    } else if (this.state.cost >= 1000000000) {
      this.setState({ costString: `${Math.trunc(this.state.cost / 10000000) / 100}B` });
    } else if (this.state.cost >= 1000000) {
      this.setState({ costString: `${Math.trunc(this.state.cost / 10000) / 100}M` });
    } else if (this.state.cost >= 1000) {
      this.setState({ costString: `${Math.trunc(this.state.cost / 10) / 100}K` });
    }
  }

  processBonusNum() {
    this.setState({ bonusString: `${Math.trunc(this.state.baseBonus * (this.state.count + 1))}` });
    if ((this.state.baseBonus * (this.state.count + 1)) >= 1000000000000000000000000000000000) {
      this.setState({ bonusString: `${Math.trunc((this.state.baseBonus * (this.state.count + 1)) / 10000000000000000000000000000000) / 100}D` });
    } else if ((this.state.baseBonus * (this.state.count + 1)) >= 1000000000000000000000000000000) {
      this.setState({ bonusString: `${Math.trunc((this.state.baseBonus * (this.state.count + 1)) / 10000000000000000000000000000) / 100}N` });
    } else if ((this.state.baseBonus * (this.state.count + 1)) >= 1000000000000000000000000000) {
      this.setState({ bonusString: `${Math.trunc((this.state.baseBonus * (this.state.count + 1)) / 10000000000000000000000000) / 100}O` });
    } else if ((this.state.baseBonus * (this.state.count + 1)) >= 100000000000000000000000) {
      this.setState({ bonusString: `${Math.trunc((this.state.baseBonus * (this.state.count + 1)) / 10000000000000000000000) / 100}Sp` });
    } else if ((this.state.baseBonus * (this.state.count + 1)) >= 1000000000000000000000) {
      this.setState({ bonusString: `${Math.trunc((this.state.baseBonus * (this.state.count + 1)) / 10000000000000000000) / 100}Sx` });
    } else if ((this.state.baseBonus * (this.state.count + 1)) >= 1000000000000000000) {
      this.setState({ bonusString: `${Math.trunc((this.state.baseBonus * (this.state.count + 1)) / 10000000000000000) / 100}Qt` });
    } else if ((this.state.baseBonus * (this.state.count + 1)) >= 1000000000000000) {
      this.setState({ bonusString: `${Math.trunc((this.state.baseBonus * (this.state.count + 1)) / 10000000000000) / 100}Qd` });
    } else if ((this.state.baseBonus * (this.state.count + 1)) >= 1000000000000) {
      this.setState({ bonusString: `${Math.trunc((this.state.baseBonus * (this.state.count + 1)) / 10000000000) / 100}T` });
    } else if ((this.state.baseBonus * (this.state.count + 1)) >= 1000000000) {
      this.setState({ bonusString: `${Math.trunc((this.state.baseBonus * (this.state.count + 1)) / 10000000) / 100}B` });
    } else if ((this.state.baseBonus * (this.state.count + 1)) >= 1000000) {
      this.setState({ bonusString: `${Math.trunc((this.state.baseBonus * (this.state.count + 1)) / 10000) / 100}M` });
    } else if ((this.state.baseBonus * (this.state.count + 1)) >= 1000) {
      this.setState({ bonusString: `${Math.trunc((this.state.baseBonus * (this.state.count + 1)) / 10) / 100}K` });
    }
  }


  handleHover() {
    this.processBonusNum();
    this.processCostNum();
    this.setState({ hover: true });
  }

  handleUnhover() {
    this.setState({ hover: false });
  }


  isAdvanced() {
    if (this.state.level > 5 && this.state.level < 9) {
      this.setState({ advanced: true });
    } else if (this.state.level === 9) {
      this.setState({ capstone: true });
    }
  }

  render() {
    if ((this.state.advanced === true && this.props.eventLevel < 10) || (this.state.capstone === true && this.props.eventLevel < 19)) {
      return (
        <div className="producerBox">
          <div className="producerButton">
            <p className="buttonText">This power is locked until you've done more stuff</p>
          </div>
        </div>
      );
    } else {
      let display = "hidden";
      if (this.state.hover) {
        display = "visibleRed";
      } else {
        display = "hidden";
      }

      let text = [
        "Get Bigger Sword",
        "Sword Training",
        "Speed Training",
        "Endurance Training",
        "Enchant Sword",
        "Strength Potion",
        "Scroll of Duplication",
        "Forbidden Technique",
        "Get Even Bigger Sword" ]
      return (<div className="producerBox">
          <div className="producerButton" onClick={this.purchase} onMouseEnter={this.handleHover} onMouseLeave={this.handleUnhover}>
            <p className="buttonText">{text[this.state.level - 1]}</p>
            <p className="buttonText">Count: {this.state.count}</p>
            <p className="buttonText">Cost: {this.state.costString}</p>
              <div className={display}>
                <span className="redToolText">Bonus: Active Power</span>
                <span className="redToolText">Rate: {this.state.bonusString} per click</span>
              </div>
          </div>
          <span className="errors">{this.state.errors}</span>
        </div>
      );
    }
  }
}

export default Producer;