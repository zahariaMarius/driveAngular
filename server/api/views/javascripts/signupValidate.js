$().ready(function(){
    $("#signupForm").validate({
        rules: {
            name: "required",
            surname: "required",
            password:{
                required: true,
                minlenght: 8
            },
            repeatPassword: {
                required: true,
                minlenght: 8,
                equalTo: "password"
            },
            email: {
                required: true,
                email: true
            }
        },
        messages: {
            name: "Please enter your name",
            surname: "Please enter your name",
            password:{
                required: "Please enter a password",
                minlenght: "Your password must be at least 8 character long"
            },
            repeatPassword: {
                required: "Please enter a password",
                minlenght: "Your password must be at least 8 character long",
                equalTo: "Password doesn't match"
            },
            email: {
                required: "Please enter a mail",
                email: "Invalid Email"
            }

        }

    })
})
