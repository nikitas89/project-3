var groupLocationsList = [];
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
    data.status === 3 ? $('div.notifications').append(htmlUpdate) : ""
    // setting data.group_locations in global variable to expose it to gmaps.es6 and sript.es6
    var temp = data.group_locations;

    temp.forEach(position => {
      for(var x in position) {
        position[x] = parseFloat(position[x]);
      }
    })

    groupLocationsList = temp

    data.status === 4 ? console.log('data.restaurant: ', data.restaurant) : ""
  }
});

// App.cable.subscriptions.create({
//   channel: "ChatChannel",
//   room: "Best Room"
// });
