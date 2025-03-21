Ext.define('module.custom.sjflv.sale.order.saleorder.view.SaleOrderWorkerEditor', { extend: 'Axt.form.Editor',

	alias	: 'widget.module-sjflv-saleorder-worker-editor',
	height	: _global.hq_id.toUpperCase() == 'N1000SJFLV'? 275 : 240,
	header	: false,
	getStore: function() {
		return Ext.getStore( 'module.custom.sjflv.sale.order.saleorder.store.SaleOrderInvoice' );
	},
	initComponent: function(config){
		var me = this;
		me.dockedItems = [ me.createWest() ] ;
		me.items = me.createTabs();
		me.callParent(arguments);
	},


	/**
	 *
	 */
	createWest : function () {
		var me	= this,
			item = {
			xtype		: 'form-panel' ,
			dock		: 'left',
			border		: 0,
			bodyStyle	: { padding: '5px' },
			flex		: 100 ,
			fieldDefaults: { width : 280, labelWidth : 70, margin : '10 0 0 0'},
			items		: [
				{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '0 0 0 0',
					items	: [
						{	fieldLabel	: Language.get('acpt_numb', '수주번호' ),
							xtype		: 'textfield',
							name		: 'invc_numb',
							fieldCls	: 'requiredindex',
							margin		: '7 5 0 0',
							readOnly	: true,
							width		: 200
						},
						{	xtype		: 'lookupfield',
							name		: 'acpt_dvcd',
							margin		: '8 5 0 0',
							lookupValue	: resource.lookup('acpt_dvcd'),
							width		: 75,
							listeners	: {
								change	: function(self, value){
									var panel = this.up('form');
									var editSearch = Ext.ComponentQuery.query('module-sjflv-saleorder-worker-search')[0];
//									prod_trst_dvcd = panel.down('[name=prod_trst_dvcd]').getValue();

									if (value == "1000") {
										me.down('[name=cstm_idcd]').setValue(null);
										me.down('[name=cstm_name]').setValue(null);
										me.down('[name=dlvy_cstm_idcd]').setValue(null);
										me.down('[name=cstm_name2]').setValue(null);
									}else{
										me.down('[name=dlvy_cstm_idcd]').setValue(null);
										me.down('[name=cstm_name2]').setValue(null);
									}

									if(_global.hq_id.toUpperCase() == 'N1000SJUNG'){
										if(value == "1000"){
											editSearch.down('[name=prod_trst_dvcd]').setValue('3000');
										}else{
											editSearch.down('[name=prod_trst_dvcd]').setValue('1000');
										}
									}

//									if(prod_trst_dvcd == "2000") {
//										if (value == "1000") {
//											me.down('[name=cstm_name]').setReadOnly(true);
//											me.down('[name=cstm_name2]').setReadOnly(true);
//										} else {
//											me.down('[name=cstm_name]').setReadOnly(false);
//											me.down('[name=cstm_name2]').setReadOnly(false);
//										}
//									} else {
//										me.down('[name=cstm_name]').setReadOnly(false);
//										me.down('[name=cstm_name2]').setReadOnly(false);
//									}
								}
							},
						}
					]
				},
//				{	fieldLabel	: Language.get('', '생산구분' ),
//					xtype		: 'lookupfield',
//					name		: 'prod_trst_dvcd',
//					margin		: '8 5 0 0',
//					lookupValue	: resource.lookup('prod_trst_dvcd'),
//					value		: '1000',
//					listeners	: {
//						change	: function(self, value){
//							var panel = this.up('form');
//								acpt_dvcd = panel.down('[name=acpt_dvcd]').getValue();
//
//							if(acpt_dvcd == "1000") {
//								if (value == "2000") {
//									me.down('[name=cstm_name]').setReadOnly(true);
//									me.down('[name=cstm_name2]').setReadOnly(true);
//									me.down('[name=cstm_idcd]').setValue(null);
//									me.down('[name=cstm_name]').setValue(null);
//									me.down('[name=dlvy_cstm_idcd]').setValue(null);
//									me.down('[name=cstm_name2]').setValue(null);
//								} else {
//									me.down('[name=cstm_name]').setReadOnly(false);
//									me.down('[name=cstm_name2]').setReadOnly(false);
//								}
//							} else {
//								me.down('[name=cstm_name]').setReadOnly(false);
//								me.down('[name=cstm_name2]').setReadOnly(false);
//							}
//						}
//					},
//				},
				{	fieldLabel	: Language.get('cstm_name', '거래처명' ),
					name		: 'cstm_name',
					pair		: 'cstm_idcd',
					xtype		: 'popupfield',
					editable	: true,
					enableKeyEvents : true,
					fieldCls	: 'requiredindex',
					allowBlank	: true,
					clearable	: true,
					allowblank 	: true,
					popup		: {
						widget	: 'lookup-cstm-popup',
						select	: 'SINGLE',
						params	: { stor_grp : _global.stor_grp, line_stat : '0',sale_cstm_yorn : '1' },
						result	: function(records, nameField, pairField ) {

							nameField.setValue(records[0].get('cstm_name'));
							pairField.setValue(records[0].get('cstm_idcd'));

							var panel1 = nameField.up('form');
							var vatx_dvcd = records[0].get('vatx_dvcd');
							var editForm = Ext.ComponentQuery.query('module-sjflv-saleorder-worker-editor')[0];
							editForm.down('[name=cstm_name2]').popup.params.cstm_idcd = records[0].get('cstm_idcd');
							// 23.10.16 - 거래처의 영업담당자로 지정된 사용자 표시
							editForm.down('[name=drtr_idcd]').setValue(records[0].get('sale_drtr_idcd'));
							editForm.down('[name=drtr_name]').setValue(records[0].get('sale_drtr_name'));

							var searchForm = Ext.ComponentQuery.query('module-sjflv-saleorder-worker-search')[0];
							searchForm.down('[name=item_code]').popup.params.cstm_idcd = records[0].get('cstm_idcd');

							if(_global.hq_id.toUpperCase() == 'N1000SJFLV'){
								panel1.down('[name=mdtn_prsn]').setValue(records[0].get('cstm_name'));
							}
						}
					}
				},{	name : 'cstm_idcd', xtype	: 'textfield', hidden : true,
					listeners	: {
						change	: function(){
							var searchForm = Ext.ComponentQuery.query('module-sjflv-saleorder-worker-editor')[0];
							searchForm.down('[name=cstm_name2]').popup.params.cstm_idcd = this.getValue();

							searchForm.down('[name=dlvy_cstm_idcd]').setValue(null);
							searchForm.down('[name=cstm_name2]').setValue(null);

							searchForm = Ext.ComponentQuery.query('module-sjflv-saleorder-worker-search')[0];
							searchForm.down('[name=item_code]').popup.params.cstm_idcd = this.getValue();
						}
					},
				},{	fieldLabel	: Language.get('', '배송지' ),
					name		: 'cstm_name2',
					pair		: 'dlvy_cstm_idcd',
					xtype		: 'popupfield',
					hidden		: _global.options.mes_system_type.toUpperCase() != 'SJFLV',
					clearable	: true,
					editable	: true,
					enableKeyEvents : true,
					popup		: {
						widget	: 'lookup-cstm-deli-popup',
						select	: 'SINGLE',
						params	: { stor_grp : _global.stor_grp, line_stat : '0',sale_cstm_yorn : '1'},
						result	: function(records, nameField, pairField ) {
							var panel1 = nameField.up('form');

							if(panel1.down('[name=acpt_dvcd]').value == '2000'){
								nameField.setValue(records[0].get('dely_cstm_name'));
								pairField.setValue(records[0].get('dlvy_cstm_idcd'));
							}else{
								nameField.setValue(records[0].get('dlvy_addr_1fst'));
								pairField.setValue(records[0].get('dlvy_cstm_idcd'));
							}
						},
						create : function (self ) {
							editor = Ext.ComponentQuery.query('module-sjflv-saleorder-worker-editor')[0];
							param = editor.getValues()
							if(param.cstm_idcd== '' || param.cstm_idcd == null ){
								Ext.Msg.alert("알림","거래처를 먼저 선택하여 주십시오.");
								popup.close();
								return;
							}
						}
					}
				},{	name : 'dlvy_cstm_idcd', xtype	: 'textfield', hidden : true
				},{	fieldLabel	: Language.get('sale_drtr_name', '영업담당자' ),
					name		: 'drtr_name',
					pair		: 'drtr_idcd',
					xtype		: 'popupfield',
					editable	: true,
					enableKeyEvents : true,
					clearable	: false ,
					popup		: {
						widget	: 'lookup-user-popup',
						select	: 'SINGLE',
						params	: { stor_grp : _global.stor_grp, line_stat : '0', duty_dvcd : _global.hq_id.toUpperCase() == 'N1000SJFLV'? '' : '5000' },
						result	: function(records, nameField, pairField ) {
								nameField.setValue(records[0].get('user_name'));
								pairField.setValue(records[0].get('user_idcd'));
						}
					}
				},{	name : 'drtr_idcd', xtype	: 'textfield', hidden : true
				},{	fieldLabel	: Language.get('acpt_date', '주문일자' ),
					name		: 'invc_date',
					xtype		: 'datefield',
					format		: Const.DATE_FORMAT_YMD_BAR,
					submitFormat: Const.DATE_FORMAT_YMD,
				},{	fieldLabel	: Language.get('cstm_pcod_numb', '고객주문번호' ),
					xtype		: 'textfield',
					name		: 'pcod_numb',
				},{	fieldLabel	: Language.get('', 'SD 업체' ), // 2023.09.12 임수찬 - 삼정향료만 SD 업체 모회사 컬럼추가.
					xtype		: 'textfield',
					name		: 'mdtn_prsn',
					hidden		: _global.hq_id.toUpperCase() == 'N1000SJFLV'? false : true,
				},{	xtype		: 'textfield',
					name		: 'chk',
					margin		: '5 5 5 0',
					hidden		: true
				},{	name : 'modi_yorn', xtype	: 'textfield', hidden : true, value : 'n'
				}
			]
		};
		return item;
	},

	/**
	 *
	 */
	createTabs : function () {
		var me = this,
			tabs = {
				xtype	: 'tabpanel',
				region	: 'center',
				plain	: true,
				margin	: 0 ,
				items	: [ me.createTab1() ]
			}
		;
		return tabs;
	},


	/**
	 *
	 */
	createTab1 : function() {
		var item = {
			title 			: '메모사항',
			xtype 			: 'form-panel',
			region			: 'west',
			border			: 0,
			bodyStyle		: { padding: '5px' },
			fieldDefaults	: { width : 315, labelWidth : 50, labelSeparator : '' },
			items			: [
				{	xtype	: 'fieldset',
					layout	: 'vbox' ,
					padding	: '0',
					border	: 0,
					margin	: '0 0 5 0',
					items	: [
						{	xtype		: 'textarea',
							name		: 'user_memo',
							height		: _global.hq_id.toUpperCase() == 'N1000SJFLV'? 235 : 202,
							width		: '100%',
							maxLength	: 100,
							maxLengthText: '한글 100자 이내로 작성하여 주십시오.'
						}
					]
				}
			]
		}
	;
	return item;
	}
});
