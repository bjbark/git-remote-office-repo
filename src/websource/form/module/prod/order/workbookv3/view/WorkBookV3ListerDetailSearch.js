Ext.define('module.prod.order.workbookv3.view.WorkBookV3ListerDetailSearch',{ extend: 'Axt.form.Search',
	store	: 'module.prod.order.workbookv3.store.WorkBookV3Detail3',
	alias	: 'widget.module-workbookv3-detailSearch',
	style	: 'padding-left : 5px;' ,
//
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
							{	fieldLabel	: Language.get('work_date','일자'),
								xtype		: 'betweenfield',
								name		: 'work_date',
								pair		: 'work_date2',
								width		: 270,
								labelWidth	: 100,
								root		: true,
								format		: Const.DATE_FORMAT_YMD_BAR,
								submitFormat: Const.DATE_FORMAT_YMD,
								value		: '',
								height		: 47,
								margin		: '0 50 0 0',
								labelCls	: 'textTemp '+_global.hq_id+'label',
								fieldCls	: 'textTemp '+_global.hq_id+'field',
								cls			: 'textTemp',
								trigger1Cls : _global.hq_id+'dateTrigger',
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
								labelCls	: 'textTemp '+_global.hq_id+'label',
								fieldCls	: 'textTemp '+_global.hq_id+'field',
								cls			: 'textTemp',
								trigger1Cls : _global.hq_id+'dateTrigger',
							},{	fieldLabel	: Language.get('prog_stat_dvcd','상태'),
								xtype		: 'lookupfield',
								name		: 'prog_stat_dvcd',
								lookupValue	: resource.lookup('prog_stat_dvcd'),
								labelCls	: 'textTemp '+_global.hq_id+'label',
								fieldCls	: 'textTemp '+_global.hq_id+'field',
								value		: '0',
								height		: 47,
								labelWidth	: 150,
								editable	: false,
								width		: 330,
								margin		: '0 80 0 35',
								listConfig:{
									itemCls		: _global.hq_id+'item'											// lookup list에 클래스 추가
								},
								trigger1Cls : _global.hq_id+'trigger',											// trigger(버튼)에 클래스 추가
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
								labelCls	: 'textTemp '+_global.hq_id+'label',
								fieldCls	: 'textTemp '+_global.hq_id+'field',
								cls			: 'textTemp',
								trigger1Cls : _global.hq_id+'searchTrigger',
								clearable	: true ,
								popup: {
									select : 'SINGLE',
									widget : 'lookup-workbookv4-pror-popup',
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
					},{	xtype : 'fieldset', layout: 'hbox',
						items : [
							{	fieldLabel	: Language.get('wkct_name','공정'),
								xtype		: 'popupfield',
								editable	: true,
								enableKeyEvents : true,
								name		: 'wkct_name',
								pair		: 'wkct_idcd',
								width		: 505,
								labelWidth	: 100,
								height		: 47,
								margin		: '0 80 0 0',
								labelCls	: 'textTemp '+_global.hq_id+'label',
								fieldCls	: 'textTemp '+_global.hq_id+'field',
								cls			: 'textTemp',
								trigger1Cls : _global.hq_id+'searchTrigger',
								clearable	: true ,
								editable	: true,
								popup: {
									select : 'SINGLE',
									widget : 'lookup-workbookv3-wkct-popup',
									params : { stor_grp : _global.stor_grp , line_stat : '0'},
									result : function(records, nameField, pairField) {
										nameField.setValue(records[0].get('wkct_name'));
										pairField.setValue(records[0].get('wkct_idcd'));
									}
								}
							},{	name : 'wkct_idcd', xtype : 'textfield' , hidden : true
							},{	fieldLabel	: Language.get('','생산계획번호'),
								xtype		: 'textfield',
								name		: 'wkod_numb',
								width		: 330,
								labelWidth	: 165,
								height		: 45,
								margin		: '0 20 0 0',
								labelCls	: 'textTemp '+_global.hq_id+'label',
								fieldCls	: 'textTemp '+_global.hq_id+'field',
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