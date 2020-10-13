
getJSON();

function getJSON(){

//Questions

    //Variable is an array of objects
    //This holds the questions that will be displayed to the user
    var question=[{'answer_a': 'Jason varitek',
    'answer_b': 'Pokey reese',
    'answer_c': 'Johnny damon',
    'answer_d': 'Mark bellhorn',
    'category': 'sports',
    'correct_ans': 'Johnny damon',
    'id': 107,
    'question': 'Who led the 2004 Red Sox regular season in number of stolen bases?'},
    {'answer_a': 'Jason varitek',
    'answer_b': 'Pokey reese',
    'answer_c': 'Johnny damon',
    'answer_d': 'Mark bellhorn',
    'category': 'sports',
    'correct_ans': 'Johnny damon',
    'id': 107,
    'question': 'Who led the 2004 Red Sox regular season in number of stolen bases?'}]



    //This line takes the values from the database and converts the values into string
    //This is more of a safety feature as anything that was not JSON is converted to string
    //and will not be run
    let value=JSON.stringify(question);

    //This line converts the string into a javascipt readable format
    //Anything that was not JSON will be removed in the process
    value=JSON.parse(value);


//Displaying the data

    //Ex 1: to access the data, it is the same as how you access feilds in any object
    // ObjectInstense.feild
    //value[index].answer_a -> displays the value in answer A in the frist object of the array


    //Ex 2: looping through the different values
    for (let index = 0; index < value.length; index++) {
        console.log(value[index].answer_a);
        console.log(value[index].answer_b);
        console.log(value[index].answer_c);
        console.log(value[index].answer_d);
    }



    //Comparing values to see if the user was correct with their choice or not
    //Take the value of what the user has selected and compare it to the "correct_ans" field
    if(value[0].answer_c===value[0].correct_ans){
        console.log("Correct");
    }else{
        console.log("Wrong");
    }

//Leaderboard

    //What the leaderboard will probably look like when returned and processed as done above
    // playername: score
    var leaderboard={
        player1: 2,
        player2: 1,
        player3: 1,
        player4: 3
    }

    console.log(leaderboard);


//Dislaying the data
    //Option 1- using the back ticks `` and ${VariableToDisplay}
    console.log(`Player 1 your score is: ${leaderboard.player1}`);

    //Option 2- using contactination "String to display" + VaraibleToDisplay + "more strings to display"
    console.log("Player 1 your score is: "+ leaderboard.player1);



}
