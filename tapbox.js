//	Written by Levan Roinishvili ( facebook.com/levanroinishvili )
//	Version: 1.1
//			radioAllReset() added
//
//	This scripts drives select boxes functionality.
//		These are clickable boxes that replace drop-down menues
//
//	Usage:
//		2. Crate all the HTML and CSS:
//			1.1	Boxes
//			1.2 Styles, inclusing "active" styles (when the box becomes "active")
//			1.3	Forms and hidden fields - if you need to store values in the form field
//		3. Give each box an unique id, using HTML "id" attribute.
//		4. Give each box a value, using either "value" or "data-value" attribute
//			Example:
//			<div id="box1" value="1">One</div>			// Value is '1'
//			<div id="box2" data-value="2">Two</div>		// Value is '2'
//			<div id="box2"><b>Three</b></div>			// Value is '<b>Three</b>'
//		5. Call either newRadioGroup() or newCheckGroup() to create AFTER all the DOM elements are created
//			newRadioGroup()		// Creates radio buttons (only one can be pressed at a time.)
//			newCheckGroup()		// Creates check boxes. (Several can be selected at a time). You can specify some of them to be 'exclusive'
//
//			Use one of the following syntax:
//
//
//	newRadioGroup('myGroupName1',		'box1','box2','box3'														);
//	newRadioGroup('myGroupName2',	[	'box1','box2','box3'	]													);
//	newRadioGroup('myGroupName3',	[	'box1','box2','box3'	],	'activeClass'									);
//	newRadioGroup('myGroupName3',	[	'box1','box2','box3'	],	'activeClass,	document.myForm.hiddenField		);
//	newRadioGroup('myGroupName3',	[	'box1','box2','box3'	],				null,				'activeClass'	);
//	newRadioGroup('myGroupName4',		'box1', ['box2'], {id:'box3',active:true,activeClass:'privateActiveClass'},  ['box4',true], ['box5',true], ['box6',true,'privateActiveClass']		);
//	newRadioGroup('myGroupName5',	[	'box1', ['box2'], {id:'box3',active:true,activeClass:'privateActiveClass'},  ['box4',true], ['box5',true], ['box6',true,'privateActiveClass']	], 'activeClass'	);
//	newRadioGroup('myGroupName6',	[	'box1', ['box2'], {id:'box3',active:true,activeClass:'privateActiveClass'},  ['box4',true], ['box5',true], ['box6',true,'privateActiveClass']	], 'activeClass',	document.myForm.hiddenField);
//
//
//	newCheckGroup('myGroupName1',		'box1','box2','box3'														);
//	newCheckGroup('myGroupName2',	[	'box1','box2','box3'	]													);
//	newCheckGroup('myGroupName3',	[	'box1','box2','box3'	],	'activeClass'									);
//	newCheckGroup('myGroupName3',	[	'box1','box2','box3'	],	'activeClass',	document.myForm.hiddenField		);
//	newCheckGroup('myGroupName3',	[	'box1','box2','box3'	],	'activeClass',				null,				);
//	newCheckGroup('myGroupName4',		'box1', ['box2'], {id:'box3',exclusive:true,active:true,activeClass:'privateActiveClass'},  ['box4',true], ['box5',true,true], ['box6',true,true,'privateActiveClass']		);
//	newCheckGroup('myGroupName5',	[	'box1', ['box2'], {id:'box3',exclusive:true,active:true,activeClass:'privateActiveClass'},  ['box4',true], ['box5',true,true], ['box6',true,true,'privateActiveClass']	],	'activeClass'	);
//	newCheckGroup('myGroupName6',	[	'box1', ['box2'], {id:'box3',exclusive:true,active:true,activeClass:'privateActiveClass'},  ['box4',true], ['box5',true,true], ['box6',true,true,'privateActiveClass']	],	'activeClass', document.myForm.hiddenField	);
//
//		6. Values are automatically inserted into the form fields, if the form field is specified.
//		7. To manually get value of any group, use the following:
//	var v = findRadioGroup('myGroupName5').value();
//		8. Use radioAllReset() function to reset all checkboxes and radio boxes to initial values


function radioAllReset() {
	radioset.allradiogroups.forEach(function(g) {g.resetAll();});
}

function radiobox(domID,exclusive,startsActive,ownActiveClass,secondClickDeactivates) {
	if ( typeof exclusive		=== 'undefined' ) exclusive			=false;
	if ( typeof startsActive	=== 'undefined' ) startsActive		=false;
	if ( typeof ownActiveClass	=== 'undefined' ) ownActiveClass	=null;
	if ( typeof secondClickDeactivates	=== 'undefined' ) secondClickDeactivates=true;

	this.domID			= domID;
	this.dom			= document.getElementById(domID) ;
	this.exclusive		= exclusive;
	this.startsActive	= startsActive;
	this.active			= startsActive;
	this.activeClass	= ownActiveClass;
	this.secondClickDeactivates = secondClickDeactivates;
	this.radiogroup		= null;

	// Add event listener
	var thisBox			= this;
	this.dom.addEventListener("click",function(){thisBox.toggle();});

	this.deactivate		=	function() {
		this.active=false;
		if (this.activeClass) this.dom.classList.remove(this.activeClass);
		this.dom.classList.remove(this.radiogroup.activeClass);
	};

	// Only activate this box. No checking for exclusives and de-activating others
	this.activate		= function() {
		this.active=true;
		if (this.activeClass) this.dom.classList.add(this.activeClass);
		else this.dom.classList.add(this.radiogroup.activeClass);
	};

	this.toggle			= function() {
		if ( this.active && this.secondClickDeactivates ) this.deactivate();
		else {
			if ( this.exclusive ) this.radiogroup.deactivateAll(); else this.radiogroup.deactivateAllExclusive();
			this.activate();
		}
		this.radiogroup.updateValue();
	};

	this.reset		= function() {
		if ( this.active==this.startsActive ) return;
		if ( this.startsActive ) this.activate();
		else this.deactivate();
		this.radiogroup.updateValue();
	};

	// If the box is active or not, reflect on the DOM. Mainly used for startsActive. Called from parent group
	this.showActive		= function() {
		if ( this.active ) {
			if (this.activeClass) this.dom.classList.add(this.activeClass);
			else this.dom.classList.add(this.radiogroup.activeClass);
		} else {
			if (this.activeClass) this.dom.classList.remove(this.activeClass);
			this.dom.classList.remove(this.radiogroup.activeClass);
		}
	};

}

function radiogroup(uniqueGroupName,radioArray,formField,activeClass) {
	if ( typeof activeClass	=== 'undefined' || activeClass==''  ) activeClass	= 'active';
	if ( typeof formField	=== 'undefined' ) formField		=  null;
	this.name			= uniqueGroupName;
	this.boxes			= radioArray;
	this.formField		= formField;
	this.activeClass	= activeClass;

	// Set radiogroup property (parent radio group) for each radiobox to this object, which is currently being constructed
	var thisGroup = this;
	this.boxes.forEach(function(box){box.radiogroup=thisGroup;box.showActive();});

	this.value = function() {
		var val='', valEmpty=true, nextVal;
		this.boxes.forEach(function(box) {
			if ( box.active ) {
				if ( valEmpty ) valEmpty=false; else val+=',';
				if		( document.getElementById(box.domID).getAttribute('value')		!== null )	nextVal = document.getElementById(box.domID).getAttribute('value');
				else if	( document.getElementById(box.domID).getAttribute('data-value')	!== null )	nextVal = document.getElementById(box.domID).getAttribute('data-value');
				else nextVal = document.getElementById(box.domID).innerHTML;
				val += nextVal ;
			}
		});
		return val;
	};

	this.updateValue = function() {
		if (this.formField) this.formField.value = this.value();
	};

	this.deactivateAll	= function() {
		this.boxes.forEach(function(box){if (box.active) box.deactivate();});
	};

	this.deactivateAllExclusive	= function() {
		this.boxes.forEach(function(box){if (box.exclusive && box.active) box.deactivate();});
	};

	this.resetAll = function() {
		this.boxes.forEach(function(b){b.reset();});
	};
}
function allradiogroups() {
	this.allradiogroups = [];
	this.addGroup = function(newRadioGroup) {
		this.allradiogroups.push(newRadioGroup);
	};
	this.findGroup = function(groupName){
		for (var i=0; i<this.allradiogroups.length; i++)
			if ( groupName==this.allradiogroups[i].name ) return this.allradiogroups[i];
		return null;
	};
}

var radioset = new allradiogroups();
function newCheckGroup() {

	if ( arguments.length<2 ) return;

	var groupName, boxes, activeClass='', formfield;
	groupName = arguments[0];
	if ( Array.isArray(arguments[1]) ) {
		boxes=arguments[1];
		if ( arguments.length>2 ) activeClass	= arguments[2];
		if ( arguments.length>3 ) {
			if ( arguments[3]===undefined ) alert("Error: Form input field was passed to put selected values in.\r\n\r\nBut the element is null.");
			else formfield = arguments[3];
		}
	} else {
		boxes = Array.from(arguments).slice(1);
	}

	if ( boxes.length==0 ) return;
	var radiogrp = [];
	boxes.forEach(function(box) {
		if			( typeof box === 'string'	) {
			radiogrp.push( new radiobox(box) );
		} else if	( Array.isArray(box)		) {
			if		(box.length==1) radiogrp.push( new radiobox(box[0]) );
			else if	(box.length==2) radiogrp.push( new radiobox(box[0],box[1]) );
			else if	(box.length==3) radiogrp.push( new radiobox(box[0],box[1],box[2]) );
			else if	(box.length >0) radiogrp.push( new radiobox(box[0],box[1],box[2],box[3]) );
		} else if	( typeof box === 'object'	) radiogrp.push( new radiobox(box.id,box.exclusive,box.active,box.activeClass,box.secondClickDeactivates) );
	});

	var radiogrpOBJ = new radiogroup(groupName,radiogrp,formfield,activeClass);
	if ( formfield ) formfield.value = radiogrpOBJ.value();
	radioset.addGroup(radiogrpOBJ);
}
function newRadioGroup() {
	if ( arguments.length<2 ) return;

	var groupName, boxes, activeClass='', formfield;
	groupName = arguments[0];
	if ( Array.isArray(arguments[1]) ) {
		boxes=arguments[1];
		if ( arguments.length>2 ) activeClass	= arguments[2];
		if ( arguments.length>3 ) {
			if ( arguments[3]===undefined ) alert("Error: Form input field was passed to put selected values in.\r\n\r\nBut the element is null.");
			else formfield = arguments[3];
		}
	} else {
		boxes = Array.from(arguments).slice(1);
	}

	if ( boxes.length==0 ) return;
	var radiogrp = [];
	boxes.forEach(function(box) {
		if			( typeof box === 'string'	) {
			radiogrp.push( new radiobox(box,true) );
		} else if	( Array.isArray(box)		) {
			if		(box.length==1) radiogrp.push( new radiobox(box[0],true) );
			else if	(box.length==2) radiogrp.push( new radiobox(box[0],true,box[1]) );
			else if	(box.length >0) radiogrp.push( new radiobox(box[0],true,box[1],box[2]) );
		} else if	( typeof box === 'object'	) radiogrp.push( new radiobox(box.id,(box.exclusive===false?false:true),box.active,box.activeClass,box.secondClickDeactivates) );
	});

	var radiogrpOBJ = new radiogroup(groupName,radiogrp,formfield,activeClass);
	if ( formfield ) formfield.value = radiogrpOBJ.value();
	radioset.addGroup(radiogrpOBJ);
}

function findRadioGroup(groupName) {
	return radioset.findGroup(groupName);
}
