Ext.define('module.custom.kortc.prod.workentry.view.WorkEntryListerDetailSearch',{ extend: 'Axt.form.Search',
	store	: 'module.custom.kortc.prod.workentry.store.WorkEntryDetail3',
	alias	: 'widget.module-kortc-workentry-detailSearch',
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
								width		: 230,
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
								listeners	: {
									render	: function(){
										var here = this;
										window.today2 = setInterval(function(){
											here.setValue(new Date());
										}, 5000)
									}
								}
							},{	fieldLabel	: Language.get('','공정'),
								xtype		: 'popupfield',
								editable	: true,
								enableKeyEvents : true,
								name		: 'wkct_name',
								pair		: 'wkct_idcd',
								width		: 240,
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
									params : { stor_grp : _global.stor_grp , line_stat : '0',tema:_global.options.work_book_tema,name:''},
									result : function(records, nameField, pairField) {
										nameField.setValue(records[0].get('wkct_name'));
										pairField.setValue(records[0].get('wkct_idcd'));
									}
								}
							},{	name : 'wkct_idcd', xtype : 'textfield' , hidden : true,
							},{	fieldLabel	: Language.get('','설비'),
								xtype		: 'popupfield',
								editable	: true,
								enableKeyEvents : true,
								name		: 'cvic_name',
								pair		: 'cvic_idcd',
								width		: 260,
								labelWidth	: 50,
								height		: 47,
//								emptyText	: '설비',
								margin		: '0 60 0 0',
								labelCls	: 'textTemp '+_global.options.work_book_tema+'label',
								fieldCls	: 'textTemp '+_global.options.work_book_tema+'field',
								cls			: 'textTemp',
								trigger1Cls : _global.options.work_book_tema+'searchTrigger',
								clearable	: true ,
								popup: {
									select : 'SINGLE',
									widget : 'lookup-workentry-cvic-popup',
									params : { stor_grp : _global.stor_grp , line_stat : '0',name:''},
									result : function(records, nameField, pairField) {
										nameField.setValue(records[0].get('cvic_name'));
										pairField.setValue(records[0].get('cvic_idcd'));
									}
								}
							},{	name : 'cvic_idcd', xtype : 'textfield' , hidden : true
							},{	fieldLabel	: Language.get('','지시번호'),
								xtype		: 'popupfield',
								editable	: true,
								enableKeyEvents : true,
								name		: 'invc_numb',
//								emptyText	: '지시번호',
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