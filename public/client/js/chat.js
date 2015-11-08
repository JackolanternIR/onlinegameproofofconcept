$(function(){

    //$('#loginbutton').click(function(){
    //    var loginName = $('#loginname').val();
    //    PT.socket.emit('login', loginName);
    //});
    //
    //$('#loginname').keypress(function(e){
    //    if (e.keyCode === 13) {
    //        $('#loginbutton').click();
    //        return false;
    //    }
    //});

    $('#chatinput').keypress(function(e){
        if(e.keyCode === 13) {
            $('#sendchat').click();
            return false;
        }
    });

    $('#sendchat').click(function(){
        var $chatinput = $('#chatinput');
        var chatText = $chatinput.val();
        $chatinput.val('');
        PT.socket.emit('message', chatText);
    });

    //PT.socket.on('loggedIn', function(){
    //    $('#loginui').css('display', 'none');
    //    $('#chatui').css('display', 'block');
    //});

    PT.socket.on('message', function(data){
        var $chatbox = $('#chatbox');
        $chatbox.append(data.name + ": " + data.msg + "\n");
        //odd code to scroll to the bottom of textarea on a new chat
        $chatbox.scrollTop($chatbox[0].scrollHeight);
    });

});