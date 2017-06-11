window.gmail = undefined;

const gmailLoader = () => {
  // NOTE: Always use the latest version of gmail.js from
  // https://github.com/KartikTalwar/gmail.js
  window.gmail = new Gmail();
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

refresh(gmailLoader);
