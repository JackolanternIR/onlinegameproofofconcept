PT.displayList = {
    list: [],
    addToDisplay: function(name, obj, index) {
        if (this.list.length == 0) {
            this.list[0] = {name: name, obj: obj};
            return;
        }
        if (!index) {
            this.list.push({name: name, obj: obj});
            return;
        }
        this.list.splice(index, 0, {name: name, obj: obj})
    },
    removeIndexFromDisplay: function(index) {
        this.list.splice(index, 1);
    },
    removeNameFromDisplay: function(name) {
        for (var i = 0; i < this.list.length; i++) {
            if (this.list[i].name == name) {
                //this is the object, so remove it
                this.list.splice(i, 1);
            }
        }
    },
    emptyDisplayList: function() {
        this.list = [];
    },
    isDisplayListEmpty: function() {
        return this.list.length == 0;
    },
    runUpdate: function() {
        for (var x = 0; x < this.list.length; x++) {
            this.list[x].obj.update();
        }
    }
};
