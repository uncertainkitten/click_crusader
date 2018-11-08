# Click Crusader
[Live](https://uncertainkitten.github.io/click_crusader/)

![alt-text](https://github.com/uncertainkitten/click_crusader/blob/master/ClickCrusader.PNG "Click Crusader!!!")
## Description
Click Crusader is an incremental game with a couple twists.  Features include three resource generator trees, unique interplays between the resources, and an event tree that encourages you to play the way that feels most natural to you.

Click Crusader is written in JavaScript with ReactJS.

Click Crusader utilizes Canvas for smoother rendering of dynamic images such as the click icons.  Styling is done primarily in CSS, with ReactJS components acting as containers for much of the game logic.  Key points of the design involve the formulas used to implement cost curves, reward curves, and event triggers, as well as conversion functions to both save space and allow for easier parsing of key numerical data.

## Technologies Used:
    [React](https://www.npmjs.com/package/react)
    [React Dom](https://www.npmjs.com/package/react-dom)
    [React Scripts](https://www.npmjs.com/package/react-scripts)
    [GH Pages](https://www.npmjs.com/package/gh-pages)
    [Create React App](https://www.npmjs.com/package/create-react-app)


## Implemented key features
### Single source of truth
Given the shallow nesting of components, as well as the iterative nature of producers and events, I decided to forgo Redux and design with "Lifting Up State" principles.  This did entail building a rather large state for the parent component, but allowed easy use of localStorage to act as storage without using a backend database.

```  constructor(props) {
    super(props)
    this.state = {Power: 0, powerString: "0", Money: 0, moneyString: "0", Charisma: 0, charismaString: "0", activeBonus: 0, passivePowerBonus: 0, activeMoneyBonus: 0,
    passiveMoneyBonus: 1, activeCharismaBonus: 0, passiveCharismaBonus: 0, activeMoneyBonusCha: 0, eventTrigger: true, red: 0, blue: 0, green: 0, redMultiplier: 1,blueMultiplier: 1, greenMultiplier: 1, eventLevel: 0, cost1: 11, count1: 0, cost2: 280, count2: 0 . . . cost9: 2904100000000, count9: 0, moneyCost1: 16, moneyCount1: 0,moneyCost2: 570, moneyCount2: 0 . . . moneyCost9: 23776200000000, moneyCount9: 0, charismaCost1: 14, charismaCount1: 0, charismaCost2: 450, charismaCount2: 0 . . . charismaCost9: 10865400000000, charismaCount9: 0, hoverReset: false, hoverPower: false, hoverMoney: false, hoverCharisma: false
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
  ```

(inspiration for the localStorage code from https://hackernoon.com/how-to-take-advantage-of-local-storage-in-your-react-projects-a895f2b2d3f2)


This structure allowed a lot of flexibility in how I iterated my components and modified the child state.  This did require threading a callback to lift the state up properly, however.

```
stateGrab(key, value) {
    this.setState({ [key]: value });
  }
```

Having the Game component act as the final word on state allowed me to make quite a few asynchronous calls that changed state and make sure that the final values reflected were what you would expect - particularly useful if you have a resource incrementing on a per second basis and decided to purchase a generator.

### Incremental Game
Implementing the incremental aspects of the game was largely a process of working very hard to get the code right for the first instance, working kind of hard to figure out how to extend the code to a second instance, and then being able to extend the implementation to arbitrary copies of components after figuring out the first two instances.

```
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
```

The above is code from the Game component that passes the necessary props to the Producers component, and the render function of a Producer with iterative logic to handle the extensibility of having multiple Producers.

There is also logic for gating producers from coming too fast, utilizing the child component state and the "Advanced" and "Capstone" flags.

```
isAdvanced() {
    if (this.state.level > 5 && this.state.level < 9) {
      this.setState({ advanced: true });
    } else if (this.state.level === 9) {
      this.setState({ capstone: true });
    }
  }
```

![alt-text](https://github.com/uncertainkitten/click_crusader/blob/master/Lock.PNG "Click Crusader!!!")

And of course, as an incremental game, your numbers really should go up.

![alt-text](https://gph.is/2RKpOzA "Gotta get dem numbers up")

```
addPower() {
    this.setState({ Power: this.state.Power + this.props.activeBonus });
    this.updateCanvas(this.attackMonsterTwo);
  }
```
```
  addCharisma() {
    this.setState({ Charisma: this.state.Charisma + this.props.activeCharismaBonus });
    this.updateCanvas(this.friendshipTwo);
  }
```
```
  addMoney() {
    this.setState({ Money: this.state.Money + ((this.props.passiveMoneyBonus + this.props.activeMoneyBonusCha) * (this.props.activeMoneyBonus)) });
    this.updateCanvas(this.blingBlingTwo);
  }
```

### Dynamic Clicker Animations
![alt-text](https://gph.is/2PhDqFv "Poor Slime :(")

Using Canvas, I implemented a 3 stage click function that first checks if you are hovering over the clicker, and then checks if your mouse is pressed down or up on that clicker.

```
  hoverPower() {
    this.updateCanvas(this.attackMonsterOne);
  }

  unhoverPower() {
    this.updateCanvas(this.attackMonsterZero);
  }

  // addPower() is the click handler
  addPower() {
    this.setState({ Power: this.state.Power + this.props.activeBonus });
    this.updateCanvas(this.attackMonsterTwo);
  }

  updateCanvas(frame) {
    frame();
  }
```

A lot of what I explored for this particular animation was how to rotate the canvas while saving the context so that I could tilt the sword and keep the aspect ratio consistent.  This is the main difference between attackMonsterZero and attackMonsterOne()

```
attackMonsterZero()
    ctx.clearRect(0, 0, 150, 150);
    // sord blade
    var sordGrad = ctx.createLinearGradient(30, 20, 50, 80);
    . . .
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
  ...


attackMonsterOne()
    ctx.save();
    ctx.translate(60,0);
    ctx.rotate(Math.PI * 0.2);
    . . .
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
  ...
```

The drawings are exactly the same, but the save and rotate placed before the sword is drawn allows me to draw it on the canvas "normally", and then restore the canvas to its original orientation, which does the rotation math in reverse and forces the sword into the correct position.

## Future Features
Click Crusader is still a work in progress - future features include:
- Factions
- Trades Between Resources
- Prestige!
- Progress Bars for Events
- Event Curve Adjustment
- Teasers
- Improved Color Scheme
- More Detailed Events

### Possible (but unlikely) features
- Going Multiplayer with Factions and a Database
- Messaging
- Raids
- One Use Items/Rewards
- Inventories
- Friends


