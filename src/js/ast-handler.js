import {findStringRepresentation} from './strings';

var getValuesFunctions = {'Identifier': valsIdentifier,
    'VariableDeclaration': valsVariableDeclaration,
    'VariableDeclarator': valsVariableDeclarator,
    'ExpressionStatement': valsExpressionStatement,
    'ReturnStatement': valsReturnStatement,
    'FunctionDeclaration': valsFunctionDeclaration,
    'BlockStatement': valsBlockStatement,
    'AssignmentExpression': valsAssignmentExpression,
    'Literal': valsLiteral,
    'BinaryExpression': valsBinaryExpression,
    'WhileStatement': valsWhileStatement,
    'IfStatement': valsIfStatement,
    'ForStatement': valsForStatement,
    'MemberExpression': valsMemberExpression,
    'UnaryExpression': valsUnaryExpression,
    'UpdateExpression': valsUpdateExpression,
    'LogicalExpression': valsLogicalExpression,
    'CallExpression': valsCallExpression,
    'ThisExpression': valsThisExpression,
    'ArrayExpression': valsArrayExpression,
    'SequenceExpression': valsSequenceExpression,
    'ArrowFunctionExpression': valsArrowFunctionExpression,
    'NewExpression': valsNewExpression,
    'ConditionalExpression': valsConditionalExpression
};


var expressions = [];


function getExpressions(){
    return expressions;
}

function restartExpressions() {
    expressions = [];
}


function createExpressionObject(values){
    var expression = {
        line: values[0],
        type: values[1],
        name: values[2],
        condition: values[3],
        value: values[4],
        endLine: values[5],
        valueObj: values[6]

    };
    expressions.push(expression);
}



function valsIdentifier(expr, values){
    values[2] = expr.name;
    createExpressionObject(values);

}

function valsVariableDeclaration(expr, values){// eslint-disable-line no-unused-vars
    var declarations = expr.declarations;
    declarations.forEach(getValues);
}

function valsVariableDeclarator(expr, values){
    values[1] = 'VariableDeclaration';
    values[2] = expr.id.name;
    values[4] = findStringRepresentation(expr.init);
    values[6] = expr.init;
    createExpressionObject(values);

}


function valsExpressionStatement(expr, values){// eslint-disable-line no-unused-vars
    var ex = expr.expression;
    getValues(ex);
}

function valsReturnStatement(expr, values){
    values[1] = 'ReturnStatement';
    values[4] = findStringRepresentation(expr);
    values[6] = expr;
    createExpressionObject(values);

}

function valsFunctionDeclaration(expr, values){
    values[1] = 'FunctionDeclaration';
    values[2] = expr.id.name;
    values[6] = expr;
    createExpressionObject(values);


    var params = expr.params;
    getValues(params);
    var body = expr.body;
    getValues(body);
}
function valsBlockStatement(expr, values){// eslint-disable-line no-unused-vars
    var body = expr.body;
    getValues(body);
}
function valsAssignmentExpression(expr, values){
    values[1] = 'AssignmentExpression';
    values[2] = findStringRepresentation(expr.left);
    values[4] = findStringRepresentation(expr.right);
    values[6] = expr.right;
    createExpressionObject(values);

}
function valsLiteral(expr, values){
    values[4] = expr.value;
    values[6] = expr;
    createExpressionObject(values);

}
function valsBinaryExpression(expr, values){
    values[1] = 'BinaryExpression';
    values[4] = findStringRepresentation(expr);
    values[6] = expr;
    createExpressionObject(values);

}
function valsWhileStatement(expr, values){
    values[1] = 'WhileStatement';
    values[3] = findStringRepresentation(expr);
    createExpressionObject(values);

    getValues(expr.body);
}

function handleAlternate(alt){
    if (alt.type === 'IfStatement') {
        var elseIfValues = ['', 'else if statement', '', '', '','',alt.test];
        valsIfAlternate(alt, elseIfValues);
    }
    else {
        var elseValues = [alt.loc.start.line, 'else statement', '', '', ''];
        createExpressionObject(elseValues);
        getValues(alt);
    }
}


function valsIfStatement(expr, values){
    values[1] = 'IfStatement';
    values[3] = findStringRepresentation(expr);
    values[6] = expr.test;
    createExpressionObject(values);

    getValues(expr.consequent);
    if(expr.alternate != null) {
        handleAlternate(expr.alternate);
    }
}

function valsIfAlternate(expr, values){
    values[0] = expr.loc.start.line;
    values[3] = findStringRepresentation(expr);
    createExpressionObject(values);
    getValues(expr.consequent);
    if(expr.alternate != null) {
        handleAlternate(expr.alternate);
    }
}

function valsMemberExpression(expr, values){
    values[1] = 'MemberExpression';
    values[2] = findStringRepresentation(expr);
    createExpressionObject(values);

}
function valsUnaryExpression(expr, values){
    values[1] = 'UnaryExpression';
    values[4] = findStringRepresentation(expr);
    values[6] = expr;
    createExpressionObject(values);

}

function valsForStatement(expr, values){
    values[1] = 'ForStatement';
    values[3] = findStringRepresentation(expr);
    createExpressionObject(values);

    getValues(expr.body);

}

function valsUpdateExpression(expr, values){
    values[1] = 'UpdateExpression';
    values[4] = findStringRepresentation(expr);
    values[6] = expr;
    createExpressionObject(values);

}

function valsLogicalExpression(expr, values){
    values[1] = 'LogicalExpression';
    values[4] = findStringRepresentation(expr);
    values[6] = expr;
    createExpressionObject(values);

}

function valsCallExpression(exprs, values){
    values[1] = 'CallExpression';
    values[4] = findStringRepresentation(exprs);
    values[6] = exprs;
    createExpressionObject(values);

}

function valsThisExpression(exprs, values){
    values[1] = 'ThisExpression';
    values[2] = findStringRepresentation(exprs);
    createExpressionObject(values);

}

function valsArrayExpression(exprs, values){
    values[1] = 'ArrayExpression';
    values[4] = findStringRepresentation(exprs);
    values[6] = exprs;
    createExpressionObject(values);

}

function valsSequenceExpression(exprs, values){
    values[1] = 'SequenceExpression';
    values[4] = findStringRepresentation(exprs);
    values[6] = exprs;
    createExpressionObject(values);

}

function valsArrowFunctionExpression(exprs, values){
    values[1] = 'ArrowFunctionExpression';
    values[4] = findStringRepresentation(exprs);
    values[6] = exprs;
    createExpressionObject(values);

}

function valsNewExpression(exprs, values){
    values[1] = 'NewExpression';
    values[4] = findStringRepresentation(exprs);
    values[6] = exprs;
    createExpressionObject(values);

}

function valsConditionalExpression(exprs, values){
    values[1] = 'ConditionalExpression';
    values[3] = findStringRepresentation(exprs);
    createExpressionObject(values);

}
function getValues(expr){
    if (expr.constructor === Array){
        expr.forEach(getValues);
    }
    else {
        var values = ['', '', '', '', '', '', ''];
        values[0] = expr.loc.start.line;
        var type = expr.type;
        values[1] = type;
        values[5] =  expr.loc.end.line;
        getValuesFunctions[type](expr, values);
    }
}
export {getValues};
export {getExpressions};
export {createExpressionObject};
export {restartExpressions};