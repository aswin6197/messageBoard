function edit(){
    $("#shadow").css("display","block");
    $("#formData").css("display","block");
    
}
$(document).ready(()=>{
    $("#shadow").click(()=>{
        $("#shadow").css("display","none");
        $("#formData").css("display","none");
        $("#formPasswd").css("display","none");
    });
});

function test(){
    // console.log("working")
    //check if passwd is correct
    let passwd = $("#editPasswd").val();
    let id = $("#id").val();
    // console.log(id);
    let data = {
        "passwd" : passwd,
        "id"    : id
    }

    $.ajax({
        url : "/passwd",
        type : "POST",
        data :  JSON.stringify(data),
        dataType : 'json',
        success : function(data){
            if(data == "true"){
                return true;
            }
            else {
                return false;
            }
        },
        
    })
    return false;
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
}
