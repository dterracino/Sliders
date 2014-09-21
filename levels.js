var SHOW_LABELS = false;

var LEVELS = [
    {
        width: 5,
        height: 5,
        goal: 2,
        pieces: [0],
        targets: [24],
        info: "Slide the red piece onto the target."
    },
    {
        width: 3,
        height: 5,
        goal: 2,
        pieces: [1, 10, 12, 14],
        targets: [13],
        info: "The pieces move until they hit something."
    },
    {
        width: 4,
        height: 4,
        goal: 4,
        pieces: [0, 1, 2, 3],
        targets: [12, 13, 14, 15],
        info: "There can be multiple targets."
    },
    {
        width: 5,
        height: 5,
        walls: [
            [12, 17]
        ],
        goal: 5,
        pieces: [15, 19],
        targets: [12],
        hands: [8],
        shape: [
            ".xxx.",
            "xxxxx",
            "xxxxx",
            "xxxxx",
            ".xxx.",
        ]
    },
    {
        width: 5,
        height: 5,
        walls: [
            [10, 15],
            [18, 19],
            [4, 9]
        ],
        goal: 10,
        pieces: [11, 13],
        targets: [16, 18],
        shape: [
            "xxxxx",
            "xx.xx",
            "xx.xx",
            "xx.xx",
            "xxxxx",
        ]
    },
    {
        width: 4,
        height: 4,
        walls: [
            [4, 5],
            [6, 7],
            [8, 9],
            [10, 11]
        ],
        goal: 12,
        pieces: [1, 13],
        targets: [6, 14]
    },
    {
        width: 7,
        height: 7,
        walls: [],
        goal: 13,
        pieces: [10, 38, 24],
        targets: [23, 25],
        shape: [
            "..xxx..",
            "..xxx..",
            "xxxxxxx",
            "xxxxxxx",
            "xxxxxxx",
            "..xxx..",
            "..xxx..",
        ]
    },
    {
        width: 5,
        height: 5,
        walls: [
            [5, 6],
            [6, 7],
            [7, 8],
            [8, 9],
            [5, 10],
            [9, 14],
            [10, 15],
            [14, 19],
            [15, 16],
            [16, 17],
            [17, 18],
            [18, 19],
        ],
        goal: 20,
        pieces: [1, 10, 14],
        targets: [12]
    },
    {
        width: 7,
        height: 7,
        walls: [],
        goal: 20,
        pieces: [16, 32, 13, 35],
        targets: [21, 27],
        shape: [
            ".x.x.x.",
            "xxxxxxx",
            ".xx.xx.",
            "xx...xx",
            ".xx.xx.",
            "xxxxxxx",
            ".x.x.x."
        ]
    }
];

var RICOCHET = {
    "000": [[22, 33, 86, 99], [[4, 5], [17, 33], [22, 23], [22, 38], [32, 33], [70, 86], [80, 96], [86, 87], [98, 99], [99, 115]]],
    "001": [[29, 57, 106, 110], [[9, 10], [13, 29], [29, 30], [41, 57], [56, 57], [79, 95], [106, 107], [106, 122], [109, 110], [110, 126]]],
    "002": [[156, 169, 222, 233], [[140, 156], [156, 157], [159, 175], [168, 169], [169, 185], [217, 233], [222, 223], [222, 238], [232, 233], [250, 251]]],
    "003": [[145, 149, 198, 226], [[129, 145], [133, 149], [145, 146], [148, 149], [160, 176], [198, 199], [198, 214], [225, 226], [226, 242], [245, 246]]],
    "010": [[20, 33, 54, 99], [[1, 2], [4, 20], [17, 33], [19, 20], [33, 34], [54, 55], [54, 70], [80, 96], [98, 99], [99, 115]]],
    "011": [[29, 57, 78, 108], [[9, 10], [29, 30], [29, 45], [31, 47], [41, 57], [56, 57], [62, 78], [78, 79], [107, 108], [108, 124]]],
    "012": [[156, 201, 222, 235], [[140, 156], [156, 157], [159, 175], [185, 201], [200, 201], [221, 222], [222, 238], [235, 236], [235, 251], [253, 254]]],
    "013": [[147, 177, 198, 226], [[131, 147], [147, 148], [176, 177], [177, 193], [198, 199], [198, 214], [208, 224], [210, 226], [225, 226], [245, 246]]],
    "100": [[22, 49, 69, 82], [[3, 4], [21, 22], [22, 38], [33, 49], [49, 50], [53, 69], [68, 69], [82, 83], [82, 98], [96, 112]]],
    "101": [[28, 42, 91, 110], [[8, 9], [28, 29], [28, 44], [41, 42], [42, 58], [63, 79], [75, 91], [91, 92], [94, 110], [109, 110]]],
    "102": [[173, 186, 206, 233], [[143, 159], [157, 173], [172, 173], [186, 187], [186, 202], [205, 206], [206, 222], [217, 233], [233, 234], [251, 252]]],
    "103": [[145, 164, 213, 227], [[145, 146], [145, 161], [163, 164], [164, 180], [176, 192], [197, 213], [211, 227], [213, 214], [226, 227], [246, 247]]],
    "110": [[18, 49, 70, 101], [[4, 5], [18, 19], [18, 34], [48, 49], [49, 65], [54, 70], [64, 80], [69, 70], [85, 101], [101, 102]]],
    "111": [[28, 46, 89, 107], [[10, 11], [12, 28], [27, 28], [45, 46], [46, 62], [79, 95], [89, 90], [89, 105], [91, 107], [107, 108]]],
    "112": [[154, 185, 206, 237], [[153, 154], [154, 170], [175, 191], [185, 186], [185, 201], [190, 206], [206, 207], [221, 237], [236, 237], [250, 251]]],
    "113": [[148, 166, 209, 227], [[147, 148], [148, 164], [150, 166], [160, 176], [165, 166], [193, 209], [209, 210], [227, 228], [227, 243], [244, 245]]],
    "200": [[21, 33, 70, 98], [[3, 4], [21, 22], [21, 37], [32, 33], [33, 49], [48, 64], [54, 70], [69, 70], [82, 98], [98, 99]]],
    "201": [[29, 41, 94, 107], [[11, 12], [13, 29], [28, 29], [41, 42], [41, 57], [63, 79], [91, 107], [93, 94], [94, 110], [107, 108]]],
    "202": [[157, 185, 222, 234], [[156, 157], [157, 173], [185, 186], [185, 201], [191, 207], [206, 222], [218, 234], [222, 223], [233, 234], [251, 252]]],
    "203": [[148, 161, 214, 226], [[145, 161], [147, 148], [148, 164], [161, 162], [176, 192], [198, 214], [213, 214], [226, 227], [226, 242], [243, 244]]],
    "210": [[18, 54, 84, 97], [[2, 18], [4, 5], [17, 18], [53, 54], [54, 70], [64, 80], [68, 84], [84, 85], [97, 98], [97, 113]]],
    "211": [[25, 46, 74, 108], [[10, 11], [24, 25], [25, 41], [30, 46], [46, 47], [74, 75], [74, 90], [79, 95], [92, 108], [107, 108]]],
    "212": [[158, 171, 201, 237], [[142, 158], [157, 158], [170, 171], [171, 187], [175, 191], [185, 201], [201, 202], [237, 238], [237, 253], [250, 251]]],
    "213": [[147, 181, 209, 230], [[147, 148], [147, 163], [160, 176], [165, 181], [180, 181], [208, 209], [209, 225], [214, 230], [230, 231], [244, 245]]],
    "300": [[37, 66, 87, 97], [[3, 4], [37, 38], [37, 53], [50, 66], [64, 80], [66, 67], [81, 97], [86, 87], [87, 103], [96, 97]]],
    "301": [[25, 43, 93, 122], [[9, 25], [10, 11], [25, 26], [43, 44], [43, 59], [63, 79], [92, 93], [93, 109], [106, 122], [121, 122]]],
    "302": [[158, 168, 189, 218], [[152, 168], [158, 159], [158, 174], [168, 169], [175, 191], [188, 189], [189, 205], [202, 218], [217, 218], [251, 252]]],
    "303": [[133, 162, 212, 230], [[133, 134], [133, 149], [146, 162], [162, 163], [176, 192], [196, 212], [211, 212], [229, 230], [230, 246], [244, 245]]],
    "310": [[17, 38, 66, 87], [[3, 4], [16, 17], [17, 33], [22, 38], [38, 39], [66, 67], [66, 82], [71, 87], [80, 96], [86, 87]]],
    "311": [[30, 43, 109, 122], [[9, 10], [14, 30], [29, 30], [42, 43], [43, 59], [63, 79], [106, 122], [109, 110], [109, 125], [122, 123]]],
    "312": [[168, 189, 217, 238], [[159, 175], [168, 169], [168, 184], [173, 189], [188, 189], [216, 217], [217, 233], [222, 238], [238, 239], [251, 252]]],
    "313": [[133, 146, 212, 225], [[130, 146], [132, 133], [133, 149], [145, 146], [176, 192], [196, 212], [212, 213], [225, 226], [225, 241], [245, 246]]]
};

function ricochet() {
    var tokens = [];
    var walls = [];
    var quadrants = _.shuffle([0, 1, 2, 3]);
    for (var i = 0; i < 4; i++) {
        var quadrant = quadrants[i];
        var side = _.shuffle([0, 1])[0];
        var key = "" + quadrant + side + i;
        var data = RICOCHET[key];
        tokens = tokens.concat(data[0]);
        walls = walls.concat(data[1]);
    }
    var center = [119, 120, 135, 136];
    var pieces = [];
    for (var i = 0; i < 4; i++) {
        while (true) {
            var index = _.random(0, 255);
            if (_.contains(center, index)) {
                continue;
            }
            if (_.contains(tokens, index)) {
                continue;
            }
            if (_.contains(pieces, index)) {
                continue;
            }
            pieces.push(index);
            break;
        }
    }
    var targets = [_.sample(tokens)];
    return {
        width: 16,
        height: 16,
        walls: walls,
        goal: 0,
        pieces: pieces,
        targets: targets,
        shape: [
            "xxxxxxxxxxxxxxxx",
            "xxxxxxxxxxxxxxxx",
            "xxxxxxxxxxxxxxxx",
            "xxxxxxxxxxxxxxxx",
            "xxxxxxxxxxxxxxxx",
            "xxxxxxxxxxxxxxxx",
            "xxxxxxxxxxxxxxxx",
            "xxxxxxx..xxxxxxx",
            "xxxxxxx..xxxxxxx",
            "xxxxxxxxxxxxxxxx",
            "xxxxxxxxxxxxxxxx",
            "xxxxxxxxxxxxxxxx",
            "xxxxxxxxxxxxxxxx",
            "xxxxxxxxxxxxxxxx",
            "xxxxxxxxxxxxxxxx",
            "xxxxxxxxxxxxxxxx",
        ]
    };
}
