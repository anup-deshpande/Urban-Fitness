var Item = require('./item');

module.exports.getItems = function () {

    let items = [];
    for (let i = 0; i < data.length; i++) {
        let item = new Item(data[i].id,
            data[i].name,
            data[i].muscleGroup,
            data[i].description,
            data[i].rating,
            data[i].imageURL);

        items.push(item);

    }
    return items;
};

module.exports.getItem = function (id) {
    console.info("from DB, Item code :" + id)
    for (var i = 0; i < data.length; i++) {
        console.log("Data" + JSON.stringify(data[i].imageURL));
        if (parseInt(data[i].id) == id) {
            let item = new Item(data[i].id,
                data[i].Name,
                data[i].muscleGroup,
                data[i].description,
                data[i].rating,
                data[i].imageURL
                )
            return item;
        }
    }
};


var data = [
    {
        id: 1,
        name: "Leg Press",
        muscleGroup: "Leg",
        description: "1. Using a leg press machine, sit down on the machine and place your legs on the platform directly in front of you at a medium foot stance. 2. Lower the safety bars holding the weighted platform in place and press the platform all the way up until your legs are fully extended in front of you.3. As you inhale, slowly lower the platform until your upper and lower legs make a 90-degree angle.Pushing mainly with the heels of your feet and using the quadriceps go back to the starting position as you exhale.4. Repeat for the recommended amount of repetitions and ensure to lock the safety pins properly once you are done. You do not want that platform falling on you fully loaded. Caution:Always check to make sure that when you re-rack the weight the platform is securely locked.",
        rating: 4,
        imageUrl: "http://johnsifferman.com/img/leg_press.jpg"

    },
    {
      id: 2,
      name: "Leg Extension",
      muscleGroup: "Leg",
      description: "For this exercise you will need to use a leg extension machine.First choose your weight and sit on the machine with your legs under the pad (feet pointed forward) and the hands holding the side bars. This will be your starting position. Tip- make sure that your legs form a 90-degree angle between the lower and upper leg. If the angle is less than 90-degrees then that means the knee is over the toes which in turn creates undue stress at the knee joint. Using your quadriceps, extend your legs to the maximum as you exhale. Ensure that the rest of the body remains stationary on the seat.Pause a second on the contracted position. Slowly lower the weight back to the original position as you inhale, ensuring that you do not go past the 90-degree angle limit.Repeat for the recommended amount of times.",
      rating: 3,
      imageUrl: "http://www.burnthefatinnercircle.com/members/images/1636.jpg"
    },

    {
      id: 3,
      name: "Bodyweight Squats",
      muscleGroup: "Leg",
      description: "1.Stand with your feet shoulder width apart. You can place your hands behind your head.This will be your starting position. Begin the movement by flexing your knees and hips, sitting back with your hips. Continue down to full depth if you are able,and quickly reverse the motion until you return to the starting position. As you squat, keep your head and chest up and push your knees out.",
      rating: 4,
      imageUrl: "https://www.pngkey.com/png/detail/287-2874578_bodyweight-squat-body-weight-squat-anatomy.png"
    },


    {
      id: 4,
      name: "Reverse Crunch",
      muscleGroup: "Abs & Core",
      description: "1.Stand with your feet shoulder width apart. You can place your hands behind your head. This will be your starting position. Begin the movement by flexing your knees and hips, sitting back with your hips. Continue down to full depth if you are able,and quickly reverse the motion until you return to the starting position. As you squat, keep your head and chest up and push your knees out.",
      rating: 4,
      imageUrl: "https://www.pngkey.com/png/detail/287-2874578_bodyweight-squat-body-weight-squat-anatomy.png"
    },

    {
      id: 5,
      name: "Flutter Kicks",
      muscleGroup: "Abs & Core",
      description: "1.Stand with your feet shoulder width apart. You can place your hands behind your head.This will be your starting position. Begin the movement by flexing your knees and hips, sitting back with your hips. Continue down to full depth if you are able,and quickly reverse the motion until you return to the starting position. As you squat, keep your head and chest up and push your knees out.",
      rating: 4,
      imageUrl: "https://www.pngkey.com/png/detail/287-2874578_bodyweight-squat-body-weight-squat-anatomy.png"
    },

    {
      id: 6,
      name: "Side Planks",
      muscleGroup: "Abs & Core",
      description: "1.Stand with your feet shoulder width apart. You can place your hands behind your head. This will be your starting position. Begin the movement by flexing your knees and hips, sitting back with your hips. Continue down to full depth if you are able,and quickly reverse the motion until you return to the starting position. As you squat, keep your head and chest up and push your knees out.",
      rating: 4,
      imageUrl: "https://www.pngkey.com/png/detail/287-2874578_bodyweight-squat-body-weight-squat-anatomy.png"
    }];

var category = ["Leg", "Abs & Core"];
