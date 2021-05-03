var myURL= new URL(window.location.href);
//console.log(myURL);

//displaying question
var topicId=myURL.searchParams.get("topicId");
var topic=myURL.searchParams.get("topicName");
console.log(topicId);
console.log(topic);
//Adding data to database
var database = firebase.database()
var p;
firebase.database().ref('questionset/').once('value').then(function(snapshot){
        if(snapshot.exists()){
          snapshot.forEach(function(childSnapshot){
            p=childSnapshot.val().quesid;
        });
          }
          else{
              p=0;
          }
  })

function save() {
  var quesid = p+1;
  var question = document.getElementById('question').value;
  //var topicId = 12;


  database.ref('questionset/' + quesid).set({
    quesid : quesid,
    question : question,
    topicId : topicId

  })
document.getElementById('question').value="";
  //alert('Saved')
}