Ext.define('module.custom.aone.sale.order.sorderplan.view.SorderPlanSearch', { extend: 'Axt.form.Search',


	alias: 'widget.module-aone-sorderplan-search',
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
								emptyText	: '조회할 A-one코드 또는 거래처명을 입력하세요...',
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
				fieldDefaults	: { width : 341, labelWidth : 80, labelSeparator : '' },
				items			: [
					{	xtype : 'fieldset', layout: 'hbox',
						items : [
							{	fieldLabel	: Language.get('inqy_term','조회기간'),
								xtype		: 'betweenfield',
								name		: 'invc1_date',
								pair		: 'invc2_date',
								labelWidth	: 99,
								width		: 198,
								margin		: '0 0 0 2',
								root		: true,
								value		: Ext.Date.add( new Date(), Ext.Date.MONTH, -1)
							},{	xtype		: 'betweenfield',
								fieldLabel	:'~',
								name		: 'invc2_date',
								pair		: 'invc1_date',
								labelWidth	: 15,
								width		: 115,
								value		: new Date()
							},{	fieldLabel	: Language.get('acpt_stat_dvcd','진행상태'),
								xtype		: 'lookupfield',
								name		: 'acpt_stat_dvcd',
								lookupValue	: resource.lookup('search_all').concat( resource.lookup('acpt_stat_dvcd' ).slice(1,4) )	,
								value		: '',
								width		: 180
							},{	fieldLabel	: Language.get('repa_stat_dvcd','수리상태'),
								xtype		: 'lookupfield',
								name		: 'repa_stat_dvcd',
								lookupValue	: resource.lookup('search_all').concat( resource.lookup('repa_stat_dvcd' ) )	,
								value		: '',
								width		: 180
							},{	fieldLabel	: Language.get('acpt_dvcd','입고유형'),
								xtype		: 'lookupfield',
								name		: 'acpt_dvcd',
								lookupValue	: resource.lookup('search_all').concat( resource.lookup('acpt_dvcd' ) )	,
								value		: '',
								width		: 180
							},{	fieldLabel	: Language.get('prod_drtr_name','엔지니어'),
								xtype		: 'popupfield',
								editable	: true,
								enableKeyEvents : true,
								name		: 'prod_drtr_name',
								width		: 245,
								labelWidth	: 80,
								pair		: 'prod_drtr_idcd',
								clearable	: true,
								popup: {
									select : 'SINGLE',
									widget : 'lookup-user-popup',
									params : { stor_grp : _global.stor_grp , line_stat : '0', dept_idcd : '6000' },
									result : function(records, nameField, pairField) {
										nameField.setValue(records[0].get('user_name'));
										pairField.setValue(records[0].get('user_idcd'));
									}
								}
							},{	name : 'prod_drtr_idcd', xtype : 'textfield', hidden : true
							}
	 					]
					},{	xtype : 'fieldset', layout: 'hbox',margin : '0 0 0 20',
						items : [
							,{	fieldLabel	: Language.get('cstm','거래처'),
								xtype		: 'popupfield',
								editable	: true,
								enableKeyEvents : true,
								name		: 'cstm_name',
								width		: 295,
								pair		: 'cstm_idcd',
								clearable	: true,
								popup: {
									select : 'SINGLE',
									widget : 'lookup-cstm-popup',
									params : { stor_grp : _global.stor_grp , line_stat : '0' },
									result : function(records, nameField, pairField) {
										nameField.setValue(records[0].get('cstm_name'));
										pairField.setValue(records[0].get('cstm_idcd'));
									}
								}
							},{	name : 'cstm_idcd', xtype : 'textfield' , hidden : true
							},{	fieldLabel	: Language.get('item','품목'),
								xtype		: 'popupfield',
								editable	: true,
								enableKeyEvents : true,
								name		: 'item_name',
								width		: 295,
								pair		: 'item_idcd',
								clearable	: true,
								popup: {
									select	: 'MULTI',
									widget	: 'lookup-item-popup-aone',
									values	: { },
									option	: { direct_result : true },
									params	: {	stor_grp	: _global.stor_grp,
												stor_id		: _global.stor_id,
												line_stat	: '0',
												acct_bacd	: '제품',
									},
									result : function(records, nameField, pairField) {
										nameField.setValue(records[0].get('item_name'));
										pairField.setValue(records[0].get('item_idcd'));
									}
								}
							},{	name : 'item_idcd', xtype : 'textfield' , hidden : true
							},{	fieldLabel	: Language.get('item_spec','규격'),
								xtype		: 'textfield',
								editable	: true,
								enableKeyEvents : true,
								name		: 'item_spec',
								width		: 245,
								clearable	: true,
							},{	fieldLabel	: Language.get('sral_numb','Serial No.'),
								xtype		: 'textfield',
								editable	: true,
								enableKeyEvents : true,
								name		: 'sral_numb',
								width		: 245,
								clearable	: true,
							},{	name : 'drtr_idcd', xtype : 'textfield' , hidden : true
							}
						]
					}
				]
			};
		return line;
	}
});