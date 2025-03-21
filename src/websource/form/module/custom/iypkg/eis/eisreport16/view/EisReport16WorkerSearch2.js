Ext.define('module.custom.iypkg.eis.eisreport16.view.EisReport16WorkerSearch2', { extend: 'Axt.form.Search',

	alias	: 'widget.module-eisreport16-worker-search2',
	header	: false,

	initComponent: function(config){
		var me = this;
		me.dockedItems = [ me.createWest() ] ;
		me.callParent(arguments);

	},

	createWest : function () {
		var me	= this,
			item = {
			xtype		: 'fieldset' ,
			dock		: 'left',
			border		: 0,
			margin		: '2 2 0 2',
			bodyStyle	: { padding: '3px' },
			flex		: 100 ,
			fieldDefaults: { width : 330, labelWidth : 50 , margin : '5 5 0 0', padding : '2'},
			items		: [
				{	xtype : 'fieldset', layout: 'hbox', border : 0,
					items : [
						{	xtype	: 'checkboxfield',
							allowBlank: true,
							name : 'ck1',
							boxLabel: '거래명세서' ,
							margin : '5 0 0 0',
							width : 100 ,
							inputValue: 1,
							listeners: {
								change: function(chkbox,newVal,oldVal) {
									var a = me.down('[name=ck2]').getValue();
									var b = me.down('[name=ck3]').getValue();
									if((chkbox.getValue() == true && a == true) || (chkbox.getValue() == true && b == true)){
										me.down('[name=ck2]').setValue(false);
										me.down('[name=ck3]').setValue(false);
									}
								}
							}
						},{	xtype	: 'checkboxfield',
							allowBlank: true,
							name : 'ck2',
							boxLabel: '청구서' ,
							margin : '5 0 0 0',
							width : 100 ,
							inputValue: 2,
							listeners: {
								change: function(chkbox,newVal,oldVal) {
									var a = me.down('[name=ck1]').getValue();
									var b = me.down('[name=ck3]').getValue();
									if((chkbox.getValue() == true && a == true) || (chkbox.getValue() == true && b == true)){
										me.down('[name=ck1]').setValue(false);
										me.down('[name=ck3]').setValue(false);
									}
								}
							}
						},{	xtype	: 'checkboxfield',
							allowBlank: true,
							name : 'ck3',
							boxLabel: '세금계산서' ,
							margin : '5 0 0 0',
							width : 100 ,
							inputValue: 3,
							listeners: {
								change: function(chkbox,newVal,oldVal) {
									var a = me.down('[name=ck1]').getValue();
									var a = me.down('[name=ck2]').getValue();
									if((chkbox.getValue() == true && a == true) || (chkbox.getValue() == true && b == true)){
										me.down('[name=ck1]').setValue(false);
										me.down('[name=ck2]').setValue(false);
									}
								}
							}
						},{ xtype	: 'fieldcontainer',
							layout	: { type: 'hbox', align: 'stretch' },
							margin	: '0 0 0 50',
							height	: 30,
							items	:[
								{	xtype	: 'label',
									text	: '적정',
									margin	: '8 0 8 0',
								},{	xtype	: 'label',
									margin	: '8 1 8 1',
									width	: 50,
									style	: 'background-color:black !important;'
								},{	xtype	: 'label',
									text	: '좋음',
									margin	: '8 0 8 40',
								},{	xtype	: 'label',
									margin	: '8 1 8 1',
									width	: 50,
									style	: 'background-color:lightgreen !important;'
								},{	xtype	: 'label',
									text	: '분석요',
									margin	: '8 0 8 40',
								},{	xtype	: 'label',
									margin	: '8 1 8 1',
									width	: 50,
									style	: 'background-color:lightpink !important;'
								}
							]
						}
					]
				}
			]
		};
	return item;
	}
});
