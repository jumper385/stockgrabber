class Arnold {

    constructor() {
        this.name = 'Arnold'
        this.tickhist = []
    }

    tick(newtick) {
        this.tickhist = [newtick, ...this.tickhist]
        console.log(this.tickhist[0])
    }

}

module.exports = {
    Arnold: Arnold
}