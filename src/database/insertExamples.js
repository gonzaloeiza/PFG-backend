const models = require("./models");
const bcrypt = require("bcryptjs");

arrayOfInsertions = []

//Users
arrayOfInsertions.push(() => {
    return models.User.create({
        email: "eizaguirregonzalo@gmail.com",
        dni: "78995380v",
        phoneNumber: "+34658223752",
        name: "Gonzalo",
        firstSurname: "Eizaguirre",
        secondSurname: " Berasategui",
        gender: "Hombre",
        dateBirth: "2000-08-02",
        passwordHash: bcrypt.hashSync("12345678", 8)
    });
});

arrayOfInsertions.push(() => {
    return models.User.create({
        email: "goneizaguirre@gmail.com",
        dni: "78995380v",
        phoneNumber: "+34658223752",
        name: "Gonzalo",
        firstSurname: "Eizaguirre",
        secondSurname: " Berasategui",
        gender: "Hombre",
        dateBirth: "2000-08-02",
        passwordHash: bcrypt.hashSync("12345678", 8)
    });
});

arrayOfInsertions.push(() => {
    return models.User.create({
        email: "gonzaloeizaguirre@opendeusto.es",
        dni: "78995380v",
        phoneNumber: "+34658223752",
        name: "Gonzalo",
        firstSurname: "Eizaguirre",
        secondSurname: " Berasategui",
        gender: "Hombre",
        dateBirth: "2000-08-02",
        passwordHash: bcrypt.hashSync("12345678", 8)
    });
});

//Courts
arrayOfInsertions.push(() => {
    return models.Court.create({
        nombre: "Pista DAM",
        bookReservationTime: 90,
        priceWithoutLight: 35,
        priceWithLight: 40,
        numberOfDaysToBookBefore: 2,
        numberOfHoursToCancelCourt: 6
    });
});

arrayOfInsertions.push(() => {
    return models.Court.create({
        nombre: "Pista CUPRA",
        bookReservationTime: 60,
        priceWithoutLight: 30,
        priceWithLight: 45,
        numberOfDaysToBookBefore: 2,
        numberOfHoursToCancelCourt: 4
    });
});


// //Booking
// arrayOfInsertions.push(() => {
//     return models.Booking.create({
//         userId: 1,
//         courtId: 1
//     });
// });

// arrayOfInsertions.push(() => {
//     return models.Booking.create({
//         userId: 1,
//         courtId: 2
//     });
// });

// arrayOfInsertions.push(() => {
//     return models.Booking.create({
//         userId: 2,
//         courtId: 1
//     });
// });

// arrayOfInsertions.push(() => {
//     return models.Booking.create({
//         userId: 2,
//         courtId: 2
//     });
// });


// //Ranking
// arrayOfInsertions.push(() => {
//     return models.Ranking.create({
//         name: "Ranking masculino",
//         year: 2022,
//         rankingType: "Masculino"
//     });
// });

// arrayOfInsertions.push(() => {
//     return models.Ranking.create({
//         name: "Ranking femenino",
//         year: 2022,
//         rankingType: "Femenino"
//     });
// });

// arrayOfInsertions.push(() => {
//     return models.Ranking.create({
//         name: "Ranking mixto",
//         year: 2022,
//         rankingType: "Mixto"
//     });
// });


// //Journey
// arrayOfInsertions.push(() => {
//     return models.Journey.create({
//         // number: 1,
//         rankingId: 1
//     });
// });

// arrayOfInsertions.push(() => {
//     return models.Journey.create({
//         // number: 1,
//         rankingId: 2
//     });
// });

// arrayOfInsertions.push(() => {
//     return models.Journey.create({
//         // number: 1,
//         rankingId: 3
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
                                