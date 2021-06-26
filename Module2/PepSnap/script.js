let videoElement = document.querySelector("video") ;
let recordButton = document.querySelector("#record") ;
let recordingState = false ;
let mediaRecorder ;

(async function(){
    let constraint = { video: true };
    let mediaStream = await navigator.mediaDevices.getUserMedia(constraint) ;
    videoElement.srcObject = mediaStream ;
    // console.log(mediaStream) ;
    mediaRecorder = new MediaRecorder(mediaStream) ;
    console.log(mediaRecorder) ;
    mediaRecorder.onstart = function()
    {
        console.log("Inside Start Video") ;
    } ;

    mediaRecorder.ondataavailable = function(e)
    {
        console.log("Inside on Data Available") ;
        // console.log(e) ;
        // console.log(e.data) ;
        let videoObject = new Blob([e.data], {type: "video/mp4"}) ;
        console.log(videoObject) ;
    };

    mediaRecorder.onstop = function() 
    {
        console.log("Inside on stop") ;
    };

    recordButton.addEventListener("click" , function()
    {
        if(recordingState)
        {
            // already recording is going on
            // stop the recording 
            mediaRecorder.stop() ;
            recordButton.innerHTML = "Record Video";
            recordingState = false ;

        }
        else
        {
            // start the recording
            mediaRecorder.start() ;
            recordButton.innerHTML = "Recording..";
            recordingState = true ;
        }
    }) ;

})() ;
