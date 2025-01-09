const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://sampleProjectPractice:sampleProjectPractice@clustersamplepractice.zavwl.mongodb.net/"
  )
  .then(() => console.log("Database connected successfully"))
  .catch((e) => console.log(e));

const useSchema = new mongoose.Schema({
  name: String,
  email: String,
  age: Number,
  isActive: Boolean,
  tags: [String],
  createdAt: { type: Date, default: Date.now },
});

// create model
const User = mongoose.model("User", useSchema);

//create user
async function runQueryExample() {
  try {
    // create user method in mongoose

    const newUser = await User.create({
      name: "updated User",
      email: "dpdateduser@gmail.com",
      age: 35,
      isActive: false,
      tags: ["developer"],    
    });

    // const newUser = new User({
    //   name: "Sabith P",
    //   email: "sabith@gmail.com",
    //   age: 34,
    //   isActive: true,
    //   tags: ["developer", "designer"],
    // });

    // await newUser.save();
    console.log("New user created ", newUser);

    // find all users
    // const allUsers = await User.find({})
    // console.log(allUsers);

    // const getUserOfActiveFalse = await User.find({isActive:false})
    // console.log(getUserOfActiveFalse);
    // console.log(getUserOfActiveFalse);

    // const getUserFindOne = await User.findOne({name:'Aswin Ramesh'})
    // console.log(getUserFindOne);

    // using the findById method
    // const getLastCreatedUser = await User.findById(newUser._id)
    // console.log("getLastCreatedUser",getLastCreatedUser);

    // only taking selected fields from the collection
    // const selectedFields = await User.find().select('name email -_id')
    // console.log(selectedFields);

    // const limitedUsers = await User.find().limit(5).skip(1)
    // console.log(limitedUsers);

    // const sortedUser = await User.find().sort({age:-1})
    // console.log(sortedUser);

    // const countDocuments = await User.countDocuments({isActive:false})
    // console.log(countDocuments);

    // const deletedUser = await User.findByIdAndDelete(newUser._id)
    // console.log(deletedUser);

    const updateduser = await User.findByIdAndUpdate(
      newUser._id,
      {
        $set: { age: 100 },
        $push: { tags: "updated" },
      },
      { new: true }
    );
    console.log(updateduser);
  } catch (error) {
    console.log(error);
  } finally {
    mongoose.connection.close();
  }
}
runQueryExample();
