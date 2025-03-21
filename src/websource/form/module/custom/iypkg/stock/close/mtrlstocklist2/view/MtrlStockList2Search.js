Ext.define('module.custom.iypkg.stock.close.mtrlstocklist2.view.MtrlStockList2Search', { extend: 'Axt.form.Search',
	alias: 'widget.module-mtrlstocklist2-search',

	initComponent: function(){
		var me = this;
		me.items =  [
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
							emptyText		: '조회할 부자재코드 또는 부자재명을 입력하세요...',
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
				xtype			: 'fieldset',
				title			: '상세검색',
				collapsible		: true,
				collapsed		: false,
				layout			: 'vbox',
				defaults		: { xtype: 'fieldset', layout: 'hbox', margin : '0 0 0 0', padding:'0', border: 0 },
				items			: [
					{	xtype : 'fieldset',
						layout: 'hbox',
						border: 0,
						margin: '0 0 0 0',
						items : [
							{	fieldLabel	: Language.get('istt_date','조회기간'),
								xtype		: 'betweenfield',
								name		: 'fr_dt',
								pair		: 'to_dt',
								margin		: '10 0 0 2',
								width		: 198,
								labelWidth	: 80,
								value		: Ext.Date.getFirstDateOfMonth(new Date()),
								root		: true
							},{	fieldLabel	: '~',
								xtype		: 'betweenfield',
								name		: 'to_dt',
								pair		: 'fr_dt',
								margin		: '10 0 0 0',
								valuee		: new Date(),
								width		: 135,
								labelWidth	: 12,
							},{	fieldLabel	: Language.get('drtr_name', '품목코드' ),
								xtype		: 'popupfield',
								editable	: true,
								enableKeyEvents : true,
								name		: 'asmt_name',
								pair		: 'asmt_idcd',
								margin		: '10 0 0 0',
								width		: 295,
								labelWidth	: 80,
								emptyText	: Const.infoNull.queryAll,
								clearable	: true,
								popup: {
									select : 'SINGLE',
									widget : 'lookup-asmt-popup',
									params : { stor_grp : _global.stor_grp , line_stat : '0' },
									result : function(records, nameField, pairField) {
										nameField.setValue(records[0].get('asmt_name'));
										pairField.setValue(records[0].get('asmt_idcd'));
									}
								}
							},{	name : 'asmt_idcd', xtype : 'textfield' , hidden : true
							},{	fieldLabel	: Language.get('', '~' ),
								xtype		: 'popupfield',
								editable	: true,
								enableKeyEvents : true,
								name		: 'asmt_name2',
								pair		: 'asmt_idcd2',
								margin		: '10 0 0 0',
								labelWidth	: 12,
								width		: 227,
								emptyText	: Const.infoNull.queryAll,
								clearable	: true,
								popup: {
									select : 'SINGLE',
									widget : 'lookup-asmt-popup',
									params : { stor_grp : _global.stor_grp , line_stat : '0' },
									result : function(records, nameField, pairField) {
										nameField.setValue(records[0].get('asmt_name'));
										pairField.setValue(records[0].get('asmt_idcd'));
									}
								}
							},{	name : 'asmt_idcd2', xtype : 'textfield' , hidden : true
							},{	fieldLabel	: Language.get('','합계구분'),
								xtype		: 'lookupfield',
								name		: 'chk',
								lookupValue	: [['3','월계'],['4','합계']],
								multiSelect	: true ,
								editable	: false,
								labelWidth	: 99,
								width		: 300,
								margin		: '10 0 0 0',
							}
						]
					}
				]
			};
		return line;
	},

});