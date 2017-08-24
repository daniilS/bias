var math = require('./math');
var _ = require('lodash');

function Neuron(numInputs) {
	this.weights = new Array(numInputs);
	this.bias = math.rand();

	for (var i = 0; i < this.weights.length; i++) {
		this.weights[i] = math.rand();
	}
}

Neuron.prototype.process = function(inputs) {
	this.lastInputs = inputs;

	var sum = 0;
	for (var i = 0; i < inputs.length; i++) {
		sum += inputs[i] * this.weights[i];
	}
	sum += this.bias;

	return this.lastOutput = math.sigmoid(sum);
}


function Layer(numNeurons, numInputs) {
	this.neurons = new Array(numNeurons);

	for (var i = 0; i < this.neurons.length; i++) {
		this.neurons[i] = new Neuron(numInputs);
	}
}

Layer.prototype.process = function(inputs) {
	return this.neurons.map(function(neuron) {
		return neuron.process(inputs);
	});
}


function Network() {
	this.layers = [];
}
exports.Network = Network;

Network.prototype.forward = function(inputs) {
	var outputs;
	this.layers.forEach(function(layer) {
		outputs = layer.process(inputs);
		inputs = outputs;
	});
	return outputs;
}

Network.prototype.backward = function(outputs, targets) {
	for (var i = 0; i < this.outputLayer.neurons.length; i++) {
		var neuron = this.outputLayer.neurons[i];

		neuron.error = targets[i] - outputs[i];

		// Keep track of the error of each examples to determine when to stop training.
		neuron.errors = neuron.errors || [];
		neuron.errors[e] = neuron.error;

		neuron.delta = neuron.lastOutput * (1 - neuron.lastOutput) * neuron.error;
	}

	for (var l = this.layers.length - 2; l >= 0; l--) {
		for (var j = 0; j < this.layers[l].neurons.length; j++) {
			var neuronJ = this.layers[l].neurons[j];

			neuronJ.error = math.sum(this.layers[l + 1].neurons.
															 map(function(n) { return n.weights[j] * n.delta }));
			neuronJ.delta = neuronJ.lastOutput * (1 - neuronJ.lastOutput) * neuronJ.error;

			for (var i = 0; i < this.layers[l + 1].neurons.length; i++) {
				var neuronI = this.layers[l + 1].neurons[i];

				for (var w = 0; w < neuronI.weights.length; w++) {
					neuronI.weights[w] += this.learningRate * neuronI.lastInputs[w] * neuronI.delta;
				}
				neuronI.bias += this.learningRate * neuronI.delta;
			}
		}
	}
}

Network.prototype.addLayer = function(numNeurons, numInputs) {
	if (numInputs == null) {
		var previousLayer = this.layers[this.layers.length - 1];
		numInputs = previousLayer.neurons.length;
	}

	var layer = new Layer(numNeurons, numInputs);
	this.layers.push(layer);
	this.outputLayer = this.layers[this.layers.length - 1];
}

// Stop training when mean squared error of all output neurons reach this threshold
Network.prototype.errorThreshold = 0.00001;

// Number of iterations on each training
Network.prototype.trainingIterations = 500000;

// Rate at which the network learns in each iteration
Network.prototype.learningRate = 0.3;

Network.prototype.outputLayer = null;

Network.prototype.train = function(examples) {
	for (var it = 0; it < this.trainingIterations; it++) {
		examples = _.shuffle(examples);		
		
		for (var e = 0; e < examples.length; e++) {
			var inputs = examples[e][0];
			var targets = examples[e][1];

			var outputs = this.forward(inputs);
			this.backward(outputs, targets);
		}

		// Compute the mean squared error for all examples.
		var error = math.mse(this.outputLayer.neurons.reduce(function(errors, n) { return errors.concat(n.errors) }, []));

		if (it % 10000 === 0) {
			console.log({ iteration: it, mse: error });
		}

		if (error <= this.errorThreshold) {
			return;
		}
	}
}

Network.prototype.test = function(testSet) {
	var correct = 0;
	
	testSet = _.shuffle(testSet);
	
	for (var e = 0; e < testSet.length; e++) {
		var inputs = testSet[e][0];
		var targets = testSet[e][1];
		
		var outputs = this.forward(inputs);
		
		var maxTarget = targets.indexOf(_.max(targets));
		var maxOutput = outputs.indexOf(_.max(outputs));
		if (maxTarget == maxOutput) correct++;
	}
	
	return correct / testSet.length;
}

Network.prototype.benchmark = function(trainingSet, testSet) {
	for (var it = 0; it < this.trainingIterations; it++) {
		trainingSet = _.shuffle(trainingSet);		
		
		for (var e = 0; e < trainingSet.length; e++) {
			var inputs = trainingSet[e][0];
			var targets = trainingSet[e][1];

			var outputs = this.forward(inputs);
			this.backward(outputs, targets);
		}

		// Compute the mean squared error for all examples.
		var error = math.mse(this.outputLayer.neurons.reduce(function(errors, n) { return errors.concat(n.errors) }, []));

		if (it % 1000 === 0) {
			var correct = this.test(testSet);
			console.log({ iteration: it, mse: error , correct: correct, percentage: (correct * 100).toFixed(2) + '%'});
		}
	}
}

