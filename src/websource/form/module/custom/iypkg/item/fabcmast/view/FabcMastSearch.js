Ext.define('module.custom.iypkg.item.fabcmast.view.FabcMastSearch', { extend: 'Axt.form.Search',

	alias: 'widget.module-fabcmast-search',
	initComponent: function(){
		var me = this;
		me.items = [
			me.searchBasic(),
			me.createLine1()
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
								emptyText	: '조회할 원단코드 또는 원단명을 입력하세요...',
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

	createLine1 : function() {
		var line = {
			xtype		: 'fieldset',
			title		: '상세검색',
			collapsible	: true,
			collapsed	: true,
			items		: [
				{	fieldLabel	: Language.get('line_stat','상태'),
					xtype		: 'lookupfield',
					name		: 'line_stat',
					editable	: false,
					lookupValue	: resource.getList('search_all').concat( resource.getList('line_stat')),
					value		: '0',
					labelWidth	: 90,
					width		: 180
				},{	fieldLabel	: Language.get('ppln_dvcd','골'),
					xtype		: 'lookupfield',
					name		: 'ppln_dvcd',
					editable	: false,
					lookupValue	: resource.getList('search_all').concat(resource.lookup('line_dvcd')),
					value		: '',
					labelWidth	: 90,
					width		: 180
				},{	fieldLabel	: Language.get('ppkd_dvcd','종별'),
					xtype		: 'lookupfield',
					name		: 'ppkd_dvcd',
					editable	: false,
					lookupValue	: resource.getList('search_all').concat(resource.lookup('ppkd_dvcd')),
					value		: '',
					labelWidth	: 90,
					width		: 180
				}
			]
		};
		return line;
	},

});