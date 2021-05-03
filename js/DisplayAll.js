//var topicId=12;
var myURL= new URL(window.location.href);
console.log(myURL);

//displaying question
var topicId=myURL.searchParams.get("topicId");
var topic=myURL.searchParams.get("topicName");
console.log(topicId);
console.log(topic);
var i = 1;
firebase
  .database()
  .ref("questionset/")
  .once("value")
  .then(function (snapshot) {
    document.getElementById("questionlist").innerHTML = "";
    let co = 1;
    snapshot.forEach(function (childSnapshot) {
      console.log(topicId);
      var total = childSnapshot.val().question;
      let quesId = childSnapshot.val().quesid;
      // console.log(total, quesId);
      // let obj = { quesId, total: "&#39;" + total + "&#39;" };
      // console.log(obj);
      let ques = `<details id="ques${quesId}" onclick = {clickHandler(${quesId})}>
    <summary >Question  : ${total}</summary>
  </details>`;
      co++;
      var total1 = childSnapshot.val().topicId;
      if (total1 == topicId) {
        $("#questionlist").append(ques);
        i++;
      }
      console.log(total);
    });
  });

function clickHandler(e) {
  // console.log(e, s);
  // localStorage.setItem("questionId", e);
  let ques = document.getElementById(`ques${e}`).innerText;
  var url = "AnswerPage.html?questionId=" + e + "&Question=" + ques;
  
  window.location.href = url;
  console.log(ques, e);
}