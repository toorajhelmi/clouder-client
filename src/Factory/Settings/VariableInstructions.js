import React from 'react';

const VariableInstructions = () => { 
    return(
        <pre>
        Provide a definition for the new variable. {"\n"}
        Use can use variables defined earlier. {"\n"}
        {"\n"}
        Example: {"\n"}
        {"\n"}
        inventory.Available - order.Quantity; {"\n"}
        {"\n"}
        You can also define objects: {"\n"}
        {"\n"}
        {'{'} {"\n"}
        {'   '}OrderId: order.Id, {"\n"}
        {'   '}OrderStatus: 5 {"\n"}
        {'}'}; {"\n"}
        </pre>
    );
}

export default VariableInstructions;