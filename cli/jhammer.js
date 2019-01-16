#!/usr/bin/env node

const semver = require('semver');
const path = require('path');
const packageJson = require('../package.json');
const { logger } = require('./utils');

const currentNodeVersion = process.versions.node;
const minimumNodeVersion = packageJson.engines.node;

if (!semver.satisfies(currentNodeVersion, minimumNodeVersion)) {
    /* eslint-disable no-console */
    logger.error(
        `You are running Node version ${currentNodeVersion}\nJHammer requires Node version ${minimumNodeVersion}\nPlease update your version of Node.`
    );
    /* eslint-enable  */
}

let preferLocal = true;

// Don't use commander for parsing command line to avoid polluting it in cli.js
// --prefer-local: Always resolve node modules locally (useful when using linked module)
if (process.argv.includes('upgrade') && !process.argv.includes('--prefer-local')) {
    // Prefer global version for `jhammer upgrade` to get most recent code
    preferLocal = false;
}

requireCLI(preferLocal);

/*
 * Require cli.js giving priority to local version over global one if it exists.
 */
function requireCLI(preferLocal) {
    /* eslint-disable global-require */
    if (preferLocal) {
        try {
            const localCLI = require.resolve(path.join(process.cwd(), 'node_modules', 'generator-jhammer', 'cli', 'cli.js'));
            if (__dirname !== path.dirname(localCLI)) {
                // load local version
                /* eslint-disable import/no-dynamic-require */
                logger.info("Using JHammer version installed locally in current project's node_modules");
                require(localCLI);
                return;
            }
        } catch (e) {
            // Unable to find local version, so global one will be loaded anyway
        }
    }
    // load global version
    logger.info('Using JHammer version installed globally');
    require('./cli');
    /* eslint-enable  */
}
