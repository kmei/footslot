(function(){

//CardBase Class
var CardBase = arc.Class.create(arc.display.DisplayObjectContainer,{
	_name:null,
	_cardid:0,
	_type:null,
	_rank:0,
	_image_path:null,
	_panel:null,
	_obj:null,
	initialize:function(obj){
		if(obj.name != null) this.setName(obj.name);
		if(obj.cardid > 0) this.setId(obj.cardid);
		if(obj.type != null) this.setType(obj.type);
		if(obj.rank > 0) this.setRank(obj.rank);
		if(obj.path != null) this.setImagePath(obj.path);
		if(obj.imageObj != null) this.setSprite(obj.imageObj);
		this._obj = obj;
	},
	setName:function(name){
		this._name = name;
	},
	getName:function(){
		return this._name;
	},
	setId:function(id){
		this._cardid = id;
	},
	getId:function(){
		return this._cardid;
	},
	setType:function(type){
		this._type = type;
	},
	getType:function(){
		return this._type;
	},
	setRank:function(rank){
		this._rank = rank;
	},
	getRank:function(){
		return this._rank;
	},
	setImagePath:function(path){
		this._image_path = path;
	},
	getImagePath:function(){
		return this._image_path;
	},
	setSprite:function(imageobj){
		_panel = new arc.display.Sprite(imageobj);
		this.addChild(_panel);
	}
	});

//CardBase extends PlayerCard Class
var PlayerCard = arc.Class.create(CardBase,{
	_position:null,
	_defense:0,
	_offense:0,
	_technique:0,
	_physical:0,
	_mental:0,
	_pass:0,
	_shoot:0,
	_dribble:0,
	_side:null,
	_currentPlace:0,
	initialize:function(obj){
		if(obj.position != null) this.setPosition(obj.position);
		if(obj.defense > 0) this.setDefense(obj.defense);
		if(obj.offense > 0) this.setOffense(obj.offense);
		if(obj.technique > 0) this.setTechnique(obj.technique);
		if(obj.physical > 0) this.setPhysical(obj.physical);
		if(obj.mental > 0) this.setMental(obj.mental);
		if(obj.pass > 0) this.setPass(obj.pass);
		if(obj.shoot > 0) this.setShoot(obj.shoot);
		if(obj.dribble > 0) this.setDribble(obj.dribble);
		if(obj.side != null) this.setSide(obj.side);
	},
	setSide:function(side){
		this._side = side;
	},
	getSide:function(){
		return this._side;
	},
	setPosition:function(position){
		this._position = position;
	},
	getPosition:function(){
		return this._position;
	},
	setDefense:function(defense){
		this._defense = defense;
	},
	getDefense:function(){
		return this._defense;
	},
	setOffense:function(offense){
		this._offense = offense;
	},
	getOffense:function(){
		return this._offense;
	},
	setTechnique:function(technique){
		this._technique = technique;
	},
	getTechnique:function(){
		return this._technique;
	},
	setPhysical:function(physical){
		this._physical = physical;
	},
	getPhysical:function(){
		return this._physical;
	},
	setMental:function(mental){
		this._mental = mental;
	},
	getMental:function(){
		return this._mental;
	},
	setPass:function(pass){
		this._pass = pass;
	},
	getPass:function(){
		return this._pass;
	},
	setShoot:function(shoot){
		this._shoot = shoot;
	},
	getShoot:function(){
		return this._shoot;
	},
	setDribble:function(dribble){
		this._dribble = dribble;
	},
	getDribble:function(){
		return this._dribble;
	},
	setCurrentPlace:function(currentPlace){
		this._currentPlace = currentPlace;
	},
	getCurrentPlace:function(){
		return this._currentPlace;
	},
	duplicateCard:function(){
		return new PlayerCard(this._obj);
	}
});

//CardBase extends ActionCard Class
var ActionCard = arc.Class.create(CardBase,{
	_action_type:null,
	_success_rate:0,
	_change_rate:0,
	_event_id:0,
	_event_rate:0,
	_cost:0,
	_force:"",
	initialize:function(obj){
		if(obj.action_type != null) this.setActionType(obj.actiontype);
		if(obj.success_rate > 0) this.setSuccessRate(obj.success_rate);
		if(obj.change_rate != null) this.setChangeRate(obj.change_rate);
		if(obj.event_id > 0) this.setEventId(obj.event_id);
		if(obj.event_rate > 0) this.setEventRate(obj.event_rate);
		if(obj.cost > 0) this.setCost(obj.cost);
		if(obj.force != null) this.setForce(obj.force);
	},
	setActionType:function(action_type){
		this._action_type = action_type;
	},
	getActionType:function(){
		return this._action_type;
	},
	setSuccessRate:function(success_rate){
		this._success_rate = success_rate;
	},
	getSuccessRate:function(){
		return this._success_rate;
	},
	setChangeRate:function(change_rate){
		this._change_rate = change_rate;
	},
	getChangeRate:function(){
		return this._change_rate;
	},
	setEventId:function(event_id){
		this._event_id = event_id;
	},
	getEventId:function(){
		return this._event_id;
	},
	setEventRate:function(event_rate){
		this._event_rate = event_rate;
	},
	getEventRate:function(){
		return this._event_rate;
	},
	setCost:function(cost){
		this._cost = cost;
	},
	getCost:function(){
		return this._cost;
	},
	setForce:function(force){
		this._force = force;
	},
	getForce:function(){
		return this._force;
	},
	duplicateCard:function(){
		return new PlayerCard(this._obj);
	}
});

/*
ドラムの定義
-各ドラムには、複数個のカードを配置する
-縦方向に移動し、ユーザーアクションに起因してストップする
-アクションが無い場合は、無制限にループする
*/
var Dram = arc.Class.create(arc.display.DisplayObjectContainer,{
	_cardList:[],
	_dramid:0,
	_speed:10,
	_threshold:0,
	_stageHeight:0,
	_dramFirstY:0,
	_delay:0,
	_panelHeight:0,
	_nowId:0,
	_nowPosition:"",
	initialize:function(obj){
		if(obj.stageHeight > 0) this._stageHeight = obj.stageHeight;
		if(obj.delay > 0) this._delay = obj.delay;
		if(obj.speed > 0) this._speed = obj.speed;
		if(obj.cards.length > 0) {
			this._cardList = obj.cards;
			for(var i=0; i < this._cardList.length; i++){
				var myPanel = this._cardList[i];
				myPanel.setY(i*myPanel.getHeight());
				this.addChild(myPanel);
			}
			this._panelHeight = myPanel.getHeight();
		}
		
		this._dramFirstY = this.getY()-this.getHeight() + this._stageHeight;
		console.log("最初は：",this._dramFirstY);
		this._threshold = this.getY()-this.getHeight() / 2 +this._stageHeight;
		this.setY(this._dramFirstY-30);
		this._curentFunc = this._spin;
	},
	curentFunc:function(){},
	stop:function(){
		this._nowId = Math.ceil(this.getY() / this._panelHeight);
		//console.log(this._cardList[Math.abs(this._nowId)].getName());
		this.setY(Math.ceil(this.getY() / this._panelHeight)*this._panelHeight + Math.floor((this._stageHeight - this._panelHeight)/2));
		this._curentFunc = function(){};
		return this._cardList[Math.abs(this._nowId)];
	},
	start:function(){
		this._curentFunc = this._spin;
	},
	spin:function(){
		if(this._delay == 0){
			var targetY = this.getY() + this._speed;
			if(targetY > this._threshold){
				this.setY(this._dramFirstY);
			}
			else{
				this.setY(targetY);
			}
		}
		else{
			this._delay--;
		}
	},
	grow:function(card){
		var growCard = card.duplicateCard();
		this._cardList.push(growCard);
		for(var i=0; i < this._cardList.length; i++){
			var myPanel = this._cardList[i];
			myPanel.setY(i*myPanel.getHeight());
			this.addChild(myPanel);
		}
		console.log("dram grow",this._cardList.length);
		this._panelHeight = myPanel.getHeight();
		//console.log(card.getRank(),card.getSide(),action.getType(),"こういう感じ");
		//この関数はドラムの成長時に叩かれ、sideとcardを受け取る。
		//受け取ったカードをリストに追加し、ドラムにも追加する
		//こうする事で、そのカードの表示確立が上がるはずであるという理論
		//this._cardList[Math.abs(this._nowId)];
	},
	changeDram:function(card){
		this._currentFunc = function(){};
		if(this._nowPosition != card.getPosition){
			//this._removeAllChild();
			
			for(var l=0; l < this._cardList.length; l++){
				var myTarget = this._cardList[l];
				myTarget.setVisible(false);
				//this.removeChild(myTarget);
			}
			
			var myCards = [];
			switch(card.getPosition()){
				case "FW": myCards = _parameterManager._fwactionCards;
					break;
				case "MF": myCards = _parameterManager._mfactionCards;
					break;
				case "DF": myCards = _parameterManager._dfactionCards;
					break;
				case "GK": myCards = _parameterManager._gkactionCards;
					break;
			}
			console.log(this._cardList.length,"changeDram:",this.getY(),this.getHeight());
			for(var k=0; k < myCards.length; k++){
				var myPanel = myCards[k];
				console.log("高さとy：",myPanel.getHeight(),myPanel.getY());
				myPanel.setY(k*myPanel.getHeight());
				myPanel.setVisible(true);
				this.addChild(myPanel);
			}
			this._panelHeight = myPanel.getHeight();
			this._dramFirstY = 0-this.getHeight() + this._stageHeight;
			this._threshold = 0-this.getHeight() / 2 +this._stageHeight;
			this.setY(this._dramFirstY-30);
			this._cardList = myCards;
			console.log("dram grow",this._panelHeight,this._dramFirstY,this._threshold,this.getY(),this._cardList);
			this._nowPosition = card.getPosition();
			//
		}
		this._currentFunc = this._spin;
	},
	gain:function(card){
		//ドラムの減退時に叩かれ、指定のカードを外す
	}
});


/*
プレイボタンの定義
-ユーザー入力を受け付ける唯一のパーツ
-ドラムの回転のスタート／ストップとゲームの進行や終了を1ボタンで行う
-ステージによって作成され、入力と機能をステージが管理する
*/
var Button = arc.Class.create(arc.display.DisplayObjectContainer,{
	_label:null,
	_labelField:null,
	_base:null,
	initialize:function(obj){
		if(obj.base != null){
			_base = new arc.display.Sprite(obj.base);
			this.addChild(_base);
			
			if(obj.label != ""){
				_label = obj.label;
				_labelField = new arc.display.TextField();
				_labelField.setColor(0xffffff);
				_labelField.setFont("メイリオ","16");
				_labelField.setText(_label);
				_labelField.setX(52);
				_labelField.setY(10);
				_labelField.setAlign = arc.display.Align.RIGHT;
				this.addChild(_labelField);
			}
		}
	},
	updateLabel:function(label){
		_labelField.setText(label);
	}
});

/*
スロットの定義
-3つのドラムを持った、ゲームのメイン部分となるエリア
-ユーザーアクションを受けて、次の処理をどうするのか判断して渡す
*/

var Slot = arc.Class.create(arc.display.DisplayObjectContainer,{
	_playerDram:null,
	_actionDram:null,
	_resultDram:null,
	_marginH:5,
	_nowFirst:0,
	_nowSecond:0,
	_nowThird:0,
	_inputCount:3,
	_nowSpinDrams:[],
	_timePanel:null,
	_gameCount:0,
	_scorePanel:null,
	_playerForce:50,
	_enemyForce:50,
	_effectPanel:null,
	_pitchPanel:null,
	_fwActionDram:null,
	_mfActionDram:null,
	_dfActionDram:null,
	_gkActionDram:null,
	_timeUpFunction:null,
	initialize:function(obj){
		_playerForce = obj.playerForce;
		_enemyForce = obj.enemyForce;
		
		_playerDram = new Dram(obj.player);
		_playerDram.setX(this._marginH);
		this.addChild(_playerDram);
		
		_actionDram = new Dram(obj.action);
		_actionDram.setX(this._marginH+_actionDram.getWidth()+this._marginH);
		this.addChild(_actionDram);
		
		_resultDram = new Dram(obj.result);
		_resultDram.setX(this._marginH+(_resultDram.getWidth()+this._marginH)*2);
		this.addChild(_resultDram);
		
		this.setMask(0,30,320,140);
		
		
		_timePanel = obj.timeView;
		_scorePanel = obj.scorePanel;
		_effectPanel = obj.effectPanel;
		_pitchPanel = obj.pitchPanel;
		
		_timeUpFunction = obj.timeUpFunc;
		
		_fwActionDram = new Dram(obj.fwaction);
		_fwActionDram.setX(this._marginH+_actionDram.getWidth()+this._marginH);
		
		_mfActionDram = new Dram(obj.mfaction);
		_mfActionDram.setX(this._marginH+_actionDram.getWidth()+this._marginH);
		
		_dfActionDram = new Dram(obj.dfaction);
		_dfActionDram.setX(this._marginH+_actionDram.getWidth()+this._marginH);
		
		_gkActionDram = new Dram(obj.gkaction);
		_gkActionDram.setX(this._marginH+_actionDram.getWidth()+this._marginH);
		
		var myButton = new arc.display.Shape();
		myButton.beginFill(0x000000, 0);
		myButton.drawRect(0, 0, 320, 420);
		myButton.endFill();
		this.addChild(myButton);
		this.addEventListener(arc.Event.TOUCH_START,this.controll);
	},
	spin:function(){
		this._isSpin = true;
	},
	
	controll:function(){
		switch (this._inputCount){
			case 0:
				this._nowSpinDrams = [_actionDram,_resultDram];
				_nowFirst = _playerDram.stop();
				//いったん叩きません
				//this.growDram(_nowFirst);
				break;
			case 1:
				this._nowSpinDrams = [_resultDram];
				_nowSecond = _actionDram.stop();
				break;
			case 2:
				this._nowSpinDrams = [];
				_nowThird = _resultDram.stop();
				
				this._gameCount++;
				if(_timePanel.updateTime(this._gameCount) == "end"){
					this._gameCount=0;
					this.update = function(){};
					_effectPanel.timeUp(_timeUpFunction);
					//_timeUpFunction.call();
					
					this.removeEventListener(arc.Event.TOUCH_START,this.controll);
					
				}
				
				var message = "残念・・・";
				if(_nowThird.getType()=="success"){
					if(_nowSecond.getType() == "add"){
						_scorePanel.updateScore(_nowFirst.getSide());
						_effectPanel.goalEffect();
					}
					else if(_nowSecond.getType() == "grow"){
						this.growForce(_nowFirst,_nowSecond);
						
						message = _nowFirst.getSide()+"の勢力が"+_nowFirst.getRank()+"ポイントアップ！";
					}
					else if(_nowSecond.getType() == "gain"){
						this.gainForce(_nowFirst,_nowSecond);
					}
				}
				break;
			case 3:
				this._nowSpinDrams = [_playerDram,_actionDram,_resultDram];
				break;
		}
		this._inputCount++;
		if(this._inputCount > 3){
			this._inputCount = 0;
		}
	},
	growDram:function(card){
		//this.removeChild(this._actionDram);
		/*
		var changeDram=null;
		switch(card.getPosition()){
			case "FW": changeDram = _parameterManager._fwactionCards;
				break;
			case "MF": changeDram = _parameterManager._mfactionCards;
				break;
			case "DF": changeDram = _parameterManager._dfactionCards;
				break;
			case "GK": changeDram = _parameterManager._gkactionCards;
				break;
		}
		//this._actionDram = changeDram;
		this.addChild(changeDram);
		*/
		_actionDram.changeDram(card);
	},
	growForce:function(card,action){
		var myTeamPoint = (card.getSide() == "player")? _playerForce += card.getRank() : _enemyForce += card.getRank();
		_playerDram.grow(card);
		_effectPanel.growEffect(_nowFirst.getSide(),_nowFirst.getRank());
		_pitchPanel.grow(card,action);
		//勢力ポイントがしきい値以上あがった場合、
		//playerCradのimageオブジェクトを元に、カードを作成して、
		//ドラムに渡す。ドラムはこれを受け取り、自分のカードリストに加える
	},
	gainForce:function(card){
		var myTeamPoint = (card.getSide() == "player")? _enemyForce -= card.getRank() : _playerForce -= card.getRank();
		//_playerDram.grow(card);
		_pitchPanel.gain(card);
	},
	update:function(){
		for(var i = 0; i < this._nowSpinDrams.length; i++){
			this._nowSpinDrams[i].spin();
		}
	},
	stop:function(){
		this._isSpin = false;
	}
});

//ゲーム内パラメータを管理するクラス
var ParameterManager = arc.Class.create({
	_playerForce:0,
	_enemyForce:0,
	_playerScore:0,
	_enemyScore:0,
	_allPlayerCards:[],
	_actionCards:[],
	_resultCards:[],
	_uiImages:[],
	_playerCards:[],
	_playerImages:[],
	_resultCards:[],
	_resultImages:[],
	_actionCards:[],
	_actionImages:[],
	_effectImages:[],
	_enemyCards:[],
	_playerFormation:[],
	_enemyFormation:[],
	_fwactionCards:[],
	_fwactionImages:[],
	_mfactionCards:[],
	_mfactionImages:[],
	_dfactionCards:[],
	_dfactionImages:[],
	_gkactionCards:[],
	_gkactionImages:[],
	_player1stScore:0,
	_player2ndScore:0,
	_enemy1stScore:0,
	_enemy2ndScore:0,
	initialize:function(obj){
		this._playForce = obj.playForce;
		this._enemyForce = obj.enemyForce;
		this._playerScore = obj.playerScore;
		this._enemyScore = obj.enemyScore;
		this._playerCards = obj.players.cards;
		this._enemyCards = obj.enemies.cards;
		this._allPlayerCards = shuffleArr((this._playerCards).concat(this._enemyCards));
		this._actionCards = shuffleArr(obj.actions);
		this._resultCards = shuffleArr(obj.results);
		this._uiImages = obj.parts;
		this._playerForce = obj.players.force;
		this._enemyForce = obj.enemies.force;
		this._effectImages = obj.effects;
		this._playerFormation = obj.players.formation;
		this._enemyFormation = obj.enemies.formation;
		this._fwactionCards = obj.fwactions;
		this._mfactionCards = obj.mfactions;
		this._dfactionCards = obj.dfactions;
		this._gkactionCards = obj.gkactions;
		for(var i = 0; i < this._allPlayerCards.length; i++){
			this._playerImages.push(this._allPlayerCards[i].path);
		}
		for(var j = 0; j < this._actionCards.length; j++){
			this._actionImages.push(this._actionCards[j].path);
		}
		for(var k = 0; k < this._resultCards.length; k++){
			this._resultImages.push(this._resultCards[k].path);
		}
		for(var l = 0; l < this._fwactionCards.length; l++){
			this._fwactionImages.push(this._fwactionCards[l].path);
		}
		for(var m = 0; m < this._mfactionCards.length; m++){
			this._mfactionImages.push(this._mfactionCards[m].path);
		}
		for(var n = 0; n < this._dfactionCards.length; n++){
			this._dfactionImages.push(this._dfactionCards[n].path);
		}
		for(var o = 0; o < this._gkactionCards.length; o++){
			this._gkactionImages.push(this._gkactionCards[o].path);
		}
		this._cardImages = this._playerImages.concat(this._actionImages).concat(this._resultImages).concat(this._uiImages).concat(this._effectImages).concat(this._gkactionImages).concat(this._fwactionImages).concat(this._mfactionImages).concat(this._dfactionImages);
	}
	
});

//プレイ結果に応じたエフェクトを表示するクラス
var EffectArea = arc.Class.create(arc.display.DisplayObjectContainer,{
	_effectImage:null,
	_animater:null,
	_effectContainer:null,
	_effectImages:[],
	owner:null,
	initialize:function(obj){
		owner=this;
		this._effectImages = obj.effectImages;
	},
	animate:function(obj){
		if(this._effectContainer == null){
			this._effectContainer = new arc.display.DisplayObjectContainer();
			this.addChild(this._effectContainer);
		}
		
		var isBackGround = true;
		isBackGround = obj.isBackGround;
		if(isBackGround){
			var myBackground = new arc.display.Shape();
		
			myBackground.beginFill(0x000000, 0.4);
			myBackground.drawRect(0, 0, 320, 420);
			myBackground.endFill();
			this._effectContainer.addChild(myBackground);
		}
		
		var startX = obj.startX;
		var startY = obj.startY;
		var targetX = obj.targetX;
		var targetY = obj.targetY;
		var trans = obj.trans;
		var target = new arc.display.Sprite(obj.target);
		var spendTime = obj.spendTime;
		var startScaleX = (obj.startScaleX)? obj.startScaleX:1;
		var startScaleY = (obj.startScaleY)? obj.startScaleY:1;
		var targetScaleX = (obj.targetScaleX)? obj.targetScaleX:1;
		var targetScaleY = (obj.targetScaleY)? obj.targetScaleY:1;
		var endX = (obj.endX)? obj.endX:obj.targetX;
		var endY = (obj.endX)? obj.endY:obj.targetY;
		var endScaleX = (obj.endScaleX)? obj.endScaleX:1;
		var endScaleY = (obj.endScaleX)? obj.endScaleX:1;
		var callBackFunc = (obj.callBackFunc)? obj.callBackFunc:null;
		var endTime = (obj.endTime)? obj.endTime:0;
		target.setX(startX);
		target.setY(startY);
		target.setScaleX(startScaleX);
		target.setScaleY(startScaleY);
		this._effectContainer.addChild(target);
		
		var myAnimation = new arc.anim.Animation(target,
			{x:startX,y:startY,scaleX:startScaleX,scaleY:startScaleY,time:0,transition:trans},
			{x:targetX,y:targetY,scaleX:targetScaleX,scaleY:targetScaleY,time:spendTime,transition:trans},
			{x:endX,y:endY,scaleX:endScaleX,scaleY:endScaleY,time:endTime,transition:trans}
		);
		var owner = this._effectContainer;
		myAnimation.addEventListener(arc.Event.COMPLETE,function(){
			owner._removeAllChild();
			if(callBackFunc != null){
				callBackFunc.call();
			}
		});
		myAnimation.play();
	},
	goalEffect:function(side,func){
		this.animate({startX:240,startY:196,targetX:23,targetY:170,startScaleX:0.3,startScaleY:0.3,targetScaleX:1,targetScaleY:1,trans:arc.anim.Transition.CIRC_INOUT,spendTime:1000,target:this._effectImages[0],callBackFunc:func});
	},
	timeUp:function(side,func){
		this.animate({startX:108,startY:177,targetX:57,targetY:166,startScaleX:0.5,startScaleY:0.5,targetScaleX:1,targetScaleY:1,trans:arc.anim.Transition.CIRC_INOUT,spendTime:800,target:this._effectImages[3],endTime:2000,callBackFunc:func});
	},
	growEffect:function(side,point){
		var myTarget = (side == "player")? this._effectImages[4] : this._effectImages[5];
		var myPositionX = (side == "player")? 30 : 220;
		var myPositionY = 340;
		var myTargetY = 280;
		this.animate({startX:myPositionX,startY:myPositionY,targetX:myPositionX,targetY:myTargetY,trans:arc.anim.Transition.CUBIC_INOUT,spendTime:600,target:myTarget,isBackGround:false});
	}
});




/*
ステージの定義
-ゲームに必要な各要素を配置するエリア
*/
var Pitch = arc.Class.create(arc.display.DisplayObjectContainer,{
	_players:[],
	_enemies:[],
	_pitchBase:null,
	_playerPins:[],
	_enemyPins:[],
	initialize:function(obj){
		this._pitchBase = new arc.display.Sprite(obj.base);
		this._players = obj.players;
		this._enemies = obj.enemies;
		this.addChild(this._pitchBase);
		var playerPinImage = obj.playerPin;
		var enemyPinImage = obj.enemyPin;
		
		var leftAdjust = this.getWidth() - this._pitchBase.getWidth();
		var topAdjust = this.getHeight() - this._pitchBase.getHeight();
		
		
		for(var i=0; i < this._players.length; i++){
			var myPin = new arc.display.Sprite(playerPinImage);
			var formationId = _parameterManager._playerFormation[i];
			myPin.setX(leftHalfPoints[formationId].x - myPin.getWidth()/2);
			myPin.setY(leftHalfPoints[formationId].y - myPin.getHeight()/2);
			this._playerPins.push({pin:myPin,point:leftHalfPoints[formationId]});
			this.addChild(myPin);
		}
		for(var j=0; j < this._enemies.length; j++){
			var myPin = new arc.display.Sprite(enemyPinImage);
			var formationId = _parameterManager._enemyFormation[j];
			myPin.setX(rightHalfPoints[formationId].x - myPin.getWidth()/2);
			myPin.setY(rightHalfPoints[formationId].y - myPin.getHeight()/2);
			this._enemyPins.push({pin:myPin,point:rightHalfPoints[formationId]});
			this.addChild(myPin);
		}
	},
	grow:function(card,action){
		var movePins = [];
		var targetPins = (card.getSide() == "player")? this._playerPins : this._enemyPins;
		
		var growRate = 0;
		var powerRate = 0;
		switch(action.getForce()){
			case "pass" : growRate = card.getPass();
				powerRate = card.getOffense();
				break;
			case "shoot" : growRate = card.getShoot();
				powerRate = card.getOffense();
				break;
			case "dribble" : growRate = card.getDribble();
				powerRate = card.getOffense();
				break;
			case "technique" : growRate = card.getTechnique();
				powerRate = card.getOffense();
				break;
			case "physical" : growRate = card.getPhysical();
				powerRate = card.getOffense();
				break;
		}
		
		var moveRate = 0;
		if(card.getSide() == "player"){
			if(growRate > powerRate){
				moveRate = growRate/powerRate;
			}
			else{
				moveRate = powerRate/growRate;
			}
		}
		else{
			if(growRate > powerRate){
				moveRate = -(growRate/powerRate);
			}
			else{
				moveRate = -(powerRate/growRate);
			}
		}
		console.log(action.getForce(),powerRate,growRate,moveRate,card.getPosition());
		movePins = targetPins;
		/*
		for(var k = 0; k < targetPins.length; k++){
			if(targetPins[k].point.position == card.getPosition()){
				movePins.push(targetPins[k]);
			}
		}
		var myPin = movePins[Math.floor(movePins.length*Math.random())].pin;
		var moveAdjust = (card.getSide() == "player")? Math.floor(Math.random()*card.getRank()) : -(Math.floor(Math.random()*card.getRank()));
		var startParam = {x:myPin.getX(),y:myPin.getY(),time:0,transition:arc.anim.Transition.SINE_OUT};
		var endParam = {x:myPin.getX()+moveRate+moveAdjust,y:myPin.getY(),time:500,transition:arc.anim.Transition.SINE_OUT}
		var myAnim = new arc.anim.Animation(myPin,startParam,endParam);
		myAnim.play();
		*/
		for(var l = 0; l < movePins.length; l++){
			var myPin = movePins[l].pin;
			var moveAdjust = 0;
			//var moveAdjust = (card.getSide() == "player")? Math.floor(Math.random()*card.getRank()) : -(Math.floor(Math.random()*card.getRank()));
			var startParam = {x:myPin.getX(),y:myPin.getY(),time:0,transition:arc.anim.Transition.SINE_OUT};
			var endParam = {x:myPin.getX()+moveRate+moveAdjust,y:myPin.getY(),time:500,transition:arc.anim.Transition.SINE_OUT}
			var myAnim = new arc.anim.Animation(myPin,startParam,endParam);
			myAnim.play();
		}
	},
	gain:function(card){
		var movePins = [];
		var targetPins = (card.getSide() == "enemy")? this._playerPins : this._enemyPins;
		var moveRate = (card.getSide() == "enemy")? -(card.getOffense()/card.getRank()) : card.getOffense()/card.getRank();
		for(var k = 0; k < targetPins.length; k++){
			if(targetPins[k].point.position == card.getPosition()){
				movePins.push(targetPins[k]);
			}
		}
		/*
		var myPin = movePins[Math.floor(movePins.length*Math.random())].pin;
		var moveAdjust = (card.getSide() == "player")? Math.floor(Math.random()*card.getRank()) : -(Math.floor(Math.random()*card.getRank()));
		var startParam = {x:myPin.getX(),y:myPin.getY(),time:0,transition:arc.anim.Transition.SINE_OUT};
		var endParam = {x:myPin.getX()+moveRate+moveAdjust,y:myPin.getY(),time:500,transition:arc.anim.Transition.SINE_OUT}
		var myAnim = new arc.anim.Animation(myPin,startParam,endParam);
		myAnim.play();
		*/
		for(var l = 0; l < movePins.length; l++){
			var myPin = movePins[l].pin;
			var moveAdjust = (card.getSide() == "player")? Math.floor(Math.random()*card.getRank()) : -(Math.floor(Math.random()*card.getRank()));
			var startParam = {x:myPin.getX(),y:myPin.getY(),time:0,transition:arc.anim.Transition.SINE_OUT};
			var endParam = {x:myPin.getX()+moveRate+moveAdjust,y:myPin.getY(),time:500,transition:arc.anim.Transition.SINE_OUT}
			var myAnim = new arc.anim.Animation(myPin,startParam,endParam);
			myAnim.play();
			console.log("pitchからの出力：",l,":",moveRate,":",moveAdjust,myPin.getX());
		}
	}
})

/*
スコアパネルの定義
-プレイヤーと相手の2者の現在の得点をそれぞれ表示するパネル
-ステージにより二つ作成され、ゲームの進行により表示する数値がインクリメントされる
*/
var ScorePanel = arc.Class.create(arc.display.DisplayObjectContainer,{
	_playerScore:0,
	_enemyScore:0,
	_playerName:null,
	_enemyName:null,
	_playerScorePanel:null,
	_enemyScorePanel:null,
	initialize:function(obj){
		this._playerScorePanel = new arc.display.TextField();
		this._playerScorePanel.setFont("メイリオ",40);
		this._playerScorePanel.setColor(0xffffff);
		this._playerScorePanel.setText(this._playerScore);
		this._playerScorePanel.setAlign(arc.display.Align.CENTER);
		this._playerScorePanel.setX(110);
		this._playerScorePanel.setY(60);
		this.addChild(this._playerScorePanel);
		
		this._enemyScorePanel = new arc.display.TextField();
		this._enemyScorePanel.setFont("メイリオ",40);
		this._enemyScorePanel.setColor(0xffffff);
		this._enemyScorePanel.setText(this._enemyScore);
		this._enemyScorePanel.setX(210);
		this._enemyScorePanel.setY(60);
		this._enemyScorePanel.setAlign(arc.display.Align.CENTER);
		this.addChild(this._enemyScorePanel);
	},
	updateScore:function(team){
		switch (team){
			case "player" :
				this._playerScore++;
				this._playerScorePanel.setText(this._playerScore);
				break;
			case "enemy" :
				this._enemyScore++;
				this._enemyScorePanel.setText(this._enemyScore);
				break;
		}
	},
	getScore:function(){
		var myscores = {};
		myscores.playerScore = this._playerScore;
		myscores.enemyScore = this._enemyScore;
		return myscores;
	}
});


/*
チームパネルの定義
-プレイヤーと相手のそれぞれのチームロゴをそれぞれ表示するパネル
-ステージにより二つ作成され、ゲーム終了までスコアパネルのラベルとして表示
*/
var Emblem = arc.Class.create(arc.display.DisplayObjectContainer,{
	initialize:function(obj){
		var mainImage = new arc.display.Sprite(obj.mainImage);
		this.addChild(mainImage);
	}
})

/*
タイムパネルの定義
-試合時間の表示を行うパネル
-ステージにより作成され、ゲーム進行状況を時間で表示する
-1プレイを3つのドラムがそれぞれ回転／ストップし、試合が進行する事とする
-1プレイで5分が経過したと見なし、前後半それぞれ45分ずつ経過。全部18プレイ行うと、1試合終わった事になる
-前半／後半表示と、全90分表示のいずれかの表示形式が選択できる
*/

var TimePanel = arc.Class.create(arc.display.DisplayObjectContainer,{
	_limitCount:18,
	_halfCount:9,
	_nowCount:0,
	_clockBase:null,
	_clockHand:null,
	_halfStatus:0,
	_rotateRate:360/12,
	_halfStatusView:null,
	initialize:function(obj){
		this._clockBase = new arc.display.Sprite(obj.base);
		this._clockHand = new arc.display.DisplayObjectContainer();
		_halfStatusView = obj.halfStatusView;
		var handImage = new arc.display.Sprite(obj.hand);
		this._clockHand.addChild(handImage);
		handImage.setX(0 - handImage.getWidth() / 2);
		handImage.setY(0 - handImage.getHeight() / 2);
		
		this.addChild(this._clockBase);
		this.addChild(this._clockHand);
		this._clockHand.setX(this._clockBase.getWidth()/2+1);
		this._clockHand.setY(this._clockBase.getHeight()/2+1);
	},
	updateTime:function(count){
		if(this._limitCount > count){
			var nowRotate = this._rotateRate*count;
			if(this._halfCount < count){
				nowRotate = this._rotateRate*(count - this._halfCount);
			}
			else if(this._halfCount == count){
				_halfStatusView.updateSecondStatus();
				nowRotate = this._rotateRate*count;
			}
			else if(this._halfCount+1 == count){
				nowRotate = 0;
			}
			this._clockHand.setRotation(nowRotate);
		}
		else if(this._limitCount == count){
			_halfStatusView.updateEndStatus();
			this._nowCount = 0;
			return "end";
		}
	}
});

var HalfStatusView = arc.Class.create(arc.display.DisplayObjectContainer,{
	_statusField:"",
	initialize:function(obj){
		this._statusField = new arc.display.TextField();
		this._statusField.setColor(0xffffff);
		this._statusField.setText("1st Half");
		this._statusField.setFont("メイリオ",14);
		this._statusField.setAlign(arc.display.Align.CENTER);
		this.addChild(this._statusField);
	},
	updateSecondStatus:function(){
		this._statusField.setText("2nd Half");
	},
	updateEndStatus:function(){
		this._statusField.setText("Full time");
	}
});


//ここがゲーム内パラメータを全部もっていて、これを参照してデータにアクセスするようにする
var _parameterManager = null;

//JSONのURLを受け取って読み込む。コールバックを受け取っていたら、それを実行
var jsonLoader = function(url,callBackFunc){
	var dataLoader = new arc.Ajax();
	dataLoader.addEventListener(arc.Event.COMPLETE,function(e){
		var myObj = this.getResponseJSON();
		_parameterManager = new ParameterManager(myObj);
		
		if(callBackFunc != null){
			callBackFunc.call(this);
		}
	});
	dataLoader.addEventListener(arc.Event.ERROR,function(e){
		console.log(e.type);
	});
	dataLoader.load(url);
}

/*
ドラムストップとgrowに応じて、ピッチビューの更新を行う
どこに書くかは未定
挙動としては、
1.ストップしたカードのidを取得
2.ピッチビュー上の対応するpinをgrowポイントに応じて移動させる
3.敵フィールドに侵入したり、フォースポイントに大きな差が生じたりした場合、ピッチビューの表示に変化を与える
*/


/*
処理の流れ
1.ユーザーIDを元にゲームに必要な情報をDBに問い合わせ	0%
2.JSONにより情報を取得	60%
3.サーバより取得した情報を元に画面の構築	40%
4.カード情報を元にカードの生成	80%
5.出来上がったカードを元にドラムの生成	80%
6.ドラムを配置したスロットの生成	70%（不要かも）
7.必要な画面部品の生成と配置（スコアパネル、チームパネル、タイムパネル、プレイボタン）	40%
8.ユーザー入力の受付を開始して、ゲームスタート	10%
9.ユーザーアクションに基づいて、各イベントを発行	??%
10.イベント毎に、対応した部品の表示を更新	50%
11.一定のプレイ回数を終えたら、ゲームの終了イベントを発行	0%
12.終了画面へ移行し、結果をサーバに通知	0%
13.ゲームを抜けて、メニュー画面へ	0%
*/


//メインとなるGameクラス
var FootSlotMain = arc.Class.create(arc.Game,{
	_slot:null,
	_time:0,
	_count:0,
	_controllButton:null,
	_playerEmblem:null,
	_enemyEmblem:null,
	_owner:null,
	system:null,
	_background:null,
	initialize:function(params){
		system = this._system;
		_background = new arc.display.Sprite(system.getImage(_parameterManager._uiImages[0]));
		this.addChild(_background);
		
		
		//プレイヤードラムの作成
		var playerPanelArr = [];
		var player_cards = _parameterManager._allPlayerCards;
		var player_images = _parameterManager._playerImages;
		for(var i = 0; i < player_cards.length; i++){
			var myObj = player_cards[i];
			myObj.imageObj = system.getImage(player_images[i]);
			var myPlayerCard = new PlayerCard(myObj);
			playerPanelArr.push(myPlayerCard);
		}
		var playerDramObj = {};
		playerDramObj.cards = playerPanelArr;
		playerDramObj.stageHeight = 200;
		playerDramObj.delay = 0;
		playerDramObj.speed = 60;
		
		//アクションドラムの作成
		var actionPanelArr = [];
		var action_cards = _parameterManager._actionCards.concat(_parameterManager._actionCards);
		var action_images = _parameterManager._actionImages.concat(_parameterManager._actionImages);
		for(var i = 0; i < action_cards.length; i++){
			var myObj = action_cards[i];
			myObj.imageObj = system.getImage(action_images[i]);
			var myActionCard = new ActionCard(myObj);
			actionPanelArr.push(myActionCard);
		}
		var actionDramObj = {};
		actionDramObj.stageHeight = 200;
		actionDramObj.delay = 5;
		actionDramObj.speed = 60;
		actionDramObj.cards = actionPanelArr;
		
		//チェンジ用アクションドラムの作成
		
		for(var j = 0; j < _parameterManager._fwactionCards.length; j++){
			var myObj = _parameterManager._fwactionCards[j];
			myObj.imageObj = system.getImage(_parameterManager._fwactionImages[j]);
			var myActionCard = new ActionCard(myObj);
			_parameterManager._fwactionCards[j] = myActionCard;
		}
		var fwActionDramObj = {};
		fwActionDramObj.stageHeight = 200;
		fwActionDramObj.delay = 5;
		fwActionDramObj.speed = 60;
		fwActionDramObj.cards = _parameterManager._fwactionCards;
		
		for(var m = 0; m < _parameterManager._mfactionCards.length; m++){
			var myObj = _parameterManager._mfactionCards[m];
			myObj.imageObj = system.getImage(_parameterManager._mfactionImages[m]);
			var myActionCard = new ActionCard(myObj);
			_parameterManager._mfactionCards[m] = myActionCard;
		}
		var mfActionDramObj = {};
		mfActionDramObj.stageHeight = 200;
		mfActionDramObj.delay = 5;
		mfActionDramObj.speed = 60;
		mfActionDramObj.cards = _parameterManager._mfactionCards;
		
		for(var n = 0; n < _parameterManager._dfactionCards.length; n++){
			var myObj = _parameterManager._dfactionCards[n];
			myObj.imageObj = system.getImage(_parameterManager._dfactionImages[n]);
			var myActionCard = new ActionCard(myObj);
			_parameterManager._dfactionCards[n] = myActionCard;
		}
		var dfActionDramObj = {};
		dfActionDramObj.stageHeight = 200;
		dfActionDramObj.delay = 5;
		dfActionDramObj.speed = 60;
		dfActionDramObj.cards = _parameterManager._dfactionCards;
		
		for(var o = 0; o < _parameterManager._gkactionCards.length; o++){
			var myObj = _parameterManager._gkactionCards[o];
			myObj.imageObj = system.getImage(_parameterManager._gkactionImages[o]);
			var myActionCard = new ActionCard(myObj);
			_parameterManager._gkactionCards[o] = myActionCard;
		}
		var gkActionDramObj = {};
		gkActionDramObj.stageHeight = 200;
		gkActionDramObj.delay = 5;
		gkActionDramObj.speed = 60;
		gkActionDramObj.cards = _parameterManager._gkactionCards;
		
		
		//リザルトドラムの作成
		var resultPanelArr = [];
		result_cards = _parameterManager._resultCards.concat(_parameterManager._resultCards).concat(_parameterManager._resultCards);
		result_images = _parameterManager._resultImages.concat(_parameterManager._resultImages).concat(_parameterManager._resultImages);
		for(var k = 0; k < result_cards.length; k++){
			var myObj = result_cards[k];
			var myResultCard = new ActionCard(myObj);
			myResultCard.setSprite(system.getImage(result_images[k]));
			resultPanelArr.push(myResultCard);
		}
		var resultDramObj = {};
		resultDramObj.stageHeight = 200;
		resultDramObj.delay = 10;
		resultDramObj.speed = 60;
		resultDramObj.cards = resultPanelArr;
		
		var scorePanel = new ScorePanel();
		
		var halfStatusView = new HalfStatusView();
		halfStatusView.setX(this.getWidth()/2);
		halfStatusView.setY(25);
		
		var timeObj = {};
		timeObj.base = system.getImage(_parameterManager._uiImages[2]);
		timeObj.hand = system.getImage(_parameterManager._uiImages[1]);
		timeObj.halfStatusView = halfStatusView;
		var timeView = new TimePanel(timeObj);
		timeView.setScaleX(0.6);
		timeView.setScaleY(0.6);
		timeView.setX(this.getWidth()/2 - timeView.getWidth() / 2);
		timeView.setY(35);
		
		var effectImages = [];
		for(var l = 0; l < _parameterManager._effectImages.length; l++){
			effectImages.push(system.getImage(_parameterManager._effectImages[l]));
		}
		
		var effectArea = new EffectArea({effectImages:effectImages});
		effectArea.setX(0);
		effectArea.setY(0);
		
		var pitchObj = {};
		pitchObj.base = system.getImage(_parameterManager._uiImages[3]);
		pitchObj.playerPin = system.getImage(_parameterManager._uiImages[4]);
		pitchObj.enemyPin = system.getImage(_parameterManager._uiImages[5]);
		pitchObj.players = _parameterManager._playerCards;
		pitchObj.enemies =_parameterManager._enemyCards;
		
		var pitchPanel = new Pitch(pitchObj);
		pitchPanel.setX(system.getWidth()/2 - pitchPanel.getWidth() / 2);
		pitchPanel.setY(300);
		
		var slotObj = {
			"player":playerDramObj,
			"action":actionDramObj,
			"result":resultDramObj,
			"timeView":timeView,
			"scorePanel":scorePanel,
			"playerForce":_parameterManager._playerForce,
			"enemyForce":_parameterManager._enemyForce,
			"effectPanel":effectArea,
			"pitchPanel":pitchPanel,
			"fwaction":fwActionDramObj,
			"mfaction":mfActionDramObj,
			"dfaction":dfActionDramObj,
			"gkaction":gkActionDramObj,
			"timeUpFunc":this.timeUp
		};
		
		_slot = new Slot(slotObj);
		_slot.setY(96);
		
		_owner = this;
		
		this._playerEmblem = new Emblem({mainImage:system.getImage(_parameterManager._uiImages[10])});
		this._playerEmblem.setX(24);
		this._playerEmblem.setY(20);
		
		this._enemyEmblem = new Emblem({mainImage:system.getImage(_parameterManager._uiImages[11])});
		this._enemyEmblem.setX(228);
		this._enemyEmblem.setY(20);
		
		/*
		var headPanel = new arc.display.Sprite(system.getImage(_parameterManager._uiImages[7]));
		this.addChild(headPanel);
		
		var bottomPanel = new arc.display.Sprite(system.getImage(_parameterManager._uiImages[8]));
		bottomPanel.setY(420 - bottomPanel.getHeight());
		this.addChild(bottomPanel);
		*/
		
		this.addChild(this._playerEmblem);
		this.addChild(this._enemyEmblem);
		this.addChild(halfStatusView);
		this.addChild(pitchPanel);
		this.addChild(scorePanel);
		this.addChild(timeView);
		this.addChild(_slot);
		this.addChild(effectArea);
	},
	timeUp:function(){
		var resultObj = {};
		resultObj.player1stScore = 2;
		resultObj.enemy1stScore = 1;
		resultObj.player2ndScore = 3;
		resultObj.enemy2ndScore = 5;
		resultObj.playerEmblem = system.getImage(_parameterManager._uiImages[10]);
		resultObj.enemyEmblem = system.getImage(_parameterManager._uiImages[11]);
		resultObj.resultTitle = system.getImage(_parameterManager._uiImages[6]);
		resultObj.resultMessage = system.getImage(_parameterManager._uiImages[9]);
		
		
		_owner._removeAllChild();
		_owner.addChild(_background);
		
		var resultPanel = new ResultPanel(resultObj);
		_owner.addChild(resultPanel);
		_owner.addEventListener(arc.Event.TOUCH_START,_owner.gameEnd);
		
		console.log("ゲーム終了",_owner);
	},
	update:function(){
		_slot.update();
	},
	gameEnd:function(){
		console.log("タイトルへ",_owner)
		document.location.reload();
	}
});


var ResultPanel = arc.Class.create(arc.display.DisplayObjectContainer,{
	_playerScore:0,
	_enemyScore:0,
	_player1stScore:0,
	_enemy1stScore:0,
	_player2ndScore:0,
	_enemy2ndScore:0,
	_playerEmblem:null,
	_enemyEmblem:null,
	initialize:function(obj){
		this._player1stScore = obj.player1stScore;
		this._enemy1stScore = obj.enemy1stScore;
		this._player2ndScore = obj.player2ndScore;
		this._enemy2ndScore = obj.enemy2ndScore;
		this._playerScore = this._player1stScore + this._player2ndScore;
		this._enemyScore = this._enemy1stScore + this._enemy2ndScore;
		this._playerEmblem = new Emblem({mainImage:obj.playerEmblem});
		this._playerEmblem.setX(16);
		this._playerEmblem.setY(162);
		this._enemyEmblem = new Emblem({mainImage:obj.enemyEmblem});
		this._enemyEmblem.setX(245);
		this._enemyEmblem.setY(162);
		
		
		var resultTitle = new arc.display.Sprite(obj.resultTitle);
		resultTitle.setX(50);
		resultTitle.setY(66);
		this.addChild(resultTitle);
		
		var resultMessage = new arc.display.Sprite(obj.resultMessage);
		resultMessage.setX(40);
		resultMessage.setY(316);
		this.addChild(resultMessage);
		
		var playerScoreField = new arc.display.TextField();
		playerScoreField.setFont("メイリオ",40);
		playerScoreField.setColor(0xffffff);
		playerScoreField.setText(this._playerScore);
		playerScoreField.setAlign(arc.display.Align.CENTER);
		playerScoreField.setX(110);
		playerScoreField.setY(202);
		this.addChild(playerScoreField);
		
		var enemyScoreField = new arc.display.TextField();
		enemyScoreField.setFont("メイリオ",40);
		enemyScoreField.setColor(0xffffff);
		enemyScoreField.setText(this._enemyScore);
		enemyScoreField.setAlign(arc.display.Align.CENTER);
		enemyScoreField.setX(210);
		enemyScoreField.setY(202);
		this.addChild(enemyScoreField);
		
		this.addChild(this._playerEmblem);
		
		this.addChild(this._enemyEmblem);
		
	}
	
});

var leftHalfPoints = [
	{x:70,y:6,position:"GK"},
	{x:65,y:14,position:"GK"},
	{x:56,y:25,position:"GK"},
	{x:46,y:38,position:"GK"},
	{x:33,y:54,position:"GK"},
	{x:89,y:5,position:"DF"},
	{x:84,y:14,position:"DF"},
	{x:79,y:24,position:"DF"},
	{x:70,y:38,position:"DF"},
	{x:61,y:54,position:"DF"},
	{x:107,y:6,position:"MF"},
	{x:104,y:14,position:"MF"},
	{x:98,y:25,position:"MF"},
	{x:93,y:39,position:"MF"},
	{x:87,y:54,position:"MF"},
	{x:124,y:5,position:"MF"},
	{x:123,y:14,position:"MF"},
	{x:120,y:25,position:"MF"},
	{x:116,y:38,position:"MF"},
	{x:112,y:54,position:"MF"},
	{x:143,y:6,position:"FW"},
	{x:142,y:14,position:"FW"},
	{x:142,y:24,position:"FW"},
	{x:140,y:39,position:"FW"},
	{x:139,y:54,position:"FW"}
];

var rightHalfPoints = [
	{x:233,y:5,position:"GK"},
	{x:240,y:14,position:"GK"},
	{x:247,y:24,position:"GK"},
	{x:258,y:39,position:"GK"},
	{x:270,y:54,position:"GK"},
	{x:214,y:5,position:"DF"},
	{x:219,y:14,position:"DF"},
	{x:225,y:24,position:"DF"},
	{x:233,y:38,position:"DF"},
	{x:242,y:53,position:"DF"},
	{x:197,y:5,position:"MF"},
	{x:200,y:14,position:"MF"},
	{x:204,y:24,position:"MF"},
	{x:211,y:38,position:"MF"},
	{x:217,y:54,position:"MF"},
	{x:179,y:6,position:"MF"},
	{x:181,y:14,position:"MF"},
	{x:183,y:25,position:"MF"},
	{x:187,y:38,position:"MF"},
	{x:191,y:54,position:"MF"},
	{x:161,y:5,position:"FW"},
	{x:162,y:14,position:"FW"},
	{x:163,y:24,position:"FW"},
	{x:164,y:38,position:"FW"},
	{x:165,y:55,position:"FW"}
];

/*
配列をシャッフルして、ドラムが偏らないようにする処理必要
*/
var shuffleArr = function(arr){
	var limitCount = arr.length;
	var workArray = arr.slice();
	var shuffledArray = [];
	while(limitCount > 0){
		var myId = Math.floor(Math.random()*workArray.length);
		shuffledArray.push(workArray[myId]);
		workArray.splice(myId,1);
		limitCount--;
	}
	return shuffledArray;
}

var MAIN_SYSTEM;
var data_path = "http://footslot-nendee.dotcloud.com/game_data.json";

//DOMのロード完了とともに、Systemを初期化する
window.addEventListener("DOMContentLoaded",function(event) {
	var myLoader = jsonLoader(data_path,function(){
		MAIN_SYSTEM.load(_parameterManager._cardImages);
	});
	MAIN_SYSTEM = new arc.System(320, 420, "stage");
	MAIN_SYSTEM.setGameClass(FootSlotMain, {title: "Henry"});
	MAIN_SYSTEM.addEventListener(arc.Event.PROGRESS, function(e){
		
	});
	MAIN_SYSTEM.addEventListener(arc.Event.COMPLETE, function(e){
		console.log('loaded');
	});
}, false);
})();
