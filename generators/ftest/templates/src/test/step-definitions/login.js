'use strict';

import Login from './../pages/login';

module.exports = function () {
  this.When('I login as "$username"', (username) => {
    const login = Login.get();
    login.username = username;
    login.password = fixtures.users[username];
    login.submit();
  });

  this.Then('I am redirected to home', () => {
    const homeUrl = driver.options.baseUrl + 'ui/';
    const driverUrl = driver.url().value;
    assert(driverUrl === homeUrl || driverUrl === homeUrl + '#!/home');
  });
};
