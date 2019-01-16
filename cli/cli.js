/* eslint-disable no-console */
const program = require('commander');
const chalk = require('chalk');

const packageJson = require('../package.json');
const { CLI_NAME, initHelp, logger, createYeomanEnv, toString, getCommand, getCommandOptions, getArgs, done } = require('./utils');
const initAutoCompletion = require('./completion').init;
const SUB_GENERATORS = require('./commands');

const version = packageJson.version;
const JHAMMER_NS = CLI_NAME;
const env = createYeomanEnv();

/* setup debugging */
logger.init(program);

/**
 *  Run a yeoman command
 */
const runYoCommand = (cmd, args, options, opts) => {
    logger.debug(`cmd: ${toString(cmd)}`);
    logger.debug(`args: ${toString(args)}`);
    logger.debug(`opts: ${toString(opts)}`);
    const command = getCommand(cmd, args, opts);
    logger.info(chalk.yellow(`Executing ${command}`));
    logger.info(chalk.yellow(`Options: ${toString(options)}`));
    try {
        env.run(command, options, done);
    } catch (e) {
        logger.error(e.message, e);
    }
};

program
    .version(version)
    .usage('[command] [options]')
    .allowUnknownOption();

/* create commands */
Object.keys(SUB_GENERATORS).forEach(key => {
    const opts = SUB_GENERATORS[key];
    const command = program.command(`${key} ${getArgs(opts)}`, '', { isDefault: opts.default });
    if (opts.alias) {
        command.alias(opts.alias);
    }
    command
        .allowUnknownOption()
        .description(opts.desc)
        .action(args => {
            const options = getCommandOptions(packageJson, process.argv.slice(2));
            if (opts.cliOnly) {
                logger.debug('Executing CLI only script');
                /* eslint-disable global-require, import/no-dynamic-require */
                require(`./${key}`)(program.args, options, env);
                /* eslint-enable */
            } else {
                if (key === 'server') {
                    logger.error('Please run "jhammer --skip-client" instead');
                }
                if (key === 'client') {
                    logger.error('Please run "jhammer --skip-server" instead');
                }
                runYoCommand(key, program.args, options, opts);
            }
        })
        .on('--help', () => {
            if (opts.help) {
                logger.info(opts.help);
            } else {
                logger.debug('Adding additional help info');
                env.run(`${JHAMMER_NS}:${key} --help`, done);
            }
        });
});

/* Generate useful help info during typos */
initHelp(program, CLI_NAME);

/* Enable autocompletion: This needs to right before parsing argv */
initAutoCompletion(program, CLI_NAME);

program.parse(process.argv);

/* Run default when no commands are specified */
if (program.args.length < 1) {
    logger.debug('No command specified. Running default');
    logger.info(chalk.yellow('Running default command'));
    const options = getCommandOptions(packageJson, process.argv.slice(2));
    runYoCommand('app', [], options, {});
}
