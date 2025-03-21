Ext.define('module.stock.isos.goodsosttwork.view.GoodsOsttWorkSearch', { extend: 'Axt.form.Search',

	alias: 'widget.module-goodsosttwork-search',

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
								width		: 198,
								labelWidth	: 100,
								root		: true,
								format		: Const.DATE_FORMAT_YMD_BAR,
								submitFormat: Const.DATE_FORMAT_YMD,
								value		: Ext.Date.getFirstDateOfMonth(new Date()),
								clearable	: true
							},{	fieldLabel	: Language.get('','~'),
								xtype		: 'betweenfield',
								name		: 'invc_date2',
								pair		: 'invc_date1',
								width		: 116,
								labelWidth	: 19,
								format		: Const.DATE_FORMAT_YMD_BAR,
								submitFormat: Const.DATE_FORMAT_YMD,
								value		: new Date(),
								clearable	: true
							},{	fieldLabel	: Language.get('acpt_numb','주문번호'),
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
									widget	: 'lookup-ordr-popup',
									params	: {
										stor_grp	: _global.stor_grp ,
										line_stat	: '0',
										cstm_idcd	: '',
//										acpt_stat_dvcd : '0200',
									},
									result : function(records, nameField, pairField) {
										nameField.setValue(records[0].get('invc_numb'));
									}
								}
							},{	fieldLabel	: Language.get('line_stat','상태'),
								xtype		: 'lookupfield',
								name		: 'line_stat',
								lookupValue	: resource.lookup('search_all').concat(resource.lookup('line_stat' )),
								value		: '',
								width		: 205
							}
						]
					},{	xtype : 'fieldset', layout: 'hbox',
						items : [
							{	fieldLabel	: Language.get('item','품목'),
								xtype		: 'popupfield',
								editable	: true,
								enableKeyEvents : true,
								name		: 'item_name',
								width		: 315,
								pair		: 'item_idcd',
								editable	: true,
								clearable	: true,
								popup		: {
									select	: 'SINGLE',
									widget	: 'lookup-item-popup-v4',
									params	: { stor_grp : _global.stor_grp , line_stat : '0' , acct_bacd : '제품'},
									result	: function(records, nameField, pairField) {
										nameField.setValue(records[0].get('item_name'));
										pairField.setValue(records[0].get('item_idcd'));
									}
								}
							},{	name		: 'item_idcd', xtype : 'textfield' , hidden : true
							},{	fieldLabel	: Language.get('deli_date','납기일자'),
								xtype		: 'betweenfield',
								name		: 'deli_date1',
								pair		: 'deli_date2',
								width		: 198,
								labelWidth	: 100,
								root		: true,
								format		: Const.DATE_FORMAT_YMD_BAR,
								submitFormat: Const.DATE_FORMAT_YMD,
								value		: '',
								clearable	: true,
							},{	fieldLabel	: Language.get('','~'),
								xtype		: 'betweenfield',
								name		: 'deli_date2',
								pair		: 'deli_date1',
								width		: 116,
								labelWidth	: 19,
								format		: Const.DATE_FORMAT_YMD_BAR,
								submitFormat: Const.DATE_FORMAT_YMD,
								value		: '',
								clearable	: true,
							}
						]
					},{	xtype : 'fieldset', layout: 'hbox', hidden: _global.options.mes_system_type.toUpperCase() == 'SJFLV'? false : true,
							items : [
										{	fieldLabel	: Language.get('', '출고창고' ),
											name		: 'ostt_wrhs_name',
											pair		: 'ostt_wrhs_idcd',
											xtype		: 'popupfield',
											width		: 315,
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
													//nameField.up('form').down('[name=proc_dept_idcd]').setValue(records[0].get('dept_idcd'));
													//nameField.up('form').down('[name=bzpl_idcd]').setValue(records[0].get('bzpl_idcd'));
													//nameField.up('form').down('[name=bzpl_name]').setValue(records[0].get('bzpl_name'));
												}
											}
										},{	name	: 'ostt_wrhs_idcd', xtype	: 'textfield', hidden : true
										},{	fieldLabel	: Language.get('sale_drtr_name','영업담당'),
											xtype		: 'popupfield',
											editable	: true,
											enableKeyEvents : true,
											clearable	: true,
											name		: 'drtr_name',
											width		: 207,
											labelWidth	: 100,
											pair		: 'drtr_idcd',
											popup: {
												select : 'SINGLE',
												widget : 'lookup-user-popup',
												params : { stor_grp : _global.stor_grp , line_stat : '0' },
												result : function(records, nameField, pairField) {
													nameField.setValue(records[0].get('user_name'));
													pairField.setValue(records[0].get('user_idcd'));
												}
											},
											listeners	: {
												change	: function() {
													var val = this.getValue();
													if(val=='' || val == null){
														me.down('[name=drtr_idcd]').reset();
													}
												}
											}
										},{	name : 'drtr_idcd', xtype : 'textfield' , hidden : true
										},{	fieldLabel	: Language.get('cstm','거래처'),
											xtype		: 'popupfield',
											editable	: true,
											enableKeyEvents : true,
											name		: 'cstm_name',
											pair		: 'cstm_idcd',
											width		: 250,
											margin		: '0 0 0 105',
											clearable	: true,
											popup		: {
												select	: 'SINGLE',
												widget	: 'lookup-cstm-popup',
												params	: { stor_grp : _global.stor_grp , line_stat : '0'},
												result	: function(records, nameField, pairField) {
													nameField.setValue(records[0].get('cstm_name'));
													pairField.setValue(records[0].get('cstm_idcd'));
												}
											}
										},{	name		: 'cstm_idcd', xtype : 'textfield' , hidden : true
										},{	fieldLabel	: Language.get('dlvy_cstm','납품처'),
											xtype		: 'popupfield',
											editable	: true,
											enableKeyEvents : true,
											name		: 'dlvy_name',
											pair		: 'dlvy_idcd',
											width		: 250,
											margin		: '0 0 0 0',
											clearable	: true,
											popup		: {
												select	: 'SINGLE',
												widget	: 'lookup-cstm-popup',
												params	: { stor_grp : _global.stor_grp , line_stat : '0'},
												result	: function(records, nameField, pairField) {
													nameField.setValue(records[0].get('cstm_name'));
													pairField.setValue(records[0].get('cstm_idcd'));
												}
											}
										},{	name		: 'dlvy_idcd', xtype : 'textfield' , hidden : true
										},{	fieldLabel	: Language.get('lott_numb','Batch No'),
											xtype		: 'searchfield',
											name		: 'lott_numb',
											width		: 250,
											root		: true,
											clearable	: true,
											labelWidth	:  100,
											margin		: '0 0 0 0'
										}
									]
								}
				]
			};
		return line;
	}
});