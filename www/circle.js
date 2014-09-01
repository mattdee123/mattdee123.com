var updateCanvasSize = function() {
    console.log("HELLO")
    var canvas = document.getElementById('circle-canvas')
    canvas.height = window.innerHeight - Math.floor(canvas.getBoundingClientRect().top)
    canvas.width = window.innerWidth
    draw(canvas)
}

window.onload = updateCanvasSize
window.onresize = updateCanvasSize

var N_POINTS = 40
var CIRCLE_THICKNESS = 10
var LINE_THICKNESS = 1

var draw = function(canvas) {
    var ctx = canvas.getContext("2d")
    centerY = canvas.height / 2
    centerX = canvas.width / 2
    radius = (Math.min(canvas.height, canvas.width) / 2) * 0.8

    ctx.translate(centerX, centerY)
    ctx.scale(radius, radius)
    drawCircle(ctx, CIRCLE_THICKNESS/radius)
    drawLines(ctx, LINE_THICKNESS/radius, N_POINTS)
}

var pointOnCircle = function(percentageAround) {
    angle = 2 * Math.PI * percentageAround
    return {x:Math.cos(angle), y:Math.sin(angle)}
}

var drawCircle = function(ctx, thickness) {
    // Draw the circle
    ctx.strokeStyle = "rgb(70,70,250)"
    ctx.lineWidth = thickness
    ctx.beginPath()
    ctx.arc(0,0,1,0,2*Math.PI)
    ctx.stroke()
}

var drawLines = function(ctx, thickness, nPoints) {
    ctx.strokeStyle = "rgb(20,20,20)"
    ctx.lineWidth = thickness

    points = new Array(nPoints)
    for (var i = 0; i < nPoints; i++) {
        points[i] = pointOnCircle(i/nPoints)
    };
    ctx.beginPath()
    for (var i = 0; i < nPoints; i++) {
        for (var j = 0; j < nPoints; j++) {
            ctx.moveTo(points[i].x, points[i].y)
            ctx.lineTo(points[j].x, points[j].y)
        };
    };
    ctx.stroke()
}