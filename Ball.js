class Ball {
    constructor(x, y, vx, vy, r, c) {
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.r = r;
        this.c = c;
        this.inPlay = false;
        this.boing = 0
    }

    draw(ctx) {
        ctx.fillStyle = this.c;
        ctx.strokeStyle = "black";
        ctx.lineWidth = 2;

        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, 2*Math.PI);
        ctx.stroke();
        ctx.fill()
    }

    move() {
        this.x += this.vx;
        this.y += this.vy;
    }

    bounce(things) {
        this.bounceWalls();
        for (let thing of things) {
            if (thing instanceof Paddle) {
                if (thing.side == SIDE.LEFT) { 
                    let side = this.bounceLeftPaddle(thing);
                    if (side != SIDE.NONE) return side;
                }
                if (thing.side == SIDE.RIGHT) {
                    let side = this.bounceRightPaddle(thing);
                    if (side != SIDE.NONE) return side;
                }
            }
            //if (thing instanceof obstacle)...
        }
        return SIDE.NONE;
    }
    
    bounceWalls() {
        if (this.y - this.r < 0) {
            this.vy = Math.abs(this.vy)
        }
        if (this.y + this.r > boardHeight) {
            this.vy = -Math.abs(this.vy);
        }
    }

    
    bounceLeftPaddle(paddle) {
        if(this.x - this.r > paddle.w) return SIDE.NONE;
        if(this.x - this.r < 0) return SIDE.RIGHT; // Someone got a point....
        if(this.y < paddle.y) return SIDE.NONE;
        if(this.y > paddle.y + paddle.l) return SIDE.NONE;
        if(this.vx < 0) {
            this.vx = paddleForce * Math.abs(this.vx);
            //add other spin, etc...
        }
        return SIDE.NONE;
    }
    
    bounceRightPaddle(paddle) {
        if(this.x + this.r < paddle.x) return SIDE.NONE;
        if(this.x + this.r > paddle.x + paddle.w) return SIDE.LEFT; // Someone got a point....
        if(this.y < paddle.y) return SIDE.NONE;
        if(this.y > paddle.y + paddle.l) return SIDE.NONE;
        if(this.vx > 0) {
            this.vx = -paddleForce * Math.abs(this.vx);
            //add other spin, etc...
            //add sound?
            if (this.boing < 21) this.boing++
            else resetBall()
            console.log(this.boing)
        }
        return SIDE.NONE;
}
}