Ext.define('module.user.wkrnmast.view.RankInfoSearch', { extend: 'Axt.form.Search' ,


	alias: 'widget.module-wkrnmast-search',

	/**
	 * 콤포넌트 초기화 이벤트
	 */
	initComponent: function(){
		var me = this;
		me.items = [ me.searchBasic(), me.addonSearch() ];
		me.callParent();
	},
	searchBasic : function(){
		var me = this,
			line = {
				xtype	: 'fieldset',
				border	: 0,
				style	: { borderColor	: '#8C8C8C', borderStyle	: 'solid'
				},
				region	: 'center',
				width	: '100%',
				height  : 40,
				margin	: '0 40 0 40',
				items	: [
					{	xtype	: 'fieldset',
						border	: 3,
						flex	: 1,
						style	: { borderColor	: '#263c63', borderStyle	: 'solid'
						},
						region	: 'center',
						height	: 34,
						margin	: '3 3 3 0',
						layout	: 'hbox',
						items	: [
							{	xtype	: 'label',
								text	: 'SEARCH  | ',
								margin	: '7 10 0 0',
								cls		: 'my-label-style',
							},{	name	: 'find_name',
								xtype	: 'searchfield',
								margin	: '3 10 0 0',
								flex	: 1,
								emptyText: '검색할 직급명을 입력하세요...',
								enableKeyEvents : true,
								listeners:{
									keydown : function(self, e) {
										if (e.keyCode == e.ENTER || e.keyCode == 9) {
											var searchButton = self.up('form').down('[action=selectAction]'); /* 조회버튼 위치 */
											searchButton.fireEvent('click', searchButton); /* 조회버튼 Click */
										}
									}
								}
							}
						]
					},{	xtype	: 'button'  ,action : Const.SELECT.action , cls: 'search-button', margin : '3 0 0 0',region : 'north' , tooltip : 'Data Select'
					},{	xtype	: 'fieldset',border	: 0 ,region	: 'north',height  : 34, width	: 2
					}
				]
			}
		;
		return line;
	},

	addonSearch : function(){
		var line =
		{
			xtype		: 'fieldset',
			collapsible	: true,
			collapsed	: true,
			layout		: 'vbox', //,
			title		: '상세검색',
			defaults	: { xtype: 'fieldset', layout: 'hbox', margin : '0 0 7 10', padding:'0', border: 0 },
			items		: [
				{	xtype : 'fieldset',
					items : [
						{	fieldLabel  : '사용여부',
							xtype       : 'lookupfield',
							name        : 'line_stat',
							editable    : false,
							width       : 149,
							lookupValue : resource.lookup('search_all').concat( resource.lookup('line_stat' ) ) ,  // [ ['0','사용'    ] , ['1','사용안 함'] ]
							value       : '0'
						}
					]
				}
			]
		};
		return line;
	}
});