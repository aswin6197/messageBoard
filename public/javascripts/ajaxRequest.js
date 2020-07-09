$("#message").keyup(event =>{
    if(event.keycode === 13){
        // $("#send").click();
    }
    console.log("work");
});

// $("textarea").autoResize();

function sendMessage(username,url,limit){
    console.log(username)
    console.log(url);
    console.log(limit);
    var data = {
        username : username,
        message : $("#message").val()
    }
    
    $.ajax({
        // url : "/",
        url : url,
        contentType : "application/json",
        data : JSON.stringify(data),
        dataType : "json",
        type : "POST",
        success : ((res) =>{
            console.log("added message to db")
            $("#message").prev().clone().html(
                "<li class='name'> "+data.username+"</li>"+
                "<li class='msg'>"+data.message+"</li>"
            ).insertAfter("#topic")
            if($(".msgbox").length >= limit-1)
                $("#message").prev().remove();
            $("#message").val('');
        }),
        error  : ((err)=>{
            console.log("unable to add to database");
            
        })
    })
}