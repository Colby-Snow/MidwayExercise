var madeCard = false;

function validateTimeForm(){
    console.log("ValidateTimeForm was called");
    var time = $("#timeinput").val();
    var inputedTime = time.split(':');
    var hours = parseInt(inputedTime[0]);
    var minutes = parseInt(inputedTime[1]);
    console.log(`${hours} hours and ${minutes} minutes`);
    if(hours > 12){
        var pm = true;
        hours = hours - 12;
    }
    var timeInWords = convertTimeToWords(hours,minutes);
    displayTime(timeInWords);
    event.preventDefault();
}

function runTestScenarios(){
    let times = [
        [5,47],
        [3,0],
        [7,29],
        [5,30],
        [5,45],
        [4,15],
        [6,35],
        [3,30],
        [10,57],
        [1,1],
        [7,15],
        [12,45]
    ];
    times.forEach(convertArrayTimeToWords);
    event.preventDefault();
}

function convertArrayTimeToWords(item, index){
    var timeInWords = convertTimeToWords(item[0], item[1]);
    displayTime(timeInWords);
}

function convertTimeToWords(hours, minutes){
    var hourString, minString = "";

    //Sets the text needed for the hour and minute into two arrays
    var hoursArray = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve", "one"];
    var minuteArray = ["one minute", "two minutes","three minutes","four minutes","five minutes","six minutes","seven minutes","eight minutes","nine minutes", 
                        "ten minutes", "eleven minutes", "twelve minutes", "thirteen minutes", "fourteen minutes", "quarter", "sixteen minutes", "seventeen minutes", "eighteen minutes", "nineteen minutes",
                        "twenty minutes", "twenty-one minutes", "twenty-two minutes","twenty-three minutes","twenty-four minutes","twenty-five minutes","twenty-six minutes","twenty-seven minutes","twenty-eight minutes", "twenty-nine minutes", "half"];
    hourString = hoursArray[hours-1];

    //Sets proper format for sentence structure
    if(minutes == 0){
        var resultString = `The time is ${hourString} o'clock`;
    }
    else if(minutes <= 30){
        minString = minuteArray[minutes-1];
        var resultString = `The time is ${minString} past ${hourString} `;
    }
    else{
        var inverseMinutes = 60 - minutes;
        minString = minuteArray[inverseMinutes-1];
        hourString = hoursArray[hours];
        var resultString = `The time is ${minString} to ${hourString}`;
    }

    return resultString;
}

function displayTime(timeInWords){
    //If the card hasn't been made yet add the card.
    if(!madeCard){
        $("form").after("<div class=timeCard><ul></ul></div>");
        madeCard = true;
    }
    $(".timeCard ul").append("<li>" + timeInWords + "</li>");
}

function clearCard(){
    $(".timeCard").remove();
    madeCard = false;
}