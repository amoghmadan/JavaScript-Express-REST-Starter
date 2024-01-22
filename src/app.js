import yargs from 'yargs';

import {bootstrap, changePassword, createSuperUser} from '@/cli';

yargs
    .strict()
    .scriptName('app')
    .usage('$0 <cmd> [args]')
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
        (_) => {}, // Nothing to setup
        async (_) => {
          await createSuperUser(); // No args to process
        },
    )
    .help().argv;
