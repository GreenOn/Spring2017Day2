/*Week 2 Homework
===============

Create a todo list app using node and the __prompt__ library.
Make sure you set the project up as a new node/git/github project.
After doing your initial npm init you can install the prompt library via __npm install prompt --save__

You should be able to do the following "script" in your todo list:

    1. run node todo.js
    2. select 1 of 3 options from a printed list:  Print ToDo, Add ToDo, Complete Todo
    3. When selecting Print ToDo, a ordered list of added todo options should be displayed... and then the menu options should be printed again
    4. When selecting Add ToDo you should be instructed to type a todo item and hit enter to add it. After following instructions the menu option should be printed again.
    5. When selecting Complete todo, instructions on selecting todo item to be removed should be presented.  After following instructions the menu option should be printed again.*/
      //
  // Start the prompt
  //
     var prompt = require('prompt');

    prompt.start();

    var toDoList = [];

    function printToDo(ask){

        if(toDoList.length == 0)
            console.log("To do list is empty.");
        else{
            console.log(" === Task List ===");
            console.log(" Task# - Title");
            console.log(" =================");
        }
        for (var i = 0; i < toDoList.length; i++) {
            console.log( "   " + (i+1) + ' -   ' + toDoList[i]);
        }
        if(ask === true)
        {
            promptToContinue();
        }

    }
    function addToDo(){
        // ask for which task to complete.
        var taskPrompt = {
          description: 'Enter the task you want to add:',
          name: 'todoItemNumber',
          message: 'Enter the task you want to add:',
          required: true
        };
        prompt.get(taskPrompt, function(err,result){

            toDoList.push(result.todoItemNumber);
            printToDo(false);
            promptToContinue();
        });

    }
    function completeToDo(){
        // ask for which task to complete.
        var regexPattern = new RegExp("^([1-"+ toDoList.length + "])$");
        var taskPrompt = {
          description: 'Enter the task number you want to complete:',
          name: 'todoItemNumber',
          pattern: regexPattern,
          message: 'Enter the task number you want to complete:',
          required: true
        };

        printToDo(false);

        prompt.get(taskPrompt, function(err,result){
            if ( result.todoItemNumber > -1 ){
                console.log("To Do task - "+ toDoList[result.todoItemNumber-1] + " completed.");
                toDoList.splice(result.todoItemNumber-1,1);
                console.log("Remaining tasks: ");
                printToDo(false);
                promptToContinue();
            }
        });

    }
    var optionPrompt = {
      description: 'Enter 1 - Print ToDo, 2 - Add ToDo, 3 - Complete Todo',
      name: 'option',
      pattern: /^([1-3])$/,
      message: 'Enter 1 - Print ToDo, 2 - Add ToDo, 3 - Complete Todo',
      required: true
    };

    var yesnoPrompt = {
      name: 'yesno',
      message: 'Do you want to cotinue?',
      validator: /y[es]*|n[o]?/,
      warning: 'Must respond yes or no',
      default: 'no'
    };
//Get  option number 1, 2, or 3
    var yesNo = "y";
    var optionFunc = function(err, result){

            console.log(result);
            switch (result.option) {

            case '1':
                printToDo(true);
                break;
            case '2':
                addToDo();
                break;
            case '3':
                completeToDo();
                break;
            }
            if (yesNo.includes("y",0))
            {
                //promptForOptions();
            }
    };
    var yesNoFunc = function(err, result)
    {
        yesNo = result.yesno

        if ( result.yesno.includes("y",0))
            promptForOptions();
        else
            return;
    }
    var promptForOptions = function(){
        prompt.get(optionPrompt, optionFunc);
    }
    var promptToContinue = function(){
        prompt.get(yesnoPrompt, yesNoFunc);
    }

    promptForOptions();

// function wrap(callback){
//     callback();
// }

// while(yesNo.includes("y",0)){

//     wrap(function (){
//         prompt.get(optionPrompt, optionFunc);
//     });
//     wrap(function (){
//         prompt.get(yesnoPrompt,yesNoFunc);
//     });
//     if (yesNo.includes("n",0)) break;

// }
