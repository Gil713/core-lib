const defaultOptions: IOptionsDownloadQRCode = {
  backgroundColor: "#fff",
  textColor: "#000",
  font: "12px Arial",
  textAlign: "center",
  renderedImageHeight: 250,
  renderedImageWidth: 250,
};

const drawElementToCanvas = async (
  imgElement: HTMLImageElement,
  canvas: HTMLCanvasElement,
  textNote: string,
  options: IOptionsDownloadQRCode,
) => {
  const context = canvas.getContext("2d");
  if (!context) {
    return;
  }

  // draw background
  context.fillStyle = options.backgroundColor;
  context.fillRect(0, 0, canvas.width, canvas.height);

  // draw image
  context.drawImage(imgElement, 0, 0, canvas.width, canvas.width); // height and with of image are the same

  // draw text note
  if (textNote) {
    context.font = options.font;
    context.fillStyle = options.textColor;
    context.textAlign = options.textAlign;
    context.fillText(textNote, canvas.width / 2, canvas.height - 20);
  }
};

/**
 * Download QR code by element id
 * @param wrapperElementId - The parent element id which wraps the QR code image and text note
 * @param imageId - id of the Image component, it has a div tag which wraps the img tag
 * @param textId - id of the text note
 * @param options - options are used for styling the image and text note
 */

export type IOptionsDownloadQRCode = {
  backgroundColor: string;
  textColor: string;
  font: string;
  textAlign: CanvasTextAlign;
  renderedImageHeight: number;
  renderedImageWidth: number;
};

// TODO check later, downloadQRCodeByElementId and downloadQRCode could be duplicated
export const downloadQRCodeByElementId = (
  wrapperElementId: string,
  imageId: string,
  textId: string,
  options?: IOptionsDownloadQRCode,
) => {
  const _options = { ...defaultOptions, ...options };
  const parentWrapperElement = document.getElementById(wrapperElementId);
  const wrapperImageElement = parentWrapperElement?.querySelector(`#${imageId}`);
  const imageTag = wrapperImageElement?.querySelector("img");
  const textNote = document.getElementById(textId)?.innerHTML || "";

  if (!parentWrapperElement || !wrapperImageElement || !imageTag) {
    return;
  }

  const canvas = document.createElement("canvas");
  const img = new Image();
  img.crossOrigin = "anonymous";
  img.src = imageTag.src;

  img.onload = () => {
    canvas.width = _options.renderedImageWidth;
    canvas.height = textNote ? _options.renderedImageHeight + 50 : _options.renderedImageWidth; // plus 50 for text note

    drawElementToCanvas(img, canvas, textNote, _options).then(() => {
      const tagA = document.createElement("a");
      tagA.href = canvas.toDataURL("image/png");
      tagA.download = "qr-code.png";
      tagA.click();
    });
  };
};

// downloadQRCode(qrcode: HTMLElement) => download qrcode
export const downloadQRCode = (qrcode: HTMLElement) => {
  const canvasImage = qrcode.getElementsByTagName("canvas")[0].toDataURL("image/png");
  const xhr = new XMLHttpRequest();
  xhr.responseType = "blob";
  xhr.onload = function () {
    const a = document.createElement("a");
    a.href = window.URL.createObjectURL(xhr.response);
    a.download = "qrcode.png";
    a.style.display = "none";
    document.body.appendChild(a);
    a.click();
    a.remove();
  };
  xhr.open("GET", canvasImage || "");
  xhr.send();
};
