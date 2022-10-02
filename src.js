//Copyright Harrison Fagan 2020
//All rights reserved

//14 and 7 squares

var gamestarted = false;
var c = document.getElementById("canvas");
var ctx = c.getContext("2d");
var size = [0,0]

var typearray = ['dirt','coal','iron','titanium','silver','emerald','amethyst','ruby','gold','diamond']
var possresources = []

var mstime = 0;

var direction = "l"
var map = []
var squarenum =0

var drillplace = [0,0]
var drill = new Image()
drill.src = "drill" + direction + ".png"
var drawdrill = true;

var drillmovelastpress = 0;
var lastanimate = 0;
var lastanimateflip = "";

var resourceamounts = [1,5,10,20,40,100,100,100,250]
var resourceamountskey = ['coal','iron','titanium','silver','gold','emerald','amethyst','ruby','diamond']
var findevent = [false,false,false,false,false,false,false,false,false,false,false]

var curmaprowrange = [0,6]

var moneyimg = new Image()
moneyimg.src = "Images/Back/money.png"
var money = 0;

var coalamountimg = new Image();
coalamountimg.src = "Images/Back/coalamount.png";
var coalamount = 0;

var ironamountimg = new Image();
ironamountimg.src = "Images/Back/ironamount.png";
var ironamount = 0;

var titaniumamountimg = new Image();
titaniumamountimg.src = "Images/Back/titaniumamount.png";
var titaniumamount = 0;

var boneamountimg = new Image();
boneamountimg.src = "Images/Back/boneamount.png";
var boneamount = 0;

var digspeed = 50;

var messagequeue = [];

var buildmenuimg = new Image();
buildmenuimg.src = "Images/Back/build.png"

var infoimg = new Image();
infoimg.src = "Images/Back/info.png"

var clicklocate = {x:0,y:0};

var openinfomenu, openbuildmenu,openblastoffmenu;

var structlist = [];

var digdogevent;

var randomeventanimstate = 0;

var timesincelasteventmsg = 0;

var gameintrodone = false;
var gameintrostage = 0;

var gas = 750;
var gasbought = false;

var smelterymult = 1;

var squareimgs = [
    aboveg = {
        id: "aboveg",
        img: new Image()
    },
    amethyst = {
        id: "amethyst",
        img: new Image()
    },
    bones = {
        id: "bones",
        img: new Image()
    },
    coal = {
        id: "coal",
        img: new Image()
    },
    diamond = {
        id: "diamond",
        img: new Image()
    },
    dirt= {
        id: "dirt",
        img: new Image()
    },
    emerald = {
        id: "emerald",
        img: new Image()
    },
    gold = {
        id: "gold",
        img: new Image()
    },
    iron = {
        id: "iron",
        img: new Image()
    },
    ruby = {
        id: "ruby",
        img: new Image()
    },
    silver = {
        id: "silver",
        img: new Image()
    },
    titanium = {
        id: "titanium",
        img: new Image()
    },
    dug = {
        id: "dug",
        img: new Image()
    }
]
var structimages = [
    bonedog = {
        id: "bonedog",
        img0: new Image(),
        img1: new Image(),
        img2: new Image()
    },
    buddadog = {
        id: "buddadog",
        img0: new Image(),
        img1: new Image(),
        img2: new Image()
    },
    cavepupa = {
        id: "cavepupa",
        img0: new Image(),
        img1: new Image(),
        img2: new Image()
    },
    dogbank = {
        id: "dogbank",
        img0: new Image(),
        img1: new Image(),
        img2: new Image()
    },
    dogbar = {
        id: "dogbar",
        img0: new Image(),
        img1: new Image(),
        img2: new Image()
    },
    dogdigh = {
        id: "dogdigh",
        img0: new Image(),
        img1: new Image(),
        img2: new Image()
    },
    dogdighl = {
        id: "dogdighl",
        img0: new Image(),
        img1: new Image(),
        img2: new Image()
    },
    jewler = {
        id: "jewler",
        img0: new Image(),
        img1: new Image(),
        img2: new Image()
    },
    sciencedog = {
        id: "sciencedog",
        img0: new Image(),
        img1: new Image(),
        img2: new Image()
    },
    smeltery = {
        id: "smeltery",
        img0: new Image(),
        img1: new Image(),
        img2: new Image()
    },
    transporter = {
        id: "transporter",
        img0: new Image(),
        img1: new Image(),
        img2: new Image()
    },
    rocketbase = {
        id: "rocketbase",
        img0: new Image(),
        img1: new Image(),
        img2: new Image()
    },
    rocket = {
        id: "rocket",
        img0: new Image(),
        img1: new Image(),
        img2: new Image()
    }
];
var digstateimgs = {
    dug0: new Image(),
    dug1: new Image(),
    dug2: new Image(),
    dug3: new Image()
};
function loadimgs() {
    //Bonedog
    structimages[0].img0.src = "Images/Structs/bonedog0.png";
    structimages[0].img1.src = "Images/Structs/bonedog1.png";
    structimages[0].img2.src = "Images/Structs/bonedog2.png";
    //buddadog
    structimages[1].img0.src = "Images/Structs/buddadog0.png";
    structimages[1].img1.src = "Images/Structs/buddadog1.png";
    structimages[1].img2.src = "Images/Structs/buddadog2.png";
    //cavepupa
    structimages[2].img0.src = "Images/Structs/cavepupa0.png";
    structimages[2].img1.src = "Images/Structs/cavepupa1.png";
    structimages[2].img2.src = "Images/Structs/cavepupa2.png";
    //dogbank
    structimages[3].img0.src = "Images/Structs/dogbank0.png";
    structimages[3].img1.src = "Images/Structs/dogbank1.png";
    structimages[3].img2.src = "Images/Structs/dogbank2.png";
    //dogbar
    structimages[4].img0.src = "Images/Structs/dogbar0.png";
    structimages[4].img1.src = "Images/Structs/dogbar1.png";
    structimages[4].img2.src = "Images/Structs/dogbar2.png";
    //dogdigh
    structimages[5].img0.src = "Images/Structs/dogdigh0.png";
    structimages[5].img1.src = "Images/Structs/dogdigh1.png";
    structimages[5].img2.src = "Images/Structs/dogdigh2.png";
    //dogdighl
    structimages[6].img0.src = "Images/Structs/dogdighl0.png";
    structimages[6].img1.src = "Images/Structs/dogdighl1.png";
    structimages[6].img2.src = "Images/Structs/dogdighl2.png";
    //jewler
    structimages[7].img0.src = "Images/Structs/jewler0.png";
    structimages[7].img1.src = "Images/Structs/jewler1.png";
    structimages[7].img2.src = "Images/Structs/jewler2.png";
    //sciencedog
    structimages[8].img0.src = "Images/Structs/sciencedog0.png";
    structimages[8].img1.src = "Images/Structs/sciencedog1.png";
    structimages[8].img2.src = "Images/Structs/sciencedog2.png";
    //smeltery
    structimages[9].img0.src = "Images/Structs/smeltery0.png";
    structimages[9].img1.src = "Images/Structs/smeltery1.png";
    structimages[9].img2.src = "Images/Structs/smeltery2.png";
    //transporter
    structimages[10].img0.src = "Images/Structs/transporter0.png";
    structimages[10].img1.src = "Images/Structs/transporter1.png";
    structimages[10].img2.src = "Images/Structs/transporter2.png";
    //digstates
    digstateimgs.dug0.src = "Images/Back/dug0.png";
    digstateimgs.dug1.src = "Images/Back/dug1.png";
    digstateimgs.dug2.src = "Images/Back/dug2.png";
    digstateimgs.dug3.src = "Images/Back/dug3.png";
    //squareimgs
    squareimgs[0].img.src = "Images/Back/aboveg.png";
    squareimgs[1].img.src = "Images/Back/amethyst.png";
    squareimgs[2].img.src = "Images/Back/bones.png";
    squareimgs[3].img.src = "Images/Back/coal.png";
    squareimgs[4].img.src = "Images/Back/diamond.png";
    squareimgs[5].img.src = "Images/Back/dirt.png";
    squareimgs[6].img.src = "Images/Back/emerald.png";
    squareimgs[7].img.src = "Images/Back/gold.png";
    squareimgs[8].img.src = "Images/Back/iron.png";
    squareimgs[9].img.src = "Images/Back/ruby.png";
    squareimgs[10].img.src = "Images/Back/silver.png";
    squareimgs[11].img.src = "Images/Back/titanium.png";
    squareimgs[12].img.src = "Images/Back/dug.png";
    //rocketimgs
    structimages[11].img0.src = "Images/Structs/rocketbase0.png";
    structimages[11].img1.src = "Images/Structs/rocketbase0.png";
    structimages[11].img2.src = "Images/Structs/rocketbase0.png";
    structimages[12].img0.src = "Images/Structs/rocket0.png";
    structimages[12].img1.src = "Images/Structs/rocket0.png";
    structimages[12].img2.src = "Images/Structs/rocket0.png";
    
    
};
loadimgs();

function randomtypegen(row) {
    if(row == 0) {
        return 'aboveg'
    }
    if(row >= 500) {
        if(possresources.includes(typearray[9]) == false) {
            possresources.push(typearray[9])
        }
    } else if(row >= 450) {
        if(possresources.includes(typearray[8]) == false) {
            possresources.push(typearray[8])
        }
    } else if(row >= 425) {
        if(possresources.includes(typearray[7]) == false) {
            possresources.push(typearray[7])
        }
    } else if(row >= 400) {
        if(possresources.includes(typearray[6]) == false) {
            possresources.push(typearray[6])
        }
    } else if(row >= 200) {
        if(possresources.includes(typearray[5]) == false) {
            possresources.push(typearray[5])
        }
    } else if(row >= 100) {
        if(possresources.includes(typearray[4]) == false) {
            possresources.push(typearray[4])
        }
    } else if(row >= 50) {
        if(possresources.includes(typearray[3]) == false) {
            possresources.push(typearray[3])
        }
    } else if(row >= 25) {
        if(possresources.includes(typearray[2]) == false) {
            possresources.push(typearray[2])
        }
    } else if(row >= 5) {
        if(possresources.includes(typearray[1]) == false) {
            possresources.push(typearray[1])
        }
    }
    
    if(possresources.length == 0){
        return typearray[0];
    }
    var thisrandom = Math.random();
    if(row <= 500) {
        if(thisrandom <= 0.8) {
            return typearray[0]
        } else if(thisrandom >= 0.99995) {
            return "bones"
        } else {
            return possresources[Math.floor(Math.random() * possresources.length)];
        }
    } else if(row<=1000) {
        if(thisrandom <= 0.5) {
            return typearray[0]
        } else if(thisrandom >= 0.99990) {
            return "bones"
        } else {
            return possresources[Math.floor(Math.random() * possresources.length)];
        }
    } else {
        if(thisrandom <= 0.2) {
            return typearray[0]
        } else if(thisrandom >= 0.9950) {
            return "bones"
        } else {
            return possresources[Math.floor(Math.random() * possresources.length)];
        }
    }
}
     

function movewithkeys(e) {
    if(gamestarted == true) {
        if(e.keyCode == 32) {
           if(rocketbuilt == true) {
               currlaunching = true;
           }
        }
        if(e.keyCode == 75 && drillmovelastpress >= 25) {
            messagequeue.shift();
        }
        if(drillmovelastpress >= digspeed && gas > 0 && currlaunching == false) {
            gas-=1;
            imgs();
            if(e.keyCode == 37) {
                if(direction != "r") {
                    direction = "r"  
                } else if (direction == "r") {
                    if(drillplace[0] > 0) {
                        (map[drillplace[1]][drillplace[0]-1]).digstate += 1;
                        if((map[drillplace[1]][drillplace[0]-1]).digstate >= 4|| drillplace[1] == 0) {
                            drillplace[0] -= 1   
                        }
                    }
                }
            } else if(e.keyCode == 38) {
                if(direction != "u") {
                    direction = "u"  
                } else if (direction == "u") {
                    if(drillplace[1] > 0) {
                        (map[drillplace[1]-1][drillplace[0]]).digstate += 1;
                        if((map[drillplace[1]-1][drillplace[0]]).digstate >= 4) {
                            drillplace[1] -= 1
                        }
                    }
                }
            } else if(e.keyCode == 39) {
                if(direction != "l") {
                    direction = "l"  
                } else if (direction == "l") {
                    if(drillplace[0] < 13) {
                        (map[drillplace[1]][drillplace[0]+1]).digstate += 1;
                        if((map[drillplace[1]][drillplace[0]+1]).digstate >= 4 || drillplace[1] == 0) {
                            drillplace[0] += 1 
                        }
                    }
                }
            } else if(e.keyCode == 40) {
                if(direction != "d") {
                    direction = "d"  
                } else if (direction == "d") {
                    (map[drillplace[1]+1][drillplace[0]]).digstate += 1;
                    if((map[drillplace[1]+1][drillplace[0]]).digstate >= 4) {
                        drillplace[1] += 1 
                    }

                }
            }
            drillmovelastpress = 0
        } else if(gas==0 && drillmovelastpress >=500 && e.keyCode != 75 ) {
            messagequeue.push(new newmessage("Yikes you're out of gas","goldy",500,"#000000"))
            drillmovelastpress == 0;
        }
    }
};
document.addEventListener("keydown", movewithkeys);

function clickdetect(e) {
    var rect = e.target.getBoundingClientRect();
    clicklocate.x = e.clientX - rect.left; //x position within the element.
    clicklocate.y = e.clientY - rect.top;  //y position within the element.
    //console.log(clicklocate.x + " " + clicklocate.y)
    if(gamestarted == false) {
        if(clicklocate.x >= 300 && clicklocate.x <= 1125 && clicklocate.y >= 75 && clicklocate.y <= 325) {
            gamestarted = true;
        }
    } else {
        if(clicklocate.x >= 1296 && clicklocate.y <= 48) {
            if(openinfomenu == true) {
                openinfomenu = false;
            } else {
                openinfomenu = true;
                openbuildmenu = false;
                openblastoffmenu = false;
            }
        } else if(clicklocate.x>= 1248 && clicklocate.y <= 48) {
            if(openbuildmenu == true) {
                openbuildmenu = false;
            } else {
                openbuildmenu = true;
                openblastoffmenu = false;
                openinfomenu = false;
            }
        } else if(clicklocate.x>= 1200 && clicklocate.y <= 48) {
            if(openblastoffmenu == true) {
                openblastoffmenu = false;
            } else {
                openbuildmenu = false;
                openinfomenu = false;
                openblastoffmenu = true;
            }  
        } else if(openbuildmenu == true) {
            for(i=0;i < buildmenuelementlist.length;i++) {
                if(clicklocate.x >= buildmenuelementlist[i].x && clicklocate.x <= (buildmenuelementlist[i].x + 288)) {
                    if(clicklocate.y >= buildmenuelementlist[i].y && clicklocate.y <= buildmenuelementlist[i].y+192) {
                        buildmenupresshandler(buildmenuelementlist[i].type);
                }}
            }
        } else {
            openbuildmenu = false;
            openinfomenu = false;
        }
        if(openblastoffmenu == true) {
            if(clicklocate.x >= 96 && clicklocate.x <= 672 && clicklocate.y >= 96 && clicklocate.y <= 480) {
                blastoffmenupresshandler(1);
            } else if(clicklocate.x >= 672 && clicklocate.x <= 1248 && clicklocate.y >= 96 && clicklocate.y <= 480) {
                blastoffmenupresshandler(2);
            }
        }
        if(messagequeue.length > 0 && messagequeue[0].option1 != undefined) {
            if(clicklocate.x >= 150 && clicklocate.x <= 350) {
                    if(clicklocate.y >= 620 && clicklocate.y <= 665) {
                        messagequeue[0].passfunc(1)
                        messagequeue[0].length = 0;
                }}
            if(messagequeue[0].option2 != undefined) {
                if(clicklocate.x >= 350 && clicklocate.x <= 550) {
                        if(clicklocate.y >= 620 && clicklocate.y <= 665) {
                            messagequeue[0].passfunc(2)
                            messagequeue[0].length = 0;
                }}
                if(messagequeue[0].option3 != undefined) {
                    if(clicklocate.x >= 550 && clicklocate.x <= 750) {
                            if(clicklocate.y >= 620 && clicklocate.y <= 665) {
                                messagequeue[0].passfunc(3)
                                messagequeue[0].length = 0;
                    }}
                    if(messagequeue[0].option4 != undefined) {
                        if(clicklocate.x >= 750 && clicklocate.x <= 950) {
                                if(clicklocate.y >= 620 && clicklocate.y <= 665) {
                                    messagequeue[0].passfunc(4)
                                    messagequeue[0].length = 0;
                        }}   
                    }
                }
            }

        }
    }
}
canvas.addEventListener("click", clickdetect)


function newsquare (row,column) {
    this.row = row;
    this.column = column;
    this.x = (row * 96);
    this.y = (column * 96);
    var imgobj = squareimgs[squareimgs.map(function(e) { return e.id; }).indexOf(randomtypegen(row))];
    this.img = imgobj.img;
    this.digstate = 0;
    this.special = "";
    this.ifspecialnum = null;
}
function generate() {
    //map = []
    rownum = 0;
    columnnum = 0;
    currentmaprow = []
    while(squarenum <= 98) {
        if(rownum == 0) {
            currentmaprow.push(new newsquare(rownum,columnnum,"aboveg"))
            columnnum+=1
            squarenum +=1
        } else if(rownum <= 7) {
            currentmaprow.push(new newsquare(rownum,columnnum))
            columnnum += 1
            squarenum+=1
        }
        if(columnnum == 14) {
            map.push(currentmaprow)
            currentmaprow = []
            columnnum = 0;
            rownum+=1;
        }

    }

}

function generatenewrow() {
    currentmaprow = []
    for(i = 0; i <= 13; i++) {
        currentmaprow.push(new newsquare((curmaprowrange[1] + 1),i))
    }
    map.push(currentmaprow)
    randomeventgen()
}
generate();

function newstruct(type,startsquare) {
    this.type = type;
    var imgobj = structimages[structimages.map(function(e) { return e.id; }).indexOf(type)];
    this.img0 = imgobj.img0
    this.img1 = imgobj.img1
    this.img2 = imgobj.img2
    this.x = startsquare.x;
    this.y = startsquare.y;
}

function randomeventgen() {
    randomeventgenrandomnum = Math.random();
    if(randomeventgenrandomnum >= 0.9995) {
        var lastrow = map.length - 1
        var randcol = Math.floor(Math.random()*13)
        var trysquare = map[lastrow][randcol]
        var trysquarenext = map[lastrow][randcol + 1]
        if (trysquare.column == 13) {
            return;
        } else {
            trysquare.img = squareimgs[12].img;
            trysquarenext.img = squareimgs[12].img;
            trysquare.digstate = 4;
            trysquarenext.digstate = 4;
            trysquare.special = "digdogh"
            trysquarenext.special = "digdogh"
            trysquare.special = "digdogh"
            trysquarenext.special = "digdogh"
            trysquare.ifspecialnum = structlist.length
            trysquarenext.ifspecialnum = structlist.length
            structlist.push(new newstruct("dogdigh",trysquare)) 
        }

    } else if(randomeventgenrandomnum >= 0.9990) {
        var lastrow = map.length - 1
        var randcol = Math.floor(Math.random()*13)
        var trysquare = map[lastrow][randcol]
        var trysquarenext = map[lastrow][randcol + 1]
        if (trysquare.column == 13) {
            return;
        } else {
            trysquare.img = squareimgs[12].img;
            trysquarenext.img = squareimgs[12].img;
            trysquare.digstate = 4;
            trysquarenext.digstate = 4;
            trysquare.special = "digdoghl"
            trysquarenext.special = "digdoghl"
            trysquare.special = "digdoghl"
            trysquarenext.special = "digdoghl"
            trysquare.ifspecialnum = structlist.length
            trysquarenext.ifspecialnum = structlist.length
            structlist.push(new newstruct("dogdighl",trysquare)) 
        }

    } else if(randomeventgenrandomnum >= 0.9985) {
        var lastrow = map.length - 1
        var randcol = Math.floor(Math.random()*13)
        var trysquare = map[lastrow][randcol]
        if (trysquare.column == 13) {
            return;
        } else {
            trysquare.img = squareimgs[12].img;
            trysquare.digstate = 4;
            trysquare.special = "buddadog"
            trysquare.ifspecialnum = structlist.length
            structlist.push(new newstruct("buddadog",trysquare)) 
        }
    } else if(randomeventgenrandomnum >= 0.9980) {
        var lastrow = map.length - 1
        var randcol = Math.floor(Math.random()*13)
        var trysquare = map[lastrow][randcol]
        if (trysquare.column == 13) {
            return;
        } else {
            trysquare.img = squareimgs[12].img;
            trysquare.digstate = 4;
            trysquare.special = "bonedog"
            trysquare.ifspecialnum = structlist.length
            structlist.push(new newstruct("bonedog",trysquare)) 
        }
    } else if(randomeventgenrandomnum >= 0.9975) {
        var lastrow = map.length - 1
        var randcol = Math.floor(Math.random()*13)
        var trysquare = map[lastrow][randcol]
        if (trysquare.column == 13) {
            return;
        } else {
            trysquare.img = squareimgs[12].img;
            trysquare.digstate = 4;
            trysquare.special = "cavepupa"
            trysquare.ifspecialnum = structlist.length
            structlist.push(new newstruct("cavepupa",trysquare)) 
        }
    }
}

var bonedoganwd = false;
var drillmaxplace = 0;

function gamemechanics() {

    //console.log(drillplace[1] == (curmaprowrange[1] + 1))
    if(drillplace[1] > drillmaxplace) {
        drillmaxplace = drillplace[1]
        generatenewrow();
    }
    if(drillplace[1] >= (curmaprowrange[1] )  ) {
        curmaprowrange[0] +=1
        curmaprowrange[1] +=1
    }
    if(drillplace[1] < (curmaprowrange[0] +1) && drillplace[1] !=0) {
        curmaprowrange[0] -= 1
        curmaprowrange[1] -= 1
    }
    if(drillmaxplace)
    if(drillplace[1] != 0) {
        squaredrillon = map[drillplace[1]][drillplace[0]]
        if((squaredrillon.img.src).includes('coal')) {
            coalamount += 1*smelterymult;
            if(findevent[0] == false && gameintrodone == false) {
                messagequeue.push(new newmessage("Looks like you found some coal, coal is used for buildings and projects","jack",1500,"#000000"))
                findevent[0] = true;
            }
        } else if((squaredrillon.img.src).includes('iron')) {
            ironamount += 1*smelterymult;
            if(findevent[1] == false&& gameintrodone == false) {
                messagequeue.push(new newmessage("Looks like you found some iron, iron is used for buildings and projects","jack",1500,"#000000"))
                findevent[1] = true;
            }
        } else if((squaredrillon.img.src).includes('titanium')) {
            titaniumamount +=1*smelterymult;
            if(findevent[2] == false&& gameintrodone == false) {
                messagequeue.push(new newmessage("Looks like you found titanium it's used for buildings and projects","jack",1500,"#000000"))
                findevent[2] = true;
            }
        } else if((squaredrillon.img.src).includes('silver')) {
            money += resourceamounts[3]*jewlmult
            if(findevent[3] == false&& gameintrodone == false) {
                messagequeue.push(new newmessage("Looks like you found silver, silver will increase your money amount","jack",1500,"#000000"))
                findevent[3] = true;
            }
        } else if((squaredrillon.img.src).includes('gold')) {
            money += resourceamounts[4]*jewlmult
            if(findevent[4] == false&& gameintrodone == false) {
                messagequeue.push(new newmessage("Looks like you found gold, gold will increase your money amount","jack",1500,"#000000"))
                findevent[4] = true;
            }
        } else if((squaredrillon.img.src).includes('emerald')) {
            money += resourceamounts[5]*jewlmult
            if(findevent[5] == false&& gameintrodone == false) {
                messagequeue.push(new newmessage("Looks like you found emeralds, they will increase your money amount","jack",1500,"#000000"))
                findevent[5] = true;
            }
        } else if((squaredrillon.img.src).includes('amethyst')) {
            money += resourceamounts[6]*jewlmult
            if(findevent[6] == false&& gameintrodone == false) {
                messagequeue.push(new newmessage("Looks like you found amethysts, they will increase your money amount","jack",1500,"#000000"))
                findevent[6] = true;
            }
        } else if((squaredrillon.img.src).includes('ruby')) {
            money += resourceamounts[7]*jewlmult
            if(findevent[7] == false&& gameintrodone == false) {
                messagequeue.push(new newmessage("Looks like you found rubies, they will increase your money amount","jack",1500,"#000000"))
                findevent[7] = true;
            }
        } else if((squaredrillon.img.src).includes('diamond')) {
            money += resourceamounts[8]*jewlmult
            if(findevent[8] == false&& gameintrodone == false) {
                messagequeue.push(new newmessage("Looks like you found diamonds, they will increase your money amount","jack",1500,"#000000"))
                findevent[8] = true;
            }
        } else if((squaredrillon.img.src).includes('bones')) {
            boneamount += 1;
            if(findevent[9] == false&& gameintrodone == false) {
                messagequeue.push(new newmessage("Looks like you found some Bones WOW! they are the rarest resource","droolingsuprisedjack",1500,"#000000"))
                messagequeue.push(new newmessage("They can be used for projects and buidlings","droolingsuprisedjack",1500,"#000000"))
                findevent[9] = true;
            }
        }
        
        let checker = arr => arr.every(Boolean);
        
        if(checker(findevent) == true) {
            if(findevent[10] == false) {
                messagequeue.push(new newmessage("You've found every ore you're an expert driller","jack",1500,"#000000"))
                findevent[10] = true;
            }
        }
        if(squaredrillon.digstate >=4) {
            squaredrillon.img = squareimgs[12].img;
            
        }
        if(squaredrillon.ifspecialnum != null) {
            var specialtype = structlist[squaredrillon.ifspecialnum].type
            if(specialtype == "dogdigh" && timesincelasteventmsg>=1500) {
                messagequeue.push(new newmessage("Hey watch where you're drillin!","diggerdogh",1500,"#000000"))
                timesincelasteventmsg = 0;
            } else if(specialtype == "dogdighl" && timesincelasteventmsg>=1500) {
                messagequeue.push(new newmessage("Hey watch where you're drillin!","diggerdogh",1500,"#000000"))
                timesincelasteventmsg = 0;
            } else if(specialtype == "buddadog"&& timesincelasteventmsg>=1500) {
               messagequeue.push(new newmessage("Budda dog dog with da budda","buddadog",1500,"#000000"))
                timesincelasteventmsg = 0; 
            } else if(specialtype == "bonedog"&& timesincelasteventmsg>=1500) {
                bonedoganwd = true;
                messagequeue.push(new newquestion("Hey wanna buy my bone I'll give it to you for 1000 Money","bonedog",1,"#000000",questhandler2,"Yes","No"))
                timesincelasteventmsg = 0; 
            } else if(specialtype == "transporter" && timesincelasteventmsg>=5000) {
                messagequeue.push(new newquestion("Where would you like to go?","transporter",1,"#000000",questhandler3,"Bottom","Top","Cancel"))
                timesincelasteventmsg = 0;
            }
        }
        

    }
    if(gameintrodone == false) {
        gameintro();
    }
    
    
    
}
var buildingclock = 0;
var countdowntimer = 0;
var oncelaunchy = 0;
var oncelaunchytime=0;
var rocketaccel = 20;
function gametime() {
    buildingclock +=1;
    mstime+=1
    timesincelasteventmsg += 1
    lastanimate+= 1
    drillmovelastpress +=1
    if(countdownnum == 0) {
        oncelaunchytime +=1
        if(oncelaunchytime >= rocketaccel) {
            rocketaccel -= 0.5;
            oncelaunchytime = 0;
            oncelaunchy +=1;
        }
        if(oncelaunchy >= 500) {
            gamestarted = false;
        }
    }
    if(currlaunching == true) {
        structimages[12]
        countdowntimer += 1;
        if(countdowntimer >= 1000) {
            countdownnum -= 1;
            countdowntimer=0;
        } 
        if(countdownnum == 9){
            drillplacetobe = [rocketpadtrysquare.column,rocketpadtrysquare.row]
            drillplace[0] = drillplacetobe[0];
            while(drillplace[1] != 0) {
                drillplace[1]-=1
                if(drillplace[1] < (curmaprowrange[0] +1) && drillplace[1] !=0) {
                    curmaprowrange[0] -= 1
                    curmaprowrange[1] -= 1
                }
            }
        } else if(countdownnum == 8) {
            drawdrill = false;
        } else if(countdownnum == 7) {
            structimages[12].img0.src = "Images/Structs/rocket1.png";
            structimages[12].img1.src = "Images/Structs/rocket1.png";
            structimages[12].img2.src = "Images/Structs/rocket1.png";
        } 
    }
    if(countdownnum == 0) {
        currlaunching = false;
    }
    if(mstime==1000) {
        mstime = 0;
    }
    if(lastanimate >= 50) {
        if(lastanimateflip == '') {
            lastanimateflip = '1'
        } else {
            lastanimateflip = ''
        }
    }
    if(buildingclock >= 5000) {
        if(dogbarnum >= 1) {
            money+= dogbarnum*25;
        }
        if(scidognum >= 1) {
            boneamount += scidognum;
        }
        if(dogbankname >= 1) {
            money = money + ((money*0.001)*dogbanknum)
        }
        buildingclock = 0;
    }
    if(lastanimate >= 50) {
        if(randomeventanimstate == 0) {
            randomeventanimstate = 1;
        } else if(randomeventanimstate == 1) {
            randomeventanimstate = 2;
        } else if(randomeventanimstate == 2) {
            randomeventanimstate = 0;
        }
        lastanimate = 0
    } 

    if(messagequeue.length != 0 && messagequeue[0].option1 == undefined){
        if(messagequeue[0].length <= 0) {
            messagequeue.shift();
        } else {
            messagequeue[0].length -= 1;
        }
    } else if( messagequeue.length != 0 && messagequeue[0].option1 != undefined) {
        if(messagequeue[0].length == 0){
            messagequeue.shift();
        }
    }
    buildmenulistupdate();
}

function infomenu() {
    ctx.globalAlpha = 0.7;
    ctx.fillStyle = "#6b6b6b";
    ctx.fillRect(96,96,1152,300)
    ctx.fillStyle = "#000000";
    ctx.fillText("Use the arrow keys to move",100,125)
    ctx.fillText("Mine different ores by going towards them with your drill",100,150)
    ctx.fillText("The ores on the top of the screen are Coal Iron and Titanium",100,175)
    ctx.fillText("Next to them there are bones the rarest resource in the game",100,200)
    ctx.fillText("These 4 resources are used for different buildings and projects",100,225)
    ctx.fillText("within the game",100,250)
    ctx.fillText("The rest of the ores you find in the game will give you money",100,275)
    ctx.fillText("Press K to skip messages",100,300)
    ctx.fillText("When you have enough resources press the blastoff menu to win",100,325)
    ctx.fillText("Happy drilling",100,350)
    ctx.globalAlpha = 1;
}

var rocketpadbuilt = false;
var rocketbuilt = false;
var rocketpadtrysquare;
var currlaunching = false;
var countdownnum = 10;

function blastoffmenupresshandler(clicktype) {
    if(clicktype == 1) {
        if(rocketpadbuilt == false) {
            var trysquare = map[drillplace[1]][drillplace[0]]
            var trysquare1 = map[drillplace[1]+1][drillplace[0]]
            var trysquare2 = map[drillplace[1]+2][drillplace[0]]
            var trysquare3 = map[drillplace[1]][drillplace[0]+1]
            var trysquare4 = map[drillplace[1]+1][drillplace[0]+1]
            var trysquare5 = map[drillplace[1]+2][drillplace[0]+1]
            if(money >= 1000000 && ironamount >= 1000 & titaniumamount >= 1000) {
                if(drillplace[1] == 0 && drillplace[0] != 13) {
                    if(trysquare.img.src.includes("aboveg.png") && trysquare1.img.src.includes("dug.png")&& trysquare2.img.src.includes("dug.png")&& trysquare3.img.src.includes("aboveg.png") && trysquare4.img.src.includes("dug.png") && trysquare5.img.src.includes("dug.png")) {
                        if(trysquare.special == "" && trysquare1.special == "" && trysquare2.special == "" && trysquare3.special == "" && trysquare4.special == "" && trysquare5.special == "") {
                            titaniumamount-=1000;
                            ironamount-=1000;
                            trysquare.img = squareimgs[12].img;
                            trysquare1.img = squareimgs[12].img;
                            trysquare2.img = squareimgs[12].img;
                            trysquare3.img = squareimgs[12].img;
                            trysquare4.img = squareimgs[12].img;
                            trysquare5.img = squareimgs[12].img;
                            trysquare.digstate = 4;
                            trysquare1.digstate = 4;
                            trysquare2.digstate = 4;
                            trysquare3.digstate = 4;
                            trysquare4.digstate = 4;
                            trysquare5.digstate = 4;
                            trysquare.special = "rocketbase"
                            trysquare1.special = "rocketbase"
                            trysquare2.special = "rocketbase"
                            trysquare3.special = "rocketbase"
                            trysquare4.special = "rocketbase"
                            trysquare5.special = "rocketbase"
                            trysquare.ifspecialnum = structlist.length
                            trysquare1.ifspecialnum = structlist.length
                            trysquare2.ifspecialnum = structlist.length
                            trysquare3.ifspecialnum = structlist.length
                            trysquare4.ifspecialnum = structlist.length
                            trysquare5.ifspecialnum = structlist.length
                            rocketpadtrysquare = trysquare;
                            structlist.push(new newstruct("rocketbase",trysquare)) 
                            rocketpadbuilt = true;
                        } else {
                            messagequeue.push(new newmessage("Failed to build make sure you aren't on any buildings","violet",1000,"#000000"))
                        }
                    } else {
                        messagequeue.push(new newmessage("Failed to build make sure you have dug a 3x2 area","violet",1000,"#000000"))
                    }
                } else {
                    messagequeue.push(new newmessage("Failed to build make sure you aren't underground","violet",1000,"#000000"))
                }
            } else {
                messagequeue.push(new newmessage("You don't have the required resources","violet",1000,"#000000"))
            }
        } else {
            messagequeue.push(new newmessage("You already have built a rocket pad","violet",1000,"#000000"))
        }
    } else if(clicktype == 2) {
        if(rocketbuilt == false) {
            if(rocketpadbuilt == true) {
                if(money >= 1000000 && coalamount >= 1000 & boneamount >= 400) {
                    money -= 1000000;
                    coalamount -= 1000;
                    boneamount -= 400;
                    rocketbuilt=true;
                }
            } else {
                messagequeue.push(new newmessage("You need a rocket pad before you build a rocket","violet",1000,"#000000"))     
            }
        } else {
            messagequeue.push(new newmessage("You already have built a rocket","violet",1000,"#000000"))
        }
    }
}

function blastoffmenu() {
    
    ctx.globalAlpha = 0.7;
    ctx.fillStyle = "#6b6b6b";
    ctx.fillRect(96,96,1152,384);
    
    ctx.beginPath();
    ctx.lineWidth = "3";
    ctx.rect(96,96,576,384);
    ctx.rect(672,96,576,384);
    ctx.stroke();
    
    ctx.fillStyle = "#5da83d";
    ctx.fillRect(140,200,Math.min(ironamount/4,250),20);
    ctx.fillRect(140,250,Math.min(titaniumamount/4,250),20);
    ctx.fillRect(140,300,Math.min(money/4000,250),20);
    ctx.fillStyle = "#000000";
    ctx.font = '50px cornerstone';
    ctx.fillText("Rocket Base",140,140);
    ctx.font = '30px cornerstone';
    ctx.fillText("3/2 Structure rocket launchpad",100,180)
    ctx.fillText("1000 Iron",400,220)
    ctx.fillText("1000 Titanium",400,270)
    ctx.fillText("1Mil Money",400,320)
    ctx.strokeStyle = "#000000";
    ctx.beginPath();
    ctx.lineWidth = "4"
    ctx.rect(140,200,250,20);
    ctx.rect(140,250,250,20);
    ctx.rect(140,300,250,20);
    ctx.stroke();
    
    ctx.fillStyle = "#5da83d";
    ctx.fillRect(716,200,Math.min(coalamount/4,250),20);
    ctx.fillRect(716,250,Math.min(boneamount/1.6,250),20);
    ctx.fillRect(716,300,Math.min(money/4000,250),20);
    ctx.fillStyle = "#000000";
    ctx.font = '50px cornerstone';
    ctx.fillText("Rocket",716,140)
    ctx.font = '30px cornerstone';
    ctx.fillText("3/2 Structure actual rocket",676,180)
    ctx.fillText("1000 Coal",976,220)
    ctx.fillText("400 Bones",976,270)
    ctx.fillText("1Mil Money",976,320)
    ctx.strokeStyle = "#000000";
    ctx.beginPath();
    ctx.lineWidth = "4"
    ctx.rect(716,200,250,20);
    ctx.rect(716,250,250,20);
    ctx.rect(716,300,250,20);
    ctx.stroke();
    
    
    
    ctx.globalAlpha = 1;
}

var buildmenuelementlist = [];

var drillspeedupamount = 5;

var smeltname = "Smeltery"
var jewlname = "Jewler"
var jewlmult = 1;
var scidogname = "Science Dog"
var scidognum = 0;
var dogbanknum = 0;
var dogbankname = "Dog Bank";
function buildmenuaddelement(xsquare,ysquare,type,text1,text2,text3,text4) {
    this.xsquare = xsquare;
    this.ysquare = ysquare;
    this.x = (xsquare+1) * 96
    this.y = (ysquare+1) * 96
    this.x2 = 288
    this.y2 =  192 
    this.type = type;
    buildmenurelimage = new Image();
    buildmenurelimage.src = "Images/BuildMenu/" + type + ".png";
    this.img = buildmenurelimage;
    this.text1 = text1;
    this.text2 = text2;
    this.text3 = text3;
    this.text4 = text4;
}
function buildmenulistupdate() {
    buildmenuelementlist = []
    buildmenuelementlist.push(new buildmenuaddelement(0,0,"gas","GAS","USED to fuel your drill","COSTS 5 coal",""))
    buildmenuelementlist.push(new buildmenuaddelement(3,0,"drillup","Drill Upgrade","Drill Faster","COSTS " + drillspeedupamount +" iron",""))
    buildmenuelementlist.push(new buildmenuaddelement(6,0,"dogbar","Dog Bar","Generates Income","COSTS 25 coal, 25 iron,","and 5 titanium 1x2 structure"))
    buildmenuelementlist.push(new buildmenuaddelement(9,0,"smeltery",smeltname,"increases functional ore output","COSTS "+ 100*smelterymult + " coal, "+ 100*smelterymult +" iron,","and "  +100*smelterymult+" titanium 2x2 structure"))
    buildmenuelementlist.push(new buildmenuaddelement(0,2,"jewler",jewlname,"increases money from value ores","COSTS "+ 100*jewlmult + " coal, "+ 100*jewlmult +" iron,","and "  +100*jewlmult+" titanium 1x2 structure"))
    buildmenuelementlist.push(new buildmenuaddelement(3,2,"sciencedog",scidogname,"creates bones!","COSTS 10k money, "+ 100 +" iron,","and "  +100+" titanium 1x1 structure"))
    buildmenuelementlist.push(new buildmenuaddelement(6,2,"transporter","Transporter","Teleports your drill","COSTS 25 bones, 250 titanium,","and 100k money 2x1 structure"))
    buildmenuelementlist.push(new buildmenuaddelement(9,2,"dogbank",dogbankname,"Grows your money","COSTS 100 bones, 500 titanium,","and 500k money 2x2 structure"))
}

//buildmenuelementlist.push(new buildmenuaddelement(6,0,"gas","H","E","Y"))
function buildmenu() {
    ctx.globalAlpha = 0.7;
    ctx.fillStyle = "#6b6b6b";
    ctx.fillRect(96,96,1152,384)
    for(i=0;i < buildmenuelementlist.length; i++) {
        currel = buildmenuelementlist[i]
        ctx.beginPath();
        ctx.lineWidth = "3"
        ctx.rect(currel.x,currel.y,currel.x2,currel.y2);
        ctx.stroke();
        ctx.drawImage(currel.img,currel.x+10,currel.y+10);
        ctx.fillStyle = "#000000";
        ctx.font = '30px cornerstone'
        ctx.fillText(currel.text1,currel.x+70,currel.y+30)
        ctx.font = '15px cornerstone'
        ctx.fillText(currel.text2,currel.x+10,currel.y+100)
        ctx.fillText(currel.text3,currel.x+10,currel.y+120)
        ctx.fillText(currel.text4,currel.x+10,currel.y+140)
        
    }
    
    ctx.globalAlpha = 1;
}
var dogbarnum =0;
function buildmenupresshandler(type) {
    if(type == "gas") {
        if(coalamount>=5 && gas != 2000){
            coalamount-=5
            gas=2000
            gasbought = true;
        }  else if (money >= 100 && gas != 2000) {
            money-=100
            gas=2000
            gasbought = true;
        } else if(gas != 2000){
            messagequeue.push(new newmessage("Yikes you don't have enough coal","goldy",500,"#000000"))
        }
    } else if(type == "drillup") {
        if(ironamount >= drillspeedupamount && digspeed != 0) {
            ironamount -= drillspeedupamount
            digspeed -= 2;
            drillspeedupamount = Math.abs(drillspeedupamount * (1.25)^50/digspeed)
        } else if(digspeed == 0){
            drillspeedupamount = "infinite";
        }
    } else if(type == "dogbar") {
        var trysquare = map[drillplace[1]][drillplace[0]]
        var trysquarenext = map[drillplace[1]][drillplace[0] + 1]
        if (trysquare.img.src.includes("dug.png") && trysquarenext.img.src.includes("dug.png") && coalamount>=25 && titaniumamount>=5 && ironamount>=25 && trysquare.special == "" && trysquarenext.special=="") {
            coalamount-=25;
            titaniumamount-=5;
            ironamount-=25;
            trysquare.img = squareimgs[12].img;
            trysquarenext.img = squareimgs[12].img;
            trysquare.digstate = 4;
            trysquarenext.digstate = 4;
            trysquare.special = "dogbar"
            trysquarenext.special = "dogbar"
            trysquare.ifspecialnum = structlist.length
            trysquarenext.ifspecialnum = structlist.length
            structlist.push(new newstruct("dogbar",trysquare)) 
            dogbarnum+=1;
        } else {
            messagequeue.push(new newmessage("Failed to build make sure you have dug the area ","violet",1000,"#000000"))
            messagequeue.push(new newmessage("and have the resources ","violet",1000,"#000000"))
        }
    } else if(type=="jewler") {
        if(ironamount >= 100*jewlmult && coalamount>=100*jewlmult && titaniumamount>=100*jewlmult && jewlmult != 5) {
            var trysquare = map[drillplace[1]][drillplace[0]]
            var trysquare1 = map[drillplace[1]][drillplace[0] + 1]
            if(trysquare.img.src.includes("dug.png") && trysquare1.img.src.includes("dug.png")) {
                if(trysquare.special == "" && trysquare1.special == "") {
                    coalamount-=100*jewlmult;
                    titaniumamount-=100*jewlmult;
                    ironamount-=100*jewlmult;
                    trysquare.img = squareimgs[12].img;
                    trysquare1.img = squareimgs[12].img;
                    trysquare.digstate = 4;
                    trysquare1.digstate = 4;
                    trysquare.special = "jewler"
                    trysquare1.special = "jewler"
                    trysquare.ifspecialnum = structlist.length
                    trysquare1.ifspecialnum = structlist.length
                    structlist.push(new newstruct("jewler",trysquare)) 
                    jewlmult += 1;
                } else {
                    messagequeue.push(new newmessage("Failed to build make sure you have dug the area ","violet",1000,"#000000"))
                    messagequeue.push(new newmessage("and have the resources ","violet",1000,"#000000"))
                }
            } else {
                messagequeue.push(new newmessage("Failed to build make sure you have dug the area ","violet",1000,"#000000"))
                messagequeue.push(new newmessage("and have the resources ","violet",1000,"#000000"))
            }
        } else if(jewlmult == 5) {
            jewlname = "Max Built"
            messagequeue.push(new newmessage("You have buil the max amount of this building ","violet",1000,"#000000"))   
        } else {
            messagequeue.push(new newmessage("Failed to build make sure you have dug the area ","violet",1000,"#000000"))
            messagequeue.push(new newmessage("and have the resources ","violet",1000,"#000000"))
        }
    } else if(type=="smeltery") {
        if(ironamount >= 100*smelterymult && coalamount>=100*smelterymult && titaniumamount>=100*smelterymult && smelterymult != 5) {
            var trysquare = map[drillplace[1]][drillplace[0]]
            var trysquare1 = map[drillplace[1]][drillplace[0] + 1]
            var trysquare2 = map[drillplace[1]+1][drillplace[0]]
            var trysquare3 = map[drillplace[1]+1][drillplace[0]+1]
            if(trysquare.img.src.includes("dug.png") && trysquare1.img.src.includes("dug.png")&& trysquare2.img.src.includes("dug.png")&& trysquare3.img.src.includes("dug.png")) {
                if(trysquare.special == "" && trysquare1.special == ""&& trysquare2.special == ""&& trysquare3.special == "" && map[drillplace[1]-1][drillplace[0]].special == "" && map[drillplace[1]-1][drillplace[0]+1].special == "" && drillplace[1]+1!=curmaprowrange[1]) {
                    coalamount-=100*smelterymult;
                    titaniumamount-=100*smelterymult;
                    ironamount-=100*smelterymult;
                    trysquare.img = squareimgs[12].img;
                    trysquare1.img = squareimgs[12].img;
                    trysquare2.img = squareimgs[12].img;
                    trysquare3.img = squareimgs[12].img;
                    trysquare.digstate = 4;
                    trysquare1.digstate = 4;
                    trysquare2.digstate = 4;
                    trysquare3.digstate = 4;
                    trysquare.special = "smeltery"
                    trysquare1.special = "smeltery"
                    trysquare2.special = "smeltery"
                    trysquare3.special = "smeltery"
                    trysquare.ifspecialnum = structlist.length
                    trysquare1.ifspecialnum = structlist.length
                    trysquare2.ifspecialnum = structlist.length
                    trysquare3.ifspecialnum = structlist.length
                    structlist.push(new newstruct("smeltery",trysquare)) 
                    smelterymult += 1;
                } else {
                    messagequeue.push(new newmessage("Failed to build make sure you have dug the area ","violet",1000,"#000000"))
                    messagequeue.push(new newmessage("and have the resources ","violet",1000,"#000000"))
                }
            } else {
                messagequeue.push(new newmessage("Failed to build make sure you have dug the area ","violet",1000,"#000000"))
                messagequeue.push(new newmessage("and have the resources ","violet",1000,"#000000"))
            }
        } else if(smelterymult == 5) {
            smeltname = "Max Built"
            messagequeue.push(new newmessage("You have buil the max amount of this building ","violet",1000,"#000000"))   
        } else {
            messagequeue.push(new newmessage("Failed to build make sure you have dug the area ","violet",1000,"#000000"))
            messagequeue.push(new newmessage("and have the resources ","violet",1000,"#000000"))
        }
    } else if(type=="sciencedog") {
        if(ironamount >= 100 && money>=10000 && titaniumamount>=100 && scidognum != 5) {
            var trysquare = map[drillplace[1]][drillplace[0]]
            if(trysquare.img.src.includes("dug.png")) {
                if(trysquare.special == "") {
                    money-=10000
                    titaniumamount-=100
                    ironamount-=100
                    trysquare.img = squareimgs[12].img;
                    trysquare.digstate = 4;
                    trysquare.special = "sciencedog"
                    trysquare.ifspecialnum = structlist.length
                    structlist.push(new newstruct("sciencedog",trysquare)) 
                    scidognum += 1;
                } else {
                    messagequeue.push(new newmessage("Failed to build make sure you have dug the area ","violet",1000,"#000000"))
                    messagequeue.push(new newmessage("and have the resources ","violet",1000,"#000000"))
                }
            } else {
                messagequeue.push(new newmessage("Failed to build make sure you have dug the area ","violet",1000,"#000000"))
                messagequeue.push(new newmessage("and have the resources ","violet",1000,"#000000"))
            }
        } else if(scidognum == 5) {
            scidogname = "Max Built"
            messagequeue.push(new newmessage("You have buil the max amount of this building ","violet",1000,"#000000"))   
        } else {
            messagequeue.push(new newmessage("Failed to build make sure you have dug the area ","violet",1000,"#000000"))
            messagequeue.push(new newmessage("and have the resources ","violet",1000,"#000000"))
        }
    } else if(type=="transporter") { 
        if(money>=100000 && titaniumamount>=250 && boneamount >= 25) {
            var trysquare = map[drillplace[1]][drillplace[0]]
            var trysquare1 = map[drillplace[1]+1][drillplace[0]]
            if(trysquare.img.src.includes("dug.png") && trysquare1.img.src.includes("dug.png") && drillplace[1]+1!=curmaprowrange[1]) {
                if(trysquare.special == "" && trysquare1.special == "") {
                    money-=100000
                    titaniumamount-=250
                    boneamount -= 25
                    trysquare.img = squareimgs[12].img;
                    trysquare1.img = squareimgs[12].img;
                    trysquare.digstate = 4;
                    trysquare1.digstate = 4;
                    trysquare.special = "transporter"
                    trysquare1.special = "transporter"
                    trysquare.ifspecialnum = structlist.length
                    trysquare1.ifspecialnum = structlist.length
                    structlist.push(new newstruct("transporter",trysquare)) 
                } else {
                    messagequeue.push(new newmessage("Failed to build make sure you have dug the area ","violet",1000,"#000000"))
                    messagequeue.push(new newmessage("and have the resources ","violet",1000,"#000000"))
                }
            } else {
                messagequeue.push(new newmessage("Failed to build make sure you have dug the area ","violet",1000,"#000000"))
                messagequeue.push(new newmessage("and have the resources ","violet",1000,"#000000"))
            }
        } else {
            messagequeue.push(new newmessage("Failed to build make sure you have dug the area ","violet",1000,"#000000"))
            messagequeue.push(new newmessage("and have the resources ","violet",1000,"#000000"))
        }
    } else if(type == "dogbank") {
        if(boneamount>=100 && titaniumamount>=500 && money >= 500000 && dogbanknum!=10) {
            var trysquare = map[drillplace[1]][drillplace[0]]
            var trysquare1 = map[drillplace[1]][drillplace[0] + 1]
            var trysquare2 = map[drillplace[1]+1][drillplace[0]]
            var trysquare3 = map[drillplace[1]+1][drillplace[0]+1]
            if(trysquare.img.src.includes("dug.png") && trysquare1.img.src.includes("dug.png")&& trysquare2.img.src.includes("dug.png")&& trysquare3.img.src.includes("dug.png")&& drillplace[1]+1!=curmaprowrange[1]) {
                if(trysquare.special == "" && trysquare1.special == ""&& trysquare2.special == ""&& trysquare3.special == "" && map[drillplace[1]-1][drillplace[0]].special == "" && map[drillplace[1]-1][drillplace[0]+1].special == "") {
                    boneamount-=100;
                    titaniumamount-=500;
                    money-=500000;
                    trysquare.img = squareimgs[12].img;
                    trysquare1.img = squareimgs[12].img;
                    trysquare2.img = squareimgs[12].img;
                    trysquare3.img = squareimgs[12].img;
                    trysquare.digstate = 4;
                    trysquare1.digstate = 4;
                    trysquare2.digstate = 4;
                    trysquare3.digstate = 4;
                    trysquare.special = "dogbank"
                    trysquare1.special = "dogbank"
                    trysquare2.special = "dogbank"
                    trysquare3.special = "dogbank"
                    trysquare.ifspecialnum = structlist.length
                    trysquare1.ifspecialnum = structlist.length
                    trysquare2.ifspecialnum = structlist.length
                    trysquare3.ifspecialnum = structlist.length
                    structlist.push(new newstruct("dogbank",trysquare)) 
                    dogbanknum += 1;
                } else {
                    messagequeue.push(new newmessage("Failed to build make sure you have dug the area ","violet",1000,"#000000"))
                    messagequeue.push(new newmessage("and have the resources ","violet",1000,"#000000"))
                }
            } else {
                messagequeue.push(new newmessage("Failed to build make sure you have dug the area ","violet",1000,"#000000"))
                messagequeue.push(new newmessage("and have the resources ","violet",1000,"#000000"))
            }
        } else if(dogbanknum == 10) {
            smeltname = "Max Built"
            messagequeue.push(new newmessage("You have buil the max amount of this building ","violet",1000,"#000000"))   
        } else {
            messagequeue.push(new newmessage("Failed to build make sure you have dug the area ","violet",1000,"#000000"))
            messagequeue.push(new newmessage("and have the resources ","violet",1000,"#000000"))
        }
    }
}

function numparaphrase(numpara) {
    if(numpara <= 10000000) {
        return numpara;
    } else if(numpara >= 10000000 && numpara<=Math.pow(10,13)) {
        return Math.floor(numpara/1000000) + "m";
    } else{
        return "A Lot";
    }
}

function newmessage(message,image,length,messcolor) {
    this.text = message;
    var messimg = new Image();
    messimg.src = "Images/MessageImages/" + image + ".png";
    this.img = messimg;
    this.length = length;
    this.messcolor = messcolor;
}
var questhandler1tf;
function questhandler1(opselected) {
    if(opselected == 1) {
        qameintrodone = false;
    } else if(opselected == 2) {
        gameintrodone = true;
    } 
}
function questhandler2(opselected) {
    if(opselected == 1) {
        if(money >= 1000) {
            money -= 1000;
            boneamount +=1;
        } else {
            messagequeue.push(new newmessage("Hey you don't have enough","bonedog",1000,"#000000"))
        }
    } else if(opselected == 2) {
        
    } 
}
function questhandler3(opselected) {
    if(opselected == 1) {
        var squareto = map[drillmaxplace][drillplace[0]]
        squareto.digstate == 4;
        squareto.img.src = "Images/Back/dug.png"
        while(drillplace[1] < drillmaxplace) {
            drillplace[1] += 1;
        }
        
    } else if(opselected == 2) {
        while(drillplace[1] != 0) {
            drillplace[1]-=1
            if(drillplace[1] < (curmaprowrange[0] +1) && drillplace[1] !=0) {
                curmaprowrange[0] -= 1
                curmaprowrange[1] -= 1
            }
        }
    } else {
        
    }
}
function newquestion(message,image,length,messcolor,passfunc,option1,option2,option3,option4) {
    this.text = message;
    var messimg = new Image();
    messimg.src = "Images/MessageImages/" + image + ".png";
    this.img = messimg;
    this.length = length;
    this.messcolor = messcolor;
    this.option1 = option1
    this.option2 = option2
    this.option3 = option3
    this.option4 = option4
    this.passfunc = passfunc;
}
//messagequeue.push(new newquestion("Test","violet",1,"#000000",questhandler1,"Test1","Test2","Test3","Test4"))

function gameintro() {
    if(gameintrodone == false) {
        if(gameintrostage == 0) {
            messagequeue.push(new newquestion("Would you like the intro to play","violet",1,"#000000",questhandler1,"Yes","No"))
        }
        if(gameintrostage == 0) {
            messagequeue.push(new newmessage("Hey! Hey you yeah you wake up it's time to drill!","jack",1000,"#000000"))
            messagequeue.push(new newmessage("Use your arrow keys to move around","jack",1000,"#000000"))
            gameintrostage+=1;
        }
        if((drillplace[0] != 0 || drillplace[1] !=0) && gameintrostage == 1) {
            messagequeue.push(new newmessage("Hey nice work! you're a natural","jack",1000,"#000000"))
            gameintrostage+=1
        }
        if(gameintrostage == 2) {
            messagequeue.push(new newmessage("You know how to move now so get to diggin!","jack",1000,"#000000"))
            messagequeue.push(new newmessage("Go get 5 coal for me","jack",1000,"#000000"))
            messagequeue.push(new newmessage("Also if I'm talking too slow for you press K to skip messages","jack",1000,"#000000"))
            gameintrostage +=1;
        } if(coalamount>=5 && gameintrostage == 3){
            messagequeue.push(new newmessage("Great work now press the build menu","jack",1000,"#000000"))
            messagequeue.push(new newmessage("It's on the top right, left of the info button","jack",1000,"#000000"))
            gameintrostage +=1;
        } if(openbuildmenu == true && gameintrostage == 4) {
            messagequeue.push(new newmessage("Great work now buy some gas with your coal","jack",1000,"#000000"))
            gameintrostage+=1
        }  if(gasbought == true && gameintrostage == 5) {
            messagequeue.push(new newmessage("Nice you've got fuel now","jack",1000,"#000000"))
            messagequeue.push(new newmessage("Go mine some iron you're going to need to go deeper 5 will do","jack",1000,"#000000"))
            gameintrostage +=1
        }  if(ironamount >= 5 && gameintrostage == 6) {
            messagequeue.push(new newmessage("Nice you've got iron go buy a drill upgrade in the build menu","jack",1000,"#000000"))
            messagequeue.push(new newmessage("Drill upgrades get more expensive the more you buy","jack",1000,"#000000"))
            gameintrostage +=1
        } if(drillspeedupamount != 5 && gameintrostage == 7) {
            messagequeue.push(new newmessage("Great your drill should be faster now","jack",1000,"#000000"))
            gameintrostage +=1
        } if(gameintrostage == 8) {
            messagequeue.push(new newmessage("You know how to get resources now","jack",1000,"#000000"))
            messagequeue.push(new newmessage("Why don't you try and make a building","jack",1000,"#000000"))
            messagequeue.push(new newmessage("Why don't you get 25 iron, 25 coal, and 5 titanium","jack",1000,"#000000"))
            gameintrostage +=1;
        } if(gameintrostage == 9 && ironamount >=25 && coalamount >= 25 && titaniumamount>=5) {
            messagequeue.push(new newmessage("Great you've got what you need!","jack",1000,"#000000"))
            messagequeue.push(new newmessage("Why don't you a dig a area out so the bar has a place to go","jack",1000,"#000000"))
            messagequeue.push(new newmessage("It needs to be at least a 1x2 area from where your drill is","jack",1000,"#000000"))
            messagequeue.push(new newmessage("Now press the build menu and click on the Dog Bar","jack",1000,"#000000"))
            gameintrostage +=1;
        } if(gameintrostage == 10 && dogbarnum>=1) {
            messagequeue.push(new newmessage("Wow great this will make you some money","jack",1000,"#000000"))
        } if(gameintrostage == 11) {
            messagequeue.push(new newmessage("Well looks like you've got the hang of it ","jack",1000,"#000000"))
            messagequeue.push(new newmessage("if you have questions consult the info tab ","jack",1000,"#000000"))
            messagequeue.push(new newmessage("Happy drilling!","jack",1000,"#000000"))
            gameintrostage +=1
        }
    }
}

gameintro();

/*function cheat() {
    ironamount = 1000000000000000
    coalamount = 1000000000000000
    titaniumamount = 1000000000000000
    boneamount = 1000000000000000
    money = 1000000000000000
    digspeed = 0;
    gas = 20000000;
}*/

var titlescreenimage = new Image()
titlescreenimage.src = "Images/titlescreen.png"
var titlescreenblink = 0;
function titlescreen() {
    if(gamestarted==false && countdownnum != 0) {
        titlescreenblink +=1;
        ctx.drawImage(titlescreenimage,0,0)
        ctx.fillStyle = "#000000";
        ctx.font = '300px cornerstone'
        ctx.fillText("Start",300,300)
        ctx.font = '45px cornerstone'
        ctx.fillText("Dog Drilling",10,50)
        if(titlescreenblink <= 100){
            ctx.fillText("Click start to begin",300,350)
        } else if(titlescreenblink >= 200) {
            titlescreenblink = 0
        }
    } else if(countdownnum == 0){
        ctx.fillStyle = "#000000";
        ctx.fillRect(0,0,1400,700);
        ctx.fillStyle = "#ffffff";
        ctx.font = '150px cornerstone';
        ctx.fillText("Nice drilling!",175,300);
    }
}

var gasimg = new Image();
gasimg.src = "Images/BuildMenu/gas.png"

var blastoffimg = new Image();
blastoffimg.src = "Images/Back/blastoff.png";

function imgs() {
    
    ctx.clearRect(0,0,2000,2000)
    if(gamestarted == true) {
        rows = curmaprowrange[0] ;
        columns = 0;

        while(rows <= (curmaprowrange[1])) {
            //console.log(rows)
            displacement = (curmaprowrange[0]*96);
            if(rows == curmaprowrange[0]) {
                 displacement = map[rows][columns].x
            } else if(rows == curmaprowrange[0]+1) {
                displacement = map[rows][columns].x - 96
            } else if(rows == curmaprowrange[0]+2) {
                displacement = map[rows][columns].x - (2*96) 
            } else if(rows == curmaprowrange[0]+3) {
                displacement = map[rows][columns].x - (3*96) 
            } else if(rows == curmaprowrange[0]+4) {
                displacement = map[rows][columns].x - (4*96)
            } else if(rows == curmaprowrange[0]+5) {
                displacement = map[rows][columns].x - (5*96)
            } else if(rows == curmaprowrange[0]+6) {
                displacement = map[rows][columns].x - (6*96)
            }

            if(map[rows][columns].ifspecialnum != null) {
                var structtodraw = structlist[(map[rows][columns].ifspecialnum)]
                if(randomeventanimstate == 0) { 
                    var structtodrawimg = structtodraw.img0;
                } else if(randomeventanimstate == 1) {
                    var structtodrawimg = structtodraw.img1;
                } else if(randomeventanimstate == 2) {
                    var structtodrawimg = structtodraw.img2;
                }
                ctx.drawImage(structtodrawimg,structtodraw.y,structtodraw.x - displacement);
                if(rocketbuilt == true && countdownnum != 0) {
                    ctx.drawImage(structimages[12].img0,rocketpadtrysquare.y,rocketpadtrysquare.x - displacement);
                } else if(countdownnum == 0) {
                    ctx.drawImage(structimages[12].img0,rocketpadtrysquare.y,rocketpadtrysquare.x - displacement-oncelaunchy);
                }
            } else {
                if(map[rows][columns].digstate >= 4 || map[rows][columns].digstate == 0 || rows==0) {
                    ctx.drawImage((map[rows][columns]).img,(map[rows][columns]).y,((map[rows][columns]).x - displacement))
                } else {
                    ctx.drawImage((map[rows][columns]).img,(map[rows][columns]).y,((map[rows][columns]).x - displacement))
                    var diganimimg;
                    if((map[rows][columns]).digstate == 0) {
                        diganimimg = digstateimgs.dug0;
                    } else if((map[rows][columns]).digstate == 1) {
                        diganimimg = digstateimgs.dug1;
                    } else if((map[rows][columns]).digstate == 2) {
                        diganimimg = digstateimgs.dug2;
                    } else if((map[rows][columns]).digstate == 3) {
                        diganimimg = digstateimgs.dug3;
                    } 
                    //console.log(digaminimg.src)
                    ctx.drawImage(diganimimg,(map[rows][columns]).y,((map[rows][columns]).x - displacement))
                }
            }
            if(columns != 13) {
                columns += 1
            } else {
                rows += 1
                columns = 0 
            }

        }

        //drill
        if(drawdrill == true) {
            drill.src = "Images/Drill/"+"drill" + direction + lastanimateflip + ".png"
            ctx.drawImage(drill,drillplace[0]*96,((drillplace[1])*96-curmaprowrange[0]*96))
        }
        ctx.drawImage(moneyimg,5,5)

        ctx.fillStyle = "#000000";
        ctx.font = '30px cornerstone'
        ctx.fillText(numparaphrase(money),60,27)

        ctx.drawImage(coalamountimg,200,5)
        ctx.fillText(numparaphrase(coalamount),231,27)

        ctx.drawImage(ironamountimg,340,5)
        ctx.fillText(numparaphrase(ironamount),371,27)

        ctx.drawImage(boneamountimg,620,5)
        ctx.fillText(numparaphrase(boneamount),651,27)

        ctx.drawImage(titaniumamountimg,480,5)
        ctx.fillText(numparaphrase(titaniumamount),511,27)

        ctx.drawImage(infoimg,1296,0);
        ctx.drawImage(buildmenuimg,1248,0);
        ctx.drawImage(blastoffimg,1200,0)

        ctx.fillStyle = "#5da83d"
        ctx.globalAlpha = 0.8;
        
        ctx.drawImage(gasimg,1285,600)
        ctx.fillRect(1320,100,20,gas/4)
        ctx.fillStyle = "#000000"
        ctx.strokeStyle = "#000000";
        ctx.beginPath();
        ctx.lineWidth = "4"
        ctx.rect(1320,100,20,500);
        ctx.stroke();
        ctx.globalAlpha = 1;

        ctx.globalAlpha = 0.7;
        
        if(rocketbuilt == true && currlaunching == false && countdownnum != 0) {
            ctx.fillStyle = "#e3574d"
            ctx.font = '60px cornerstone'
            ctx.fillText("Launch Ready press space to launch",75,350);
            ctx.font = '30px cornerstone'
        } if(currlaunching == true) {
            ctx.fillStyle = "#e3574d"
            ctx.font = '80px cornerstone'
            ctx.fillText(countdownnum,672,350);
            ctx.font = '30px cornerstone'
        }
        
        if(messagequeue.length > 0) {
            ctx.fillStyle = "#6b6b6b";
            ctx.fillRect(0,550,1344,1344)
            ctx.drawImage(messagequeue[0].img,50,550);
            ctx.fillStyle = messagequeue[0].messcolor;
            ctx.fillText(messagequeue[0].text,150,600)
            if(messagequeue[0].option1 != undefined) {
                ctx.beginPath();
                ctx.lineWidth = "4"
                ctx.rect(150,620,200,45);
                ctx.fillText(messagequeue[0].option1,160,655)
                ctx.stroke();
                if(messagequeue[0].option2 != undefined) {
                    ctx.beginPath();
                    ctx.lineWidth = "4"
                    ctx.rect(350,620,200,45);
                    ctx.fillText(messagequeue[0].option2,360,655)
                    ctx.stroke();
                    if(messagequeue[0].option3 != undefined) {
                        ctx.beginPath();
                        ctx.lineWidth = "4"
                        ctx.rect(550,620,200,45);
                        ctx.fillText(messagequeue[0].option3,560,655)
                        ctx.stroke();
                        if(messagequeue[0].option4 != undefined) {
                            ctx.beginPath();
                            ctx.lineWidth = "4"
                            ctx.rect(750,620,200,45);
                            ctx.fillText(messagequeue[0].option4,760,655)
                            ctx.stroke();
                        }
                    }
                } 
            }
        }
        ctx.globalAlpha = 1;

        if(openinfomenu == true) {
            infomenu();
        } else if(openbuildmenu == true) {
            buildmenu();
        } else if(openblastoffmenu == true) {
            blastoffmenu();
        }
    } else {
        titlescreen();
    }
}
imgs();
setInterval(imgs,4)
setInterval(gametime,1)
setInterval(gamemechanics,1)





