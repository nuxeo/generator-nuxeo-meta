#!/usr/bin/env node

'use strict';

/*
 * To pass cli arguments to the 'npm test' command, you should run 'npm test -- <args>',
 * for instance: 'npm test -- --nuxeoUrl=http://localhost:5000/nuxeo/ --headless'
 *
 * The supported cli arguments are:
 *
 *   --cucumberReport: path to file containing the report that will be used by cucumber-html-report;
 *                     by default set to ./target/cucumber-reports/report.json
 *   --debug: allow node inspector to be attached
 *   --features: an array of paths from which to load feature files from;
 *               by default set to ./src/test/features/*.feature
 *   --headless: If set to true, then with headless chrome option;
 *               by default set to false
 *   --junitReport: path to file containing the junit report generated from the cucumber report;
 *                  by default set to ./target/surefire-reports/TEST-report.xml
 *   --nuxeoUrl: the url of the nuxeo instance to test
 *   --report: generate cucumber and junit reports
 *   --require: an array of paths from which to load required ressources from (step definitions, fixtures);
 *                      by default set to ./src/test/step-definitions,./src/test/fixtures
 *   --screenshots: save screenshots on error
 *   --screenshotPath: path to to which the screenshots will be saved;
 *                     by default set to ./target/screenshots
 *   --tags: only scenarios containing these tags will be ran
 *   --watch: watch for changes in tests and rerun them
 *   --wdioConfig: pass a custom wdio config file;
 *                 by default set to ./src/test/conf/wdio.conf.js
 */

const fs = require('fs');
const path = require('path');
const spawn = require('child_process').spawn;
const wdioBin = path.resolve('./node_modules/.bin/wdio');
const argv = require('minimist')(process.argv.slice(2));
const defaultFeatures = './src/test/features';
const defaultStepDefinitions = './src/test/step-definitions';
const defaultFixtures = './src/test/fixtures';
const defaultWdioConfig = path.join(__dirname, './conf/wdio.conf.js');
const args = [];

// wdio Config
let wdioConfig = '';
if (argv['wdioConfig']) {
  wdioConfig = argv['wdioConfig'];
}
else if (fs.existsSync(defaultWdioConfig)) {
  wdioConfig = defaultWdioConfig;
}
if (wdioConfig) {
  args.push(wdioConfig);
}

// Headless Chrome Option
if (argv['headless']) {
  args.push(`--headless=${argv['headless']}`);
}

// Nuxeo URL
let nuxeoUrl = '';
if (argv['nuxeoUrl']) {
  nuxeoUrl = argv['nuxeoUrl'];
} else if (process.env.NUXEO_URL) {
  nuxeoUrl = process.env.NUXEO_URL
} else {
  nuxeoUrl = 'http://localhost:8080/nuxeo/';
}
args.push(`--baseUrl=${nuxeoUrl}`);

// Reports
if (argv['report']) {
  process.env.CUCUMBER_REPORT_PATH = argv['cucumberReport'] ? argv['cucumberReport']
                                                            : `./target/cucumber-reports/report.json`;
  process.env.JUNIT_REPORT_PATH = argv['junitReport'] ? argv['junitReport']
                                                      : `./target/surefire-reports/TEST-report.xml`;
}

// ScreenShots
if (argv['screenshots']) {
  process.env.SCREENSHOTS_PATH = argv['screenshotPath'] ? argv['screenshotPath'] : `./target/screenshots`;
}

// Specs (Features)
let features = '';
if (argv['features']) {
  features = argv['features'];
}
else if (fs.existsSync(defaultFeatures)) {
  features = defaultFeatures + '/*.feature';
}
if (features) {
  args.push(`--specs=${features}`);
}

// Require (Step definitions and Fixtures)
let required = '';

let stepDefinitions = '';
if (argv['require']) {
  required = argv['require'];
} else if (fs.existsSync(defaultStepDefinitions) && fs.existsSync(defaultFixtures)) {
  required = `${defaultStepDefinitions},${defaultFixtures}`;
} else if (fs.existsSync(defaultStepDefinitions) && !fs.existsSync(defaultFixtures)) {
  required = defaultStepDefinitions;
}

if (required) {
  args.push(`--cucumberOpts.require=${required}`);
}

// Watch
if (argv['watch']) {
  args.push('--watch');
}

// Tags
if (argv['tags']) {
  args.push(`--cucumberOpts.tags=${argv['tags']}`);
}

// Debug
if (argv['debug']) {
  process.env.DEBUG = true;
}

process.env.FORCE_COLOR = true;

const wdio = spawn(wdioBin, args, { env: process.env, stdio: ['inherit', 'pipe', 'pipe'] });

wdio.stdout.pipe(process.stdout);
wdio.stderr.pipe(process.stderr);

wdio.on('close', (code) => {
  process.exit(code);
});
