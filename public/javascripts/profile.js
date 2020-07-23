function edit(){
    $("#shadow").css("display","block");
    $("#formData").css("display","block");
    $("#formPasswd").css("display","none");
    
}
$(document).ready(()=>{
    $("#shadow").click(()=>{
        $("#shadow").css("display","none");
        $("#formData").css("display","none");
        $("#formPasswd").css("display","none");
    });
    document.getElementById("editPasswd").onkeypress = function(e) {
        var key = e.charCode || e.keyCode || 0;     
        if (key == 13) {
        //   alert("I told you not to, why did you do it?");
          e.preventDefault();
          console.log("got enter")
          document.getElementById("passwdSubmit").click();
        }
      }
});


function test(index){
    let passwd;
    if(index == 0) 
        passwd = $("#editPasswd").children()[0].value;
    else    
        passwd = $("#editData").children()[3].value;
    let url = "/checkPasswd";
    let data = {
        passwd : passwd
    }
    $.ajax({
        url : url,
        contentType : 'application/json',
        data : JSON.stringify(data),
        dataType : "json",
        type : "POST",
        success : ((res)=>{
            if(res){
                console.log(res);
                if(index == 0)
                    $("#editPasswd").submit();
                else    
                    $("#editData").submit();
            }
            else{
                console.log("incorrect");
                if(index == 0){
                    $('#editPasswd').children()[0].placeholder = "Invalid Password"
                    $("#editPasswd").find("input[type=password]").val("");

                }
                else{
                    $("#editData").find("input[type=password]").val("");
                    $('#editData').children()[3].placeholder = "Invalid Password"
                }
            }
        }),
        error : ((err)=>{
            console.log("failed")
        })
    })
}


function hide(){
    $("#shadow").css("display","none");
    $("#formData").css("display","none");
    $("#formPasswd").css("display","none");
    
    console.log("hellohide")
}

function changePasswd(){
    $("#shadow").css("display","block");
    $("#formPasswd").css("display","block");
    $("#formData").css("display","none");
}
