function sendMessage(username){
    var data = {
        username : username,
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
            $("#message").before("<p>"+data.username +" : "+data.message);
            $("h2").next().remove();
        }),
        error  : ((err)=>{
            console.log("unable to add to database");
            
        })
    })
}