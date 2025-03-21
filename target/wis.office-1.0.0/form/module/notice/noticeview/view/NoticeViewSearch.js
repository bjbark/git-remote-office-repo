Ext.define('module.notice.noticeview.view.NoticeViewSearch', { extend: 'Axt.form.Search',

	alias: 'widget.module-noticeview-search',
	initComponent: function(){
		var me = this;
		me.items = [ me.searchBasic() , me.addonSearch()];
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
							margin		: '3 0 0 0',
							defaults 	: { xtype: 'fieldset', layout: 'hbox', margin : '3 10  0', padding:'0', border: 0 },
							layout		: 'hbox',
							items		: [
								{	xtype		: 'label',
									fieldCls	: 'requiredindex',
									text		: 'SEARCH  | ',
									margin		: '5 10 0 0',
									style		: 'text-align:center;color: #0000B7;font-size: 13px !important;font-weight:bold;',
								},{	name		: 'find_name',
									xtype		: 'searchfield',
									flex		: 4,
									emptyText	: '조회할 작성사원명 또는 공지사항제목을 입력하세요...',
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
			xtype		: 'fieldset',
			title		: '상세검색',
			collapsible : true,
			collapsed	: true,
			layout		: 'vbox',
			defaults	: { xtype: 'fieldset', layout: 'vbox', margin : '0 0 5 0', padding: '0', border: 0 },
			fieldDefaults: { width: 341, labelWidth : 100, labelSeparator : '' },
			items		: [
				{	xtype : 'fieldset',
					layout: 'hbox',
					items : [
						{	fieldLabel	: Language.get('plan_dt','공지기간'),
							xtype		: 'betweenfield',
							name		: 'fr_dt',
							pair		: 'to_dt',
							width		: 230,
							margin		: '0 0 0 2',
							labelWidth	: 130,
							root		: true,
							value		: ''
//							value		: Ext.Date.add( new Date(), Ext.Date.DAY, -30),
						},{	fieldLabel	: Language.get('','~'),
							xtype		: 'betweenfield',
							name		: 'to_dt',
							pair		: 'fr_dt',
							width		: 115,
							labelWidth	: 15,
							value		: ''
						},{	fieldLabel	: '연락여부',
							xtype		: 'lookupfield',
							name		: 'emgc_yorn',
							lookupValue	: resource.lookup('search_all').concat( resource.lookup( 'yorn' )),
							width		: 130,
							labelWidth	: 50
						}
					]
				}
			]
		};
	return line;
	}
});