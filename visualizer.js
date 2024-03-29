class Visualizer {
    static drawNetwork (ctx, network) {
        const margin = 50;
        const left = margin;
        const top = margin;
        const width = ctx.canvas.width - margin * 2;
        const height = ctx.canvas.height - margin * 2;

        const levelHeight = height / network.levels.length;
        
        // below: to see the biases in mid layer we needed to draw the network top down not bottom up, so the loop is different

        for (let i = network.levels.length - 1; i >= 0; i--) {
            const levelTop = top + 
                lerp(
                    height - levelHeight,
                    0,
                    network.levels.length == 1 
                    ? 0.5 
                    : i / (network.levels.length - 1)
                );
            
            ctx.setLineDash([7,3]);
            
            Visualizer.drawLevel(ctx, network.levels[i],
                left, levelTop,
                width, levelHeight,
                i == network.levels.length - 1
                    ? ['↑','←','→','↓']
                    : []
                );
        }
    }

    static drawLevel (ctx, level, left, top, width, height, outputLabels) {
        const right = left + width;
        const bottom = top + height;

        // here we're just drawing a level,canvas extends from top left (0,0) to bottom right (x, y)

        const {inputs, outputs, weights, biases} = level;
        // ^ this is a destructuring assignment. Syntactic sugar - level is an object and I can extract all of these properties of the level
        // e.g. i don't need to write level.biases - just biases from here on. Cleaner and more readable code

        for (let i = 0; i < inputs.length; i++) {
            for (let j = 0; j < outputs.length; j++) {
                ctx.beginPath();
                ctx.moveTo(
                    Visualizer.#getNodeX(inputs, i, left, right),
                    bottom
                );
                ctx.lineTo(
                    Visualizer.#getNodeX(outputs, j, left, right),
                    top
                );
                ctx.lineWidth = 2;                
                ctx.strokeStyle = getRGBA(weights[i][j]);
                ctx.stroke();
                // ^ the above creates either blue or yellow links between input/output. Brighter (less transparent) for stronger link and blue for negative, yellow for positive.
            }
        }

        /* ^ ABOVE: we are looping through all 5 sensor inputs and all six output nodes and drawing a line between each.
        drawing the lines first - the white nodes sit on top of them which looks cleaner.
        */

        const nodeRadius = 18;
        for (let i = 0; i < inputs.length; i++) {
            const x = Visualizer.#getNodeX(inputs, i, left, right);

            ctx.beginPath();
            ctx.arc(x, bottom, nodeRadius, 0, Math.PI * 2);
            ctx.fillStyle="black";
            ctx.fill();
            ctx.beginPath();
            ctx.arc(x, bottom, nodeRadius * 0.7, 0, Math.PI * 2);
            ctx.fillStyle=getRGBA(inputs[i]);
            ctx.fill();
            // ^ this has created 5 dots for each of the five sensors on the car
            
        }

        for (let i = 0; i < outputs.length; i++) {
            const x = Visualizer.#getNodeX(outputs, i, left, right);
            ctx.beginPath();
            ctx.arc(x, top, nodeRadius, 0, Math.PI * 2);
            ctx.fillStyle = "black";
            ctx.fill();
            ctx.beginPath();
            ctx.arc(x, top, nodeRadius * 0.7, 0, Math.PI * 2);
            ctx.fillStyle = getRGBA(outputs[i]);
            ctx.fill();    

            // ^ for both input and output nodes we drew in black at full size before drawing in white
            // 
            
            ctx.beginPath();
            ctx.lineWidth = 2;
            ctx.arc(x, top, nodeRadius * 0.8, 0, Math.PI * 2);
            ctx.strokeStyle = getRGBA(biases[i]);
            ctx.setLineDash([3,3]);
            ctx.stroke();
            ctx.setLineDash([]);

            if (outputLabels[i]) {
                ctx.beginPath();
                ctx.textAlign = "center";
                ctx.textBaseline = "middle";
                ctx.fillStyle = "black";
                ctx.strokeStyle = "white";
                ctx.font = (nodeRadius * 1.5) + "px Arial";
                ctx.fillText(outputLabels[i], x, top);
                ctx.lineWidth = 0.5;
                ctx.strokeText(outputLabels[i], x, top);
            }
        }

    }

    static #getNodeX (nodes, index, left, right) {
        return lerp(
            left,
            right,
            nodes.length == 1 
                ? 0.5 
                : index / (nodes.length - 1)
        );
        // ^ just incase there was an odd number for inputs

    }
}