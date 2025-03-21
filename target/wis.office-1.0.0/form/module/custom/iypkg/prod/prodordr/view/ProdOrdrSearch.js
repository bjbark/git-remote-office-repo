Ext.define('module.custom.iypkg.prod.prodordr.view.ProdOrdrSearch', { extend: 'Axt.form.Search',

	alias: 'widget.module-prodordr-search',

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
								emptyText	: '조회할 지시일자 또는 제품명이나 제품코드를 입력하세요.',
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
		var me = this,
			line = {
				xtype			: 'fieldset',
				title			: '상세검색',
				collapsible		: true,
				collapsed		: false,
				layout			: 'vbox',
				defaults		: { xtype: 'fieldset', layout: 'vbox', margin : '5 0 0 0', padding: '0', border: 0 , },
				fieldDefaults	: { width : 341, labelWidth : 100, labelSeparator : '' },
				items			: [
					{	xtype : 'fieldset', layout: 'hbox',
						items : [
									{	fieldLabel	: Language.get('invc_date','지시일자'),
										xtype		: 'betweenfield',
										name		: 'invc_date1',
										pair		: 'invc_date2',
										width		: 198,
										labelWidth	: 100,
										value		: Ext.Date.getFirstDateOfMonth(new Date()),
										root		: true
									},{	fieldLabel	: '~',
										xtype		: 'betweenfield',
										name		: 'invc_date2',
										pair		: 'invc_date1',
										width		: 117,
										labelWidth	: 19,
										value		: new Date()
									},{	fieldLabel	: Language.get('acpt_numb','수주번호'),
										xtype		: 'popupfield',
										editable	: true,
										enableKeyEvents : true,
										name		: 'invc_numb',
										width		: 315,
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
									},{	fieldLabel	: Language.get('cstm_name','거래처'),
										xtype		: 'popupfield',
										name		: 'cstm_name',
										pair		: 'cstm_idcd',
										clearable	: true,
										labelWidth	: 70,
										width		: 285,
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
							}
						]
			};
		return line;
	},

});