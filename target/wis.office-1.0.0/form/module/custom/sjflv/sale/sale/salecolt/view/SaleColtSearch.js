Ext.define('module.custom.sjflv.sale.sale.salecolt.view.SaleColtSearch', { extend: 'Axt.form.Search',

	alias: 'widget.module-sjflv-salecolt-search',

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
								xtype	: 'searchfield'	,
								flex	: 4				,
								emptyText: '조회할 품목코드 또는 품명을 입력하세요...',
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
							{	fieldLabel	: Language.get('dept_name','사업장'),
								xtype		: 'popupfield',
								editable	: true,
								enableKeyEvents : true,
								name		: 'bzpl_name',
								pair		: 'bzpl_idcd',
								width		: 315,
								editable	: true,
								clearable	: true,
								enableKeyEvents	: true,
								popup		: {
									select	: 'SINGLE',
									widget	: 'lookup-bzpl-popup',
									params	: { stor_grp : _global.stor_grp , sale_cstm_yorn :'1'},
									result	: function(records, nameField, pairField) {
										nameField.setValue(records[0].get('bzpl_name'));
										pairField.setValue(records[0].get('bzpl_idcd'));
									}
								},
								hidden : true
							},{	name : 'bzpl_idcd', xtype : 'textfield' , hidden : true
							},{	fieldLabel	: Language.get('','매출기간'),
								xtype		: 'betweenfield',
								name		: 'sale_date1',
								pair		: 'sale_date2',
								width		: 198,
								labelWidth	: 100,
								root		: true,
								format		: Const.DATE_FORMAT_YMD_BAR,
								submitFormat: Const.DATE_FORMAT_YMD,
								value		: '',
								clearable	: true,
								hidden : true
							},{	fieldLabel	: Language.get('','~'),
								xtype		: 'betweenfield',
								name		: 'sale_date2',
								pair		: 'sale_date1',
								width		: 116,
								labelWidth	: 19,
								format		: Const.DATE_FORMAT_YMD_BAR,
								submitFormat: Const.DATE_FORMAT_YMD,
								value		: '',
								clearable	: true,
								hidden : true
							},{	fieldLabel	: Language.get('','수금일자'),
								xtype		: 'betweenfield',
								name		: 'iomy_date1',
								pair		: 'iomy_date2',
								width		: 198,
								labelWidth	: 100,
								root		: true,
								format		: Const.DATE_FORMAT_YMD_BAR,
								submitFormat: Const.DATE_FORMAT_YMD,
								value		: Ext.Date.getFirstDateOfMonth(new Date()),
								clearable	: true
							},{	fieldLabel	: Language.get('','~'),
								xtype		: 'betweenfield',
								name		: 'iomy_date2',
								pair		: 'iomy_date1',
								width		: 116,
								labelWidth	: 19,
								format		: Const.DATE_FORMAT_YMD_BAR,
								submitFormat: Const.DATE_FORMAT_YMD,
								value		: new Date(),
								clearable	: true
							}
						]
					},{	xtype : 'fieldset', layout: 'hbox',
						items : [
							{	fieldLabel	: Language.get('cstm','거래처'),
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
								},
								listeners	: {
									change	: function() {
										var val = this.getValue();
										if(val=='' || val == null){
											me.down('[name=cstm_idcd]').reset();
										}
									}
								}
							},{	name : 'cstm_idcd', xtype : 'textfield' , hidden : true
							},{	fieldLabel	: Language.get('drtr_name','영업담당'),
								xtype		: 'popupfield',
								editable	: true,
								enableKeyEvents : true,
								name		: 'drtr_name',
								pair		: 'drtr_idcd',
								width		: 315,
								editable	: true,
								clearable	: true,
								popup		: {
									select	: 'SINGLE',
									widget	: 'lookup-user-popup',
									params	: { stor_grp : _global.stor_grp , line_stat : '0' , acct_bacd : '제품'},
									result	: function(records, nameField, pairField) {
										nameField.setValue(records[0].get('user_name'));
										pairField.setValue(records[0].get('user_idcd'));
									}
								},
								hidden : true
							},{	name		: 'drtr_idcd', xtype : 'textfield' , hidden : true
							}
						]
					}
				]
			};
		return line;
	}
});