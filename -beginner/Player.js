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
