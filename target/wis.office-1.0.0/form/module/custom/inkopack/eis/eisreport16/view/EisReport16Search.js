Ext.define('module.custom.inkopack.eis.eisreport1616.view.EisReport16Search', { extend: 'Axt.form.Search',

	alias: 'widget.module-eisreport16-search',

	initComponent: function(){
		var me = this;
		me.items =[ me.searchBasic()];
		me.callParent();
	},
//	listeners:{
//		render:function(){
//
//		}
//	},
	searchBasic : function(){
		var me = this,
			line = {
				xtype			: 'fieldset',
				layout			: 'vbox',
				autoScroll		: true,
				defaults		: { xtype: 'fieldset', layout: 'vbox', margin : '15 5 5 30', padding: '0', border: 0 , },
				fieldDefaults	: { width : 341, labelWidth : 100, labelSeparator : '' },
				items			: [
					{	xtype : 'fieldset',
						layout: 'hbox',
						autoScroll		: true,
						width : '100%',
						items : [
							{	fieldLabel	: Language.get('','일자'),
								xtype		: 'betweenfield',
								name		: 'fr_dt',
								pair		: 'to_dt',
								width		: 275,
								height		: 47,
								labelWidth	: 60,
								value		: '',
								root		: true,
								clearable	: true,
								format		: Const.DATE_FORMAT_YMD_BAR,
								submitFormat: Const.DATE_FORMAT_YMD,
								margin		: '0 50 0 0',
								labelCls	: 'textTemp '+_global.options.work_book_tema+'label',
								fieldCls	: 'textTemp '+_global.options.work_book_tema+'field',
								cls			: 'textTemp',
//								value		: new Date(),
								trigger1Cls : _global.options.work_book_tema+'dateTrigger',
							},{	fieldLabel	: Language.get('','~'),
								xtype		: 'betweenfield',
								name		: 'to_dt',
								pair		: 'fr_dt',
								width		: 230,
								height		: 47,
								labelWidth	: 15,
								value		: '',
								margin		: '0 60 0 0',
								format		: Const.DATE_FORMAT_YMD_BAR,
								submitFormat: Const.DATE_FORMAT_YMD,
								labelCls	: 'textTemp '+_global.options.work_book_tema+'label',
								fieldCls	: 'textTemp '+_global.options.work_book_tema+'field',
								cls			: 'textTemp',
//								value		: new Date(),
								trigger1Cls : _global.options.work_book_tema+'dateTrigger',
							},{	fieldLabel	: Language.get('','업체명'),
								xtype		: 'popupfield', editable : true, enableKeyEvents : true,
								name		: 'cstm_name',
								pair		: 'cstm_idcd',
								width		: 250,
								height		: 47,
								labelWidth	: 80,
								margin		: '0 60 0 0',
								clearable	: true ,
								labelCls	: 'textTemp '+_global.options.work_book_tema+'label',
								fieldCls	: 'textTemp '+_global.options.work_book_tema+'field',
								cls			: 'textTemp',
								trigger1Cls : _global.options.work_book_tema+'searchTrigger',
								popup: {
									select : 'SINGLE',
									widget : 'lookup-cstm-popup',
									params : { stor_grp : _global.stor_grp , line_stat : '0',tema : _global.options.work_book_tema},
									result : function(records, nameField, pairField) {
										nameField.setValue(records[0].get('cstm_name'));
										pairField.setValue(records[0].get('cstm_idcd'));
									}
								}
							},{	name : 'cstm_idcd', xtype : 'textfield' , hidden : true
							},{	fieldLabel	: Language.get('','제품명'),
								xtype		: 'popupfield', editable : true, enableKeyEvents : true,
								name		: 'item_name',
								pair		: 'item_idcd',
								width		: 250,
								height		: 47,
								labelWidth	: 80,
								margin		: '0 60 0 0',
								clearable	: true ,
								labelCls	: 'textTemp '+_global.options.work_book_tema+'label',
								fieldCls	: 'textTemp '+_global.options.work_book_tema+'field',
								cls			: 'textTemp',
								trigger1Cls : _global.options.work_book_tema+'searchTrigger',
								popup: {
									select : 'SINGLE',
									widget : 'lookup-item-popup',
									params : { stor_grp : _global.stor_grp , line_stat : '0',tema : _global.options.work_book_tema},
									result : function(records, nameField, pairField) {
										nameField.setValue(records[0].get('item_name'));
										pairField.setValue(records[0].get('item_idcd'));
									}
								}
							},{	name : 'item_idcd', xtype : 'textfield' , hidden : true
							},{	text		: '<span class="btnTemp" style="font-size:3em">조회</span>',
								xtype		: 'button',
								width		: 100,
								height		: 47,
								margin		: '0 0 0 20',
								cls			: 'button-style',
								action		: 'selectAction'
							},{	buttonAlign	: 'right',
								xtype		: 'button',
								text		: '<span class="btnTemp" style="font-size:25px;">닫기</span>',
								cls			: 'button-right btn btn-danger',
								width		: 200,
								height		: 47,
								style		: 'text-decoration:none;',
								handler:function(){
									clearInterval(window.eisInterval);
									var sideButton = Ext.dom.Query.select('#mainmenu-splitter-collapseEl')[0];
									sideButton.click();
									me.up('panel').close();
								}
							}
						]
					}
				]
			};
		return line;
	}
});