# tabpox
Create groups of checkboxes and radio boxes


## This scripts drives select boxes functionality.
	These are clickable boxes that replace drop-down menues

Usage:
	2. Crate all the HTML and CSS:
		1.1 Boxes
		1.2 Styles, inclusing "active" styles (when the box becomes "active")
		1.3 Forms and hidden fields - if you need to store values in the form field
	3. Give each box an unique id, using HTML "id" attribute.
	4. Give each box a value, using either "value" or "data-value" attribute
		Example:
		`<div id="box1" value="1">One</div>`			 Value is `1`
		`<div id="box2" data-value="2">Two</div>`		 Value is `2`
		`<div id="box2"><b>Three</b></div>`			 Value is `<b>Three</b>`
	5. Call either newRadioGroup() or newCheckGroup() to create AFTER all the DOM elements are created
		`newRadioGroup()`		 Creates radio buttons (only one can be pressed at a time.)
		`newCheckGroup()`		 Creates check boxes. (Several can be selected at a time). You can specify some of them to be 'exclusive'

		Use one of the following syntax:

		###Simplest:
```			newRadioGroup('myGroupName1',	'box1id','box2id','box3id');
			newCheckGroup('myGroupName1',	'box1id','box2id','box3id');
```
		###All:
```
newRadioGroup('myGroupName1',		'box1','box2','box3'														);
newRadioGroup('myGroupName2',	[	'box1','box2','box3'	]													);
newRadioGroup('myGroupName3',	[	'box1','box2','box3'	],	document.myForm.hiddenField						);
newRadioGroup('myGroupName3',	[	'box1','box2','box3'	],	document.myForm.hiddenField,	'activeClass'	);
newRadioGroup('myGroupName3',	[	'box1','box2','box3'	],				null,				'activeClass'	);
newRadioGroup('myGroupName4',		'box1', ['box2'], {id:'box3',active:true,activeClass:'privateActiveClass'},  ['box4',true], ['box5',true], ['box6',true,'privateActiveClass']		);
newRadioGroup('myGroupName5',	[	'box1', ['box2'], {id:'box3',active:true,activeClass:'privateActiveClass'},  ['box4',true], ['box5',true], ['box6',true,'privateActiveClass']	], 'activeClass'	);
newRadioGroup('myGroupName6',	[	'box1', ['box2'], {id:'box3',active:true,activeClass:'privateActiveClass'},  ['box4',true], ['box5',true], ['box6',true,'privateActiveClass']	], 'activeClass',	document.myForm.hiddenField);
```

```
newCheckGroup('myGroupName1',		'box1','box2','box3'														);
newCheckGroup('myGroupName2',	[	'box1','box2','box3'	]													);
newCheckGroup('myGroupName3',	[	'box1','box2','box3'	],	'activeClass'									);
newCheckGroup('myGroupName3',	[	'box1','box2','box3'	],	'activeClass',	document.myForm.hiddenField		);
newCheckGroup('myGroupName3',	[	'box1','box2','box3'	],	'activeClass',				null,				);
newCheckGroup('myGroupName4',		'box1', ['box2'], {id:'box3',exclusive:true,active:true,activeClass:'privateActiveClass'},  ['box4',true], ['box5',true,true], ['box6',true,true,'privateActiveClass']		);
newCheckGroup('myGroupName5',	[	'box1', ['box2'], {id:'box3',exclusive:true,active:true,activeClass:'privateActiveClass'},  ['box4',true], ['box5',true,true], ['box6',true,true,'privateActiveClass']	],	'activeClass'	);
newCheckGroup('myGroupName6',	[	'box1', ['box2'], {id:'box3',exclusive:true,active:true,activeClass:'privateActiveClass'},  ['box4',true], ['box5',true,true], ['box6',true,true,'privateActiveClass']	],	'activeClass', document.myForm.hiddenField	);
```

	6. Values are automatically inserted into the form fields, if the form field is specified.
	7. To manually get value of any group, use the following:
`var v = findRadioGroup('myGroupName5').value();`
