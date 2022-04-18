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


module.exports = {
    getRankings,
    createNewRanking,
    addPartnerToRanking,
    startRanking,
    getRankingData,
    deleteRanking,
}