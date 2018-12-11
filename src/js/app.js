import $ from 'jquery';
import {parseCode} from './code-analyzer';
import {getValues, getExpressions, restartExpressions} from './ast-handler';
import * as bl from './substitute';
import * as escodegen from 'escodegen';


$(document).ready(function () {
    $('#codeSubmissionButton').click(() => {
        bl.restart();
        restartExpressions();
        let codeToParse = $('#codePlaceholder').val();
        let parsedCode = parseCode(codeToParse);
        var body = parsedCode.body;
        console.log('origin code:');
        console.log(body);
        body.forEach(getValues);
        var expressions = getExpressions();
        console.log('expressions');
        console.log(expressions);

        let inputParams = $('#inputPlaceholder').val();
        var params = bl.createParamVector(inputParams);

        bl.substitute(expressions, params);
        var result = bl.getResFunc();
        console.log(result);

        $('#resultText').text(escodegen.generate(result));

    });
});