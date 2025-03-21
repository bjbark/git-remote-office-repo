Ext.define('module.prod.project.prjtworkentry.view.PrjtWorkEntryListerDetailSearch',{ extend: 'Axt.form.Search',
	store	: 'module.prod.project.prjtworkentry.store.PrjtWorkEntryDetail3',
	alias	: 'widget.module-prjtworkentry-detailSearch',
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
							{	fieldLabel	: Language.get('work_date','지시일자'),
								xtype		: 'betweenfield',
								name		: 'work_date',
								pair		: 'work_date2',
								width		: _global.hq_id.toUpperCase() == 'N1000WONTC'? 300 : 370,
								labelWidth	: 150,
								labelWidth	: _global.hq_id.toUpperCase() == 'N1000WONTC'? 110 : 150,
								format		: Const.DATE_FORMAT_YMD_BAR,
								submitFormat: Const.DATE_FORMAT_YMD,
								value		: '',
								height		: _global.hq_id.toUpperCase() == 'N1000WONTC'? 40 : 47,
								margin		: '0 60 0 0',
								labelCls	: 'textTemp '+_global.hq_id.toUpperCase()+'label',
								fieldCls	: 'textTemp '+_global.hq_id.toUpperCase()+'field',
								cls			: 'textTemp',
								trigger1Cls : _global.hq_id.toUpperCase()+'dateTrigger',
							},{	fieldLabel	: Language.get('','~'),
								xtype		: 'betweenfield',
								name		: 'work_date2',
								pair		: 'work_date',
								width		: _global.hq_id.toUpperCase() == 'N1000WONTC'? 210 : 240,
								labelWidth	: 20,
								margin		: '0 60 0 0',
								format		: Const.DATE_FORMAT_YMD_BAR,
								submitFormat: Const.DATE_FORMAT_YMD,
								value		: '',
								height		: _global.hq_id.toUpperCase() == 'N1000WONTC'? 40 : 47,
								labelCls	: 'textTemp '+_global.hq_id.toUpperCase()+'label',
								fieldCls	: 'textTemp '+_global.hq_id.toUpperCase()+'field',
								cls			: 'textTemp',
								trigger1Cls : _global.hq_id.toUpperCase()+'dateTrigger',
							},{	fieldLabel	: Language.get('prog_stat_dvcd','상태'),
								xtype		: 'lookupfield',
								name		: 'prog_stat_dvcd',
								lookupValue	: [["0","대기"],["3","완료"],["2","중단"]],
								labelCls	: 'textTemp '+_global.hq_id.toUpperCase()+'label',
								fieldCls	: 'textTemp '+_global.hq_id.toUpperCase()+'field',
								value		: '0',
								height		: 47,
								labelWidth	: _global.hq_id.toUpperCase() == 'N1000WONTC'? 90 : 70,
								width		: 250,
								margin		: '0 60 0 0',
								listConfig:{
									itemCls		: _global.hq_id.toUpperCase()+'item'											// lookup list에 클래스 추가
								},
								trigger1Cls : _global.hq_id.toUpperCase()+'trigger',											// trigger(버튼)에 클래스 추가
							},{	fieldLabel	: Language.get('wkct_name','공정'),
								xtype		: 'popupfield',
								editable	: true,
								enableKeyEvents : true,
								name		: 'wkct_name',
								pair		: 'wkct_idcd',
								width		: 300,
								labelWidth	: 80,
								height		: _global.hq_id.toUpperCase() == 'N1000WONTC'? 40 : 47,
								margin		: '0 60 0 0',
								labelCls	: 'textTemp '+_global.hq_id.toUpperCase()+'label',
								fieldCls	: 'textTemp '+_global.hq_id.toUpperCase()+'field',
								cls			: 'textTemp',
								trigger1Cls : _global.hq_id.toUpperCase()+'searchTrigger',
								clearable	: true ,
								popup: {
									select : 'SINGLE',
									widget : 'lookup-wkct-popup',
									params : { stor_grp : _global.stor_grp , line_stat : '0'},
									result : function(records, nameField, pairField) {
										nameField.setValue(records[0].get('wkct_name'));
										pairField.setValue(records[0].get('wkct_idcd'));
									}
								}
							},{	name : 'wkct_idcd', xtype : 'textfield' , hidden : true
							},{	fieldLabel	: Language.get('acpt_numb','금형코드'),
								xtype		: 'popupfield',
								editable	: true,
								enableKeyEvents : true,
								name		: 'pjod_idcd',
								width		: 320,
								labelWidth	: 120,
								height		: _global.hq_id.toUpperCase() == 'N1000WONTC'? 40 : 47,
								margin		: '0 60 0 0',
								labelCls	: 'textTemp '+_global.hq_id.toUpperCase()+'label',
								fieldCls	: 'textTemp '+_global.hq_id.toUpperCase()+'field',
								cls			: 'textTemp',
								trigger1Cls : _global.hq_id.toUpperCase()+'searchTrigger',
								clearable	: true ,
								popup: {
									select : 'SINGLE',
									widget : 'lookup-pjod-popup',
									params : { stor_grp : _global.stor_grp , line_stat : '0',work_ordr_dvcd : '' },
									result : function(records, nameField, pairField) {
										nameField.setValue(records[0].get('pjod_idcd'));
									}
								}
							},{	text		: '<span class="btnTemp" style="font-size:3em">조회</span>',
								xtype		: 'button',
								width		: 100,
								height		: _global.hq_id.toUpperCase() == 'N1000WONTC'? 40 : 47,
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