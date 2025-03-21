Ext.define('module.custom.dehansol.prod.workentry.view.WorkEntryListerDetailSearch',{ extend: 'Axt.form.Search',

	alias	: 'widget.module-dehansol-workentry-detailSearch',
	store	: 'module.custom.dehansol.prod.workentry.store.WorkEntryDetail',
	style	: 'padding-left : 5px;' ,

	initComponent: function(){
		var me = this;
		me.items = [
			me.addonSearch()
		];
		me.callParent();
	},

	addonSearch : function(){
		var me = this,
			line = {
				xtype			: 'fieldset',
				layout			: 'vbox',
				autoScroll		: true,
				defaults		: { xtype: 'fieldset', layout: 'vbox', margin : '5 5 5 0', padding: '0', border: 0 , },
				fieldDefaults	: { width : 341, labelWidth : 100, labelSeparator : '' },
				items			: [
					{	xtype : 'fieldset', layout: 'hbox',
						items : [
							{	fieldLabel	: Language.get('work_date','작업일자'),
								xtype		: 'betweenfield',
								name		: 'work_date2',
								pair		: 'work_date3',
								width		: 340,
								labelWidth	: 150,
								root		: true,
								format		: Const.DATE_FORMAT_YMD_BAR,
								submitFormat: Const.DATE_FORMAT_YMD,
								value		: '',
								height		: 47,
								margin		: '0 42 0 0',
								labelCls	: 'textTemp '+_global.options.work_book_tema+'label',
								fieldCls	: 'textTemp '+_global.options.work_book_tema+'field',
								cls			: 'textTemp',
								trigger1Cls : _global.options.work_book_tema+'dateTrigger',
								style		: 'text-align:center'
							},{	fieldLabel	: Language.get('','~'),
								xtype		: 'betweenfield',
								name		: 'work_date3',
								pair		: 'work_date2',
								width		: 210,
								labelWidth	: 20,
								margin		: '0 60 0 0',
								format		: Const.DATE_FORMAT_YMD_BAR,
								submitFormat: Const.DATE_FORMAT_YMD,
								value		: '',
								height		: 47,
								labelCls	: 'textTemp '+_global.options.work_book_tema+'label',
								fieldCls	: 'textTemp '+_global.options.work_book_tema+'field',
								cls			: 'textTemp',
								trigger1Cls : _global.options.work_book_tema+'dateTrigger',
								style		: 'text-align:center'
							},{	fieldLabel	: Language.get('wkct_name','공정'),
								xtype		: 'popupfield',
								editable	: true,
								enableKeyEvents : true,
								name		: 'wkct_name',
								pair		: 'wkct_idcd2',
								width		: 300,
								labelWidth	: 80,
								height		: 47,
								margin		: '0 60 0 0',
								labelCls	: 'textTemp '+_global.options.work_book_tema+'label',
								fieldCls	: 'textTemp '+_global.options.work_book_tema+'field',
								cls			: 'textTemp',
								trigger1Cls : _global.options.work_book_tema+'searchTrigger',
								clearable	: true ,
								popup: {
									select : 'SINGLE',
									widget : 'lookup-wkct-popup',
									params : { stor_grp : _global.stor_grp , line_stat : '0', tema : _global.options.work_book_tema},
									result : function(records, nameField, pairField) {
										nameField.setValue(records[0].get('wkct_name'));
										pairField.setValue(records[0].get('wkct_idcd'));
									}
								}
							},{	name : 'wkct_idcd2', xtype : 'textfield' , hidden : true
							},{	text		: '<span class="btnTemp" style="font-size:3em">조회</span>',
								xtype		: 'button',
								width		: 100,
								height		: 47,
								margin		: '0 0 0 20',
								cls			: 'button-style',
								action		: 'selectAction'
							}
						]
					}
				]
			};
		return line;
	}
});