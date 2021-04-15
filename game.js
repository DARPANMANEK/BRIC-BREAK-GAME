import Paddle from "./paddle.js";
import InputHandler from "./input.js";
import Ball from "./ball.js";
import Brick from "./brick.js";
import {buildLevel} from "./levels.js";
import { level1, level2} from "./levels.js";


const GAMESTATE = {
    PAUSED: 0,
    RUNNING: 1,
    MENU: 2,
    GAMEOVER: 3,
    NEWLEVEL: 4,
    STOP: 5,
    FINISH: 6
    
};

export default class Game{

    constructor(gameWidth, gameHeight) {

        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;

        this.gamestate = GAMESTATE.MENU;
        
        this.ball = new Ball(this);
        this.paddle = new Paddle(this);
        this.gameObjects = [];
        this.bricks = [];
        this.lives = 3;

        this.levels = [level1, level2];
        this.currentLevel = 0; 
        // this.finish = 3; 
        new InputHandler(this.paddle, this);
        
    }

    start(){

        if (this.gamestate !== GAMESTATE.MENU &&
            this.gamestate !== GAMESTATE.NEWLEVEL) return;
        
        
        
        this.bricks = buildLevel (this, this.levels[this.currentLevel]);
        this.ball.reset();
        
        this.gameObjects = [this.ball, this.paddle];

        this.gamestate = GAMESTATE.RUNNING;
    }
    
   
    update(deltaTime){
        
        if (this.lives === 0) this.gamestate = GAMESTATE.GAMEOVER;
            
        if (this.gamestate === GAMESTATE.PAUSED ||
            this.gamestate === GAMESTATE.MENU ||
            this.gamestate === GAMESTATE.GAMEOVER) return;

        if (this.bricks.length === 0){
            this.stopp();
        }
        

        [...this.gameObjects,...this.bricks].forEach(object => object.update(deltaTime))
        ;
        this.bricks = this.bricks.filter(brick => !brick.markedForDeletion);

    }

    draw(ctx){
        ctx.font = "30px Cursive";
        ctx.fillStyle = "#FF0000"
        ctx.fillText( ` Lives = ${lives.textContent}`,150/2, 30);
        
        [...this.gameObjects,...this.bricks].forEach(object => object.draw(ctx));
       

        if (this.gamestate === GAMESTATE.PAUSED){
        ctx.rect(0,0,this.gameWidth,this.gameHeight);
        ctx.fillStyle = "rgba(0,0,0,0.5)";
        ctx.fill();

        ctx.font = "30px Cursive";
        ctx.fillStyle = "#FF0000";
        ctx.textAlign = "center";
        ctx.fillText("Paused ❚❚",this.gameWidth/2, this.gameHeight/2);
        }
        
        
        if (this.gamestate === GAMESTATE.MENU){
        ctx.rect(0,0,this.gameWidth,this.gameHeight);
        ctx.fillStyle = "rgba(0,0,0,1)";
        ctx.fill();

        ctx.font = "30px Cursive";
        ctx.fillStyle = "#FF0000";
        ctx.textAlign = "center";
        ctx.fillText("Press SPACEBAR TO Start 😎",this.gameWidth/2, this.gameHeight/2);
        ctx.fillText("😈 Created By Darpan Manek 😈",this.gameWidth/2, this.gameHeight-20);
        }
        
        
        if (this.gamestate === GAMESTATE.GAMEOVER){
        ctx.rect(0,0,this.gameWidth,this.gameHeight);
        ctx.fillStyle = "rgba(0,0,0,1)";
        ctx.fill();

        ctx.font = "30px Cursive";
        ctx.fillStyle = "#FF0000";
        ctx.textAlign = "center";
        ctx.fillText("Game Over 😞",this.gameWidth/2, this.gameHeight/2);
        }

        if (this.gamestate === GAMESTATE.NEWLEVEL){
        ctx.rect(0,0,this.gameWidth,this.gameHeight);
        ctx.fillStyle = "rgba(0,0,0,1)";
        ctx.fill();

        ctx.font = "30px Cursive";
        ctx.fillStyle = "#FF0000";
        ctx.textAlign = "center";
        ctx.fillText("Press Enter To New Level 👉",this.gameWidth/2, this.gameHeight/2);
        }

        if (this.gamestate === GAMESTATE.FINISH){
        ctx.rect(0,0,this.gameWidth,this.gameHeight);
        ctx.fillStyle = "rgba(0,0,0,1)";
        ctx.fill();

        ctx.font = "30px Cursive";
        ctx.fillStyle = "white";
        ctx.textAlign = "center";
        ctx.fillText("Game Finished",this.gameWidth/2, this.gameHeight/2);
        ctx.fillText("😉 You Are Great 😉",this.gameWidth/2, this.gameHeight-20);
        
        }    
    }

    
    togglePause(){
        if (this.gamestate == GAMESTATE.PAUSED) {
            this.gamestate = GAMESTATE.RUNNING;
        }else{
            this.gamestate = GAMESTATE.PAUSED;
        }
    }

   
    
    stopp(){
        this.gamestate = GAMESTATE.NEWLEVEL;
        

                document.addEventListener("keydown", () => {
         
                    if(this.gamestate === GAMESTATE.NEWLEVEL) GAMESTATE.STOP;
                    this.currentLevel++;
                    this.start();  
                    
                    
                     
                });
                document.addEventListener("touchstart", () => {
         
                    if(this.gamestate === GAMESTATE.NEWLEVEL) GAMESTATE.STOP;
                    this.currentLevel++;
                    this.start();  
                    
                    
                     
                });

                if (this.currentLevel > 1){
                    this.gamestate = GAMESTATE.FINISH;
                }
               
    }

    
    
 }


 