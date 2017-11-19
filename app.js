function FeedList() {
    xmlHttp = new XMLHttpRequest();
    username = document.getElementById("git-account").value;
    xmlHttp.open( "GET", 'https://api.github.com/users/'+username+'/received_events', false );
    xmlHttp.send( null );
    
    data = JSON.parse(xmlHttp.responseText);
    div = document.getElementById("slide");
    div.innerHTML = '';

    if (xmlHttp.status == 404 ){
        div.innerHTML = "Are you sure it's such a user?";
    }

    for(i = 0; i < 30; i++){
        var type = data[i]['type']
        var reponame = data[i]['repo']['name']
        var repourl = data[i]['repo']['url']
        var actor = data[i]['actor']['url']
        var times = new Date(data[i]['created_at'])
        
        var delta = Math.round((new Date() - times) / 1000);
        
        var minute = 60,
            hour = minute * 60,
            day = hour * 24,
            week = day * 7;
        
        var fuzzy;
        
        if (delta < 30) {
            fuzzy = 'just then.';
        } else if (delta < minute) {
            fuzzy = delta + ' seconds ago.';
        } else if (delta < 2 * minute) {
            fuzzy = 'a minute ago.';
        } else if (delta < hour) {
            fuzzy = Math.floor(delta / minute) + ' minutes ago.';
        } else if (Math.floor(delta / hour) == 1) {
            fuzzy = '1 hour ago.';
        } else if (delta < day) {
            fuzzy = Math.floor(delta / hour) + ' hours ago.';
        } else if (delta < day * 2) {
            fuzzy = 'yesterday';
        }
        
        if (data[i]['type'] == "WatchEvent"){
            var icons = 'fa fa-star';
            }
        else if(data[i]['type'] == "CreateEvent"){
            var icons = 'fa fa-book';}
        else if(data[i]['type'] == "PublicEvent"){
            var icons = 'fa fa-bullhorn';}
        else{var icons = 'fa fa-scissors';}
        
        div.insertAdjacentHTML('beforeend',
        "<div class='message ' data-component='message'>"+ 
        "<a href='https://github.com/"+ data[i]['actor']['login'] +"'>" +
        data[i]['actor']['login'] + 
        "</a> - <span class='"+ 
        icons+
        "'></span> "+
        " - <a href='https://github.com/"+ data[i]['repo']['name'] +"'>" +
        data[i]['repo']['name'] + "</a> - "+"<span>"+ fuzzy +"</span></div>")
        }
}