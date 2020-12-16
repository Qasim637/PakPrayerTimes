$(document).ready(function() {
fetch('pk.json').then((citydata)=>{
return citydata.json();
}).then((actualdata)=>{
var select=document.getElementById("select");
for(var i=0; i<actualdata.length;i++){
	var option=document.createElement("option");
	var txt=document.createTextNode(actualdata[i].city);
	option.appendChild(txt);
	option.setAttribute("value",actualdata[i].city);
	select.insertBefore(option,select.lastChild);
	}
	
	
	}).catch((err)=>{
	console.log(`hello is is your error ${err}`);
	});
    
    var city="Sadiq Abad"

	$('#select').select2();
      	// var dates=$("#datepicker").val();
      	let dates= new Date().toLocaleDateString('en-GB');


      	  console.log(dates);
		 var a=dates.toString().split('/');
		   


        console.log(`what is aa value ${a}`);

       var da=a;
      
	$('#select').on("change", function(e) {
		city=$("#select").val();

		$("#fcity").html(city);
		var dat=$("#datepicker").val();
		  da=dat.split('-');

        if ( $.fn.DataTable.isDataTable('#filtertable') ) {
	$('#filtertable').DataTable().destroy();
	}

	$('#filtertable tbody').empty();
        

		api(da[0],da[1],da[2],city);
		$("#fdate").html(dat);
        console.log(city);
   });



       
       api(da[0],da[1],da[2],city);



	var d=da;
	$( "#datepicker" ).datepicker({
	dateFormat: 'dd-mm-yy',
	changeMonth:true,
	changeYear:true,
	onSelect: function (dateText, inst) {
		$("#fdate").html(dateText);
	d=dateText.split('-');



	if ( $.fn.DataTable.isDataTable('#filtertable') ) {
	$('#filtertable').DataTable().destroy();
	}

	$('#filtertable tbody').empty();
	api(d[0],d[1],d[2],city);


    

	console.log(d);
	}
	
	})
	$( "#datepicker" ).datepicker('setDate','0');
	console.log(`helo  Qasim${d}`);
	var l="lahore";
	  

	function setvalue(){
       	var city=$("#select").val();
       	$("#fcity").html(city);
       	var dat=$("#datepicker").val();

        $("#fdate").html(dat);

       }


        setvalue();  
	
	

	function api(d,m,y, city){
		console.log(`first time what is date${d}`);
	var api=`http://api.aladhan.com/v1/calendarByCity?city=${city}&country=Pakistan&method=1&month=${m}&year=${y}`;
	fetch(api).then((res)=>{
	return res.json();
	}).then((actual)=>{
	console.log(actual);
	let output = '';
	for(let i in actual.data){
	output +=` <tr>
		<td>${actual.data[i].date.gregorian.weekday.en}</td>
		<td>${actual.data[i].date.readable}</td>
		<td><span class="mode mode_process">${actual.data[i].timings.Fajr}</span></td>
		<td>${actual.data[i].timings.Dhuhr}</td>
		<td>${actual.data[i].timings.Asr}</td>
		<td><span class="mode mode_on">${actual.data[i].timings.Maghrib}</span></td>
		<td>${actual.data[i].timings.Isha}</td>
	</tr>`;
	}
	document.querySelector('.tbody').insertAdjacentHTML("afterbegin",output);
	
	
	
	
	var dataTable = $('#filtertable').DataTable({
	'displayStart': d-1,	
	"pageLength":7,
	
	'aoColumnDefs':[{
	'bSortable':false,
	'aTargets':['nosort'],
	}],
	columnDefs:[
	{type:'date-dd-mm-yyyy',aTargets:[5]}
	],
	"aoColumns":[
	null,
	null,
	null,
	null,
	null,
	null,
	null
	],
	"order":false,
	"bLengthChange":false,
	"dom":'<"top">ct<"top"p><"clear">'
	});
	// $("#filterbox").keyup(function(){
	// dataTable.search(this.value).draw();
	});
	
	}



	
	}).catch((error)=>{
	console.log(error);
	});