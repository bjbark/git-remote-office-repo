Ext.define('module.custom.kitec.prod.workentry.view.WorkEntryListerDetailSearch',{ extend: 'Axt.form.Search',
	store	: 'module.custom.kitec.prod.workentry.store.WorkEntryDetail3',
	alias	: 'widget.module-kitec-workenty-detailSearch',
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
				defaults		: { xtype: 'fieldset', layout: 'vbox', margin : '5 5 10 0', padding: '0', border: 0 , },
				fieldDefaults	: { width : 341, labelWidth : 100, labelSeparator : '' },
				items			: [
					{	xtype : 'fieldset', layout: 'hbox',
						items : [
							{	fieldLabel	: Language.get('date','일자'),
								xtype		: 'betweenfield',
								name		: 'work_date',
								pair		: 'work_date2',
								width		: 230,
								labelWidth	: 60,
								root		: true,
								format		: Const.DATE_FORMAT_YMD_BAR,
								submitFormat: Const.DATE_FORMAT_YMD,
								value		: '',
								height		: 47,
								margin		: '0 50 0 0',
								labelCls	: 'textTemp '+_global.options.work_book_tema+'label',
								fieldCls	: 'textTemp '+_global.options.work_book_tema+'field',
								cls			: 'textTemp',
								trigger1Cls : _global.options.work_book_tema+'dateTrigger',
								value		: new Date(),
								listeners	: {
									render:function(){
										me.down('[name=work_date2]').setMinValue(this.getValue());
									},
									change:function(){
										me.down('[name=work_date2]').setMinValue(this.getValue());
									}
								}
							},{	fieldLabel	: Language.get('','~'),
								xtype		: 'betweenfield',
								name		: 'work_date2',
								pair		: 'work_date',
								width		: 185,
								labelWidth	: 15,
								margin		: '0 60 0 0',
								format		: Const.DATE_FORMAT_YMD_BAR,
								submitFormat: Const.DATE_FORMAT_YMD,
								value		: '',
								height		: 47,
								value		: new Date(),
								labelCls	: 'textTemp '+_global.options.work_book_tema+'label',
								fieldCls	: 'textTemp '+_global.options.work_book_tema+'field',
								cls			: 'textTemp',
								trigger1Cls : _global.options.work_book_tema+'dateTrigger',
							},{	fieldLabel	: Language.get('prog_stat_dvcd2','상태'),
								xtype		: 'lookupfield',
								name		: 'prog_stat_dvcd',
								lookupValue	: resource.lookup('prog_stat_dvcd'),
								labelCls	: 'textTemp '+_global.options.work_book_tema+'label',
								fieldCls	: 'textTemp '+_global.options.work_book_tema+'field',
								value		: '0',
								height		: 47,
								labelWidth	: 80,
								editable	: false,
								width		: 260,
								margin		: '0 60 0 35',
								listConfig:{
									itemCls		: _global.options.work_book_tema+'item'											// lookup list에 클래스 추가
								},
								trigger1Cls : _global.options.work_book_tema+'trigger',											// trigger(버튼)에 클래스 추가
							},{	fieldLabel	: Language.get('invc_numb','지시번호'),
								xtype		: 'popupfield',
								editable	: true,
								enableKeyEvents : true,
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
									widget : 'lookup-kitec-workenty-pror-popup',
									params : { stor_grp : _global.stor_grp , line_stat : '0' },
									result : function(records, nameField, pairField) {
										nameField.setValue(records[0].get('invc_numb'));
									}
								}
							},{	text		: '<span class="btnTemp" style="font-size:3em">'+Language.get('search','조회')+'</span>',
								xtype		: 'button',
								width		: 120,
								height		: 47,
								margin		: '0 0 0 20',
								cls			: 'button-style',
								action		: 'selectAction'
							}
						]
					},{	xtype : 'fieldset', layout: 'hbox',
						items : [
							{	fieldLabel	: Language.get('wkct','공정'),
								xtype		: 'popupfield',
								editable	: true,
								enableKeyEvents : true,
								name		: 'wkct_name',
								pair		: 'wkct_idcd',
								width		: 465,
								labelWidth	: 60,
								height		: 47,
								margin		: '0 80 0 0',
								labelCls	: 'textTemp '+_global.options.work_book_tema+'label',
								fieldCls	: 'textTemp '+_global.options.work_book_tema+'field',
								cls			: 'textTemp',
								trigger1Cls : _global.options.work_book_tema+'searchTrigger',
								clearable	: true ,
								editable	: true,
								popup: {
									select : 'SINGLE',
									widget : 'lookup-kitec-workenty-wkct-popup',
									params : { stor_grp : _global.stor_grp , line_stat : '0'},
									result : function(records, nameField, pairField) {
										nameField.setValue(records[0].get('wkct_name'));
										pairField.setValue(records[0].get('wkct_idcd'));
									}
								}
							},{	name : 'wkct_idcd', xtype : 'textfield' , hidden : true
							},{	fieldLabel	: Language.get('lott_numb','LOT번호'),
								xtype		: 'textfield',
								name		: 'lott_numb',
								width		: 260,
								labelWidth	: 95,
								height		: 45,
								margin		: '0 20 0 0',
								labelCls	: 'textTemp '+_global.options.work_book_tema+'label',
								fieldCls	: 'textTemp '+_global.options.work_book_tema+'field',
								cls			: 'textTemp',
								style		: 'text-align:center',
							}
						]
					}
				]
			};
		return line;
	}
});