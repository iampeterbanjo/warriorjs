var _underAttack = false
    , _previousHealth;

class Player {
  playTurn(warrior) {
    // if under attack find the enemy and kill
    _underAttack = _previousHealth > warrior.health();

    if(!warrior.feel().isEmpty()) {
      warrior.attack();
    } else {
      if(warrior.health() < 20 && !_underAttack) {
        warrior.rest();
      } else {
        warrior.walk();
      }
    }

    _previousHealth = warrior.health();
  }
}

global.Player = Player;
