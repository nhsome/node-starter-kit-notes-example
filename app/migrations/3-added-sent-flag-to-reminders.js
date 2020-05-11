'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * addColumn "sent" to table "Reminders"
 *
 **/

var info = {
    "revision": 3,
    "name": "added-sent-flag-to-reminders",
    "created": "2020-05-10T17:02:31.771Z",
    "comment": ""
};

var migrationCommands = [{
    fn: "addColumn",
    params: [
        "Reminders",
        "sent",
        {
            "type": Sequelize.BOOLEAN,
            "field": "sent",
            "defaultValue": false,
            "allowNull": false
        }
    ]
}];

module.exports = {
    pos: 0,
    up: function(queryInterface, Sequelize)
    {
        var index = this.pos;
        return new Promise(function(resolve, reject) {
            function next() {
                if (index < migrationCommands.length)
                {
                    let command = migrationCommands[index];
                    console.log("[#"+index+"] execute: " + command.fn);
                    index++;
                    queryInterface[command.fn].apply(queryInterface, command.params).then(next, reject);
                }
                else
                    resolve();
            }
            next();
        });
    },
    info: info
};
