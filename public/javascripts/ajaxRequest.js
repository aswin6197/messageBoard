$("#message").keyup(event =>{
    if(event.keycode === 13){
        $("#send").click();
    }
    console.log("work");
});

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
            $("#message").prev().clone().html(
                "<p class='name'> "+data.username+"</p>"+
                "<p class='msg'>"+data.message+"</p>"
            ).insertBefore("#message");
            if($(".msgbox").length >= 10)
                $("h2").next().remove();
            $("#message").val('');
        }),
        error  : ((err)=>{
            console.log("unable to add to database");
            
        })
    })
}