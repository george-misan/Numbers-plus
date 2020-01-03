const page = document.querySelector('.template');
const alert = document.querySelector('.update-mssg');
const errorMsg = document.querySelector('.error-msg'); 
const signupError = document.querySelector('.signup-error');
const heading = document.querySelector('.heading');
const loggedOutLinks = document.querySelectorAll('.logged-out');
const loggedInLinks = document.querySelectorAll('.logged-in')


auth.onAuthStateChanged(user => {
    if(user) {
        button.removeAttribute('disabled');
        loggedInLinks.forEach(item => item.style.display = 'block');
        loggedOutLinks.forEach(item => item.style.display = 'none');

        const uid = firebase.auth().currentUser.uid;
        
        db.collection('Users').get().then((snapshot) => {
            snapshot.forEach((doc) => {

                if(uid===doc.data().id){
                    db.collection('Users').doc(doc.id).get().then(doc =>{

                        const savedDate = doc.data().created_at.toDate()
                        const currentDate = new Date();
                
                        if (currentDate > savedDate){
                            button.removeAttribute('disabled');
                        } else {
                            button.setAttribute('disabled', 'disabled') 
                        }  

                    })
                }
            })
        })
  
    } else {

        button.setAttribute('disabled', 'disabled')
        loggedInLinks.forEach(item => item.style.display = 'none');
        loggedOutLinks.forEach(item => item.style.display = 'block');

    }
})



const signupForm = document.querySelector('#signup-form');
signupForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // get user info
    const email = signupForm['signup-email'].value;
    const password = signupForm['signup-password'].value;

    // sign up the user
    auth.createUserWithEmailAndPassword(email, password).then(cred => {
        const modal = document.querySelector('#modal-signup');
        M.Modal.getInstance(modal).close();
        signupForm.reset();

        const now = new Date();

        db.collection('Users').add ({
            "id" : firebase.auth().currentUser.uid,
            "created_at" : firebase.firestore.Timestamp.fromDate(now)
        });
        

    }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        
        if (errorCode == 'auth/weak-password') {
            signupError.innerHTML = 'The password is too weak.';
        } else {
            signupError.innerHTML = errorMessage;
        }
        signupError.innerHTML = error;
    
        setTimeout(() =>{
            signupError.classList.add('hide');
        }, 3000)

      });

      
})

//logout
const logout = document.querySelector('#logout');
logout.addEventListener('click',(e) => {
    e.preventDefault();
    auth.signOut()
});

const logoutSidenav = document.querySelector('#logout-sidenav');
logoutSidenav.addEventListener('click',(e) => {
    e.preventDefault();
    auth.signOut()
});

//login
const loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // get user info
    const email = loginForm['login-email'].value;
    const password = loginForm['login-password'].value;

    auth.signInWithEmailAndPassword(email, password).then(cred => {
        //close the login modal and reset the form
        const modal = document.querySelector('#modal-login');
        M.Modal.getInstance(modal).close();
        loginForm.reset(); 

    }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        
        if (errorCode === 'auth/wrong-password') {
            errorMsg.innerHTML = 'Wrong password';
        } else {
            errorMsg.innerHTML = errorMessage;
        }
        errorMsg.innerHTML = error;
       
        setTimeout(() =>{
            errorMsg.classList.add('hide');
        }, 3000)
      });
     
})

// setup materialize components
document.addEventListener('DOMContentLoaded', function() {

    var modals = document.querySelectorAll('.modal');
    M.Modal.init(modals);

    var items = document.querySelectorAll('.collapsible');
    M.Collapsible.init(items);
})