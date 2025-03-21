Ext.define('module.custom.komec.item.bommast.view.BomMastSearch', { extend: 'Axt.form.Search',
	alias: 'widget.module-komec-bommast-search',
	 initComponent: function(){
		var me = this;
		me.items = [me.searchBasic(),me.createLine1()];

		me.callParent();
	},
	searchBasic : function(){
		var me = this,
			line = {
				xtype	: 'fieldset'
				,border	: 0
				,style	: { borderColor	: '#8C8C8C', borderStyle	: 'solid' }
				,region	: 'center'
				,width	: '100%'
				,height	: 40
				,margin	: '0 40 0 40'
				,items	: [
					{	xtype	: 'fieldset'
						,border	: 3
						,flex	: 1
						,style	: { borderColor	: '#263c63', borderStyle	: 'solid' }
						,region	: 'center'
						,height	: 34
						,margin : '3 0 0 0'
						,defaults 	: { xtype: 'fieldset', layout: 'hbox', margin : '3 10  0', padding:'0', border: 0 }
						,layout	: 'hbox'
						,items	: [
							{	xtype	: 'label',
								text	: 'SEARCH  | ',
								margin	: '7 10 0 0',
								style	: 'text-align:center;color: #263c63;font-size: 13px !important;font-weight:bold;',
							}
//							,{	fieldLabel	: '계정구분',
//								xtype		: 'popupfield',
//								name		: 'acct_name',
//								pair		: 'acct_bacd',
//								xtype		: 'popupfield',
//								editable	: true,
//								enableKeyEvents : true,
//								clearable	: true,
//								width		: 130,
//								labelWidth	: 50,
//								value		: '제품',
//								popup		: {
//									select	: 'SINGLE',
//									widget	: 'lookup-base-popup',
//									params	: { stor_grp : _global.stor_grp , line_stat : '0', prnt_idcd : '1102',base_like:'BOM' },
//									result	: function(records, nameField, pairField) {
//										nameField.setValue(records[0].get('base_name'));
//										pairField.setValue(records[0].get('base_code'));
//									}
//								},
//							},{	name		: 'acct_bacd', xtype : 'textfield' , hidden : true, value		: '3000',
//							}
							,{	name	: 'find_name'     ,
								xtype	: 'searchfield',
								flex	: 4,
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
	createLine1 : function(){
		var me = this,
			line = {
				xtype : 'fieldset'	,
				title : '상세검색',
				layout: 'vbox',
				hidden	: true,
				collapsible	: true,
				collapsed  : false,
				fieldDefaults	: { labelWidth : 100 },
				items : [
					{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '5 0 0 0',
						items	: [
						{	fieldLabel	: '계정구분',
							xtype		: 'popupfield',
							name		: 'acct_name',
							pair		: 'acct_bacd',
							xtype		: 'popupfield',
							editable	: true,
							enableKeyEvents : true,
							clearable	: true,
							width		: 180,
							labelWidth	: 50,
							margin		: '0 0 0 50',
							value		: '제품',
							popup		: {
								select	: 'SINGLE',
								widget	: 'lookup-base-popup',
								params	: { stor_grp : _global.stor_grp , line_stat : '0', prnt_idcd : '1102',base_like:'BOM' },
								result	: function(records, nameField, pairField) {
									nameField.setValue(records[0].get('base_name'));
									pairField.setValue(records[0].get('base_code'));
								}
							},
							},{	name		: 'acct_bacd', xtype : 'textfield' , hidden : true, value		: '3000',
							}
						]
					}
				]
			};
		return line;
	}
});