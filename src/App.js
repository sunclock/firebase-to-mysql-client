import logo from './logo.svg';
import './App.css';
import { firestore } from './firebase';

const axios = require('axios').default;

const db = firestore;

function keywordArrayToString(arr) {
  var str = '';
  var i;
  for (i = 0; i < arr.length; i++) {
    var str = str + arr[i].keyword + '/';
  }
  return str
}

function postDocument(age, user_id, keyword, 
  register_date, job, response, sex, soul_food) {
    var strKeyword = keywordArrayToString(keyword);
  axios.post('http://localhost:8080/api/users', {
    age: age,
    user_id: user_id,
    keyword: strKeyword,
    register_date, register_date,
    job: job,
    response: response,
    sex: sex,
    soul_food: soul_food
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
}

function getDocument() {
    db.collection("users").doc("05brJ95ZT3QamILjY7OK")
    .get()
    .then((doc) => {
      if (doc.exists) {
        console.log("Document data: ", doc.data());
        const user = doc.data();
        console.log(user.age, doc.id, user.keyword,
            user.date.seconds, user.occupation, user.response, user.sex,
            user.soulFood);
        postDocument(user.age, doc.id, user.keyword,
          user.date.seconds, user.occupation, user.response, user.sex,
          user.soulFood);
      } else {
        console.log("No such document!");
      }
  }).catch((error) => {
    console.log("error getting document:", error);
  });
}


function getAllDocument() {
  try {
  db.collection("users")
  .get()
  .then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      const user = doc.data();
      console.log(user.age, doc.id, user.keyword,
        user.date.seconds, user.occupation, user.response, user.sex,
        user.soulFood);
      postDocument(user.age, doc.id, user.keyword,
        user.date.seconds, user.occupation, user.response, user.sex,
        user.soulFood);
        console.log(`${doc.id} => ${doc.data()}`);
    });
});
} catch (error) {
  console.log(error, 'error');
  }
}
function App() {
  return (
    <div className="App">
      <button onClick={() => getDocument()} >getDocument</button>
      <button onClick={() => getAllDocument()} >getAllDocument</button>
      </div>
  );
}

export default App;
