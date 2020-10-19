const videoElement = document.querySelector("#video");
const startButton = document.querySelector("#start");
const stopButton = document.querySelector("#stop");

async function displayPictureInPicture() {
    try {
        const mediaStream = await navigator.mediaDevices.getDisplayMedia();
        videoElement.srcObject = mediaStream;
        videoElement.onloadedmetadata = async () => {
            videoElement.play();
            await videoElement.requestPictureInPicture();
        }
    } catch (error) {
        stopButton.click();
        console.log("error: ", error);
    }
}

startButton.addEventListener("click", async () => {
    await displayPictureInPicture();
    startButton.hidden = true;
    stopButton.hidden = false;
});

stopButton.addEventListener("click", async () => {
    if(document.pictureInPictureElement){
        await document.exitPictureInPicture();
    }
    stopButton.hidden = true;
    startButton.hidden = false;
});

videoElement.addEventListener("leavepictureinpicture", () => {
    stopButton.click();
})

