;(function() {
  console.log(chrome.runtime.id);
  function getSidebar() {
    return new Promise((resolve) => {
      const sidebarPromise = $.get('../html/sidebar.html');
      const crmPromise = $.get('../html/crm.html');
      const interactionsPromise = $.get('../html/interactions.html');
      const menuPromise = $.get('../html/menu.html');

      Promise.all([sidebarPromise, crmPromise, interactionsPromise, menuPromise]).then((data) => {
        let [ sidebarTemplate, crmTemplate, interactionsTemplate, menuTemplate ] = data;
        sidebarTemplate = Mustache.render(sidebarTemplate);
        crmTemplate = Mustache.render(crmTemplate);
        interactionsTemplate = Mustache.render(interactionsTemplate);
        menuTemplate = Mustache.render(menuTemplate);
        const $sidebar = $(sidebarTemplate);
        $sidebar.append($(crmTemplate)).append($(interactionsTemplate)).append($(menuTemplate));
        const resultTemplate = $sidebar.wrap('<div>').parent().html();
        resolve(resultTemplate)
      });
    });
  }

  chrome.runtime.onMessageExternal.addListener(function (request, sender, sendResponse) {
    if (request.getSidebar) {
      getSidebar().then(template => sendResponse(template));
    }
    return true;
  });

  chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.getSidebar) {
      getSidebar().then(template => sendResponse(template));
    }
    return true;
  });
}());
