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
                    console.log(doc.data())
                }
            })
        })

 


const disableEnable = (e) => {


    document.getElementById('btn1').onclick = function(){

        db.collection('numbers').get().then((snapshot) => {
            snapshot.forEach(doc => {

        let n = doc.data().number
        const now = new Date();
        // now.setHours(now.getHours() + 0.167)
            
            console.log(n)
            db.collection('numbers').doc('rI9w5IuKfNXLpFyDosu3').update ({
                "number" : ++n,
                "created_at" : firebase.firestore.Timestamp.fromDate(now)
            })});
        

        })
        

    
        button.setAttribute('disabled', 'disabled')


        setTimeout(() =>{
            document.getElementById('btn1').removeAttribute('disabled');
        }, 600000)


  }}

  disableEnable(button);











