window.onscroll = function() {scrollFunction()};
showStockInfo();

function scrollFunction() {
  if (document.body.scrollTop > 20|| document.documentElement.scrollTop > 20) {
    document.querySelector(".main_nav_sticky").style.top = "0";
    document.querySelector(".main_nav").style.display = "none";
  } else {
    document.querySelector(".main_nav_sticky").style.top = "-65px";
    document.querySelector(".main_nav").style.display = "inline-block";
  }
}


function showStockInfo(){
	$.getJSON("https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=DGSE&interval=15min&apikey=96OLO5409V1FXI32", function(res){
		$.getJSON("https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=DGSE&apikey=96OLO5409V1FXI32", function(daily){
		

		var stockDate = res['Meta Data']['3. Last Refreshed'];
		timeZone = res['Meta Data']['6. Time Zone'];

		var newStockDate =stockDate.replace(/ /g,"T");

		var date = new Date(newStockDate);
		var hour = date.getHours();
		var timeSpec = 'a.m';
		
		if(hour == 0){
			hour = 12;
			timeSpec = 'a.m';
		}else if(hour<12){
			hour = hour;
			timeSpec = 'a.m';
		}else if(hour>12){
			hour = (hour -12);
			timeSpec = 'p.m';
		}else{
			hour = 12;
			timeSpec = 'p.m';
		}

		var minutes = date.getMinutes();

		if (minutes < 10) {minutes = "0" + minutes};

		var month = date.getMonth()+1;
		var year = date.getFullYear();
		var day = date.getDate()-1;
		var currentDate = date.getDate();

		if(day <10){
			day= '0'+ day;
		}else{
			day= day;
		}

		var fullDate = year+'-'+month+'-'+day;
		var todayDate = month+"/"+currentDate+"/"+year;
		var fullTime = hour+':'+minutes;


		var stockOpen = res['Time Series (15min)'][stockDate]['1. open'];
		var stockHigh = res['Time Series (15min)'][stockDate]['2. high'];
		var stockLow = res['Time Series (15min)'][stockDate]['3. low'];
		var stockClose = res['Time Series (15min)'][stockDate]['4. close'];
		var stockVolume = res['Time Series (15min)'][stockDate]['5. volume'];

		var prevClose = daily['Time Series (Daily)'][fullDate]['4. close'];


		var stockMoney = stockClose * 100 / 100;
		var stockChange = prevClose-stockClose;
		var stockChangeDown = (stockChange/prevClose)*100;

		var stockPositive = stockClose - prevClose;
		var stockChangeUp = (stockPositive/prevClose)*100;


		if(prevClose>stockOpen){
			$('#ticker_percent').html('-'+(stockChange.toFixed(3)+" "+"("+'-'+stockChangeDown.toFixed(2)+"%"+")"));
		}else{
			$('#ticker_percent').html('+'+ (stockPositive.toFixed(3))+" "+"("+'+'+stockChangeUp.toFixed(2)+'%'+')');
		}

		
		


		$('#ticker_number').html('$'+stockMoney.toFixed(2));

		
		$('#ticker_time').html("as of "+todayDate+" "+fullTime+" "+timeSpec+" "+"("+timeZone+")");
		

		})
	})
}
