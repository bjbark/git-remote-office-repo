Ext.define('module.custom.iypkg.sale.order.slorlist3.view.SlorList3Search', { extend: 'Axt.form.Search',

	alias: 'widget.module-slorlist3-search',
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
								emptyText	: '조회할 품목명 또는 거래처명을 입력하세요...',
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
				layout			: 'vbox',
				defaults		: { xtype: 'fieldset', layout: 'vbox', margin : '0 0 5 0', padding: '0', border: 0 , },
				fieldDefaults	: { width: 341, labelWidth : 100, labelSeparator : '' },
				items			: [
					{	xtype	: 'fieldset', layout: 'hbox',
						items	: [
							{	fieldLabel	: Language.get('acpt_numb', '수주번호' ),
								xtype		: 'popupfield',
								name		: 'invc_numb',
								editable	: true,
								enableKeyEvents : true,
								clearable	: true ,
								width		: 315,
								popup		: {
									widget	: 'lookup-iypkg-ordr-popup',
									select	: 'SINGLE',
									params	: { stor_grp : _global.stor_grp, line_stat : '0' },
									result	: function(records, nameField, pairField ) {
										nameField.setValue(records[0].get('invc_numb'));
									}
								}
							},{	fieldLabel	: Language.get('cstm','거래처'),
								xtype		: 'popupfield',
								editable	: true,
								enableKeyEvents : true,
								name		: 'cstm_name',
								width		: 315,
								pair		: 'cstm_idcd',
								clearable	: true,
								popup		: {
									select	: 'SINGLE',
									widget	: 'lookup-cstm-popup',
									params	: { stor_grp : _global.stor_grp , line_stat : '0' },
									result	: function(records, nameField, pairField) {
										nameField.setValue(records[0].get('cstm_name'));
										pairField.setValue(records[0].get('cstm_idcd'));
									}
								}
							},{	name : 'cstm_idcd', xtype : 'textfield' , hidden : true
							},{	fieldLabel	: Language.get('acpt_date','수주일자'),
								xtype		: 'betweenfield',
								name		: 'invc1_date',
								pair		: 'invc2_date',
								labelWidth	: 99,
								width		: 198,
								margin		: '0 0 0 2',
								root		: true,
								value		: Ext.Date.getFirstDateOfMonth(new Date()),
							},{	xtype		: 'betweenfield',
								fieldLabel	:'~',
								name		: 'invc2_date',
								pair		: 'invc1_date',
								labelWidth	: 15,
								width		: 115
							}
	 					]
					},{	xtype : 'fieldset', layout: 'hbox',
						items : [
							{	fieldLabel	: Language.get('prod','품목코드'),
								xtype		: 'popupfield',
								editable	: true,
								enableKeyEvents : true,
								name		: 'prod_name',
								width		: 315,
								pair		: 'prod_idcd',
								clearable	: true,
								popup		: {
									select	: 'SINGLE',
									widget	: 'lookup-prod-popup',
									params	: { stor_grp : _global.stor_grp , line_stat : '0' },
									result	: function(records, nameField, pairField) {
										nameField.setValue(records[0].get('prod_name'));
										pairField.setValue(records[0].get('prod_idcd'));
									}
								}
							},{	name		: 'prod_idcd', xtype : 'textfield' , hidden : true
							},{	fieldLabel	: Language.get('drtr_name','영업담당'),
								xtype		: 'popupfield',
								editable	: true,
								enableKeyEvents : true,
								name		: 'user_name',
								width		: 315,
								pair		: 'user_idcd',
								clearable	: true,
								popup		: {
									select	: 'SINGLE',
									widget	: 'lookup-user-popup',
									params	: { stor_grp : _global.stor_grp , line_stat : '0' },
									result	: function(records, nameField, pairField) {
										nameField.setValue(records[0].get('user_name'));
										pairField.setValue(records[0].get('user_idcd'));
									}
								}
							},{	name		: 'user_idcd', xtype : 'textfield' , hidden : true
							},{	fieldLabel	: Language.get('line_stat','상태'),
								xtype		: 'lookupfield',
								width		: 200,
								name		: 'line_stat',
								lookupValue	: resource.lookup('line_stat'),
								value		: '0'
							},{	fieldLabel	: Language.get('','합계구분'),
								xtype		: 'lookupfield',
								name		: 'chk',
								width		: 250,
								multiSelect	: true ,
								margin		: '0 0 0 0',
								lookupValue	: [['0','소계'],['1','일계'],['2','월계'],['3','합계']],
								value		: ["0","1","2","3"]
							}
						]
					}
				]
			};
		return line;
	}
});