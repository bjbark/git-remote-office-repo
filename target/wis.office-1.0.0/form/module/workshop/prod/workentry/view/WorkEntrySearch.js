Ext.define('module.workshop.prod.workentry.view.WorkEntrySearch', { extend: 'Axt.form.Search',

	alias: 'widget.module-workentry-search',
	initComponent: function(){
		var me = this;
			me.items = [ me.searchBasic(),me.createLine1() ];
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
				height : 40,
				margin	: '0 40 0 40',
				items	: [
					{	xtype		: 'fieldset',
						border		: 3,
						flex		: 1,
						style		: { borderColor	: '#000081', borderStyle	: 'solid' },
						region		: 'center',
						height		: 34,
						margin		: '3 0 0 0',
						defaults	: { xtype: 'fieldset', layout: 'hbox', margin : '3 10  0', padding:'0', border: 0 },
						layout		: 'hbox',
						items		: [
							{	xtype	: 'label',
								fieldCls: 'requiredindex',
								text	: 'SEARCH  | ',
								margin	: '5 10 0 0',
								style	: 'text-align:center;color: #0000B7;font-size: 13px !important;font-weight:bold;',
							},{	name			: 'find_name',
								xtype			: 'searchfield',
								flex			: 4,
								emptyText		: '',
								enableKeyEvents	: true,
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
					},{	xtype	: 'button'  ,action : Const.SELECT.action, margin : '2 2 0 0',region : 'north' , width : 40, height : 36,
						style	: 'background:url("../../../resource/img/btn_search_icon.png")'
					},{	xtype	: 'fieldset',border	: 0 ,region	: 'north',height  : 34, width	: 2
					},
				]
			}
		;
		return line;
	},

	createLine1 : function() {
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
							{	fieldLabel	: Language.get('item','회원'),
								xtype		: 'popupfield', editable : true, enableKeyEvents : true,
								name		: '',
								pair		: '',
								clearable	: true,
								width		: 250,
								popup		: {
									select  : 'SINGLE',
									widget  : 'lookup-item-popup',
									params  : { stor_grp : _global.stor_grp , line_stat : '0' },
									result  : function(records, nameField, pairField) {
										nameField.setValue(records[0].get('item_name'));
										pairField.setValue(records[0].get('item_idcd'));
									}
								}
							},{	name		: 'item_idcd', xtype : 'textfield' , hidden : true,
							},{	fieldLabel	: Language.get('line_stat','상태'),
								xtype		: 'lookupfield',
								name		: 'line_stat',
								labelWidth	:  60,
								width		: 140,
								lookupValue	: resource.lookup('search_all').concat( resource.lookup('line_stat' )),
								value		: '',
								margin		:'0 0 0 10'
							},{	fieldLabel	: Language.get('','수주기간'),
								xtype		: 'betweenfield',
								name		: 'invc_date1',
								pair		: 'invc_date2',
								width		: 198,
								labelWidth	: 100,
								root		: true,
								format		: Const.DATE_FORMAT_YMD_BAR,
								submitFormat: Const.DATE_FORMAT_YMD,
								value		: Ext.Date.getFirstDateOfMonth(new Date()),
								clearable	: true
							},{	fieldLabel	: Language.get('','~'),
								xtype		: 'betweenfield',
								name		: 'invc_date2',
								pair		: 'invc_date1',
								width		: 116,
								labelWidth	: 19,
								format		: Const.DATE_FORMAT_YMD_BAR,
								submitFormat: Const.DATE_FORMAT_YMD,
								value		: new Date(),
								clearable	: true
							}
						]
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '5 0 0 0',
						items	: [
							{	fieldLabel	: Language.get('','등록구분'),
								xtype		: 'lookupfield',
								name		: '',
								width		: 220,
								lookupValue	: resource.lookup('')
							},{	fieldLabel	: Language.get('','생산일자'),
								xtype		: 'betweenfield',
								name		: 'invc_date1',
								pair		: 'invc_date2',
								width		: 198,
								labelWidth	: 100,
								root		: true,
								format		: Const.DATE_FORMAT_YMD_BAR,
								submitFormat: Const.DATE_FORMAT_YMD,
								value		: Ext.Date.getFirstDateOfMonth(new Date()),
								clearable	: true,
								margin		: '0 0 0 180'
							},{	fieldLabel	: Language.get('','~'),
								xtype		: 'betweenfield',
								name		: 'invc_date2',
								pair		: 'invc_date1',
								width		: 116,
								labelWidth	: 19,
								format		: Const.DATE_FORMAT_YMD_BAR,
								submitFormat: Const.DATE_FORMAT_YMD,
								value		: new Date(),
								clearable	: true
							}
						]
					},{	xtype : 'fieldset', layout: 'hbox',padding:'0', border: 0, margin : '5 0 0 0',
						items : [
							{	name		: 'barcode_pono',
								fieldCls	: 'textTemp field-c-25',
								xtype		: 'searchfield'	,
								width		: 610,
								emptyText	: '생산지시 번호를  Reading 하세요...',
								enableKeyEvents : true			,
								margin		: '0 0 0 105',
								height		: 40,
								hidden		: (_global.options.mes_system_type !='Frame'? false:true),
								listeners	: {
									keydown : function(self, e) {
										if (e.keyCode == e.ENTER || e.keyCode == 9) {
											var searchButton = self.up('form').down('[action=selectAction2]');
											searchButton.fireEvent('click', searchButton); //조회버튼클릭
										}
									}
								}
							}
						]
					}
				]
			};
		return line;
	}
});