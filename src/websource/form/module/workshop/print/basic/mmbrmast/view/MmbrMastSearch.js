Ext.define('module.workshop.print.basic.mmbrmast.view.MmbrMastSearch', { extend: 'Axt.form.Search',

	alias: 'widget.module-mmbrmast-search',

	initComponent: function(){
		var me = this;
		me.items = [ me.searchBasic(), me.createLine1()];
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

	createLine1 : function(){
		var me = this,
		line = {
			xtype : 'fieldset'	,
			title : '상세검색',
			layout: 'vbox',
			collapsible : true	,
			collapsed	: false	,
			fieldDefaults	: { labelWidth : 100 },
			items : [
				{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '5 0 0 0',
					items	: [
						{	fieldLabel	: Language.get('entr_dvcd','가입구분'),
							xtype		: 'lookupfield',
							name		: 'entr_dvcd',
							labelWidth	:  60,
							width		: 180,
							lookupValue	: resource.getList('search_all').concat( resource.getList('entr_dvcd' ) ) ,
							value		: '',
							margin		: '0 0 0 30'
						},{	fieldLabel	: Language.get('mmbr_stat_dvcd','회원상태'),
							xtype		: 'lookupfield',
							name		: 'mmbr_stat_dvcd',
							labelWidth	:  60,
							width		: 180,
							lookupValue	: resource.getList('search_all').concat( resource.getList('mmbr_stat_dvcd' ) ) ,
							value		: '2000',
							margin		: '0 0 0 30'
						},{	fieldLabel	: Language.get('entr_date','가입기간'),
							xtype		: 'betweenfield',
							name		: 'invc_date1',
							pair		: 'invc_date2',
							width		: 198,
							labelWidth	: 100,
							root		: true,
							format		: Const.DATE_FORMAT_YMD_BAR,
							submitFormat: Const.DATE_FORMAT_YMD,
							value		: "",
//							value		: new Date(),
							clearable	: true
						},{	fieldLabel	: Language.get('','~'),
							xtype		: 'betweenfield',
							name		: 'invc_date2',
							pair		: 'invc_date1',
							width		: 116,
							labelWidth	: 19,
							format		: Const.DATE_FORMAT_YMD_BAR,
							submitFormat: Const.DATE_FORMAT_YMD,
							value		: "",
//							value		: new Date(),
							clearable	: true
						}
					]
				},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '5 0 0 0',
					items	: [
						{	fieldLabel	: Language.get('regi_dvcd','등록구분'),
							xtype		: 'lookupfield',
							name		: 'regi_dvcd',
							labelWidth	:  60,
							width		: 180,
							lookupValue	: resource.getList('search_all').concat( resource.getList('regi_dvcd' ) ) ,
							value		: '',
							margin		: '0 0 0 30'
						},{	fieldLabel	: Language.get('mmbr_dvcd','법인/개인'),
							xtype		: 'lookupfield',
							name		: 'mmbr_dvcd',
							labelWidth	:  60,
							width		: 180,
							lookupValue	: resource.getList('search_all').concat( resource.getList('mmbr_dvcd' ) ) ,
							value		: '',
							margin		: '0 0 0 30'
						}
					]
				},
			]
		};
	return line;
}

});