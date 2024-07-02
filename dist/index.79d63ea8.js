// Toggle Menu
$(window).load(function() {
    $(".btn-nav").on("click tap", function() {
        $(".nav-content").toggleClass("showNav hideNav").removeClass("hidden");
        $(this).toggleClass("animated");
    });
});
// Filtered Portfolio
var shuffleme = function($1) {
    "use strict";
    var $grid = $1("#grid"), $filterOptions = $1(".portfolio-sorting li"), $sizer = $grid.find(".shuffle_sizer"), init = function() {
        // None of these need to be executed synchronously
        setTimeout(function() {
            listen();
            setupFilters();
        }, 100);
        // instantiate the plugin
        $grid.shuffle({
            itemSelector: '[class*="col-"]',
            sizer: $sizer
        });
    }, // Set up button clicks
    setupFilters = function() {
        var $btns = $filterOptions.children();
        $btns.on("click", function(e) {
            e.preventDefault();
            var $this = $1(this), isActive = $this.hasClass("active"), group = isActive ? "all" : $this.data("group");
            // Hide current label, show current label in title
            if (!isActive) $1(".portfolio-sorting li a").removeClass("active");
            $this.toggleClass("active");
            // Filter elements
            $grid.shuffle("shuffle", group);
        });
        $btns = null;
    }, listen = function() {
        var debouncedLayout = $1.throttle(300, function() {
            $grid.shuffle("update");
        });
        // Get all images inside shuffle
        $grid.find("img").each(function() {
            var proxyImage;
            // Image already loaded
            if (this.complete && this.naturalWidth !== undefined) return;
            // If none of the checks above matched, simulate loading on detached element.
            proxyImage = new Image();
            $1(proxyImage).on("load", function() {
                $1(this).off("load");
                debouncedLayout();
            });
            proxyImage.src = this.src;
        });
        setTimeout(function() {
            debouncedLayout();
        }, 500);
    };
    return {
        init: init
    };
}(jQuery);
$(document).ready(function() {
    shuffleme.init(); //filter portfolio
});

//# sourceMappingURL=index.79d63ea8.js.map
