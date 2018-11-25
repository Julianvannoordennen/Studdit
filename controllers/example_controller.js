//const Driver = require('../models/driver');

module.exports = {

    example(req, res) {
        res.send({
            family: [
                {
                    name: "Great Penguins",
                    scienceName: "Aptenodytes",
                    species: [
                        {
                            name: "King Penguin",
                            scienceName: "Aptenodytes Patagonicus",
                            extinct: false
                        },
                        {
                            name: "Emperor penguin",
                            scienceName: "Aptenodytes forsteri",
                            extinct: false
                        }
                    ]
                },
                {
                    name: "Brush-tailed Penguins",
                    scienceName: "Pygoscelis",
                    species: [
                        {
                            name: "Adélie penguin",
                            scienceName: "Pygoscelis adeliae",
                            extinct: false
                        },
                        {
                            name: "Chinstrap penguin",
                            scienceName: "Pygoscelis antarctica",
                            extinct: false
                        },
                        {
                            name: "Gentoo penguin",
                            scienceName: "Pygoscelis papua",
                            extinct: false
                        }
                    ]
                },
                {
                    name: "Little Penguins",
                    scienceName: "Eudyptula",
                    species: [
                        {
                            name: "Little blue penguin",
                            scienceName: "Eudyptula minor",
                            extinct: false
                        },
                        {
                            name: "Australian little penguin",
                            scienceName: "Eudyptula novaehollandiae",
                            extinct: false
                        },
                        {
                            name: "White-flippered penguin",
                            scienceName: "Eudyptula albosignata",
                            extinct: false
                        }
                    ]
                },
                {
                    name: "Banded Penguins",
                    scienceName: "Spheniscus",
                    species: [
                        {
                            name: "Magellanic penguin",
                            scienceName: "Spheniscus magellanicus",
                            extinct: false
                        },
                        {
                            name: "Humboldt penguin",
                            scienceName: "Spheniscus humboldti",
                            extinct: false
                        },
                        {
                            name: "Galapagos penguin",
                            scienceName: "Spheniscus mendiculus",
                            extinct: false
                        },
                        {
                            name: "African penguin",
                            scienceName: "Spheniscus demersus",
                            extinct: false
                        }
                    ]
                },
                {
                    name: "Large Diver Penguins",
                    scienceName: "Megadyptes",
                    species: [
                        {
                            name: "Yellow-eyed penguin",
                            scienceName: "Megadyptes antipodes",
                            extinct: false
                        },
                        {
                            name: "Waitaha penguin",
                            scienceName: "Megadyptes waitaha",
                            extinct: true
                        }
                    ]
                },
                {
                    name: "Crested Penguins",
                    scienceName: "Eudyptes",
                    species: [
                        {
                            name: "Fiordland penguin",
                            scienceName: "Eudyptes pachyrynchus",
                            extinct: false
                        },
                        {
                            name: "Snares penguin",
                            scienceName: "Eudyptes robustus",
                            extinct: false
                        },
                        {
                            name: "Erect-crested penguin",
                            scienceName: "Eudyptes sclateri",
                            extinct: false
                        },
                        {
                            name: "Western rockhopper penguin",
                            scienceName: "Eudyptes chrysocome",
                            extinct: false
                        },
                        {
                            name: "Eastern rockhopper penguin",
                            scienceName: "Eudyptes filholi",
                            extinct: false
                        },
                        {
                            name: "Northern rockhopper penguin",
                            scienceName: "Eudyptes moseleyi",
                            extinct: false
                        },
                        {
                            name: "Royal penguin",
                            scienceName: "Eudyptes schlegeli",
                            extinct: false
                        },
                        {
                            name: "Macaroni penguin",
                            scienceName: "Eudyptes chrysolophus",
                            extinct: false
                        },
                        {
                            name: "Chatham penguin",
                            scienceName: "Eudyptes chathamensis",
                            extinct: true
                        }
                    ]
                }
            ]
        });
    }
    
    /*

        ##############################
        ### Example create and put ###
        ##############################

    create(req, res, next) {
        const { body } = req;
        Driver.create(body)
            .then(driver => res.send(driver))
            .catch(next);
    },

    put(req, res, next) {
        const { id } = req.params;
        const { body } = req;
        Driver.findByIdAndUpdate({ _id: id }, body)
            .then(() => Driver.findById({ _id: id }))
                .then(driver => res.send(driver))
                .catch(next)
    }

    */
};