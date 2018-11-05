import React from 'react';

class GreenProducer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      baseCharismaBonus: 0,
      activeCharismaBonus: this.props.activeCharismaBonus,
      passiveCharismaBonus: this.props.passiveCharismaBonus,
      passivePowerBonus: this.props.passivePowerBonus,
      activeMoneyBonusCha: this.props.activeMoneyBonusCha,
      baseCharismaCost: 16,
      charismaCost: 16,
      charismaCount: 0,
      Charisma: this.props.Charisma,
      errors: "",
      charismaLevel: this.props.charismaLevel,
      hover: false,
      costString: "16",
      activeBonusString: `${this.props.activeCharismaBonus}`,
      passiveBonusString: `${this.props.passiveCharismaBonus}`,
      moneyBonusString: `${this.props.activeMoneyBonusCha}`,
      powerBonusString: `${this.props.passivePowerBonus}`,
      advanced: false,
      capstone: false
    }
    this.purchase = this.purchase.bind(this);
    this.giveState = this.giveState.bind(this);
    this.handleHover = this.handleHover.bind(this);
    this.handleUnhover = this.handleUnhover.bind(this);
    this.isAdvanced = this.isAdvanced.bind(this);
  }

  componentDidMount() {
    this.isAdvanced();
    this.calculateBase();
    this.setState({
      charismaCost: parseInt(localStorage.getItem(`charismaCost${this.state.charismaLevel}`)),
      charismaCount: parseInt(localStorage.getItem(`charismaCount${this.state.charismaLevel}`))
    });
    this.processNums();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.activeCharismaBonus !== prevState.activeCharismaBonus) {
      this.giveState();
    }

    if (this.state.charismaCount !== prevState.charismaCount) {
      this.processNums();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.Charisma !== this.state.Charisma) {
      this.setState({ Charisma: nextProps.Charisma, errors: "" });
    }

    if (nextProps.activeMoneyBonusCha !== this.state.activeMoneyBonusCha){
      this.setState({ activeMoneyBonusCha: nextProps.activeMoneyBonusCha})
    }

    if (nextProps.passivePowerBonus !== this.state.passivePowerBonus){
      this.setState({passivePowerBonus: nextProps.passivePowerBonus})
    }

    if (nextProps.eventLevel !== this.props.eventLevel){
      this.isAdvanced();
    }
  }

  curve() {
    this.setState({ charismaCost: Math.trunc(this.state.baseCharismaCost * (1.15 ** (this.state.charismaCount + 1))) });
  }

  calculateBase() {
    let level = this.state.charismaLevel;
    let rawCost = (level * (13 + level) ** level);
    let cost = rawCost - (rawCost % (10 ** (level - 1)));
    let bonus = Math.trunc(((level - 1) * (10 + level - 1) ** (level - 1)));
    if (bonus === 0) {
      bonus = 1
    }
    this.setState({ baseCharismaBonus: bonus, baseCharismaCost: cost, charismaLevel: level });
    this.processNums();
  }

  deductResource() {
    if (this.state.Charisma < this.state.charismaCost) {
      this.setState({ errors: "Not enough charisma!!!" })
      return false
    } else {
      this.setState({ Charisma: (this.state.Charisma - this.state.charismaCost) });
      return true
    }
  }

  purchase() {
    if (this.deductResource()) {
      this.curve();
      this.levelCheck();
      this.setState({ errors: "" });
      this.processNums();
    }
  }

  isAdvanced(){
    if (this.state.charismaLevel > 5 && this.state.charismaLevel < 9) {
      this.setState({advanced: true});
    } else if (this.state.charismaLevel === 9) {
      this.setState({capstone: true});
    }
  }

  levelCheck() {
    if (this.state.charismaLevel === 1) {
      this.setState({
        activeCharismaBonus: (this.state.baseCharismaBonus + this.props.activeCharismaBonus),
        passiveCharismaBonus: (this.props.passiveCharismaBonus),
        passivePowerBonus: (this.props.passivePowerBonus),
        activeMoneyBonusCha: (this.props.activeMoneyBonusCha),
        charismaCount: this.state.charismaCount + 1
      });
    }

    if (this.state.charismaLevel === 2) {
      this.setState({
        activeCharismaBonus: ((this.state.baseCharismaBonus * 0.75) + this.props.activeCharismaBonus),
        passiveCharismaBonus: this.props.passiveCharismaBonus,
        passivePowerBonus: ((this.state.baseCharismaBonus / 2) + this.props.passivePowerBonus),
        activeMoneyBonusCha: this.props.activeMoneyBonusCha,
        charismaCount: this.state.charismaCount + 1
      });
    }

    if (this.state.charismaLevel === 3) {
      this.setState({
        activeCharismaBonus: (this.state.baseCharismaBonus + this.props.activeCharismaBonus),
        passiveCharismaBonus: (this.props.passiveCharismaBonus),
        passivePowerBonus: (this.props.passivePowerBonus),
        activeMoneyBonusCha: (this.props.activeMoneyBonusCha),
        charismaCount: this.state.charismaCount + 1
      });
    }

    if (this.state.charismaLevel === 4 ){
      this.setState({
        activeCharismaBonus: ((this.state.baseCharismaBonus * 0.75) + this.props.activeCharismaBonus),
        passiveCharismaBonus: (this.props.passiveCharismaBonus),
        activeMoneyBonusCha: ((this.state.baseCharismaBonus / 2) + this.props.activeMoneyBonusCha),
        passivePowerBonus: (this.props.passivePowerBonus),
        charismaCount: this.state.charismaCount + 1
      });
    }

    if (this.state.charismaLevel === 5) {
      this.setState({
        activeCharismaBonus: (this.state.baseCharismaBonus + this.props.activeCharismaBonus),
        passiveCharismaBonus: this.props.passiveCharismaBonus,
        passivePowerBonus: this.props.passivePowerBonus,
        activeMoneyBonusCha: this.props.activeMoneyBonusCha,
        charismaCount: this.state.charismaCount + 1
      });
    }

    if (this.state.charismaLevel === 6){
      this.setState({
        activeCharismaBonus: ((this.state.baseCharismaBonus * 0.8) + this.props.activeCharismaBonus),
        passiveCharismaBonus: (this.props.passiveCharismaBonus),
        activeMoneyBonusCha: ((this.state.baseCharismaBonus / 2) + this.props.activeMoneyBonusCha),
        passivePowerBonus: ((this.state.baseCharismaBonus / 2) + this.props.passivePowerBonus),
        charismaCount: this.state.charismaCount + 1
      });
    }

    if (this.state.charismaLevel === 7) {
      this.setState({
        activeCharismaBonus: (this.state.baseCharismaBonus + this.props.activeCharismaBonus),
        passiveCharismaBonus: (this.props.passiveCharismaBonus),
        passivePowerBonus: (this.props.passivePowerBonus),
        activeMoneyBonusCha: (this.props.activeMoneyBonusCha),
        charismaCount: this.state.charismaCount + 1
      });
    }

    if (this.state.charismaLevel === 8){
      this.setState({
        activeCharismaBonus: ((this.state.baseCharismaBonus * 0.8) + this.props.activeCharismaBonus),
        passiveCharismaBonus: ((this.state.baseCharismaBonus * 0.8) + this.props.passiveCharismaBonus),
        activeMoneyBonusCha: ((this.state.baseCharismaBonus / 2) + this.props.activeMoneyBonusCha),
        passivePowerBonus: ((this.state.baseCharismaBonus / 2) + this.props.passivePowerBonus),
        charismaCount: this.state.charismaCount + 1
      });
    }

    if (this.state.charismaLevel === 9){
      this.setState({
        activeCharismaBonus: (this.state.baseCharismaBonus + this.props.activeCharismaBonus),
        passiveCharismaBonus: (this.state.baseCharismaBonus + this.props.passiveCharismaBonus),
        passivePowerBonus: (this.props.passivePowerBonus),
        activeMoneyBonusCha: (this.props.activeMoneyBonusCha),
        charismaCount: this.state.charismaCount + 1
      });
    }
  }

  processNums(){
    this.processCostNum();
    this.processActiveBonusNum();
    this.processPassiveBonusNum();
    this.processActiveMoneyNum();
    this.processPassivePowerNum();
  }

  processCostNum() {
    this.setState({ costString: `${Math.trunc(this.state.charismaCost)}` });
    if (this.state.charismaCost >= 1000000000000000000000000000000000) {
      this.setState({ costString: `${Math.trunc(this.state.charismaCost / 10000000000000000000000000000000) / 100}D` });
    } else if (this.state.charismaCost >= 1000000000000000000000000000000) {
      this.setState({ costString: `${Math.trunc(this.state.charismaCost / 10000000000000000000000000000) / 100}N` });
    } else if (this.state.charismaCost >= 1000000000000000000000000000) {
      this.setState({ costString: `${Math.trunc(this.state.charismaCost / 10000000000000000000000000) / 100}O` });
    } else if (this.state.charismaCost >= 100000000000000000000000) {
      this.setState({ costString: `${Math.trunc(this.state.charismaCost / 10000000000000000000000) / 100}Sp` });
    } else if (this.state.charismaCost >= 1000000000000000000000) {
      this.setState({ costString: `${Math.trunc(this.state.charismaCost / 10000000000000000000) / 100}Sx` });
    } else if (this.state.charismaCost >= 1000000000000000000) {
      this.setState({ costString: `${Math.trunc(this.state.charismaCost / 10000000000000000) / 100}Qt` });
    } else if (this.state.charismaCost >= 1000000000000000) {
      this.setState({ costString: `${Math.trunc(this.state.charismaCost / 10000000000000) / 100}Qd` });
    } else if (this.state.charismaCost >= 1000000000000) {
      this.setState({ costString: `${Math.trunc(this.state.charismaCost / 10000000000) / 100}T` });
    } else if (this.state.charismaCost >= 1000000000) {
      this.setState({ costString: `${Math.trunc(this.state.charismaCost / 10000000) / 100}B` });
    } else if (this.state.charismaCost >= 1000000) {
      this.setState({ costString: `${Math.trunc(this.state.charismaCost / 10000) / 100}M` });
    } else if (this.state.charismaCost >= 1000) {
      this.setState({ costString: `${Math.trunc(this.state.charismaCost / 10) / 100}K` });
    }
  }

  processActiveBonusNum() {
    let multiplier;
    if ((this.state.charismaLevel === 2) || (this.state.charismaLevel === 4)){
      multiplier = 0.75;
    } else if ((this.state.charismaLevel === 6) || (this.state.charismaLevel === 8)){
      multiplier = 0.8;
    } else {
      multiplier = 1;
    }

    this.setState({ activeBonusString: `${Math.trunc((this.state.baseCharismaBonus * (this.state.charismaCount + 1) * multiplier))}` });
    if (((this.state.baseCharismaBonus * (this.state.charismaCount + 1)) * multiplier) >= 1000000000000000000000000000000000) {
      this.setState({ activeBonusString: `${(Math.trunc((this.state.baseCharismaBonus * (this.state.charismaCount + 1) * multiplier) / 10000000000000000000000000000000)) / 100}D` });
    } else if (((this.state.baseCharismaBonus * (this.state.charismaCount + 1)) * multiplier) >= 1000000000000000000000000000000) {
      this.setState({ activeBonusString: `${(Math.trunc((this.state.baseCharismaBonus * (this.state.charismaCount + 1) * multiplier) / 10000000000000000000000000000)) / 100}N` });
    } else if (((this.state.baseCharismaBonus * (this.state.charismaCount + 1)) * multiplier) >= 1000000000000000000000000000) {
      this.setState({ activeBonusString: `${(Math.trunc((this.state.baseCharismaBonus * (this.state.charismaCount + 1) * multiplier) / 10000000000000000000000000)) / 100}O` });
    } else if (((this.state.baseCharismaBonus * (this.state.charismaCount + 1)) * multiplier) >= 100000000000000000000000) {
      this.setState({ activeBonusString: `${(Math.trunc((this.state.baseCharismaBonus * (this.state.charismaCount + 1) * multiplier) / 10000000000000000000000)) / 100}Sp` });
    } else if (((this.state.baseCharismaBonus * (this.state.charismaCount + 1)) * multiplier) >= 1000000000000000000000) {
      this.setState({ activeBonusString: `${(Math.trunc((this.state.baseCharismaBonus * (this.state.charismaCount + 1) * multiplier) / 10000000000000000000)) / 100}Sx` });
    } else if (((this.state.baseCharismaBonus * (this.state.charismaCount + 1)) * multiplier) >= 1000000000000000000) {
      this.setState({ activeBonusString: `${(Math.trunc((this.state.baseCharismaBonus * (this.state.charismaCount + 1) * multiplier) / 10000000000000000)) / 100}Qt` });
    } else if (((this.state.baseCharismaBonus * (this.state.charismaCount + 1)) * multiplier) >= 1000000000000000){
      this.setState({ activeBonusString: `${(Math.trunc((this.state.baseCharismaBonus * (this.state.charismaCount + 1) * multiplier) / 10000000000000)) / 100}Qd` });
    } else if (((this.state.baseCharismaBonus * (this.state.charismaCount + 1)) * multiplier) >= 1000000000000) {
      this.setState({ activeBonusString: `${(Math.trunc((this.state.baseCharismaBonus * (this.state.charismaCount + 1) * multiplier) / 10000000000)) / 100}T` });
    } else if (((this.state.baseCharismaBonus * (this.state.charismaCount + 1)) * multiplier) >= 1000000000) {
      this.setState({ activeBonusString: `${(Math.trunc((this.state.baseCharismaBonus * (this.state.charismaCount + 1) * multiplier) / 10000000)) / 100}B` });
    } else if (((this.state.baseCharismaBonus * (this.state.charismaCount + 1)) * multiplier) >= 1000000) {
      this.setState({ activeBonusString: `${(Math.trunc((this.state.baseCharismaBonus * (this.state.charismaCount + 1) * multiplier) / 10000)) / 100}M` });
    } else if (((this.state.baseCharismaBonus * (this.state.charismaCount + 1)) * multiplier) >= 1000) {
      this.setState({ activeBonusString: `${(Math.trunc((this.state.baseCharismaBonus * (this.state.charismaCount + 1) * multiplier) / 10)) / 100}K` });
    }
  }

  processPassiveBonusNum() {
    let multiplier;
    if (this.state.charismaLevel === 8) {
      multiplier = 0.8;
    } else if (this.state.charismaLevel === 9){
      multiplier = 1;
    } else {
      multiplier = 0;
    }

    this.setState({ passiveBonusString: `${Math.trunc((this.state.baseCharismaBonus * (this.state.charismaCount + 1)) * multiplier)}` });
    if (((this.state.baseCharismaBonus * (this.state.charismaCount + 1)) * multiplier) >= 1000000000000000000000000000000000) {
      this.setState({ passiveBonusString: `${(Math.trunc(((this.state.baseCharismaBonus * (this.state.charismaCount + 1)) * multiplier) / 10000000000000000000000000000000)) / 100}D` });
    } else if (((this.state.baseCharismaBonus * (this.state.charismaCount + 1)) * multiplier) >= 1000000000000000000000000000000) {
      this.setState({ passiveBonusString: `${(Math.trunc(((this.state.baseCharismaBonus * (this.state.charismaCount + 1)) * multiplier) / 10000000000000000000000000000)) / 100}N` });
    } else if (((this.state.baseCharismaBonus * (this.state.charismaCount + 1)) * multiplier) >= 1000000000000000000000000000) {
      this.setState({ passiveBonusString: `${(Math.trunc(((this.state.baseCharismaBonus * (this.state.charismaCount + 1)) * multiplier) / 10000000000000000000000000)) / 100}O` });
    } else if (((this.state.baseCharismaBonus * (this.state.charismaCount + 1)) * multiplier) >= 100000000000000000000000) {
      this.setState({ passiveBonusString: `${(Math.trunc(((this.state.baseCharismaBonus * (this.state.charismaCount + 1)) * multiplier) / 10000000000000000000000)) / 100}Sp` });
    } else if (((this.state.baseCharismaBonus * (this.state.charismaCount + 1)) * multiplier) >= 1000000000000000000000) {
      this.setState({ passiveBonusString: `${(Math.trunc(((this.state.baseCharismaBonus * (this.state.charismaCount + 1)) * multiplier) / 10000000000000000000)) / 100}Sx` });
    } else if (((this.state.baseCharismaBonus * (this.state.charismaCount + 1)) * multiplier) >= 1000000000000000000) {
      this.setState({ passiveBonusString: `${(Math.trunc(((this.state.baseCharismaBonus * (this.state.charismaCount + 1)) * multiplier) / 10000000000000000)) / 100}Qt` });
    } else if (((this.state.baseCharismaBonus * (this.state.charismaCount + 1)) * multiplier) >= 1000000000000000) {
      this.setState({ passiveBonusString: `${(Math.trunc(((this.state.baseCharismaBonus * (this.state.charismaCount + 1)) * multiplier) / 10000000000000))/ 100}Qd` });
    } else if (((this.state.baseCharismaBonus * (this.state.charismaCount + 1)) * multiplier) >= 1000000000000) {
      this.setState({ passiveBonusString: `${(Math.trunc(((this.state.baseCharismaBonus * (this.state.charismaCount + 1)) * multiplier) / 10000000000)) / 100}T` });
    } else if (((this.state.baseCharismaBonus * (this.state.charismaCount + 1)) * multiplier) >= 1000000000) {
      this.setState({ passiveBonusString: `${(Math.trunc(((this.state.baseCharismaBonus * (this.state.charismaCount + 1)) * multiplier) / 10000000)) / 100}B` });
    } else if (((this.state.baseCharismaBonus * (this.state.charismaCount + 1)) * multiplier) >= 1000000) {
      this.setState({ passiveBonusString: `${(Math.trunc(((this.state.baseCharismaBonus * (this.state.charismaCount + 1)) * multiplier) / 10000)) / 100}M` });
    } else if (((this.state.baseCharismaBonus * (this.state.charismaCount + 1)) * multiplier) >= 1000) {
      this.setState({ passiveBonusString: `${(Math.trunc(((this.state.baseCharismaBonus * (this.state.charismaCount + 1)) * multiplier) / 10)) / 100}K` });
    }
  }

  processActiveMoneyNum() {
    let multiplier;
    if ((this.state.charismaLevel === 8) || (this.state.charismaLevel === 6 ) || (this.state.charismaLevel === 4)) {
      multiplier = 0.5;
    } else {
      multiplier = 0;
    }

    this.setState({ moneyBonusString: `${Math.trunc((this.state.baseCharismaBonus * (this.state.charismaCount + 1)) * multiplier)}` });
    if (((this.state.baseCharismaBonus * (this.state.charismaCount + 1)) * multiplier) >= 1000000000000000000000000000000000) {
      this.setState({ moneyBonusString: `${(Math.trunc(((this.state.baseCharismaBonus * (this.state.charismaCount + 1)) * multiplier) / 10000000000000000000000000000000)) / 100}D` });
    } else if (((this.state.baseCharismaBonus * (this.state.charismaCount + 1)) * multiplier) >= 1000000000000000000000000000000) {
      this.setState({ moneyBonusString: `${(Math.trunc(((this.state.baseCharismaBonus * (this.state.charismaCount + 1)) * multiplier) / 10000000000000000000000000000)) / 100}N` });
    } else if (((this.state.baseCharismaBonus * (this.state.charismaCount + 1)) * multiplier) >= 1000000000000000000000000000) {
      this.setState({ moneyBonusString: `${(Math.trunc(((this.state.baseCharismaBonus * (this.state.charismaCount + 1)) * multiplier) / 10000000000000000000000000)) / 100}O` });
    } else if (((this.state.baseCharismaBonus * (this.state.charismaCount + 1)) * multiplier) >= 100000000000000000000000) {
      this.setState({ moneyBonusString: `${(Math.trunc(((this.state.baseCharismaBonus * (this.state.charismaCount + 1)) * multiplier) / 10000000000000000000000)) / 100}Sp` });
    } else if (((this.state.baseCharismaBonus * (this.state.charismaCount + 1)) * multiplier) >= 1000000000000000000000) {
      this.setState({ moneyBonusString: `${(Math.trunc(((this.state.baseCharismaBonus * (this.state.charismaCount + 1)) * multiplier) / 10000000000000000000)) / 100}Sx` });
    } else if (((this.state.baseCharismaBonus * (this.state.charismaCount + 1)) * multiplier) >= 1000000000000000000) {
      this.setState({ moneyBonusString: `${(Math.trunc(((this.state.baseCharismaBonus * (this.state.charismaCount + 1)) * multiplier) / 10000000000000000)) / 100}Qt` });
    } else if (((this.state.baseCharismaBonus * (this.state.charismaCount + 1)) * multiplier) >= 1000000000000000) {
      this.setState({ moneyBonusString: `${(Math.trunc(((this.state.baseCharismaBonus * (this.state.charismaCount + 1)) * multiplier) / 10000000000000)) / 100}Qd` });
    } else if (((this.state.baseCharismaBonus * (this.state.charismaCount + 1)) * multiplier) >= 1000000000000) {
      this.setState({ moneyBonusString: `${(Math.trunc(((this.state.baseCharismaBonus * (this.state.charismaCount + 1)) * multiplier) / 10000000000)) / 100}T` });
    } else if (((this.state.baseCharismaBonus * (this.state.charismaCount + 1)) * multiplier) >= 1000000000) {
      this.setState({ moneyBonusString: `${(Math.trunc(((this.state.baseCharismaBonus * (this.state.charismaCount + 1)) * multiplier) / 10000000)) / 100}B` });
    } else if (((this.state.baseCharismaBonus * (this.state.charismaCount + 1)) * multiplier) >= 1000000) {
      this.setState({ moneyBonusString: `${(Math.trunc(((this.state.baseCharismaBonus * (this.state.charismaCount + 1)) * multiplier) / 10000)) / 100}M` });
    } else if (((this.state.baseCharismaBonus * (this.state.charismaCount + 1)) * multiplier) >= 1000) {
      this.setState({ moneyBonusString: `${(Math.trunc(((this.state.baseCharismaBonus * (this.state.charismaCount + 1)) * multiplier) / 10)) / 100}K` });
    }
  }

  processPassivePowerNum() {
    let multiplier;
    if ((this.state.charismaLevel === 8) || (this.state.charismaLevel === 6) || (this.state.charismaLevel === 2)) {
      multiplier = 0.5;
    } else {
      multiplier = 0;
    }

    this.setState({ powerBonusString: `${Math.trunc((this.state.baseCharismaBonus * (this.state.charismaCount + 1)) * multiplier)}` });
    if (((this.state.baseCharismaBonus * (this.state.charismaCount + 1)) * multiplier) >= 1000000000000000000000000000000000) {
      this.setState({ powerBonusString: `${(Math.trunc(((this.state.baseCharismaBonus * (this.state.charismaCount + 1)) * multiplier) / 10000000000000000000000000000000)) / 100}D` });
    } else if (((this.state.baseCharismaBonus * (this.state.charismaCount + 1)) * multiplier) >= 1000000000000000000000000000000) {
      this.setState({ powerBonusString: `${(Math.trunc(((this.state.baseCharismaBonus * (this.state.charismaCount + 1)) * multiplier) / 10000000000000000000000000000)) / 100}N` });
    } else if (((this.state.baseCharismaBonus * (this.state.charismaCount + 1)) * multiplier) >= 1000000000000000000000000000) {
      this.setState({ powerBonusString: `${(Math.trunc(((this.state.baseCharismaBonus * (this.state.charismaCount + 1)) * multiplier) / 10000000000000000000000000)) / 100}O` });
    } else if (((this.state.baseCharismaBonus * (this.state.charismaCount + 1)) * multiplier) >= 100000000000000000000000) {
      this.setState({ powerBonusString: `${(Math.trunc(((this.state.baseCharismaBonus * (this.state.charismaCount + 1)) * multiplier) / 10000000000000000000000)) / 100}Sp` });
    } else if (((this.state.baseCharismaBonus * (this.state.charismaCount + 1)) * multiplier) >= 1000000000000000000000) {
      this.setState({ powerBonusString: `${(Math.trunc(((this.state.baseCharismaBonus * (this.state.charismaCount + 1)) * multiplier) / 10000000000000000000)) / 100}Sx` });
    } else if (((this.state.baseCharismaBonus * (this.state.charismaCount + 1)) * multiplier) >= 1000000000000000000) {
      this.setState({ powerBonusString: `${(Math.trunc(((this.state.baseCharismaBonus * (this.state.charismaCount + 1)) * multiplier) / 10000000000000000)) / 100}Qt` });
    } else if (((this.state.baseCharismaBonus * (this.state.charismaCount + 1)) * multiplier) >= 1000000000000000) {
      this.setState({ powerBonusString: `${(Math.trunc(((this.state.baseCharismaBonus * (this.state.charismaCount + 1)) * multiplier) / 10000000000000)) / 100}Qd` });
    } else if (((this.state.baseCharismaBonus * (this.state.charismaCount + 1)) * multiplier) >= 1000000000000) {
      this.setState({ powerBonusString: `${(Math.trunc(((this.state.baseCharismaBonus * (this.state.charismaCount + 1)) * multiplier) / 10000000000)) / 100}T` });
    } else if (((this.state.baseCharismaBonus * (this.state.charismaCount + 1)) * multiplier) >= 1000000000) {
      this.setState({ powerBonusString: `${(Math.trunc(((this.state.baseCharismaBonus * (this.state.charismaCount + 1)) * multiplier) / 10000000)) / 100}B` });
    } else if (((this.state.baseCharismaBonus * (this.state.charismaCount + 1)) * multiplier) >= 1000000) {
      this.setState({ powerBonusString: `${(Math.trunc(((this.state.baseCharismaBonus * (this.state.charismaCount + 1)) * multiplier) / 10000)) / 100}M` });
    } else if (((this.state.baseCharismaBonus * (this.state.charismaCount + 1)) * multiplier) >= 1000) {
      this.setState({ powerBonusString: `${(Math.trunc(((this.state.baseCharismaBonus * (this.state.charismaCount + 1)) * multiplier) / 10)) / 100}K` });
    }
  }

  handleHover() {
    this.processNums();
    this.setState({ hover: true });
  }

  handleUnhover() {
    this.setState({ hover: false });
  }


  giveState() {
    this.props.stateGrab("activeCharismaBonus", this.state.activeCharismaBonus);
    this.props.stateGrab("passiveCharismaBonus", this.state.passiveCharismaBonus);
    this.props.stateGrab("Charisma", this.state.Charisma);
    this.props.stateGrab(`charismaCost${this.state.charismaLevel}`, this.state.charismaCost);
    this.props.stateGrab(`charismaCount${this.state.charismaLevel}`, this.state.charismaCount);
    if ((this.state.charismaLevel === 2) || (this.state.charismaLevel === 6) || (this.state.charismaLevel === 8)){
      this.props.stateGrab("passivePowerBonus", this.state.passivePowerBonus);
    }

    if ((this.state.charismaLevel === 4) || (this.state.charismaLevel === 6) || (this.state.charismaLevel === 8)){
      this.props.stateGrab("activeMoneyBonusCha", this.state.activeMoneyBonusCha);
    }
  }

  render() {
    if ((this.state.advanced === true && this.props.eventLevel < 10) || (this.state.capstone === true && this.props.eventLevel < 19)) {
      return(
        <div className="greenProducerBox">
          <div className="greenProducerButton">
            <p className="greenButtonText">This friend is locked until you've done more stuff</p>
          </div>
        </div>
      );
    } else {
      let text = [
        "Get Bigger Charisma",
        "Hrothgar Axepuncher",
        "Fashion Training",
        "Countess Ducata",
        "Become More Enchanting",
        "Duke Firechill",
        "Scroll of Glamour",
        "Mysterious Fae Princess",
        "Get Even Bigger Charisma"]

      let bonusText = [
        "Active Charisma",
        "Passive Charisma",
        "Passive Power",
        "Active Money"
      ]

      let bonusType;
      let bonusValue = [
        this.state.activeBonusString,
        this.state.passiveBonusString,
        this.state.moneyBonusString,
        this.state.powerBonusString
      ]

      let bonusString;

      if (this.state.charismaLevel === 9) {
        bonusType = `${bonusText[0]} ${bonusText[1]}`;
        bonusString = `${bonusValue[0]} on click, ${bonusValue[1]} per sec`;
      } else if (this.state.charismaLevel === 8){
        bonusType = `${bonusText[0]}, ${bonusText[1]}, ${bonusText[2]}, ${bonusText[3]}`;
        bonusString = `${bonusValue[0]} on click, ${bonusValue[1]} per sec, ${bonusValue[2]} on Money click, ${bonusValue[3]} Power per sec`;
      } else if (this.state.charismaLevel === 6){
        bonusType = `${bonusText[0]}, ${bonusText[2]}, ${bonusText[3]}`;
        bonusString = `${bonusValue[0]} on click, ${bonusValue[2]} on Money click, ${bonusValue[3]} Power per sec`;
      } else if (this.state.charismaLevel === 4){
        bonusType = `${bonusText[0]}, ${bonusText[3]}`;
        bonusString = `${bonusValue[0]} on click, ${bonusValue[2]} on Money click}`;
      } else if (this.state.charismaLevel === 2){
        bonusType = `${bonusText[0]}, ${bonusText[2]}`;
        bonusString = `${bonusValue[0]} on click, ${bonusValue[3]} Power per sec`;
      } else{
        bonusType = `${bonusText[0]}`;
        bonusString = `${bonusValue[0]} on click`;
      }

      let display = "hidden";
      if (this.state.hover) {
        display = "visibleGreen";
      } else {
        display = "hidden";
      }

      return (
        <div className="greenProducerBox">
          <div className="greenProducerButton" onClick={this.purchase} onMouseEnter={this.handleHover} onMouseLeave={this.handleUnhover}>
          <p className="greenButtonText">{text[this.state.charismaLevel - 1]}</p>
          <p className="greenButtonText">Count: {this.state.charismaCount}</p>
          <p className="greenButtonText">Cost: {this.state.costString}</p>
          <div className={display}>
            <span className="greenToolText">Bonus: {bonusType}</span>
            <span className="greenToolText">Rate: {bonusString}</span>
          </div>
          </div>
          <span className="errors">{this.state.errors}</span>
        </div>
      );
    }
  }
}

export default GreenProducer;