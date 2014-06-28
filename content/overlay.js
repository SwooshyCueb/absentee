window.addEventListener('load', function()  {
	
	Absentee.startup();     
}, false);

var Absentee = {

	browser : null,
	tabview : null,

	winstate : -1,


	startup : function() {
		this.browser = document.getElementById("main-window");
		this.browser.addEventListener('sizemodechange', function () {
			console.log('sizemodechange event triggered. If this is working, we do not need to monitor resize events any more.')
		}, false);
		//For some reason, sizemodechange never triggers...
		this.browser.addEventListener('resize', function () {
			Absentee.onsizemodechange();
		}, false);
		this.onsizemodechange();
		this.tabview = document.getElementById("tabbrowser-tabs");
		//It's very possible for the attribute to not exist yet, so we'll create it if it doesn't.
		if(!this.tabview.hasAttribute("overflow")) {
			this.tabview.setAttribute("overflow", "");
		}
		var taboverflowmonitor = new MutationObserver(function() {
			Absentee.ontaboverflow();
		});
		taboverflowmonitor.observe(this.tabview, { attributes: true, attributeFilter: ["overflow"]});
		this.ontaboverflow();
	},

	onsizemodechange : function () {
		if (this.winstate === window.windowState) {
		} else if (window.windowState === 1) {
			this.browser.setAttribute("abs-winstate", "maximized");
			this.winstate = window.windowState;
		} else if (window.windowState === 2) {
			//this.browser.setAttribute("abs-winstate", "minimized");
			//this.winstate = window.windowState;
			//don't update, we don't care
		} else if (window.windowState === 3) {
			this.browser.setAttribute("abs-winstate", "normal");
			this.winstate = window.windowState;
		} else if (window.windowState === 4) {
			this.browser.setAttribute("abs-winstate", "fullscreen");
			this.winstate = window.windowState;
		}
	},

	ontaboverflow : function () {
		if(this.tabview.getAttribute("overflow") == "true") {
			this.browser.setAttribute("tab-overflow", "true");
		} else {
			this.browser.setAttribute("tab-overflow", "false");
		}
	},

	maximize : function() {
		if (window.windowState === 1) {
			window.restore();
		} else if (window.windowState === 2) {
			//If we get here, something's broken
			console.log("Maximize/restore function called while minimized.");
		} else if (window.windowState === 3) {
			window.maximize();
		} else if (window.windowState === 4) {
			window.restore();
		}
	}


};

