Ext.define('module.custom.sjflv.stock.close.mtrlstocklist.view.MtrlStockListSearch', { extend: 'Axt.form.Search',

	alias: 'widget.module-mtrlstocklist-search',
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
							},{	fieldLabel	: Language.get('wrhs_name','창고'),
								xtype		: 'popupfield',
								editable	: true,
								enableKeyEvents : true,
								name		: 'wrhs_name',
								labelWidth	: 30,
								width		: 200,
								clearable	: true,
								pair		: 'wrhs_idcd',
								popup		: {
									select	: 'SINGLE',
									widget	: 'lookup-wrhs-popup',
									params	: { stor_grp : _global.stor_grp , line_stat : '0',mngt_wrhs_dvcd:'0003' },
									result	: function(records, nameField, pairField) {
										nameField.setValue(records[0].get('wrhs_name'));
										pairField.setValue(records[0].get('wrhs_idcd'));
									}
								},
								value 		: _global.options.mes_system_type.toUpperCase() == 'SJFLV' ? '자재창고' : ''
							},{	name : 'wrhs_idcd', xtype : 'textfield' , hidden : true, value : _global.options.mes_system_type.toUpperCase() == 'SJFLV' ? '02' : ''
							},{	name		: 'find_name'		,
								xtype		: 'searchfield'	,
								flex		: 4				,
								emptyText	: '',
								enableKeyEvents : true			,
								listeners:{
									keydown : function(self, e) {
										if (e.keyCode == e.ENTER || e.keyCode == 9) {
											var searchButton = self.up('form').down('[action=selectAction]');
											searchButton.fireEvent('click', searchButton); //조회버튼클릭
										}
									}
								}
//							},{	name		: 'acct_dvcd', xtype : 'textfield' , hidden : true,value:'1001'
							},
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
				collapsed		: false ,
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
								width		: 198,
								margin		: '0 0 0 2',
								root		: true,
								root		: true,
								format		: Const.DATE_FORMAT_YMD_BAR,
								submitFormat: Const.DATE_FORMAT_YMD,
								value		: Ext.Date.getFirstDateOfMonth(new Date()),
							},{	xtype		: 'betweenfield',
								fieldLabel	:'~',
								name		: 'invc2_date',
								pair		: 'invc1_date',
								labelWidth	: 15,
								width		: 114,
								format		: Const.DATE_FORMAT_YMD_BAR,
								submitFormat: Const.DATE_FORMAT_YMD,
								value		: Ext.Date.getLastDateOfMonth(new Date()),
								clearable	: true
							},{	xtype		: 'checkbox',
								boxLabel	: '전체품목표시',
								name		: 'list_all',
								checked		: false,
								style		: { color : 'blue' },
								margin		: '0 0 0 30',
								width		: 80,
//							},{	xtype		: 'checkbox',
//								name		: 'stok_type_dvcd',
//								checked		: false,
//								hidden		: _global.options.mes_system_type.toUpperCase() != 'SJFLV' ? true : _global.hq_id.toUpperCase() == 'N1000SJFLV' ? false : true,
//								style		: { color : 'blue' },
//								margin		: '0 0 0 5',
//								width		: 80,
							},{	fieldLabel	: Language.get('item','품목'),
								xtype		: 'popupfield',
								editable	: true,
								enableKeyEvents : true,
								name		: 'item_name',
								width		: 250,
								labelWidth	: 60,
								clearable	: true,
								margin		: '0 0 0 30',
								pair		: 'item_idcd',
								popup: {
									select : 'SINGLE',
									widget : 'lookup-item-popup-v4',
									params : { stor_grp : _global.stor_grp , line_stat : '0', acct_bacd	: '' },
									result : function(records, nameField, pairField) {
										nameField.setValue(records[0].get('item_name'));
										pairField.setValue(records[0].get('item_idcd'));
									}
								}
							},{	name : 'item_idcd', xtype : 'textfield' , hidden : true
							},{	fieldLabel	: Language.get('','거래처'),
								xtype		: 'popupfield',
								name		: 'cstm_name',
								pair		: 'cstm_idcd',
								clearable	: true,
								labelWidth	: 100,
								width		: 240,
								margin		: '0 0 0 30',
								popup: {
									select : 'SINGLE',
									widget : 'lookup-cstm-popup',
									params : { stor_grp : _global.stor_grp , line_stat : '0', sale_cstm_yorn : '' },
									result : function(records, nameField, pairField) {
										nameField.setValue(records[0].get('cstm_name'));
										pairField.setValue(records[0].get('cstm_idcd'));
									}
								}
							},{	name : 'cstm_idcd', xtype : 'textfield' , hidden : true
							},
	 					]
					}
				]
			};
		return line;
	}
});