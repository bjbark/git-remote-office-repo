Ext.define('module.prod.order.workbooklist.view.WorkBookListSearch', { extend: 'Axt.form.Search',


	alias: 'widget.module-workbooklist-search',
	/**
	 *
	 */
	initComponent: function(){
		var me = this;
		me.items = [
			me.searchBasic(),
//			me.createLine1(),
			me.addonSearch()
		];
		me.callParent();
	},

	searchBasic : function() {
		var me = this,
			line = {
				xtype	: 'fieldset',
				border	: 0,
				style	: { borderColor : '#8C8C8C', borderStyle : 'solid' },
				region	: 'center',
				width	: '100%',
				height	: 40,
				margin	: '0 40 0 40',
				items	: [
					{	xtype	: 'fieldset',
						border	: 3,
						flex	: 1,
						style	: { borderColor	: '#000081', borderStyle	: 'solid' },
						region	: 'center',
						height	: 34,
						margin 	: '3 0 0 0',
						defaults: { xtype: 'fieldset', layout: 'hbox', margin : '3 10  0', padding:'0', border: 0 },
						layout	: 'hbox',
						items	: [
							{	xtype	: 'label'			,
								fieldCls: 'requiredindex'	,
								text	: 'SEARCH  | '		,
								margin	: '5 10 0 0'		,
								style	: 'text-align:center;color: #0000B7;font-size: 13px !important;font-weight:bold;',
							},{	name	: 'find_name'		,
								xtype		: 'searchfield'	,
								flex		: 4				,
								emptyText	: '조회할 발주일자 또는 거래처코드를 입력하세요...',
								enableKeyEvents : true			,
								listeners:{
									keydown : function(self, e) {
										if (e.keyCode == e.ENTER || e.keyCode == 9) {
											var searchButton = self.up('form').down('[action=selectAction]');
											searchButton.fireEvent('click', searchButton); //조회버튼클릭
										}
									}
								}
							}
						]
					},{	xtype	: 'button'  ,action : Const.SELECT.action, margin : '2 2 0 0',region : 'north' , width : 40, height : 36,
						style	: 'background:url("../../../resource/img/btn_search_icon.png")'
					},{	xtype	: 'fieldset',border	: 0 ,region	: 'north',height  : 34, width	: 2
					}
				]
			};
		return line;
	},

	addonSearch : function(){
		var me = this,
			line = {
				xtype			: 'fieldset',
				title			: '상세검색',
				collapsible		: true,
				collapsed		: true,
				layout			: 'vbox',
				defaults		: { xtype: 'fieldset', layout: 'vbox', margin : '0 0 5 0', padding: '0', border: 0 , },
				fieldDefaults	: { width : 341, labelWidth : 100, labelSeparator : '' },
				items			: [
					{	xtype : 'fieldset', layout: 'hbox',
						items : [
							{	fieldLabel	: Language.get('deli_date','협력사(납기일자)'),
								xtype		: 'betweenfield',
								name		: 'deli_date1',
								pair		: 'deli_date2',
								labelWidth	: 99,
								width		: 198,
								margin		: '0 0 0 18',
								root		: true,
								value		: ''
							},{	xtype		: 'betweenfield',
								fieldLabel	:'~',
								name		: 'deli_date2',
								pair		: 'deli_date1',
								labelWidth	: 15,
								width		: 115,
								value		: ''
							},{	fieldLabel	: Language.get('acpt_numb','수주번호'),
								xtype		: 'textfield',
								name		: 'acpt_numb',
								width		: 315,
								labelWidth	: 100
							},{	fieldLabel	: Language.get('cstm_lott_numb','LOT번호'),
								xtype		: 'textfield',
								name		: 'cstm_lott_numb',
								width		: 207,
								labelWidth	: 100
							}
						]
					},{	xtype : 'fieldset', layout: 'hbox',
						items : [
							{	fieldLabel	: Language.get('updt_dttm','최종변경일'),
								xtype		: 'betweenfield',
								name		: 'updt_dttm1',
								pair		: 'updt_dttm2',
								labelWidth	: 99,
								width		: 198,
								margin		: '0 0 0 18',
								root		: true,
								value		: ''
							},{	xtype		: 'betweenfield',
								fieldLabel	:'~',
								name		: 'updt_dttm2',
								pair		: 'updt_dttm1',
								labelWidth	: 15,
								width		: 115,
								value		: ''
							},{	fieldLabel	: Language.get('cvic_name','설비'),
								xtype		: 'popupfield',
								editable	: true,
								enableKeyEvents : true,
								name		: 'cvic_name',
								width		: 315,
								pair		: 'cvic_idcd',
								margin		: '0 0 0 0',
								popup: {
									select : 'SINGLE',
									widget : 'lookup-cvic-popup',
									params : { stor_grp : _global.stor_grp , line_stat : '0' },
									result : function(records, nameField, pairField) {
										nameField.setValue(records[0].get('cvic_name'));
										pairField.setValue(records[0].get('cvic_idcd'));
									}
								}
							},{	name : 'cvic_idcd', xtype : 'textfield' , hidden : true
							},{	fieldLabel	: Language.get('dayn_dvcd','주/야'),
								xtype		: 'lookupfield',
								name		: 'dayn_dvcd',
								lookupValue	: resource.lookup('dayn_dvcd'),
								width		: 207
							}
						]
					},{	xtype : 'fieldset', layout: 'hbox',
						items : [
							{	fieldLabel	: Language.get('item','품목'),
								xtype		: 'popupfield',
								editable	: true,
								enableKeyEvents : true,
								name		: 'item_name',
								width		: 314,
								pair		: 'item_idcd',
								margin		: '0 0 0 18',
								popup: {
									select : 'SINGLE',
									widget : 'lookup-item-popup',
									params : { stor_grp : _global.stor_grp , line_stat : '0' },
									result : function(records, nameField, pairField) {
										nameField.setValue(records[0].get('item_name'));
										pairField.setValue(records[0].get('item_idcd'));
									}
								}
							},{	name : 'item_idcd', xtype : 'textfield' , hidden : true
							},{	fieldLabel	: Language.get('wkct_name','공정상태'),
								xtype		: 'popupfield',
								editable	: true,
								enableKeyEvents : true,
								name		: 'wkct_name',
								width		: 207,
								pair		: 'wkct_idcd',
								margin		: '0 0 0 315',
								popup: {
									select : 'SINGLE',
									widget : 'lookup-wkct-popup',
									params : { stor_grp : _global.stor_grp , line_stat : '0' },
									result : function(records, nameField, pairField) {
										nameField.setValue(records[0].get('wkct_name'));
										pairField.setValue(records[0].get('wkct_idcd'));
									}
								}
							},{	name : 'wkct_idcd', xtype : 'textfield' , hidden : true
							}
						]
					}
				]
			};
		return line;
	}
});