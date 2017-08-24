let poke = require('./lib/poketypes');
let neural = require('./lib/neural');

const testRatio = 0.2;

let possibilities = Math.pow(poke.types.length, 3);

let trainingSet = [], testSet = [];

for (let attackingType of poke.types) {
	for (let defendingType1 of poke.types) {
		for (let defendingType2 of poke.types) {
			let input = [attackingType, defendingType1, defendingType2];
			let target = poke.effectiveness(attackingType, defendingType1, defendingType2);
			let data = [input, target];
			
			if (Math.random() > testRatio) {
				trainingSet.push(data);
			} else {
				testSet.push(data);
			}
		}
	}
}

console.log('Created training and test data: ' + trainingSet.length + ' training data and ' + testSet.length + ' test data.');
