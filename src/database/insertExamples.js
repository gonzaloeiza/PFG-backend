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
        email: "eizaguirregonzalo@gmail.com",
        dni: "78995380v",
        phoneNumber: "34658223752",
        name: "Gonzalo",
        firstSurname: "Eizaguirre",
        secondSurname: " Berasategui",
        gender: "Hombre",
        dateBirth: "2000-08-02",
        passwordHash: bcrypt.hashSync("12345678", 8),
        pendingSignUp: 0
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
        pendingSignUp: 1
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
                                