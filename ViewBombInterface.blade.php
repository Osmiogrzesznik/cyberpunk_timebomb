<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width" />
    <title>Test</title>
</head>
<style type="text/css">
    body,
    button {
        --fg: #20f86c;
        --rd: red;
        --bg: rgba(0, 0, 0, .7);
        background-color: #000;
        color: #20f86c;
        font-family: digitalix;
        font-size: 3vw;
    }
    
    btn,
    td {
        border: 1px solid;
        padding: 2vw;
        background-color: rgba(0, 0, 0, .7);
        text-align: center;
        transition: all 0.2s;
    }

    .transitionable{
        transition: all 1s;
    }

    .boom{
        background-color: #ffffff;
        color:#ffffff;
        
        text-shadow: 0px 0px 10vw #fff;
        opacity:0;
    }
    
    btn {
        margin: 0.5em;
    }

    /* this makes clickables flash*/
    btn:active, td:active, {
        background-color: var(--fg);
        color: var(--bg);
    }
    
    .KBdisplay {
        border: 1px solid;
        /*         padding: 0.5em; */
        /*         margin: 0.5em; */
        background-color: rgba(0, 0, 0, .7);
        /*                              max-height:10vh; */
    }
    
    table {
        position: absolute;
        margin: 10vh;
        width: 80vw;
        height: 80vh;
    }
    
    .btnCNT {
        position: absolute;
        top: 5px;
        left: 5px;
    }
    
    .counterCNT {
        position: relative;
        /*         font-family: digitalix; */
    }
    
    .counterScreen {
        text-align: center;
        line-height: 100vw;   
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    
    .digits {
        font-family: digit;
        color: red;
        font-size: 20vw;
        text-align: center;
        line-height: 100vw;
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
        text-shadow: 0px 0px 10px red;
    }
    
    .cyber {
        font-family: digitalix;
    }
    
    @font-face {
        font-family: "digitalix";
        src: url("fonts/digitalix.ttf") format("truetype");
    }
    
    @font-face {
        font-family: "digit";
        src: url("fonts/Digit.ttf") format("truetype");
    }
    
    @font-face {
        font-family: "taximeter";
        src: url("fonts/taximeter.ttf") format("truetype");
    }
    
    @font-face {
        font-family: "alarm clock";
        src: url("fonts/alarm clock.ttf") format("truetype");
    }
    
    @font-face {
        font-family: "Computerfont";
        src: url("fonts/Computerfont.ttf") format("truetype");
    }
    
    .WrongAnswer {
        animation-name: shake;
        animation-duration: 0.1s;
        animation-iteration-count: 4;
        color: var(--rd);
        border-color: var(--rd);
    }
    
    .CorrectAnswer {
        animation-name: shine;
        animation-duration: 1s;
        animation-iteration-count: 1;
        animation-timing-function: cubic-bezier(0.190, 1.000, 0.220, 1.000);
        color: green;
        border-color: green;
        
        }
    
    .circle{
      margin:2vw;
    width:2vw;
    height:2vw;
    padding:2vw;
    border-radius:100%;
    
    }
    
    .flash{
     animation-name: flash;
    animation-duration: 1s;
    animation-iteration-count: infinite;
    animation-timing-function: cubic-bezier(0.190, 1.000, 0.220, 1.000);
    }
    
    .steppy{
    /* animation-timing-function: step(1,start) */
    }
    
    .redglow{
    background-color: var(--rd);
    box-shadow: 0px 0px 2vw var(--rd);
    }
    
    .greenglow{
    background-color: var(--fg);
    box-shadow: 0px 0px 2vw var(--fg);
    }
    
       @keyframes flash {
        0%,
        80% {
            opacity: 1;
        }
        /*         50% {
  opacity: .5;
          transform: scaleX(4) scaleY(0.1);
  } */
        100% {
            opacity: 0.2;
        }
    }
    
    
    
    @keyframes shine {
        0% {
            opacity: 1;
            /*  color:red; */
            transform: scaleX(1) scaleY(1);
        }
        /*         50% {
  opacity: .5;
          transform: scaleX(4) scaleY(0.1);
  } */
        100% {
            opacity: 0;
            transform: scaleX(16) scaleY(0);
            /*  color:red; */
        }
    }
    
    @keyframes shake {
        0%,
        100% {
            /*             opacity: 0; */
            transform: translateX(0);
        }
        50% {
            /*             opacity: 1; */
            transform: translateX(-40px);
        }
    }
    
    .timeElapsed{
        font-size:5vw;
    }
    
</style>

<body>

    <div id="counterCNT" class="counterCNT">
        <div id="counterMeas" class="counter">
            <span id="counter" class="digits">
            
   <span id="counter_hour">00</span>
  <span id="counter_colon1">:</span>
  <span id="counter_min">00</span>
  <span id="counter_colon2" class="flash">:</span>
  <span id="counter_sec">00</span>
</span>
<div id="counter_timeElapsed" class="timeElapsed">00000000000</div>
	
        </div>
        <div id="btnCNT" class="btnCNT">
            <!-- <btn id="str" onclick="cx.start()">
                ST
            </btn>
            <btn id="stp" onclick="cx.nxfnt()">
                nxfnt
            </btn>
            <btn id="boominf" onclick="togglenumkeyb()">
                numkeyb
            </btn> -->
            <div class="circle redglow flash"> </div>
            <div class="circle greenglow "> </div>
            
            </div>
            
        </div>
    </div>




    <table id="customKeybTMPLT" class="btnCNT" style="display:none">
        <tr>
            <td colspan="9" class="KBdisplay" style="  ">
                ____
            </td>
        </tr>
        <tr id="rowTMPLT" style="display:none">
        </tr>
        <tr style="display:none">
            <td id="keyTMPLT" style="display:none">
            </td>
        </tr>
    </table>


<audio id="ticksound" src="sounds/beep.mp3">
    not suoported
</audio>
<audio id="wrongSound" src="sounds/invalidAnswer.mp3">
    not suoported
</audio>
<script>
    <?php
    //$this->getdeviceLoginStatus() this will allways show error need to fix it in index.php
if ($this->getdeviceLoginStatus()) {
                echo "jsdataFromServer = " . json_encode($_SESSION,JSON_PRETTY_PRINT);
                //TODO here i should output not whole session but only timeset device name and so on
               // $this->showAppriopriatePage();
            } else {
               // not admin, not logged in, no path variable
               echo "jsdataFromServer = {error:'device not in db' , device_ip: '". $this->ip . "'};";
               // $this->showPageLoginForm();
            }
?>


</script>
    <script type="text/javascript" src="clockController.js"></script>
    <script type="text/javascript" src="touchKeyboard.js"></script>
    <script type="text/javascript" src="timebomb.js"></script>
</body>

</html>