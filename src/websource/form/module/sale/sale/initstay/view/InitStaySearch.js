Ext.define('module.sale.sale.initstay.view.InitStaySearch', { extend: 'Axt.form.Search',


	alias: 'widget.module-initstay-search',
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
							{	xtype	: 'label',
								fieldCls: 'requiredindex',
								text	: 'SEARCH  | ',
								margin	: '5 10 0 0',
								style	: 'text-align:center;color: #0000B7;font-size: 13px !important;font-weight:bold;',
							},{	name	: 'find_name',
								xtype		: 'searchfield',
								flex		: 4,
								emptyText	: '',
								enableKeyEvents : true,
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
				name			: 'collapsed',
				layout			: 'vbox',
				defaults		: { xtype: 'fieldset', layout: 'vbox', margin : '0 0 5 0', padding: '0', border: 0 , },
				fieldDefaults	: { width : 341, labelWidth : 100, labelSeparator : '' },
				items			: [
					{	xtype : 'fieldset', layout: 'hbox',
						items : [
						{	fieldLabel	: Language.get('','이월일자'),
							xtype		: 'betweenfield',
							name		: 'trns_date1',
							pair		: 'trns_date2',
							labelWidth	: 70,
							width		: 170,
							margin		: '0 0 0 30',
							root		: true,
							required	: true,
							fieldCls	: 'requiredindex',
							value		: Ext.Date.getFirstDateOfMonth(new Date()),
						},{	xtype		: 'betweenfield',
							fieldLabel	:'~',
							name		: 'trns_date2',
							pair		: 'trns_date1',
							labelWidth	: 15,
							width		: 115,
							value		: Ext.Date.getLastDateOfMonth(new Date()),
							required	: true,
							fieldCls	: 'requiredindex',
						},{	fieldLabel	: Language.get('','거래처'),
								xtype		: 'popupfield',
								editable	: true,
								enableKeyEvents : true,
								name		: 'cstm_name',
								pair		: 'cstm_idcd',
								width		: 180,
								labelWidth	: 50,
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
							},{	fieldLabel	: Language.get('','품목'),
								xtype		: 'popupfield',
								editable	: true,
								enableKeyEvents : true,
								name		: 'item_name',
								pair		: 'item_idcd',
								width		: 200,
								labelWidth	: 50,
								clearable	: true,
								popup: {
									select : 'SINGLE',
									widget : 'lookup-item-popup',
									params : { stor_grp : _global.stor_grp , line_stat : '0', acct_bacd:'삼정(제품)' },
									result : function(records, nameField, pairField) {
										nameField.setValue(records[0].get('item_name'));
										pairField.setValue(records[0].get('item_idcd'));
									}
								}
							},{	name : 'item_idcd', xtype : 'textfield' , hidden : true
							},{	fieldLabel	: Language.get('','Batch 번호'),
								xtype		: 'textfield',
								name		: 'lott_numb',
								labelWidth	: 70,
								margin		: '0 0 0 15',
								width		: 190
							},{	fieldLabel	: Language.get('','수주구분'),
								xtype		: 'lookupfield',
								name		: 'acpt_dvcd',
								width		: 155,
								labelWidth	: 70,
								margin		: '0 0 0 10',
								editable	:false,
								lookupValue	: resource.lookup('acpt_dvcd'),
							},{	fieldLabel	: Language.get('','합계구분'),
								xtype		: 'lookupfield',
								name		: 'row_type',
								lookupValue	: [['1','일계'],['2','월계'],['3','합계']],
								multiSelect	: true ,
								editable	: false,
								labelWidth	: 70,
								width		: 200,
								margin		: '0 0 0 0',
								value		: ["3"]
							}
						]
					}
				]
			};
		return line;
	}
});