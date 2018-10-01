Feature: Login

  As a user I can login

  Scenario: Login as a user
    When I login as "Administrator"
    Then I am redirected to home
