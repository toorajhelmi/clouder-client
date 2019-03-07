import React from 'react';

const SqlInstructions = () => { 
    return(
        <pre>
        Use SQL to define the tables. You can also initialize tables. {"\n"}
        {"\n"}
        Example: {"\n"}
        {"\n"}
        table([OrderStatus]) {"\n"}
        [ {"\n"}
        {'  '}Id       uniqueIdentifier not null  default NewId() PRIMARY KEY, {"\n"}
        {'  '}StatusId int              not null, {"\n"}
        {'  '}Name     varchar(50)      not null {"\n"}
        ]{"\n"}
        {"\n"}
        
        insert into (StatusId, Name) values {"\n"}
        {"{"}{"\n"}
        {'  '}(1, 'Pending Payment'), {"\n"}
        {'  '}(2, 'Pending Receipt'), {"\n"}
        {'  '}(3, 'Payment Declined'), {"\n"}
        {'  '}(4, 'Processed'), {"\n"}
        {'  '}(5, 'Out Of Stock') {"\n"}
        {"}"} {"\n"}
        {"\n"}
        Table(Inventory) {"\n"}
        [ {"\n"}
        {'  '}Id        uniqueIdentifier not null default NewId() PRIMARY KEY, {"\n"}
        {'  '}ItemId    int              not null, {"\n"}
        {'  '}Available int              not null, {"\n"}
        {'  '}OnHold    int              not null {"\n"}
        ] {"\n"}
        </pre>);
};

export default SqlInstructions;