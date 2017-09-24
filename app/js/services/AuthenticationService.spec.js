describe('Authentication Service', function () {
  var AuthenticationService;
  var httpBackend;
  var originalTimeout;
  var LoginObj = {};
  LoginObj.username = "Admin";
  LoginObj.password = "Admin";
  // Before each test load our api.users module
  beforeEach(angular.mock.module('app'));

  // Before each test set our injected Users factory (_Users_) to our local Users variable
  beforeEach(inject(function ($httpBackend, _AuthenticationService_) {
    AuthenticationService = _AuthenticationService_;
    httpBackend = $httpBackend;
  }));
  beforeEach(function () {
    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 100000;
  });

  afterEach(function () {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
  });
  // A simple test to verify the Users factory exists
  it('should exist', function () {
    expect(AuthenticationService).toBeDefined();
  });
  it('Login method should exist', function () {
    expect(AuthenticationService.Login).toBeDefined();
  });
  it('Expect Login To return Success', function () {
    var url = "http://localhost:3000";
    var username = 'Admin';
    var password = 'Admin';
    var responseObj = {
      success: true,
      token: '',
      mesasge: 'Success'
    };


    httpBackend.expect('POST', '/authenticate', 'username=' + username + '&password=' + password)
      .respond({ responseObj });
    AuthenticationService.Login(username, password, function (response) {
      console.log(response);
      expect(response.responseObj.success).toBe(true);
    });
    httpBackend.flush();

  });
  it('Expect Login To return Error', function () {
    var url = "http://localhost:3000";
    var username = 'Admin';
    var password = 'Admin';
    var responseObj = {
      success: false,
      token: '',
      message: 'User Does Not Exist'
    };


    httpBackend.expect('POST', '/authenticate', 'username=' + username + '&password=' + password)
      .respond({ responseObj });
    AuthenticationService.Login(username, password, function (response) {
      console.log(response);
      expect(response.responseObj.success).toBe(false);
      expect(response.responseObj.message).toBe("User Does Not Exist");
    });
    httpBackend.flush();

  });

  it('Expect Login To throw error message Authentication failed. Wrong password.', function () {
    var url = "http://localhost:3000";
    var username = 'Admin';
    var password = 'Admin';
    var responseObj = {
      success: false,
      token: '',
      message: 'Authentication failed. Wrong password.'
    };


    httpBackend.expect('POST', '/authenticate', 'username=' + username + '&password=' + password)
      .respond({ responseObj });
    AuthenticationService.Login(username, password, function (response) {
      console.log(response);
      expect(response.responseObj.success).toBe(false);
      expect(response.responseObj.message).toBe("Authentication failed. Wrong password.");
    });
    httpBackend.flush();

  });
  it('Expect Login To return Token on successful login', function () {
    var url = "http://localhost:3000";
    var username = 'Admin';
    var password = 'Admin';
    var responseObj = {
      success: true,
      token: 'ftghhj',
      message: 'User Does Not Exist'
    };


    httpBackend.expect('POST', '/authenticate', 'username=' + username + '&password=' + password)
      .respond({ responseObj });
    AuthenticationService.Login(username, password, function (response) {
      console.log(response);
      expect(response.responseObj.success).toBe(true);
      expect(response.responseObj.token).toBeDefined();
      expect(response.responseObj.token).toContain("ftghhj");
    });
    httpBackend.flush();

  });

  it('Register method should exist', function () {
    expect(AuthenticationService.Register).toBeDefined();
  });
  it('Expect Register To return Success', function () {
    var url = "http://localhost:3000";
    var username = 'Admin';
    var password = 'Admin';
    var responseObj = {
      success: true,
      //token: '',
      mesasge: 'Success'
    };


    httpBackend.expect('POST', '/register', 'username=' + username + '&password=' + password)
      .respond({ responseObj });
    AuthenticationService.Register(username, password, function (response) {
      console.log(response);
      expect(response.responseObj.success).toBe(true);
    });
    httpBackend.flush();

  });
  it('Expect Register To return false', function () {
    var url = "http://localhost:3000";
    var username = 'Admin';
    var password = 'Admin';
    var responseObj = {
      success: false,
      //token: '',
      mesasge: 'error'
    };


    httpBackend.expect('POST', '/register', 'username=' + username + '&password=' + password)
      .respond({ responseObj });
    AuthenticationService.Register(username, password, function (response) {
      console.log(response);
      expect(response.responseObj.success).toBe(false);
    });
    httpBackend.flush();

  });
  it('Expect Register To return error user already exist', function () {
    var url = "http://localhost:3000";
    var username = 'Admin';
    var password = 'Admin';
    var responseObj = {
      success: false,
      //token: '',
      message: 'User already exists'
    };


    httpBackend.expect('POST', '/register', 'username=' + username + '&password=' + password)
      .respond({ responseObj });
    AuthenticationService.Register(username, password, function (response) {
      console.log(response);
      expect(response.responseObj.success).toBe(false);
      expect(response.responseObj.message).toContain('User already exists');
    });
    httpBackend.flush();

  });
});