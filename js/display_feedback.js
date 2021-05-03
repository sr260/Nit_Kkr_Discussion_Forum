var feedbackid,feedbacktopic,feedback,prev;
firebase.database().ref('feedback/').once('value').then(function(snapshot){
	if(snapshot.exists()){
       snapshot.forEach(function(childSnapshot) {
 	  prev=childSnapshot.val().FeedbackID;
  });
       
	}
	else{
		prev=0;
	}
})
function Ready(){
	// feedbackid= document.getElementById('feedbackid').value;
	feedbacktopic= document.getElementById('feedback_topic').value;
	feedback=document.getElementById('feedbacks').value;
}
 document.getElementById('insertfeedback').onclick=function(){
 	feedbackid=prev+1;
 	console.log(feedbackid)
 	Ready();
	firebase.database().ref('feedback/'+feedbackid).set({
		FeedbackID : feedbackid,
		FeddbackTopic : feedbacktopic,
		Feedback : feedback
	});
	feedbackid++;
	document.getElementById('feedback_topic').value="";
	document.getElementById('feedbacks').value="";
}
