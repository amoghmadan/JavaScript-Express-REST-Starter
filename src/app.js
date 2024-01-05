import yargs from 'yargs';

import {bootstrap, changePassword, createSuperUser} from './cli';

yargs
    .strict()
    .command(
        'bootstrap [port] [host]',
        'Bootstrap application',
        (setup) => {
          setup
              .positional('port', {
                default: 8000,
                description: 'Port',
                type: 'number',
              })
              .positional('host', {
                default: '::',
                description: 'Host',
                type: 'string',
              });
        },
        async (args) => {
          await bootstrap(Number(args.port), args.string);
        },
    )
    .command(
        'changepassword [email]',
        'Change password',
        (setup) => {
          setup.positional('email', {
            description: 'Email',
            type: 'string',
          });
        },
        async (args) => {
          await changePassword(args.email);
        },
    )
    .command(
        'createsuperuser',
        'Create super user',
        (setup) => {}, // Nothing to setup
        async (args) => { // No args
          await createSuperUser();
        },
    ).argv;
