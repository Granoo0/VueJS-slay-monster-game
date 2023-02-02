function getRandomValue(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

const app = Vue.createApp({
  data() {
    return {
      playerHP: 100,
      monsterHP: 100,
      round: 0,
      winner: null,
      logMsg: [],
      playerName:'',
    };
  },
  methods: {
    newGame() {
      this.playerHP = 100;
      this.monsterHP = 100;
      this.round = 0;
      this.winner = null;
      this.logMsg = [];
    },
    attackMonster() {
      this.round++;
      const attackValue = getRandomValue(12, 5);
      this.monsterHP -= attackValue;
      this.addLogMsg("player", "attack", attackValue);
      this.attackPlayer();
    },
    attackPlayer() {
      const attackValue = getRandomValue(15, 8);
      this.playerHP -= attackValue;
      this.addLogMsg("monster", "attack", attackValue);
    },
    specialAttack() {
      this.round++;
      const attackValue = getRandomValue(10, 25);
      this.monsterHP -= attackValue;
      this.addLogMsg("player", "attack", attackValue);
      this.attackPlayer();
    },
    healPlayer() {
      this.round++;
      const healValue = getRandomValue(8, 20);
      if (this.playerHP + healValue > 100) {
        this.playerHP = 100;
      } else {
        this.playerHP += healValue;
      }
      this.addLogMsg("player", "heal", healValue);
      this.attackPlayer();
    },
    surrender() {
      return (this.winner = "monster");
    },
    addLogMsg(who, what, value) {
      this.logMsg.unshift({
        actionBy: who,
        actionType: what,
        actionValue: value,
      });
    },
  },
  watch: {
    playerHP(value) {
      if (value <= 0 && this.monsterHP <= 0) {
        //  Draw
        this.winner = "draw";
      } else if (value <= 0) {
        // Player Lost
        this.winner = "monster"; 
      }
    },
    monsterHP(value) {
      if (value <= 0 && this.playerHP <= 0) {
        // Draw
        this.winner = "draw";
      } else if (value <= 0) {
        // Monster Lost
        this.winner = "player";
      }
    },
  },
  computed: {
    monsterHPStyle() {
      if (this.monsterHP < 0) {
        return { width: "0%" };
      }
      return { width: this.monsterHP + "%" };
    },
    playerHPStyle() {
      if (this.playerHP < 0) {
        return { width: "0%" };
      }
      return { width: this.playerHP + "%" };
    },
    specialAttackCooldown() {
      return this.round % 3 !== 0;
    },
    healCooldown() {
      return this.round % 4 !== 0;
    },
  },
});

app.mount("#game");
