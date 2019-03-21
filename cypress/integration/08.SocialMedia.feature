Feature: List Social Media Accounts
  As a User
  I'd like to enter my social media
  So I can show them to other users to get in contact

  Background:
    Given I have a user account
    And I am logged in
    And I am on the "settings" page

  Scenario: Adding Social Media
    Given I click on the "My social media" link
    Then I should be on the "/settings/my-social-media" page
    And I should be able to add a social media link