window.gmail = new Gmail();
console.log('HELLO!: ', gmail);
gmail.observe.on('open_email', () => {
  console.log('ZDAROVA, ', gmail.get.user_email());
})