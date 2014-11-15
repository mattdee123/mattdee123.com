var c;

var resize = function() {
    var canvas = document.getElementById("canvas")
    var ctx = canvas.getContext("2d")
    c = ctx
    
    canvas.height = window.innerHeight - canvas.getBoundingClientRect().top
    canvas.width = window.innerWidth - canvas.getBoundingClientRect().left
    var scale = Math.min(canvas.height, canvas.width)/100
    // scale = 100
    ctx.scale(scale, scale)
    
    ctx.lineWidth = 1/scale
    ctx.font = "10px Arial"
    // ctx.textBaseline = "middle"
    // ctx.strokeText("asdf", 1, 1)
    // ctx.textBaseline = "hanging"
    // ctx.strokeText("asdf", 1, 1)
    ctx.textAlign = "center"
    ctx.textBaseline="middle"; 
    a.draw(ctx)
}

window.onload = resize
window.onresize = resize