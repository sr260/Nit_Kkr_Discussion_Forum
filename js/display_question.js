//URL parsing
function ParseURL(parameter){
var s="https:/mytube.com/param.html?page=contact_us"
var myURL = s.substring(29);
// console.log(myURL)
var parameterArray= myURL.split('&');
console.log(parameterArray)
for(var i=0;i<parameterArray.length;i++){
	var currParameter=parameterArray[i].split('=');
	// console.log(currParameter);
	if(currParameter[0] == parameter){
		return currParameter[1];
	}
}
}
var myURL= new URL(window.location.href);
//console.log(myURL);

//displaying question
var questionid=myURL.searchParams.get("questionId");
var question=myURL.searchParams.get("Question");
console.log(questionid);
//var questionid=12;
document.getElementById('question1').innerHTML=question;
//displayong answers corresponding to opened question
var i=1;
firebase.database().ref('answerset/').once("value")
 .then(function(snapshot) {
 	console.log("h2");
 	document.getElementById('answer_list').innerHTML="";
 snapshot.forEach(function(childSnapshot) {
 	 console.log(questionid);
 	var total = childSnapshot.val().Answer;
 	var total1 = childSnapshot.val().QuestionID;
 	var total2 = childSnapshot.val().AnswerID;
 	if(total1==questionid){
 		//console.log(total1);
 		//console.log(questionid);
 		button=document.createElement('button');
 		button.setAttribute("style", "height:32px;width:80px;margin-left:650px;background-color:#1fada6;color:white;font-weight:bold");
        button.innerHTML="Like"+ " " +childSnapshot.val().Likes;
         var idlike=total2+"l";
           button.setAttribute('id',idlike);       
         
  
 		button1=document.createElement('button');
 		button1.setAttribute("style", "height:32px;width:100px;background-color:#2098b0;color:white;font-weight:bold");
 		button1.innerHTML="Dislike"+ " " +childSnapshot.val().Dislikes;
 		   var iddislike=total2+"d";
         button1.setAttribute('id',iddislike);
          button.addEventListener("click", myFunction1);

function myFunction1() {
  firebase.database().ref('/answerset').child(total2).once('value').then(function(snapshot){

        //here we will get the data
        var totalLikes = parseInt(snapshot.val().Likes) +1;
        var totalDislikes = parseInt(snapshot.val().Dislikes);
        var firebaseRef = firebase.database().ref('/answerset');
        firebaseRef.child(total2).set({
        	QuestionID : total1,
		AnswerID : total2,
		Answer : total,
		Likes : totalLikes,
		Dislikes: totalDislikes
        });
         document.getElementById(total2+"l").innerHTML="Like"+ "  " + totalLikes;
    })
}

 	$("#answer_list").append("Answer ");
 	$("#answer_list").append(i);
 	$("#answer_list").append(" ");  
	
 	$("#answer_list").append("<p>" + total + "</p>");

	$("#answer_list").append(button);
   $("#answer_list").append(" ");
    $("#answer_list").append(" ");
    $("#answer_list").append(" ");
	$("#answer_list").append(button1);
	 
	$("#answer_list").append("<br>");
	button1.addEventListener("click", myFunction);

function myFunction() {
  firebase.database().ref('/answerset').child(total2).once('value').then(function(snapshot){

        //here we will get the data
        var totalDislikes = parseInt(snapshot.val().Dislikes) +1;
        var totalLikes = parseInt(snapshot.val().Likes);
        var firebaseRef = firebase.database().ref('/answerset');
        firebaseRef.child(total2).set({
           QuestionID : total1,
		AnswerID : total2,
		Answer : total,
		Likes : totalLikes,
		Dislikes: totalDislikes
        });
       document.getElementById(total2+"d").innerHTML="Dislike"+ "  " + totalDislikes;
    })
  }
 	i++;}
 // console.log(total);
  });
 })
