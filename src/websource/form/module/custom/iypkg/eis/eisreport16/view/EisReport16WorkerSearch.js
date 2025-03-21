Ext.define('module.custom.iypkg.eis.eisreport16.view.EisReport16WorkerSearch', { extend: 'Axt.form.Search',

	alias	: 'widget.module-eisreport16-worker-search',
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
			margin		: '-3 2 0 2',
			bodyStyle	: { padding: '3px' },
			flex		: 100 ,
			items		: [
				{	xtype : 'fieldset', layout: 'hbox', border : 0,
					items : [
						{	fieldLabel	: Language.get('','기간'),
							xtype		: 'betweenfield',
							name		: 'deli_date1',
							pair		: 'deli_date2',
							clearable	: true,
							margin		: '15 5 5 -10',
							width		: 146,
							labelWidth	: 50,
							root		: true,
							format		: Const.DATE_FORMAT_YMD_BAR,
							submitFormat: Const.DATE_FORMAT_YMD,
							value		: Ext.Date.getFirstDateOfMonth(new Date()),
						},{	fieldLabel	: Language.get('','~'),
							xtype		: 'betweenfield',
							name		: 'deli_date2',
							pair		: 'deli_date1',
							clearable	: true,
							margin		: '15 5 0 0',
							width		: 101,
							labelWidth	: 5,
							format		: Const.DATE_FORMAT_YMD_BAR,
							submitFormat: Const.DATE_FORMAT_YMD,
							value		: new Date()
						},{	fieldLabel	: Language.get('','부가율검색'),
							xtype		: 'textfield',
							name		: '',
							labelWidth	: 70,
							width		: 130,
							margin		: '15 5 0 0',
						},{	xtype		: 'label',
							text		: '%',
							margin		: '20 5 0 0',
						},{ xtype		: 'button',
							text		: '...',
							margin		: '15 5 0 4',
							name		: 'btn',
//							handler		: me.calc
						},{	xtype	: 'checkboxfield',
							allowBlank: true,
							name : 'ck1',
							boxLabel: '매입안분' ,
							margin : '15 0 0 0',
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
							boxLabel: '투입안분' ,
							margin : '15 0 0 0',
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
							boxLabel: '매입전체' ,
							margin : '15 0 0 0',
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
						}
					]
				}
			]
		};
	return item;
	}
});
