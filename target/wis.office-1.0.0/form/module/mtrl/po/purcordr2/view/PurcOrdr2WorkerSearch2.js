Ext.define('module.mtrl.po.purcordr2.view.PurcOrdr2WorkerSearch2', { extend: 'Axt.form.Search',
//	store	: 'module.mtrl.po.purcordr2.store.PurcOrdr2Invoice2',
	alias	: 'widget.module-purcordr2-worker-search2',
	style	: 'padding-top : 1px;' ,
	height	:  80,
	/**
	 *
	 */
	initComponent: function () {
		var me = this;
		me.items = [me.addonSearch() ];
		me.callParent();
	},

	/**
	 * 라인1
	 */
	addonSearch : function(){
		var me = this,
		line = {
				xtype		: 'fieldset' ,
				dock		: 'left',
				border		: 0,
				flex		: 100 ,
				fieldDefaults: { width : 280, labelWidth : 40 , margin : '5 5 0 0'},
				items		: [
						{	xtype : 'fieldset',
							layout: 'hbox',
							border: 0,
							margin: '5 0 0 -18',
							items : [
							{	xtype : 'fieldset',
								layout: 'vbox',
								border: 0,
								margin: '0 0 0 0',
								items : [
									{	xtype : 'fieldset',
										layout: 'hbox',
										border: 0,
										margin: '0 0 0 0',
										items : [
											{	fieldLabel	: Language.get('','발주담당'),
												xtype		: 'popupfield',
												name		: 'drtr_name',
												pair		: 'drtr_idcd',
												fieldCls	: 'requiredindex',
												emptyText	: Const.invalid.emptyValue,
												value		: _global.login_nm,
												clearable	: true,
												labelWidth	: 100,
												width		: 235,
												margin		: '0 0 0 0',
												popup: {
													select : 'SINGLE',
													widget : 'lookup-user-popup',
													params : { stor_grp : _global.stor_grp , line_stat : '0' },
													result : function(records, nameField, pairField) {
														nameField.setValue(records[0].get('user_name'));
														pairField.setValue(records[0].get('user_idcd'));
													}
												}
											},{	name : 'drtr_idcd', xtype : 'textfield' , hidden : true, value : _global.login_id
											},{	fieldLabel	: Language.get('','거래처'),
												xtype		: 'popupfield',
												name		: 'cstm_name',
												pair		: 'cstm_idcd',
												emptyText	: Const.invalid.emptyValue,
												fieldCls	: 'requiredindex',
												clearable	: true,
												labelWidth	: 100,
												width		: 260,
												margin		: '0 0 0 0',
												popup: {
													select : 'SINGLE',
													widget : 'lookup-cstm-popup',
													params : { stor_grp : _global.stor_grp , line_stat : '0', puch_cstm_yorn : '1'},
													result : function(records, nameField, pairField) {
														var panel1 = nameField.up('form');
														panel1.down('[name=cstm_code]').setValue(records[0].get('cstm_code'));
														panel1.down('[name=cstm_name]').setValue(records[0].get('cstm_name'));
														nameField.setValue(records[0].get('cstm_name'));
														pairField.setValue(records[0].get('cstm_idcd'));
													}
												}
											},{	name : 'cstm_idcd', xtype : 'textfield' , hidden : true
											},{	fieldLabel	: Language.get('', '거래처명' ),
												name		: 'cstm_name',
												xtype		: 'textfield',
												labelWidth	: 95,
												width		: 195,
												hidden		: true
											},{	fieldLabel	: Language.get('', '거래처코드' ),
												name		: 'cstm_code',
												xtype		: 'textfield',
												labelWidth	: 95,
												width		: 195,
												hidden		: true
											},{	fieldLabel	: Language.get('','발주일자'),
												xtype		: 'datefield',
												name		: 'invc_date',
												labelWidth	: 99,
												width		: 198,
												margin		: '0 0 0 0',
												value		: new Date(),
												format		: Const.DATE_FORMAT_YMD_BAR,
												submitFormat: Const.DATE_FORMAT_YMD,
											},{	fieldLabel	: Language.get('','납기일자'),
												xtype		: 'datefield',
												name		: 'deli_date',
												labelWidth	: 94,
												width		: 193,
												margin		: '0 0 0 0',
												value		: new Date(),
												format		: Const.DATE_FORMAT_YMD_BAR,
												submitFormat: Const.DATE_FORMAT_YMD,
											},{	fieldLabel	: Language.get('supl_dvcd', '조달구분' ),
												name		: 'supl_dvcd',
												xtype		: 'lookupfield',
												margin		: '0 0 0 0',
												labelWidth	: 100,
												width		: 200,
												value		: '1000',
												lookupValue	: resource.getList('supl_dvcd'),
												listeners	: {
													beforeselect: function(self, value, index, eOpts ) {
														if (_global.options.mes_system_type.toUpperCase() == 'SJFLV') {
															var lister = Ext.ComponentQuery.query('module-purcordr2-worker-lister3')[0],
																updatedRecords = lister.getStore().getUpdatedRecords();

															if (updatedRecords != 0) {
																Ext.Msg.alert("알림", "품목 정보가 변경되어 조달구분을 변경할 수 없습니다.");
																return false;
															}

															if (value.get('code') == "6000") {
																me.down('[name=crny_dvcd]').show();
																me.down('[name=trde_trnt_dvcd]').show();
															}else{
																me.down('[name=crny_dvcd]').hide();
																me.down('[name=trde_trnt_dvcd]').hide();
															}
														}
														if (_global.hq_id.toUpperCase() == 'N1000SJUNG') {
															var lister = Ext.ComponentQuery.query('module-purcordr2-worker-lister3')[0],
															val = this.getValue(),
															records = lister.getSelectionModel().getSelection();

															if ( lister.getStore().getCount()>=1) {
																Ext.Msg.alert("알림", "품목이 등록되어 조달구분을 변경할 수 없습니다.");
																return false;
															}

															if (value.get('code') == "6000") {
																Ext.Msg.alert("알림", "외자매입은 선택할수없습니다.");
																me.down('[name=crny_dvcd]').hide();
																me.down('[name=trde_trnt_dvcd]').hide();
																return false;
															}
														}
													}
												}
											}
										]
									},{	xtype : 'fieldset',
										layout: 'hbox',
										border: 0,
										margin: '0 0 0 0',
										items : [
											{	fieldLabel	: Language.get('crny_dvcd', '화폐단위' ),
												name		: 'crny_dvcd',
												xtype		: 'lookupfield',
												labelWidth	: 100,
												width		: 200,
												lookupValue	: resource.lookup('crny_dvcd'),
												hidden		: true
											},{	fieldLabel	: Language.get('', '운송수단' ),
												name		: 'trde_trnt_dvcd',
												xtype		: 'lookupfield',
												labelWidth	: 100,
												width		: 200,
												margin		: '5 0 0 30',
												lookupValue	: resource.lookup('trde_trnt_dvcd'),
												hidden		: true
											}
										]
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
