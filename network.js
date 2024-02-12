class NeuralNetwork {
    constructor(neuronCounts) {
        this.levels = [];
        for (let i = 0; i < neuronCounts.length - 1; i++) {
            this.levels.push(new Level(
                neuronCounts[i], neuronCounts[i + 1]
            ));
        }
        // ^ because a neural network has the floor level and ceiling level of neurons
        // we iterate over neuronCounts Length as this is the length of the array as a number... don't iterate over the array itself.
    }

    static feedForward(givenInputs, network) {
        let outputs = Level.feedForward(
            givenInputs, network.levels[0]);
        // ^ the first level of the network is now producing its outputs
        
        for (let i = 1; i < network.levels.length; i++) {
            outputs = Level.feedForward(
                outputs, network.levels[i]);
        }
        // ^ the remaining levels take the output of the first / previous level and outputs keeps updating 
        // using the values of the level before it
        return outputs;
    }
}

class Level {
    constructor(inputCount, outputCount) {
        this.inputs = new Array(inputCount);
        this.outputs = new Array(outputCount);
        this.biases = new Array(outputCount);

        // inputs are the values we'll get from the car sensors (if we're the first level).

        this.weights = [];
        for (let i = 0; i < inputCount; i++) {
            this.weights[i] = new Array(outputCount);
        }

        Level.#randomize(this);
    }

    static #randomize(level) {
        for (let i = 0; i < level.inputs.length; i++) {
            for (let j = 0; j < level.outputs.length; j++) {
                level.weights[i][j] = Math.random() * 2 - 1;
            }
            // gives our neurons (input and output pairs) random bias between -1 and 1
            // why negative? because if there's two options to avoid a collision, you might only be able to use one
            // e.g. car in front of you; turn L or R...in right lane, only left turn is appropriate. set R to negative bias
        }

        for (let i = 0; i < level.biases.length; i++) {
            level.biases[i] = Math.random() * 2 - 1;
        }
    }

    // feed forward - combine the inputs and determine an output firing (below)

    static feedForward(givenInputs, level) {
        for (let i = 0; i < level.inputs.length; i++) {
            level.inputs[i] = givenInputs[i];
        }

        for (let i = 0; i < level.outputs.length; i++) {
            let sum = 0
            for (let j = 0; j < level.inputs.length; j++) {
                sum += level.inputs[j]*level.weights[j][i];
            }
            // above: for every i'th output, we scan every j'th input that potentially connects with it, multiplying the weight by the input
            // find the sum of all inputs to this output - negative and positive

            // below: after multiplying the input by weight, if it is greater than the bias, the neuron fires (output = 1)
            // if its less than the bias then it doesn't fire (output = 0)

            if (sum > level.biases[i]) {
                level.outputs[i] = 1;
            } else {
                level.outputs[i] = 0;
            }
        }

        return level.outputs;
    }
}