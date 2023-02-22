console.clear()
const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

resizeCanvas()

let pipes = []

class Pipe {
  constructor(x, y, size, xVel, yVel, clr) {
    this.x = x
    this.y = y
    this.size = size
    this.color = clr
    this.xVel = xVel
    this.xPrev = xVel
    this.yVel = yVel
    this.yPrev = yVel
    this.minDist = this.updateMinDist()
    this.dist = 0
    this.hasEnteredScreen = false
  }
  update() {
    this.x += this.xVel
    this.y += this.yVel
    this.dist++
    
    if (!this.hasEnteredScreen) {
      if (this.x > 0 && this.x < canvas.width && this.y > 0 && this.y < canvas.height) {
        this.hasEnteredScreen = true
      }
    }
    
    if (this.dist % this.minDist === 0) {
      if (Math.random() > 0.75) {
        this.changeDirections()
        this.minDist = this.updateMinDist()
      }
    }
  }
  draw() {
    const scale = 8
    const gradient = ctx.createRadialGradient(this.x, this.y, 2, this.x, this.y, this.size * scale);

    // Add three color stops
    gradient.addColorStop(0, "rgba(60, 0, 83, 0.04)");
    gradient.addColorStop(1, "rgba(60, 0, 83, 0)");

    // Set the fill style and draw a rectangle
    ctx.fillStyle = gradient;
    ctx.fillRect(this.x - this.size * (scale / 2), this.y - this.size * (scale / 2), this.size * scale, this.size * scale);
    
    ctx.beginPath()
    ctx.fillStyle = this.color
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
    ctx.fill()
    ctx.closePath()
  }
  updateMinDist() {
    return Math.floor(Math.random() * 100 + 50)
  }
  changeDirections() {
    const prevX = this.xVel
    const prevY = this.yVel
    this.xVel = Math.random() > 0.5 ? this.yPrev : this.yPrev * -1
    this.yVel = Math.random() > 0.5 ? this.xPrev : this.xPrev * -1
    this.xPrev = this.xVel
    this.yPrev = this.yVel
  }
}

function init(quantity, clr, scale = 1) {
  for (let i = 0; i < quantity; i++) {
    const speed = Math.random() * 0.4 + 0.25 
    let x, y, xVel, yVel
    // const size = Math.random() * 3 + 1
    const size = (Math.random() + 0.5 - 0.5) * scale
    if (Math.random() >= 0.5) {
      x = Math.random() > 0.5 ? size * -1 : canvas.width + size
      y = Math.random() * canvas.height
      xVel = x < 0 ? speed : speed * -1
      yVel = 0
    } else {
      x = Math.random() * canvas.width
      y = Math.random() > 0.5 ? size * -1 : canvas.height + size
      xVel = 0
      yVel = y < 0 ? speed : speed * -1
    }
    pipes.push(new Pipe(x, y, size, xVel, yVel, clr))
  }
}
init(16, '#9f55ca')
// init(16, '#fff')
setTimeout(() => {
  init(16, '#c07ee6', 1.5)
// init(10, '#fff', 1.1)
}, 1500) 
setTimeout(() => {
  init(8, '#e4c6f5', 2)
// init(6, '#fff', 1.25)
}, 3000) 

function animate() {
  
  for (let i = 0; i < pipes.length; i++) {
    pipes[i].update()
    pipes[i].draw()
    
    if (pipes[i].hasEnteredScreen) {
      if (pipes[i].x < 0 || pipes[i].x > canvas.width || pipes[i].y < 0 || pipes[i].y > canvas.height) {
        pipes.splice(i, 1)
        i--
      }
    }
  }
  
  console.log(pipes.length)
  
  requestAnimationFrame(animate)
}
animate()

window.addEventListener('resize', resizeCanvas)

function resizeCanvas() {
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
}