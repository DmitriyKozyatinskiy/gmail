const EXTENSION_ID = 'aobdmpdbjiaodfjkkpahnkohghedhfih';
const SIDEBAR_WIDTH = 400;
let gmail;

const gmailLoader = () => {
  gmail = new Gmail();
};

function refresh(f) {
  if( (/in/.test(document.readyState)) || (typeof Gmail === undefined) ) {
    console.log(1);
    setTimeout('refresh(' + f + ')', 10);
  } else {
    console.log(2);
    f();
  }
}

function isContact() {
  return location.href.search('#contact/') !== -1;
}

function isCalendar() {
  return (location.href.search('calendar/render#eventpage') !== -1 && $('#coverinner').is(':visible'));
}

function checkReadyState() {
  refresh(gmailLoader);
  return new Promise((resolve, reject) => {
    const interval = window.setInterval(function() {
      if (gmail) {
        window.clearInterval(interval);
        resolve();
      }
    }, 1000);
  })
}

function setEmailSidebar() {
  return new Promise(resolve => {
    chrome.runtime.sendMessage(EXTENSION_ID, { getSidebar: true }, response => {
      $('.js-sidebar').remove();
      const $sidebarContainer = $('[role="presentation"] [role="complementary"]').closest('td');
      $sidebarContainer.html(response);
      $('.js-close-sidebar').on('click', () => {
        removeSideBar();
      });
    });
  });
}

function setContactSidebar() {
  return new Promise(resolve => {
    chrome.runtime.sendMessage(EXTENSION_ID, { getSidebar: true }, response => {
      $('.js-sidebar').remove();
      var interval = window.setInterval(() => {
        const $mainContent = $('[id=":2"] > .nH > .nH > .nH > .nH.age.abe.Tm:visible');
        if ($mainContent.length) {
          window.clearInterval(interval);
          let oldContentWidth = $mainContent.width();
          let contentWidth = oldContentWidth - SIDEBAR_WIDTH - 30;
          $mainContent.wrapInner($('<div>', {
            class: 'js-content-wrapper',
            style: 'float: left; overflow-x: auto; width: ' + contentWidth + 'px;'
          }));
          $mainContent.append($('<div>', {
            html: response,
            class: 'js-sidebar-wrapper',
            style: 'float: right'
          }));
          $('.js-close-sidebar').on('click', () => {
            removeSideBar();
          });
        }
      }, 1000);
    });
  });
}

function removeSideBar() {
  $('.js-sidebar').remove();
  $('.js-content-wrapper').find('> .nH').unwrap();
  $('.js-sidebar-wrapper').remove();
}

checkReadyState().then(() => {
  let currentUrl = location.href;
  if (gmail.check.is_inside_email()) {
    setEmailSidebar();
  } else if (isContact()) {
    setContactSidebar();
  }

  gmail.observe.on('open_email', () => {
    setEmailSidebar();
  });

  const urlObserver = window.setInterval(() => {
    if (currentUrl !== location.href && isContact()) {
      setContactSidebar();
    } else if (currentUrl !== location.href && isCalendar()) {
      setCalendarSidebar();
    }
    currentUrl = location.href;
  }, 1000);

  $(document).on('click', '.js-hide-sidebar', () => {
    $('.js-sidebar-body').toggle();
  }).on('click', '.js-menu-item', function() {
    const $menuItem = $(this);
    const tabId = $menuItem.attr('data-for');
    if (!tabId) {
      return;
    }
    $('.Sidebar__Body').addClass('hidden');
    $('#' + tabId).removeClass('hidden');
    $('.js-menu-item').removeClass('Sidebar__MenuItem--Selected');
    $menuItem.addClass('Sidebar__MenuItem--Selected');
  });
});


