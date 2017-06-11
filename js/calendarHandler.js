const SIDEBAR_WIDTH = 400;

function isCalendar() {
  return (location.href.search('calendar/render#eventpage') !== -1 && $('#coverinner').is(':visible'));
}

function setCalendarSidebar() {
  return new Promise(resolve => {
    chrome.runtime.sendMessage({ getSidebar: true }, response => {
      $('.js-sidebar').remove();
      var interval = window.setInterval(() => {
        const $mainContent = $('.ep-ro.ep');
        if ($mainContent.length) {
          window.clearInterval(interval);
          const $sidebarContainer = $mainContent.parent();
          const oldContentWidth = $mainContent.width();
          const contentWidth = oldContentWidth - SIDEBAR_WIDTH - 30;
          $mainContent.width(contentWidth).css('float', 'left');
          $sidebarContainer.append($('<div>', {
            html: response,
            class: 'js-sidebar-wrapper',
            style: 'float: right'
          }));
          $('.js-close-sidebar').on('click', () => {
            removeSideBar($mainContent, oldContentWidth);
          });
          $('.js-hide-sidebar').on('click', () => {
            $('.js-sidebar-body').toggle();
          });
        }
      }, 1000);
    });
  });
}

function removeSideBar($mainContent, oldContentWidth) {
  $('.js-sidebar').remove();
  $('.js-sidebar-wrapper').remove();
  if ($mainContent) {
    $mainContent.width(oldContentWidth).css('float', 'none');
  }
}

let currentUrl = location.href;
const urlObserver = window.setInterval(() => {
  if (currentUrl !== location.href && isCalendar()) {
    setCalendarSidebar();
  }
  currentUrl = location.href;
}, 1000);
