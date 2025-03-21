Ext.define('module.custom.sjflv.sale.export.orderlist1.view.OrderList1Search', { extend: 'Axt.form.Search',


	alias: 'widget.module-sjflv-orderlist1-search',
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
								emptyText	: '조회할 주문일자 또는 거래처코드를 입력하세요...',
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
				collapsed		: true,
				layout			: 'vbox',
				defaults		: { xtype: 'fieldset', layout: 'vbox', margin : '0 0 5 0', padding: '0', border: 0 , },
				fieldDefaults	: { width : 341, labelWidth : 80, labelSeparator : '' },
				items			: [
					{	xtype : 'fieldset', layout: 'hbox',
						items : [
							{	fieldLabel	: Language.get('dept_name','사업장'),
								xtype		: 'popupfield',
								editable	: true,
								enableKeyEvents : true,
								name		: 'dept_name',
								pair		: 'dept_idcd',
								width		: 250,
								clearable	: true,
								popup: {
									select : 'SINGLE',
									widget : 'lookup-dept-popup',
									params : { stor_grp : _global.stor_grp , line_stat : '0' },
									result : function(records, nameField, pairField) {
										nameField.setValue(records[0].get('dept_name'));
										pairField.setValue(records[0].get('dept_idcd'));
									}
								}
							},{	name : 'dept_idcd', xtype : 'textfield' , hidden : true
							},{	fieldLabel	: Language.get('offr_numb','Offer No'),
								xtype		: 'popupfield',
								editable	: true,
								enableKeyEvents : true,
								name		: 'offr_numb',
								width		: 250,
								clearable	: true,
								popup: {
									select : 'SINGLE',
									widget : 'lookup-offr-popup',
									params : { stor_grp : _global.stor_grp , line_stat : '0' },
									result : function(records, nameField, pairField) {
										nameField.setValue(records[0].get('offr_numb'));
									}
								}
							},{	fieldLabel	: Language.get('mngt_numb','관리번호'),
								xtype		: 'textfield',
								editable	: true,
								enableKeyEvents : true,
								name		: 'mngt_numb',
								labelWidth	: 100,
								width		: 250,
							}
						]
					},{	xtype : 'fieldset', layout: 'hbox',
						items : [
							{	fieldLabel	: Language.get('buyr_name','Buyer'),
								xtype		: 'textfield',
								editable	: true,
								enableKeyEvents : true,
								name		: 'buyr_name',
								width		: 250,
							},{	fieldLabel	: Language.get('mdtn_prsn','중개인'),
								xtype		: 'textfield',
								editable	: true,
								enableKeyEvents : true,
								name		: 'mdtn_prsn',
								width		: 250,
							},{	fieldLabel	: Language.get('invc_date','등록기간'),
								xtype		: 'betweenfield',
								name		: 'invc_date1',
								pair		: 'invc_date2',
								width		: 200,
								labelWidth	: 100,
								root		: true,
								value		:''
							},{	fieldLabel	: Language.get('','~'),
								xtype		: 'betweenfield',
								name		: 'invc_date2',
								pair		: 'invc_date1',
								width		: 115,
								labelWidth	: 15,
								value		:''
							}
						]
					},{	xtype : 'fieldset', layout: 'hbox',
						items : [
							{	fieldLabel	: Language.get('expt_dvcd','수출구분'),
								xtype		: 'lookupfield',
								name		: 'expt_dvcd',
								lookupValue	: resource.lookup('expt_dvcd'),
								width		: 250
							},{	fieldLabel	: Language.get('drtr_name','담당자'),
								xtype		: 'popupfield',
								editable	: true,
								enableKeyEvents : true,
								name		: 'drtr_name',
								pair		: 'drtr_idcd',
								width		: 250,
								clearable	: true,
								popup: {
									select : 'SINGLE',
									widget : 'lookup-user-popup',
									params : { stor_grp : _global.stor_grp , line_stat : '0' },
									result : function(records, nameField, pairField) {
										nameField.setValue(records[0].get('user_name'));
										pairField.setValue(records[0].get('user_idcd'));
									}
								}
							},{	name : 'drtr_idcd', xtype : 'textfield' , hidden : true
							},{	fieldLabel	: Language.get('deli_date','납기일자'),
								xtype		: 'betweenfield',
								name		: 'deli1_date',
								pair		: 'deli2_date',
								width		: 200,
								labelWidth	: 100,
								root		: true,
								value		:''
							},{	fieldLabel	: Language.get('','~'),
								xtype		: 'betweenfield',
								name		: 'deli2_date',
								pair		: 'deli1_date',
								width		: 115,
								labelWidth	: 15,
								value		:''
							}
						]
					},{	xtype : 'fieldset', layout: 'hbox',
						items : [
							{	fieldLabel	: Language.get('invc_numb','P/O No'),
								xtype		: 'textfield',
								editable	: true,
								enableKeyEvents : true,
								name		: 'invc_numb',
								width		: 250,
							},{	fieldLabel	: Language.get('line_stat','진행상태'),
								xtype		: 'lookupfield',
								name		: 'line_stat',
//								lookupValue	: resource.lookup('line_stat'),
								width		: 250,
								labelWidth	: 80,
							}
						]
					},{	xtype : 'fieldset', layout: 'hbox',
						items : [
							{	fieldLabel	: Language.get('item','품목코드'),
								xtype		: 'popupfield',
								editable	: true,
								enableKeyEvents : true,
								name		: 'item_name',
								width		: 250,
								pair		: 'item_idcd',
								clearable	: true,
								popup: {
									select : 'SINGLE',
									widget : 'lookup-item-popup-v3',
									params : { stor_grp : _global.stor_grp , line_stat : '0', acct_bacd:'제품' },
									result : function(records, nameField, pairField) {
										nameField.setValue(records[0].get('item_name'));
										pairField.setValue(records[0].get('item_idcd'));
									}
								}
							},{	name : 'item_idcd', xtype : 'textfield' , hidden : true
							},{	fieldLabel	: Language.get('item_name','품명'),
								xtype		: 'textfield',
								name		: 'item_name',
								width		: 250,
								editable	: true,
								enableKeyEvents : true,
							},{	fieldLabel	: Language.get('item_spec','규격'),
								xtype		: 'textfield',
								name		: 'item_spec',
								labelWidth	: 100,
								width		: 250,
								editable	: true,
								enableKeyEvents : true,
							}
						]
					}
				]
			};
		return line;
	}
});