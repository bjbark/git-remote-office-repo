Ext.define('module.custom.hantop.item.itemset.view.ItemSetSearch', { extend: 'Axt.form.Search',

	alias: 'widget.module-itemset-search',
	initComponent: function(){
		var me = this;
			me.items = [ me.searchBasic(), me.createLine1()];
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
				items	:[
					{	xtype		: 'fieldset',
						border		: 3,
						flex		: 1,
						style		: { borderColor : '#000081', borderStyle : 'solid' },
						region		: 'center',
						height		: 34,
						margin 	: '3 0 0 0',
						defaults 	: { xtype: 'fieldset', layout: 'hbox', margin : '3 10  0', padding:'0', border: 0 },
						layout		: 'hbox',
						items		:[
							{	xtype		: 'label',
								fieldCls	: 'requiredindex',
								text		: 'SEARCH  | ',
								margin		: '5 10 0 0',
								style		: 'text-align:center;color: #0000B7;font-size: 13px !important;font-weight:bold;',
							},{	fieldLabel	: '계정구분',
								xtype		: 'lookupfield',
								name		: 'acct_dvcd',
								width		: 150,
								labelWidth	: 50,
//								value		: '1001',
								allowBlank	: false,
								fieldCls	: 'requiredindex',
								lookupValue	: resource.lookup('acct_dvcd'),
							},{	name		: 'find_name',
								xtype		: 'searchfield',
								flex		: 4	,
								emptyText	: '조회할 자재코드 또는 자재명을 입력하세요...',
								enableKeyEvents : true,
								listeners:{
									keydown : function(self, e) {
										if (e.keyCode == e.ENTER || e.keyCode == 9) {
											var searchButton = self.up('form').down('[action=selectAction]');
											searchButton.fireEvent('click', searchButton); //조회버튼클릭
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
				xtype		: 'fieldset',
				title		: '상세검색',
				collapsible : true,
				collapsed	: true,
				items		: [
					{	fieldLabel	: Language.get('brnd_bacd', '브랜드' ),
						name		: 'brnd_name',
						xtype		: 'popupfield',
						editable	: false,
						enableKeyEvents : true,
						clearable	: true,
						pair		: 'brnd_bacd',
						margin		: '0 0 0 50',
						clearable	: true ,
						popup: {
							select : 'SINGLE',
							widget : 'lookup-base-popup',
							params : { stor_grp : _global.stor_grp , line_stat : '0', prnt_idcd : '4000' },
							result : function(records, nameField, pairField) {
								nameField.setValue(records[0].get('base_name'));
								pairField.setValue(records[0].get('base_code'));
							}
						},
					},{ xtype	: 'textfield', name : 'brnd_bacd', hidden : true,
					}
				]
			}
		;
		return line;
	}
});