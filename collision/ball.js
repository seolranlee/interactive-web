export class Ball {
    constructor(stageWidth, stageHeight, radius, speed) {
        this.radius = radius
        this.vx = speed //  vx: x좌표값을 움직이는 속도
        this.vy = speed//   vy: y좌표값을 움직이는 속도

        const diameter = this.radius * 2
        this.x = this.radius + Math.random() * (stageWidth - diameter) // 스테이지에 랜덤으로 위치할 수 있게 하는 함수 정의
        this.y = this.radius + Math.random() * (stageHeight - diameter)// 스테이지에 랜덤으로 위치할 수 있게 하는 함수 정의
    }

    draw(ctx, stageWidth, stageHeight, block) {
        this.x += this.vx
        this.y += this.vy

        this.bounceWindow(stageWidth, stageHeight)

        this.bounceBlock(block)

        ctx.fillStyle = '#fdd700';
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI)    // https://www.w3schools.com/tags/canvas_arc.asp
        ctx.fill()

    }

    bounceWindow(stageWidth, stageHeight) { // 스테이지상에 닿았는지를 판별 > 닿으면 공이 반대로 튀기게
        const minX = this.radius
        const maxX = stageWidth - this.radius
        const minY = this.radius
        const maxY = stageHeight - this.radius

        if(this.x <= minX || this.x >= maxX) {
            this.vx *= -1
            this.x += this.vx
        } else if(this.y <= minY || this.y >= maxY) {
            this.vy *= -1
            this.y += this.vy
        }
    }

    bounceBlock(block) {
        const minX = block.x - this.radius
        const maxX = block.maxX + this.radius
        const minY = block.y - this.radius
        const maxY = block.maxY + this.radius

        if(this.x > minX && this.x < maxX && this.y > minY && this.y < maxY) {
            const x1 = Math.abs(minX - this.x)
            const x2 = Math.abs(this.x - maxX)
            const y1 = Math.abs(minY - this.y)
            const y2 = Math.abs(this.y - maxY)
            const min1 = Math.min(x1, x2)
            const min2 = Math.min(y1, y2)
            const min = Math.min(min1, min2)
            if (min == min1) {
                this.vx *= -1
                this.x += this.vx
            } else if (min == min2) {
                this.vy *= -1
                this.y += this.vy
            }
        }
    }

    
}