import Sidebar from './Sidebar';

let sidebar = null;
window.gmail = null;
const gmailLoader = () => {
  window.gmail = new Gmail();
};

window.refresh = function(f) {
  if( (/in/.test(document.readyState)) || (typeof Gmail === undefined) ) {
    setTimeout('window.refresh(' + f + ')', 10);
  } else {
    f();
  }
};

function isContact() {
  return location.href.search('#contact/') !== -1;
}

function isCalendar() {
  return (location.href.search('calendar') !== -1 && location.href.search('render#eventpage') && $('#coverinner').is(':visible'));
}

function checkReadyState() {
  window.refresh(gmailLoader);
  return new Promise((resolve, reject) => {
    const interval = window.setInterval(function() {
      if (window.gmail) {
        window.clearInterval(interval);
        resolve();
      }
    }, 1000);
  })
}

function observeCurrentUrl() {
  console.log('hello');
  let currentUrl = location.href;
  const urlObserver = window.setInterval(() => {
    if (currentUrl !== location.href && isContact()) {
      console.log('word');
      sidebar = new Sidebar(null, 'contact');
    } else if (currentUrl !== location.href && isCalendar()) {
      sidebar = new Sidebar(null, 'calendar');
    }
    currentUrl = location.href;
  }, 1000);
}

if (location.href.search('mail.google.com') !== -1) {
  checkReadyState().then(() => {
    console.log('1');
    if (window.gmail.check.is_inside_email()) {
      sidebar = new Sidebar(null, 'email');
    } else if (isContact()) {
      console.log('2');
      sidebar = new Sidebar(null, 'contact');
    }

    window.gmail.observe.on('open_email', () => {
      sidebar = new Sidebar(null, 'email');
    });
  });
} else if (location.href.search('www.google.com/contacts') !== -1) {
  if (isContact()) {
    sidebar = new Sidebar(null, 'contact');
  }
}

observeCurrentUrl();
