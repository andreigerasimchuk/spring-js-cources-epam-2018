#!/usr/bin/env node

const program = require('commander');
const { prompt } = require('inquirer');
const { create, update, remove, list, read } = require('./controllers');

program
    .version('0.0.1')
    .description('TODO app');

// Craft questions to present to users
const createQuestions = [
    {
        type: 'input',
        name: 'title',
        message: 'Enter title ...'
    },
    {
        type: 'input',
        name: 'description',
        message: 'Enter description ...'
    },
];

const updateQuestions = [
    {
        type: 'input',
        name: 'title',
        message: 'Enter new title ...'
    },
    {
        type: 'input',
        name: 'description',
        message: 'Enter new description ...'
    },
];

const commentQuestions = [
    {
        type: 'input',
        name: 'comment',
        message: 'Enter comment ...'
    },
];

program
    .command('create')
    .alias('cr')
    .description('Create new TODO item')
    .action(() => {
        prompt(createQuestions).then(answers => create(answers));
    });

program
    .command('read <id>')
    .alias('rd')
    .description('Read TODO item')
    .action((id) => read(id));

program
    .command('update <id>')
    .alias('upd')
    .description('Update TODO item')
    .action((id) => {
        prompt(updateQuestions).then(answers => update(id, answers));
    });

program
    .command('remove <id>')
    .alias('rm')
    .description('Remove TODO item by id')
    .action((id) => remove(id));

program
    .command('list')
    .alias('ls')
    .description('List all TODOs')
    .action(() => list());

program
    .command('like <id>')
    .alias('lk')
    .description('Like TODO item')
    .action((id) => update(id, { isLiked: true }));

program
    .command('unlike <id>')
    .alias('ulk')
    .description('Unlike TODO item')
    .action((id) => update(id, { isLiked: false }));

program
    .command('comment <id>')
    .alias('cmt')
    .description('Comment TODO item')
    .action((id) => {
        prompt(commentQuestions).then(answers => update(id, {}, [answers.comment]));
    });

program.parse(process.argv);