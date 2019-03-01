import React from 'react';

const ReturnInstructions = () => { 
    return(
        <pre>
        Specifiy what should be returned from the {"\n"}
        function. It is only applicable to fuctions triggered {"\n"}
        by an HTTP request. You can specify variables or {"\n"}
        expression. {"\n"}
        {"\n"}
        Example: {"\n"}
        {"\n"}
        stock - 10
        </pre>
    );
}

export default ReturnInstructions;