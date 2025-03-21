Ext.define('module.sale.order.slorlist2.view.SlorList2Search', { extend: 'Axt.form.Search',

	alias: 'widget.module-slorlist2-search',
	initComponent: function(){
		var me = this;
		me.items = [
			me.searchBasic(),
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
						margin	: '3 0 0 0',
						defaults: { xtype: 'fieldset', layout: 'hbox', margin : '3 10  0', padding:'0', border: 0 },
						layout	: 'hbox',
						items	: [
							{	xtype		: 'label'			,
								fieldCls	: 'requiredindex'	,
								text		: 'SEARCH  | '		,
								margin		: '5 10 0 0'		,
								style		: 'text-align:center;color: #0000B7;font-size: 13px !important;font-weight:bold;',
							},{	name		: 'find_name'		,
								xtype		: 'searchfield'	,
								flex		: 4				,
								emptyText	: '조회할 거래처코드 또는 주문일자를 입력하세요...',
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
				collapsed		: false,
				layout			: 'vbox',
				defaults		: { xtype: 'fieldset', layout: 'vbox', margin : '0 0 5 0', padding: '0', border: 0 , },
				fieldDefaults	: { width: 341, labelWidth : 100, labelSeparator : '' },
				items			: [
					{	xtype	: 'fieldset', layout: 'hbox',
						items	: [
							{	fieldLabel	: Language.get('inqy_term','조회기간'),
								xtype		: 'betweenfield',
								name		: 'invc1_date',
								pair		: 'invc2_date',
								labelWidth	: 99,
								width		: 199,
								margin		: '0 0 0 2',
								root		: true,
								value		: Ext.Date.add(new Date(), Ext.Date.DAY, 1)
							},{	xtype		: 'betweenfield',
								fieldLabel	:'~',
								name		: 'invc2_date',
								pair		: 'invc1_date',
								labelWidth	: 15,
								width		: 115,
								value		: Ext.Date.add(new Date(), Ext.Date.DAY, 1)
							},{	fieldLabel	: Language.get('cstm','거래처'),
								xtype		: 'popupfield',
								editable	: true,
								enableKeyEvents : true,
								name		: 'cstm_name',
								width		: 315,
								pair		: 'cstm_idcd',
								clearable	: true,
								popup		: {
									select	: 'SINGLE',
									widget	: 'lookup-cstm-popup',
									params	: { stor_grp : _global.stor_grp , line_stat : '0' },
									result	: function(records, nameField, pairField) {
										nameField.setValue(records[0].get('cstm_name'));
										pairField.setValue(records[0].get('cstm_idcd'));
									}
								}
							},{	name : 'cstm_idcd', xtype : 'textfield' , hidden : true
							},
//							{	fieldLabel	: Language.get('','품목코드'),
//								xtype		: 'popupfield',
//								editable	: true,
//								enableKeyEvents : true,
//								name		: 'item_code',
//								pair		: 'item_idcd2',
//								width		: 315,
//								clearable	: true,
//								popup: {
//									select : 'SINGLE',
//									widget : 'lookup-item-popup',
//									params : { stor_grp : _global.stor_grp , line_stat : '0', acct_bacd:'제품' },
//									result : function(records, nameField, pairField) {
//										nameField.setValue(records[0].get('item_code'));
//										pairField.setValue(records[0].get('item_idcd'));
//									}
//								}
//							},{	name : 'item_idcd2', xtype : 'textfield' , hidden : true
//							}
	 					]
					},{	xtype : 'fieldset', layout: 'hbox',
						items : [
							{	fieldLabel	: Language.get('','품목코드'),
								xtype		: 'popupfield',
								editable	: true,
								enableKeyEvents : true,
								name		: 'item_code',
								pair		: 'item_idcd',
								width		: 315,
								clearable	: true,
								popup: {
									select : 'SINGLE',
									widget : 'lookup-item-popup',
									params : { stor_grp : _global.stor_grp , line_stat : '0', acct_bacd:'삼정(제품)' },
									result : function(records, nameField, pairField) {
										nameField.setValue(records[0].get('item_code'));
										pairField.setValue(records[0].get('item_idcd'));
									}
								}
							},{	name : 'item_idcd', xtype : 'textfield' , hidden : true
							},{	fieldLabel	: Language.get('item','품목'),
								xtype		: 'popupfield',
								editable	: true,
								enableKeyEvents : true,
								name		: 'item_name',
								hidden		: true,
//								hidden		: _global.hq_id =='N1000nbolt',
								width		: 315,
								pair		: 'item_idcd' ,
								clearable	: true ,
								popup		: {
									select	: 'SINGLE',
									widget	: 'lookup-item-popup-v3',
									params	: { stor_grp : _global.stor_grp , line_stat : '0' },
									result	: function(records, nameField, pairField) {
										nameField.setValue(records[0].get('item_name'));
										pairField.setValue(records[0].get('item_idcd'));
									}
								}
							},{	name		: 'item_idcd2', xtype : 'textfield' , hidden : true
							},{	fieldLabel	: Language.get('','품목군'),
								width		: 315,
								xtype		: 'popupfield',
								editable	: true,
								enableKeyEvents : true,
								name		: 'item_clss_bacd_name',
								pair		: 'item_clss_bacd',
								clearable	: true ,
								hidden		: _global.hq_id !='N1000nbolt',
								popup		: {
									select	: 'SINGLE',
									widget	: 'lookup-base-popup',
									params	: { stor_grp : _global.stor_grp , line_stat : '0' , prnt_idcd : '8001'},
									result	: function(records, nameField, pairField) {
										nameField.setValue(records[0].get('base_name'));
										pairField.setValue(records[0].get('base_code'));
									}
								}
							},{	name	: 'item_clss_bacd'		, xtype : 'textfield', hidden : true
							},{	fieldLabel	: Language.get('drtr_name','영업담당'),
								xtype		: 'popupfield',
								editable	: true,
								enableKeyEvents : true,
								name		: 'drtr_name',
								width		: 315,
								pair		: 'drtr_idcd',
								clearable	: true,
								popup		: {
									select	: 'SINGLE',
									widget	: 'lookup-user-popup',
									params	: { stor_grp : _global.stor_grp , line_stat : '0' },
									result	: function(records, nameField, pairField) {
										nameField.setValue(records[0].get('user_name'));
										pairField.setValue(records[0].get('user_idcd'));
									}
								}
							},{	name		: 'drtr_idcd', xtype : 'textfield' , hidden : true
							}
						]
					}
				]
			};
		return line;
	}
});