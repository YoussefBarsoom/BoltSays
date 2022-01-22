const difficulty = 3;
var randomNum;
var gameCurrentSequence =new Array()
var curUsrIndxSeq = 0;
var chosenUsrBox=0;
var seqCurNum=0;
var score=0;
function nextSequence() {
    randomNum= Math.floor(Math.random()*(difficulty*difficulty))+1
    gameCurrentSequence.push('box'+randomNum);
    seqCurNum++;
    return randomNum;
}
function playSequence(index){
    //disable all box
    
    //play animation
    if(index==seqCurNum){return;}
    $("#"+gameCurrentSequence[index]).fadeOut(300).fadeIn(300)
    index++
    setTimeout(function(){    playSequence(index)    
    },600);

    
    //enable all box
}
function strcmp(a, b) {
    if (a.toString() < b.toString()) return -1;
    if (a.toString() > b.toString()) return 1;
    return 0;
}
{/* <div class="row">
<div class="box"></div>
<div class="box"></div>
</div>
<div class="row">
    <div class="box"></div>
    <div class="box"></div>
    </div> */}
let index=1;
for (let i = 1; i <= difficulty; i++) {
    $("#gameContainer").append("<div id='row"+i+"' class='row'></div>")
    for (let j=1; j <= difficulty; j++) {
        $("#row"+i).append("<div id='box"+index+"' class='box'></div>")
        index++
    }
}

$('.tryAgainButton').click(function name(params) {
    $('.endGame').css('display','none')
        $(".gameBody").css('display','flex')
        $(".wrapper").css('display','flex')
        $(".gameWrapper").css('display','flex')
        $(".scoreWrapper").css('display','flex');
        $(".box").css('opacity',0)
        $('.total').text(0);

        for (let index = 1; index <= difficulty*difficulty; index++) {
            $('#box'+index).animate({opacity:1, height: '100px',width: '100px'},1000+(index*200)); 
        }
        nextSequence();
        setTimeout(function(){    playSequence(0)    },2000);

})




$('.box').click(function () {
    chosenUsrBox = $(this).attr('id')
    $(this).fadeOut(200).fadeIn(200)
    if(strcmp(chosenUsrBox,gameCurrentSequence[curUsrIndxSeq])==0)
    {
        curUsrIndxSeq++;
        //Check IF end of current sequence
        if(curUsrIndxSeq==seqCurNum)
    {
        nextSequence();
        $('.total').text(curUsrIndxSeq);
        setTimeout(function(){    playSequence(0)    },600);  
        curUsrIndxSeq=0;  
        score++;
    }
    }
    else{
        //GAMEOVER
        $(this).css('opacity',0)
        $(this).css('height','0px')
        $(this).css('width','0px')      
        $(".box").css('opacity',0)
        $(".box").css('height','0px')
        $(".box").css('width','0px')
        $(".gameWrapper").css('display','none');
        $(".wrapper").css('display','none');
        $(".scoreWrapper").css('display','none');

        var percentile = getRank([1,1,2,2,3,3,4,5,5,5,5,7,7,9,9,9,9,9,9,9,9,11,11,11,13,16,19,20],score)/28 *100
        $(".scoreStyle").text(score)
        $(".percStyle").text("Percentile "+percentile.toFixed(2)+"%")
        chartInstance.data=data;
       
      //  chartInstance.update();
        $(".endGame").css('display','flex');
                 curUsrIndxSeq = 0;
         chosenUsrBox=0;
         seqCurNum=0;
        gameCurrentSequence= new Array()
    }
})

    $('.startButton').click(function () {
        $(this).fadeOut(200)
       setInterval(function() {
           
        $(".gameBody").css('display','flex')},250);
        for (let index = 1; index <= difficulty*difficulty; index++) {
            $('#box'+index).animate({opacity:1, height: '100px',width: '100px'},1000+(index*200)); 
        }
        nextSequence();
        setTimeout(function(){    playSequence(0)    },2000);  
 
    })


function startGame(difficulty)
{


}

function getRank(array,num) {
    for (let index = 0; index < array.length; index++) {
    if(array[index]>num)
    {
       return num; 
    }        
    }
}



var chart    = document.getElementById('chart').getContext('2d'),
    gradient = chart.createLinearGradient(0, 0, 0, 450);

gradient.addColorStop(0, 'rgba(255, 0,0, 0.5)');
gradient.addColorStop(0.5, 'rgba(255, 0, 0, 0.25)');
gradient.addColorStop(1, 'rgba(255, 0, 0, 0)');


var data  = {
    labels: [ '1', '3', '5', '7', '9', '11','13','15','17' ],
    datasets: [{
			label: 'Player Score',
			backgroundColor: 'white',
			pointBackgroundColor: 'white',
			borderWidth: 1,
			borderColor: '#ffff',
			data: [20, 25, 35, 60, 80, 65,39,20,10,0]
    }]
};

var dataInitial  = {
    labels: [ '1', '3', '5', '7', '9', '11','13','15','17' ],
    datasets: [{
			label: 'Custom Label Name',
			backgroundColor: gradient,
			pointBackgroundColor: 'white',
			borderWidth: 1,
			borderColor: '#ffff',
			data: [0, 0, 0, 0, 0, 0,0,0,0,0]
    }]
};

var options = {
	responsive: true,
	maintainAspectRatio: true,
	animation: {
		easing: 'easeInOutQuad',
		duration: 520
	},
	scales: {
		xAxes: [{
			gridLines: {
				color: 'rgba(255, 255, 255, 0.05)',
				lineWidth: 1
			}
		}],
		yAxes: [{
			gridLines: {
				color: 'rgba(255, 255, 255, 0.08)',
				lineWidth: 1
			}
		}]
	},
	elements: {
		line: {
			tension: 0.4
		}
	},
	legend: {
		display: false
	},
	point: {
		backgroundColor: 'white'
	},
	tooltips: {
		titleFontFamily: 'Open Sans',
		backgroundColor: 'rgba(255,255,255,0.3)',
		titleFontColor: 'red',
		caretSize: 5,
		cornerRadius: 2,
		xPadding: 10,
		yPadding: 10
	}
};


 var chartInstance = new Chart(chart, {
            type: 'line',
            data: dataInitial,
            options: options
        });