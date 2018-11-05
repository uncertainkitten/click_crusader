// Component for clickable items - will render a canvas with lots of fancy on-click changes
// Will pass state up to Game to pass down to resources
// Game will essentially act as the source of truth

import React from 'react';
class Clickable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Power: this.props.Power
    }
    this.addPower = this.addPower.bind(this);
    this.passivePowerUp = this.passivePowerUp.bind(this);
    this.passivePower = setInterval(this.passivePowerUp, 1000);
    this.attackCanv = React.createRef();
    this.hoverPower = this.hoverPower.bind(this);
    this.unhoverPower = this.unhoverPower.bind(this);
  }

  componentDidMount () {
    this.updateCanvas(this.attackMonsterZero());
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state !== prevState) {
      this.giveState();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.Power !== nextProps.Power) {
      this.setState({ Power: nextProps.Power });
    }
  }

  componentWillUnmount() {
    clearInterval(this.passivePower);
  }

  attackMonsterTwo() {
    const ctx = this.attackCanv.current.getContext("2d");
    ctx.clearRect(0, 0, 150, 150);
    ctx.save();
    ctx.translate(50, -25);
    ctx.rotate(Math.PI * 0.15);
    // sord blade
    var sordGrad = ctx.createLinearGradient(30, 20, 50, 80);
    sordGrad.addColorStop(0, "#FF4444");
    sordGrad.addColorStop(0.5, "#BB2222");
    sordGrad.addColorStop(1, "#442222");
    ctx.strokeStyle = "black";
    ctx.fillStyle = sordGrad;
    ctx.lineWidth = 2.0;
    ctx.beginPath();
    ctx.moveTo(65, 25);
    ctx.lineTo(80, 22);
    ctx.lineTo(80, 35);
    ctx.lineTo(50, 80);
    ctx.lineTo(35, 70);
    ctx.lineTo(65, 25);
    ctx.fill();
    ctx.stroke();
    ctx.closePath();

    //sord detail
    ctx.strokeStyle = "black";
    ctx.lineWidth = 1.0;
    ctx.beginPath();
    ctx.moveTo(79, 22);
    ctx.lineTo(43, 75);
    ctx.stroke();
    ctx.closePath();

    //sord hilt
    var hiltGrad = ctx.createLinearGradient(10, 80, 70, 120);
    hiltGrad.addColorStop(0, "#000000");
    hiltGrad.addColorStop(0.5, "#333333");
    hiltGrad.addColorStop(1, "#666666");
    ctx.strokeStyle = "black";
    ctx.fillStyle = hiltGrad;
    ctx.lineWidth = 2.0;
    ctx.beginPath();
    ctx.moveTo(50, 80);
    ctx.lineTo(65, 90);
    ctx.lineTo(55, 105);
    ctx.lineTo(40, 96);
    ctx.lineTo(29, 118);
    ctx.lineTo(13, 111);
    ctx.lineTo(25, 90);
    ctx.lineTo(10, 80);
    ctx.lineTo(22, 62);
    ctx.lineTo(35, 70);
    ctx.fill();
    ctx.stroke();
    ctx.closePath();

    ctx.restore();

    // slime
    ctx.strokeStyle = "blue";
    ctx.fillStyle = "blue";
    ctx.lineWidth = 2.0
    ctx.beginPath();
    ctx.ellipse(120, 60, 25, 25, 0, Math.PI * 1, Math.PI * 2, false);
    ctx.ellipse(120, 60, 25, 10, 0, 0, Math.PI * 1, false);
    ctx.fill();
    ctx.stroke();
    ctx.closePath();

    // slime left eye
    ctx.strokeStyle = "white";
    ctx.lineWidth = 2.0;
    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.arc(115, 50, 5, Math.PI * 1, Math.PI * 2, false);
    ctx.arc(114, 50, 6, 0, Math.PI * 1, false);
    ctx.fill();
    ctx.stroke();
    ctx.closePath();

    // slime right eye
    ctx.strokeStyle = "white";
    ctx.lineWidth = 2.0;
    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.arc(130, 50, 5, Math.PI * 1, Math.PI * 2, false);
    ctx.arc(129, 50, 6, 0, Math.PI * 1, false);
    ctx.fill();
    ctx.stroke();
    ctx.closePath();

    // slime left pupil
    ctx.strokeStyle = "black";
    ctx.lineWidth = 2.0;
    ctx.beginPath();
    ctx.moveTo(110, 45)
    ctx.lineTo(119, 57);
    ctx.fill();
    ctx.stroke();
    ctx.closePath();

    ctx.strokeStyle = "black";
    ctx.lineWidth = 2.0;
    ctx.beginPath();
    ctx.moveTo(119, 46);
    ctx.lineTo(110, 57);
    ctx.fill();
    ctx.stroke();
    ctx.closePath();

    // slime right pupil
    ctx.strokeStyle = "black";
    ctx.lineWidth = 2.0;
    ctx.beginPath();
    ctx.moveTo(135, 56);
    ctx.lineTo(125, 46);
    ctx.fill();
    ctx.stroke();
    ctx.closePath();

    ctx.strokeStyle = "black";
    ctx.lineWidth = 2.0;
    ctx.beginPath();
    ctx.moveTo(125, 56);
    ctx.lineTo(135, 46);
    ctx.fill();
    ctx.stroke();
    ctx.closePath();
  }

  updateCanvas(frame) {
    frame;
  }

  attackMonsterZero() {
    const ctx = this.attackCanv.current.getContext('2d');
    ctx.clearRect(0, 0, 150, 150);
    // sord blade
    var sordGrad = ctx.createLinearGradient(30, 20, 50, 80);
    sordGrad.addColorStop(0, "#FF4444");
    sordGrad.addColorStop(0.5, "#BB2222");
    sordGrad.addColorStop(1, "#442222");
    ctx.strokeStyle = "black";
    ctx.fillStyle = sordGrad;
    ctx.lineWidth = 2.0;
    ctx.beginPath();
    ctx.moveTo(30, 30);
    ctx.lineTo(40, 20);
    ctx.lineTo(50, 30);
    ctx.lineTo(50, 80);
    ctx.lineTo(30, 80);
    ctx.lineTo(30, 30);
    ctx.fill();
    ctx.stroke();
    ctx.closePath();

    //sord detail
    ctx.strokeStyle = "black";
    ctx.lineWidth = 1.0;
    ctx.beginPath();
    ctx.moveTo(40, 22);
    ctx.lineTo(40, 79);
    ctx.stroke();
    ctx.closePath();

    //sord hilt
    var hiltGrad = ctx.createLinearGradient(10, 80, 70, 120);
    hiltGrad.addColorStop(0, "#000000");
    hiltGrad.addColorStop(0.5, "#333333");
    hiltGrad.addColorStop(1, "#666666");
    ctx.fillStyle = hiltGrad;
    ctx.lineWidth = 2.0;
    ctx.beginPath();
    ctx.moveTo(50, 80);
    ctx.lineTo(70, 80);
    ctx.lineTo(70, 100);
    ctx.lineTo(50, 100);
    ctx.lineTo(50, 120);
    ctx.lineTo(30, 120);
    ctx.lineTo(30, 100);
    ctx.lineTo(10, 100);
    ctx.lineTo(10, 80);
    ctx.lineTo(30, 80);
    ctx.fill();
    ctx.stroke();
    ctx.closePath();

    // slime
    ctx.strokeStyle = "blue";
    ctx.fillStyle = "blue";
    ctx.lineWidth = 2.0
    ctx.beginPath();
    ctx.ellipse(120, 60, 25, 25, 0, Math.PI * 1, Math.PI * 2, false);
    ctx.ellipse(120, 60, 25, 10, 0, 0, Math.PI * 1, false);
    ctx.fill();
    ctx.stroke();
    ctx.closePath();

    // slime left eye
    ctx.strokeStyle = "white";
    ctx.lineWidth = 2.0;
    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.arc(115, 50, 5, Math.PI * 1, Math.PI * 2, false);
    ctx.arc(114, 50, 6, 0, Math.PI * 1, false);
    ctx.fill();
    ctx.stroke();
    ctx.closePath();

    // slime right eye
    ctx.strokeStyle = "white";
    ctx.lineWidth = 2.0;
    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.arc(130, 50, 5, Math.PI * 1, Math.PI * 2, false);
    ctx.arc(129, 50, 6, 0, Math.PI * 1, false);
    ctx.fill();
    ctx.stroke();
    ctx.closePath();

    // slime left pupil
    ctx.strokeStyle = "blue";
    ctx.lineWidth = 2.0;
    ctx.beginPath();
    ctx.arc(112, 53, 1, 0, Math.PI * 2, false);
    ctx.fill();
    ctx.stroke();
    ctx.closePath();

    // slime right pupil
    ctx.strokeStyle = "blue";
    ctx.lineWidth = 2.0;
    ctx.beginPath();
    ctx.arc(127, 53, 1, 0, Math.PI * 2, false);
    ctx.fill();
    ctx.stroke();
    ctx.closePath();
  }

  attackMonsterOne() {
    const ctx = this.attackCanv.current.getContext('2d');
    ctx.clearRect(0, 0, 150, 150);
    ctx.save();
    ctx.translate(60,0);
    ctx.rotate(Math.PI * 0.2);
    // sord blade
    var sordGrad = ctx.createLinearGradient(30, 20, 50, 80);
    sordGrad.addColorStop(0, "#FF4444");
    sordGrad.addColorStop(0.5, "#BB2222");
    sordGrad.addColorStop(1, "#442222");
    ctx.strokeStyle = "black";
    ctx.fillStyle = sordGrad;
    ctx.lineWidth = 2.0;
    ctx.beginPath();
    ctx.moveTo(30, 30);
    ctx.lineTo(40, 20);
    ctx.lineTo(50, 30);
    ctx.lineTo(50, 80);
    ctx.lineTo(30, 80);
    ctx.lineTo(30, 30);
    ctx.fill();
    ctx.stroke();
    ctx.closePath();

    //sord detail
    ctx.strokeStyle = "black";
    ctx.lineWidth = 1.0;
    ctx.beginPath();
    ctx.moveTo(40, 22);
    ctx.lineTo(40, 79);
    ctx.stroke();
    ctx.closePath();

    //sord hilt
    var hiltGrad = ctx.createLinearGradient(10, 80, 70, 120);
    hiltGrad.addColorStop(0, "#000000");
    hiltGrad.addColorStop(0.5, "#333333");
    hiltGrad.addColorStop(1, "#666666");
    ctx.fillStyle = hiltGrad;
    ctx.lineWidth = 2.0;
    ctx.beginPath();
    ctx.moveTo(50, 80);
    ctx.lineTo(70, 80);
    ctx.lineTo(70, 100);
    ctx.lineTo(50, 100);
    ctx.lineTo(50, 120);
    ctx.lineTo(30, 120);
    ctx.lineTo(30, 100);
    ctx.lineTo(10, 100);
    ctx.lineTo(10, 80);
    ctx.lineTo(30, 80);
    ctx.fill();
    ctx.stroke();
    ctx.closePath();

    ctx.restore();

    // slime
    ctx.strokeStyle = "blue";
    ctx.fillStyle = "blue";
    ctx.lineWidth = 2.0
    ctx.beginPath();
    ctx.ellipse(120, 60, 25, 25, 0, Math.PI * 1, Math.PI * 2, false);
    ctx.ellipse(120, 60, 25, 10, 0, 0, Math.PI * 1, false);
    ctx.fill();
    ctx.stroke();
    ctx.closePath();

    // slime left eye
    ctx.strokeStyle = "white";
    ctx.lineWidth = 2.0;
    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.arc(115, 50, 5, Math.PI * 1, Math.PI * 2, false);
    ctx.arc(114, 50, 6, 0, Math.PI * 1, false);
    ctx.fill();
    ctx.stroke();
    ctx.closePath();

    // slime right eye
    ctx.strokeStyle = "white";
    ctx.lineWidth = 2.0;
    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.arc(130, 50, 5, Math.PI * 1, Math.PI * 2, false);
    ctx.arc(129, 50, 6, 0, Math.PI * 1, false);
    ctx.fill();
    ctx.stroke();
    ctx.closePath();

    // slime left pupil
    ctx.strokeStyle = "blue";
    ctx.lineWidth = 2.0;
    ctx.beginPath();
    ctx.arc(112, 53, 1, 0, Math.PI * 2, false);
    ctx.fill();
    ctx.stroke();
    ctx.closePath();

    // slime right pupil
    ctx.strokeStyle = "blue";
    ctx.lineWidth = 2.0;
    ctx.beginPath();
    ctx.arc(127, 53, 1, 0, Math.PI * 2, false);
    ctx.fill();
    ctx.stroke();
    ctx.closePath();
  }

  addPower() {
    this.setState({ Power: this.state.Power + this.props.activeBonus });
    this.updateCanvas(this.attackMonsterTwo());
  }

  hoverPower() {
    this.updateCanvas(this.attackMonsterOne());
  }

  unhoverPower() {
    this.updateCanvas(this.attackMonsterZero());
  }

  passivePowerUp() {
    this.setState({ Power: this.state.Power + this.props.passivePowerBonus });
  }

  giveState() {
    this.props.stateGrab("Power", this.state.Power);
  }

  render() {
    return (
      <div className="clickBox">
        <canvas
        ref={this.attackCanv}
        width={150}
        height={150}
        className="attackCanv"
        onMouseDown={this.addPower}
        onMouseUp={this.hoverPower}
        onMouseEnter={this.hoverPower}
        onMouseLeave={this.unhoverPower} 
        />
      </div>
    );
  }
}

export default Clickable;