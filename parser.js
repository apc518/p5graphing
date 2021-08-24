class Node{
    constructor(data = null){
        this.item = data;
        this.left = null;
        this.right = null;
    }
}

class BinaryTree{
    constructor(){
        this.root = new Node();
    }
}

function parse(s){
    // takes an arithmetic expression s and returns the function defined.
    // the accepted alphabet is fairly limited:
    // parentheses, integers, decimals, and the following symbols:
    // +, -, /, *, ^, log, sin, cos, tan, asin, acos, atan, and exp

    const singleCharSymbols = ['+', '-', '/', '*', '^', '(', ')']
    const longSymbols = ['log', 'exp', 'sin', 'cos', 'tan', 'asin', 'acos', 'atan']
    const digits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
    const variable = 'x';


    // tokenize
    let tokens = [];
    
    for(let i = 0; i < s.length; i++){  
        if(s[i] === variable){
            tokens.push(s[i]);
        }
        if(singleCharSymbols.indexOf(s[i]) >= 0){
            tokens.push(s[i]);
        }
        if(digits.indexOf(s[i]) >= 0){
            let numLength = 0;
            for(let k = i; k < s.length; k++){
                if(digits.indexOf(s[k]) >= 0){
                    numLength++;
                }
                else{
                    break;
                }
            }
            let num = 0;
            for(let k = 0; k < numLength; k++){
                num += parseInt(s[i+k]) * Math.pow(10, numLength - k - 1);
            }
            tokens.push(num);
            i += numLength - 1;
        }
        longSymbols.forEach((t) => {
            if(s.indexOf(t) == i) tokens.push(t);
        });
    }

    console.log(tokens);

    for (let i = 0; i < tokens.length; i++) {
        const element = tokens[i];
        if(longSymbols.indexOf(element) >= 0){
            tokens[i] = `Math.${element}`;
        }
    }

    for(let i = 0; i < tokens.length; i++){
        const element = tokens[i];
        if(element == "^"){
            tokens[i-1] = `Math.pow(${tokens[i-1]}`;
            tokens[i] = ","
            tokens[i+1] = `${tokens[i+1]})`
        }
    }

    console.log(tokens.join(''));

    return eval(`((x) => {${tokens.join('')}})`)


    // 
    // TWO-STACKS ALOGORITHM
    //
    // // create number and operator stacks
    // let numStack = [];
    // let opStack = [];

    // tokens.forEach((t) => {
    //     if(typeof(t) == "number"){
    //         numStack.push(t)
    //     }
    //     else{
    //         opStack.push(t);
    //     }
    // });

    // console.log(numStack);
    // console.log(opStack);

    // // create eval tree
    // let evalTree = new BinaryTree();

    // // recursively evaluate with that one algorithm that I forgot half of
    // function evaluate(onNumStack){
    //     let item;
    //     if(onNumStack){
    //         item = numStack.pop();
    //     }
    //     else{
    //         item = opStack.pop();
    //     }
    // }

    // evaluate(true);
}