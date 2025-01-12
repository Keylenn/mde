interface ToastOptions {
  duration?: number;
}
function createToast(): (message: string, options?: ToastOptions) => void {
  const style = document.createElement("style");
  style.textContent = `
    .toast {
      visibility: hidden;
      background-color: rgba(0, 0, 0, 0.6);
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 2px;
      padding: .5em  1em;
      position: fixed;
      z-index: 99999;
      left: 50%;
      top: 30px;
      font-size: 16px;
      white-space: nowrap;
      transition: visibility 0s, opacity 0.5s linear;
      border-radius: 1.4em;
    }
    .toast.show {
      visibility: visible;
      opacity: 1;
    }
    .toast.hide {
      visibility: hidden;
      opacity: 0;
    }
  `;
  document.head.appendChild(style);

  let toastQueue: HTMLElement[] = [];

  const showToast = (message: string, options: ToastOptions = {}) => {
    const { duration = 3000 } = options;

    const displayNextToast = () => {
      if (toastQueue.length > 0) {
        const currentToast = toastQueue[0];
        currentToast.classList.add("show");

        setTimeout(() => {
          currentToast.classList.remove("show");
          currentToast.classList.add("hide");
          currentToast.addEventListener("transitionend", function () {
            currentToast.remove();
            toastQueue.shift();
            displayNextToast();
          });
        }, duration);
      }
    };

    const toast = document.createElement("div");
    toast.className = "toast";
    toast.textContent = message;

    document.body.appendChild(toast);

    toastQueue.push(toast);

    displayNextToast();
  };

  return showToast;
}

const showToast = createToast();

export default showToast;
