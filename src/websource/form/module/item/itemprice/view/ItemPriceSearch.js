Ext.define('module.item.itemprice.view.ItemPriceSearch', { extend: 'Axt.form.Search',

	alias: 'widget.module-itemprice-search',

	initComponent: function(){
		var me = this;
		me.items = [ me.searchBasic(), me.createLine1()];
		me.callParent();
	},
	searchBasic : function()
	{
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
					{	xtype		: 'fieldset',
						border		: 3,
						flex		: 1,
						style		: { borderColor	: '#000081', borderStyle	: 'solid' },
						region		: 'center',
						height		: 34,
						margin 	: '3 0 0 0',
						defaults 	: { xtype: 'fieldset', layout: 'hbox', margin : '3 10  0', padding:'0', border: 0 },
						layout		: 'hbox',
						items		:[
							{	xtype	: 'label',
								fieldCls: 'requiredindex',
								text	: 'SEARCH  | ',
								margin	: '5 10 0 0',
								style	: 'text-align:center;color: #0000B7;font-size: 13px !important;font-weight:bold;',
							},{ name	: 'find_name',
								xtype	: 'searchfield',
								flex	: 4,
								emptyText		: '조회할 품목코드 또는 품명을 입력하세요...',
								enableKeyEvents : true,
								listeners:{
									keydown : function(self, e) {
										if (e.keyCode == e.ENTER || e.keyCode == 9) {
											var searchButton = self.up('form').down('[action=selectAction]');
											searchButton.fireEvent('click', searchButton); //엔터or탭으로 조회
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
			};
		return line;
	},

	createLine1 : function(){
		var me = this,
			line = {
				xtype : 'fieldset'	,
				title : '상세검색',
				layout: 'vbox',
				collapsible : true	,
				collapsed	: false	,
				fieldDefaults	: { labelWidth : 100 },
				items : [
					{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '5 0 0 0',
						items	: [
							{	fieldLabel	: Language.get('acct_bacd','계정구분'),
								xtype		: 'popupfield',
								editable	: true,
								enableKeyEvents : true,
								name		: 'acct_bacd_name',
								pair		: 'acct_code',
								clearable	: true,
								width		: 290,
								popup		: {
									select	: 'SINGLE',
									widget	: 'lookup-base-popup',
									params	: { stor_grp : _global.stor_grp , line_stat : '0', prnt_idcd : '1102' },
									result	: function(records, nameField, pairField) {
										nameField.setValue(records[0].get('base_name'));
										pairField.setValue(records[0].get('base_code'));
									}
								},
								value		: '제품',
							},{	name		: 'acct_code', xtype : 'textfield' ,hidden : true, value : '3000'
							},{	fieldLabel	: Language.get('item','품목'),
								xtype		: 'popupfield',
								editable	: true,
								enableKeyEvents : true,
								name		: 'item_name',
								pair		: 'item_idcd',
								width		: 300,
								clearable	: true,
								popup		: {
									select  : 'SINGLE',
									widget  : 'lookup-item-popup-v4',
									params  : { stor_grp : _global.stor_grp , line_stat : '0' },
									result  : function(records, nameField, pairField) {
										nameField.setValue(records[0].get('item_name'));
										pairField.setValue(records[0].get('item_idcd'));
									}
								}
							},{	name		: 'item_idcd', xtype : 'textfield' , hidden : true
							},{	fieldLabel	: Language.get('line_stat','상태'),
								xtype		: 'lookupfield',
								name		: 'line_stat',
								labelWidth	:  60,
								width		: 140,
								lookupValue	: resource.lookup('search_all').concat( resource.lookup('line_stat' )),
								value		: ''
							},
						]
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '5 0 0 0',
						items	: [
							{	fieldLabel	: '품목분류'	,
								xtype		: 'popupfield',
								editable	: true,
								enableKeyEvents : true,
								width		: 730,
								name		: 'clss_desc',
								pair		: '',
								margin		: '0 5 0 0',
								clearable	: true ,
								popup		: {
									select	: 'SINGLE',
									widget	: 'lookup-item-clss-popup',
									params	: { stor_grp : _global.stor_grp , line_stat : '0' },
									result	: function(records, nameField, pairField) {
										nameField.setValue(records[0].get('clss_desc'));
										me.down('[name=lcls_idcd]').setValue(records[0].get('lcls_idcd'));
										me.down('[name=mcls_idcd]').setValue(records[0].get('mcls_idcd'));
										me.down('[name=scls_idcd]').setValue(records[0].get('scls_idcd'));
									}
								},
								listeners	: {
									change	: function(field, value){
										console.log(value);
										if(value == '' || value == null){
											me.down('[name=lcls_idcd]').setValue(null);
											me.down('[name=mcls_idcd]').setValue(null);
											me.down('[name=scls_idcd]').setValue(null);
										}
									}
								}
							},{	name		: 'lcls_idcd', xtype : 'textfield' , hidden : true
							},{	name		: 'mcls_idcd', xtype : 'textfield' , hidden : true
							},{	name		: 'scls_idcd', xtype : 'textfield' , hidden : true
							}
						]
					},
				]
			};
		return line;
	}

});