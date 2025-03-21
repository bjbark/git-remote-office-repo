Ext.define('module.custom.iypkg.mtrl.po.purcordr.view.PurcOrdrSearch', { extend: 'Axt.form.Search',
	alias: 'widget.module-purcordr-search',

	initComponent: function(){
		var me = this;
		me.items =  [
			me.searchBasic(),
			me.createLine1(),
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
							emptyText		: '조회할 품목코드 또는 품목명을 입력하세요.',
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
		var	me	= this,
			line =
				{	xtype      : 'fieldset',
					title      : '상세검색',
					collapsible: true,
					collapsed  : true,
					name       : 'collapsed',
					layout     : 'vbox',
					defaults   : { xtype: 'fieldset', layout: 'hbox', margin : '0 0 -10 0', padding:'0', border: 0 },
					items : [
						{	xtype : 'fieldset',
						layout: 'hbox',
						border: 0,
						margin: '0 0 0 -18',
						items : [
						{	xtype : 'fieldset',
							layout: 'vbox',
							border: 0,
							margin: '0 0 0 0',
							items : [
								{	xtype : 'fieldset',
									layout: 'hbox',
									border: 0,
									margin: '0 0 0 0',
									items : [
										{	fieldLabel	: Language.get('','조회기간'),
											xtype		: 'betweenfield',
											name		: 'fr_invc_date',
											pair		: 'to_invc_date',
											labelWidth	: 99,
											width		: 198,
											margin		: '0 0 0 0',
											root		: true,
											value		: Ext.Date.getFirstDateOfMonth(new Date())
										},{	xtype		: 'betweenfield',
											fieldLabel	:'~',
											name		: 'to_invc_date',
											pair		: 'fr_invc_date',
											labelWidth	: 15,
											width		: 115,
											value		: new Date()
										},{	fieldLabel	: Language.get('','합계구분'),
											xtype		: 'lookupfield',
											name		: 'chk',
											lookupValue	: [['1','소계'],['2','일계'],['3','월계'],['4','합계']],
											multiSelect	: true ,
											editable	: false,
											labelWidth	: 102,
											width		: 243,
											margin		: '0 0 0 -10',
										},{	fieldLabel	: Language.get('','원단'),
											xtype		: 'popupfield',
											editable	: true,
											enableKeyEvents : true,
											name		: 'fabc_name',
											pair		: 'fabc_idcd',
											labelWidth	: 99,
											width		: 315,
											margin		: '0 20 0 0',
											clearable	: true ,
											popup: {
												select : 'SINGLE',
												widget : 'lookup-fabc-popup',
												params : { stor_grp : _global.stor_grp , line_stat : '0'},
												result : function(records, nameField, pairField) {
													var search = Ext.ComponentQuery.query('module-purcordr-search')[0];

													nameField.setValue(records[0].get('fabc_name'));
													pairField.setValue(records[0].get('fabc_idcd'));

													me.down('[name=fabc_code]').setValue(records[0].get('fabc_code'));
												}
											},
											listeners	: {
												change : function(){
													var search = Ext.ComponentQuery.query('module-purcordr-search')[0];
													if(this.value == ''){
														me.down('[name=fabc_code]').setValue('');
													}
												}
											}
										},{	name : 'fabc_idcd', xtype : 'textfield' , hidden : true
										},{	name : 'fabc_code', xtype : 'textfield' , hidden : true
										},{	xtype		: 'popupfield',
											fieldLabel	:'~',
											name		: 'fabc_name2',
											pair		: 'fabc_idcd2',
											labelWidth	: 15,
											width		: 232,
											margin		: '0 0 0 -20',
											value		: '',
											editable	: true,
											enableKeyEvents : true,
											clearable	: true,
											popup: {
												select : 'SINGLE',
												widget : 'lookup-fabc-popup',
												params : { stor_grp : _global.stor_grp , line_stat : '0'},
												result : function(records, nameField, pairField) {
													var search = Ext.ComponentQuery.query('module-purcordr-search')[0];

													nameField.setValue(records[0].get('fabc_name'));
													pairField.setValue(records[0].get('fabc_idcd'));

													me.down('[name=fabc_code2]').setValue(records[0].get('fabc_code'));
												}
											},
											listeners	: {
												change : function(){
													var search = Ext.ComponentQuery.query('module-purcordr-search')[0];
													if(this.value == ''){
														me.down('[name=fabc_code2]').setValue('');
													}
												}
											}
										},{	name : 'fabc_idcd2', xtype : 'textfield' , hidden : true
										},{	name : 'fabc_code2', xtype : 'textfield' , hidden : true
										},{	name : 'code', xtype : 'textfield' , hidden : true
										}
									]
								}
							]
						}
					]
				}
			]
		};
		return line;
	},

});