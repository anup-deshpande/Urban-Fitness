var Item = require('../model/item');

module.exports.getItems = function () {

    let items = [];
    for (let i = 0; i < data.length; i++) {
        let item = new Item(data[i].itemCode,
            data[i].itemName,
            data[i].catalogCategory,
            data[i].Description,
            data[i].Rating,
            data[i].imageURL);

        items.push(item);

    }
    return items;
};

module.exports.getItem = function (itemCode) {

    for (var i = 0; i < data.length; i++) {
        if (parseInt(data[i].itemCode) == itemCode) {
            let item = new Item(data[i].itemCode,
                data[i].itemName,
                data[i].catalogCategory,
                data[i].Description,
                data[i].Rating,
                data[i].imageURL
                )

            return item;
        }
    }
};

module.exports.getCountofItems = function(){
    return data.length;
};

var data = [
    {
      itemCode: 1,
      itemName: "Barbell Squats",
      catalogCategory: "Leg",
      Description:"Begin with the barbell supported on top of the traps. The chest should be up and the head facing forward. Adopt a hip-width stance with the feet turned out as needed. Descend by flexing the knees, refraining from moving the hips back as much as possible. This requires that the knees travel forward. Ensure that they stay align with the feet. The goal is to keep the torso as upright as possible. Continue all the way down, keeping the weight on the front of the heel. At the moment the upper legs contact the lower legs reverse the motion, driving the weight upward.",
      Rating: 3,
      imageURL: "../assets/images/item3.gif"
    },

    {
      itemCode: 2,
      itemName: "Lunges",
      catalogCategory: "Leg",
      Description:"1. Stand tall with feet hip-width apart. Engage core.2. Take a big step forward with right leg and start to shift weight forward so heel hits the floor first.3. Lower body until right thigh is parallel to floor and right shin is vertical (it's okay if knee shifts forward a little as long as it doesn't go past right toe). If mobility allows, lightly tap left knee to ground while keeping weight in right heel.4. Press into right heel to drive back up to starting position.5.Repeat on the other side.",
      Rating: 3,
      imageURL: "../assets/images/item2.gif"
    },

    {
        itemCode: 3,
        itemName: "Leg Press",
        catalogCategory: "Leg",
        Description: "1. Using a leg press machine, sit down on the machine and place your legs on the platform directly in front of you at a medium foot stance. 2. Lower the safety bars holding the weighted platform in place and press the platform all the way up until your legs are fully extended in front of you.3. As you inhale, slowly lower the platform until your upper and lower legs make a 90-degree angle.Pushing mainly with the heels of your feet and using the quadriceps go back to the starting position as you exhale.",
        Rating: 4,
        imageURL: "../assets/images/item1.gif"

    },





    {
      itemCode: 4,
      itemName: "Reverse Crunch",
      catalogCategory: "Abs & Core",
      Description: "1. Lie down on the floor with your legs fully extended and arms to the side of your torso with the palms on the floor. Your arms should be stationary for the entire exercise. 2. Move your legs up so that your thighs are perpendicular to the floor and feet are together and parallel to the floor. This is the starting position. 3. While inhaling, move your legs towards the torso as you roll your pelvis backwards and you raise your hips off the floor. At the end of this movement your knees will be touching your chest. ",
      Rating: 4,
      imageURL: "../assets/images/item4.gif"
    },

    {
      itemCode: 5,
      itemName: "Flutter Kicks",
      catalogCategory: "Abs & Core",
      Description: "1. Lie on your back with legs straight and arms extend out at your sides. 2. Lift your heels about 6 inches off the floor and rapidly kick your feet up and down in a quick, scissor-like motion.",
      Rating: 4,
      imageURL: "../assets/images/item5.gif"
    },

    {
      itemCode: 6,
      itemName: "Side Planks",
      catalogCategory: "Abs & Core",
      Description: "1. From your side plank position, slowly twist your chest until it’s parallel to the ground. 2. As you do this, thread your right arm through the space between your body and the floor. 3. Raise back to start. That’s one rep.",
      Rating: 4,
      imageURL: "../assets/images/item6.gif"
    }];

var category = ["Leg", "Abs & Core"];
