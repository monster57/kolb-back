var assert = require('chai').assert;
var request = require('supertest');
var models = require('../../models');
var db = require('../../models/db');
var User = models.User;
var mongoose = require('mongoose')
var url = 'http://localhost:1338';

describe("user controller" , function(){
	describe( 'signup Api', function() {
	
		before(function (done) {
			    User.remove({}).then(function(){
			    	request(url)
					  .get('/api/logout')
					  .send(this.user)
					  .end(function(err, res) {
					    if (err) throw err;
					    done();
					  });
			    })
		});

		describe('For creating sucessful user' , function(){
			
			before(function(){
				this.user = {
				  first_name:"surajit",
				  last_name:"barman",
				  password : "surajitbar",
				  confirm_password : "surajitbar",
				  email : "surajitbarman57@gmail.com",
				  mobile_number : 7847903544,
				  designation : "developer",
				  type:"user"
				}

				this.user2 = {
				  first_name:"surajit",
				  last_name:"barman",
				  password : "surajitbar",
				  confirm_password : "surajitbar",
				  email : "surajitbarman574@gmail.com",
				  mobile_number : 7847903544,
				  designation : "developer",
				  type:"user"
				}
			});

			after(function(){
				delete this.user;
				delete this.user2;
			})
			it('should create a new user' , function(done){
				request(url)
				  .post('/api/signup')
				  .send(this.user)
				  .expect('Content-Type', /json/)
				  .expect(200)
				  .end(function(err, res) {
				    if (err) throw err;
				    done();
				  });
			});

			it('should give email exist error' ,function(done){
				request(url)
				  .post('/api/signup')
				  .send(this.user)
				  .expect('Content-Type', /json/)
				  .expect(400)
				  .expect({
						"success": false,
						"message": "This email is already exists",
						"data":{},
						"errors":[]
				   })
				  .end(function(err, res) {
				    if (err) throw err;
				    done();
				  });
			});

			it('should give mobile number exist error' ,function(done){
				request(url)
				  .post('/api/signup')
				  .send(this.user2)
				  .expect('Content-Type', /json/)
				  .expect(400)
				  .expect({
						"success": false,
						"message": "This mobile number already exists",
						"data":{},
						"errors":[]
				   })
				  .end(function(err, res) {
				    if (err) throw err;
				    done();
				  });
			});
		});

		describe('For missing fields' , function(){
			
			before(function(){
				this.user = {
				  last_name:"barman",
				  password : "surajitbar",
				  confirm_password : "surajitbar",
				  email : "surajitbarman57@gmail.com",
				  mobile_number : 7847903544,
				  designation : "developer",
				  type:"Startup"
				};

				this.user2 = {
				  first_name:"surajit",
				  password : "surajitbar",
				  confirm_password : "surajitbar",
				  email : "surajitbarman57@gmail.com",
				  mobile_number : 7847903544,
				  designation : "developer",
				  type:"Startup"
				};

				this.user3 = {
				  first_name:"surajit",
				  last_name:"barman",
				  confirm_password : "surajitbar",
				  email : "surajitbarman57@gmail.com",
				  mobile_number : 7847903544,
				  designation : "developer",
				  type:"Startup"
				};
				
				this.user4 = {
				  first_name:"surajit",
				  last_name:"barman",
				  password : "surajitbar",
				  email : "surajitbarman57@gmail.com",
				  mobile_number : 7847903544,
				  designation : "developer",
				  type:"Startup"
				};

				this.user5 = {
				  first_name:"surajit",
				  last_name:"barman",
				  password : "surajitbar",
				  confirm_password : "surajitbar",
				  mobile_number : 7847903544,
				  designation : "developer",
				  type:"Startup"
				};

				this.user6 = {
				  first_name:"surajit",
				  last_name:"barman",
				  password : "surajitbar",
				  confirm_password : "surajitbar",
				  email : "surajitbarman57@gmail.com",
				  designation : "developer",
				  type:"Startup"
				};

				this.user7 = {
				  first_name:"surajit",
				  last_name:"barman",
				  password : "surajitbar",
				  confirm_password : "surajitbar",
				  email : "surajitbarman57@gmail.com",
				  mobile_number : 7847903544,
				  type:"Startup"
				};

				this.user8 = {
				  first_name:"surajit",
				  last_name:"barman",
				  password : "surajitbar",
				  confirm_password : "surajitbar",
				  email : "surajitbarman57@gmail.com",
				  mobile_number : 7847903544,
				  designation : "developer"
				};

				this.user9 = {
				  first_name:"surajit",
				  last_name:"barman",
				  password : "surajitbar",
				  confirm_password : "surajitbar1",
				  email : "surajitbarman57@gmail.com",
				  mobile_number : 7847903544,
				  designation : "developer",
				  type:"Startup"
				}
			});

			after(function(){
				delete this.user;
				delete this.user2;
				delete this.user3;
				delete this.user4;
				delete this.user5;
				delete this.user6;
				delete this.user7;
				delete this.user8;
				delete this.user9;

			});

			it('should give bad request and message for first name is not provided' , function(done){
				request(url)
				  .post('/api/signup')
				  .send(this.user)
				  .expect('Content-Type', /json/)
				  .expect(400)
				  .expect({
						"success": false,
						"message": "Please provide first name",
						"data":{},
						"errors":[]
				   })
				  .end(function(err, res) {
				    if (err) throw err;
				    done();
				  });
			});

			it('should give bad request and message for last name is not provided' , function(done){
				request(url)
				  .post('/api/signup')
				  .send(this.user2)
				  .expect('Content-Type', /json/)
				  .expect(400)
				  .expect({
						"success": false,
						"message": "Please provide last name",
						"data":{},
						"errors":[]
				   })
				  .end(function(err, res) {
				    if (err) throw err;
				    done();
				  });
			});

			it('should give bad request and message for password is not provided' , function(done){
				request(url)
				  .post('/api/signup')
				  .send(this.user3)
				  .expect('Content-Type', /json/)
				  .expect(400)
				  .expect({
						"success": false,
						"message": "Please provide password",
						"data":{},
						"errors":[]
				   })
				  .end(function(err, res) {
				    if (err) throw err;
				    done();
				  });
			});

			it('should give bad request and message for confirm password is not provided' , function(done){
				request(url)
				  .post('/api/signup')
				  .send(this.user4)
				  .expect('Content-Type', /json/)
				  .expect(400)
				  .expect({
						"success": false,
						"message": "Please provide confirm password",
						"data":{},
						"errors":[]
				   })
				  .end(function(err, res) {
				    if (err) throw err;
				    done();
				  });
			});

			it('should give bad request and message for email is not provided' , function(done){
				request(url)
				  .post('/api/signup')
				  .send(this.user5)
				  .expect('Content-Type', /json/)
				  .expect(400)
				  .expect({
						"success": false,
						"message": "Please provide email",
						"data":{},
						"errors":[]
				   })
				  .end(function(err, res) {
				    if (err) throw err;
				    done();
				  });
			});

			it('should give bad request and message for mobile number is not provided' , function(done){
				request(url)
				  .post('/api/signup')
				  .send(this.user6)
				  .expect('Content-Type', /json/)
				  .expect(400)
				  .expect({
						"success": false,
						"message": "Please provide mobile number",
						"data":{},
						"errors":[]
				   })
				  .end(function(err, res) {
				    if (err) throw err;
				    done();
				  });
			});

			it('should give bad request and message for designation is not provided' , function(done){
				request(url)
				  .post('/api/signup')
				  .send(this.user7)
				  .expect('Content-Type', /json/)
				  .expect(400)
				  .expect({
						"success": false,
						"message": "Please provide designation",
						"data":{},
						"errors":[]
				   })
				  .end(function(err, res) {
				    if (err) throw err;
				    done();
				  });
			});

			it('should give bad request and message for type is not provided' , function(done){
				request(url)
				  .post('/api/signup')
				  .send(this.user8)
				  .expect('Content-Type', /json/)
				  .expect(400)
				  .expect({
						"success": false,
						"message": "Please provide type",
						"data":{},
						"errors":[]
				   })
				  .end(function(err, res) {
				    if (err) throw err;
				    done();
				  });
			});

			it('should give bad request and message for password does not match' , function(done){
				request(url)
				  .post('/api/signup')
				  .send(this.user9)
				  .expect('Content-Type', /json/)
				  .expect(400)
				  .expect({
						"success": false,
						"message": "Password does not match",
						"data":{},
						"errors":[]
				   })
				  .end(function(err, res) {
				    if (err) throw err;
				    done();
				  });
			});
		});
		
	});

	describe('login Api' , function(){
		before(function (done) {
			    User.remove({}).then(function(){
			    	return done();
			    })
		});

		describe('for successful login' , function(){
			before(function(done){
				this.user = {
				  first_name:"surajit",
				  last_name:"barman",
				  password : "surajitbar",
				  confirm_password : "surajitbar",
				  email : "surajitbarman57@gmail.com",
				  mobile_number : 7847903544,
				  designation : "developer",
				  type:"Startup"
				};

				this.userDetails = {
					email: "surajitbarman57@gmail.com",
					password:"surajitbar"
				};

				this.userDetails2 = {
					email: "surajitbarman571@gmail.com",
					password:"surajitbar"
				};
				request(url)
				  .post('/api/signup')
				  .send(this.user)
				  .expect('Content-Type', /json/)
				  .end(function(err, res) {
				    if (err) throw err;
				    User.update({email: "surajitbarman57@gmail.com"} , {is_email_verified: true})
				    .then(function(){
				    	done();	
				    })
				    
				  });


			});

			afterEach(function(done){
				request(url)
				.get('/api/logout')
				.end(function(err, res) {
				    if (err) throw err;
				    done();
				  });
			})

			it("should login after providing correct details" , function(done){
				request(url)
				  .post('/api/login')
				  .send(this.userDetails)
				  .expect('Content-Type', /json/)
				  .expect(200)
				  .end(function(err, res) {
				    if (err) throw err;
				    done();
				  });
			});

			it("should give error after providing wrong details" , function(done){
				request(url)
				  .post('/api/login')
				  .send(this.userDetails2)
				  .expect(401)
				  .expect({})
				  .end(function(err, res) {
				    if (err) throw err;
				    done();
				  });
			});
		})
	});
})