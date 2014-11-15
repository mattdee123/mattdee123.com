// [{tf:{a:0, b:1}}, {tf:{a:2,b:2}, final:true}, {tf:{a:2,b:2}}]

var DFA = function(inputStates, startState, langauge) {
    this.start = startState
    this.states = inputStates
    this.langauge = langauge
    this.numStates = Object.keys(inputStates).length
    var error = this.validate(inputStates, startState, langauge)
    if (error) {
        throw error
    }

}

DFA.prototype.check = function(input) {
    var current = this.start
    for (var i = 0; i < input.length; i++) {
        current = this.states[current].tf[input[i]]
    }
    return this.states[current].final
};

DFA.prototype.step = function(state, character) {
    return this.states[state].tf[character]
};

DFA.prototype.validate = function() {
    if (!(this.start in this.states)) {
        return "Invalid Start State"
    }
    var count = 0
    for (var s in this.states) {
        count ++
        var tf = s.tf
        for (var i in this.langauge) {
            var next = this.step(s, this.langauge[i])
            if (!(next in this.states)) {
                return "Invalid State Transition:("+s+","+c+")->"+next 
            }
        }
    }
    if (count != this.numStates) {
        return "Incorrect Count"
    }
}
DFA.prototype.toString = function() {
    return JSON.stringify(this)
};

DFA.prototype.draw = function(ctx) {
    if (!this.loc) { this.generateLocations() }
    for (s in this.states) {
        loc = this.loc[s]
        x = loc.x
        y = loc.y
        ctx.beginPath()
        ctx.arc(x,y,this.radius, 0, 6.3)
        ctx.stroke()
        ctx.strokeText(s, x, y)
    }

};
var DRAW_SCALE = 100.0
DFA.prototype.generateLocations = function() {
    var step = DRAW_SCALE / this.numStates
    var locs = {}
    var currentX = step / 2
    this.radius = step/3
    for (var s in this.states) {
        locs[s] = {x:currentX, y: 0.25*DRAW_SCALE}
        currentX += step
    }
    this.loc = locs
};


var s = {0:{tf:{a:0, b:1}}, 1:{tf:{a:2,b:2}, final: true}, 2:{tf:{a:2,b:2}}}
var a = new DFA(s, 0, ["a", "b"])