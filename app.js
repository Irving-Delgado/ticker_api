function yearStatus(){
	$.getJSON("https://api.worldtradingdata.com/api/v1/stock?symbol=ELA&api_token=vW7HF1jjz74mX03o7RAoGfvFTALmS3B581QvqzUYcbQ4OyYdFMohmBGylb5U", function(res){
	
		var stockDate = res['data'][0]['last_trade_time'];
		var timeZone = res['data'][0]['timezone'];
		var price = res['data'][0]['price'];
		var stockClose = res['data'][0]['close_yesterday'];
		var stockDayChange = res['data'][0]['day_change'];
		var changePct = res['data'][0]['change_pct'];

		var newStockDate =stockDate.replace(/ /g,"T");

		var date = new Date(newStockDate);
		var hour = date.getHours();
		var timeSpec = 'AM';
			
		if(hour == 0){
			hour = 12;
			timeSpec = 'AM';
		}else if(hour<12){
			hour = hour;
			timeSpec = 'AM';
		}else if(hour>12){
			hour = (hour -12);
			timeSpec = 'PM';
		}else{
			hour = 12;
			timeSpec = 'PM';
		}

		var minutes = date.getMinutes();

		if (minutes < 10) {minutes = "0" + minutes};

		var month = date.getMonth()+1;
		var year = date.getFullYear();
		var day = date.getDate()-1;
		var currentDate = date.getDate();

		if(day <10){
			day= '0'+ day;
		}if(month<10){
			month = '0' + month;
		}

		var fullDate = year+'-'+month+'-'+day;
		var todayDate = month+"/"+currentDate+"/"+year;
		var fullTime = hour+':'+minutes;

		$('#ticker_number').html('$'+price);

		if(changePct > 0){
			$('#ticker_percent').html('+'+stockDayChange+' '+'('+'+'+changePct+'%'+')');
		}else{
			$('#ticker_percent').html(stockDayChange+' '+'('+changePct+'%'+')');
		}

		var closeTime = new Date();
		var closeHour = (closeTime.getHours())+1;
		var closeMin = closeTime.getMinutes();
		var closed = closeHour+':'+closeMin;


		if(closeHour >= 17 || closeHour <= 9 && closeMin == 30 && timeSpec.equals('AM')){
			$('#ticker_time').html("Closed at: "+todayDate+' '+'5:00'+timeSpec+" "+timeZone);
		}else{
			$('#ticker_time').html("Last Traded at: "+todayDate+' '+fullTime+timeSpec+" "+timeZone);
		}
	
	})
}

yearStatus();
