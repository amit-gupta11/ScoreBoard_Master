var SPACEBAR = 32;
    var ESCAPE = 27;
    var ARROWS = function(key) {
      return (key >= 37 && key <= 40) || (key >= 63232 && key <= 63235);
    };

    var initial_time = 10 * 60*5;
    var game = null;

    function createGame() {
      game = new Game(initial_time, 'info', 'player1clock', 'player2clock');
      game.resetClocks();
    }

    function formatTime(tenths) {
      var minutes = String(Math.floor(tenths/600));
      var seconds = String(Math.floor(tenths/10) % 60);
      if (seconds.length == 1) { seconds = '0' + seconds;}
      var decimal = String(tenths % 10);

      // if we have no minutes, include tenths of a second
      return (minutes != '0') ?
        (minutes + ':' + seconds) :
        (seconds + '.' + decimal);
    }

    function Player(clock_id, initial_time, game) {
      this.clock = document.getElementById(clock_id);
      this.initial_time = initial_time;
      this.time = this.initial_time;
      this.game = game;
      this.opponent = null;
    }
    Player.prototype.play = function() {
      var opponent = this.opponent;
      var game = this.game;
      if (!game.game_over) {
        clearTimeout(game.timer_loop);
        game.timer_loop = setInterval(function(){
          opponent.time -= 1;
          if (opponent.time == 0) {
            clearTimeout(game.timer_loop);
            game.game_over = true;
            game.info.innerHTML = 'GAME OVER';
            game.info.className = '';
          }
          game.displayTimers();
        }, 100);
        opponent.clock.className = 'now_playing';
        this.clock.className = '';
        game.info.className = 'hidden';
      }
    }

    function Game(initial_time, info_id, p1_clock_id, p2_clock_id) {
      this.info = document.getElementById(info_id);
      this.player1 = new Player(p1_clock_id, initial_time, this);
      this.player2 = new Player(p2_clock_id, initial_time, this);
      this.player1.opponent = this.player2;
      this.player2.opponent = this.player1;
      this.timer_loop = null;
      this.game_over = false;
    }
    // Dispatcher when we press a key
    Game.prototype.keypress = function(e) {
      var key = e.charCode || e.keyCode || 0;
      var keychar = String.fromCharCode(key);
      // left half of keyboard
      if ('qwertasdfgzxcvb'.indexOf(keychar) != -1) {
        this.player1.play(); }
      // right half of keyboard
      else if (("yuiop[]\hjkl;'nm,./".indexOf(keychar) != -1)
               || ARROWS(key)) {
        this.player2.play(); }
      else if (key == SPACEBAR) {
        this.pause(); }
      else if (key == ESCAPE) {
        this.resetClocks(); }
      else if ('=+'.indexOf(keychar) != -1) {
        this.player1.initial_time += 300;
        this.player2.initial_time += 300;
        this.resetClocks(); }
      else if ('-_'.indexOf(keychar) != -1) {
        if (this.player1.initial_time >= 600) {
          this.player1.initial_time -= 300;
        }
        if (this.player2.initial_time >= 600) {
          this.player2.initial_time -= 300;
        }
        this.resetClocks();
      }
    }
    Game.prototype.pause = function() {
      if (!this.game_over) {
        var info = this.info;
        info.innerHTML = 'PAUSED';
        info.className = '';
        clearTimeout(this.timer_loop);
        this.timer_loop = setInterval(function(){
          if (info.className == '') {
            info.className = 'hidden';
          }
          else {
            info.className = '';
          }
        }, 500);
      }
    }
    // Show the timers
    Game.prototype.displayTimers = function() {
      this.player1.clock.innerHTML = formatTime(this.player1.time);
      this.player2.clock.innerHTML = formatTime(this.player2.time);
    }
    // Reset the clocks
    Game.prototype.resetClocks = function() {
      clearTimeout(this.timer_loop);
      this.player1.clock.className = '';
      this.player2.clock.className = '';
      this.info.className = 'hidden';
      this.player1.time = this.player1.initial_time;
      this.player2.time = this.player2.initial_time;
      this.game_over = false;
      this.displayTimers();
    }