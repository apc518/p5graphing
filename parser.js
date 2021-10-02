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

const singleCharSymbols = ['+', '-', '/', '*', '^', '(', ')']
const longSymbols = ['log', 'exp', 'sin', 'cos', 'tan', 'asin', 'acos', 'atan']
const digits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.']
const variable = 'x';

function parse(s){
    // takes an arithmetic expression s and returns the function defined.
    // the accepted alphabet is fairly limited:
    // parentheses, integers, decimals, and the following symbols:
    // +, -, /, *, ^, log, sin, cos, tan, asin, acos, atan, and exp



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
            // parse the number
            let substr = s.substring(i, i+numLength);
            // console.log(`substring: ${substr}`);
            if(substr.includes(".")){
                num = parseFloat(substr);
            }
            else{
                num = parseInt(substr);
            }
            tokens.push(num);
            i += numLength - 1;
        }
        longSymbols.forEach((t) => {
            if(s.indexOf(t) == i) {
                tokens.push(t);
                i += t.length - 1;
            }
        });
    }

    // console.log(tokens);

    // check for anything that isnt a single character symbol
    // that comes immediately after a variable
    for(let i = 0; i < tokens.length; i++){
        if(tokens[i] === variable){
            if(tokens.length <= i+1) break; // last token is the variable
            let c = tokens[i+1];
            if(singleCharSymbols.indexOf(c) < 0) return null;
        }
    }


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

    try{
        return eval(`(x => ${tokens.join('')})`)
    }
    catch(e){
        return null;
    }
}