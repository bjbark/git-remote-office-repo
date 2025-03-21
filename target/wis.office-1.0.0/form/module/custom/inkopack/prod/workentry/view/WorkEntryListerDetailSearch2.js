Ext.define('module.custom.inkopack.prod.workentry.view.WorkEntryListerDetailSearch2',{ extend: 'Axt.form.Search',
	store	: 'module.custom.inkopack.prod.workentry.store.WorkEntryDetail4',
	alias	: 'widget.module-workentry-detailSearch2',
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
							{	fieldLabel	: Language.get('','일자'),
								xtype		: 'datefield',
								name		: 'invc_date',
								width		: 223,
								labelWidth	: 60,
								format		: Const.DATE_FORMAT_YMD_BAR,
								submitFormat: Const.DATE_FORMAT_YMD,
								value		: new Date(),
								height		: 47,
								margin		: '0 50 0 0',
								labelCls	: 'textTemp '+_global.options.work_book_tema+'label',
								fieldCls	: 'textTemp '+_global.options.work_book_tema+'field',
								cls			: 'textTemp',
								readOnly	: true,
								trigger1Cls : _global.options.work_book_tema+'dateTrigger',
							},{	fieldLabel	: Language.get('wkct_name','공정'),
								xtype		: 'popupfield', editable : true, enableKeyEvents : true,
								name		: 'wkct_name',
								pair		: 'wkct_idcd',
								width		: 300,
								labelWidth	: 50,
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
									params : { stor_grp : _global.stor_grp , line_stat : '0',tema:_global.options.work_book_tema },
									result : function(records, nameField, pairField) {
										nameField.setValue(records[0].get('wkct_name'));
										pairField.setValue(records[0].get('wkct_idcd'));
									}
								},
								listeners: {
									change: function (self, e) {
										if(e == '' || e == null){
											me.down('[name=wkct_idcd]').reset();

										}
										me.down('[name=cvic_name]').reset();
										me.down('[name=cvic_idcd]').reset();
									}
								}
							},{	name : 'wkct_idcd', xtype : 'textfield' , hidden : true,
								listeners:{
									change:function(self, e){
										me.down('[name=cvic_name]').popup.params = { wkct_idcd : this.getValue(), stor_grp : _global.stor_grp , line_stat : '0'}
										if(e == '' || e == null){
											me.down('[name=cvic_name]').reset();
											me.down('[name=cvic_idcd]').reset();
										}
									}
								}
							},{	fieldLabel	: Language.get('','설비'),
								xtype		: 'popupfield', editable : true, enableKeyEvents : true,
								name		: 'cvic_name',
								pair		: 'cvic_idcd',
								width		: 250,
								labelWidth	: 50,
								height		: 47,
								margin		: '0 60 0 0',
								labelCls	: 'textTemp '+_global.options.work_book_tema+'label',
								fieldCls	: 'textTemp '+_global.options.work_book_tema+'field',
								cls			: 'textTemp',
								trigger1Cls : _global.options.work_book_tema+'searchTrigger',
								clearable	: true ,
								popup: {
									select : 'SINGLE',
									widget : 'lookup-workentry-cvic-popup',
									params : { stor_grp : _global.stor_grp , line_stat : '0'},
									result : function(records, nameField, pairField) {
										nameField.setValue(records[0].get('cvic_name'));
										pairField.setValue(records[0].get('cvic_idcd'));
									}
								}
							},{	name : 'cvic_idcd', xtype : 'textfield' , hidden : true
							},{	fieldLabel	: Language.get('','지시번호'),
								xtype		: 'popupfield', editable : true, enableKeyEvents : true,
								name		: 'invc_numb',
								width		: 310,
								hidden		: true,
								labelWidth	: 110,
								height		: 47,
								margin		: '0 60 0 0',
								labelCls	: 'textTemp '+_global.options.work_book_tema+'label',
								fieldCls	: 'textTemp '+_global.options.work_book_tema+'field',
								cls			: 'textTemp',
								trigger1Cls : _global.options.work_book_tema+'searchTrigger',
								clearable	: true ,
								popup: {
									select : 'SINGLE',
									widget : 'lookup-workentry-pror-popup',
									params : { stor_grp : _global.stor_grp , line_stat : '0' },
									result : function(records, nameField, pairField) {
										nameField.setValue(records[0].get('invc_numb'));
									}
								}
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