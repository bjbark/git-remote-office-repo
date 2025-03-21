Ext.define('module.custom.iypkg.stock.isos.isttlist1.view.IsttList1Search', { extend: 'Axt.form.Search',

	alias: 'widget.module-isttlist1-search',

	initComponent: function(){
		var me = this;
		me.items =[ me.searchBasic(),me.createLine()];
		me.callParent();
	},
	searchBasic : function(){
		var me = this,
			line = {
				xtype	: 'fieldset',
				border	: 0,
				style	: { borderColor	: '#8C8C8C', borderStyle	: 'solid' },
				region	: 'center',
				width	: '100%',
				height	: 40,
				margin	: '0 40 0 40',
				items	: [
					{	xtype	: 'fieldset',
						border	: 3,
						flex	: 1,
						style	: { borderColor	: '#263c63', borderStyle	: 'solid' },
						region	: 'center',
						height	: 34,
						margin : '3 0 0 0',
						defaults 	: { xtype: 'fieldset', layout: 'hbox', margin : '3 10  0', padding:'0', border: 0 },
						layout	: 'hbox',
						items	: [
							{	xtype	: 'label',
								text	: 'SEARCH  | ',
								margin	: '7 10 0 0',
								style	: 'text-align:center;color: #263c63;font-size: 13px !important;font-weight:bold;',
							},{	name	: 'find_name',
								xtype	: 'searchfield',
								flex	: 4,
								emptyText	: '조회할 품목코드 또는 품명을 입력하세요...',
								enableKeyEvents : true,
								listeners:{
									keydown : function(self, e) {
										if (e.keyCode == e.ENTER || e.keyCode == 9) {
											var searchButton = self.up('form').down('[action=selectAction]'); /* 조회버튼 위치 */
											searchButton.fireEvent('click', searchButton); /* 조회버튼 Click */
										}
									},
								}
							}
						]
					},{	xtype	: 'button'  ,action : Const.SELECT.action, margin : '2 2 0 0',region : 'north' , width   : 40, height 	: 36,
						style	: 'background:url("../../../resource/img/btn_search_icon.png")'
					},{	xtype	: 'fieldset',border	: 0 ,region	: 'north',height  : 34, width	: 2
					}
				]
			}
		;
		return line;
	},

	createLine : function(){
		var me = this,
			line = {
				xtype			: 'fieldset',
				title			: '상세검색',
				collapsible		: true,
				collapsed		: false,
				overflowX		: true,
				layout			: 'vbox',
				defaults		: { xtype: 'fieldset', layout: 'vbox', margin : '0 0 5 0', padding: '0', border: 0 },
				fieldDefaults	: { width: 341, labelWidth : 72, labelSeparator : '' },
				items			: [
					{	xtype	: 'fieldset',
						layout	: 'hbox',
						margin	: '0 40 0 40',
						items	: [
							{	fieldLabel	: Language.get('','조회기간'),
								xtype		: 'betweenfield',
								name		: 'invc_date1',
								pair		: 'invc_date2',
								labelWidth	: 70,
								width		: 170,
								margin		: '0 0 0 2',
								root		: true,
								value		: Ext.Date.getFirstDateOfMonth(new Date())
							},{	xtype		: 'betweenfield',
								fieldLabel	:'~',
								name		: 'invc_date2',
								pair		: 'invc_date1',
								labelWidth	: 15,
								width		: 115,
								value		: new Date()
							},{	fieldLabel	: Language.get('','매출처'),
								xtype		: 'popupfield',
								editable	: true,
								enableKeyEvents : true,
								labelWidth	: 72,
								width		: 285,
								name		: 'cstm_name',
								pair		: 'cstm_idcd',
								clearable	: true ,
								popup		: {
									select	: 'SINGLE',
									widget	: 'lookup-cstm-popup',
									params	: { stor_grp : _global.stor_grp , sale_cstm_yorn :'1'},
									result	: function(records, nameField, pairField) {
										nameField.setValue(records[0].get('cstm_name'));
										pairField.setValue(records[0].get('cstm_idcd'));
									}
								}
							},{	name : 'cstm_idcd2', xtype : 'textfield' , hidden : true
							},{	fieldLabel	: Language.get('','합계구분'),
								xtype		: 'lookupfield',
								name		: 'chk',
								lookupValue	: [['1','소계'],['2','일계'],['3','월계'],['4', '합계']],
								multiSelect	: true ,
								editable	: false,
								labelWidth	: 72,
								width		: 220,
							}
						]
					},{	xtype : 'fieldset',
						layout: 'hbox',
						margin	: '3 40 5 40',
						items : [
							{	fieldLabel	: Language.get('item','입고기간'),
								xtype		: 'betweenfield',
								name		: 'fr_dt',
								pair		: 'to_dt',
								width		: 170,
								labelWidth	: 70,
								margin		: '0 0 0 2',
								root		: true,
								value		: ''
							},{	xtype		: 'betweenfield',
								fieldLabel	:'~',
								name		: 'to_dt',
								pair		: 'fr_dt',
								labelWidth	: 15,
								width		: 115,
								value		: ''
							},{	fieldLabel	: Language.get('cstm_name2', '매입처' ),
								width		: 285  ,
								labelWidth	: 72,
								name		: 'cstm_name2',
								pair		: 'cstm_idcd2',
								xtype		: 'popupfield',
								editable	: true,
								enableKeyEvents : true,
//								emptyText	: Const.infoNull.queryAll,
								clearable	: true,
								popup 		: {
									widget	: 'lookup-cstm-popup',
									select	: 'SINGLE',
									params	: { stor_id : _global.stor_id , puch_cstm_yorn : '1'},
									result	: function(records, nameField, pairField ){
										nameField.setValue(records[0].get('cstm_name'));
										pairField.setValue(records[0].get('cstm_idcd'));
									}
								}
							},{	xtype : 'textfield',  name : 'cstm_idcd' , hidden: true
							},
						]
					},{	xtype : 'fieldset',
						layout: 'hbox',
						margin	: '0 40 5 40',
						items : [
							{	name		: 'pcod_numb' ,
								xtype		: 'textfield' ,
								fieldLabel	: 'P/o No',
								width		: 285  ,
								labelWidth	: 70,
								margin		: '0 0 0 2',
								clearable	: true,
								readOnly	: false ,
								allowBlank	: true,
								emptyText	: Const.infoNull.queryAll
							},{	fieldLabel	: Language.get('prod_name','제품'),
								xtype		: 'popupfield',
								name		: 'prod_name',
								pair		: 'prod_idcd',
								width		: 285  ,
								labelWidth	: 72,
								clearable	: true,
								editable	: true,
								popup: {
									select : 'SINGLE',
									widget : 'lookup-prod-popup',
									params : { stor_grp : _global.stor_grp , line_stat : '0' },
									result : function(records, nameField, pairField) {
										nameField.setValue(records[0].get('prod_name'));
										pairField.setValue(records[0].get('prod_idcd'));
									}
								}
							},{	xtype : 'textfield',  name : 'prod_idcd' , hidden: true
							}
						]
					}
				]
			};
		return line;
	}
});