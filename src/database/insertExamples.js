const models = require("./models");
var bcrypt = require("bcryptjs");

arrayOfInsertions = []

//Users
arrayOfInsertions.push(() => {
    return models.User.create({
        email: "eizaguirregonzalo@gmail.com",
        username: "gonzaloeiza",
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
        username: "gonzaloeiza8",
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
        username: "gonzalo_eiza",
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
        timeUnity: 90,
        priceWithoutLight: 35,
        priceWithLight: 40
    });
});

arrayOfInsertions.push(() => {
    return models.Court.create({
        nombre: "Pista 1",
        priceWithoutLight: 25,
        priceWithLight: 30
    });
});

//Partners
arrayOfInsertions.push(() => {
    return models.Booking.create({
        userId: 1,
        courtId: 1
    });
});

arrayOfInsertions.push(() => {
    return models.Booking.create({
        userId: 1,
        courtId: 2
    });
});

arrayOfInsertions.push(() => {
    return models.Booking.create({
        userId: 2,
        courtId: 1
    });
});

arrayOfInsertions.push(() => {
    return models.Booking.create({
        userId: 2,
        courtId: 2
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
