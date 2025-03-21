Ext.define('module.project.codeinfo.view.CodeInfoSearch', { extend: 'Axt.form.Search',

	alias: 'widget.module-codeinfo-search',
	initComponent: function(){
		var me = this;
		me.items = [ me.searchBasic(),me.createLine1() ];
		me.callParent();
	},

	/**
	 * 라인1
	 */
	searchBasic : function(){
		var me = this,
			line = {
				xtype	: 'fieldset'
				,border	: 0
				,style	: { borderColor	: '#8C8C8C', borderStyle	: 'solid' }
		 		,region	: 'center'
				,width	: '100%'
				,height	: 40
				,margin	: '0 40 0 40'
				,items	: [
					{	xtype		: 'fieldset'
						,border		: 3
						,flex		: 1
						,style		: { borderColor	: '#263c63', borderStyle	: 'solid' }
						,region		: 'center'
						,height		: 34
						,margin 	: '3 0 0 0'
						,defaults 	: { xtype: 'fieldset', layout: 'hbox', margin : '3 10  0', padding:'0', border: 0 }
						,layout		: 'hbox'
						,items		: [
							{   xtype		: 'label',
							    text		: 'SEARCH  | ',
							    margin		: '7 10 0 0',
								style		: 'text-align:center;color: #263c63;font-size: 13px !important;font-weight:bold;',
							},{	name		: 'find_nm'     ,
								xtype		: 'searchfield',
								flex		: 4,
								emptyText	: '코드명 또는 코드를 입력하세요....',
								enableKeyEvents : true,
								listeners:{
									keydown : function(self, e) {
										if (e.keyCode == e.ENTER || e.keyCode == 9) {
											var searchButton = self.up('form').down('[action=selectAction]'); /* 조회버튼 위치 */
											searchButton.fireEvent('click', searchButton); /* 조회버튼 Click */
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
			}
		;
		return line;
	},

	createLine1 : function(){
		var me = this,
			line = {
				xtype : 'fieldset',
				collapsible : true,
				collapsed	: false,
				items : [
					{	fieldLabel		: '사이트'         ,
						name			: 'site_id'      ,
						xtype			: 'lookupfield'  ,
						editable		: false,
						autoSelection	: true ,
						lookupValue		: [['system','판매관리'],['control','관제'], ['hr','인사관리']]
					},{	fieldLabel		: '사용여부',
						xtype			: 'lookupfield',
						name			: 'row_sts',
						editable		: false,
						lookupValue		: resource.lookup('search_all').concat( resource.lookup('row_sts' ) ) ,
						value			: '0'
					},{ fieldLabel		: '언어구분',
						xtype			: 'lookupfield',
						name			: 'lang_gbcd'  ,
						lookupValue		: resource.lookup('search_all').concat(resource.lookup('lang_gbcd')),
						value			: ''
					}
				]
			}
		;
		return line;
	}


});



