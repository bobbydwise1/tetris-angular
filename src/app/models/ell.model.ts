import { TestBlock } from './test_block.model'

export class EllBlock {
  [x: string]: any;
	constructor(x, y, w) {
    this.dead = false;
    this.collidedRight = false;
    this.collidedLeft = false;
		this.blocks = [];
		const blockW = 50;
		this.blocks.push(new TestBlock (x, y, blockW));
		this.blocks.push(new TestBlock(x, y - 50, blockW));
		this.blocks.push(new TestBlock(x, y - 100, blockW));
		this.blocks.push(new TestBlock(x + 50, y, blockW));
	}

	show(p5) {
		p5.push();
    p5.fill('orange')
		for (const block of this.blocks) {
			block.show(p5);
		}
		p5.pop();
	}

  moveDown() {
    for (let i = 0; i < this.blocks.length; i++) {
      if ((this.dead === false) && (this.blocks[i].y < 950)) {
        this.blocks[i].y += 50
      }
    }
  }

  moveRight() {
    this.collidedLeft = false;
    for (let i = 0; i < this.blocks.length; i++) {
      if ((this.dead === false) && (this.collidedRight === false) && (this.blocks[i].x <= 400)) {
        this.blocks[i].x+= 50
      }
    }
  }

  moveLeft() {
    this.collidedRight = false;
    console.log(this.collidedLeft)
    for (let i = 0; i < this.blocks.length; i++) {
      if ((this.dead === false) && (this.collidedLeft === false) && (this.blocks[i].x >= 0)) {
        this.blocks[i].x -= 50
      }
    }
  }

  borderCheck(bodies) {
    for (let i =0; i < this.blocks.length; i++) {
      if (this.blocks[i].y >= 950) {
        this.dead = true;
        // console.log('hit bottom')
      }
      if (this.blocks[i].x >= 450){
        this.collidedRight = true;
        // console.log('hit right')
        // console.log(this.collidedRight)
      }
      if (this.blocks[i].x <= 0){
        this.collidedLeft = true;
        // console.log('hit left')
      }
    }
  }

  noHitDown(bodies, gameArray) {
    let value = 0;
    for (let i = 0; i < bodies.length; i++) {
      this.blocks.forEach((block) => {
        for (let z = 0; z < gameArray.length; z ++) {
          if (gameArray[z+1]) {
          let row = gameArray[z+1]
          // console.log(row[0])
          for (let j = 0; j < row.length; j++) {
            let position = row[j];
            // console.log(position)
            if (block.y+50 === position[2] && block.x === position[1]) {

             console.log('success')
              if (position[0] === 0) {
                // console.log('before', value)
                console.log(value)
                value += 1
                // console.log('after', value)
                // console.log(value)
              }
            }
          }
        }
        }
      })
    }
    if (value === 2*bodies.length) {
      return true;

    }
  }

  noHitLeft(bodies, gameArray) {
    let value = 0
    for (let i = 0; i < bodies.length; i++) {
      this.blocks.forEach((block) => {
        for (let z = 0; z < gameArray.length; z ++) {
          let row = gameArray[z]
          // console.log(row[0])
          // debugger;
          for (let j = 0; j < row.length; j++) {
            let position = row[j];
            let futurePos = row[j-1]
            if (position[1] != 0) {
               // console.log(block.y, block.x)
              if (block.y === position[2] && block.x === position[1]) {
                // console.log('hit')
                if (futurePos[0] === 0) {
                  // console.log(position)
                  // console.log('future',futurePos)
                  value += 1;
                  // console.log(value)
                }
              }
            }
          }
        }
      })
    }
    // console.log(bodies.length)
    if (value === 2*bodies.length) {
      return true;

    }
  }

  noHitRight(bodies, gameArray) {
    let value = 0
    for (let i = 0; i < bodies.length; i++) {
      this.blocks.forEach((block) => {
        for (let z = 0; z < gameArray.length; z ++) {
          let row = gameArray[z]
          // console.log(row[0])
          // debugger;
          for (let j = 0; j < row.length; j++) {
            let position = row[j];
            let futurePos = row[j+1]
            if (position[1] != 0) {
               // console.log(block.y, block.x)
              if (block.y === position[2] && block.x === position[1]) {
                // console.log('hit')
                if (futurePos[0] === 0) {
                  // console.log(position)
                  // console.log('future',futurePos)
                  value += 1;
                  // console.log(value)
                }
              }
            }
          }
        }
      })
    }
    // console.log(bodies.length)
    if (value === 2*bodies.length) {
      return true;

    }
  }

}
