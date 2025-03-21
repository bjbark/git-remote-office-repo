Ext.define('module.mtrl.po.purcordr2.view.PurcOrdr2Search', { extend: 'Axt.form.Search',


	alias: 'widget.module-purcordr2-search',
	/**
	 *
	 */
	initComponent: function(){
		var me = this;
		me.items = [
			me.searchBasic(),
//			me.createLine1(),
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

	addonSearch : function(){
		var me = this,
			line = {
				xtype			: 'fieldset',
				title			: '상세검색',
				collapsible		: true,
				collapsed		: false,
				name			: 'collapsed',
				layout			: 'vbox',
				defaults		: { xtype: 'fieldset', layout: 'vbox', margin : '0 0 5 0', padding: '0', border: 0 , },
				fieldDefaults	: { width : 341, labelWidth : 100, labelSeparator : '' },
				items			: [
					{	xtype : 'fieldset', layout: 'hbox',
						items : [
							{	fieldLabel	: Language.get('cstm','사업장'),
								xtype		: 'popupfield',
								editable	: true,
								enableKeyEvents : true,
								name		: 'bzpl_name',
								width		: 230,
								pair		: 'bzpl_idcd',
								clearable	: true,
								popup: {
									select : 'SINGLE',
									widget : 'lookup-bzpl-popup',
									params : { stor_grp : _global.stor_grp , line_stat : '0' },
									result : function(records, nameField, pairField) {
										nameField.setValue(records[0].get('bzpl_name'));
										pairField.setValue(records[0].get('bzpl_idcd'));
									}
								}
							},{	name : 'bzpl_idcd', xtype : 'textfield' , hidden : true
							},{	fieldLabel	: Language.get('offr_term','발주기간'),
								xtype		: 'betweenfield',
								name		: 'invc1_date',
								pair		: 'invc2_date',
								root		: true,
								width		: 198,
								labelWidth	: 100,
								format		: Const.DATE_FORMAT_YMD_BAR,
								submitFormat: Const.DATE_FORMAT_YMD,
								value		: Ext.Date.getFirstDateOfMonth(new Date())
							},{	fieldLabel	: Language.get('','~'),
								xtype		: 'betweenfield',
								name		: 'invc2_date',
								pair		: 'invc1_date',
								width		: 116,
								labelWidth	: 19,
								format		: Const.DATE_FORMAT_YMD_BAR,
								submitFormat: Const.DATE_FORMAT_YMD,
								value		: new Date()
							}
	 					]
					},{	xtype : 'fieldset', layout: 'hbox',
						items : [
							{	fieldLabel	: Language.get('cstm','담당자'),
								xtype		: 'popupfield',
								editable	: true,
								enableKeyEvents : true,
								name		: 'drtr_name',
								width		: 230,
								pair		: 'drtr_idcd',
								clearable	: true,
								popup: {
									select : 'SINGLE',
									widget : 'lookup-user-popup',
									params : { stor_grp : _global.stor_grp , line_stat : '0' },
									result : function(records, nameField, pairField) {
										nameField.setValue(records[0].get('user_name'));
										pairField.setValue(records[0].get('user_idcd'));
									}
								}
							},{	name : 'drtr_idcd', xtype : 'textfield' , hidden : true
							},{	fieldLabel	: Language.get('deli_date','납기일자'),
								xtype		: 'betweenfield',
								name		: 'deli1_date',
								pair		: 'deli2_date',
								root		: true,
								width		: 198,
								labelWidth	: 100,
								format		: Const.DATE_FORMAT_YMD_BAR,
								submitFormat: Const.DATE_FORMAT_YMD,
								value		: ''
							},{	fieldLabel	: Language.get('','~'),
								xtype		: 'betweenfield',
								name		: 'deli2_date',
								pair		: 'deli1_date',
								width		: 116,
								labelWidth	: 19,
								format		: Const.DATE_FORMAT_YMD_BAR,
								submitFormat: Const.DATE_FORMAT_YMD,
								value		: ''
							}
						]
					},{	xtype : 'fieldset', layout: 'hbox',
						items : [
							{	fieldLabel	: Language.get('line_clos','상태'),
								xtype		: 'lookupfield',
								name		: 'line_clos',
								lookupValue	: resource.lookup('line_clos'),
								width		: 180
							},{	fieldLabel	: Language.get('supl_dvcd','조달구분'),
								xtype		: 'lookupfield',
								name		: 'supl_dvcd',
								lookupValue	: resource.lookup('supl_dvcd'),
								width		: 198,
								margin		: '0 0 0 50'
							}
						]
					}
				]
			};
		return line;
	}


});