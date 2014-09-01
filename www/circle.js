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
    console.log(ctx)
    centerY = canvas.height / 2
    centerX = canvas.width / 2
    ctx.fillStyle = "rgb(100,20,50)"
    ctx.fillRect(0,0,10000,10000)
    ctx.fillStyle = "rgb(50,50,50)"
    ctx.beginPath()
    ctx.arc(centerX,centerY,60,0,2*Math.PI)
    ctx.fill()
}