const signinBTN=document.getElementById('signin-btn').addEventListener('click',function(){
    // console.log('login button clicked')
    const username=document.getElementById('username-btn')
    const input=username.value ;
    // console.log(inputBtn)


const passwordBtn=document.getElementById('password-btn')
const password=passwordBtn.value ;
// console.log(digitalBtn)

if(input=="admin" && password=='admin123'){
    alert('Login Successful!!!!')

    window.location.assign("indexhome.html")
}
else{
    alert('Login Failed!!!')
    username.value="";
    passwordBtn.value="";
    return;
}


})