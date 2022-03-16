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
        name: "Pista DAM",
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
        bookReservationTime: 60,
        priceWithoutLight: 30,
        priceWithLight: 45,
        numberOfDaysToBookBefore: 2,
        numberOfHoursToCancelCourt: 4,
        opensAt: "8:30",
        closesAt: "21:30"
    });
});


//Booking
arrayOfInsertions.push(() => {
    return models.Booking.create({
        userId: 1,
        courtId: 1,
        day: "2022-03-16",
        time: "12:00",
        withLight: true
    });
});

arrayOfInsertions.push(() => {
    return models.Booking.create({
        userId: 1,
        courtId: 1,
        day: "2022-03-16",
        time: "9:00",
        withLight: true
    });
});

arrayOfInsertions.push(() => {
    return models.Booking.create({
        userId: 1,
        courtId: 1,
        day: "2022-03-16",
        time: "16:30",
        withLight: true
    });
});

arrayOfInsertions.push(() => {
    return models.Booking.create({
        userId: 1,
        courtId: 2,
        day: "2022-03-16",
        time: "8:30",
        withLight: true
    });
});

arrayOfInsertions.push(() => {
    return models.Booking.create({
        userId: 1,
        courtId: 2,
        day: "2022-03-16",
        time: "17:30",
        withLight: true
    });
});


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
                                