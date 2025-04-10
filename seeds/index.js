const mongoose = require('mongoose');
const cities = require('./cities');
const {places, descriptors} = require('./seedHelpers');
const Campground = require('../models/campground');
const dbUrl = process.env.DB_URL

mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    // useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length )]

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground ({
            author: '67e2c5a9e0616dbbb79f7b22',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Minus corrupti dicta minima aspernatur dignissimos, totam laudantium aliquid perferendis ea repellendus. Deserunt aperiam harum nulla modi cum, animi cupiditate reiciendis delectus?',
            price,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude,
                ]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/dmn1e6eom/image/upload/v1743437224/YelpCamp/zx6rtm8kcje1wl0rraya.png',
                    filename: 'YelpCamp/zx6rtm8kcje1wl0rraya'
                },
                {
                    url: 'https://res.cloudinary.com/dmn1e6eom/image/upload/v1743437224/YelpCamp/ywzrco9csmlu5sd3notp.png',
                    filename: 'YelpCamp/ywzrco9csmlu5sd3notp'
                }
            ]
        });
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
});