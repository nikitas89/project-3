App.chat = App.cable.subscriptions.create("ChatChannel", {
      connected: function() {},
      disconnected: function() {},
      received: function(data) {

        var htmlDelete = `<div class="alert alert-success alert-dismissible fade show notifications" role="alert">
         <button type="button" class="close" data-dismiss="alert" aria-label="Close">
           <span aria-hidden="true">&times;</span>
         </button>   ${data.username} deleted: ${data.content}
    </div>`
        var htmlJoin = `<div class="alert alert-success alert-dismissible fade show notifications" role="alert">
     <button type="button" class="close" data-dismiss="alert" aria-label="Close">
       <span aria-hidden="true">&times;</span>
     </button>   ${data.username} joined: ${data.content}
    </div>`
        var htmlUpdate = `<div class="alert alert-success alert-dismissible fade show notifications" role="alert">
     <button type="button" class="close" data-dismiss="alert" aria-label="Close">
       <span aria-hidden="true">&times;</span>
     </button>   ${data.username} updated: ${data.content}
    </div>`
        // $('div.notifications').empty("")
        data.status === 1 ? $('div.notifications').append(htmlJoin) : ""
        data.status == 2 ? $('div.notifications').append(htmlDelete) : ""
        data.status == 3 ? $('div.notifications').append(htmlUpdate) : ""
        // console.log(data.location);
      });
    // App.cable.subscriptions.create({
    //   channel: "ChatChannel",
    //   room: "Best Room"
    // });
