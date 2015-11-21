/////////////////////////
//    TILES OBJECT     //
/////////////////////////

predefTiles = [
    {
        type: 0,
        //         [ n,  nw,   w,  sw,   s,  se,   e,  ne,   c  ]
        positions: ['f', 'f', 'f', 'f', 'f', 'f', 'f', 'f', 'cl'],
        total: 4
    },
    {
        type: 1,
        //         [ n,  nw,   w,  sw,   s,  se,   e,  ne,   c  ]
        positions: ['f', 'f', 'f', 'f', 'r', 'f', 'f', 'f', 'cl'],
        total: 2
    },
    {
        type: 2,
        //         [ n,    nw,   w,    sw,   s,    se,   e,    ne,   c  ]
        positions: ['ci', 'b', 'ci', 'ci', 'ci', 'ci', 'ci', 'ci', 'ci'],
        total: 1
    },
    {
        type: 3,
        //         [ n,    nw,   w,   sw,  s,   se,   e,   ne,   c  ]
        positions: ['ci', 'ci', 'ci', 'f', 'f', 'f', 'ci', 'ci', 'ci'],
        total: 3
    },
    {
        type: 4,
        //         [ n,   nw,   w,   sw,   s,  se,   e,   ne,   c  ]
        positions: ['ci', 'b', 'ci', 'f', 'f', 'f', 'ci', 'ci', 'ci'],
        total: 1
    },
    {
        type: 5,
        //         [ n,    nw,   w,   sw,   s,  se,   e,   ne,   c  ]
        positions: ['ci', 'ci', 'ci', 'f', 'r', 'f', 'ci', 'ci', 'ci'],
        total: 1
    },
    {
        type: 6,
        //         [ n,    nw,   w,   sw,   s,  se,   e,   ne,   c  ]
        positions: ['ci', 'b', 'ci', 'f', 'r', 'f', 'ci', 'ci', 'ci'],
        total: 2   
    },
    {
        type: 7,
        //         [ n,    nw,   w,   sw,   s,  se,   e,   ne,   c  ]
        positions: ['ci', 'ci', 'ci', 'f', 'f', 'f', 'f', 'f', 'f'],
        total: 3   
    },
    {
        type: 8,
        //         [ n,    nw,   w,   sw,   s,  se,   e,   ne,   c  ]
        positions: ['ci', 'b', 'ci', 'f', 'f', 'f', 'f', 'f', 'f'],
        total: 2   
    },
    {
        type: 9,
        //         [ n,    nw,   w,   sw,   s,  se,   e,   ne,   c  ]
        positions: ['ci', 'ci', 'ci', 'f', 'r', 'f', 'r', 'f', 'f'],
        total: 3   
    },
    {
        type: 10,
        //         [ n,    nw,   w,   sw,   s,  se,   e,   ne,   c  ]
        positions: ['ci', 'b', 'ci', 'f', 'r', 'f', 'r', 'f', 'f'],
        total: 2   
    },
    {
        type: 11,
        //         [ n,    nw,   w,   sw,   s,  se,   e,   ne,   c  ]
        positions: ['f',  'f',  'ci', 'f', 'f', 'f', 'ci', 'f', 'ci'],
        total: 1  
    },
    {
        type: 12,
        //         [ n,    nw,   w,   sw,   s,  se,   e,   ne,   c  ]
        positions: ['f',  'f',  'ci', 'f', 'f', 'f', 'b', 'f', 'ci'],
        total: 2  
    },
    {
        type: 13,
        //         [ n,    nw,   w,   sw,   s,  se,   e,   ne,   c  ]
        positions: ['ci',  'f',  'ci', 'f', 'f', 'f', 'f', 'f', 'f'],
        total: 2  
    },
    {
        type: 14,
        //         [ n,    nw,   w,   sw,   s,  se,   e,   ne,   c  ]
        positions: ['ci',  'f',  'f', 'f', 'ci', 'f', 'f', 'f', 'f'],
        total: 3  
    },
    {
        type: 15,
        //         [ n,    nw,   w,   sw,   s,  se,   e,   ne,   c  ]
        positions: ['ci',  'f',  'f', 'f', 'f', 'f', 'f', 'f', 'f'],
        total: 5  
    },
    {
        type: 16,
        //         [ n,    nw,   w,   sw,   s,  se,   e,   ne,   c  ]
        positions: ['ci',  'f',  'r', 'f', 'r', 'f', 'f', 'f', 'f'],
        total: 3 
    },
    {
        type: 17,
        //         [ n,    nw,   w,   sw,   s,  se,   e,   ne,   c  ]
        positions: ['ci',  'f',  'f', 'f', 'r', 'f', 'r', 'f', 'f'],
        total: 3 
    },
    {
        type: 18,
        //         [ n,    nw,   w,   sw,   s,  se,   e,   ne,   c  ]
        positions: ['ci',  'f',  'r', 'f', 'r', 'f', 'r', 'f', 'x'],
        total: 3 
    },
    {
        type: 19,
        //         [ n,    nw,   w,   sw,   s,  se,   e,   ne,   c  ]
        positions: ['ci',  'f',  'r', 'f', 'f', 'f', 'r', 'f', 'r'],
        total: 4 
    },
    {
        type: 20,
        //         [ n,    nw,   w,   sw,   s,  se,   e,   ne,   c  ]
        positions: ['r',  'f',   'f', 'f', 'r', 'f', 'f', 'f',  'r'],
        total: 8 
    },
    {
        type: 21,
        //         [ n,    nw,   w,   sw,   s,  se,   e,   ne,   c  ]
        positions: ['f',  'f',  'r', 'f', 'r', 'f', 'f', 'f',  'f'],
        total: 9 
    },
    {
        type: 22,
        //         [ n,    nw,   w,   sw,   s,  se,   e,   ne,   c  ]
        positions: ['f',  'f',   'r', 'f', 'r', 'f', 'r', 'f',  'x'],
        total: 4 
    },
    {
        type: 23,
        //         [ n,    nw,   w,   sw,   s,  se,   e,   ne,   c  ]
        positions: ['r',  'f',   'r', 'f', 'r', 'f', 'r', 'f',  'x'],
        total: 1 
    },

];

Tiles = function() {
    this.queue = [];
    this.currentTile = null;
}

//Returns random int between maximum(excluded)
//and minimum(included)
function getRandomArbitrary (max, min) {
    return Math.floor(Math.random() * (max - min) + min);
}

//Returns true if there are tiles left from
//each type, false if the contrary
function filterByTotal (obj) {
    if(obj.total > 0){
        return true;
    }else{
        return false;
    }
}

Tiles.prototype.initTiles = function() {
    var startingTiles = JSON.parse(JSON.stringify(predefTiles));
    while(this.queue.length < 72){
        var remainingTiles = startingTiles.filter(filterByTotal);
        var Type = getRandomArbitrary(remainingTiles.length,0);
        --remainingTiles[Type].total;
        var tile = new Tile(remainingTiles[Type].type, 0);
        console.log(tile.type);
        this.queue.push(tile);
    }
};

Tiles.prototype.popTile = function() {
    if(this.queue.length > 0){
        this.currentTile = this.queue.pop();
    }
};
