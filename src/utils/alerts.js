export function redirectAlert(title, icon, url) {
  let timerInterval;
  Swal.fire({
    title,
    icon,
    html: "Será redireccionado en <b></b> milisegundos.",
    timer: 2000,
    timerProgressBar: true,
    didOpen: () => {
      Swal.showLoading();
      const timer = Swal.getPopup().querySelector("b");
      timerInterval = setInterval(() => {
        timer.textContent = `${Swal.getTimerLeft()}`;
      }, 100);
    },
    willClose: () => {
      clearInterval(timerInterval);
      window.location.href = url;
    },
  }).then((result) => {
    /* Read more about handling dismissals below */
    if (result.dismiss === Swal.DismissReason.timer)
      console.log("I was closed by the timer");
  });
}
