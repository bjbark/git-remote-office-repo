Ext.define('module.qc.basic.moldinspstd.view.MoldInspStdSearch', { extend: 'Axt.form.Search',

	alias: 'widget.module-moldinspstd-search',
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
								{	xtype		: 'label',
									fieldCls	: 'requiredindex',
									text		: 'SEARCH  | ',
									margin		: '5 10 0 0',
									style		: 'text-align:center;color: #0000B7;font-size: 13px !important;font-weight:bold;',
								},{	name		: 'find_name',
									xtype		: 'searchfield',
									flex		: 4,
									emptyText	: '조회할 검사유형코드 또는 검사유형명을 입력하세요...',
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
				xtype			: 'fieldset',
				title			: '상세검색',
				collapsible		: true,
				collapsed		: true,
				layout			: 'vbox',
				defaults		: { xtype: 'fieldset', layout: 'vbox', margin : '0 0 5 0', padding: '0', border: 0 , },
				fieldDefaults	: { width : 341, labelWidth : 100, labelSeparator : '' },
				items			: [
					{	xtype : 'fieldset', layout: 'hbox',
						items : [
							{	fieldLabel	: Language.get('join_date','등록일자'),
								xtype		: 'datefield'	,
								name		: 'fr_date'	,
								width		: 200,
								format		: Const.DATE_FORMAT_YMD_BAR,
								submitFormat: Const.DATE_FORMAT_YMD,
								value		: Ext.Date.add( new Date(), Ext.Date.MONTH, -2),
							},{	labelWidth	: '20px',
								fieldLabel	: Language.get('',' ~ '),
								xtype		: 'datefield'	,
								name		: 're_date'	,
								width		: 120,
								format		: Const.DATE_FORMAT_YMD_BAR,
								submitFormat: Const.DATE_FORMAT_YMD,
								value : new Date(),
							},{	fieldLabel	: '상태'		,
								xtype		: 'lookupfield'	,
								name		: 'line_stat'	,
								value		: '',
								width		: 200,
								lookupValue	: resource.lookup('search_all').concat( resource.lookup('line_stat' ) )	,
							}
						],
					},{	xtype : 'fieldset', layout: 'hbox',
								items : [
									{	fieldLabel	: Language.get('acpt_numb','금형코드'),
								xtype		: 'popupfield',
								editable	: true,
								enableKeyEvents : true,
								name		: 'mold_name',
								pair		: 'mold_idcd',
								clearable	: true,
								width		: 320,
								popup		: {
									select  : 'SINGLE',
									widget  : 'lookup-mold-popup',
									params  : { stor_grp : _global.stor_grp , line_stat : '0' },
									result  : function(records, nameField, pairField) {
										nameField.setValue(records[0].get('mold_name'));
										pairField.setValue(records[0].get('mold_idcd'));
									}
								}
							},{	name		: 'mold_idcd', xtype : 'textfield' , hidden : true
							}
						]
					}
				]
			};
		return line;
	}
});