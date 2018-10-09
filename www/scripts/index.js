// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkID=397704
// To debug code on page load in cordova-simulate or on Android devices/emulators: launch your app, set breakpoints, 
// and then run "window.location.reload()" in the JavaScript Console.
(function () {
    "use strict";

    document.addEventListener('deviceready', onDeviceReady.bind(this), false);

    function onDeviceReady() {
        // Handle the Cordova pause and resume events
        document.addEventListener('pause', onPause.bind(this), false);
        document.addEventListener('resume', onResume.bind(this), false);
       //document.getElementById("rec").addEventListener('click', onrecordvideo);
        //document.getElementById("btnFirstVideoAnswerNext").addEventListener('click', MoveToOtherQuestionList);
      
        // TODO: Cordova has been loaded. Perform any initialization that requires Cordova here.
        var parentElement = document.getElementById('deviceready');
        if (parentElement) {
            var listeningElement = parentElement.querySelector('.listening');
            var receivedElement = parentElement.querySelector('.received');
            listeningElement.setAttribute('style', 'display:none;');
            receivedElement.setAttribute('style', 'display:block;');
        }
    };

    function onPause() {
        // TODO: This application has been suspended. Save application state here.
    };

    function onResume() {
        // TODO: This application has been reactivated. Restore application state here.
    };

    function onrecordvideo() {
        var options =
            {
                limit: 1,
                duration: 30
            };
        navigator.device.capture.captureVideo(onsuccess, onerror, options);
       
    }

    function onsuccess(mediafiles) {


        var i, len;
        for (i = 0, len = mediaFiles.length; i < len; i += 1) {
            alert(1);
            uploadFile(mediaFiles[i]);
        }

    }

    // Called if something bad happens.
    //
    function onerror(error) {
        var msg = 'An error occurred during capture: ' + error.code;
        alert(msg, null, 'Uh oh!');
    }


    function uploadFile(mediaFile) {
        alert('upload call started');
        var ft = new FileTransfer(),
            path = mediaFile.fullPath,
            name = mediaFile.name;
        alert("Attempting to upload:" + path);

        var op;
        op = new FileUploadOptions();
        op.fileName = name;
        op.fileKey = "file";
        ft.upload(path,
            "http://appsdev.in/Dot2DotTraining/api/UploadMedia",
            function (result) {
                alert('Upload success: ' + result.responseCode);
                alert(result.bytesSent + ' bytes sent');

            },
            function (error) {
                alert('Error uploading file ' + path + ': ' + error.code);
            },
            op);
    }


    function MoveToOtherQuestionList() {

        if (window.localStorage.getItem("IsFirstVideoAnswer") == "Y") {
            window.location.href = 'OtherQuestions.html';
        }
        else {
            window.location.href = 'Finish.html';
        }
    };

   

})();