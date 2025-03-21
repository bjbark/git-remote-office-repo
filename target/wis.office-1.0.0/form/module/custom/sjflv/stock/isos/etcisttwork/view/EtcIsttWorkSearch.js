Ext.define('module.custom.sjflv.stock.isos.etcisttwork.view.EtcIsttWorkSearch', { extend: 'Axt.form.Search',


	alias: 'widget.module-etcisttwork-search',
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
				defaults: { xtype: 'fieldset', layout: 'vbox', margin : '0 0 2 0', padding: '0', border: 0 , },
				layout	:'vbox',
				items	: [
					{	xtype	: 'fieldset', layout: 'hbox',
						items	: [
							{	fieldLabel	: Language.get('istt_term', '입고기간' ),
								xtype		: 'betweenfield',
								layout: 'hbox',
								margin : '5 0 5 0',
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
								margin		: '5 0 5 0',
								width		: 115,
								labelWidth	: 15
							},{	fieldLabel	: Language.get('istt_dvcd', '입고유형' ),
								margin		: '5 0 5 0',
								xtype		: 'lookupfield',
								name		: 'stok_type_dvcd',
								editable	: false,
								width		: 206,
								hidden		: false,
								lookupValue	: resource.lookup('stok_type_dvcd' ),
							},{	fieldLabel	: Language.get('istt_dvcd', '입고구분' ),
								margin		: '5 0 5 0',
								xtype		: 'lookupfield',
								name		: 'istt_dvcd',
								editable	: false,
								width		: 206,
								lookupValue	: resource.lookup('search_all' ).concat( resource.lookup('istt_dvcd' )),
								value		: ''
							},{	fieldLabel	: Language.get('', '작업담당' ),
								margin : '5 0 5 0',
								xtype		: 'popupfield',
								width		: 206,
								editable	: true,
								enableKeyEvents : true,
								name		: 'proc_drtr_name',
								pair		: 'proc_drtr_idcd',
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
							},{	xtype		: 'textfield', name : 'proc_drtr_idcd', hidden : true
							}
						]
					},{	xtype : 'fieldset',
							layout: 'hbox',
							items : [
								{	fieldLabel	: Language.get('bzpl', '사업장' ),
									name		: 'bzpl_name',
									pair		: 'bzpl_idcd',
									xtype		: 'popupfield',
									editable	: true,
									enableKeyEvents : true,
									labelWidth	: 77,
									width		: 298 ,
									clearable	: true,
									readOnly	: false,
									popup		: {
										widget	: 'lookup-bzpl-popup',
										select	: 'SINGLE',
										params	: { stor_grp : _global.stor_grp , row_sts : '1' },
										result	: function(records, nameField, pairField ){
											nameField.setValue(records[0].get('bzpl_name'));
											pairField.setValue(records[0].get('bzpl_idcd'));
										}
									}
								},{	xtype		: 'textfield',  name : 'bzpl_idcd' , hidden: true
								},{	fieldLabel	: Language.get('', '입고창고' ),
									name		: 'istt_wrhs_name',
									pair		: 'istt_wrhs_idcd',
									xtype		: 'popupfield',
									width		: 205,
									editable	: true,
									enableKeyEvents : true,
									emptyText	: '',
									clearable	: true,
									hidden		: _global.options.mes_system_type.toUpperCase() == 'SJFLV'? false : true,
									popup		: {
										widget	: 'lookup-wrhs-popup',
										select	: 'SINGLE',
										params	: { stor_grp : _global.stor_grp, line_stat : '0' },
										result	: function(records, nameField, pairField ) {
											nameField.setValue(records[0].get('wrhs_name'));
											pairField.setValue(records[0].get('wrhs_idcd'));
											//nameField.up('form').down('[name=proc_dept_idcd]').setValue(records[0].get('dept_idcd'));
											nameField.up('form').down('[name=bzpl_idcd]').setValue(records[0].get('bzpl_idcd'));
											nameField.up('form').down('[name=bzpl_name]').setValue(records[0].get('bzpl_name'));
										}
									}
								},{	name		: 'istt_wrhs_idcd', xtype	: 'textfield', hidden : true
								},{	fieldLabel	: Language.get('', '마감'),
									xtype		: 'lookupfield',
									name		: 'line_clos',
									editable	: false,
									labelWidth	: 70 ,
									width		: 206,
									lookupValue	: resource.lookup('search_all').concat( resource.lookup('line_clos' )),
									value		: ''
								}
		 				]
		 			}
				]
			};
		return line;
	}
});

