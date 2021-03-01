// inspired by https://exercism.io/tracks/javascript/exercises/etl/solutions/91f99a3cca9548cebe5975d7ebca6a85

const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};
const vowels=['A','E','I','O','U','Y'];
const scoringOptions=[oldScrabbleScorer,simpleScore,vowelBonusScore];
function oldScrabbleScorer(word) {
	word = word.toUpperCase();
	let letterPoints = "";
  let totalPoints=0;
 
	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in oldPointStructure) {
 
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`;
      totalPoints+=Number(pointValue);
		 }
	  }
	}
  letterPoints+=`---------------------\n${totalPoints}`
	return letterPoints;
 }

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

function initialPrompt() {
  let word=input.question("Let's play some scrabble! Enter a word: ");
  if (word==="")
    {
      word="nothing";
    }
  return word
};

function simpleScore(str){
  simpleScore=str.length;
  return simpleScore
}

function vowelBonusScore(str){
  vowelBonusScore=0;
  for(let i=0;i<str.length;i++)
    {
      if(vowels.includes(str[i].toUpperCase()))
        {
          vowelBonusScore+=3;
        }
      else
        {
          vowelBonusScore+=1;
        }
    }
  return vowelBonusScore
}

let scrabbleScore;
function newScrabbleScore(word)
  {
    word = word.toLowerCase();
    let letterPoints="";
    let totalPoints=0;
    for(i=0;i<word.length;i++)
      {
        if(newPointStructure[word[i]])
        {
        letterPoints += `Points for '${word[i]}': ${newPointStructure[word[i]]}\n`;
        totalPoints+=Number(newPointStructure[word[i]]);
        }else{
        letterPoints += `Points for '${word[i]}': ${0}\n`;
        }
      }
  letterPoints+=`---------------------\n${totalPoints}`
	return letterPoints;
  }

const scoringAlgorithms = [{name:"Simple Score",description:"Each letter is worth 1 point.",scoreFunction:simpleScore},{name:"Bonus Vowels",description:"Vowels are 3 pts, consonants are 1 pt.",scoreFunction:vowelBonusScore},{name:"Scrabble",description:"The traditional scoring algorithm.",scoreFunction:newScrabbleScore}];

function scorerPrompt(word) {
let scoreChoice=Number(input.question('\nWhich scoring algorithm would you like to use?\n\n0 - Simple: One point per character\n1 - Vowel Bonus: Vowels are worth 3 points\n2 - Scrabble: Uses scrabble point system\n(0 is choosen by default)\n--------------------------\n'));
while(scoreChoice<0||scoreChoice>=3||String(scoreChoice)==="NaN")
  {scoreChoice=Number(input.question('\nWhich scoring algorithm would you like to use?\n\n0 - Simple: One point per character\n1 - Vowel Bonus: Vowels are worth 3 points\n2 - Scrabble: Uses scrabble point system\n-----------------------\n'));
  }
if(scoreChoice===0){
  console.log(scoringAlgorithms[0]["scoreFunction"](word),"- points for",word);
}else if(scoreChoice===1){
  console.log(scoringAlgorithms[1]["scoreFunction"](word),"- points for",word);
}else if(scoreChoice===2){
  console.log(scoringAlgorithms[2]["scoreFunction"](word),"- points for",word);
}
}

let newPointStructure=transform(oldPointStructure);
function transform(obj) {
  let tempNewPointStructure={};
  for(item in obj)
    {
      for(let i=0;i<obj[String(item)].length;i++)
        {
          tempNewPointStructure[obj[String(item)][i].toLowerCase()]=item;
        }
    }
  for(let i=0;i<10;i++)
    {
      tempNewPointStructure[i]=0;
    }
  tempNewPointStructure[" "]=0;
  return tempNewPointStructure
}

function runProgram() {
  scorerPrompt(initialPrompt());
}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScore: simpleScore,
   vowelBonusScore: vowelBonusScore,
   scrabbleScore: scrabbleScore,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};

