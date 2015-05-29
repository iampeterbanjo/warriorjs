/**********

A warrior can
- die -> health === 0
- rescue captives -> warrior.rescue()
- walk -> warrior.walk()
- attack -> warrior.attack()
- sense a wall -> warrior.feel().isWall()
- sense an empty space -> warrior.feel().isEmpty()
Priorities
- Survive
-- rest when not under attack to full health
-- attack foes
-- retreat from attack when health is low
- Explore
-- Walk backwards first
-- Change direction at a wall
-- Remember the wall behind
- Humane
-- Rescue captives

**********/


var _underAttack = false
    , _previousHealth
    , direction = 'backward';

function exploreMind(warrior, health) {
  if(health < 10) {
    direction = 'backward';
  } else {
    direction = 'forward';
  }

  warrior.walk(direction);
}

function aloneMind(warrior, health) {
  // if under attack don't rest, find the enemy and kill
  var _underAttack = health > warrior.health();

  if(warrior.health() < 20 && !_underAttack) {
    warrior.rest();
  } else {
    exploreMind(warrior);
  }
}

function encounterMind(warrior) {
  if(warrior.feel(direction).isCaptive()) {
    warrior.rescue(direction);
  } else {
    warrior.attack(direction);
  }
}

class Player {
  playTurn(warrior) {
    if(!warrior.feel(direction).isEmpty()) {
      encounterMind(warrior);
    } else {
      aloneMind(warrior, _previousHealth);
    }

    _previousHealth = warrior.health();
  }
}

global.Player = Player;
