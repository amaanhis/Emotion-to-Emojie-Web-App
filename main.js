prediction_1="";
prediction_2="";

Webcam.set(
    {
        width:300,
        height:300,
        image_format:'png',
        png_quality:90
    }
);

camera=document.getElementById("camera");
Webcam.attach('#camera');

function take_snapshot()
{
    Webcam.snap(function(data_uri)
    {
        document.getElementById("result").innerHTML='<img id="captured_image"src="'+data_uri+'">';

    });
}

console.log('ml5 version:',ml5.version);
classifier=ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/k4dg0pOFl/model.json',modelloaded);

function modelloaded()
    {
    console.log('model loaded');
    }
    function speak()
    {
        var synth=window.speechSynthesis;
        speak_data=" The first prediction is "+prediction;
        var utterthis=new SpeechSynthesisUtterance(speak_data);
        synth.speak(utterthis);
    }
    function check()
    {
        img=document.getElementById('captured_image');
        classifier.classify(img,gotresult);
    }
function gotresult(error,results)
{
    if (error)
    {
        console.log(error);
    }
    else {
        console.log(results);
        document.getElementById("result_emotion_name").innerHTML=results[0].label;
        prediction=results[0].label;
        speak();
        if (results[0].label=="happy")
        {
            document.getElementById("update_emoji").innnerHTML="&#128522;";

        }
        if (results[0].label=="sad")
        {
            document.getElementById("update_emoji").innnerHTML="&#128532;";

        }
        if (results[0].label=="angry")
        {
            document.getElementById("update_emoji").innnerHTML="&#128548;";

        }
        
    
}

}
