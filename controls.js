class Controls {
    constructor() {
        this.forward=false;
        this.left=false;
        this.right=false;
        this.reverse=false;

        this.#addKeyboardListeners();
    }

    // you need to use arrow notation if you're using "this"
    // otherwise this will refer to the function, not the constructor;
    // also more convenient writing = () => than function() {}

    #addKeyboardListeners() {
        document.onkeydown = (event) => {
            switch(event.key) {
                case "ArrowLeft":
                    this.left = true;
                    break;
                case "ArrowUp":
                    this.forward = true;
                    break;
                case "ArrowDown":
                    this.reverse = true;
                    break;
                case "ArrowRight":
                    this.right = true;
                    break;
            }
            console.table(this);
        }
        document.onkeyup = (event) => {
            switch(event.key) {
                case "ArrowLeft":
                    this.left = false;
                    break;
                case "ArrowUp":
                    this.forward = false;
                    break;
                case "ArrowDown":
                    this.reverse = false;
                    break;
                case "ArrowRight":
                    this.right = false;
                    break;
            }
            console.table(this);
        }
    }
}