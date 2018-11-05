# Click Crusader

## Overview

Incremental games are a fascinating genre where the abstraction between doing arbitrary actions to increase a number and the number that is increasing is minimized. They form the intersection between human psychology and mathematics - a well designed clicker game has optimized reward curves as well as a sense of exploration of the next bonus to making your numbers go up.  Something I don't usually see in "clicker" games, however, is a well planned element of choice - Click Crusader aims to change that.  The decisions you make in terms of the bonuses you purchase and the resources you optimize for have a very real impact on your endgame as well as your affiliations.  In Click Crusader, your playstyle and decisionmaking process will be rewarded and more options will be provided for that style - axes such as collaborative or competitive, idle or active, (very large) linear or geometric, etc. will be considered to reward most incremental playstyles.  Additionally, the prestige system will allow people to enjoy the different paths through the game with bonuses from their previous decisions.  Click Crusader takes the incremental game philosophy of quantitative psychology and turns it up to 11.

## Functionality/MVP Features
### 1) Incremental Game
 - Click Crusader will allow you to click a button and make a number go up
 - You can buy things to make the number go up faster
 - You can buy things that make the number go up even when you aren't clicking
 - There are multiple types of resources - Power, Money, Charisma

### 2) Mathematically sound
  - Optimal reward curves will be used to determine item prices and item cost increases
  - Number displays will be optimized to give a sense of progress

### 3) Factions
  - Red faction which emphasizes defeating monsters individually by increasing Power
  - Blue faction which emphasizes maximizing Money to defeat monsters
  - Green faction which emphasizes Charisma and fighting alongside friends

### 4) Flavor/Story
 - Click Crusader will have flavor for the purchase choices to make it clear which faction the user is joining
 - Factions will give bonuses to the specific resource they emphasize

### 5) Saves data
  - Click Crusader will use localStorage so that a user can come back to the game later
  - (Stretch) A backend will back up user game data and correlate user game data for social integration

## Bonus/Stretch features
### 6) Node Backend
 - Required for most bonus features

### 7) Prestige
  - Reset your game with special bonuses related to previous faction
  - New item options become available at certain levels of prestige


### 8) User Communication
  - A private message system to communicate with other users
  - Special faction forums for fun and profit

### 9) Inventory
  - Get one use/many use items for bonuses to your click count
  - Possible Premium items/bonuses if Monetization implemented (protip, it probably won't be)

### 10) Special Events
  - Raids - the faction with the most clicks gets a special one time bonus/item
  - Limited time items to improve your click count

## Architecture and technologies
### Canvas
- HTML element that can be used to draw graphics via scripting

- Used in order to make click targets easily understood and engaging

### React
- A JS library used to allow the creation of reactive webpages and single page apps

- Used to allow dynamic rendering of various purchase items and clickables

# Implementation Timeline
### Most important category - MVPs 1, 2, and 5 - Incremental Game, Mathematically Sound, Saves Data

Monday - Research incremental game reward curves and learn about Canvas and what methods are available.  Research React integration with Canvas.  Create the game flow outline (start and end of game, factional path differences, items for purchase, cost curves, wireframes)

Tuesday - Start building game logic with extensibility in mind - i.e., once I have one Resource Producing Item, I should have them all because I just need to change numbers.

Wednesday - Continue building game logic, finish at least one faction and ideally finish all 3.  Don't think too hard about how Green will actually work without a backend.  Make sure that the frontend is able to localStorage the data for a given session without a full user auth platform

Thursday - Implement canvas and styling and make the boring buttons into EXCITING BUTTONS, possibly with ANIMATION (though it's a clicker so don't go too overboard)

Friday - Clarify flavor if it is not already well mapped, finish styling and prettifying.  By Friday, the game should be shippable at its basic functionality.  

(Stretch) If ahead of schedule, consider prestige (this might require backend).  Prestige should have the same game flow outline - start, end, prestige and faction differences, cost curve changes, etc.

Saturday - (Stretch) Consider the Hard Problem of a Node Backend for more robust storage and correlation.  Implement Prestige - same sketch as before.

Sunday - (Stretch) Finish prestige.  If finished with prestige, consider inventory - create very basic items, likely time based.  Reship if build is working and well done - otherwise default to Friday's build

