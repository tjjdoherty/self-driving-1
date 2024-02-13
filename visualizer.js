class Visualizer {
    static drawNetwork (ctx, network) {
        const margin = 50;
        const left = margin;
        const top = margin;
        const width = ctx.canvas.width - margin * 2;
        const height = ctx.canvas.height - margin * 2;

        Visualizer.drawLevel(ctx, network.levels[0],
            left, top,
            width, height
        );
    }

    static drawLevel (ctx, level, left, top, width, height) {
        const right = left + width;
        const bottom = top + height;

        // here we're just drawing a level,canvas extends from top left (0,0) to bottom right (x, y)

        const {inputs, outputs, weights} = level;
        // ^ this helps shorten code as it will put "level." before the consts that are destructured
        // so level.inputs and level.outputs can both just be written inputs/outputs

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
                const value = weights[i][j];
                const alpha = Math.abs(value);
                const R = value < 0 ? 0 : 255;
                const G = R;
                const B = value > 0 ? 0 : 255;
                ctx.strokeStyle = "rgba("+R+", "+G+", "+B+","+alpha+")";
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
            ctx.fillStyle="white";
            ctx.fill();
            // ^ this has created 5 dots for each of the five sensors on the car
            
        }

        for (let i = 0; i < outputs.length; i++) {
            const x = Visualizer.#getNodeX(outputs, i, left, right);
            ctx.beginPath();
            ctx.arc(x, top, nodeRadius, 0, Math.PI * 2);
            ctx.fillStyle = "white";
            ctx.fill();            
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