import React from 'react';

class BlueProducer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      baseMoneyBonus: 0,
      activeMoneyBonus: this.props.activeMoneyBonus,
      passiveMoneyBonus: 1,
      baseMoneyCost: 16,
      moneyCost: 16,
      moneyCount: 0,
      costString: "16",
      bonusString: "0",
      Money: this.props.Money,
      errors: "",
      moneyLevel: this.props.moneyLevel,
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
    if (localStorage.hasOwnProperty(`moneyCost${this.state.moneyLevel}`)){
      this.setState({
        moneyCost: parseInt(localStorage.getItem(`moneyCost${this.state.moneyLevel}`)),
        moneyCount: parseInt(localStorage.getItem(`moneyCount${this.state.moneyLevel}`))
      });
    } else {
      let level = this.state.moneyLevel
      this.setState({
        moneyCost: ((level * (15 + level) ** level) - ((level * (15 + level) ** level) % (10 ** (level - 1)))),
        count: 0
      });
      }
    this.processCostNum();
    this.processBonusNum();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.passiveMoneyBonus !== prevState.passiveMoneyBonus) {
      this.giveState();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.Money !== this.state.Money) {
      this.setState({ Money: nextProps.Money, errors: "" });
    }

    if (this.state.moneyCount !== nextProps.moneyCount) {
      this.processCostNum();
      this.processBonusNum();
    }

    if (nextProps.eventLevel !== this.props.eventLevel) {
      this.isAdvanced();
    }
  }

  curve() {
    this.setState({ moneyCost: Math.trunc(this.state.baseMoneyCost * (1.1 ** (this.state.moneyCount + 1))) });
  }

  calculateBase() {
    let level = this.state.moneyLevel;
    let rawCost = (level * (15 + level) ** level);
    let cost = rawCost - (rawCost % (10 ** (level - 1)));
    let bonus = Math.trunc(((level - 1) * (10 + level - 1) ** (level - 1)) / 2);
    if (bonus === 0) {
      bonus = 1
    }
    this.setState({ baseMoneyBonus: bonus, baseMoneyCost: cost, moneyLevel: level });
    this.processBonusNum();
    this.processCostNum();
  }

  deductResource() {
    if (this.state.Money < this.state.moneyCost) {
      this.setState({ errors: "Not enough money!!!" })
      return false
    } else {
      this.setState({ Money: (this.state.Money - this.state.moneyCost) });
      return true
    }
  }

  purchase() {
    if (this.deductResource()) {
      this.curve();
      this.setState({
        passiveMoneyBonus: (this.state.baseMoneyBonus + this.props.passiveMoneyBonus),
        activeMoneyBonus: (this.props.moneyLevel / 4),
        moneyCount: this.state.moneyCount + 1 });
      this.setState({ errors: "" });
      this.processCostNum();
      this.processBonusNum();
    }
  }

  giveState() {
    this.props.stateGrab("activeMoneyBonus", this.state.activeMoneyBonus)
    this.props.stateGrab("passiveMoneyBonus", this.state.passiveMoneyBonus);
    this.props.stateGrab("Money", this.state.Money);
    this.props.stateGrab(`moneyCost${this.state.moneyLevel}`, this.state.moneyCost);
    this.props.stateGrab(`moneyCount${this.state.moneyLevel}`, this.state.moneyCount);
  }

  processCostNum() {
    this.setState({ costString: `${Math.trunc(this.state.moneyCost)}`});
    if (this.state.moneyCost >= 1000000000000000000000000000000000) {
      this.setState({ costString: `${Math.trunc(this.state.moneyCost / 10000000000000000000000000000000) / 100}D` });
    } else if (this.state.moneyCost >= 1000000000000000000000000000000) {
      this.setState({ costString: `${Math.trunc(this.state.moneyCost / 10000000000000000000000000000) / 100}N` });
    } else if (this.state.moneyCost >= 1000000000000000000000000000) {
      this.setState({ costString: `${Math.trunc(this.state.moneyCost / 10000000000000000000000000) / 100}O` });
    } else if (this.state.moneyCost >= 100000000000000000000000) {
      this.setState({ costString: `${Math.trunc(this.state.moneyCost / 10000000000000000000000) / 100}Sp` });
    } else if (this.state.moneyCost >= 1000000000000000000000) {
      this.setState({ costString: `${Math.trunc(this.state.moneyCost / 10000000000000000000) / 100}Sx` });
    } else if (this.state.moneyCost >= 1000000000000000000) {
      this.setState({ costString: `${Math.trunc(this.state.moneyCost / 10000000000000000) / 100}Qt` });
    } else if (this.state.moneyCost >= 1000000000000000) {
      this.setState({ costString: `${Math.trunc(this.state.moneyCost / 10000000000000) / 100}Qd` });
    } else if (this.state.moneyCost >= 1000000000000) {
      this.setState({ costString: `${Math.trunc(this.state.moneyCost / 10000000000) / 100}T` });
    } else if (this.state.moneyCost >= 1000000000) {
      this.setState({ costString: `${Math.trunc(this.state.moneyCost / 10000000) / 100}B` });
    } else if (this.state.moneyCost >= 1000000) {
      this.setState({ costString: `${Math.trunc(this.state.moneyCost / 10000) / 100}M` });
    } else if (this.state.moneyCost >= 1000) {
      this.setState({ costString: `${Math.trunc(this.state.moneyCost / 10) / 100}K` });
    }
  }

  processBonusNum() {
    this.setState({ bonusString:`${Math.trunc(this.state.baseMoneyBonus * (this.state.moneyCount + 1))}` });
    if ((this.state.baseMoneyBonus * (this.state.moneyCount + 1)) >= 1000000000000000000000000000000000) {
      this.setState({bonusString: `${Math.trunc((this.state.baseMoneyBonus * (this.state.moneyCount + 1)) / 10000000000000000000000000000000) / 100}D`});
    } else if ((this.state.baseMoneyBonus * (this.state.moneyCount + 1)) >= 1000000000000000000000000000000) {
      this.setState({bonusString: `${Math.trunc((this.state.baseMoneyBonus * (this.state.moneyCount + 1)) / 10000000000000000000000000000) / 100}N`});
    } else if ((this.state.baseMoneyBonus * (this.state.moneyCount + 1)) >= 1000000000000000000000000000) {
      this.setState({bonusString: `${Math.trunc((this.state.baseMoneyBonus * (this.state.moneyCount + 1)) / 10000000000000000000000000) / 100}O`});
    } else if ((this.state.baseMoneyBonus * (this.state.moneyCount + 1)) >= 100000000000000000000000) {
      this.setState({bonusString: `${Math.trunc((this.state.baseMoneyBonus * (this.state.moneyCount + 1)) / 10000000000000000000000) / 100}Sp`});
    } else if ((this.state.baseMoneyBonus * (this.state.moneyCount + 1)) >= 1000000000000000000000) {
      this.setState({bonusString: `${Math.trunc((this.state.baseMoneyBonus * (this.state.moneyCount + 1)) / 10000000000000000000) / 100}Sx`});
    } else if ((this.state.baseMoneyBonus * (this.state.moneyCount + 1)) >= 1000000000000000000) {
      this.setState({bonusString: `${Math.trunc((this.state.baseMoneyBonus * (this.state.moneyCount + 1)) / 10000000000000000) / 100}Qt`});
    } else if ((this.state.baseMoneyBonus * (this.state.moneyCount + 1)) >= 1000000000000000) {
      this.setState({bonusString: `${Math.trunc((this.state.baseMoneyBonus * (this.state.moneyCount + 1)) / 10000000000000) / 100}Qd`});
    } else if ((this.state.baseMoneyBonus * (this.state.moneyCount + 1)) >= 1000000000000) {
      this.setState({bonusString: `${Math.trunc((this.state.baseMoneyBonus * (this.state.moneyCount + 1)) / 10000000000) / 100}T`});
    } else if ((this.state.baseMoneyBonus * (this.state.moneyCount + 1)) >= 1000000000) {
      this.setState({bonusString: `${Math.trunc((this.state.baseMoneyBonus * (this.state.moneyCount + 1)) / 10000000) / 100}B`});
    } else if ((this.state.baseMoneyBonus * (this.state.moneyCount + 1)) >= 1000000) {
      this.setState({bonusString: `${Math.trunc((this.state.baseMoneyBonus * (this.state.moneyCount + 1)) / 10000) / 100}M`});
    } else if ((this.state.baseMoneyBonus * (this.state.moneyCount + 1)) >= 1000) {
      this.setState({bonusString: `${Math.trunc((this.state.baseMoneyBonus * (this.state.moneyCount + 1)) / 10) / 100}K`});
    }
  }

  handleHover() {
    this.processBonusNum();
    this.processCostNum();
    this.setState({hover: true});
  }

  handleUnhover(){
    this.setState({hover: false});
  }

  isAdvanced() {
    if (this.state.moneyLevel > 5 && this.state.moneyLevel < 9) {
      this.setState({ advanced: true });
    } else if (this.state.moneyLevel === 9) {
      this.setState({ capstone: true });
    }
  }



  render() {
    if ((this.state.advanced === true && this.props.eventLevel < 10) || (this.state.capstone === true && this.props.eventLevel < 19)) {
      return (
        <div className="blueProducerBox">
          <div className="blueProducerButton">
            <p className="blueButtonText">This item is locked until you've done more stuff</p>
          </div>
        </div>
      );
    } else {
      let display = "hidden";
      if (this.state.hover){
        display = "visibleBlue";
      } else {
        display = "hidden";
      }

      let text = [
        "Get Bigger Money",
        "Money Training",
        "Budget Training",
        "Richness Training",
        "Enchant Wallet",
        "Wealth Potion",
        "Scroll of Scalability",
        "Compound Interest",
        "Get Even Bigger Money"]
      return (
        <div className="blueProducerBox">
          <div className="blueProducerButton" onClick={this.purchase} onMouseEnter={this.handleHover} onMouseLeave={this.handleUnhover}>
            <p className="blueButtonText">{text[this.state.moneyLevel - 1]}</p>
            <p className="blueButtonText">Count: {this.state.moneyCount}</p>
            <p className="blueButtonText">Cost: {this.state.costString}</p>
            <div className={display}>
              <span className="blueToolText"></span>
              <span className="blueToolText">Bonus: Passive Money</span>
              <span className="blueToolText">Rate: {this.state.bonusString} per sec</span>
            </div>
          </div>
          <span className="errors">{this.state.errors}</span>
        </div>
      );
    }
  }
}

export default BlueProducer;