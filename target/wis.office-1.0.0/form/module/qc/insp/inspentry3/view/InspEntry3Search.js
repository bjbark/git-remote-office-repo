Ext.define('module.qc.insp.inspentry3.view.InspEntry3Search', { extend: 'Axt.form.Search',


	alias: 'widget.module-inspentry3-search',
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
								emptyText	: '조회할 거래처코드 또는 거래처명을 입력하세요...',
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
				xtype	: 'fieldset',
				layout	:'hbox',
				items	: [
					{	fieldLabel	: Language.get('', '입고창고' ),
						xtype		: 'popupfield',
						editable	: true,
						enableKeyEvents : true,
						name		: 'wrhs_name',
						pair		: 'wrhs_idcd',
						emptyText	: Const.infoNull.queryAll,
						clearable	: true,
						popup		: {
							widget	: 'lookup-wrhs-popup',
							select	: 'SINGLE',
							params	: { stor_grp : _global.stor_grp },
							result	: function(records, nameField, pairField) {
								nameField.setValue(records[0].get('wrhs_name'));
								pairField.setValue(records[0].get('wrhs_idcd'));
							}
						}
					},{	xtype		: 'textfield', name : 'wrhs_idcd', hidden : true
					},{	fieldLabel	: '입고기간',
						xtype		: 'betweenfield',
						name		: 'fr_dt',
						pair		: 'to_dt',
						width		: 182,
						labelWidth	: 77,
						value		: Ext.Date.add( new Date(), Ext.Date.DAY, -14),
						root		: true
					},{	fieldLabel	: '~',
						xtype		: 'betweenfield',
						name		: 'to_dt',
						pair		: 'fr_dt',
						width		: 115,
						labelWidth	: 15
					},{	fieldLabel	: Language.get('', '작업담당' ),
						xtype		: 'popupfield',
						editable	: true,
						enableKeyEvents : true,
						name		: 'drtr_name',
						pair		: 'drtr_idcd',
						emptyText	: Const.infoNull.queryAll,
						clearable	: true,
						popup		: {
							widget	: 'lookup-user-popup',
							select	: 'SINGLE',
							params	: { stor_grp : _global.stor_grp },
							result	: function(records, nameField, pairField) {
								nameField.setValue(records[0].get('user_name'));
								pairField.setValue(records[0].get('user_idcd'));
							}
						}
					},{	xtype		: 'textfield', name : 'drtr_idcd', hidden : true
					}
				]
			};
		return line;
	},
});