import React from 'react';

const ConditionInstructions = () => { 
    return(
        <pre>
        Specifiy the conditon that if met {"\n"}
        following actions before 'else' or {"\n"}
        'end' will run. {"\n"}
        {"\n"}
        Example: {"\n"}
        {"\n"}
        stock - onHold >= order.Quantity
        </pre>
    );
}

export default ConditionInstructions;