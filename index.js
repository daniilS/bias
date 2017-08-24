let poke = require('./lib/poketypes');
let neural = require('./lib/neural');
var math = require('./lib/math');

const testRatio = 0.2;
const outputs = [0, 0.25, 0.5, 1, 2, 4]
const numTypes = poke.types.length;

const binaryInputs = Math.ceil(Math.logBase(numTypes, 2));

let sets = {
	numerical: {training: [], test: []},
	oneHot: {training: [], test: []},
	binary: {training: [], test: []}
}

for (let attackingType in poke.types) {
	for (let defendingType1 in poke.types) {
		for (let defendingType2 in poke.types) {
			let effectiveness = poke.effectiveness(attackingType, defendingType1, defendingType2);
			let target = [];
			for (let output of outputs) {
				target.push(output == effectiveness ? 1 : 0);
			}
			
			let inputNumerical = [attackingType/numTypes, defendingType1/numTypes, defendingType2/numTypes];
			
			let inputOneHot = new Array(numTypes * 3);
			inputOneHot.fill(0);
			inputOneHot[attackingType] = 1; inputOneHot[defendingType1 + numTypes] = 1; inputOneHot[defendingType2 + numTypes] = 1;
			
			let inputBinary = new Array(binaryInputs * 3);
			let cell = 0;
			for (let value of [attackingType, defendingType1, defendingType2]){
				for (let bit = 0; bit < binaryInputs; bit++) {
					inputBinary[cell] = (value >> bit) & 1;
					cell++;
				}
			}
			
			let dataType = Math.random() < testRatio ? 'test' : 'training';		
			
			sets.numerical[dataType].push({input: inputNumerical, target: target});
			sets.oneHot[dataType].push({input: inputOneHot, target: target});
			sets.binary[dataType].push({input: inputBinary, target: target});
		}
	}
}

console.log('Created training and test data: ' + sets.numerical.training.length + ' training data and ' + set.numerical.test.length + ' test data.');
