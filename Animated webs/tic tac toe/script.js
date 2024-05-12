const boxs=document.querySelectorAll('.box');
const statustxt=document.querySelector('#status');
const btn=document.querySelector('#restart');
let x="<img src='cross2.png' height='65px'>";
let o="<img src='zero.png' height='60px'>";

const win=[
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [3,4,5],
    [6,7,8],
    [2,4,6]
];

let opt=["","","","","","","","",""];
let currentPlayer=x;
let player="X";
let running = false;
init();

function init(){
    boxs.forEach(box=>box.addEventListener('click',boxClick));
    btn.addEventListener('click',restartGame);
    statustxt.textContent=`${player} Your Turn`;
    running=true;
}

function boxClick(){
const index=this.dataset.index;
if(opt[index]!="" || !running){
    return;
}
updateBox(this,index);
checkWinner();
}

function updateBox(box,index){
opt[index]=player;
box.innerHTML=currentPlayer;
}
function changePlayer(){
    player=(player=='X') ? "O" :"X";
    currentPlayer=(currentPlayer==x) ? o :x;
    statustxt.textContent=`${player} Your Turn`;
}
function checkWinner(){
    let isWon=false;
    for(let i=0;i<win.length;i++){
        const condition=win[i];
        const box1=opt[condition[0]];
        const box2=opt[condition[1]];
        const box3=opt[condition[2]];
        if(box1=="" || box2=="" || box3==""){
            continue
        } 
        if(box1==box2 && box2==box3){
            isWon=true;
            boxs[condition[0]].classList.add('win');
            boxs[condition[1]].classList.add('win');
            boxs[condition[2]].classList.add('win');
        }
    }
    if(isWon){
        statustxt.textContent=`${player} Won...!`;
        running = false;
    }else if(!opt.includes("")){
        statustxt.textContent=`Game Draw...!`;
        running=false;
    }else{
        changePlayer();
    }
    }

    function restartGame(){
        opt=["","","","","","","","",""];
        currentPlayer=x;
        player="X";
        running =true;
        statustxt.textContent=`${player} Your turn`;

        boxs.forEach(box=>{
            box.innerHTML="";
            box.classList.remove('win');
        });
    }

