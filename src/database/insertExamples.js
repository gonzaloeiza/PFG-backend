const models = require("./models");
const bcrypt = require("bcryptjs");

arrayOfInsertions = []

//Admins
arrayOfInsertions.push(() => {
    return models.Admin.create({
        email: "admin@gmail.com",
        passwordHash: bcrypt.hashSync("12345678", 8)
    });
});


//Users
arrayOfInsertions.push(() => {
    return models.User.create({
        email: "juanM@gmail.com",
        dni: "11111111v",
        phoneNumber: "34666666666",
        name: "Juan",
        firstSurname: "Martinez",
        secondSurname: "",
        gender: "Hombre",
        dateBirth: "2000-04-03",
        passwordHash: bcrypt.hashSync("12345678", 8),
        pendingSignUp: 0,
        rankingPoints: 12
    });
});

arrayOfInsertions.push(() => {
    return models.User.create({
        email: "eizaguirregonzalo@gmail.com",
        dni: "78995380v",
        phoneNumber: "34658223752",
        name: "Gonzalo",
        firstSurname: "Eizaguirre",
        secondSurname: " Berasategui",
        gender: "Hombre",
        dateBirth: "2000-08-02",
        passwordHash: bcrypt.hashSync("12345678", 8),
        pendingSignUp: 0,
        rankingPoints: 7
    });
});


arrayOfInsertions.push(() => {
    return models.User.create({
        email: "pabloMartinez@gmail.com",
        dni: "11111111v",
        phoneNumber: "34666666666",
        name: "Pablo",
        firstSurname: "Martinez",
        secondSurname: "",
        gender: "Hombre",
        dateBirth: "2000-04-03",
        passwordHash: bcrypt.hashSync("12345678", 8),
        pendingSignUp: 0,
        rankingPoints: 1
    });
});


arrayOfInsertions.push(() => {
    return models.User.create({
        email: "alberto@gmail.com",
        dni: "11111111v",
        phoneNumber: "34666666666",
        name: "Alberto",
        firstSurname: "Perez",
        secondSurname: "",
        gender: "Hombre",
        dateBirth: "2000-04-03",
        passwordHash: bcrypt.hashSync("12345678", 8),
        pendingSignUp: 0
    });
});


arrayOfInsertions.push(() => {
    return models.User.create({
        email: "pabloPicaso@gmail.com",
        dni: "11111111v",
        phoneNumber: "34666666666",
        name: "Pablo",
        firstSurname: "Picaso",
        secondSurname: "",
        gender: "Hombre",
        dateBirth: "2000-04-03",
        passwordHash: bcrypt.hashSync("12345678", 8),
        pendingSignUp: 0,
    });
});


arrayOfInsertions.push(() => {
    return models.User.create({
        email: "RobertoBera@gmail.com",
        dni: "11111111v",
        phoneNumber: "34666666666",
        name: "Roberto",
        firstSurname: "Bera",
        secondSurname: "Sategui",
        gender: "Hombre",
        dateBirth: "2000-04-03",
        passwordHash: bcrypt.hashSync("12345678", 8),
        pendingSignUp: 0,
        rankingPoints: 3
    });
});

arrayOfInsertions.push(() => {
    return models.User.create({
        email: "JavierSagu@gmail.com",
        dni: "11111111v",
        phoneNumber: "34666666666",
        name: "Javier",
        firstSurname: "Sagu",
        secondSurname: "Estella",
        gender: "Hombre",
        dateBirth: "2000-04-03",
        passwordHash: bcrypt.hashSync("12345678", 8),
        pendingSignUp: 0,
        rankingPoints: 4
    });
});


arrayOfInsertions.push(() => {
    return models.User.create({
        email: "JonZ@gmail.com",
        dni: "11111111v",
        phoneNumber: "34666666666",
        name: "Jon",
        firstSurname: "Zeta",
        secondSurname: "Bilbao",
        gender: "Hombre",
        dateBirth: "2000-04-03",
        passwordHash: bcrypt.hashSync("12345678", 8),
        pendingSignUp: 0,
        rankingPoints: 11
    });
});


arrayOfInsertions.push(() => {
    return models.User.create({
        email: "XabierU@gmail.com",
        dni: "11111111v",
        phoneNumber: "34666666666",
        name: "Xavier",
        firstSurname: "Belan",
        secondSurname: "Ategui",
        gender: "Hombre",
        dateBirth: "2000-04-03",
        passwordHash: bcrypt.hashSync("12345678", 8),
        pendingSignUp: 0,
        rankingPoints: 8
    });
});

arrayOfInsertions.push(() => {
    return models.User.create({
        email: "AlbertoUber@gmail.com",
        dni: "11111111v",
        phoneNumber: "34666666666",
        name: "Alberto",
        firstSurname: "Ais",
        secondSurname: "Tega",
        gender: "Hombre",
        dateBirth: "2000-04-03",
        passwordHash: bcrypt.hashSync("12345678", 8),
        pendingSignUp: 0,
        rankingPoints: 11
    });
});

arrayOfInsertions.push(() => {
    return models.User.create({
        email: "DiegoEiza@gmail.com",
        dni: "11111111v",
        phoneNumber: "34666666666",
        name: "Diego",
        firstSurname: "Eiza",
        secondSurname: "Guirre",
        gender: "Hombre",
        dateBirth: "2000-04-03",
        passwordHash: bcrypt.hashSync("12345678", 8),
        pendingSignUp: 0,
        rankingPoints: 0
    });
});

arrayOfInsertions.push(() => {
    return models.User.create({
        email: "VictorTren@gmail.com",
        dni: "11111111v",
        phoneNumber: "34666666666",
        name: "Victor",
        firstSurname: "Tren",
        secondSurname: "Ais",
        gender: "Hombre",
        dateBirth: "2000-04-03",
        passwordHash: bcrypt.hashSync("12345678", 8),
        pendingSignUp: 0,
        rankingPoints: 5
    });
});

//Courts
arrayOfInsertions.push(() => {
    return models.Court.create({
        name: "Pista DAM",
        picture: "Pista DAM.png",
        smartCitizenId: "15262",
        bookReservationTime: 90,
        priceWithoutLight: 35,
        priceWithLight: 40,
        numberOfDaysToBookBefore: 2,
        numberOfHoursToCancelCourt: 6,
        opensAt: "9:00",
        closesAt: "19:30"
    });
});

arrayOfInsertions.push(() => {
    return models.Court.create({
        name: "Pista CUPRA",
        picture: "Pista CUPRA.png",
        smartCitizenId: "15262",
        bookReservationTime: 60,
        priceWithoutLight: 30,
        priceWithLight: 45,
        numberOfDaysToBookBefore: 2,
        numberOfHoursToCancelCourt: 4,
        opensAt: "9:30",
        closesAt: "21:30"
    });
});


//Booking
arrayOfInsertions.push(() => {
    return models.Booking.create({
        userId: 1,
        courtId: 1,
        day: "2022-04-17",
        startTime: "12:00",
        finishTime: "13:30",
        withLight: true,
        amountToPay: 12.22
    });
});

arrayOfInsertions.push(() => {
    return models.Booking.create({
        userId: 1,
        courtId: 1,
        day: "2022-03-17",
        startTime: "9:00",
        finishTime: "10:30",
        withLight: true,
        amountToPay: 12.22
    });
});

arrayOfInsertions.push(() => {
    return models.Booking.create({
        userId: 1,
        courtId: 1,
        day: "2022-04-12",
        startTime: "16:30",
        finishTime: "18:00",
        withLight: true,
        amountToPay: 12.22
    });
});

arrayOfInsertions.push(() => {
    return models.Booking.create({
        userId: 1,
        courtId: 2,
        day: "2022-03-02",
        startTime: "15:30",
        finishTime: "17:00",
        withLight: true,
        amountToPay: 12.22
    });
});

arrayOfInsertions.push(() => {
    return models.Booking.create({
        userId: 1,
        courtId: 2,
        day: "2022-04-17",
        startTime: "17:30",
        finishTime: "18:30",
        withLight: true,
        amountToPay: 12.22
    });
});

// //Ranking
// arrayOfInsertions.push(() => {
//     models.Ranking.create({
//         name: "ranking prueba",
//         year: 2022,
//         rankingType: "MASCULINO",
//     });
// });


// //Journeys
// arrayOfInsertions.push(() => {
//     models.Journey.create({
//         number: 0,
//         rankingId: 1
//     });
// });


// //Groups
// arrayOfInsertions.push(() => {
//     models.Group.create({
//         number: 1,
//         journeyId: 1
//     }); 
// });

// arrayOfInsertions.push(() => {
//     models.Group.create({
//         number: 2,
//         journeyId: 1
//     }); 
// });


// //Partners
// arrayOfInsertions.push(() => {
//     models.Partner.create({
//         groupId: 1,
//         playerOneId: 1,
//         playerTwoId: 2,
//     });
// });

// arrayOfInsertions.push(() => {
//     models.Partner.create({
//         groupId: 1,
//         playerOneId: 3,
//         playerTwoId: 4,
//     });
// });

// arrayOfInsertions.push(() => {
//     models.Partner.create({
//         groupId: 1,
//         playerOneId: 5,
//         playerTwoId: 6,
//     });
// });

// arrayOfInsertions.push(() => {
//     models.Partner.create({
//         groupId: 2,
//         playerOneId: 7,
//         playerTwoId: 8,
//     });
// });

// arrayOfInsertions.push(() => {
//     models.Partner.create({
//         groupId: 2,
//         playerOneId: 9,
//         playerTwoId: 10,
//     });
// });


async function executeInsertions() {
    for (let insertion of arrayOfInsertions) {
        try {
            await insertion();
        } catch (err) {
            console.log("Error inserting data: " + err);
        }
    }
}

executeInsertions();
                                