if(Meteor.isClient){

	$.validator.setDefaults({
        rules: {
            email: {
                required: true,
                email: true
            },
            password: {
                required: true,
                minlength: 6
            }
        },
        messages: {
            email: {
                required: "You must enter an email address.",
                email: "You've entered an invalid email address."
            },
            password: {
                required: "You must enter a password.",
                minlength: "Your password must be at least {0} characters."
            }
        }
    });


	Template.login.onRendered(function(){
        var validator = $('.login').validate({
            submitHandler: function(event){
                var email = $('[name=email]').val();
                var password = $('[name=password]').val();
                Meteor.loginWithPassword(email, password, function(error){
                    if(error){
                        if(error.reason == "User not found"){
                            validator.showErrors({
                                email: "That email doesn't belong to a registered user."   
                            });
                        }
                        if(error.reason == "Incorrect password"){
                            validator.showErrors({
                                password: "You entered an incorrect password."    
                            });
                        }

                    } else {
                        var currentRoute = Router.current().route.getName();
                        if(currentRoute == "login"){
                            Router.go("UserPage", {_id: Meteor.userId()});
                        }
                    }
                });
            }
        });
    });

    Template.register.onRendered(function(){
        var validator = $('.register').validate({
            submitHandler: function(event){

                var user = $('[name=user]').val();
                var email = $('[name=email]').val();
                var password = $('[name=password]').val();
                var password2 = $('[name=password2]').val();
                if (password !== password2){
                    validator.showErrors({
                        password2: "Passwords are not equal."    
                    });
                    return;
                }
                Accounts.createUser({
                    email: email,
                    password: password,
                }, function(error){
                    if(error){
                        if(error.reason == "Email already exists."){
                            validator.showErrors({
                                email: "That email already belongs to a registered user."   
                            });
                        }
                    } else {

                        var img = "http://www.gravatar.com/avatar/" + CryptoJS.MD5(email).toString();
                        var data = {
                            user: user,
                            profileimg: img,
                            email: email,
                            createdAt: new Date(),
                            maxSore: 0,
                            nWins: 0,
                            friends: []
                        }
                        Meteor.call('add',data);
                        Router.go("UserPage", {_id: Meteor.userId()});
                    }
                });
                
            }    
        });
    });

    Template.navigation.events({

        'click .logout': function(event){
            event.preventDefault();
            Meteor.logout();
            Router.go('login');  //redirige a la pagina del loggin
        }
    });
}