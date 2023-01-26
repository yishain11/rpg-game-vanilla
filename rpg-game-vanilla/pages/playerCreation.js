const createBtn = document.getElementsByTagName('button')[0];
const form = document.getElementsByTagName('form')[0];

function getPlayerValues() {
    const inputs = document.getElementsByTagName('input');
    for (const input in inputs) {
        if (Object.hasOwnProperty.call(inputs, input)) {
            const inp = inputs[input];
            if (inp.type === "number" && inp.value > 10) {
                inp.value = 10;
            }
            console.log(inp.name, inp.value);
        }
    }
}


createBtn.addEventListener('click', () => {
    console.log('create!');
    getPlayerValues(form);
});