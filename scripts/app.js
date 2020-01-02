const button = document.querySelector('#btn1')
const number = document.querySelector('.update-number')



// number.innerHTML = 7;

    const addtoDOM = (num) => {
            let html = `
               ${num.number}
            `;

            button.innerHTML = html;  
            

        }

        db.collection('numbers').onSnapshot(snapshot => {
            snapshot.docChanges().forEach(change => {
                const doc = change.doc;
                if(change.type === 'added' || "modify"){
                    addtoDOM(doc.data());
                }
            })
        })

 

    



    document.getElementById('btn1').onclick = function(){

        const now = new Date();
        const uid = firebase.auth().currentUser.uid;

            db.collection('numbers').get().then((snapshot) => {
                snapshot.forEach(doc => {

            let n = doc.data().number
            now.setMinutes(now.getMinutes() + 30)
                
                console.log(n)
                db.collection('numbers').doc('rI9w5IuKfNXLpFyDosu3').update ({
                    "number" : ++n
                });

                db.collection('Users').get().then((snapshot) => {
                    snapshot.forEach((doc) => {

                        if(uid===doc.data().id){
                            db.collection('Users').doc(doc.id).update ({
                                created_at: firebase.firestore.Timestamp.fromDate(now)

                            })
                        }
                    })
                })})
            

        })
        

    
        button.setAttribute('disabled', 'disabled')


        setTimeout(() =>{
            document.getElementById('btn1').removeAttribute('disabled');
        }, 1800000)


  }













