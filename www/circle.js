var N_POINTS = 100
var CIRCLE_THICKNESS = 10
var LINE_THICKNESS = 1
var SCROLL_RATE = 0.00005
var MAX_SCROLL_RATIO = 15

var view = {
    zoomNumber: 0,
    offset: {x:0, y:0},
    lastPoint:{x:0, y:0},
    center:{x:0,y:0},
    radius:1
}

var getCanvas = function() {return document.getElementById('circle-canvas')}

var init = function() {
    updateCanvasSize()
    getCanvas().addEventListener('mousewheel', scrollHandler, true)
}

var updateCanvasSize = function() {
    var canvas = getCanvas()
    canvas.height = window.innerHeight - Math.floor(canvas.getBoundingClientRect().top)
    canvas.width = window.innerWidth
    view.center = {x:canvas.width/2, y:canvas.height/2}
    view.radius = (Math.min(canvas.height, canvas.width) / 2) * 0.8
    draw()
}

var scrollHandler = function(event) {
    if (!event.wheelDelta) return
    var oldRatio = zoomRatio(view.zoomNumber)
    view.zoomNumber = Math.min(Math.max(
        view.zoomNumber + event.wheelDelta * SCROLL_RATE, 0), 1)
    view.lastPoint = {x:event.layerX, y:event.layerY}
    var newRatio = zoomRatio(view.zoomNumber)
    var change = newRatio/oldRatio
    var dispX = (event.layerX - view.center.x) / newRatio
    view.offset.x -= dispX * (change - 1)
    draw()
}

var zoomRatio = function(zoom) {
    return view.radius * Math.pow(MAX_SCROLL_RATIO, zoom)
}

var draw = function() {
    var canvas = getCanvas()
    var ctx = canvas.getContext("2d")

    
    zoom = zoomRatio(view.zoomNumber)
    ctx.clearRect(0,0,canvas.width, canvas.height)
    ctx.beginPath()
    ctx.arc(view.lastPoint.x, view.lastPoint.y, 6, 0, 2*Math.PI)
    ctx.fill()
    ctx.save()
    ctx.translate(view.center.x, view.center.y)
    ctx.scale(zoom, zoom)
    ctx.translate(view.offset.x, view.offset.y)
    drawCircle(ctx, CIRCLE_THICKNESS/zoom)
    drawLines(ctx, LINE_THICKNESS/zoom, N_POINTS)
    ctx.restore()
}

var drawCircle = function(ctx, thickness) {
    // Draw the circle
    ctx.strokeStyle = "rgb(70,70,250)"
    ctx.lineWidth = thickness
    ctx.beginPath()
    ctx.arc(0, 0, 1, 0, 2*Math.PI)
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

var pointOnCircle = function(percentageAround) {
    angle = 2 * Math.PI * percentageAround
    return {x: Math.cos(angle), y: Math.sin(angle)}
}

document.onscroll = scrollHandler
window.onload = init
window.onresize = updateCanvasSize
