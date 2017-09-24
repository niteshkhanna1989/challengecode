describe('Authentication Service', function() {
    var AuthenticationService;
    var originalTimeout;
  var LoginObj={};
  LoginObj.username="Admin";
  LoginObj.password="Admin";
    // Before each test load our api.users module
    beforeEach(angular.mock.module('app'));
  
    // Before each test set our injected Users factory (_Users_) to our local Users variable
    beforeEach(inject(function(_AuthenticationService_) {
        AuthenticationService = _AuthenticationService_;
    }));
    beforeEach(function() {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 100000;
    });

    afterEach(function() {
      jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });
    // A simple test to verify the Users factory exists
    it('should exist', function() {
      expect(AuthenticationService).toBeDefined();
    });
    it('Login method should exist', function() {
        expect(AuthenticationService.Login).toBeDefined();
      });
      it('Expect Login To return Success', function(done) {
        AuthenticationService.Login(LoginObj.username,LoginObj.password,function(result){
            expect(result.success).toEqual(true);
            done();
        });
      });

  });