App.chat = App.cable.subscriptions.create("ChatChannel", {
  connected: function() {},
  disconnected: function() {},
  received: function(data) {
    // alert(data.content)
    // console.log(data.content);
    // console.log(data.username);
    // alert(data.username)
    // $('div.notifications').append(data.username + ' joined '+ data.content)
    //     var htmlDelete = `<div class="alert alert-success alert-dismissible fade show notifications" role="alert">
    //      <button type="button" class="close" data-dismiss="alert" aria-label="Close">
    //        <span aria-hidden="true">&times;</span>
    //      </button>   ${data.username} deleted: ${data.content}
    // </div>`
    //     var htmlJoin = `<div class="alert alert-success alert-dismissible fade show notifications" role="alert">
    //  <button type="button" class="close" data-dismiss="alert" aria-label="Close">
    //    <span aria-hidden="true">&times;</span>
    //  </button>   ${data.username} joined: ${data.content}
    // </div>`

    // data.status===1? $('div.notifications').append(htmlJoin) :""

    // data.status==2?$('div.notifications').append(htmlDelete): ""
    // $('div.notifications').append(htmlDelete): ""
    // $('div.notifications').empty("")
    $('div.notifications').append(data.username + ' : ' + data.content)
    console.log(data.location);
    // $('div.notifications').append(data.notification + "global notification")
    // if (data.mention) {
    //   $('div.notifications').empty("")
    //   $('div.notifications').append(data.username + ' : ' + data.content)
    // }
  }
});

// App.cable.subscriptions.create({
//   channel: "ChatChannel",
//   room: "Best Room"
// });
