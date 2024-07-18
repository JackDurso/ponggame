const SIDE = {NONE: 0, LEFT: 1, RIGHT: 2};

class Paddle {
    constructor(x, y, l, w, side, c) {
        this.x = x;
        this.y = y;
        this.l = l;
        this.w = w;
        this.side = side;
        this.c = c;
        this.vy = 0;
        this.hasUpgrade = false
    }

    draw(ctx){
        ctx.fillStyle = this.c;
        ctx.lineWidth = 2;
        ctx.shadowBlur = 20;
        ctx.shadowColor = this.c;

        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.arcTo(this.x + this.w, this.y, this.x + this.w, this.y + this.l, 10);
        ctx.arcTo(this.x + this.w, this.y + this.l, this.x, this.y + this.l, 10);
        ctx.arcTo(this.x, this.y + this.l, this.x, this.y, 10);
        ctx.arcTo(this.x, this.y, this.x + this.w, this.y, 10);
        ctx.closePath();
        ctx.fill();

        ctx.shadowBlur = 0;
    } 

    move(isCPU, ball) {
        if (isCPU) {
            const speed = 4;
            const centerY = this.y + (this.l/2)            
            if (centerY < ball.y - ball.r) {
                this.vy = speed;
            } else if (centerY > ball.y + ball.r) {
                this.vy = -speed;
            } else {
                this.vy = 0;
            }
        }
        this.y += this.vy
        if (this.y < 0) this.y = 0;
        if (this.y + this.l > boardHeight) this.y = boardHeight - this.l;

    }
}
