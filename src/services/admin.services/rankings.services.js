const databaseService = require("./database.services");


function getRankings() {
    return new Promise((resolve, reject) => {
        databaseService.getAllRankings().then((data) => {
            return resolve(data);
        }).catch((err) => {
            return reject(err);
        });
    });

}

function createNewRanking(rankingData) {
    return new Promise((resolve, reject) => {
        databaseService.createNewRanking(rankingData).then((data) => {
            databaseService.createNewGroup(data.id, 1).then(() => {
                return resolve("Ranking creado con éxito");
            }).catch((err) => {
                return reject(err);
            });
       }).catch((err) => {
           return reject(err);
       });
    });
}

function addPartnerToRanking(rankingId, playerOneId, playerTwoId) {
    return new Promise((resolve, reject) => {
        databaseService.partnerDoesNotExistsOnRanking(rankingId, playerOneId, playerTwoId).then(() => {
            databaseService.createNewPartner(rankingId, playerOneId, playerTwoId).then((partnerData) => {
                databaseService.findLastGroupNumber(rankingId).then((lastGroupData) => {
                    databaseService.getRankingGroupByNumber(rankingId, lastGroupData.maxGroup).then((groupData) => {
                        if (groupData.partnerOneId === null || groupData.partnerTwoId === null || groupData.partnerThreeId === null) {
                            if (groupData.partnerOneId === null) {
                                databaseService.updateFirstPartnerOfGroup(groupData.id, partnerData.id).then(() => {
                                    return resolve("Añadido como pareja 1 del grupo: " + groupData.number);
                                }).catch((err) => {
                                    return reject(err);
                                });
                            } else if (groupData.partnerTwoId === null) {
                                databaseService.updateSecondPartnerOfGroup(groupData.id, partnerData.id).then(() => {
                                    return resolve("Añadido como pareja 2 del grupo: " + groupData.number);
                                }).catch((err) => {
                                    return reject(err);
                                });
                            } else if (groupData.partnerThreeId === null) {
                                databaseService.updateThirdPartnerOfGroup(groupData.id, partnerData.id).then(() => {
                                    return resolve("Añadido como pareja 3 del grupo: " + groupData.number);
                                }).catch((err) => {
                                    return reject(err);
                                });
                            }
                        } else {
                            databaseService.createNewGroup(rankingId, groupData.number + 1).then((newGroupData) => {
                                databaseService.updateFirstPartnerOfGroup(newGroupData.id, partnerData.id).then(() => {
                                    return resolve("Añadido como pareja 1 del grupo: " + (groupData.number + 1));
                                }).catch((err) => {
                                    return reject(err);
                                });
                            }).catch((err) => {
                                return reject(err);
                            });
                        }
                    }).catch((err) => {
                        return reject(err);
                    });
                }).catch((err) => {
                    return reject(err);
                });

            }).catch((err) => {
                return reject(err);
            });
        }).catch((err) => {
            return reject(err);
        });
    });
}

function deleteLastGroupIfNotFull(rankingId) {
    return new Promise((resolve, reject) => {        
        databaseService.findLastGroupNumber(rankingId).then((lastGroupData) => {
            databaseService.getRankingGroupByNumber(rankingId, lastGroupData.maxGroup).then((groupData) => {
                if (groupData.partnerOneId === null || groupData.partnerTwoId === null || groupData.partnerThreeId === null) {
                    var partnerIds = [];
                    if (groupData.partnerOneId !== null) {
                        partnerIds.push(groupData.partnerOneId);
                    }
                    if (groupData.partnerTwoId !== null) {
                        partnerIds.push(groupData.partnerTwoId);
                    }
                    if (groupData.partnerThreeId !== null) {
                        partnerIds.push(groupData.partnerThreeId);
                    }
                    databaseService.deleteGroup(groupData.id).then(() => {
                        databaseService.deletePartners(partnerIds).then(() => {
                            return resolve();
                        }).catch((err) => {
                            return reject(err);
                        });
                    }).catch((err) => {
                        return reject(err);
                    });
                } else {
                    return resolve();
                }
            });
        }).catch((err) => {
            return reject(err);
        });
    });
}

function startRanking(rankingId) {
    return new Promise((resolve, reject) => {        
        deleteLastGroupIfNotFull(rankingId).then(() => {
            databaseService.getAllPartnersFromRanking(rankingId).then((partnersPoints) => {
                var sortedPartnersPoints = partnersPoints;                
                sortedPartnersPoints.sort((a, b) => {
                    return (b["playerOne.rankingPoints"] + b["playerTwo.rankingPoints"]) - (a["playerOne.rankingPoints"] + a["playerTwo.rankingPoints"]);
                });
                var groupNumber = 1;
                var promises = [];
                for (var i = 0; i < sortedPartnersPoints.length; i++) {
                    if ((i + 1) % 3 === 1) {
                        promises.push(databaseService.updateFirstPartnerOfGroupByRankingIdAndNumberOfGroup(rankingId, groupNumber, sortedPartnersPoints[i].id));
                    } else if ((i + 1) % 3 === 2) {
                        promises.push(databaseService.updateSecondPartnerOfGroupByRankingIdAndNumberOfGroup(rankingId, groupNumber, sortedPartnersPoints[i].id));
                    } else if ((i + 1) % 3 === 0) {
                        promises.push(databaseService.updateThirdPartnerOfGroupByRankingIdAndNumberOfGroup(rankingId, groupNumber, sortedPartnersPoints[i].id));
                        groupNumber += 1;
                    }
                }
                Promise.all(promises).then(() => {
                    databaseService.getAllGroupsFromRanking(rankingId).then((rankingGroups) => {
                        promises = [];
                        for (var i = 0; i < rankingGroups.length; i++) {
                            promises.push(databaseService.createMatch(rankingGroups[i].id, rankingGroups[i].partnerOneId, rankingGroups[i].partnerTwoId));
                            promises.push(databaseService.createMatch(rankingGroups[i].id, rankingGroups[i].partnerTwoId, rankingGroups[i].partnerThreeId));
                            promises.push(databaseService.createMatch(rankingGroups[i].id, rankingGroups[i].partnerThreeId, rankingGroups[i].partnerOneId));
                        }
                        Promise.all(promises).then(() => {
                            databaseService.setRankingRegistrationClosed(rankingId).then(() => {
                                return resolve("Ranking empezado y grupos organizados");
                            }).catch((err) => {
                                return reject(err);
                            });
                        }).catch((err) => {
                            return reject(err);
                        });
                    }).catch((err) => {
                        return reject(err);
                    });
                }).catch((err) => {
                    return reject(err);
                });
            }).catch((err) => {
                return reject(err);
            });
        }).catch((err) => {
            return reject(err);
        });
    });
}


function getRankingData(rankingId) {
    return new Promise((resolve, reject) => {
        databaseService.getAllPartnersFromRanking(rankingId).then((partners) => {
            databaseService.getRankingData(rankingId).then((rankingData) => {
                rankingData.partners = partners;
                databaseService.getMatchesFromRanking(rankingId).then((matches) => {
                    matches.sort((a, b) => {
                        return a["group.number"] - b["group.number"];
                    });
                    rankingData.matches = matches;
                    return resolve(rankingData);
                }).catch((err) => {
                    return reject(err);
                });
            }).catch((err) => {
                return reject(err);
            });
        }).catch((err) => {
            return reject(err);
        });
    });
}

function deleteRanking(rankingId) {
    return new Promise((resolve, reject) => {
        databaseService.deleteRanking(rankingId).then((data) => {
            return resolve(data);
        }).catch((err) => {
            return reject(err);
        });
    });
}


function generateNewJourney(rankingId) {
    return new Promise((resolve, reject) => {
        setNotPlayedMatchesToLost(rankingId).then(() => {
            databaseService.getAllGroupsFromRanking(rankingId).then((groupsData) => {
                const numberOfGroups = groupsData.length;
                var newGroups = [];
                var promises = [];
                groupsData.forEach(groupData => {
                    promises.push(getWinsOfGroup(groupData));
                });
                Promise.all(promises).then((newGroupsData) => {
                    promises = [];
                    deleteAllMatchesOfRanking(rankingId).then(() => {
                        if (numberOfGroups > 1) {
                            promises.push(databaseService.updateFirstPartnerOfGroup(newGroupsData[0].id, newGroupsData[0].partnerIdGoesUp));
                            promises.push(databaseService.updateSecondPartnerOfGroup(newGroupsData[0].id, newGroupsData[0].partnerIdStays));
                            promises.push(databaseService.updateFirstPartnerOfGroup(newGroupsData[1].id, newGroupsData[0].partnerIdGoesDown));
                            for (var i = 1; i < numberOfGroups - 1; i++) {
                                promises.push(databaseService.updateThirdPartnerOfGroup(newGroupsData[i - 1].id, newGroupsData[i].partnerIdGoesUp));
                                promises.push(databaseService.updateFirstPartnerOfGroup(newGroupsData[i + 1].id, newGroupsData[i].partnerIdGoesDown));
                            }
                            promises.push(databaseService.updateThirdPartnerOfGroup(newGroupsData[numberOfGroups - 2].id, newGroupsData[numberOfGroups - 1].partnerIdGoesUp));
                            promises.push(databaseService.updateSecondPartnerOfGroup(newGroupsData[numberOfGroups - 1].id, newGroupsData[numberOfGroups - 1].partnerIdStays));
                            promises.push(databaseService.updateThirdPartnerOfGroup(newGroupsData[numberOfGroups - 1].id, newGroupsData[numberOfGroups - 1].partnerIdGoesDown));
                        
                        } else {
                            promises.push(databaseService.updateFirstPartnerOfGroup(newGroupsData[0].id, newGroupsData[0].partnerIdGoesUp));
                            promises.push(databaseService.updateSecondPartnerOfGroup(newGroupsData[0].id, newGroupsData[0].partnerIdStays));
                            promises.push(databaseService.updateThirdPartnerOfGroup(newGroupsData[0].id, newGroupsData[0].partnerIdGoesDown));
                        }

                        Promise.all(promises).then(() => {
                            createNewMatches(rankingId).then(() => {
                                incrementRankingJourneyByOne(rankingId).then(() => {
                                    return resolve("Nueva jornada generada con éxito");
                                }).catch((err) => {
                                    return reject(err);
                                });
                            }).catch((err) => {
                                return reject(err);
                            });
                        }).catch((err) => {
                            return reject(err);
                        });
                    }).catch((err) => {
                        return reject(err);
                    });
                }).catch((err) => {
                    return reject(err);
                });
            }).catch((err) => {
                return reject(err);
            });
        }).catch((err) => {
            return reject(err);
        });
    });
}

function incrementRankingJourneyByOne(rankingId) {
    return new Promise((resolve, reject) => {
        databaseService.getRankingData(rankingId).then((rankingData) => {
            databaseService.updateRankingJourney(rankingId, rankingData.journeyNumber + 1).then(() => {
                return resolve("Jornada incrementada con éxito");
            }).catch((err) => {
                return reject(err);
            });
        }).catch((err) => {
            return reject(err);
        });

    });
}

function createNewMatches(rankingId) {
    return new Promise((resolve, reject) => {
        databaseService.getAllGroupsFromRanking(rankingId).then((rankingGroups) => {
            promises = [];
            for (var i = 0; i < rankingGroups.length; i++) {
                promises.push(databaseService.createMatch(rankingGroups[i].id, rankingGroups[i].partnerOneId, rankingGroups[i].partnerTwoId));
                promises.push(databaseService.createMatch(rankingGroups[i].id, rankingGroups[i].partnerTwoId, rankingGroups[i].partnerThreeId));
                promises.push(databaseService.createMatch(rankingGroups[i].id, rankingGroups[i].partnerThreeId, rankingGroups[i].partnerOneId));
            }
            Promise.all(promises).then(() => {
                return resolve("Partidos creados con éxito");
            }).catch((err) => {
                return reject(err);
            });
        }).catch((err) => {
            return reject(err);
        });
    });
}

function getWinsOfGroup(groupData) {
    return new Promise((resolve, reject) => {
        getWinMatchesOfPartner(groupData.id, groupData.partnerOneId).then((partnerOneWins) => {
            getWinMatchesOfPartner(groupData.id, groupData.partnerTwoId).then((partnerTwoWins) => {
                getWinMatchesOfPartner(groupData.id, groupData.partnerThreeId).then((partnerThreeWins) => {

                    var newGroupData = {...groupData};
                    var promises = [];

                    if (partnerOneWins !== 1 || partnerTwoWins !== 1 || partnerThreeWins !== 1) {
                        if (partnerOneWins === 2) {
                            newGroupData.partnerIdGoesUp = groupData.partnerOneId;
                        } else if (partnerTwoWins === 2) {
                            newGroupData.partnerIdGoesUp = groupData.partnerTwoId;
                        } else {
                            newGroupData.partnerIdGoesUp = groupData.partnerThreeId;
                        }

                        if (partnerOneWins === 1) {
                            newGroupData.partnerIdStays = groupData.partnerOneId;
                        } else if (partnerTwoWins === 1) {
                            newGroupData.partnerIdStays = groupData.partnerTwoId;
                        } else {
                            newGroupData.partnerIdStays = groupData.partnerThreeId;
                        }

                        if (partnerOneWins === 0) {
                            newGroupData.partnerIdGoesDown = groupData.partnerOneId;
                        } else if (partnerTwoWins === 0) {
                            newGroupData.partnerIdGoesDown = groupData.partnerTwoId;
                        } else {
                            newGroupData.partnerIdGoesDown = groupData.partnerThreeId;
                        }

                        promises.push(addPointsToPartner(newGroupData.number, newGroupData.partnerIdGoesUp, 2));
                        promises.push(addPointsToPartner(newGroupData.number, newGroupData.partnerIdStays, 1));


                    } else {
                        newGroupData.partnerIdGoesUp = groupData.partnerOneId;
                        newGroupData.partnerIdStays = groupData.partnerTwoId;
                        newGroupData.partnerIdGoesDown = groupData.partnerThreeId;

                        promises.push(addPointsToPartner(newGroupData.number, newGroupData.partnerOneId, 1));
                        promises.push(addPointsToPartner(newGroupData.number, newGroupData.partnerTwoId, 1));
                        promises.push(addPointsToPartner(newGroupData.number, newGroupData.partnerThreeId, 1));
                    }
                    
                    Promise.all(promises).then(() => {
                        return resolve(newGroupData);
                    }).catch((err) => {
                        return reject(err);
                    });
                }).catch((err) => {
                    return reject(err);
                });
            }).catch((err) => {
                return reject(err);
            });
        }).catch((err) => {
            return reject(err);
        });
    });
}

function addPointsToPartner(groupNumber, partnerId, numberOfWins) {
    return new Promise((resolve, reject) => {
        databaseService.getPartnerData(partnerId).then((partnerData) => {
            var points = (50 * numberOfWins) / groupNumber;
            var promises = [];
            
            promises.push(databaseService.updateUserPoints(partnerData["playerOne.id"], partnerData["playerOne.rankingPoints"] + points));
            promises.push(databaseService.updateUserPoints(partnerData["playerTwo.id"], partnerData["playerTwo.rankingPoints"] + points));
            
            Promise.all(promises).then(() => {
                return resolve("Puntos de la pareja actualizados con éxito");
            }).catch((err) => {
                return reject(err);
            });
        }).catch((err) => {
            return reject(err);
        });
    });
}

function getWinMatchesOfPartner(groupId, partnerId) {
    return new Promise((resolve, reject) => {
        databaseService.getResultOfMatchWhenPartnerOne(groupId, partnerId).then((matchPartnerOneData) => {
            databaseService.getResultOfMatchWhenPartnerTwo(groupId, partnerId).then((matchPartnerTwoData) => {
                var wins = 0;
                if (matchPartnerOneData.partnerOneWins === 1) {
                    wins++;
                }
                if (matchPartnerTwoData.partnerOneWins === 0) {
                    wins++;
                }
                return resolve(wins);
            }).catch((err) => {
                return reject(err);
            });
        }).catch((err) => {
            return reject(err);
        });
    });
}

function setNotPlayedMatchesToLost(rankingId) {
    return new Promise((resolve, reject) => {
        databaseService.getMatchesFromRanking(rankingId).then((matchesData) => {
            const promises = [];
            for (var i = 0; i < matchesData.length; i++) {
                if (matchesData[i].partnerOneWins === null) {
                    promises.push(databaseService.setNotPlayedMatchesToLost(matchesData[i].id));
                }
            }
            Promise.all(promises).then(() => {
                return resolve();
            }).catch((err) => {
                return reject(err);
            });
        }).catch((err) => {
            return reject(err);
        });
    });
}

function deleteAllMatchesOfRanking(rankingId) {
    return new Promise((resolve, reject) => {
        databaseService.getMatchesFromRanking(rankingId).then((matchesData) => {
            const promises = [];
            for (var i = 0; i < matchesData.length; i++) {
                promises.push(databaseService.deleteMatch(matchesData[i].id));
            }
            Promise.all(promises).then(() => {
                return resolve();
            }).catch((err) => {
                return reject(err);
            });
        }).catch((err) => {
            return reject(err);
        });
    });
}


module.exports = {
    getRankings,
    createNewRanking,
    addPartnerToRanking,
    startRanking,
    getRankingData,
    deleteRanking,
    generateNewJourney,
}