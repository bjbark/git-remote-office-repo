Ext.define('module.sale.project.prjtmast.view.PrjtMastSearch', { extend: 'Axt.form.Search',

	alias: 'widget.module-prjtmast-search',

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
								emptyText		: '조회할 프로젝트 코드 또는 프로젝트명을 입력하세요...',
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
				collapsed	: true	,
				items : [
					{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '5 0 0 0',
						items	: [
							{	fieldLabel	: '등록일자',
								xtype		: 'betweenfield',
								name		: 'fr_dt',
								pair		: 'to_dt',
								width		: 180,
								root		: true,
								value		: Ext.Date.add( new Date(), Ext.Date.DAY, -30),
							},{	fieldLabel	: '~',
								xtype		: 'betweenfield',
								name		: 'to_dt',
								pair		: 'fr_dt',
								width		: 130,
								labelWidth	: 17,
								value		: Ext.Date.add( new Date(), Ext.Date.DAY, +0),
							},{	fieldLabel	: Language.get('sale_drtr','영업담당'),
								xtype		: 'popupfield',
								editable	: true,
								enableKeyEvents : true,
								name		: 'drtr_idcd',
								width		: 250,
								pair		: 'user_idcd',
								clearable	: true,
								popup: {
									select	: 'SINGLE',
									widget	: 'lookup-user-popup',
									params	: { stor_grp : _global.stor_grp , line_stat : '0' },
									result	: function(records, nameField, pairField) {
										nameField.setValue(records[0].get('user_name'));
										pairField.setValue(records[0].get('user_idcd'));
									}
								}
							},{	name : 'drtr_idcd', xtype : 'textfield' , hidden : true
							},{	name : 'user_idcd', xtype : 'textfield' , hidden : true
							},{	fieldLabel	: Language.get('line_clos','마감상태'),
								xtype		: 'lookupfield',
								name		: 'line_clos',
								lookupValue	: resource.lookup('line_clos'),
								width		: 160
							}
	 					]
					},{	xtype : 'fieldset', layout: 'hbox',border : 0 , padding : '0',margin : '5 0 0 0',
						items : [
							{	fieldLabel	: Language.get('item','품목'),
								xtype		: 'popupfield',
								editable	: true,
								enableKeyEvents : true,
								name		: 'item_name',
								width		: 310,
								pair		: 'item_idcd',
								clearable	: true,
								popup		: {
									select	: 'SINGLE',
									widget	: 'lookup-item-popup',
									result	: function(records, nameField, pairField) {
										nameField.setValue(records[0].get('item_name'));
										pairField.setValue(records[0].get('item_idcd'));
									}
								}
							},{	name : 'item_idcd', xtype : 'textfield' , hidden : true
							},{	fieldLabel	: Language.get('cstm','거래처'),
								xtype		: 'popupfield',
								editable	: true,
								enableKeyEvents : true,
								name		: 'cstm_name',
								width		: 250,
								pair		: 'cstm_idcd',
								clearable	: true,
								popup		: {
									select	: 'SINGLE',
									widget	: 'lookup-cstm-popup',
									params	: { stor_grp : _global.stor_grp , line_stat : '0' },
									result	: function(records, nameField, pairField) {
										nameField.setValue(records[0].get('cstm_name'));
										pairField.setValue(records[0].get('cstm_idcd'));
									}
								}
							},{	name		: 'cstm_idcd', xtype : 'textfield' , hidden : true
						}
					]
				}
			]
		};
		return line;
	}
});