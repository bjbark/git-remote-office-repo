Ext.define('module.custom.wontc.prod.order.workentry.view.WorkEntryEditor2', { extend: 'Axt.form.Editor',
	alias		: 'widget.module-wontc-workentry-editor2',
	layout : {
		type: 'border'
	},

	width	: '100%',

	initComponent: function(config){
		var me = this;
		me.items = [me.createwest(), me.createcenter(), me.createeast()];
		me.callParent(arguments)  ;
	},


	createwest : function () {
		var me = this,
			item = {
			xtype		: 'form-panel',
			region		: 'west',
			flex		: 1,
			margin		: '3 0 0 0',
			bodyStyle	: { padding: '5px' },
			items : [
				{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '0 0 0 0', width : '100%',
					items	: [
						{	xtype	: 'fieldcontainer'  ,
							layout	: { type: 'vbox', align: 'stretch' } ,
							style	: Const.borderLine.top  + Const.borderLine.left + Const.borderLine.bottom,
							flex	: 1,
							height	: 30,
							margin	: '0 0 2 0',
							items	: [
								{	text	: '* 변경사항', xtype : 'label', style : 'text-align:center; font-size : 1.3em !important;', margin : '6 0 0 0'
								}
							]
						},{	xtype	: 'fieldcontainer'  ,
							layout	: { type: 'vbox', align: 'stretch' } ,
							style	: Const.borderLine.top  + Const.borderLine.left + Const.borderLine.bottom +  Const.borderLine.right,
							flex	: 1,
							height	: 30,
							margin	: '0 0 2 0',
							items	: [
								{	text	: '확인 서명', xtype : 'label', style : 'text-align:center; font-size : 1.3em !important;', margin : '6 0 0 0'
								}
							]
						}
					]
				},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '0 0 0 0', width : '100%',
					items	: [
						{	xtype	: 'fieldcontainer'  ,
							layout	: { type: 'vbox', align: 'stretch' } ,
							style	: Const.borderLine.bottom,
							flex	: 2,
							height	: 27,
							margin	: '0 0 2 0',
							items	: [
								{	xtype		: 'textfield',
									name		: '',
									height		: 27,
									fieldStyle	: 'border-color : #99bce8; border-top : none !important; border-bottom : none !important; border-right : none !important;',
								}
							]
						},{	xtype	: 'fieldcontainer'  ,
							layout	: { type: 'vbox', align: 'stretch' } ,
							style	: Const.borderLine.bottom + Const.borderLine.left,
							flex	: 1,
							height	: 27,
							margin	: '0 0 2 0',
							items	: [
								{	xtype		: 'label',
									text		: 'NC',
									height		: 27,
									style		: 'text-align:center; font-size : 1.3em !important; margin-top : 5px;',
									fieldStyle	: 'border-color : #99bce8; border-top : none !important; border-bottom : none !important; border-right : none !important;',
								}
							]
						},{	xtype	: 'fieldcontainer'  ,
							layout	: { type: 'vbox', align: 'stretch' } ,
							style	: Const.borderLine.bottom,
							flex	: 1,
							height	: 27,
							margin	: '0 0 2 0',
							items	: [
								{	xtype		: 'textfield',
									name		: '',
									height		: 27,
									fieldStyle	: 'border-color : #99bce8; border-top : none !important; border-bottom : none !important;',
								}
							]
						}
					]
				},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '0 0 0 0', width : '100%',
					items	: [
						{	xtype	: 'fieldcontainer'  ,
							layout	: { type: 'vbox', align: 'stretch' } ,
							style	: Const.borderLine.bottom,
							flex	: 2,
							height	: 27,
							margin	: '0 0 2 0',
							items	: [
								{	xtype		: 'textfield',
									name		: '',
									height		: 27,
									fieldStyle	: 'border-color : #99bce8; border-top : none !important; border-bottom : none !important; border-right : none !important;',
								}
							]
						},{	xtype	: 'fieldcontainer'  ,
							layout	: { type: 'vbox', align: 'stretch' } ,
							style	: Const.borderLine.bottom + Const.borderLine.left,
							flex	: 1,
							height	: 27,
							margin	: '0 0 2 0',
							items	: [
								{	xtype		: 'label',
									text		: '후가공',
									height		: 27,
									style		: 'text-align:center; font-size : 1.3em !important; margin-top : 5px;',
									fieldStyle	: 'border-color : #99bce8; border-top : none !important; border-bottom : none !important; border-right : none !important;',
								}
							]
						},{	xtype	: 'fieldcontainer'  ,
							layout	: { type: 'vbox', align: 'stretch' } ,
							style	: Const.borderLine.bottom,
							flex	: 1,
							height	: 27,
							margin	: '0 0 2 0',
							items	: [
								{	xtype		: 'textfield',
									name		: '',
									height		: 27,
									fieldStyle	: 'border-color : #99bce8; border-top : none !important; border-bottom : none !important;',
								}
							]
						}
					]
				},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '0 0 0 0', width : '100%',
					items	: [
						{	xtype	: 'fieldcontainer'  ,
							layout	: { type: 'vbox', align: 'stretch' } ,
							style	: Const.borderLine.bottom,
							flex	: 2,
							height	: 27,
							margin	: '0 0 2 0',
							items	: [
								{	xtype		: 'textfield',
									name		: '',
									height		: 27,
									fieldStyle	: 'border-color : #99bce8; border-top : none !important; border-bottom : none !important; border-right : none !important;',
								}
							]
						},{	xtype	: 'fieldcontainer'  ,
							layout	: { type: 'vbox', align: 'stretch' } ,
							style	: Const.borderLine.bottom + Const.borderLine.left,
							flex	: 1,
							height	: 27,
							margin	: '0 0 2 0',
							items	: [
								{	xtype		: 'label',
									text		: '절곡',
									height		: 27,
									style		: 'text-align:center; font-size : 1.3em !important; margin-top : 5px;',
									fieldStyle	: 'border-color : #99bce8; border-top : none !important; border-bottom : none !important; border-right : none !important;',
								}
							]
						},{	xtype	: 'fieldcontainer'  ,
							layout	: { type: 'vbox', align: 'stretch' } ,
							style	: Const.borderLine.bottom,
							flex	: 1,
							height	: 27,
							margin	: '0 0 2 0',
							items	: [
								{	xtype		: 'textfield',
									name		: '',
									height		: 27,
									fieldStyle	: 'border-color : #99bce8; border-top : none !important; border-bottom : none !important;',
								}
							]
						}
					]
				},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '0 0 0 0', width : '100%',
					items	: [
						{	xtype	: 'fieldcontainer'  ,
							layout	: { type: 'vbox', align: 'stretch' } ,
							style	: Const.borderLine.bottom,
							flex	: 2,
							height	: 27,
							margin	: '0 0 2 0',
							items	: [
								{	xtype		: 'textfield',
									name		: '',
									height		: 27,
									fieldStyle	: 'border-color : #99bce8; border-top : none !important; border-bottom : none !important; border-right : none !important;',
								}
							]
						},{	xtype	: 'fieldcontainer'  ,
							layout	: { type: 'vbox', align: 'stretch' } ,
							style	: Const.borderLine.bottom + Const.borderLine.left,
							flex	: 1,
							height	: 27,
							margin	: '0 0 2 0',
							items	: [
								{	xtype		: 'label',
									text		: '용접',
									height		: 27,
									style		: 'text-align:center; font-size : 1.3em !important; margin-top : 5px;',
									fieldStyle	: 'border-color : #99bce8; border-top : none !important; border-bottom : none !important; border-right : none !important;',
								}
							]
						},{	xtype	: 'fieldcontainer'  ,
							layout	: { type: 'vbox', align: 'stretch' } ,
							style	: Const.borderLine.bottom,
							flex	: 1,
							height	: 27,
							margin	: '0 0 2 0',
							items	: [
								{	xtype		: 'textfield',
									name		: '',
									height		: 27,
									fieldStyle	: 'border-color : #99bce8; border-top : none !important; border-bottom : none !important;',
								}
							]
						}
					]
				},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '0 0 0 0', width : '100%',
					items	: [
						{	xtype	: 'fieldcontainer'  ,
							layout	: { type: 'vbox', align: 'stretch' } ,
							style	: Const.borderLine.bottom,
							flex	: 2,
							height	: 27,
							margin	: '0 0 2 0',
							items	: [
								{	xtype		: 'textfield',
									name		: '',
									height		: 27,
									fieldStyle	: 'border-color : #99bce8; border-top : none !important; border-bottom : none !important; border-right : none !important;',
								}
							]
						},{	xtype	: 'fieldcontainer'  ,
							layout	: { type: 'vbox', align: 'stretch' } ,
							style	: Const.borderLine.bottom + Const.borderLine.left,
							flex	: 1,
							height	: 27,
							margin	: '0 0 2 0',
							items	: [
								{	xtype		: 'label',
									text		: '외주',
									height		: 27,
									style		: 'text-align:center; font-size : 1.3em !important; margin-top : 5px;',
									fieldStyle	: 'border-color : #99bce8; border-top : none !important; border-bottom : none !important; border-right : none !important;',
								}
							]
						},{	xtype	: 'fieldcontainer'  ,
							layout	: { type: 'vbox', align: 'stretch' } ,
							style	: Const.borderLine.bottom,
							flex	: 1,
							height	: 27,
							margin	: '0 0 2 0',
							items	: [
								{	xtype		: 'textfield',
									name		: '',
									height		: 27,
									fieldStyle	: 'border-color : #99bce8; border-top : none !important; border-bottom : none !important;',
								}
							]
						}
					]
				}
			]
		}
		;
		return item;
	},

	createcenter : function () {
		var me = this,
			item = {
			xtype			: 'form-panel',
			region			: 'center',
			flex			: 1,
			margin			: '3 0 0 0',
			bodyStyle		: { padding: '5px' },
			items : [
				{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '0 0 0 0', width : '100%',
					items	: [
						{	xtype	: 'fieldcontainer'  ,
							layout	: { type: 'vbox', align: 'stretch' } ,
							style	: Const.borderLine.top  + Const.borderLine.left + Const.borderLine.bottom,
							flex	: 1,
							height	: 30,
							margin	: '0 0 2 0',
							items	: [
								{	text	: '불량 이력', xtype : 'label', style : 'text-align:center; font-size : 1.3em !important;', margin : '6 0 0 0'
								}
							]
						},{	xtype	: 'fieldcontainer'  ,
							layout	: { type: 'vbox', align: 'stretch' } ,
							style	: Const.borderLine.top  + Const.borderLine.left + Const.borderLine.bottom +  Const.borderLine.right,
							flex	: 1,
							height	: 30,
							margin	: '0 0 2 0',
							items	: [
								{	text	: '확인 서명', xtype : 'label', style : 'text-align:center; font-size : 1.3em !important;', margin : '6 0 0 0'
								}
							]
						}
					]
				},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '0 0 0 0', width : '100%',
					items	: [
						{	xtype	: 'fieldcontainer'  ,
							layout	: { type: 'vbox', align: 'stretch' } ,
							style	: Const.borderLine.bottom,
							flex	: 2,
							height	: 27,
							margin	: '0 0 2 0',
							items	: [
								{	xtype		: 'textfield',
									name		: '',
									height		: 27,
									fieldStyle	: 'border-color : #99bce8; border-top : none !important; border-bottom : none !important; border-right : none !important;',
								}
							]
						},{	xtype	: 'fieldcontainer'  ,
							layout	: { type: 'vbox', align: 'stretch' } ,
							style	: Const.borderLine.bottom + Const.borderLine.left,
							flex	: 1,
							height	: 27,
							margin	: '0 0 2 0',
							items	: [
								{	xtype		: 'label',
									text		: 'NC',
									height		: 27,
									style		: 'text-align:center; font-size : 1.3em !important; margin-top : 5px;',
									fieldStyle	: 'border-color : #99bce8; border-top : none !important; border-bottom : none !important; border-right : none !important;',
								}
							]
						},{	xtype	: 'fieldcontainer'  ,
							layout	: { type: 'vbox', align: 'stretch' } ,
							style	: Const.borderLine.bottom,
							flex	: 1,
							height	: 27,
							margin	: '0 0 2 0',
							items	: [
								{	xtype		: 'textfield',
									name		: '',
									height		: 27,
									fieldStyle	: 'border-color : #99bce8; border-top : none !important; border-bottom : none !important;',
								}
							]
						}
					]
				},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '0 0 0 0', width : '100%',
					items	: [
						{	xtype	: 'fieldcontainer'  ,
							layout	: { type: 'vbox', align: 'stretch' } ,
							style	: Const.borderLine.bottom,
							flex	: 2,
							height	: 27,
							margin	: '0 0 2 0',
							items	: [
								{	xtype		: 'textfield',
									name		: '',
									height		: 27,
									fieldStyle	: 'border-color : #99bce8; border-top : none !important; border-bottom : none !important; border-right : none !important;',
								}
							]
						},{	xtype	: 'fieldcontainer'  ,
							layout	: { type: 'vbox', align: 'stretch' } ,
							style	: Const.borderLine.bottom + Const.borderLine.left,
							flex	: 1,
							height	: 27,
							margin	: '0 0 2 0',
							items	: [
								{	xtype		: 'label',
									text		: '후가공',
									height		: 27,
									style		: 'text-align:center; font-size : 1.3em !important; margin-top : 5px;',
									fieldStyle	: 'border-color : #99bce8; border-top : none !important; border-bottom : none !important; border-right : none !important;',
								}
							]
						},{	xtype	: 'fieldcontainer'  ,
							layout	: { type: 'vbox', align: 'stretch' } ,
							style	: Const.borderLine.bottom,
							flex	: 1,
							height	: 27,
							margin	: '0 0 2 0',
							items	: [
								{	xtype		: 'textfield',
									name		: '',
									height		: 27,
									fieldStyle	: 'border-color : #99bce8; border-top : none !important; border-bottom : none !important;',
								}
							]
						}
					]
				},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '0 0 0 0', width : '100%',
					items	: [
						{	xtype	: 'fieldcontainer'  ,
							layout	: { type: 'vbox', align: 'stretch' } ,
							style	: Const.borderLine.bottom,
							flex	: 2,
							height	: 27,
							margin	: '0 0 2 0',
							items	: [
								{	xtype		: 'textfield',
									name		: '',
									height		: 27,
									fieldStyle	: 'border-color : #99bce8; border-top : none !important; border-bottom : none !important; border-right : none !important;',
								}
							]
						},{	xtype	: 'fieldcontainer'  ,
							layout	: { type: 'vbox', align: 'stretch' } ,
							style	: Const.borderLine.bottom + Const.borderLine.left,
							flex	: 1,
							height	: 27,
							margin	: '0 0 2 0',
							items	: [
								{	xtype		: 'label',
									text		: '절곡',
									height		: 27,
									style		: 'text-align:center; font-size : 1.3em !important; margin-top : 5px;',
									fieldStyle	: 'border-color : #99bce8; border-top : none !important; border-bottom : none !important; border-right : none !important;',
								}
							]
						},{	xtype	: 'fieldcontainer'  ,
							layout	: { type: 'vbox', align: 'stretch' } ,
							style	: Const.borderLine.bottom,
							flex	: 1,
							height	: 27,
							margin	: '0 0 2 0',
							items	: [
								{	xtype		: 'textfield',
									name		: '',
									height		: 27,
									fieldStyle	: 'border-color : #99bce8; border-top : none !important; border-bottom : none !important;',
								}
							]
						}
					]
				},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '0 0 0 0', width : '100%',
					items	: [
						{	xtype	: 'fieldcontainer'  ,
							layout	: { type: 'vbox', align: 'stretch' } ,
							style	: Const.borderLine.bottom,
							flex	: 2,
							height	: 27,
							margin	: '0 0 2 0',
							items	: [
								{	xtype		: 'textfield',
									name		: '',
									height		: 27,
									fieldStyle	: 'border-color : #99bce8; border-top : none !important; border-bottom : none !important; border-right : none !important;',
								}
							]
						},{	xtype	: 'fieldcontainer'  ,
							layout	: { type: 'vbox', align: 'stretch' } ,
							style	: Const.borderLine.bottom + Const.borderLine.left,
							flex	: 1,
							height	: 27,
							margin	: '0 0 2 0',
							items	: [
								{	xtype		: 'label',
									text		: '용접',
									height		: 27,
									style		: 'text-align:center; font-size : 1.3em !important; margin-top : 5px;',
									fieldStyle	: 'border-color : #99bce8; border-top : none !important; border-bottom : none !important; border-right : none !important;',
								}
							]
						},{	xtype	: 'fieldcontainer'  ,
							layout	: { type: 'vbox', align: 'stretch' } ,
							style	: Const.borderLine.bottom,
							flex	: 1,
							height	: 27,
							margin	: '0 0 2 0',
							items	: [
								{	xtype		: 'textfield',
									name		: '',
									height		: 27,
									fieldStyle	: 'border-color : #99bce8; border-top : none !important; border-bottom : none !important;',
								}
							]
						}
					]
				},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '0 0 0 0', width : '100%',
					items	: [
						{	xtype	: 'fieldcontainer'  ,
							layout	: { type: 'vbox', align: 'stretch' } ,
							style	: Const.borderLine.bottom,
							flex	: 2,
							height	: 27,
							margin	: '0 0 2 0',
							items	: [
								{	xtype		: 'textfield',
									name		: '',
									height		: 27,
									fieldStyle	: 'border-color : #99bce8; border-top : none !important; border-bottom : none !important; border-right : none !important;',
								}
							]
						},{	xtype	: 'fieldcontainer'  ,
							layout	: { type: 'vbox', align: 'stretch' } ,
							style	: Const.borderLine.bottom + Const.borderLine.left,
							flex	: 1,
							height	: 27,
							margin	: '0 0 2 0',
							items	: [
								{	xtype		: 'label',
									text		: '외주',
									height		: 27,
									style		: 'text-align:center; font-size : 1.3em !important; margin-top : 5px;',
									fieldStyle	: 'border-color : #99bce8; border-top : none !important; border-bottom : none !important; border-right : none !important;',
								}
							]
						},{	xtype	: 'fieldcontainer'  ,
							layout	: { type: 'vbox', align: 'stretch' } ,
							style	: Const.borderLine.bottom,
							flex	: 1,
							height	: 27,
							margin	: '0 0 2 0',
							items	: [
								{	xtype		: 'textfield',
									name		: '',
									height		: 27,
									fieldStyle	: 'border-color : #99bce8; border-top : none !important; border-bottom : none !important;',
								}
							]
						}
					]
				}
			]
		}
		;
		return item;
	},

	createeast : function () {
		var me = this,
			item = {
			xtype			: 'form-panel',
			region			: 'east',
			flex			: 1,
			margin			: '3 0 0 0',
			bodyStyle		: { padding: '5px' },
			items : [
				{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '0 0 0 0', width : '100%',
					items	: [
						{	xtype	: 'fieldcontainer'  ,
							layout	: { type: 'vbox', align: 'stretch' } ,
							style	: Const.borderLine.top  + Const.borderLine.left + Const.borderLine.bottom,
							flex	: 1,
							height	: 30,
							margin	: '0 0 2 0',
							items	: [
								{	text	: '작업시 주의사항', xtype : 'label', style : 'text-align:center; font-size : 1.3em !important;', margin : '6 0 0 0'
								}
							]
						},{	xtype	: 'fieldcontainer'  ,
							layout	: { type: 'vbox', align: 'stretch' } ,
							style	: Const.borderLine.top  + Const.borderLine.left + Const.borderLine.bottom +  Const.borderLine.right,
							flex	: 1,
							height	: 30,
							margin	: '0 0 2 0',
							items	: [
								{	text	: '확인 서명', xtype : 'label', style : 'text-align:center; font-size : 1.3em !important;', margin : '6 0 0 0'
								}
							]
						}
					]
				},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '0 0 0 0', width : '100%',
					items	: [
						{	xtype	: 'fieldcontainer'  ,
							layout	: { type: 'vbox', align: 'stretch' } ,
							style	: Const.borderLine.bottom,
							flex	: 2,
							height	: 27,
							margin	: '0 0 2 0',
							items	: [
								{	xtype		: 'textfield',
									name		: '',
									height		: 27,
									fieldStyle	: 'border-color : #99bce8; border-top : none !important; border-bottom : none !important; border-right : none !important;',
								}
							]
						},{	xtype	: 'fieldcontainer'  ,
							layout	: { type: 'vbox', align: 'stretch' } ,
							style	: Const.borderLine.bottom + Const.borderLine.left,
							flex	: 1,
							height	: 27,
							margin	: '0 0 2 0',
							items	: [
								{	xtype		: 'label',
									text		: 'NC',
									height		: 27,
									style		: 'text-align:center; font-size : 1.3em !important; margin-top : 5px;',
									fieldStyle	: 'border-color : #99bce8; border-top : none !important; border-bottom : none !important; border-right : none !important;',
								}
							]
						},{	xtype	: 'fieldcontainer'  ,
							layout	: { type: 'vbox', align: 'stretch' } ,
							style	: Const.borderLine.bottom,
							flex	: 1,
							height	: 27,
							margin	: '0 0 2 0',
							items	: [
								{	xtype		: 'textfield',
									name		: '',
									height		: 27,
									fieldStyle	: 'border-color : #99bce8; border-top : none !important; border-bottom : none !important;',
								}
							]
						}
					]
				},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '0 0 0 0', width : '100%',
					items	: [
						{	xtype	: 'fieldcontainer'  ,
							layout	: { type: 'vbox', align: 'stretch' } ,
							style	: Const.borderLine.bottom,
							flex	: 2,
							height	: 27,
							margin	: '0 0 2 0',
							items	: [
								{	xtype		: 'textfield',
									name		: '',
									height		: 27,
									fieldStyle	: 'border-color : #99bce8; border-top : none !important; border-bottom : none !important; border-right : none !important;',
								}
							]
						},{	xtype	: 'fieldcontainer'  ,
							layout	: { type: 'vbox', align: 'stretch' } ,
							style	: Const.borderLine.bottom + Const.borderLine.left,
							flex	: 1,
							height	: 27,
							margin	: '0 0 2 0',
							items	: [
								{	xtype		: 'label',
									text		: '후가공',
									height		: 27,
									style		: 'text-align:center; font-size : 1.3em !important; margin-top : 5px;',
									fieldStyle	: 'border-color : #99bce8; border-top : none !important; border-bottom : none !important; border-right : none !important;',
								}
							]
						},{	xtype	: 'fieldcontainer'  ,
							layout	: { type: 'vbox', align: 'stretch' } ,
							style	: Const.borderLine.bottom,
							flex	: 1,
							height	: 27,
							margin	: '0 0 2 0',
							items	: [
								{	xtype		: 'textfield',
									name		: '',
									height		: 27,
									fieldStyle	: 'border-color : #99bce8; border-top : none !important; border-bottom : none !important;',
								}
							]
						}
					]
				},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '0 0 0 0', width : '100%',
					items	: [
						{	xtype	: 'fieldcontainer'  ,
							layout	: { type: 'vbox', align: 'stretch' } ,
							style	: Const.borderLine.bottom,
							flex	: 2,
							height	: 27,
							margin	: '0 0 2 0',
							items	: [
								{	xtype		: 'textfield',
									name		: '',
									height		: 27,
									fieldStyle	: 'border-color : #99bce8; border-top : none !important; border-bottom : none !important; border-right : none !important;',
								}
							]
						},{	xtype	: 'fieldcontainer'  ,
							layout	: { type: 'vbox', align: 'stretch' } ,
							style	: Const.borderLine.bottom + Const.borderLine.left,
							flex	: 1,
							height	: 27,
							margin	: '0 0 2 0',
							items	: [
								{	xtype		: 'label',
									text		: '절곡',
									height		: 27,
									style		: 'text-align:center; font-size : 1.3em !important; margin-top : 5px;',
									fieldStyle	: 'border-color : #99bce8; border-top : none !important; border-bottom : none !important; border-right : none !important;',
								}
							]
						},{	xtype	: 'fieldcontainer'  ,
							layout	: { type: 'vbox', align: 'stretch' } ,
							style	: Const.borderLine.bottom,
							flex	: 1,
							height	: 27,
							margin	: '0 0 2 0',
							items	: [
								{	xtype		: 'textfield',
									name		: '',
									height		: 27,
									fieldStyle	: 'border-color : #99bce8; border-top : none !important; border-bottom : none !important;',
								}
							]
						}
					]
				},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '0 0 0 0', width : '100%',
					items	: [
						{	xtype	: 'fieldcontainer'  ,
							layout	: { type: 'vbox', align: 'stretch' } ,
							style	: Const.borderLine.bottom,
							flex	: 2,
							height	: 27,
							margin	: '0 0 2 0',
							items	: [
								{	xtype		: 'textfield',
									name		: '',
									height		: 27,
									fieldStyle	: 'border-color : #99bce8; border-top : none !important; border-bottom : none !important; border-right : none !important;',
								}
							]
						},{	xtype	: 'fieldcontainer'  ,
							layout	: { type: 'vbox', align: 'stretch' } ,
							style	: Const.borderLine.bottom + Const.borderLine.left,
							flex	: 1,
							height	: 27,
							margin	: '0 0 2 0',
							items	: [
								{	xtype		: 'label',
									text		: '용접',
									height		: 27,
									style		: 'text-align:center; font-size : 1.3em !important; margin-top : 5px;',
									fieldStyle	: 'border-color : #99bce8; border-top : none !important; border-bottom : none !important; border-right : none !important;',
								}
							]
						},{	xtype	: 'fieldcontainer'  ,
							layout	: { type: 'vbox', align: 'stretch' } ,
							style	: Const.borderLine.bottom,
							flex	: 1,
							height	: 27,
							margin	: '0 0 2 0',
							items	: [
								{	xtype		: 'textfield',
									name		: '',
									height		: 27,
									fieldStyle	: 'border-color : #99bce8; border-top : none !important; border-bottom : none !important;',
								}
							]
						}
					]
				},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '0 0 0 0', width : '100%',
					items	: [
						{	xtype	: 'fieldcontainer'  ,
							layout	: { type: 'vbox', align: 'stretch' } ,
							style	: Const.borderLine.bottom,
							flex	: 2,
							height	: 27,
							margin	: '0 0 2 0',
							items	: [
								{	xtype		: 'textfield',
									name		: '',
									height		: 27,
									fieldStyle	: 'border-color : #99bce8; border-top : none !important; border-bottom : none !important; border-right : none !important;',
								}
							]
						},{	xtype	: 'fieldcontainer'  ,
							layout	: { type: 'vbox', align: 'stretch' } ,
							style	: Const.borderLine.bottom + Const.borderLine.left,
							flex	: 1,
							height	: 27,
							margin	: '0 0 2 0',
							items	: [
								{	xtype		: 'label',
									text		: '외주',
									height		: 27,
									style		: 'text-align:center; font-size : 1.3em !important; margin-top : 5px;',
									fieldStyle	: 'border-color : #99bce8; border-top : none !important; border-bottom : none !important; border-right : none !important;',
								}
							]
						},{	xtype	: 'fieldcontainer'  ,
							layout	: { type: 'vbox', align: 'stretch' } ,
							style	: Const.borderLine.bottom,
							flex	: 1,
							height	: 27,
							margin	: '0 0 2 0',
							items	: [
								{	xtype		: 'textfield',
									name		: '',
									height		: 27,
									fieldStyle	: 'border-color : #99bce8; border-top : none !important; border-bottom : none !important;',
								}
							]
						}
					]
				}
			]
		}
		;
		return item;
	},


});