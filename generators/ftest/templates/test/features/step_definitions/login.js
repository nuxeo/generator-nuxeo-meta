'use strict';

import { Then, When } from 'cucumber';
import UI from '@nuxeo/nuxeo-web-ui-ftest/test/pages/ui';
import Login from '../../pages/login';

When('I want to login as {string}', function(username) {
  const login = Login.get();
  login.username = username;
  login.password = fixtures.users[username];
  login.submit();
  this.ui = UI.get();
  driver.waitForVisible('nuxeo-page');
});

Then('I am really logged in as {string}', function(username) {
  const currentUser = this.ui.drawer
    .open('profile')
    .getText('.header')
    .toLowerCase();
  currentUser.should.be.equal(username.toLowerCase());
});
