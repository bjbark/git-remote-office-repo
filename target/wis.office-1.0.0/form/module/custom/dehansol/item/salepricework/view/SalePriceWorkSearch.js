Ext.define('module.custom.dehansol.item.salepricework.view.SalePriceWorkSearch', { extend: 'Axt.form.Search',

	alias: 'widget.module-salepricework-search',

	initComponent: function(){
		var me = this;
		me.items = [ me.searchBasic() , me.addonSearch()];
		me.callParent();
	},

	searchBasic : function() {
		var me = this,
			line =
				{	xtype	: 'fieldset',
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
							margin		: '3 0 0 0',
							defaults 	: { xtype: 'fieldset', layout: 'hbox', margin : '3 10  0', padding:'0', border: 0 },
							layout		: 'hbox',
							items		: [
								{	xtype		: 'label',
									fieldCls	: 'requiredindex',
									text		: 'SEARCH  | ',
									margin		: '5 10 0 0',
									style		: 'text-align:center;color: #0000B7;font-size: 13px !important;font-weight:bold;',
								},{	name		: 'find_name',
									xtype		: 'searchfield',
									flex		: 4,
									emptyText	: '조회할 공정코드 또는 공정명을 입력하세요...',
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
					},{	xtype	: 'button'  ,action : Const.SELECT.action, margin : '2 2 0 0',region : 'north' , width : 40, height : 36,
						style	: 'background:url("../../../resource/img/btn_search_icon.png")'
					},{	xtype	: 'fieldset',border	: 0 ,region	: 'north',height  : 34, width	: 2
					}
					]
				}
		;
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
				fieldDefaults	: { width : 341, labelWidth : 100, labelSeparator : '' },
				items			: [
					{	xtype : 'fieldset', layout: 'hbox',
						items : [
							{	fieldLabel	: Language.get('','등록일자'),
								xtype		: 'betweenfield',
								name		: 'invc_date1',
								pair		: 'invc_date2',
								width		: 198,
								labelWidth	: 100,
								root		: true,
								format		: Const.DATE_FORMAT_YMD_BAR,
								submitFormat: Const.DATE_FORMAT_YMD,
								value		: '',
								clearable	: true
							},{	fieldLabel	: Language.get('','~'),
								xtype		: 'betweenfield',
								name		: 'invc_date2',
								pair		: 'invc_date1',
								width		: 116,
								labelWidth	: 19,
								format		: Const.DATE_FORMAT_YMD_BAR,
								submitFormat: Const.DATE_FORMAT_YMD,
								value		: '',
								clearable	: true
							},{	fieldLabel	: Language.get('cstm_name','거래처명'),
								xtype		: 'popupfield',
								editable	: true,
								enableKeyEvents : true,
								name		: 'cstm_name',
								labelWidth	: 98,
								width		: 280,
								pair		: 'cstm_idcd',
								editable	: true ,
								clearable	: true,
								margin		: '0 0 0 0',
								popup: {
									select : 'SINGLE',
									widget : 'lookup-cstm-popup',
									params : { stor_grp : _global.stor_grp , line_stat : '0',sale_cstm_yorn : '1'  },
									result : function(records, nameField, pairField) {
										nameField.setValue(records[0].get('cstm_name'));
										pairField.setValue(records[0].get('cstm_idcd'));
									}
								}
							},{	name : 'cstm_idcd', xtype	: 'textfield', hidden : true
							},{	fieldLabel	: Language.get('item_make_dvcd','제판종류'),
								name		: 'item_make_dvcd',
								xtype		: 'lookupfield',
								labelWidth	: 80,
								width		: 190,
								lookupValue	: resource.lookup('item_make_dvcd')
							},{	fieldLabel	: Language.get('item_type_dvcd','필름유제'),
								xtype		: 'lookupfield',
								name		: 'item_type_dvcd',
								editable	: true,
								labelWidth	: 80,
								width		: 190,
								lookupValue	: resource.lookup('item_type_dvcd')
							}
						]
					}
				]
			};
		return line;
	}
});