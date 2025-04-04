Ext.define('module.custom.sjflv.eis.userloglist.view.UserLogListSearch', { extend: 'Axt.form.Search',

	alias: 'widget.module-userloglist-search',
	initComponent: function(){
		var me = this;
			me.items = [ me.searchBasic(),me.createLine1() ];
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
				height : 40,
				margin	: '0 40 0 40',
				items	: [
					{	xtype		: 'fieldset',
						border		: 3,
						flex		: 1,
						style		: { borderColor	: '#000081', borderStyle	: 'solid' },
						region		: 'center',
						height		: 34,
						margin		: '3 0 0 0',
						defaults	: { xtype: 'fieldset', layout: 'hbox', margin : '3 10  0', padding:'0', border: 0 },
						layout		: 'hbox',
						items		: [
							{	xtype	: 'label',
								fieldCls: 'requiredindex',
								text	: 'SEARCH  | ',
								margin	: '5 10 0 0',
								style	: 'text-align:center;color: #0000B7;font-size: 13px !important;font-weight:bold;',
							},{	name			: 'find_name',
								xtype			: 'searchfield',
								flex			: 4,
								emptyText		: ' ',
								enableKeyEvents	: true,
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
					},
				]
			}
		;
		return line;
	},

	createLine1 : function() {
		var me = this,
			line = {
				xtype : 'fieldset',
				title : '상세검색',
				collapsible : true,
				collapsed	: false,
				items : [
					{	fieldLabel	: Language.get('','조회기간'),
						xtype		: 'betweenfield',
						name		: 'invc1_date',
						pair		: 'invc2_date',
						labelWidth	: 99,
						width		: 198,
						margin		: '0 0 0 2',
						root		: true,
						value		: Ext.Date.getFirstDateOfMonth(new Date()),
					},{	xtype		: 'betweenfield',
						fieldLabel	:'~',
						name		: 'invc2_date',
						pair		: 'invc1_date',
						labelWidth	: 15,
						width		: 115,
						value		: Ext.Date.getLastDateOfMonth(new Date()),
					},{	fieldLabel	: Language.get('', '사용자' ),
						name		: 'user_name',
						pair		: 'user_idcd',
						xtype		: 'popupfield',
						editable : true,
						enableKeyEvents : true,
						width		: 170,
						clearable	: true ,
						popup		: {
							widget	: 'lookup-user-popup',
							select	: 'SINGLE',
							params	: { stor_grp : _global.stor_grp, line_stat : '0' },
							result	: function(records, nameField, pairField ) {
								nameField.setValue(records[0].get('user_name'));
								pairField.setValue(records[0].get('user_idcd'));
							}
						}
					},{	name : 'user_idcd', xtype	: 'textfield', hidden : true
					},{	fieldLabel	: Language.get('', '메뉴명' ),
						xtype		: 'textfield',
						name		: 'menu_nm',
						width		: 250,
					}
				]
			}
		;
		return line;
	}
});