app.config.enableScroll = true;
app.config.enableMessageLog = false;
var ua = navigator.userAgent.toLowerCase();
if(ua.indexOf("micromessenger") !== -1){
	app.config.enableNavbar = false;
}else{
	app.config.enableNavbar = true;
}
app.config.enableToolbar = true;

app.config.enableTransition = false;
app.config.enableContent = {
	cacheLength:2
}
app.config.templateEngine = {
	load: function(url, callback) {
		$.get(url, callback);
	},
	compile : function(text) {
		return Mustache.compile(text);
	},

	render : function(compiled, data) {
		return compiled(data);
	}
}

