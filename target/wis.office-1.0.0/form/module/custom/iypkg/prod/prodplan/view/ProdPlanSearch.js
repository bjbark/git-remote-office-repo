Ext.define('module.custom.iypkg.prod.prodplan.view.ProdPlanSearch', { extend: 'Axt.form.Search',

	alias: 'widget.module-prodplan-search',

	initComponent: function(){
		var me = this;
		me.items = [
			me.searchBasic()
			,me.createLine1()
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
						margin 	: '3 0 0 0',
						defaults: { xtype: 'fieldset', layout: 'hbox', margin : '3 10  0', padding:'0', border: 0 },
						layout	: 'hbox',
						items	: [
							{	xtype	: 'label'			,
								fieldCls: 'requiredindex'	,
								text	: 'SEARCH  | '		,
								margin	: '5 10 0 0'		,
								style	: 'text-align:center;color: #0000B7;font-size: 13px !important;font-weight:bold;',
							},{	name	: 'find_name'		,
								xtype		: 'searchfield'	,
								flex		: 4				,
								emptyText	: '조회할 일자 또는 거래처명을 입력하세요...',
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

	createLine1 : function(){
		var	me	= this,
			line =
				{	xtype      : 'fieldset',
					title      : '상세검색',
					collapsible: true,
					collapsed  : false,
					layout     : 'vbox',
					defaults   : { xtype: 'fieldset', layout: 'hbox', margin : '0 0 -10 0', padding:'0', border: 0 },
					items : [
						{	xtype : 'fieldset',
						layout: 'hbox',
						border: 0,
						margin: '0 0 0 0',
						items : [
						{	xtype : 'fieldset',
							layout: 'vbox',
							border: 0,
							margin: '0 0 0 20',
							items : [
								{	xtype : 'fieldset',
									layout: 'hbox',
									border: 0,
									margin: '0 0 0 0',
									items : [
										{	fieldLabel	: Language.get('','계획일자'),
											xtype		: 'betweenfield',
											name		: 'plan_sttm1',
											pair		: 'plan_sttm2',
											labelWidth	: 85,
											width		: 180,
											margin		: '0 0 0 0',
											root		: true,
											value		: Ext.Date.getFirstDateOfMonth(new Date()),
										},{	xtype		: 'betweenfield',
											fieldLabel	:'~',
											name		: 'plan_sttm2',
											pair		: 'plan_sttm1',
											labelWidth	: 15,
											width		: 110,
											value		: new Date()
										},{	fieldLabel	: Language.get('','수주일자'),
											xtype		: 'betweenfield',
											name		: 'acpt_sttm1',
											pair		: 'acpt_sttm2',
											labelWidth	: 85,
											width		: 180,
											margin		: '0 0 0 0',
											hidden		: true,
											root		: true,
											value		: Ext.Date.getFirstDateOfMonth(new Date()),
										},{	xtype		: 'betweenfield',
											fieldLabel	:'~',
											name		: 'acpt_sttm2',
											pair		: 'acpt_sttm1',
											hidden		: true,
											labelWidth	: 15,
											width		: 110,
											value		: new Date()
										},{	fieldLabel	: Language.get('acpt_numb','수주번호'),
											xtype		: 'popupfield',
											editable	: true,
											enableKeyEvents : true,
											name		: 'invc_numb',
											width		: 250,
											labelWidth	: 71,
											editable	: true,
											clearable	: true,
											enableKeyEvents	: true,
											popup		: {
												select	: 'SINGLE',
												widget	: 'lookup-iypkg-ordr-popup',
												params	: { stor_grp : _global.stor_grp, line_stat : '0' },
												result	: function(records, nameField, pairField ) {
													nameField.setValue(records[0].get('invc_numb'));
												}
											}
										},{	fieldLabel	: Language.get('','거래처'),
											xtype		: 'popupfield',
											name		: 'cstm_name',
											pair		: 'cstm_idcd',
											clearable	: true,
											labelWidth	: 72,
											width		: 250,
											editable	: true,
											popup: {
												select : 'SINGLE',
												widget : 'lookup-cstm-popup',
												params : { stor_grp : _global.stor_grp , line_stat : '0' },
												result : function(records, nameField, pairField) {
													nameField.setValue(records[0].get('cstm_name'));
													pairField.setValue(records[0].get('cstm_idcd'));
												}
											}
										},{	name : 'cstm_idcd', xtype : 'textfield' , hidden : true
										}
									]
								},{	xtype : 'fieldset',
									layout: 'hbox',
									border: 0,
									margin: '5 0 0 0',
									items : [
										{	fieldLabel	: Language.get('','납기일자'),
											xtype		: 'betweenfield',
											name		: 'deli_date1',
											pair		: 'deli_date2',
											labelWidth	: 85,
											width		: 180,
											margin		: '0 0 0 0',
											root		: true,
											value		: ''
										},{	xtype		: 'betweenfield',
											fieldLabel	:'~',
											name		: 'deli_date2',
											pair		: 'deli_date1',
											labelWidth	: 15,
											width		: 110,
											value		: ''
										},{	fieldLabel	: Language.get('prod_name','품명'),
											xtype		: 'popupfield',
											name		: 'prod_name',
											pair		: 'prod_idcd',
											width		: 250,
											labelWidth	: 71,
											clearable	: true,
											editable	: true,
											popup: {
												select : 'SINGLE',
												widget : 'lookup-prod-popup',
												params : { stor_grp : _global.stor_grp , line_stat : '0' },
												result : function(records, nameField, pairField) {
													nameField.setValue(records[0].get('prod_name'));
													pairField.setValue(records[0].get('prod_idcd'));
												}
											}
										},{	xtype : 'textfield',  name : 'prod_idcd' , hidden: true
										},{	fieldLabel	: Language.get('wkct_name','공정'),
											xtype		: 'popupfield',
											name		: 'wkct_name',
											pair		: 'wkct_idcd',
											width		: 250,
											labelWidth	: 71,
											clearable	: true,
											editable	: true,
											popup: {
												select : 'SINGLE',
												widget : 'lookup-wkct-popup',
												params : { stor_grp : _global.stor_grp , line_stat : '0' },
												result : function(records, nameField, pairField) {
													nameField.setValue(records[0].get('wkct_name'));
													pairField.setValue(records[0].get('wkct_idcd'));
												}
											}
										},{	xtype : 'textfield',  name : 'wkct_idcd' , hidden: true
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