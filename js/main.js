// function to update views on main page
for(var i=1;i<=6;i++)
{
    var topicName=document.getElementsByClassName("topic"+i)[0].innerHTML;

    //read data from database
    firebase.database().ref('/Topics').child(topicName).once('value').then(function(snapshot){
        var Views = parseInt(snapshot.val().Views);
        var topicId = snapshot.val().topicId;
        //console.log(topicId);
        var id = parseInt(topicId.charAt(topicId.length-1));
        document.getElementById("view"+id).innerHTML=Views;
    });
}


// function to fetch data for the topic with id = elem
function fetchData(elem){

    var topics=document.getElementsByClassName("topic"+elem.id)[0].innerHTML;

    //firebase data retreival function;
    firebase.database().ref('/Topics').child(topics).once('value').then(function(snapshot){

        //here we will get the data
        var topicId = snapshot.val().topicId;
        var totalViews = parseInt(snapshot.val().Views) +1;
        var firebaseRef = firebase.database().ref('/Topics');
        firebaseRef.child(topics).set({
            topicId : topicId,
            Views : totalViews
        });

        //redirect main page to question page
        var url = "QuestionPage.html?topicId=" + topicId + "&topicName=" + topics;
        window.location.href = url;
    
    })
}