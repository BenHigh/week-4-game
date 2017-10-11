var luke = {
	id: "luke",
	name: "Luke",
	hp: 100,
	full: 100,
	ap: 12,
	base: 12,
	cap: 24
};

var han = {
	id: "han",
	name: "Han",
	hp: 160,
	full: 160,
	ap: 7,
	base: 7,
	cap: 14
};

var vader = {
	id: "vader",
	name: "Vader",
	hp: 100,
	full: 100,
	ap: 15,
	base: 15,
	cap: 25
};

var jarjar = {
	id: "jarjar",
	name: "Jar Jar",
	hp: 250,
	full: 250,
	ap: 3,
	base: 3,
	cap: 9
};

var player;

var enemy;

var enemies = [];

var started = false;

var fighting = false;

var defeated = 0;

function startGame(){
	$("#instruct").html("<h3>You have chosen to play as: " + player.name + "</h3>")
	$("#instruct").append("<button class='btn btn-success' id='confirm' data-toggle='confirmation'>Click to confirm</button>");

	$("#confirm").click(chooseFight);
}


function chooseFight(){
	started = true;
	for (i in enemies){
		$("#" + enemies[i].id).css("bottom", "auto").css("left", "auto").css({"right": "50px", "top": (320*i)+"px", "margin-top": "25px"});
	}
	$("#" + player.id).css("right", "auto").css("bottom", "auto").css({"left": "80px", "top": "300px"});

	$("#instruct").html("<h2>Select who to attack first</h2>");
}


function fight(){

	updateStats();
	$("#instruct").html("<h3>You have chosen to fight " + enemy.name + "</h3>")
	$("#instruct").append("<br><button class='btn btn-danger' id='attack' data-toggle='confirmation'>Attack</button>");

	$("#" + enemy.id).css({"right": "850px", "top": "300px"});
	$(".stats").css("opacity", ".817").css("z-index", "auto");

	fighting = true;


	$("#attack").click(function(){
		enemy.hp -= player.ap;
		player.ap += player.base;
		player.hp -= (Math.abs(enemy.hp/enemy.full)*1.5*enemy.cap);
		updateStats();
	});

}


function updateStats(){
	$("#plHP").css("width", ((player.hp/player.full)*100)+"%");
	$("#opHP").css("width", ((enemy.hp/enemy.full)*100)+"%");
	$("#plAP").html("<h3>" + player.ap + "</h3>");
	$("#opCAP").html("<h3>" + enemy.cap + "</h3>");
	if(enemy.hp <= 0){
		fighting = false;
		youWon();
	}else if(player.hp <= 0){
		fighting = false;
		youDed();
	}
}

function youDed(){
	$("#" + player.id).css("display", "none");
	$("#instruct").html("<h3>You lose</h3>");
	$("#instruct").append("<br><button class='btn btn-warning' id='restart' data-toggle='confirmation'>Restart</button>");



	$("#restart").click(function(){
		location.reload();
	});
}

function youWon(){
	$("#" + enemy.id).css("display", "none");
	$("#instruct").html("<h3>Congratulations, you defeated " + enemy.name + "!</h3>");
	$("#instruct").append("<h3>Select your next contestant</h3>");
	defeated++;

	if(defeated === 3){
		$("#" + player.id).css("left", "867px").css("border", "10px solid gold");
		$("#instruct").html("<h2>You have defeated all who stood before you!!!</h2>");
		$(".stats").css("opacity", "0")
		$("#instruct").append("<br><button class='btn btn-warning' id='restart' data-toggle='confirmation'>Restart</button>");


		$("#restart").click(function(){
			location.reload();
		});
	}

}



$(document).ready(function() {
	$("#luke").click(function(){
		if(!started){
			player = luke;
			enemies = [han, jarjar, vader];
			startGame();
		}else if(!fighting && player.id !== $(this).attr("id")){
			enemy = luke;
			fight();
		}
	});

	$("#han").click(function(){
		if(!started){	
			player = han;
			enemies = [luke, jarjar, vader];
			startGame();
		}else if(!fighting && player.id !== $(this).attr("id")){
			enemy = han;
			fight();
		}
	});

	$("#jarjar").click(function(){
		if(!started){
			player = jarjar;
			enemies = [luke, han, vader];
			startGame();
		}else if(!fighting && player.id !== $(this).attr("id")){
			enemy = jarjar;
			fight();
		}
	});

	$("#vader").click(function(){
		if(!started){
			player = vader;
			enemies = [luke, han, jarjar];
			startGame();
		}else if(!fighting && player.id !== $(this).attr("id")){
			enemy = vader;
			fight();
		}
	});
});