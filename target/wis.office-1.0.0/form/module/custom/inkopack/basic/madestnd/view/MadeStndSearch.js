Ext.define('module.custom.inkopack.basic.madestnd.view.MadeStndSearch', { extend: 'Axt.form.Search',

	alias: 'widget.module-madestnd-search',

	initComponent: function(){
		var me = this;
		me.items = [ me.searchBasic(), me.addonSearch()];
		me.callParent();
	},
	searchBasic : function()
	{
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
								emptyText		: '조회할 품목코드 또는 품명을 입력하세요...',
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

	addonSearch : function(){
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
							{	fieldLabel	: Language.get('st_dt','등록기간'),
								xtype		: 'betweenfield',
								name		: 'st_dt',
								pair		: 'ed_dt',
								root		: true,
								width		: 180,
								value		: Ext.Date.add( new Date(), Ext.Date.DAY, -14),
								format		: Const.DATE_FORMAT_YMD_BAR,
								submitFormat: Const.DATE_FORMAT_YMD,
							},{	fieldLabel	: Language.get('','~'),
								xtype		: 'betweenfield',
								name		: 'ed_dt',
								pair		: 'st_dt',
								width		: 130,
								labelWidth	: 17,
								format		: Const.DATE_FORMAT_YMD_BAR,
								submitFormat: Const.DATE_FORMAT_YMD
							},
//							{	xtype		: 'checkbox',
//								boxLabel	: '신규 등록 품목만 표시',
//								name		: 'chk',
//								checked		: false,
//								style		: { color : 'blue' },
//								margin		: '0 0 0 20',
//								hidden		: false
//							}
						]
					}
				]
			};
		return line;
	}
});