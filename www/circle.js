window.onload = function() {
    updateCanvasSize()
}

window.onresize = function(event) {
    updateCanvasSize()
}

var updateCanvasSize = function() {
    var canvas = document.getElementById('circle-canvas')
    canvas.height = window.innerHeight - Math.floor(canvas.getBoundingClientRect().top)
    canvas.width = window.innerWidth
    draw(canvas)
}

var draw = function(canvas) {
    var ctx = canvas.getContext("2d");
    centerY = canvas.height / 2
    centerX = canvas.width / 2
    radius = (Math.min(canvas.height, canvas.width) / 2) * 0.8

    // Draw the circle
    ctx.strokeStyle = "rgb(70,70,250)"
    ctx.lineWidth = 10
    ctx.beginPath()
    ctx.arc(centerX,centerY,radius,0,2*Math.PI)
    ctx.stroke()

    // Draw the lines
    
    ctx.strokeStyle = "rgb(20,20,20)"
    ctx.lineWidth = 1

    var numLines = 20
    ctx.beginPath()

    var pointFor = function(i) {
        angle = 2 * (Math.PI / numLines) * i
        startX = centerX + Math.cos(angle) * radius
        startY = centerY + Math.sin(angle) * radius
        return {x:startX, y:startY}
    }
    for (var i = 0; i < numLines; i++) {
        for (var j = 0; j < numLines; j++){
            angle = 2 * (Math.PI / numLines) * i
            start = pointFor(i)
            end = pointFor(j)
            ctx.moveTo(start.x, start.y);
            ctx.lineTo(end.x, end.y);
        }
    };
    ctx.stroke()
}
