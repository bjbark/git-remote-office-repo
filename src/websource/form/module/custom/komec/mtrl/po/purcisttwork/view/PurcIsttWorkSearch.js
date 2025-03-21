	Ext.define('module.custom.komec.mtrl.po.purcisttwork.view.PurcIsttWorkSearch', { extend: 'Axt.form.Search',

	alias: 'widget.module-purcisttwork-search',

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
							{	fieldLabel	: Language.get('','조회기간'),
								xtype		: 'betweenfield',
								name		: 'invc_date1',
								pair		: 'invc_date2',
								root		: true,
								width		: 198,
								labelWidth	: 100,
								format		: Const.DATE_FORMAT_YMD_BAR,
								submitFormat: Const.DATE_FORMAT_YMD,
								value		: Ext.Date.getFirstDateOfMonth(new Date())
							},{	fieldLabel	: Language.get('','~'),
								xtype		: 'betweenfield',
								name		: 'invc_date2',
								pair		: 'invc_date1',
								width		: 116,
								labelWidth	: 19,
								format		: Const.DATE_FORMAT_YMD_BAR,
								submitFormat: Const.DATE_FORMAT_YMD,
								value		: new Date()
							},{	fieldLabel	: Language.get('offr_numb','발주번호'),
								xtype		: 'popupfield',
								editable	: true,
								enableKeyEvents : true,
								name		: 'invc_numb',
								width		: 314,
								pair		: 'invc_numb1',
								clearable	: true,
								popup: {
									select : 'SINGLE',
									widget : 'lookup-purcordr-popup',
									params : { stor_grp : _global.stor_grp , line_stat : '0' , acct_bacd : '자재'},
									result : function(records, nameField, pairField) {
										nameField.setValue(records[0].get('invc_numb'));
										pairField.setValue(records[0].get('invc_numb'));
									}
								}
							},{	name : 'invc_numb1', xtype : 'textfield' , hidden : true
							}
						]
					},{	xtype : 'fieldset', layout: 'hbox',
						items : [
							{	fieldLabel	: Language.get('line_stat','상태'),
								xtype		: 'lookupfield',
								name		: 'line_stat',
								lookupValue	: resource.lookup('search_all').concat(resource.lookup('line_stat' )),
								value		: '',
								width		: 198
							},{	fieldLabel	: Language.get('item','품목'),
								xtype		: 'popupfield',
								editable	: true,
								enableKeyEvents : true,
								name		: 'item_name',
								pair		: 'item_idcd',
								labelWidth	: 217,
								width		: 430,
								clearable	: true,
								popup: {
									select : 'SINGLE',
									widget : 'lookup-item-popup',
									params : { stor_grp : _global.stor_grp , line_stat : '0' , acct_bacd : '자재'},
									result : function(records, nameField, pairField) {
										nameField.setValue(records[0].get('item_name'));
										pairField.setValue(records[0].get('item_idcd'));
									}
								}
							},{	name : 'item_idcd', xtype : 'textfield' , hidden : true
							},{	fieldLabel	: Language.get('lott_numb', 'Batch No' ),
								name		: 'lott_numb',
								xtype		: 'textfield',
								width		: 314,
								value		: ''
							}
//							,{ fieldLabel	: Language.get('expr_stat', '유통기한 처리'),
//								xtype		: 'lookupfield',
//								name		: 'expr_stat',
//								lookupValue : [["","전체"],["1","처리"],["2","미처리"]],
//								value		: '2',
//								width		: 198
//							}
						]
					},{	xtype : 'fieldset', layout: 'hbox',
						items : [
							{	fieldLabel	: Language.get('cstm','거래처'),
								name		: 'cstm_name',
								pair		: 'cstm_idcd',
								xtype		: 'popupfield',
								width		: 314,
								editable	: true,
								enableKeyEvents : true,
								emptyText	: '',
								clearable	: true,
								popup		: {
									widget	: 'lookup-cstm-popup',
									select	: 'SINGLE',
									params : { stor_grp : _global.stor_grp , line_stat : '0', puch_cstm_yorn : '1'},
									result : function(records, nameField, pairField) {
										nameField.setValue(records[0].get('cstm_name'));
										pairField.setValue(records[0].get('cstm_idcd'));
									}
								}
							},{	name : 'cstm_idcd', xtype : 'textfield' , hidden : true
							},{	fieldLabel	: Language.get('', '입고담당' ),
								name		: 'drtr_name',
								pair		: 'drtr_idcd',
								xtype		: 'popupfield',
								width		: 314,
								editable	: true,
								enableKeyEvents : true,
								emptyText	: '',
								clearable	: true,
								popup		: {
									widget	: 'lookup-user-popup',
									select	: 'SINGLE',
									params	: { stor_grp : _global.stor_grp, line_stat : '0' },
									result	: function(records, nameField, pairField ) {
											nameField.setValue(records[0].get('user_name'));
											pairField.setValue(records[0].get('user_idcd'));
											nameField.up('form').down('[name=dept_idcd]').setValue(records[0].get('dept_idcd'));
									}
								}
							},{	xtype		: 'textfield', name : 'drtr_idcd', hidden : true
							},{	xtype		: 'textfield', name : 'dept_idcd', hidden : true
							},{	fieldLabel	: Language.get('', '입고창고' ),
								name		: 'istt_wrhs_name',
								pair		: 'istt_wrhs_idcd',
								xtype		: 'popupfield',
								width		: 314,
								editable	: true,
								enableKeyEvents : true,
								emptyText	: '',
								clearable	: true,
								popup		: {
									widget	: 'lookup-wrhs-popup',
									select	: 'SINGLE',
									params	: { stor_grp : _global.stor_grp, line_stat : '0' },
									result	: function(records, nameField, pairField ) {
										nameField.setValue(records[0].get('wrhs_name'));
										pairField.setValue(records[0].get('wrhs_idcd'));
										nameField.up('form').down('[name=proc_dept_idcd]').setValue(records[0].get('dept_idcd'));
										nameField.up('form').down('[name=bzpl_idcd]').setValue(records[0].get('bzpl_idcd'));
									}
								}
							},{	name		: 'istt_wrhs_idcd', xtype	: 'textfield', hidden : true
							},{	name		: 'bzpl_idcd', xtype	: 'textfield', hidden : true
							},{	name		: 'proc_dept_idcd', xtype	: 'textfield', hidden : true
							}
						]
					}
				]
			};
		return line;
	}
});