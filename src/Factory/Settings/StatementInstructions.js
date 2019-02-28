import React from 'react';

const StatementInstructions = () => { 
    return(
        <pre>
        Specifiy the SQL statement. Use @ to specify a parameter and provide its type in brakets. {"\n"}
        {"\n"}
        Select Example: {"\n"}
        {"\n"}
        select * from [Order] {"\n"}
        where Id = [uniqueidentifier]@expiredHold.OrderId {"\n"}
        {"\n"}
        ----------------------------------------------------------------- {"\n"}
        Insert Example: {"\n"}
        {"\n"}
        insert into Hold (OrderId, Expiration) {"\n"}
        select [uniqueidentifier]@order.Id, DATEADD(minute, 5, GETDATE()) {"\n"}
        {"\n"}
        ----------------------------------------------------------------- {"\n"}
        Update Example: {"\n"}
        {"\n"}
        update Inventory {"\n"}
        set OnHold = [int]newHold {"\n"}
        where ItemId = [int]@inventory.ItemId {"\n"}
        {"\n"}
        ----------------------------------------------------------------- {"\n"}
        Delete Example: {"\n"}
        {"\n"}
        delete Hold {"\n"}
        where Id = [uniqueidentifier]@expiredHold.Id {"\n"}
        </pre>);
};

export default StatementInstructions;