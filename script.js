const URL = "https://ta.wikipedia.org/w/api.php";
var loaderVal = 0
var total_time;
var totalSeconds;
var pattern = /[\u0b80-\u0bff][\u0bbe-\u0bcd\u0bd7]?/g
var success_count = 0
var timer;
var carPos = 10
var current_index = 0
var split_content;
var total_count;
let last_word_count = 1
let typedWords = 0
disabled_key_list = [116, 8, 46, 13, 16, 17, 20, 123]
end_strings = ["", ".", ","]
hiddenContentSpan = document.getElementById("hidden-typed-span-content")

//canvas
const canvas = document.getElementById('canvas')
canvas.width = $(".container").width()
canvas.height = 60
const ctx = canvas.getContext('2d');
carUpdate(carPos, 10, ctx)
// if (canvas.getContext) {
// 	canvas.width = $("#card").width()
// 	canvas.height = 60 
// 	const ctx = canvas.getContext('2d');
// 	carUpdate(carPos, 10, ctx)
// }
// else{
// 	$("#canvas-div").text("Canvas not supported")
// }
function carUpdate(xCarPos, yCarPos, ctx) {
	//car
	var car_img = document.getElementById("carImg");
	ctx.drawImage(car_img, xCarPos, yCarPos, 50, 50);
	//end flag
	var flag_img = document.getElementById("flagImg");
	ctx.drawImage(flag_img, canvas.width - 50, 10, 40, 40);
	//road path
	ctx.beginPath();
	ctx.moveTo(10, 50);
	ctx.lineTo(canvas.width - 20, 50);
	ctx.strokeStyle = "black";
	ctx.lineWidth = 8;
	ctx.stroke();
}
function speedOfCar(ctx) {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	avg_speed = Math.floor((canvas.width - 100) / total_count)
	carPos += avg_speed
	// range_arr = range(oldCarPos, carPos)
	carUpdate(carPos, 10, ctx)
}

function range(start, stop, step = 1) {
	Array(Math.ceil((stop - start) / step)).fill(start).map((x, y) => x + y * step)
}

var content;
var txt_object;
var minutesLabel = document.getElementById("minutes");
var secondsLabel = document.getElementById("seconds");
var loadTime;
$("#easy").addClass("active")
$(".level").click(function () {
	id = event.target.id
	$(".level").removeClass("active");
	$("#" + id).addClass("active")
	$("#level_type").val(id)
})

$("#play").click(function () {
	loadTime = setInterval(function () {
		updateLoader(loaderVal += 1)
	}, 1000);
	$(".startPage").addClass("d-none")
	$(".load_screen, .gamePage").removeClass("d-none")
	let level = $("#level_type").val()
	getTypeContent(level, ready_popup)
})

//game sounds
brake_sound = document.getElementById("brake_sound")
gameover_sound = document.getElementById("gameover_sound")
victory_sound = document.getElementById("victory_sound")

function getTypeContent(level, callback) {
	json = {
		"easy": [
			"நான்கு அடிகளைக் கொண்ட வெண்பாவால் இயற்றப் பட்டதால் நாலடியார் எனப்பட்டது. இந்நூல் சமண முனிவர் நானூறு பேரால் பாடப்பட்டது. திருக்குறளைப் போலவே நாலடியாரும் அறத்துப்பால், பொருட்பால்.",
			"நான்மணிக்கடிகை என்பது நான்கு இரத்தினத் துண்டங்கள் என்னும் பொருளைத் தரும். ஒவ்வொரு பாடலிலும் நான்கு சிறந்த கருத்துக்களைக் கூறுவதால் நான்மணிக்கடிகை எனப் பெயர் பெற்றது. இதனை இயற்றியவர் விளம்பி நாகனார்.",
			"நிலவானது நிலைத்த பேறுடைய திருமாலின் முகத்தை ஒத்திருக்கும். ஒளிரும் ஞாயிறு அவனது சக்கரத்தை ஒத்திருக்கும். வயலில் காணப்படும் தாமரை அவனது கண்களை ஒத்திருக்கும். காயாம்பூவானது அவனது திருமேனி நிறத்தை ஒத்திருக்கும்."
		],
		"intermediate": [
			"உலகத்தைத் தன் வயிற்றுக்குள் அடக்கியவனான திருமால் தன் திருவடிகளால் மூவுலகத்தையும் அளந்தான். பசுக்களின் குளிரைப் போக்குவதற்காகக் கோவர்த்தன கிரியைக் குடையாகப் பிடித்தான். பாணாசுரனது நெருப்பு மதிலை அழித்து அநிருத்தனை மீட்டான். எவரையும் எளியவர் என்று எண்ணி இகழ்ந்து விடாதே. மிகச் சிறந்த பொருளாக இருந்தாலும் தகுதியற்றவர்களிடமிருந்து பெற்றுக் கொள்ளாதே. செய்யக் கூடாதவற்றைச் செய்தாலும் ஏழை மக்களிடம் கோபம் கொள்ளாதே.",
			"கேகயப் பறவைகள் பறையோசையைக் கேட்டால் இறந்துவிடும். சான்றோர்கள் தன்மானக் குறைவு ஏற்பட்டால் உயிர் வாழ மாட்டார்கள். நெல்லுண்டான முதிர்ந்த மூங்கில் உடனே பட்டுப் போவது போல சான்றோர் தன் மீது பழி ஏற்பட்டால் உயிர் வாழ மாட்டார்கள். மாணிக்கம் முதலான உயர் மணிகளின் நல்லியல்பை அதைக் கழுவிய பின் அறிவார்கள். குதிரையின் நல்லியல்பை அதன் மேற் சேணமமைத்து ஏறிய பின் அறிவார்கள். பொன்னின் தரத்தை அதனை உருக்கிப் பார்த்து அறிவார்கள்.",
			"உறவினர்களின் இயல்பைத் தன் செல்வத்தை எல்லாம் இழந்து வறுமையுற்ற போது அறிவார்கள். கள்ளிச்செடியில் அகில் பிறக்கும். மான் வயிற்றில் ஒளி பொருந்திய அரிதாரம் பிறக்கும். மிக்க விலையுடைய முத்துக்கள் பெரிய கடலுள் பிறக்கும். அவ்வாறே நல்லியல்பு கொண்டோர் பிறக்கும் குடியையும் எவராலும் அறிய முடியாது. ஒளியுள்ள உயர்ந்த மணிகள் எல்லாம் மலையில் உண்டாகும். மென்மையான அருளுள்ளம் கொண்டவர்களிடத்து அறநெறி தோன்றும்."
		],
		"advanced": [
			"மூன்று கண்களையுடைய சிவபெருமானது திருவடிகளை அடைதல் இனிது. பழமையான திருத்துழாய் மாலையை அணிந்த திருமாலை வணங்குதல் இனிது. நான்கு முகங்களை உடைய பிரமதேவன் முன் அமர்ந்து அவனை வாழ்த்துதல் இனிது. பிச்சையெடுத்தாவது கற்பது இனிது. அப்படி கற்ற கல்வி நல்ல சபையில் உதவுவது மிக இனிது. முத்தையொக்கும் மகளிரது வாய்ச்சொல் இனிது. அதுபோல பெரியோர்களைத் துணையாகக் கொள்ளுதல் இனிது. பொருள் உடையவனது ஈகை இனிது. மனைவியுள்ளமும் கணவன் உள்ளமும் ஒன்றுபடக் கூடுமாயின் மனை வாழ்க்கை இனிது. உலக வாழ்க்கை நிலையில்லாதது என்று ஆராய்ந்துணர்ந்து முற்றும் துறத்தல் இவை அனைத்திலும் மிக இனிது. சொன்ன வேலைகளை மாற்றமில்லாமல் செய்யும் வேலைக்காரர்களைக் கொண்டிருப்பது இனிதாகும். குற்றங்களில் ஈடுபடாமல் கற்றல் மிக இனிதாகும்.",
			"ஏரினையும் உழவுமாடுகளையும் சொந்தமாக வைத்திருப்பவன் விவசாயம் செய்வது இனிது. அதுபோல ஆராயின் செல்லுந்திசையில் நட்புக்கொள்ளுதல் இனிது. அரசன் யானைப் படைகளைக் கொண்டிருத்தல் இனிது. தசையைத் தின்று உடம்பை வளர்க்காமை இனிது. முல்லை நிலத்தில் ஆற்றினது நீராட கரைக்கண் உள்ள ஊர் இனிது. அதுபோல மதிப்புடையவரது மதிப்பு கொள்ளுதல் இனிது. கொல்லாமை முன் இனிது. அரசன் நடுவு நிலைமை தவறி சிறப்பு செய்யாமை இனிது. செங்கோலனாக இருப்பது இனிது. யாவரிடத்தும் திறமையால் கூடியமட்டும் குற்றம் கூறாமை மிக இனிது. முக்கண்களுடைய சிவபெருமானின் திருவடிகளை வணங்காதவர்களுக்குத் துன்பமுண்டாம். அழகிய பனைக் கொடியையுடையவனாகிய பலராமனை நினையாமல் இருத்தல் துன்பமாம். திருமாலை மறத்தல் துன்பம் தரும். வேலியில்லாத கரும்புப் பயிரைப் பாதுகாத்தல் துன்பமாம்.",
			"திரிகடுகம் என்பது சுக்கு, மிளகு திப்பிலி என்னும் மூன்று மருந்துப் பொருளை குறிக்கும். மூன்று மருந்துப் பண்டங்களால் ஆகிய திரிகடுகம் என்னும் மருந்து உடல் நலம் பேணுவதைப் போன்று, இந்நூற் செய்யுட்களில் மும்மூன்றாக உரைக்கப் பெற்ற அறங்களும் உயிர் நலம் பேணுவனவாம். இதனாலேயே இந்நூல் திரிகடுகம் எனப் பெயர் பெற்றது. இதன் ஆசிரியர் நல்லாதனார். உலகத்தை அளந்ததும், குளிர்ச்சியான மலர்களை உடைய குருந்த மரத்தைச் சாய்த்தும், வஞ்சகமான வண்டியை உதைத்ததும் ஆகிய மூன்றும் நிகழ்த்திய திருமாலின் அடிகளை வணங்கினால் அனைத்து தீமைகளும் போகுமே. பகைவருக்கு முன்னே தன் செல்வத்தைக் காட்டுவதும், மாட்டு மந்தையில் கோல் இல்லாமல் செல்வதும், பகைவரோடு நட்பு பாராட்டுவதும் கெடுதியை உண்டாக்கும். அவ்வாறே நல்லியல்பு கொண்டோர் பிறக்கும் குடியையும் எவராலும் அறிய முடியாது."
		]
	}
	random_id = Math.floor(Math.random() * 3)
	content = json[level][random_id]
	if (level == "easy") {
		secondsLabel.innerHTML = "00"
		minutesLabel.innerHTML = "02"
		totalSeconds = total_time = 120
	}
	else if (level == "intermediate") {
		secondsLabel.innerHTML = "00"
		minutesLabel.innerHTML = "05"
		totalSeconds = total_time = 300
	}
	else if (level == "advanced") {
		secondsLabel.innerHTML = "00"
		minutesLabel.innerHTML = "10"
		totalSeconds = total_time = 600
	}
	formatTxt(content)
	updateLoader(100)
	$(".load_screen").addClass("d-none")
	$(".game_content, .gamePage").removeClass("d-none")
	$(".container").css('overflow-y', 'auto')
	callback(totalSeconds)
	return;
	//getting sample content from wikipedia tamil
	// 	var params = {
	// 		action: "query",
	// 		format: "json",
	// 		generator: "random",
	// 		grnnamespace: "0",
	// 		prop: "extracts",
	// 		rvprop: "content",
	// 		grnlimit: "5",
	// 		exlimit: "5",
	// 		exsentences: "5"
	//   };
	// 	url = URL + "?origin=*&exintro&explaintext";
	// 	Object.keys(params).forEach(function(key){url += "&" + key + "=" + params[key];});
	// 	fetch(url)
	// 		.then(function(response){return response.json();})
	// 		.then(function(response) {
	// 			res = response.query.pages
	// 			Object.keys(res).every(function(key) {
	// 				if(res[key].extract && res[key].extract.trim() != ""){
	// 					content = res[key].extract.trim()
	// 					if(level === "easy"){
	// 						if(content.length < 150){
	// 							while(content.length < 150){
	// 								content = content.concat(content)
	// 							}
	// 						}
	// 						secondsLabel.innerHTML = "00"
	// 						minutesLabel.innerHTML = "02"
	// 						totalSeconds = total_time = 120
	// 						content = content.slice(0, 150)
	// 					}
	// 					else if(level === "intermediate"){
	// 						if(content.length < 300){
	// 							while(content.length < 300){
	// 								content = content.concat(content)
	// 							}
	// 						}
	// 						secondsLabel.innerHTML = "00"
	// 						minutesLabel.innerHTML = "05"
	// 						totalSeconds = total_time = 300
	// 						content = content.slice(0, 300)
	// 					}
	// 					else if(level === "advanced"){
	// 						if(content.length < 750){
	// 							while(content.length < 750){
	// 								content = content.concat(content)
	// 							}
	// 						}
	// 						secondsLabel.innerHTML = "00"
	// 						minutesLabel.innerHTML = "10"
	// 						totalSeconds = total_time = 600
	// 						content = content.slice(0, 750)
	// 					}
	// 					formatTxt(content)
	// 					updateLoader(100)
	// 					$(".load_screen").addClass("d-none")
	// 					$(".game_content, .gamePage").removeClass("d-none")
	// 					callback(totalSeconds)
	// 					return;
	// 				}
	// 			});
	// 		})
	//     .catch(function(error){console.log(error);});
}

function formatTxt(content) {
	split_content = content.split(" ")
	current_word = split_content[0]
	individual_arr = []
	content_arr = []
	split_content.forEach(function (item, i) {
		content_arr.push(item)
		content_arr.push(" ")
		individual_arr.push(`<span id=Id${i}>${item}</span>`)
		individual_arr.push(`<span id=space${i}>&nbsp;</span>`)
	});
	individual_arr.pop()
	content_arr.pop()
	total_count = split_content.length
	document.getElementById('typingContent').innerHTML = individual_arr.join("")
}


//loader
function updateLoader(loaderVal) {
	$(".progress-bar").css("width", `${loaderVal}%`)
}
function keydownBlock(e) {
	let lastValue;
	typed_val = e.target.value
	key = e.which || e.keyCode
	lastValue = typed_val.slice(-1)
	if (lastValue.trim() === "" && disabled_key_list.includes(key)) {
		e.preventDefault()
		return false
	}
	else if ((typed_val.trim() === "") && key === 32) {
		e.preventDefault()
		return false
	}
	else if ($("#typingContent > span:not(.red, .blue)").length === 0) {
		e.preventDefault()
		return false
	}
}

window.addEventListener("keydown", keydownBlock);
$("#editor").keydown(function (e) {
	keydownBlock(e)
});

$("#editor").keyup(function (e) {
	let lastValue;
	typed_val = e.target.value
	key = e.which || e.keyCode
	lastValue = typed_val.slice(-1)
	if (lastValue.trim() === "" && disabled_key_list.includes(key)) {
		e.preventDefault()
		return false
	}
	else if (typed_val.trim() === "" && key === 32) {
		e.preventDefault()
		return false
	}
	else if ($("#typingContent > span:not(.red, .blue)").length === 0) {
		e.preventDefault()
		return false
	}
	valueToCheck = typed_val.trim().split(" ").splice(-1).join("")
	if ((total_count - 1) == current_index) {
		if (typed_val.slice(-1).trim() == ".") {
			if (escape(valueToCheck) === escape(split_content[current_index])) {
				$("#typingContent > span:not(.red, .blue)").first().addClass("blue")
				$("#typingContent > span:not(.red, .blue)").first().addClass("blue")
				++success_count
				speedOfCar(ctx)
			}
			else {
				$("#typingContent > span:not(.red, .blue)").first().addClass("red")
				$("#typingContent > span:not(.red, .blue)").first().addClass("red")
				bg_music.pause();
				brake_sound.play()
				bg_music.play();
			}
			typedWords++
		}
	}
	else {
		if (typed_val.slice(-1).trim() == "") {
			if (escape(valueToCheck) === escape(split_content[current_index])) {
				$("#typingContent > span:not(.red, .blue)").first().addClass("blue")
				$("#typingContent > span:not(.red, .blue)").first().addClass("blue")
				++success_count
				speedOfCar(ctx)
			}
			else {
				$("#typingContent > span:not(.red, .blue)").first().addClass("red")
				$("#typingContent > span:not(.red, .blue)").first().addClass("red")
				bg_music.pause();
				brake_sound.play()
				bg_music.play();
			}
			++current_index
			typedWords++
		}
	}
	if ($("#typingContent > span:not(.red, .blue)").length === 0) {
		myStopFunction()
		bg_music.pause();
		victory_sound.play();
		$("#success_count_gameend").text(success_count);
		accuracy = ((success_count / total_count) * 100).toFixed(2)
		$("#accuracy_gameend").text(`${accuracy}%`)
		time_taken = total_time - totalSeconds
		seconds = pad(time_taken % 60);
		minutes = pad(parseInt(time_taken / 60));
		$("#time_gameend").text(`${minutes}:${seconds}`);
		$("#gameEndModal").modal({ backdrop: 'static', keyboard: false })
	}
});

function updateContent() {
	content_array = content.split(" ")
	if (content_array[0] === "")
		content_array.shift()
	else {
		first_element = content_array[0].match(pattern)
		first_element.shift()
		first_element = first_element.join("")
		content_array[0] = first_element
	}
	content = content_array.join(" ")
	document.getElementById('spl_con').innerHTML = content
}


function disabledKeys(e) {
	key = e.which || e.keyCode
	if (disabled_key_list.includes(key))
		e.preventDefault();
};

function countdown_time() {
	timer = setInterval(setTime, 1000);

	function setTime() {
		if (totalSeconds === 0) {
			myStopFunction()
			bg_music.pause();
			gameover_sound.play()
			$("#success_count_gameover").text(success_count);
			accuracy = ((success_count / total_count) * 100).toFixed(2)
			$("#accuracy_gameover").text(`${accuracy}%`)
			$("#typed_count_gameover").text(typedWords);
			$("#gameOverModal").modal({ backdrop: 'static', keyboard: false })
		}
		else {
			--totalSeconds;
			secondsLabel.innerHTML = pad(totalSeconds % 60);
			minutesLabel.innerHTML = pad(parseInt(totalSeconds / 60));
			$("#editor").focus();
		}
	}
}

function myStopFunction() {
	clearInterval(timer);
}

function pad(val) {
	var valString = val + "";
	if (valString.length < 2) {
		return "0" + valString;
	} else {
		return valString;
	}
}

// Audio section
//background music
bg_music = document.getElementById("bg_music")
bg_music.volume = 0.2;
$(document).ready(function () {
	$("#play_bg").trigger("click")
})
function playAudio() {
	bg_music.play();
}

function pauseAudio() {
	bg_music.pause();
}

//popup section
function ready_popup(totalSeconds) {
	var intervalID;
	let timer = 3
	$("#readyPopModal").modal({ backdrop: 'static', keyboard: false })
	intervalID = setInterval(function () {
		timer = timer - 1;
		if (timer === 0) {
			$("#ready_count").text("விளையாடு!")
			bg_music.play();
		}
		else
			$("#ready_count").text(timer)
		if (timer < 0) {
			clearTimeout(intervalID);
			$("#readyPopModal").modal('hide')
			timer = countdown_time()
		}


	}, 1000);
}
function toggleKeyboard() {
	$(".keyboardImg").toggle("slow", function () {
		if ($(".keyboardImg").is(':visible')) {
			$('.keyboardToggleBtn').text('விசைப்பலகை மறை');
		} else {
			$('.keyboardToggleBtn').text('விசைப்பலகை காட்டு');
		}
	});
}






