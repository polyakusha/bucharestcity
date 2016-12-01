//Settings for the currencty stuff:

fx.base = "RON";

fx.settings = {
    from : "RON",
    to : "EUR"
};

function getAllRates (saint) {
    var metroEur = (fx.convert(saint.metro)).toFixed(2);
    console.log(metroEur);
}

//Settings for the countUp.js

var options = {
    useEasing : true,
    useGrouping : true,
    separator : '',
    decimal : '.',
    prefix : '',
    suffix : '€'
};

saintArr = Object.keys(saint);

//Main code

$(function () {

    //Money stuff
    $.getJSON(
        'http://api.fixer.io/latest',
        function(data) {
            if ( typeof fx !== "undefined" && fx.rates ) {
                fx.rates = data.rates;
                fx.base = data.base;
            } else {
                var fxSetup = {
                    rates : data.rates,
                    base : data.base
                };

            }
        }
    ).done(function () {
        //var something = parseFloat((fx.convert(saint.metro)).toFixed(2));
        //var demo = new CountUp('one', 0, 0, 2, 0.7, options);
        //demo.update(something);
        //demo.start();
    });

    //Animation stuff
    $('#fullpage').fullpage({
        anchors: saintArr,
        scrollingSpeed: 1200,
        //todo: анимация на CSS3
        easing: 'easeOutQuint',
        css3: false,
        controlArrows: true,
        //slidesNavigation: true,
        //slidesNavPosition: 'bottom',
        //menu: '#myMenu',
        //navigation: true,
        //navigationPosition: 'left',
        //navigationTooltips: saintArr,
        //showActiveTooltip: false,


        afterLoad: function(anchorLink, index){
            for (i in saintArr) {
                var saintArrPos = saintArr[i];
                if (anchorLink == saintArrPos && (saintArrPos != 'welcome' && saintArrPos != 'credits')) {
                    var convertMoney = parseFloat((fx.convert(saint[saintArrPos]).toFixed(2)));
                    var tagname = 's' + saintArrPos;
                    var myCounter = new CountUp(tagname, 0, convertMoney, 2, 1, options);
                    myCounter.start();
                }
            }
        }
    });

    $('.moveup').on('click', function(){
        $.fn.fullpage.moveSectionUp();
    });

    $('.movedown').on('click', function(){
        $.fn.fullpage.moveSectionDown();
    });

    //todo: объектик создать или что-то подобное

    $('.EUR').addClass('moneynow');

    $('.moneys').ready(
        $('.rates').on('click', function(){
            var newCurrencyTech = this.className;
            var newCurrency = newCurrencyTech.slice(-3);
            fx.settings = {
                from : "RON",
                to : newCurrency
            };
            if (newCurrency == 'EUR') {
                options.suffix = "€";
            }
            else if (newCurrency == 'USD') {
                options.suffix = "$";
            }
            else if (newCurrency == 'GBP') {
                options.suffix = "£";
            }
            else if (newCurrency == 'RUB') {
                options.suffix = ' ' + 'руб';
            }
            else if (newCurrency == 'NOK') {
                options.suffix = ' ' + "kr, –";
            }
            else if (newCurrency == 'SEK') {
                options.suffix = ' ' + 'kr';
            }
            else if (newCurrency == 'DKK') {
                options.suffix = ' ' + "kr.";
            }
            else {
                options.suffix = ' ' + newCurrency;
            }
            $('.moneynow').removeClass('moneynow');
            $(this).addClass('moneynow');
        })
    );


});

