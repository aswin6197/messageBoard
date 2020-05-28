function sendMessage(){
    var data = {
        username : $("#username").val(),
        message : $("#message").val()
    }
    
    $.ajax({
        url : "/",
        contentType : "application/json",
        data : JSON.stringify(data),
        dataType : "json",
        type : "POST",
        success : ((res) =>{
            console.log("added message to db")
            $("#username").before("<p>"+data.username +" : "+data.message);
        }),
        error  : ((err)=>{
            console.log("unable to add to database");
            
        })
    })
}