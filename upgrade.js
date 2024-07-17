class Upgrade {
    constructor(upgradesL, upgradesR) {
    this.upgradesL = upgradesL;
    this.upgradesR = upgradesR;
    }

    applyUpgrade(paddle) {
        paddle.l *= 1.2; //20% paddle lenth inc
        paddle.w *= 1.2; //20% paddle width inc
        paddle.c = "gold";
    }

    removeUpgrade(paddle) {
        // paddle.l /= 1.2; // Revert paddle length
        paddle.w /= 1.2; // Revert paddle width
        paddle.c = "white";
    }

    randomUpgrade(side) {
        const chance = Math.random();
        if (chance < 0.25) { // 25% chance to get an upgrade
            this.gainUpgrade(side);
        }
    }

    gainUpgrade(side) {
        let paddle;
        if (side == SIDE.LEFT) {
            this.upgradesL++;
            paddle = paddleL;
        } else if (side == SIDE.RIGHT) {
            this.upgradesR++;
            paddle = paddleR;
        }
        this.applyUpgrade(paddle);
    }
}

const upgradeManager = new Upgrade();