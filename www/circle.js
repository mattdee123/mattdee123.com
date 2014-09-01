var CIRCLE_THICKNESS = 10
var LINE_THICKNESS = 1
var SCROLL_RATE = 0.00005
var MAX_SCROLL_RATIO = 15

var view = {
    zoomNumber: 0,
    offset: {x:0, y:0},
    center:{x:0,y:0},
    radius:1,
    canvas: null,
    nPoints: 0,
    input: null,
    zoom: null
}

var getCanvas = function() {return view.canvas}

var updateNumPoints = function(newValue) {
    newValue = Math.max(newValue, 0)
    view.nPoints = newValue
    view.input.value = newValue
    draw()
}

var init = function() {
    var canvas = document.getElementById('circle-canvas')
    view.canvas = canvas
    var input = document.getElementById("input")
    view.input = input
    var zoom = document.getElementById("zoom")
    view.zoom = zoom

    updateCanvasSize()
    updateNumPoints(20)
    // Most browsers
    canvas.addEventListener('mousewheel', scrollHandler, true)
    // Firefox
    canvas.addEventListener('wheel', scrollHandler, true)
    canvas.onmousedown = mouseDownHandler
    canvas.onmouseup = mouseUpHandler

    input.onkeypress = function(event) {
        if (event.keyCode == 13) {

            var val = parseInt(input.value)
            if (isNaN(val) || val < 0) {
                updateNumPoints(view.nPoints)
                return
            }
            updateNumPoints(val)
        }
    }
    document.getElementById("morePoints").onclick = function(){
        updateNumPoints(view.nPoints + 1)
    }
    document.getElementById("lessPoints").onclick = function(){
        updateNumPoints(view.nPoints - 1)
    }

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
    console.log("SCROLL", event)
    // DeltaY is a firefox thing
    scroll = event.wheelDelta || event.deltaY*-100
    console.log(scroll)
    if (!scroll) return
    var oldRatio = zoomRatio(view.zoomNumber)
    view.zoomNumber = Math.max(
        view.zoomNumber + scroll * SCROLL_RATE, 0)
    var newRatio = zoomRatio(view.zoomNumber)
    var change = newRatio/oldRatio
    var dispX = (event.layerX - view.center.x) / newRatio
    var dispY = (event.layerY - view.center.y) / newRatio

    view.offset.x -= dispX * (change - 1)
    view.offset.y -= dispY * (change - 1)
    view.zoom.innerHTML = Math.round(newRatio * 100 / view.radius) + "%"
    draw()
}

var mouseDownHandler = function(e) {
    var lastX = e.layerX
    var lastY = e.layerY
    getCanvas().onmousemove = function(event) {
        var zoom = zoomRatio(view.zoomNumber)
        // console.log(event)
        var x = event.layerX
        var y = event.layerY
        view.offset.x += (x - lastX)/zoom
        view.offset.y += (y - lastY)/zoom
        lastX = x
        lastY = y
        draw()
    }
}

var mouseUpHandler = function(event) {
    getCanvas().onmousemove = null
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
    ctx.fill()
    ctx.save()
    ctx.translate(view.center.x, view.center.y)
    ctx.scale(zoom, zoom)
    ctx.translate(view.offset.x, view.offset.y)
    drawCircle(ctx, CIRCLE_THICKNESS/zoom)
    drawLines(ctx, LINE_THICKNESS/zoom, view.nPoints)
    ctx.restore()
}

var drawCircle = function(ctx, thickness) {
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
    }
    ctx.beginPath()
    for (var i = 0; i < nPoints; i++) {
        for (var j = 0; j < nPoints; j++) {
            ctx.moveTo(points[i].x, points[i].y)
            ctx.lineTo(points[j].x, points[j].y)
        }
    }
    ctx.stroke()
}

var pointOnCircle = function(percentageAround) {
    angle = 2 * Math.PI * percentageAround
    return {x: Math.cos(angle), y: Math.sin(angle)}
}

document.onscroll = scrollHandler
window.onload = init
window.onresize = updateCanvasSize
