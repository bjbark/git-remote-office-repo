Ext.define('module.custom.sjflv.stock.isos.hdlidlvymast.view.HdliDlvyMastSearch', { extend: 'Axt.form.Search',

	alias: 'widget.module-hdlidlvymast-search',
	initComponent: function(){
		var me = this;
		me.items = [ me.searchBasic(),me.addonSearch()];
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
							margin 	: '3 0 0 0',
							defaults 	: { xtype: 'fieldset', layout: 'hbox', margin : '3 10  0', padding:'0', border: 0 },
							layout		: 'hbox',
							items		:[
								{	xtype		: 'label'			,
									fieldCls	: 'requiredindex'	,
									text		: 'SEARCH  | '		,
									margin		: '5 10 0 0'		,
									style		: 'text-align:center;color: #0000B7;font-size: 13px !important;font-weight:bold;',
								},{	name		: 'find_name'		,
									xtype		: 'searchfield'		,
									flex		: 4					,
									emptyText	: '',
									enableKeyEvents : true			,
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
			};
		return line;
	},

	addonSearch : function(){
		var me = this,
			line = {
				xtype			: 'fieldset',
				title			: '상세검색',
				collapsible		: true,
				collapsed		: false,
				layout			: 'vbox',
				defaults		: { xtype: 'fieldset', layout: 'vbox', margin : '0 0 5 0', padding: '0', border: 0 , },
				fieldDefaults	: { width : 341, labelWidth : 100, labelSeparator : '' },
				items			: [
					{	xtype : 'fieldset', layout: 'hbox',
						items : [
							{	fieldLabel	: Language.get('','출고일자'),
								xtype		: 'betweenfield',
								name		: 'invc_date1',
								pair		: 'invc_date2',
								root		: true,
								width		: 198,
								labelWidth	: 100,
								format		: Const.DATE_FORMAT_YMD_BAR,
								submitFormat: Const.DATE_FORMAT_YMD,
								value		: Ext.Date.getFirstDateOfMonth(new Date())
							},{	fieldLabel	: Language.get('','~'),
								xtype		: 'betweenfield',
								name		: 'invc_date2',
								pair		: 'invc_date1',
								width		: 116,
								labelWidth	: 19,
								format		: Const.DATE_FORMAT_YMD_BAR,
								submitFormat: Const.DATE_FORMAT_YMD,
								value		: new Date()
							},{	fieldLabel	: Language.get('dlvy_dinv_numb', '운송장번호' ),
								name		: 'dlvy_dinv_numb',
								xtype		: 'textfield',
								allowBlank	: true,
								width		: 300,
							},{	fieldLabel	: Language.get('dlvy_rcpt_hmlf', '수화인명' ),
								name		: 'dlvy_rcpt_hmlf',
								xtype		: 'textfield',
								allowBlank	: true,
								width		: 300,
							},{	fieldLabel	: Language.get('dlvy_brch_name', '배송지점명' ),
								name		: 'dlvy_brch_name',
								xtype		: 'textfield',
								allowBlank	: true,
								width		: 300,
							}
						]
					}
				]
			};
		return line;
	},
});