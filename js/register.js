if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('/sw.js')
    .then(function reg () {
      console.log('Service Worker registration succeeded!');
    })
    .catch(function (error) {
      console.log(error);
    });
}
