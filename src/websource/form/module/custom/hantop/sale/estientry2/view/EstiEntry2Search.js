Ext.define('module.custom.hantop.sale.estientry2.view.EstiEntry2Search', { extend: 'Axt.form.Search',

	alias: 'widget.module-estientry2-search',


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
								emptyText	: '조회할 견적일자 또는 거래처명을 입력하세요...',
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
				xtype		: 'fieldset',
				border		: 0,
				title		: '상세검색',
				collapsible	: true,
				collapsed	: true,
				region		: 'center',
				width		: '100%',
				layout		: 'vbox',
				defaults	: { xtype: 'fieldset', layout: 'vbox', margin : '0 0 0 0', padding: '0', border: 0 , },
				fieldDefaults	: { width : 341, labelWidth : 80, labelSeparator : '' },
				items		: [
					{	xtype : 'fieldset', layout: 'vbox',
						items : [
							{	xtype : 'fieldset', layout: 'hbox', border : 0, margin : '0 0 5 0',
								items : [
								{	fieldLabel	: Language.get('esti_date','견적일자'),
									xtype		: 'betweenfield',
									name		: 'esti_date1',
									pair		: 'esti_date2',
									labelWidth	: 99,
									width		: 198,
									margin		: '0 0 0 2',
									root		: true,
									value		: Ext.Date.add( new Date(), Ext.Date.MONTH, -1)
								},{	xtype		: 'betweenfield',
									fieldLabel	:'~',
									name		: 'esti_date2',
									pair		: 'esti_date1',
									labelWidth	: 15,
									width		: 115,
								},{	fieldLabel	: Language.get('cstm_name','거래처명'),
									xtype		: 'popupfield',
									editable	: true,
									enableKeyEvents : true,
									name		: 'cstm_name',
									width		: 315,
									pair		: 'cstm_idcd',
									clearable	: true,
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
								},{	fieldLabel	: Language.get('drtr_name','담당자'),
									xtype		: 'popupfield',
									editable	: true,
									enableKeyEvents : true,
									name		: 'drtr_name',
									width		: 315,
									pair		: 'drtr_idcd',
									clearable	: true,
									popup: {
										select : 'SINGLE',
										widget : 'lookup-user-popup',
										params : { stor_grp : _global.stor_grp , line_stat : '0' },
										result : function(records, nameField, pairField) {
											nameField.setValue(records[0].get('drtr_name'));
											pairField.setValue(records[0].get('drtr_idcd'));
										}
									}
								},{	name : 'drtr_idcd', xtype : 'textfield' , hidden : true
								}
				 			]
						},{	xtype : 'fieldset', layout: 'hbox', border : 0, margin : '0 0 5 0',
							items : [
								{	fieldLabel	: Language.get('dlvy_schd_date','시공일자'),
									xtype		: 'betweenfield',
									name		: 'schd_date1',
									pair		: 'schd_date2',
									labelWidth	: 99,
									width		: 198,
									margin		: '0 0 0 2',
									root		: true,
									value		: ''
								},{	xtype		: 'betweenfield',
									fieldLabel	:'~',
									name		: 'schd_date2',
									pair		: 'schd_date1',
									labelWidth	: 15 ,
									width		: 115,
									value		: ''
								},{	fieldLabel	: Language.get('scen_name','현장명'),
									xtype		: 'textfield',
									editable	: true,
									enableKeyEvents : true,
									name		: 'scen_name',
									width		: 315,
									clearable	: true,
								},{	fieldLabel	: Language.get('line_stat','상태'),
									xtype		: 'lookupfield',
									lookupValue	: resource.lookup('line_stat'),
									editable	: true,
									enableKeyEvents : true,
									name		: 'line_stat',
									width		: 200
								}
							]
						}
					]
				}
			]
		};
		return line;
	}
});