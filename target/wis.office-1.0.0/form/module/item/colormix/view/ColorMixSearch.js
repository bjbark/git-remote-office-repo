Ext.define('module.item.colormix.view.ColorMixSearch', { extend: 'Axt.form.Search',

	alias: 'widget.module-colormix-search',

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
						margin		: '3 0 0 0',
						defaults 	: { xtype: 'fieldset', layout: 'hbox', margin : '3 10 0 0', padding:'0', border: 0 },
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
				items : [
					{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,
						items	: [
							{	fieldLabel	: Language.get('dwup_date','작성일자'),
								xtype		: 'betweenfield',
								name		: 'dwup_date1',
								pair		: 'dwup_date2',
								width		: 195,
								labelWidth	: 100,
								value		: ''
							},{	fieldLabel	: Language.get('','~'),
								xtype		: 'betweenfield',
								name		: 'dwup_date2',
								pair		: 'dwup_date1',
								width		: 115,
								labelWidth : 17,
								value		: ''
							},{	fieldLabel	: Language.get('item','품목'),
								xtype		: 'popupfield',
								editable	: true,
								enableKeyEvents : true,
								clearable	: true,
								name		: 'prnt_item_name',
								labelWidth	: 99,
								width		: 295,
								pair		: 'prnt_item_idcd',
								popup		: {
									select	: 'SINGLE',
									widget	: 'lookup-item-popup',
									params	: { stor_grp : _global.stor_grp , line_stat : '0' },
									result	: function(records, nameField, pairField) {
										nameField.setValue(records[0].get('item_name'));
										pairField.setValue(records[0].get('item_idcd'));
									}
								}
							},{	name : 'prnt_item_idcd', xtype : 'textfield' , hidden : true
							},{	xtype		: 'checkbox',
								boxLabel	: '1kg 배합기준',
								name		: 'kg',
								checked		: true,
								style		: { color: 'Black'},
								margin		: '0 0 0 45'
							}
						]
					}
				]
			};
			return line;
		}
});