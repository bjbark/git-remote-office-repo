Ext.define('module.qc.basic.insptype.view.InspTypeSearch', { extend: 'Axt.form.Search',

	alias: 'widget.module-insptype-search',
	initComponent: function(){
		var me = this;
		me.items = [ me.searchBasic(),me.createLine1() ];
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

	createLine1 : function(){
		var me = this,
			line = {
				xtype : 'fieldset'	,
				title : '상세검색',
				collapsible : true	,
				collapsed	: false,
				 items : [
					{	fieldLabel	: Language.get('crte_dttm','등록일자'),
						xtype		: 'betweenfield',
						name		: 'fr_date'	,
						pair		: 're_date',
						width		: 200,
						labelWidth	: 100,
						root		: true,
						format		: Const.DATE_FORMAT_YMD_BAR,
						submitFormat: Const.DATE_FORMAT_YMD,
						value		: '',
					},{	labelWidth	: '20px',
						fieldLabel	: Language.get('',' ~ '),
						xtype		: 'betweenfield',
						name		: 're_date'	,
						pair		: 'fr_date',
						width		: 115,
						format		: Const.DATE_FORMAT_YMD_BAR,
						submitFormat: Const.DATE_FORMAT_YMD,
						value		: '',
					},{	fieldLabel	: '상태'	,
						xtype		: 'lookupfield',
						name		: 'line_stat',
						value		: '',
						width		: 150,
						lookupValue	: resource.lookup('search_all').concat( resource.lookup('line_stat' ) )	,
					}
				]
			}
		;
		return line;
	}

});