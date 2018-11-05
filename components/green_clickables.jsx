// Component for clickable items - will render a canvas with lots of fancy on-click changes
// Will pass state up to Game to pass down to resources
// Game will essentially act as the source of truth

import React from 'react';
class GreenClickable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Charisma: this.props.Charisma
    }
    this.addCharisma = this.addCharisma.bind(this);
    this.buddyCanv = React.createRef();
    this.passiveCharismaUp = this.passiveCharismaUp.bind(this);
    this.passiveCharisma = setInterval(this.passiveCharismaUp, 1000);
    this.hoverCharisma = this.hoverCharisma.bind(this);
    this.unhoverCharisma = this.unhoverCharisma.bind(this);
  }

  componentDidMount() {
    this.updateCanvas(this.friendshipZero());
  }


  componentDidUpdate(prevProps, prevState) {
    if (this.state !== prevState) {
      this.giveState();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.Charisma !== nextProps.Charisma) {
      this.setState({ Charisma: nextProps.Charisma });
    }
  }

  componentWillUnmount() {
    clearInterval(this.passiveCharisma);
  }

  updateCanvas(frame) {
    frame;
  }

  friendshipZero() {
    const ctx = this.buddyCanv.current.getContext("2d");
    ctx.clearRect(0, 0, 150, 150);
    // face outer line
    var smileGrad = ctx.createLinearGradient(0, 0, 149, 149);
    smileGrad.addColorStop(0, "#44FF44");
    smileGrad.addColorStop(0.5, "#22AA22");
    smileGrad.addColorStop(1, "#224422");
    ctx.strokeStyle = "black";
    ctx.fillStyle = smileGrad;
    ctx.lineWidth = 2.0;
    ctx.beginPath();
    ctx.arc(75, 75, 55, 0, Math.PI * 2, false);
    ctx.fill();
    ctx.stroke();
    ctx.closePath();

    // left eye
    ctx.strokeStyle = "black";
    ctx.fillStyle = "white";
    ctx.lineWidth = 2.0;
    ctx.beginPath();
    ctx.arc(50, 55, 10, 0, Math.PI * 2, false);
    ctx.fill();
    ctx.stroke();
    ctx.closePath();

    //right eye
    ctx.strokeStyle = "black";
    ctx.fillStyle = "white";
    ctx.lineWidth = 2.0;
    ctx.beginPath();
    ctx.arc(100, 55, 10, 0, Math.PI * 2, false);
    ctx.fill();
    ctx.stroke();
    ctx.closePath();

    //left pupil
    ctx.strokeStyle = "black";
    ctx.fillStyle = "black";
    ctx.lineWidth = 2.0;
    ctx.beginPath();
    ctx.arc(50, 60, 2, 0, Math.PI * 2, false);
    ctx.fill();
    ctx.stroke();
    ctx.closePath();

    // right pupil
    ctx.strokeStyle = "black";
    ctx.fillStyle = "black";
    ctx.lineWidth = 2.0;
    ctx.beginPath();
    ctx.arc(100, 60, 2, 0, Math.PI * 2, false);
    ctx.fill();
    ctx.stroke();
    ctx.closePath();

    // nose

    ctx.strokeStyle = "black";
    ctx.fillStyle = "black";
    ctx.lineWidth = 2.0;
    ctx.beginPath();
    ctx.ellipse(75, 75, 8, 5, Math.PI * 0.9, Math.PI * 2, false);
    ctx.stroke();
    ctx.closePath();

    // smile
    ctx.strokeStyle = "black";
    ctx.fillStyle = "white";
    ctx.lineWidth = 2.0;
    ctx.beginPath();
    ctx.arc(75, 75, 35, Math.PI * 0.2, Math.PI * 0.8);
    ctx.fill();
    ctx.stroke();
    ctx.closePath();

    ctx.strokeStyle = "black";
    ctx.fillStyle = "white";
    ctx.lineWidth = 2.0;
    ctx.beginPath();
    ctx.moveTo(45, 95);
    ctx.lineTo(105, 95);
    ctx.fill();
    ctx.stroke();
    ctx.closePath();
  }

  friendshipOne() {
    const ctx = this.buddyCanv.current.getContext("2d");
    ctx.clearRect(0, 0, 150, 150);
    // face outer line
    var smileGrad = ctx.createLinearGradient(0, 0, 149, 149);
    smileGrad.addColorStop(0, "#44FF44");
    smileGrad.addColorStop(0.5, "#22AA22");
    smileGrad.addColorStop(1, "#224422");
    ctx.strokeStyle = "black";
    ctx.fillStyle = smileGrad;
    ctx.lineWidth = 2.0;
    ctx.beginPath();
    ctx.arc(75, 75, 55, 0, Math.PI * 2, false);
    ctx.fill();
    ctx.stroke();
    ctx.closePath();

    // left eye
    ctx.strokeStyle = "black";
    ctx.fillStyle = "white";
    ctx.lineWidth = 2.0;
    ctx.beginPath();
    ctx.arc(50, 55, 10, 0, Math.PI * 2, false);
    ctx.fill();
    ctx.stroke();
    ctx.closePath();

    //right eye
    ctx.strokeStyle = "black";
    ctx.fillStyle = "white";
    ctx.lineWidth = 3.0;
    ctx.beginPath();
    ctx.moveTo(90, 55)
    ctx.lineTo(110, 55);
    ctx.fill();
    ctx.stroke();
    ctx.closePath();

    //left pupil
    ctx.strokeStyle = "black";
    ctx.fillStyle = "black";
    ctx.lineWidth = 2.0;
    ctx.beginPath();
    ctx.arc(50, 60, 2, 0, Math.PI * 2, false);
    ctx.fill();
    ctx.stroke();
    ctx.closePath();

    // nose

    ctx.strokeStyle = "black";
    ctx.fillStyle = "black";
    ctx.lineWidth = 2.0;
    ctx.beginPath();
    ctx.ellipse(75, 70, 8, 5, Math.PI * 0.9, Math.PI * 2, false);
    ctx.stroke();
    ctx.closePath();

    // smile
    ctx.strokeStyle = "black";
    ctx.fillStyle = "white";
    ctx.lineWidth = 2.0;
    ctx.beginPath();
    ctx.arc(75, 75, 35, Math.PI * 0.1, Math.PI * 0.9);
    ctx.fill();
    ctx.stroke();
    ctx.closePath();

    ctx.strokeStyle = "black";
    ctx.fillStyle = "white";
    ctx.lineWidth = 2.0;
    ctx.beginPath();
    ctx.moveTo(40, 85);
    ctx.lineTo(110, 85);
    ctx.fill();
    ctx.stroke();
    ctx.closePath();
  }

  friendshipTwo() {
    const ctx = this.buddyCanv.current.getContext("2d");
    ctx.clearRect(0, 0, 150, 150);
    // hand outline
    var smileGrad = ctx.createLinearGradient(0, 0, 149, 149);
    smileGrad.addColorStop(0, "#44FF44");
    smileGrad.addColorStop(0.5, "#22AA22");
    smileGrad.addColorStop(1, "#224422");
    ctx.strokeStyle = "black";
    ctx.fillStyle = smileGrad;
    ctx.lineWidth = 2.0;
    ctx.beginPath();
    ctx.moveTo(60, 120);
    ctx.lineTo(70, 123);
    ctx.lineTo(75, 124)
    ctx.lineTo(80, 125);
    ctx.lineTo(85, 124);
    ctx.lineTo(90, 123);
    ctx.lineTo(100, 120);
    ctx.lineTo(103, 117);
    ctx.lineTo(105, 114);
    ctx.lineTo(103, 111);
    ctx.lineTo(75, 110);
    ctx.lineTo(103, 110);
    ctx.lineTo(103, 107);
    ctx.lineTo(105, 104);
    ctx.lineTo(103, 101)
    ctx.lineTo(75, 100);
    ctx.lineTo(103, 100);
    ctx.lineTo(103, 97);
    ctx.lineTo(105, 94);
    ctx.lineTo(103, 91);
    ctx.lineTo(75, 90);
    ctx.lineTo(103, 90);
    ctx.lineTo(103, 87);
    ctx.lineTo(105, 84);
    ctx.lineTo(103, 81);
    ctx.lineTo(100, 80);
    ctx.lineTo(99, 80);
    ctx.lineTo(95, 78);
    ctx.lineTo(90, 75);
    ctx.lineTo(85, 73);
    ctx.lineTo(80, 73);
    ctx.lineTo(80, 75);
    ctx.lineTo(78, 70);
    ctx.lineTo(75, 65);
    ctx.lineTo(78, 55);
    ctx.lineTo(78, 52);
    ctx.lineTo(78, 50);
    ctx.lineTo(77, 45);
    ctx.lineTo(72, 43);
    ctx.lineTo(69, 44);
    ctx.lineTo(65, 45);
    ctx.lineTo(63, 55);
    ctx.lineTo(59, 65);
    ctx.lineTo(55, 75);
    ctx.lineTo(54, 85);
    ctx.lineTo(53, 95);
    ctx.lineTo(54, 100);
    ctx.lineTo(55, 105);
    ctx.lineTo(56, 110);
    ctx.lineTo(57, 115);
    ctx.lineTo(60, 120);
    ctx.fill();
    ctx.stroke();
    ctx.closePath();

  }

  addCharisma() {
    this.setState({ Charisma: this.state.Charisma + this.props.activeCharismaBonus });
    this.updateCanvas(this.friendshipTwo());
  }

  passiveCharismaUp() {
    this.setState({ Charisma: this.state.Charisma + this.props.passiveCharismaBonus });
  }

  giveState() {
    this.props.stateGrab("Charisma", this.state.Charisma);
  }

  hoverCharisma() {
    this.updateCanvas(this.friendshipOne());
  }

  unhoverCharisma() {
    this.updateCanvas(this.friendshipZero());
  }

  render() {
    return (
      <div className="clickBox">
        <canvas
          ref={this.buddyCanv}
          width={150}
          height={150}
          className="buddyCanv"
          onMouseDown={this.addCharisma}
          onMouseUp = { this.hoverCharisma }
          onMouseEnter={this.hoverCharisma}
          onMouseLeave={this.unhoverCharisma}
        />
      </div>
    );
  }
}

export default GreenClickable;