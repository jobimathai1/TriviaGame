// initialize the .js document with this. It contains all of the code for the .js file:
$(document).ready(function () {

	// this game object holds all of the questions, answers, and then the index of the correct answer for each
	var game = {
		questions: [
			{
				question: 'What is the largest Mammal?',
				possibles: ['Elephant', 'Blue Whale', 'Bats', 'Armadillos', 'White Shark'],
				id: 'question-one',
				answer: 1
			}, {
				question: 'What is the capital of California?',
				possibles: ['Sacramento', 'Los Angeles', 'Santa Barbara', 'San Jose', 'San Diego'],
				id: 'question-two',
				answer: 0
			}, {
				question: 'Who is the lead singer for the Rolling Stones?',
				possibles: ['Tom Morello', 'Paul Simon', 'Sting', 'Stevie Nicks', 'Mick Jagger'],
				id: 'question-three',
				answer: 4
			}, {
				question: 'Who discovered the Americas?',
				possibles: ['Kayne West', 'Manuel Cortez', 'Christopher Columbus', 'George Lopez', 'Gabriel Iglesias'],
				id: 'question-four',
				answer: 2
			}, {
				question: 'Which one is an ingredient in a Tom Collins?',
				possibles: ['Coke', 'Tom Hanks', 'Cherries', 'Gin', 'Almond Milk'],
				id: 'question-five',
				answer: 3
			}
		]
	}


	// Number of seconds to start the game.
	var number = 16;
	$('#timeLeft').on('click', run);

	// This function enables the number of seconds to decrease with time, and to display
	// the result of that decrease until time is up. 
	function decrement() {
		// Decrease number by one.
		number--;
		// Show the number in the #timeLeft div.
		$('#timeLeft').html('<h2>' + number + " seconds" + '</h2>');
		// When the number is equal to zero, 
		if (number === 0) {
			// run the stop function.
			stop();
			checkAnswers();
		}
	}

	// the run function sets the spacing of the decrement function's time interval so that
	// it can be equal to a second per number decrement.
	function run() {
		counter = setInterval(decrement, 1000);
	}

	// The stop function
	function stop() {
		// Clears our "counter" interval.
		clearInterval(counter);
	}

	// Execute the run function.
	run();

	// this function dynamically creates the inputs needed for the form and relates them to the
	// items held within the game object 
	function formTemplate(data) {
		// the first variable relates the form field for question with the data in the object for
		// each question so that the questions can be inputed into that form field
		var qString = "<form id='questionOne'>" + data.question + "<br>";
		// this variable to access the question object's possibles array needed to answer each question
		var possibles = data.possibles;
		// a for loop to go through the possibles array for each question to add the values of each possibles
		// array and using qString, add them as radio buttons to the question to which they are
		// associated
		for (var i = 0; i < possibles.length; i++) {
			var possible = possibles[i];
			console.log(possible);
			qString = qString + "<input type='radio' name='" + data.id + "' value=" + i + ">" + possible;

		}
		return qString + "</form>";
	}
	window.formTemplate = formTemplate;

	// this function takes the template created in the last function and by appending it,
	// allows it to be displayed on the page
	function buildQuestions() {
		var questionHTML = ''
		for (var i = 0; i < game.questions.length; i++) {
			questionHTML = questionHTML + formTemplate(game.questions[i]);
		}
		$('#questions-container').append(questionHTML);

	}

	// function that 
	function isCorrect(question) {
		var answers = $('[name=' + question.id + ']');
		var correct = answers.eq(question.answer);
		var isChecked = correct.is(':checked');
		return isChecked;
	}

	// call the buildQuestions function
	buildQuestions();

	// function to build the display of guesser results
	function resultsTemplate(question) {
		var htmlBlock = '<div>'
		htmlBlock = htmlBlock + question.question + ': ' + isChecked;
		return htmlBlock + "</div>";
	}

	// function to tabulate the guesser results
	function checkAnswers() {

		// variables needed to hold results
		var resultsHTML = '';
		var guessedAnswers = [];
		var correct = 0;
		var incorrect = 0;
		var unAnswered = 0

		// for loop iterates through each question and passes the questions at each index first into
		// the isCorrect function to see if they match the indices of correct answers, and if they do,
		// increments up the correct score
		for (var i = 0; i < game.questions.length; i++) {
			if (isCorrect(game.questions[i])) {
				correct++;
			} else {
				// then this statement runs the questions at each index through the checkAnswered function
				// to determine whether the user clicked an answer, or did not click an answer, so that
				// incorrect and unAnswered scores can be delineated from each other
				if (checkAnswered(game.questions[i])) {
					incorrect++;
				} else {
					unAnswered++;
				}
			}

		}
		// display the results of the function in the results div and use strings of text to relate the
		// results of the for loop with their corresponding values
		$('.results').html('Correct: ' + correct + "<br>" + 'Incorrect: ' + incorrect + "<br>" + 'Unanswered: ' + unAnswered);
	}

	// this function checks whether the guesser actually checked an answer for each of the 
	// questions
	function checkAnswered(question) {
		var anyAnswered = false;
		var answers = $('[name=' + question.id + ']');
		// the for loop creates a condition to check if the buttons were checked and and then sets
		// the anyAnswered variable to true if they were
		for (var i = 0; i < answers.length; i++) {
			if (answers[i].checked) {
				anyAnswered = true;
			}
		}
		// then return the anyAnswered variable so it can be tabulated in the last function to distinguish
		// between incorrect answers and those answers that were not attempted
		return anyAnswered;

	}
});