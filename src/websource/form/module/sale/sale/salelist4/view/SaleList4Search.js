Ext.define('module.sale.sale.salelist4.view.SaleList4Search', { extend: 'Axt.form.Search',

	alias: 'widget.module-salelist4-search',

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
						margin	: '0 0 0 40',
						items	: [
							{	fieldLabel	: Language.get('','사업장'),
								xtype		: 'popupfield',
								editable	: true,
								enableKeyEvents : true,
								labelWidth	: 72,
								width		: 205,
								name		: 'bzpl_name',
								pair		: 'bzpl_idcd',
								clearable	: true ,
								popup		: {
									select	: 'SINGLE',
									widget	: 'lookup-bzpl-popup',
									params	: { stor_grp : _global.stor_grp , sale_cstm_yorn :'1'},
									result	: function(records, nameField, pairField) {
										nameField.setValue(records[0].get('bzpl_name'));
										pairField.setValue(records[0].get('bzpl_idcd'));
									}
								}
							},{	name : 'bzpl_idcd', xtype : 'textfield' , hidden : true
							},{	fieldLabel	: Language.get('','계산서일자'),
								xtype		: 'betweenfield',
								name		: 'invc_date1',
								pair		: 'invc_date2',
								labelWidth	: 70,
								width		: 170,
								margin		: '0 0 0 42',
								root		: true,
								value		: Ext.Date.getFirstDateOfMonth(new Date())
							},{	xtype		: 'betweenfield',
								fieldLabel	:'~',
								name		: 'invc_date2',
								pair		: 'invc_date1',
								labelWidth	: 15,
								width		: 115,
								value		: new Date()
							}
						]
					},{	xtype : 'fieldset',
						layout: 'hbox',
						margin	: '3 45 5 40',
						items : [
							{	fieldLabel	: Language.get('','납품처'),
								xtype		: 'popupfield',
								editable	: true,
								enableKeyEvents : true,
								labelWidth	: 72,
								width		: 205,
								name		: 'cstm_name',
								pair		: 'cstm_idcd',
								margin		: '2 0 0 0',
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
							},{	fieldLabel	: Language.get('','OEM납품처'),
								xtype		: 'popupfield',
								editable	: true,
								enableKeyEvents : true,
								labelWidth	: 72,
								width		: 172,
								name		: 'cstm_name',
								pair		: 'cstm_idcd',
								margin		: '2 0 0 40',
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
							}
						]
					},{	xtype : 'fieldset',
						layout: 'hbox',
						items : [
							{	fieldLabel	: Language.get('','영업담당'),
								xtype		: 'popupfield',
								editable	: true,
								enableKeyEvents : true,
								labelWidth	: 72,
								width		: 205,
								name		: 'drtr_name',
								pair		: 'drtr_idcd',
								margin		: '2 0 0 40',
								clearable	: true ,
								popup		: {
									select	: 'SINGLE',
									widget	: 'lookup-user-popup',
									params	: { stor_grp : _global.stor_grp , sale_cstm_yorn :'1'},
									result	: function(records, nameField, pairField) {
										nameField.setValue(records[0].get('user_name'));
										pairField.setValue(records[0].get('user_idcd'));
									}
								}
							},{	name : 'drtr_idcd', xtype : 'textfield' , hidden : true
							}
						]
					}
				]
			};
		return line;
	}
});