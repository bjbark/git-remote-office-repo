Ext.define('module.prod.cvic.cvicanal.view.CvicAnalSearch', { extend: 'Axt.form.Search',

	alias: 'widget.module-cvicanal-search',
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
						margin	: '3 0 0 0',
						defaults: { xtype: 'fieldset', layout: 'hbox', margin : '3 10  0', padding:'0', border: 0 },
						layout	: 'hbox',
						items	: [
							{	xtype		: 'label'			,
								fieldCls	: 'requiredindex'	,
								text		: 'SEARCH  | '		,
								margin		: '5 10 0 0'		,
								style		: 'text-align:center;color: #0000B7;font-size: 13px !important;font-weight:bold;',
							},{	name		: 'find_name'		,
								xtype		: 'searchfield'	,
								flex		: 4				,
								emptyText	: '조회할 설비코드 또는 설비명을 입력하세요...',
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
				xtype			: 'fieldset',
				layout			: 'vbox',
				defaults		: { xtype: 'fieldset', layout: 'vbox', margin : '0 0 5 0', padding: '0', border: 0 , },
				fieldDefaults	: { width: 341, labelWidth : 100, labelSeparator : '' },
				items			: [
					{	xtype	: 'fieldset', layout: 'hbox',
						items	: [
							{	fieldLabel	: Language.get('inqy_term','조회기간'),
								xtype		: 'betweenfield',
								name		: 'fr_dt',
								pair		: 'to_dt',
								labelWidth	: 99,
								width		: 193,
								root		: true
							},{	xtype		: 'betweenfield',
								fieldLabel	:'~',
								name		: 'to_dt',
								pair		: 'fr_dt',
								labelWidth	: 15,
								width		: 110
							}
	 					]
					}
				]
			};
		return line;
	}
});