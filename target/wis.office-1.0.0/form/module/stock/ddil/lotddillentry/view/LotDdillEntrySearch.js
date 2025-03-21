Ext.define('module.stock.ddil.lotddillentry.view.LotDdillEntrySearch', { extend: 'Axt.form.Search',

	alias: 'widget.module-lotddillentry-search',
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
								emptyText	: '',
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
				title			: '상세검색',
				collapsible		: true,
				collapsed		: false ,
				layout			: 'vbox',
				defaults		: {	xtype: 'fieldset', layout: 'vbox', margin : '0 0 5 0', padding: '0', border: 0 },
				fieldDefaults	: {	width: 341, labelWidth : 100, labelSeparator : '' },
				items			: [
					{	xtype	: 'fieldset', layout: 'hbox',
						items	: [
							{	fieldLabel	: Language.get('exmn_date','조사일자'),
								xtype		: 'datefield',
								name		: 'invc_date',
								labelWidth	: 99,
								width		: 198,
								format		: Const.DATE_FORMAT_YMD_BAR,
								submitFormat: Const.DATE_FORMAT_YMD,
								value		: new Date(),
								maxValue	: new Date()
							},{	fieldLabel	: Language.get('wrhs_name','창고'),
								xtype		: 'popupfield',
								editable	: true,
								enableKeyEvents : true,
								name		: 'wrhs_name',
								labelWidth	: 150,
								width		: 345,
								pair		: 'wrhs_idcd',
								popup		: {
									select	: 'SINGLE',
									widget	: 'lookup-wrhs-popup',
									params	: { stor_grp : _global.stor_grp , line_stat : '0' },
									result	: function(records, nameField, pairField) {
										nameField.setValue(records[0].get('wrhs_name'));
										pairField.setValue(records[0].get('wrhs_idcd'));
									}
								},
								hidden:true
							},{	name : 'wrhs_idcd', xtype : 'textfield' , hidden : true
							}
						]
					}
				]
			};
		return line;
	}
});