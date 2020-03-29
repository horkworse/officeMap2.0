let buildingData = {
    type: "Building",
    features: [{
            type: "BuildingBorders",
            geometry: {
                type: "Polygon",
                coordinates: [[
                    [-90, -80],
                    [-85, -80],
                    [-35, -80],
                    [-35, -75],
                    [100, -75],
                    [100, -80],
                    [160, -80],
                    [160, 40],
                    [90, 40],
                    [90, 35],
                    [-110, 35],
                    [-110, 30],
                    [-130, 30],
                    [-130, 0],
                    /* весь контур */
                    [-125, 0],
                    [-125, 25],
                    [-105, 25],
                    [-105, 30],
                    [95, 30],
                    [95, 35],
                    [155, 35],
                    [155, -75],
                    [105, -75],
                    [105, -70],
                    [-40, -70],
                    [-40, -75],
                    [-87, -75],
                    [-125, 0],
                    [-130, 0]
                ]]
            }
        }
    ]
};

let tablesData = {
    type: "tables",
    features: [{
        type: "tables",
        geometry: {
            type: "Point",
            coordinates: [20, 20]
        },
        properties: {
            url: 'images/1.png'
        }
    }]
};


let roomsData = {
    type: "ad",
    features: [
        {
            type: "BuildingRoom",
            properties: {
                name: "R1",
                square: 576
            },
            geometry: {
                type: "Polygon",
                coordinates: [[
                    [125, -15],
                    [125, 35],
                    [155, 35],
                    [155, -15]
                ]]
            }
        }, {
            type: "BuildingRoom",
            properties: {
                name: "R2",
                square: 576
            },
            geometry: {
                type: "Polygon",
                coordinates: [[
                    [95, -15],
                    [95, 35],
                    [125, 35],
                    [125, -15]
                ]]
            }
        }, {
            type: "BuildingRoom",
            properties: {
                name: "R3",
                square: 412
            },
            geometry: {
                type: "Polygon",
                coordinates: [[
                    [55, -15],
                    [55, 30],
                    [95, 30],
                    [95, -15]
                ]]
            }
        }, {
            type: "BuildingRoom",
            properties: {
                name: "R4",
                square: 412
            },
            geometry: {
                type: "Polygon",
                coordinates: [[
                    [15, -15],
                    [15, 30],
                    [55, 30],
                    [55, -15]
                ]]
            }
        }, {
            type: "BuildingRoom",
            properties: {
                name: "R5",
                square: 412
            },
            geometry: {
                type: "Polygon",
                coordinates: [[
                    [-25, -15],
                    [-25, 30],
                    [15, 30],
                    [15, -15]
                ]]
            }
        }, {
            type: "BuildingRoom",
            properties: {
                name: "R6",
                square: 412
            },
            geometry: {
                type: "Polygon",
                coordinates: [[
                    [-65, -15],
                    [-65, 30],
                    [-25, 30],
                    [-25, -15]
                ]]
            }
        }, {
            type: "BuildingRoom",
            properties: {
                name: "R6",
                square: 412
            },
            geometry: {
                type: "Polygon",
                coordinates: [[
                    [-105, -15],
                    [-105, 30],
                    [-65, 30],
                    [-65, -15]
                ]]
            }
        }, {
            type: "BuildingRoom",
            properties: {
                name: "Stairs",
                square: 257
            },
            geometry: {
                type: "Polygon",
                coordinates: [[
                    [-125, 0],
                    [-125, 25],
                    [-105, 25],
                    [-105, -15]
                ]]
            }
        }, {
            type: "BuildingRoom",
            properties: {
                name: "R7",
                square: 412
            },
            geometry: {
                type: "Polygon",
                coordinates: [[
                    [-110, -30],
                    [-88, -75],
                    [-65, -75],
                    [-65, -30]
                ]]
            }
        }, {
            type: "BuildingRoom",
            properties: {
                name: "R8",
                square: 412
            },
            geometry: {
                type: "Polygon",
                coordinates: [[
                    [-65, -30],
                    [-65, -75],
                    [-40, -75],
                    [-40, -30]
                ]]
            }
        }, {
            type: "BuildingRoom",
            properties: {
                name: "R9",
                square: 412
            },
            geometry: {
                type: "Polygon",
                coordinates: [[
                    [-40, -30],
                    [-40, -70],
                    [0, -70],
                    [0, -30]
                ]]
            }
        }, {
            type: "BuildingRoom",
            properties: {
                name: "R10",
                square: 412
            },
            geometry: {
                type: "Polygon",
                coordinates: [[
                    [0, -30],
                    [0, -70],
                    [40, -70],
                    [40, -30]
                ]]
            }
        }, {
            type: "BuildingRoom",
            properties: {
                name: "R11",
                square: 412
            },
            geometry: {
                type: "Polygon",
                coordinates: [[
                    [40, -30],
                    [40, -70],
                    [80, -70],
                    [80, -30]
                ]]
            }
        }, {
            type: "BuildingRoom",
            properties: {
                name: "R12",
                square: 412
            },
            geometry: {
                type: "Polygon",
                coordinates: [[
                    [80, -30],
                    [80, -70],
                    [105, -70],
                    [105, -30]
                ]]
            }
        }, {
            type: "BuildingRoom",
            properties: {
                name: "R13",
                square: 412
            },
            geometry: {
                type: "Polygon",
                coordinates: [[
                    [105, -30],
                    [105, -75],
                    [130, -75],
                    [130, -30]
                ]]
            }
        }, {
            type: "BuildingRoom",
            properties: {
                name: "R14",
                square: 412
            },
            geometry: {
                type: "Polygon",
                coordinates: [[
                    [130, -30],
                    [130, -75],
                    [155, -75],
                    [155, -30]
                ]]
            }
        }
    ]
};