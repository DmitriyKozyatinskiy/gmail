;(function() {
  $(document).on('gm:getSidebar', function() {
    console.log(4738);
    chrome.runtime.sendMessage({getSidebar: true}, response => {
      $(document).trigger('gm:setSidebar', [ response ]);
    });
  });
}());