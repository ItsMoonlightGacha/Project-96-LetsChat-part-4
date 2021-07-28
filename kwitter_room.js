
//ADD YOUR FIREBASE LINKS HERE
var firebaseConfig = {
      apiKey: "AIzaSyCJcwRfHukxc5HFnVR95bWGrLLnYNZiAkA",
      authDomain: "project-96-letschat-part-4.firebaseapp.com",
      projectId: "project-96-letschat-part-4",
      storageBucket: "project-96-letschat-part-4.appspot.com",
      messagingSenderId: "840382181622",
      appId: "1:840382181622:web:69936b264ef211b3a1bcd7"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);


    
    user_name=localStorage.getItem("user_name");
    document.getElementById("user_name").innerHTML="Welcome "+user_name+"!";

    function addroom() {
      room_name=document.getElementById("room_name").value;
      firebase.database().ref("/").child(room_name).update({
            purpose: "adding room name"
      });
      localStorage.setItem("room_name",room_name);
      window.location="kwitter_page.html";
}

function getData() {firebase.database().ref("/").on('value', function(snapshot) {document.getElementById("output").innerHTML = "";snapshot.forEach(function(childSnapshot) {childKey  = childSnapshot.key;
      firebase_message_id=childKey;
      message_data=childData;
       Room_names = childKey;
      //Start code
      console.log("room_name-"+Room_names);
      name=message_data['name'];
      message=message_data['message'];
      like=message_data['like'];
      name_with_tag="<h4>"+name+"<img class='user_tick' src='tick.png'> </h4>";
      message_with_tag="<h4 class='message_h4'>"+message+"</h4>";
      like_button="<button class='btn btn-warning' id="+firebase_message_id+"value="+like+"onclick='update_like(this.id)'>";
      span_with_tag="<span class='glyphicon glyphicon-thumbs-up'>like:"+like+"</span> </button> <hr>";
      row="<div class='room_name' id="+Room_names+"onclick='redirect_to_room_name(this.id)'>#"+Room_names+"</div> <hr>";
      document.getElementById("output").innerHTML=row;
      //End code
      });});}
getData();
function update_like(message_id) {
      button_id=message_id;
      likes=document.getElementById(button_id).value;
      update_likes=Number(likes)+1;
      firebase.database().ref(room_name).child(message_id).update({ like : updated_likes});
}
function redirect_to_room_name(name) {
      console.log(name);
      localStorage.setItem("room_name",name);
      window.location="kwitter_room.html";
}
function logout() {
      localStorage.removeItem("user_name");
      localStorage.removeItem("room_name");
      window.location="index.html";
}