Ext.define('module.custom.sjflv.oms.omsmast.view.SmplMastSearch', { extend: 'Axt.form.Search',

	alias: 'widget.module-sjflv-omsmast-search',
	initComponent: function(){
		var me = this;
		me.items = [ me.searchBasic(),me.addonSearch() ];
		me.callParent();
	},


	searchBasic : function(){
		var me = this,
			line = {
				 xtype	: 'fieldset'
				,border	: 0
				,style	: { borderColor : '#8C8C8C', borderStyle : 'solid' }
				,region	: 'center'
				,width	: '100%'
				,height : 40
				,margin	: '0 40 0 40'
				,items	:[
						{	xtype		: 'fieldset'
							,border		: 3
							,flex		: 1
							,style		: { borderColor	: '#000081', borderStyle	: 'solid' }
							,region		: 'center'
							,height		: 34
							,margin 	: '3 0 0 0'
							,defaults	: { xtype: 'fieldset', layout: 'hbox', margin : '3 10  0', padding:'0', border: 0 }
							,layout		: 'hbox'
							,items		:[
								{	xtype	: 'label',
									fieldCls: 'requiredindex',
									text	: 'SEARCH  | ',
									margin	: '5 10 0 0',
									style	: 'text-align:center;color: #0000B7;font-size: 13px !important;font-weight:bold;',
								},{	name	: 'find_name',
									xtype		: 'searchfield',
									flex		: 4,
									emptyText	: '조회할 코드 또는 코드명을 입력하세요...',
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
						},{	xtype	: 'button'  ,
								action : Const.SELECT.action,
								margin : '2 2 0 0',
								region : 'north' ,
								width : 40,
								height : 36,
								style	: 'background:url("../../../resource/img/btn_search_icon.png")'
						},{	xtype	: 'fieldset',
							border	: 0 ,
							region	: 'north',
							height  : 34,
							width	: 2
						},
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
				fieldDefaults	: { width : 341, labelWidth : 100, labelSeparator : '' },
				items			: [
					{	xtype : 'fieldset', layout: 'hbox',
						items : [
							{	fieldLabel	: Language.get('','접수일자'),
								xtype		: 'betweenfield',
								name		: 'invc1_date',
								pair		: 'invc2_date',
								labelWidth	: 99,
								width		: 198,
								margin		: '0 0 0 2',
								root		: true,
								value		: ''
							},{	xtype		: 'betweenfield',
								fieldLabel	:'~',
								name		: 'invc2_date',
								pair		: 'invc1_date',
								labelWidth	: 15,
								width		: 115,
								value		: ''
							},{	fieldLabel	: Language.get('item','품목'),
								xtype		: 'popupfield',
								editable	: true,
								enableKeyEvents : true,
								name		: 'item_name',
								width		: 250,
								pair		: 'item_idcd',
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
							},
						]
					},{	xtype : 'fieldset', layout: 'hbox',
						items : [
							{	fieldLabel	: Language.get('','납기일자'),
								xtype		: 'betweenfield',
								name		: 'deli1_date',
								pair		: 'deli2_date',
								labelWidth	: 99,
								width		: 198,
								margin		: '0 0 0 2',
								root		: true,
								value		: ''
							},{	xtype		: 'betweenfield',
								fieldLabel	:'~',
								name		: 'deli2_date',
								pair		: 'deli1_date',
								labelWidth	: 15,
								width		: 115,
								value		: ''
							}
						]
					},
				]
			};
		return line;
	}
});