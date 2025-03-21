Ext.define('module.custom.hantop.prod.order.prodorder2.view.ProdOrder2Search', { extend: 'Axt.form.Search',

	alias: 'widget.module-prodorder2-search',


	initComponent: function(){
		var me = this;
		me.items = [
			me.searchBasic(),
			me.addonSearch()
		];
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
					{	xtype	: 'fieldset',
						border	: 3,
						flex	: 1,
						style	: { borderColor	: '#000081', borderStyle	: 'solid' },
						region	: 'center',
						height	: 34,
						margin 	: '3 0 0 0',
						defaults: { xtype: 'fieldset', layout: 'hbox', margin : '3 10  0', padding:'0', border: 0 },
						layout	: 'hbox',
						items	: [
							{	xtype	: 'label'			,
								fieldCls: 'requiredindex'	,
								text	: 'SEARCH  | '		,
								margin	: '5 10 0 0'		,
								style	: 'text-align:center;color: #0000B7;font-size: 13px !important;font-weight:bold;',
							},{	name	: 'find_name'		,
								xtype		: 'searchfield'	,
								flex		: 4				,
								emptyText	: '조회할 계획일자 또는 계획번호를 입력하세요...',
								enableKeyEvents : true			,
								listeners:{
									keydown : function(self, e) {
										if (e.keyCode == e.ENTER || e.keyCode == 9) {
											var searchButton = self.up('form').down('[action=selectAction]');
											searchButton.fireEvent('click', searchButton); //조회버튼클릭
										}
									}
								}
							}
						]
					},{	xtype	: 'button'  ,action : Const.SELECT.action, margin : '2 2 0 0',region : 'north' , width : 40, height : 36,
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
				xtype		: 'fieldset',
				border		: 0,
				title		: '상세검색',
				collapsible		: true,
				collapsed		: false,
				region		: 'center',
				width		: '100%',
				defaults	: { xtype: 'fieldset', layout: 'vbox', margin : '0 0 0 0', padding: '0', border: 0 , },
				fieldDefaults	: { width : 341, labelWidth : 80, labelSeparator : '' },
				items		: [
					{	xtype : 'fieldset', layout: 'vbox', border : 0,
						items : [
							{	xtype : 'fieldset', layout: 'hbox', border : 0, margin : '0 0 5 0',
								items : [
								{	fieldLabel	: Language.get('esti_date','계획일자'),
									xtype		: 'betweenfield',
									name		: 'plan_date1',
									pair		: 'plan_date2',
									labelWidth	: 99,
									width		: 198,
									margin		: '0 0 0 2',
									root		: true,
									value		: Ext.Date.getFirstDateOfMonth(new Date())
								},{	xtype		: 'betweenfield',
									fieldLabel	:'~',
									name		: 'plan_date2',
									pair		: 'plan_date1',
									labelWidth	: 15,
									width		: 115,
									value		: new Date()
								},{	fieldLabel	: Language.get('line_stat','상태'),
									xtype		: 'lookupfield',
									lookupValue	: resource.lookup('line_stat'),
									editable	: false,
									enableKeyEvents : true,
									name		: 'line_stat',
									width		: 200
								},{	xtype		: 'checkbox',
									boxLabel	: '확정내역표시',
									itemId		: 'cofm_chk',
									name		: 'chk',
									checked		: false,
									style		: { color : 'blue' },
									margin		: '0 0 0 20',
								}
				 			]
						},{	xtype : 'fieldset', layout: 'hbox', border : 0, margin : '0 0 5 0',
							items : [

							]
						}
					]
				}
			]
		};
		return line;
	}
});