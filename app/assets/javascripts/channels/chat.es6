App.chat = App.cable.subscriptions.create("ChatChannel", {
  connected: function() {},
  disconnected: function() {},
  received: function(data) {
    var htmlDelete =
      `<div class="alert alert-success alert-dismissible fade show " role="alert">
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
         <span aria-hidden="true">&times;</span>
        </button>   ${data.username} deleted: ${data.content}
      </div>`

    var htmlJoin =
      `<div class="alert alert-success alert-dismissible fade show " role="alert">
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>   ${data.username} joined: ${data.content}
      </div>`

    var htmlUpdate =
      `<div class="alert alert-success alert-dismissible fade show " role="alert">
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>   ${data.username} updated: ${data.content}
      </div>`

    // $('div.notifications').empty("")
    data.status === 1 ? $('div.notifications').append(htmlJoin) : ""
    if (data.status === 2) {
      $('div.notifications').append(htmlDelete)
      $(`div#${data.content}`).empty()
      // $( `#group_name:contains('${data.content}')`).remove()
    }

    //remove the grp name from show
    // console.log('data.content', data.content, typeof data.content);
    data.status === 3 ? $('div.notifications').append(htmlUpdate) : ""
    // console.log(data.location)
    console.log(data.group_locations);



    data.status === 4 ? console.log(data.restaurant) : ""
  }
});

// App.cable.subscriptions.create({
//   channel: "ChatChannel",
//   room: "Best Room"
// });
