$(document).ready(()=>{
    document.getElementById("message").onkeypress = function(e) {
        var key = e.charCode || e.keyCode || 0;
        if(key == 13){
            console.log("enter pressed");
            document.getElementById("send").click()
        }
    }
})

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
            ).insertAfter("#top")
            if($(".msgbox").length >= limit-1)
                $("#message").prev().remove();
            $("#message").val('');
        }),
        error  : ((err)=>{
            console.log("unable to add to database");
            
        })
    })
}