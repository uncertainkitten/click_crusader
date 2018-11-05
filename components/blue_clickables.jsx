// Component for clickable items - will render a canvas with lots of fancy on-click changes
// Will pass state up to Game to pass down to resources
// Game will essentially act as the source of truth

import React from 'react';
class BlueClickable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Money: this.props.Money
    }
    this.addMoney = this.addMoney.bind(this);
    this.passiveMoneyUp = this.passiveMoneyUp.bind(this);
    this.cashCanv = React.createRef();
    this.passiveMoney = setInterval(this.passiveMoneyUp, 1000);
    this.hoverMoney = this.hoverMoney.bind(this);
    this.unhoverMoney = this.unhoverMoney.bind(this);
  }

  componentDidMount() {
    this.updateCanvas(this.blingBlingZero());
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state !== prevState) {
      this.giveState();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.Money !== nextProps.Money) {
      this.setState({ Money: nextProps.Money });
    }
  }

  componentWillUnmount() {
    clearInterval(this.passiveMoney);
  }

  updateCanvas(frame) {
    frame;
  }

  blingBlingZero(){
    const ctx = this.cashCanv.current.getContext("2d");
    ctx.clearRect(0, 0, 150, 150);
    // coin outer line
    var coinGrad = ctx.createLinearGradient(0, 0, 149, 149);
    coinGrad.addColorStop(0, "#4444FF");
    coinGrad.addColorStop(0.5, "#2222AA");
    coinGrad.addColorStop(1, "#222244");
    ctx.strokeStyle = "black";
    ctx.fillStyle = coinGrad;
    ctx.lineWidth = 2.0;
    ctx.beginPath();
    ctx.arc(75, 75, 55, 0, Math.PI * 2, false);
    ctx.fill();
    ctx.stroke();
    ctx.closePath();

    // coin inner line
    ctx.strokeStyle = "black";
    ctx.fillStyle = coinGrad;
    ctx.lineWidth = 2.0;
    ctx.beginPath();
    ctx.arc(75, 75, 45, 0, Math.PI * 2, false);
    ctx.stroke();
    ctx.closePath();

    //dolla sign
    ctx.strokeStyle = "gold";
    ctx.lineWidth = 2.0;
    ctx.beginPath();
    ctx.arc(75, 65, 10, Math.PI * 0.4, Math.PI * 1.8, false);
    ctx.stroke();
    ctx.closePath();

    ctx.strokeStyle = "gold";
    ctx.lineWidth = 2.0;
    ctx.beginPath();
    ctx.arc(74, 85, 10, Math.PI * 0.8, Math.PI * 1.4, true);
    ctx.stroke();
    ctx.closePath();

    ctx.strokeStyle = "gold";
    ctx.lineWidth = 2.0;
    ctx.beginPath();
    ctx.moveTo(70, 50);
    ctx.lineTo(70, 100);
    ctx.stroke();
    ctx.closePath();

    ctx.strokeStyle = "gold";
    ctx.lineWidth = 2.0;
    ctx.beginPath();
    ctx.moveTo(80, 50);
    ctx.lineTo(80, 100);
    ctx.stroke();
    ctx.closePath();
  }


  blingBlingOne() {
    const ctx = this.cashCanv.current.getContext("2d");
    ctx.clearRect(0, 0, 150, 150);
    // coin outer line
    var coinGrad = ctx.createLinearGradient(0, 0, 149, 149);
    coinGrad.addColorStop(0, "gold");
    coinGrad.addColorStop(0.5, "#2222AA");
    coinGrad.addColorStop(1, "#222222");
    ctx.strokeStyle = "black";
    ctx.fillStyle = coinGrad;
    ctx.lineWidth = 2.0;
    ctx.beginPath();
    ctx.arc(75, 75, 65, 0, Math.PI * 2, false);
    ctx.fill();
    ctx.stroke();
    ctx.closePath();

    // coin inner line
    ctx.strokeStyle = "black";
    ctx.fillStyle = coinGrad;
    ctx.lineWidth = 2.0;
    ctx.beginPath();
    ctx.arc(75, 75, 55, 0, Math.PI * 2, false);
    ctx.stroke();
    ctx.closePath();

    //dolla sign
    ctx.strokeStyle = "gold";
    ctx.lineWidth = 5.0;
    ctx.beginPath();
    ctx.arc(75, 55, 20, Math.PI * 0.4, Math.PI * 1.8, false);
    ctx.stroke();
    ctx.closePath();

    ctx.strokeStyle = "gold";
    ctx.lineWidth = 5.0;
    ctx.beginPath();
    ctx.arc(74, 95, 20, Math.PI * 0.8, Math.PI * 1.4, true);
    ctx.stroke();
    ctx.closePath();

    ctx.strokeStyle = "gold";
    ctx.lineWidth = 5.0;
    ctx.beginPath();
    ctx.moveTo(65, 20);
    ctx.lineTo(65, 130);
    ctx.stroke();
    ctx.closePath();

    ctx.strokeStyle = "gold";
    ctx.lineWidth = 5.0;
    ctx.beginPath();
    ctx.moveTo(85, 20);
    ctx.lineTo(85, 130);
    ctx.stroke();
    ctx.closePath();
  }

  getRandomY() {
    return Math.floor(Math.random() * Math.floor(65)) + 75;
  }

  getRandomX(){
    return Math.floor(Math.random() * Math.floor(100)) + 20;
  }

  blingBlingTwo() {
    const ctx = this.cashCanv.current.getContext("2d");
    ctx.clearRect(0, 0, 150, 150);
    // smol coins
    var coinGrad = ctx.createLinearGradient(0, 0, 149, 149);
    coinGrad.addColorStop(0, "gold");
    coinGrad.addColorStop(0.5, "#2222AA");
    coinGrad.addColorStop(1, "#222222");
    ctx.strokeStyle = "black";
    ctx.fillStyle = "gold";
    ctx.lineWidth = 2.0;
    ctx.beginPath();
    ctx.arc(130, 140, 8, 0, Math.PI * 2, false);
    ctx.fill();
    ctx.stroke();
    ctx.closePath();

    ctx.strokeStyle = "black";
    ctx.fillStyle = "gold";
    ctx.lineWidth = 2.0;
    ctx.beginPath();
    ctx.arc(this.getRandomX(), this.getRandomY(), 8, 0, Math.PI * 2, false);
    ctx.fill();
    ctx.stroke();
    ctx.closePath();

    ctx.strokeStyle = "black";
    ctx.fillStyle = "gold";
    ctx.lineWidth = 2.0;
    ctx.beginPath();
    ctx.arc(this.getRandomX(), this.getRandomY(), 8, 0, Math.PI * 2, false);
    ctx.fill();
    ctx.stroke();
    ctx.closePath();

    ctx.strokeStyle = "black";
    ctx.fillStyle = "gold";
    ctx.lineWidth = 2.0;
    ctx.beginPath();
    ctx.arc(this.getRandomX(), this.getRandomY(), 8, 0, Math.PI * 2, false);
    ctx.fill();
    ctx.stroke();
    ctx.closePath();

    ctx.strokeStyle = "black";
    ctx.fillStyle = "gold";
    ctx.lineWidth = 2.0;
    ctx.beginPath();
    ctx.arc(this.getRandomX(), this.getRandomY(), 8, 0, Math.PI * 2, false);
    ctx.fill();
    ctx.stroke();
    ctx.closePath();

    ctx.strokeStyle = "black";
    ctx.fillStyle = "gold";
    ctx.lineWidth = 2.0;
    ctx.beginPath();
    ctx.arc(this.getRandomX(), this.getRandomY(), 8, 0, Math.PI * 2, false);
    ctx.fill();
    ctx.stroke();
    ctx.closePath();

    ctx.strokeStyle = "black";
    ctx.fillStyle = "gold";
    ctx.lineWidth = 2.0;
    ctx.beginPath();
    ctx.arc(20, 140, 8, 0, Math.PI * 2, false);
    ctx.fill();
    ctx.stroke();
    ctx.closePath();

    ctx.strokeStyle = "black";
    ctx.fillStyle = "gold";
    ctx.lineWidth = 2.0;
    ctx.beginPath();
    ctx.arc(this.getRandomX(), this.getRandomY(), 8, 0, Math.PI * 2, false);
    ctx.fill();
    ctx.stroke();
    ctx.closePath();

    ctx.strokeStyle = "black";
    ctx.fillStyle = "gold";
    ctx.lineWidth = 2.0;
    ctx.beginPath();
    ctx.arc(this.getRandomX(), this.getRandomY(), 8, 0, Math.PI * 2, false);
    ctx.fill();
    ctx.stroke();
    ctx.closePath();

    ctx.strokeStyle = "black";
    ctx.fillStyle = "gold";
    ctx.lineWidth = 2.0;
    ctx.beginPath();
    ctx.arc(20, 125, 8, 0, Math.PI * 2, false);
    ctx.fill();
    ctx.stroke();
    ctx.closePath();

    ctx.strokeStyle = "black";
    ctx.fillStyle = "gold";
    ctx.lineWidth = 2.0;
    ctx.beginPath();
    ctx.arc(this.getRandomX(), this.getRandomY(), 8, 0, Math.PI * 2, false);
    ctx.fill();
    ctx.stroke();
    ctx.closePath();

    ctx.strokeStyle = "black";
    ctx.fillStyle = "gold";
    ctx.lineWidth = 2.0;
    ctx.beginPath();
    ctx.arc(this.getRandomX(), this.getRandomY(), 8, 0, Math.PI * 2, false);
    ctx.fill();
    ctx.stroke();
    ctx.closePath();

    ctx.strokeStyle = "black";
    ctx.fillStyle = "gold";
    ctx.lineWidth = 2.0;
    ctx.beginPath();
    ctx.arc(this.getRandomX(), this.getRandomY(), 8, 0, Math.PI * 2, false);
    ctx.fill();
    ctx.stroke();
    ctx.closePath();

    ctx.strokeStyle = "black";
    ctx.fillStyle = "gold";
    ctx.lineWidth = 2.0;
    ctx.beginPath();
    ctx.arc(this.getRandomX(), this.getRandomY(), 8, 0, Math.PI * 2, false);
    ctx.fill();
    ctx.stroke();
    ctx.closePath();

    ctx.strokeStyle = "black";
    ctx.fillStyle = "gold";
    ctx.lineWidth = 2.0;
    ctx.beginPath();
    ctx.arc(this.getRandomX(), this.getRandomY(), 8, 0, Math.PI * 2, false);
    ctx.fill();
    ctx.stroke();
    ctx.closePath();

    ctx.strokeStyle = "black";
    ctx.fillStyle = "gold";
    ctx.lineWidth = 2.0;
    ctx.beginPath();
    ctx.arc(this.getRandomX(), this.getRandomY(), 8, 0, Math.PI * 2, false);
    ctx.fill();
    ctx.stroke();
    ctx.closePath();

    ctx.strokeStyle = "black";
    ctx.fillStyle = "gold";
    ctx.lineWidth = 2.0;
    ctx.beginPath();
    ctx.arc(this.getRandomX(), this.getRandomY(), 8, 0, Math.PI * 2, false);
    ctx.fill();
    ctx.stroke();
    ctx.closePath();

    ctx.strokeStyle = "black";
    ctx.fillStyle = "gold";
    ctx.lineWidth = 2.0;
    ctx.beginPath();
    ctx.arc(this.getRandomX(), this.getRandomY(), 8, 0, Math.PI * 2, false);
    ctx.fill();
    ctx.stroke();
    ctx.closePath();

    ctx.strokeStyle = "black";
    ctx.fillStyle = "gold";
    ctx.lineWidth = 2.0;
    ctx.beginPath();
    ctx.arc(this.getRandomX(), this.getRandomY(), 8, 0, Math.PI * 2, false);
    ctx.fill();
    ctx.stroke();
    ctx.closePath();

    ctx.strokeStyle = "black";
    ctx.fillStyle = "gold";
    ctx.lineWidth = 2.0;
    ctx.beginPath();
    ctx.arc(this.getRandomX(), this.getRandomY(), 8, 0, Math.PI * 2, false);
    ctx.fill();
    ctx.stroke();
    ctx.closePath();

    ctx.strokeStyle = "black";
    ctx.fillStyle = "gold";
    ctx.lineWidth = 2.0;
    ctx.beginPath();
    ctx.arc(this.getRandomX(), this.getRandomY(), 8, 0, Math.PI * 2, false);
    ctx.fill();
    ctx.stroke();
    ctx.closePath();

    ctx.strokeStyle = "black";
    ctx.fillStyle = "gold";
    ctx.lineWidth = 2.0;
    ctx.beginPath();
    ctx.arc(this.getRandomX(), this.getRandomY(), 8, 0, Math.PI * 2, false);
    ctx.fill();
    ctx.stroke();
    ctx.closePath();

    ctx.strokeStyle = "black";
    ctx.fillStyle = "gold";
    ctx.lineWidth = 2.0;
    ctx.beginPath();
    ctx.arc(this.getRandomX(), this.getRandomY(), 8, 0, Math.PI * 2, false);
    ctx.fill();
    ctx.stroke();
    ctx.closePath();

    ctx.strokeStyle = "black";
    ctx.fillStyle = "gold";
    ctx.lineWidth = 2.0;
    ctx.beginPath();
    ctx.arc(this.getRandomX(), this.getRandomY(), 8, 0, Math.PI * 2, false);
    ctx.fill();
    ctx.stroke();
    ctx.closePath();

    ctx.strokeStyle = "black";
    ctx.fillStyle = "gold";
    ctx.lineWidth = 2.0;
    ctx.beginPath();
    ctx.arc(this.getRandomX(), this.getRandomY(), 8, 0, Math.PI * 2, false);
    ctx.fill();
    ctx.stroke();
    ctx.closePath();

    ctx.strokeStyle = "black";
    ctx.fillStyle = "gold";
    ctx.lineWidth = 2.0;
    ctx.beginPath();
    ctx.arc(this.getRandomX(), this.getRandomY(), 8, 0, Math.PI * 2, false);
    ctx.fill();
    ctx.stroke();
    ctx.closePath();

    ctx.strokeStyle = "black";
    ctx.fillStyle = "gold";
    ctx.lineWidth = 2.0;
    ctx.beginPath();
    ctx.arc(this.getRandomX(), this.getRandomY(), 8, 0, Math.PI * 2, false);
    ctx.fill();
    ctx.stroke();
    ctx.closePath();

    ctx.strokeStyle = "black";
    ctx.fillStyle = "gold";
    ctx.lineWidth = 2.0;
    ctx.beginPath();
    ctx.arc(135, 125, 8, 0, Math.PI * 2, false);
    ctx.fill();
    ctx.stroke();
    ctx.closePath();
  }
  addMoney() {
    this.setState({ Money: this.state.Money + ((this.props.passiveMoneyBonus + this.props.activeMoneyBonusCha) * (this.props.activeMoneyBonus)) });
    this.updateCanvas(this.blingBlingTwo());
  }

  passiveMoneyUp() {
    this.setState({ Money: this.state.Money + this.props.passiveMoneyBonus});
  }

  giveState() {
    this.props.stateGrab("Money", this.state.Money);
  }

  hoverMoney() {
    this.updateCanvas(this.blingBlingOne());
  }

  unhoverMoney() {
    this.updateCanvas(this.blingBlingZero());
  }

  render() {
    return (
      <div className="clickBox">
        <canvas
          ref={this.cashCanv}
          width={150}
          height={150}
          className="cashCanv"
          onMouseDown={this.addMoney}
          onMouseUp={this.hoverMoney}
          onMouseEnter={this.hoverMoney}
          onMouseLeave={this.unhoverMoney}
        />
      </div>
    );
  }
}

export default BlueClickable;