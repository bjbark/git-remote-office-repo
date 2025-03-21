Ext.define('module.custom.iypkg.etc.trsfwork.view.TrsfWorkSearch', { extend: 'Axt.form.Search',

	alias: 'widget.module-trsfwork-search',
	/**
	 *
	 */
	initComponent: function(){
		var me = this;
		me.items = [
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
								emptyText	: '조회할 출고 거래처코드 또는 거래처명을 입력하세요...',
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
	/**
	 * 라인1
	 */
	createLine1 : function(){
		var me = this,
			line = {
				xtype			: 'fieldset',
				title			: '상세검색',
				collapsible		: true,
				collapsed		: false,
				layout			: 'vbox',
				defaults		: { xtype: 'fieldset', layout: 'hbox', margin : '0 0 -10 0', padding:'0', border: 0 },
				items			: [
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
									margin: '0 0 5 0',
									items : [
										{	fieldLabel	: Language.get('istt_date','조회기간'),
											xtype		: 'betweenfield',
											name		: 'invc_date1',
											pair		: 'invc_date2',
											width		: 198,
											labelWidth	: 80,
											value		: Ext.Date.add( new Date(), Ext.Date.DAY, -14),
											root		: true
										},{	fieldLabel	: '~',
											xtype		: 'betweenfield',
											name		: 'invc_date2',
											pair		: 'invc_date1',
											width		: 116,
											labelWidth	: 19,
										},{	fieldLabel	: Language.get('','합계구분'),
											xtype		: 'lookupfield',
											name		: 'chk',
											lookupValue	: [['1','일계'],['2','월계'],['3','합계']],
											multiSelect	: true ,
											editable	: false,
											labelWidth	: 80,
											width		: 207,
										}
									]
								},{	xtype : 'fieldset', layout: 'hbox', border: 0 ,
									items : [
										{	fieldLabel	: Language.get('cars_alis', '차량' ),
											xtype		: 'popupfield',
											editable	: true,
											enableKeyEvents : true,
											name		: 'cars_alis',
											pair		: 'cars_idcd',
											width		: 300,
											labelWidth	: 80,
											emptyText	: Const.infoNull.queryAll,
											clearable	: true,
											popup		: {
												widget	: 'lookup-car-popup',
												select	: 'SINGLE',
												params	: { stor_grp : _global.stor_grp },
												result	: function(records, nameField, pairField) {
													nameField.setValue(records[0].get('cars_alis'));
													pairField.setValue(records[0].get('cars_idcd'));
												}
											}
										},{	name : 'cars_idcd', xtype : 'textfield' , hidden : true
										},{	fieldLabel	: Language.get('', '~' ),
											xtype		: 'popupfield',
											editable	: true,
											enableKeyEvents : true,
											name		: 'cars_alis2',
											pair		: 'cars_idcd2',
											labelWidth	: 12,
											width		: 220,
											emptyText	: Const.infoNull.queryAll,
											clearable	: true,
											popup		: {
												widget	: 'lookup-car-popup',
												select	: 'SINGLE',
												params	: { stor_grp : _global.stor_grp },
												result	: function(records, nameField, pairField) {
													nameField.setValue(records[0].get('cars_alis'));
													pairField.setValue(records[0].get('cars_idcd'));
												}
											}
										},{	name : 'cars_idcd2', xtype : 'textfield' , hidden : true
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