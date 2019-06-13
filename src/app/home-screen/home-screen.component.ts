import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Page } from 'tns-core-modules/ui/page/page';
import { screen } from 'tns-core-modules/platform'
import { Difficulty } from '../models/diifcultyModel';
import { GestureTypes, TouchGestureEventData, PanGestureEventData } from "tns-core-modules/ui/gestures";
import { GridLayout } from "tns-core-modules/ui/layouts/grid-layout";
import { AnimationCurve } from "tns-core-modules/ui/enums";


@Component({
	moduleId: module.id,
	selector: 'home-screen',
	templateUrl: './home-screen.component.html',
	styleUrls: ['./home-screen.component.css']
})

export class HomeScreenComponent implements OnInit {

	tempAplphabets: any[] =  [{
		alphabet: 'A',
		backColor: 'green',
		alphaColor: 'white'
	},
	{
		alphabet: 'B',
		backColor: 'yellow',
		alphaColor: 'black'
	},
	{
		alphabet: 'C',
		backColor: 'blue',
		alphaColor: 'white'
	},
	{
		alphabet: 'D',
		backColor: 'red',
		alphaColor: 'white'
	},
	{
		alphabet: 'E',
		backColor: 'orange',
		alphaColor: 'black'
	},
	{
		alphabet: 'F',
		backColor: 'pink',
		alphaColor: 'black'
	},
	{
		alphabet: 'G',
		backColor: 'purple',
		alphaColor: 'white'
	},
	{
		alphabet: 'H',
		backColor: 'black',
		alphaColor: 'white'
	},
	{
		alphabet: 'I',
		backColor: 'green',
		alphaColor: 'white'
	},
	{
		alphabet: 'J',
		backColor: 'yellow',
		alphaColor: 'black'
	},
	{
		alphabet: 'K',
		backColor: 'blue',
		alphaColor: 'white'
	},
	{
		alphabet: 'L',
		backColor: 'red',
		alphaColor: 'white'
	}];
	colorArray: string[] = ['blue', 'red', 'green', 'yellow', 'pink', 'purple', 'black', 'orange', 'white'];
	characterArray: any[] = [];
	gridArray: any[] = [];
	gridSize: number = 0;
	difficulty: Difficulty = Difficulty.Easy;
	gridSpan: number = 0;
	colLength: number = 0;
	prevDeltaX: number = 0;
	prevDeltaY: number = 0;
	public coordX: number = 0;
    public coordY: number = 0;


	@ViewChild('container', { static: true }) container: ElementRef;
	itemContainer: GridLayout;

	@ViewChild('gameGrid', { static: true }) gameGrid: ElementRef;

	constructor(private page: Page) {
		this.page.actionBarHidden = true;
		this.gridSize = screen.mainScreen.widthDIPs;
	}

	ngOnInit() {
		this.formGridArray();
		this.formAlphabetArray();
		this.itemContainer = <GridLayout>this.container.nativeElement;
	}

	formGridArray() {
		this.gridArray = [];
		var gridLength = Math.pow(this.difficulty, 2);
		for (var i = 0; i < gridLength; i++) {
			var randomNumber = Math.floor(Math.random() * this.colorArray.length);
			this.gridArray.push(this.colorArray[randomNumber]);
		}
	}

	formAlphabetArray(){
		this.characterArray = [];
		var alphabetLength = this.difficulty * 2;
		for (var i = 0; i < alphabetLength; i++) {
			var randomNumber = Math.floor(Math.random() * this.tempAplphabets.length);
			this.characterArray.push(this.tempAplphabets[randomNumber]);
		}
		this.colLength = Math.ceil(this.characterArray.length / 2);
	}

	getCharacterColumn() {
		var colString = '';
		this.gridSpan = this.colLength;
		for (var i = 0; i < this.colLength; i++) {
			colString = colString + '*,';
		}
		return colString;
	}

	getRow(index: number) {
		if (index >= this.colLength) {
			return 3;
		} else {
			return 2;
		}
	}

	getGridRow(index: number) {
		return Math.floor(index / this.difficulty);
	}

	getCol(index: number) {
		if (index >= this.colLength) {
			return index - this.colLength;
		} else {
			return index;
		}
	}

	getGridCol(index: number) {
		return Math.floor(index % this.difficulty);
	}

	getGridSize() {
		switch (this.difficulty) {
			case Difficulty.Easy:
				return '*,*,*,*';
			case Difficulty.Medium:
				return '*,*,*,*,*';
			case Difficulty.Complex:
				return '*,*,*,*,*,*';
			default: break;
		}
	}

	setDifficulty(difficulty: string) {
		switch (difficulty) {
			case 'Easy':
				this.difficulty = Difficulty.Easy;
				this.formGridArray();
				this.formAlphabetArray();
				break;
			case 'Medium':
				this.difficulty = Difficulty.Medium;
				this.formGridArray();
				this.formAlphabetArray();
				break;
			case 'Complex':
				this.difficulty = Difficulty.Complex;
				this.formGridArray();
				this.formAlphabetArray();
				break;
			default: break;
		}
	}

	onPan(args: PanGestureEventData) {
		console.log("Pana: [" + args.deltaX + ", " + args.deltaY + "] state: " + args.state);

		if (args.state === 1) // down
		{
			this.prevDeltaX = 0;
			this.prevDeltaY = 0;
		}
		else if (args.state === 2) // panning
		{
			args.view.translateX += args.deltaX - this.prevDeltaX;
			args.view.translateY += args.deltaY - this.prevDeltaY;
			this.prevDeltaX = args.deltaX;
			this.prevDeltaY = args.deltaY;

			// let convFactor = +args.view.width / args.view.getMeasuredWidth();
			// let edgeX = (this.itemContainer.getMeasuredWidth() - args.view.getMeasuredWidth()) * convFactor;
			// let edgeY = (this.itemContainer.getMeasuredHeight() - args.view.getMeasuredHeight()) * convFactor;

			// // X border
			// if (args.view.translateX < 0) {
			// 	args.view.translateX = 0;
			// }
			// else if (args.view.translateX > edgeX) {
			// 	args.view.translateX = edgeX;
			// }

			// // Y border
			// if (args.view.translateY < 0) {
			// 	args.view.translateY = 0;
			// }
			// else if (args.view.translateY > edgeY) {
			// 	args.view.translateY = edgeY;
			// }
			console.log('Window Location', args.view.getLocationRelativeTo(args.view));
		}
		else if (args.state === 3) // up
		{
			let gameGrid: GridLayout = <GridLayout>this.gameGrid.nativeElement;
			let originX = gameGrid.originX;
			let originY = gameGrid.originY;
			this.page.on("touch", (args1: TouchGestureEventData) => {
				console.log('touch location:  x= ', args1.getX(), ' y= ', args1.getY());
				if (args1.action === 'up') {
					if ((args1.getX() > originX && args1.getX() < originX + 100) && (args1.getY() > originY && args1.getY() < originY + 100)) {
						// args.view.animate({
						// 	translate: { x: args.deltaX, y: args.deltaY },
						// 	duration: 1000,
						// 	curve: AnimationCurve.cubicBezier(0.1, 0.1, 0.1, 1)
						// });
					} else {
						// args.view.animate({
						// 	translate: { x: 0, y: 0 },
						// 	duration: 1000,
						// 	curve: AnimationCurve.cubicBezier(0.1, 0.1, 0.1, 1)
						// });
					}
				} else {
					// args.view.animate({
					// 	translate: { x: 0, y: 0 },
					// 	duration: 1000,
					// 	curve: AnimationCurve.cubicBezier(0.1, 0.1, 0.1, 1)
					// });
				}
			})
			// args.view.animate({
			// 	translate: { x: 0, y: 0 },
			// 	duration: 1000,
			// 	curve: AnimationCurve.cubicBezier(0.1, 0.1, 0.1, 1)
			// });
		}
	}

	onTouch(args: TouchGestureEventData) {
        console.log("Object that triggered the event: " + args.object);
        console.log("View that triggered the event: " + args.view);
        console.log("Event name: " + args.eventName);
        console.log("Touch action (up, down, cancel or move)" + args.action);
        console.log("Touch point: [" + args.getX() + ", " + args.getY() + "]");
        console.log("activePointers: " + args.getActivePointers().length);
        this.coordX = args.getX();
        this.coordY = args.getY();
	}
	
}