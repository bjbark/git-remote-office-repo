Ext.define('module.custom.iypkg.stock.isos.mtrlostt2.view.MtrlOstt2Search', { extend: 'Axt.form.Search',

	alias: 'widget.module-mtrlostt2-search',

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
								emptyText	: '조회할 품목코드 또는 품목명을 입력하세요.',
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
				name			: 'collapsed',
				collapsible		: true,
				collapsed		: true,
				layout			: 'vbox',
				defaults		: { xtype: 'fieldset', layout: 'vbox', margin : '0 0 5 0', padding: '0', border: 0 , },
				fieldDefaults	: { width : 341, labelWidth : 100, labelSeparator : '' },
				items			: [
					{	xtype : 'fieldset', layout: 'hbox',
						items : [
							{	fieldLabel	: Language.get('','조회기간'),
								xtype		: 'betweenfield',
								name		: 'invc_date1',
								pair		: 'invc_date2',
								labelWidth	: 99,
								width		: 198,
								margin		: '0 0 0 0',
								root		: true,
								value		: Ext.Date.getFirstDateOfMonth(new Date())
							},{	xtype		: 'betweenfield',
								fieldLabel	:'~',
								name		: 'invc_date2',
								pair		: 'invc_date1',
								labelWidth	: 15,
								width		: 115,
								value		: new Date()
							},{	fieldLabel	: Language.get('acpt_numb','수주번호'),
									xtype		: 'popupfield',
									editable	: true,
									enableKeyEvents : true,
									name		: 'acpt_numb',
									width		: 326,
									editable	: true,
									clearable	: true,
									enableKeyEvents	: true,
									popup		: {
										select	: 'SINGLE',
										widget	: 'lookup-iypkg-ordr-popup',
										params	: {
											stor_grp	: _global.stor_grp ,
											line_stat	: '0',
											cstm_idcd	: '',
										},
										result : function(records, nameField, pairField) {
											nameField.setValue(records[0].get('invc_numb'));
										}
									}
							},{	fieldLabel	: Language.get('prod_name','제품'),
								xtype		: 'popupfield',
								name		: 'prod_name',
								pair		: 'prod_idcd',
								clearable	: true,
								width		: 326,
								popup: {
									select : 'SINGLE',
									widget : 'lookup-prod-popup',
									params : { stor_grp : _global.stor_grp , line_stat : '0' },
									result : function(records, nameField, pairField) {
										nameField.setValue(records[0].get('prod_name'));
										pairField.setValue(records[0].get('prod_idcd'));
									}
								}
							},{	name : 'prod_idcd', xtype : 'textfield' , hidden : true
							}
						]
					},{	xtype : 'fieldset', layout: 'hbox',
						items : [
							{	fieldLabel	: Language.get('', 'P/o No' ),
								xtype		: 'textfield',
								name		: 'pcod_numb',
								width		: 313,
							},{	fieldLabel	: Language.get('', '규격' ),
								xtype		: 'textfield',
								name		: 'item_leng',
								width		: 170,
							},{	xtype		: 'textfield',
								margin		: '0 0 0 5',
								name		: 'item_widh',
								width		: 73,
							},{	xtype		: 'textfield',
								margin		: '0 0 0 5',
								name		: 'item_hght',
								width		: 73,
							}
						]
					}
				]
			};
		return line;
	},
});