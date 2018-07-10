# driveAngular

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=1900, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link href="css/style.css" type="text/css" rel="stylesheet">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css" integrity="sha384-WskhaSGFgHYWDcbwN70/dfYBj47jz9qbsMId/iRN3ewGhXQFZCSftd1LZCfmhktB" crossorigin="anonymous">
    <title>ITS Exam</title>
</head>

<body>

    <div class="container-fluid no-gutters">
        <div class="row no-gutters">
            <div class="col-xl-12">
                <img src="res/img/first_section/drawable-xxxhdpi/First section.png" alt="first section image">
            </div>
        </div>

        <div class="row no-gutters">
            <div class="col-xs-12 col-xl-6">
                <div class="section-2">
                    <p class="title">what are we good at</p>
                    <div class="section-text">
                        <p class="text">
                            The perfectionism makes some sense, but seems at odds with the current infatuation with Jobs. Jobs couldn't find the right beige from a set of 200 and had to design a new beige. He seemed like the ultimate perfectionist – sometimes.
                        </p>
                        <p class="text">
                            The perfectionism makes some sense, but seems at odds with the current infatuation with Jobs. Jobs couldn't find the right beige from a set of 200 and had to design a new beige. He seemed like the ultimate perfectionist – sometimes.
                        </p>
                    </div>
                </div>
            </div>

            <div class="col-xl-6">
                <div class="rectangle-1">
                    <img src="res/img/gameboy/drawable-xxxhdpi/gameboy.png" alt="gameboy image">
                </div>
            </div>
        </div>

        <div class="section-3">
            <div class="row no-gutters">
                <div class="col-xl-6">
                    <div class="rectangle-2">
                        <img id="bitmap-image" src="res/img/bitmap/drawable-xxxhdpi/Bitmap.png" alt="bitmap image">
                        <div class="down-arrow clickable">
                            <span>down</span>
                            <img src="res/img/arrow-shape/drawable-mdpi/Arrow Copy.png" alt="arrow shape icon">
                        </div>
                    </div>
                </div>
                <div class="col-xl-6">
                    <p class="title">our philosophy</p>
                    <p class="text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut tempus dui gravida ligula malesuada lacinia. Pellentesque id justo a eros condimentum bibendum. Cras eget ipsum non nisl mattis feugiat eget vitae mauris.</p>
                </div>
            </div>
        </div>

        <div class="footer">
            <div class="row no-gutters">
                <div class="col-xl-6">
                    <div class="content-text">
                        <p class="title">stay <br> in touch</p>
                        <p class="text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut tempus dui gravida ligula malesuada lacinia. Pellentesque id justo a eros condimentum bibendum. Cras eget ipsum non nisl mattis feugiat eget vitae mauris.</p>
                    </div>
                    <div class="content-map">
                        <div class="map-text">
                            <img src="res/img/map-shape/drawable-mdpi/Map Shape.png" alt="map shape icon">
                            <p>EXPAND THE MAP</p>
                        </div>
                        <div id="map"></div>
                    </div>
                </div>
                <div class="col-xl-6">
                    <div class="contact-form">
                        <form>
                            <input id="name-input" type="text" placeholder="Your name">
                            <input id="email-input" type="email" placeholder="Your email">
                            <input id="number-input" type="tel" placeholder="Phone number">
                            <input id="message-input" type="text" placeholder="Message">
                            <button type="submit">SEND IT</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>

    </div>


    <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js" integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/js/bootstrap.min.js" integrity="sha384-smHYKdLADwkXOn1EmN1qk/HfnUcbVRZyYmZ4qpPea6sjB/pTJ0euyQp0Mk8ck+5T" crossorigin="anonymous"></script>
    <script src="js/script.js"></script>
    <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBu-916DdpKAjTmJNIgngS6HL_kDIKU0aU&callback=myMap"></script>
</body>

</html>





css 



*,
*:before,
*:after {
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
}

.container-fluid {
    padding: 0 !important;
}

@font-face {
    font-family: 'montserrat-black';
    src: url(../res/fonts/montserrat/Montserrat-Black.otf);
}

@font-face {
    font-family: 'montserrat-regular';
    src: url(../res/fonts/montserrat/Montserrat-Regular.otf);
}

@font-face {
    font-family: 'helvetica-neue';
    src: url(../res/fonts/helvetica-neue/HelveticaNeue.ttf);
}

.no-gutters {
    margin-right: 0;
    margin-left: 0;
    >.col,
    >[class*="col-"] {
        padding-right: 0;
        padding-left: 0;
    }
}

.title {
    font-family: montserrat-black;
    font-size: 86.4px;
    line-height: 87px;
    letter-spacing: -0.62px;
    color: #f35564;
    text-transform: uppercase;
}

.text {
    font-family: helvetica-neue;
    font-size: 23.4px;
    line-height: 32px;
    letter-spacing: -0.17;
    color: #798293;
    font-weight: bold;
}

.section-2 {
    margin-top: 163px;
    margin-left: 78px;
}

.section-2 .title {
    width: 615px;
    margin-bottom: 43px;
}

.section-text {
    width: 673px;
    height: 304px;
}

.rectangle-1 {
    width: 950px;
    height: 508px;
    background-color: #48c074;
    margin-top: 311px;
    position: relative;
}

.rectangle-1 img {
    position: absolute;
    right: 65px;
    bottom: 30px;
}

.rectangle-2 {
    width: 809px;
    height: 1170px;
    background-color: #f35564;
    position: relative;
}

.rectangle-2 #bitmap-image {
    position: absolute;
    width: 1200px;
    height: 786px;
    left: 350px;
    bottom: -77px;
}

.rectangle-2 .down-arrow {
    position: absolute;
    left: 1634px;
    bottom: -77px;
}

.rectangle-2 .down-arrow:hover {
    cursor: pointer;
}

.rectangle-2 .down-arrow img {
    width: 25.8px;
    height: 48px;
}

.rectangle-2 .down-arrow span {
    font-family: montserrat-regular;
    font-size: 13.4px;
    letter-spacing: -0.1;
    color: #798293;
    text-transform: uppercase;
    display: block;
    -webkit-transform: rotate(-90deg);
    -moz-transform: rotate(-90deg);
    filter: progid: DXImageTransform.Microsoft.BasicImage(rotation=3);
    position: relative;
    right: 11px;
    bottom: 15px;
}

.section-3 {
    margin-top: 151.1px;
}

.section-3 .title {
    width: 608px;
    height: 261px;
}

.section-3 .text {
    width: 673px;
}

.footer {
    margin-top: 229px;
}

.footer .content-text {
    margin-left: 178px;
}

.footer .content-text .title {
    width: 452px;
    margin-bottom: 43px;
}

.footer .content-text .text {
    width: 673px;
}

.footer .content-map {
    margin-top: 86px;
    width: 798px;
    height: 250px;
}

.footer .content-map .map-text {
    width: 258px;
    height: 100%;
    background-color: #f9c907;
    position: relative;
    float: left;
}

.footer .content-map .map-text img {
    position: absolute;
    left: 51px;
    top: 57px;
}

.footer .content-map .map-text p {
    position: absolute;
    left: 51px;
    top: 137px;
    font-family: montserrat-black;
    font-size: 30.4px;
    line-height: 28px;
    letter-spacing: -0.22px;
    color: #5b37b2;
}

.footer .content-map #map {
    width: 540px;
    height: 100%;
    float: right;
}

.footer .contact-form {
    float: right;
    margin-top: 142px;
    width: 686px;
    margin-right: 189px;
}

.footer .contact-form form input {
    width: 100%;
    height: 71px;
}

.footer .contact-form form input:nth-child(odd) {
    margin-bottom: 26px;
}

.footer .contact-form form #email-input {
    margin-bottom: 24px;
}

.footer .contact-form form #message-input {
    margin-bottom: 20px;
}

.footer .contact-form form button[type=submit] {
    float: right;
    width: 301px;
    height: 71px;
    font-size: 28.4px;
}

